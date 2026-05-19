import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { db, auth, googleProvider } from "../firebase-config";

// ─── ALLOWED ADMIN ACCOUNTS ────────────────────────────────────────────────────
// Add or remove Google account emails here. Only these accounts can log in.
const ALLOWED_EMAILS: string[] = [
  "gorhamgeorge70@gmail.com",
  // "anotherperson@gmail.com",
];

// --- PROMOTION CATEGORIES ---
export const promotionCategories = {
  happyHour: {
    name: "Happy Hour",
    badge: "Limited Time",
    colorClasses: "from-aussie-orange to-aussie-burnt-red",
  },
  dogSpecial: {
    name: "Dog Special",
    badge: "Pawsome Deal",
    colorClasses: "from-aussie-eucalyptus to-green-700",
  },
  familyDeal: {
    name: "Family Deal",
    badge: "Family Fun",
    colorClasses: "from-brown-600 to-brown-800",
  },
  loyalty: {
    name: "Loyalty Offer",
    badge: "Member's Gift",
    colorClasses: "from-sand-600 to-aussie-orange",
  },
  general: {
    name: "Special Offer",
    badge: "Special",
    colorClasses: "from-gray-500 to-gray-700",
  },
};
export type PromotionCategoryKey = keyof typeof promotionCategories;

// --- INTERFACES ---
export interface Dog { id: string; name: string; breed: string; age: string; personality: string; beforeImage: string; afterImage: string; rescueStory: string; }
export interface MenuItem { id: string; name: string; description: string; price: string; image: string; featured?: boolean; category: string; }
export interface PhysicalMenuImage { id: string; url: string; caption: string; }
export interface Event { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; category: PromotionCategoryKey; }

export interface SiteContent {
  logoImage: string;
  faviconImage: string;
  theme: "light" | "dark";
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; }>;
  welcomeImages: Array<{ url: string; alt: string; }>;
  aboutImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; restaurantOpensImage: string; };
  siteImages: { dogRescuePlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs: Dog[];
  menuItems: MenuItem[];
  physicalMenuImages: PhysicalMenuImage[];
  events: Event[];
  promotions: Promotion[];
}

const defaultSiteContent: SiteContent = {
  logoImage: "/placeholder.svg",
  faviconImage: "",
  theme: "light",
  socialLinks: { facebook: "#", instagram: "#", twitter: "#" },
  heroImages: [
    { url: "/placeholder.svg", alt: "Kingaroos food hero 1" },
    { url: "/placeholder.svg", alt: "Kingaroos atmosphere hero 2" },
    { url: "/placeholder.svg", alt: "Happy dogs at Kingaroos hero 3" },
  ],
  welcomeImages: [
    { url: "/placeholder.svg", alt: "Happy customers" },
    { url: "/placeholder.svg", alt: "Delicious food" },
  ],
  aboutImages: {
    familyPhoto: "/placeholder.svg",
    originalFoodTruck: "/placeholder.svg",
    firstRescueDog: "/placeholder.svg",
    restaurantOpensImage: "/placeholder.svg",
  },
  siteImages: {
    dogRescuePlaceholderImage: "/placeholder.svg",
  },
  siteTexts: {
    siteName: "Kingaroos",
    footerTagline: "Content loading...",
    contactMondayThursday: "Monday - Thursday",
    contactHoursMondayThursday: "11:00 AM - 9:00 PM",
    contactFridaySaturday: "Friday - Saturday",
    contactHoursFridaySaturday: "11:00 AM - 10:00 PM",
    contactSunday: "Sunday",
    contactHoursSunday: "10:00 AM - 8:00 PM",
    footerMondayThursday: "Mon - Thu: 11am - 9pm",
    footerFridaySaturday: "Fri - Sat: 11am - 10pm",
    footerSunday: "Sun: 10am - 8pm",
    menuReadyToDineTitle: "Ready to Dine With Us?",
    menuReadyToDineText: "Book your table today and help us make a difference for rescue dogs!",
    menuCallText: "Call us at",
    menuAddressText: "123 Outback Lane, Sydney, NSW 2000",
    eventsDontMissTitle: "Don't Miss Out!",
    eventsDontMissText: "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations:",
    eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant",
    eventsInstagramText: "Follow us on Instagram: @kingaroos_sydney",
    homePhone: "(02) 1234 5678",
    homeEmail: "hello@kingaroos.com",
    homeAddress: "123 Outback Lane, Sydney, NSW 2000",
  },
  dogs: [],
  menuItems: [],
  physicalMenuImages: [],
  events: [],
  promotions: [],
};

