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
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { db, auth } from "../firebase-config";

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
export interface MenuItem { id: string; name: string; description: string; price: string; image: string; featured?: boolean; category: "starters" | "mains" | "desserts" | "drinks"; }
export interface Event { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; category: PromotionCategoryKey; }

export interface SiteContent {
  logoImage: string;
  theme: "light" | "dark";
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; }>;
  welcomeImages: Array<{ url: string; alt: string; }>;
  // B6 FIX: Renamed `Images` → `aboutImages` to match the field name used
  // everywhere in defaultSiteContent, Admin.tsx, and any component that reads
  // siteContent.aboutImages. The old `Images` key was a dead field that caused
  // TypeScript to silently allow the real `aboutImages` writes while the
  // interface said they didn't exist, leading to type drift and potential
  // runtime mismatches.
  aboutImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; restaurantOpensImage: string; };
  siteImages: { dogRescuePlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs: Dog[];
  menuItems: MenuItem[];
  events: Event[];
  promotions: Promotion[];
}

// --- CORRECTED defaultSiteContent with 3 HERO IMAGES ---
const defaultSiteContent: SiteContent = {
  logoImage: "/placeholder.svg",
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
    // For Menu Page CTA
    menuReadyToDineTitle: "Ready to Dine With Us?",
    menuReadyToDineText: "Book your table today and help us make a difference for rescue dogs!",
    menuCallText: "Call us at",
    menuAddressText: "123 Outback Lane, Sydney, NSW 2000",
    // For Events Page CTA
    eventsDontMissTitle: "Don't Miss Out!",
    eventsDontMissText: "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations:",
    eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant",
    eventsInstagramText: "Follow us on Instagram: @kingaroos_sydney",
    // General info used across pages
    homePhone: "(02) 1234 5678",
    homeEmail: "hello@kingaroos.com",
    homeAddress: "123 Outback Lane, Sydney, NSW 2000",
  },
  dogs: [],
  menuItems: [],
  events: [],
  promotions: [],
};

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => Promise<boolean>;
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

// Maximum number of automatic retry attempts after a Firestore snapshot error.
const MAX_SNAPSHOT_RETRIES = 3;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // B4 FIX: Separate readiness flags for auth and Firestore so that `loading`
  // is only cleared once *both* subsystems have reported their initial state.
  // Previously only Firestore set loading=false, so a slow auth response could
  // cause the app to render with stale/default content before user was known.
  const [authReady, setAuthReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  // Derived loading flag — the app is considered loading until both auth *and*
  // the first Firestore snapshot (or exhausted retries) have resolved.
  const loading = !authReady || !dataReady;

  // B1/B2 FIX: Keep a ref to the latest user so the Firestore effect closure
  // always reads the current auth state without needing `user` as a dependency
  // (which would needlessly re-subscribe on every sign-in/sign-out).
  const userRef = useRef<User | null>(null);

  // --- Auth listener ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // B1 FIX (supporting): keep userRef in sync so snapshot handler can
      // check auth without capturing a stale closure value.
      userRef.current = currentUser;
      // B4 FIX: Mark auth as resolved on first callback (fired even when
      // signed-out, so this always runs quickly).
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
          // Reset retry counter on any successful delivery.
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
              aboutImages: { ...defaultSiteContent.aboutImages, ...(serverContent.aboutImages || {}) },
              siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
              siteTexts: { ...defaultSiteContent.siteTexts, ...(serverContent.siteTexts || {}) },
            };
            setSiteContent(mergedContent);
          } else {
            // B1 FIX: Only seed the document when a user is authenticated.
            // Previously this ran unconditionally, which caused anonymous reads
            // to attempt a write and fail with permission-denied in production,
            // AND it was missing { merge: true } so it could clobber partial
            // server data if the snapshot arrived mid-write.
            if (userRef.current) {
              setDoc(siteContentRef, defaultSiteContent, { merge: true });
            }
            setSiteContent(defaultSiteContent);
          }

          // B4 FIX: Signal that the first Firestore delivery has completed.
          setDataReady(true);
        },
        (error) => {
          console.error("Firebase Snapshot Error:", error);

          // B2 FIX: Instead of silently setting loading=false and leaving the
          // app stuck on placeholder defaults, attempt exponential back-off
          // retries before giving up.  Only after MAX_SNAPSHOT_RETRIES
          // exhausted do we unblock the UI (showing defaults is better than a
          // permanent spinner).
          if (retryCount < MAX_SNAPSHOT_RETRIES) {
            const delayMs = Math.pow(2, retryCount) * 1000; // 1 s, 2 s, 4 s
            console.warn(
              `Firestore snapshot failed — retrying in ${delayMs}ms (attempt ${retryCount + 1}/${MAX_SNAPSHOT_RETRIES})`
            );
            retryCount += 1;
            retryTimer = setTimeout(subscribe, delayMs);
          } else {
            console.error(
              "Firestore snapshot failed after maximum retries — showing cached/default content."
            );
            // Unblock the UI so users aren't stuck on a loading screen.
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
  }, []); // Intentionally empty: we use userRef for auth checks inside the
          // effect to avoid re-subscribing on every sign-in/sign-out.

  const login = async (password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, "admin@kingaroos.com", password);
      return true;
    } catch (error) {
      return false;
    }
  };

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

  const dogOps = createCrudOperations<Dog>("dogs");
  const menuItemOps = createCrudOperations<MenuItem>("menuItems");
  const eventOps = createCrudOperations<Event>("events");
  const promotionOps = createCrudOperations<Promotion>("promotions");

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: !!user,
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