interface AdminContextType {
  isLoggedIn: boolean;
  justLoggedIn: boolean;
  clearJustLoggedIn: () => void;
  login: () => Promise<boolean>;
  logout: () => void;
  siteContent: SiteContent;
  loading: boolean;
  updateSiteContent: (content: Partial<SiteContent>) => Promise<void>;
  addDog: (dog: Omit<Dog, "id">) => Promise<void>;
  updateDog: (id: string, dog: Partial<Dog>) => Promise<void>;
  deleteDog: (id: string) => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addPromotion: (promo: Omit<Promotion, "id">) => Promise<void>;
  updatePromotion: (id: string, promo: Partial<Promotion>) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const siteContentRef = doc(db, "content", "main");

const MAX_SNAPSHOT_RETRIES = 3;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [authReady, setAuthReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const loading = !authReady || !dataReady;
  const userRef = useRef<User | null>(null);

  // --- Handle redirect result from signInWithRedirect ---
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const email = result.user.email ?? "";
          if (!ALLOWED_EMAILS.includes(email)) {
            signOut(auth);
          } else {
            setJustLoggedIn(true);
          }
        }
      })
      .catch((error) => {
        console.error("Redirect result error:", error);
      });
  }, []);

  // --- Auth listener ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Only treat the user as logged in if their email is on the allowlist
      const allowed =
        currentUser && ALLOWED_EMAILS.includes(currentUser.email ?? "")
          ? currentUser
          : null;
      if (currentUser && !allowed) {
        // Signed in but not allowed — sign them back out silently
        signOut(auth);
      }
      setUser(allowed);
      userRef.current = allowed;
      setAuthReady(true);
    });
    return () => unsubscribeAuth();
  }, []);

  // --- Firestore listener with retry logic ---
  useEffect(() => {
    let retryCount = 0;
    let unsubscribeSnapshot: (() => void) | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const subscribe = () => {
      unsubscribeSnapshot = onSnapshot(
        siteContentRef,
        (snapshot) => {
          retryCount = 0;
          if (snapshot.exists()) {
            const serverContent = snapshot.data() as Partial<SiteContent>;
            const mergedContent: SiteContent = {
              ...defaultSiteContent,
              ...serverContent,
              socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
              heroImages:
                serverContent.heroImages && serverContent.heroImages.length > 0
                  ? serverContent.heroImages
                  : defaultSiteContent.heroImages,
              welcomeImages:
                serverContent.welcomeImages && serverContent.welcomeImages.length > 0
                  ? serverContent.welcomeImages
                  : defaultSiteContent.welcomeImages,
              faviconImage: serverContent.faviconImage ?? defaultSiteContent.faviconImage,
              aboutImages: { ...defaultSiteContent.aboutImages, ...(serverContent.aboutImages || {}) },
              siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
              siteTexts: { ...defaultSiteContent.siteTexts, ...(serverContent.siteTexts || {}) },
              physicalMenuImages: serverContent.physicalMenuImages ?? [],
            };
            setSiteContent(mergedContent);
          } else {
            if (userRef.current) {
              setDoc(siteContentRef, defaultSiteContent, { merge: true });
            }
            setSiteContent(defaultSiteContent);
          }
          setDataReady(true);
        },
        (error) => {
          console.error("Firebase Snapshot Error:", error);
          if (retryCount < MAX_SNAPSHOT_RETRIES) {
            const delayMs = Math.pow(2, retryCount) * 1000;
            console.warn(`Firestore snapshot failed — retrying in ${delayMs}ms (attempt ${retryCount + 1}/${MAX_SNAPSHOT_RETRIES})`);
            retryCount += 1;
            retryTimer = setTimeout(subscribe, delayMs);
          } else {
            console.error("Firestore snapshot failed after maximum retries — showing cached/default content.");
            setDataReady(true);
          }
        }
      );
    };

    subscribe();
    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  // --- Google Sign-In (popup first, redirect fallback) ---
  const login = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email ?? "";
      if (!ALLOWED_EMAILS.includes(email)) {
        await signOut(auth);
        return false;
      }
      return true;
    } catch (error: any) {
      // Popup was blocked or closed — fall back to redirect
      const popupErrors = [
        "auth/popup-blocked",
        "auth/popup-closed-by-user",
        "auth/cancelled-popup-request",
      ];
      if (popupErrors.includes(error?.code)) {
        await signInWithRedirect(auth, googleProvider);
        return false; // page navigates away
      }
      // Surface the real Firebase error to the caller
      throw new Error(error?.message ?? "Google sign-in failed");
    }
  };

  const clearJustLoggedIn = () => setJustLoggedIn(false);

  const logout = async () => { await signOut(auth); };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    if (!user) throw new Error("Not authenticated to make changes.");
    await setDoc(siteContentRef, updates, { merge: true });
  };

  const createCrudOperations = <T extends { id: string }>(stateKey: keyof SiteContent) => {
    const data = (siteContent[stateKey] as T[] | undefined) ?? [];
    const add = async (item: Omit<T, "id">) => {
      const newItem = { ...item, id: `id-${Date.now()}` } as T;
      await updateSiteContent({ [stateKey]: [...data, newItem] } as any);
    };
    const update = async (id: string, updates: Partial<T>) => {
      const newData = data.map((item) => (item.id === id ? { ...item, ...updates } : item));
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    const remove = async (id: string) => {
      const newData = data.filter((item) => item.id !== id);
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    return { add, update, remove };
  };

  const dogOps        = createCrudOperations<Dog>("dogs");
  const menuItemOps   = createCrudOperations<MenuItem>("menuItems");
  const eventOps      = createCrudOperations<Event>("events");
  const promotionOps  = createCrudOperations<Promotion>("promotions");

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: !!user,
        justLoggedIn,
        clearJustLoggedIn,
        login,
        logout,
        siteContent,
        loading,
        updateSiteContent,
        addDog: dogOps.add,
        updateDog: dogOps.update,
        deleteDog: dogOps.remove,
        addMenuItem: menuItemOps.add,
        updateMenuItem: menuItemOps.update,
        deleteMenuItem: menuItemOps.remove,
        addEvent: eventOps.add,
        updateEvent: eventOps.update,
        deleteEvent: eventOps.remove,
        addPromotion: promotionOps.add,
        updatePromotion: promotionOps.update,
        deletePromotion: promotionOps.remove,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
