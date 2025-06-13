import {
  createContext,
  useContext,
  useState,
  useEffect,
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

// --- INTERFACES ---
export interface Dog { id: string; name: string; breed: string; age: string; personality: string; beforeImage: string; afterImage: string; rescueStory: string; }
export interface MenuItem { id:string; name: string; description: string; price: string; image: string; featured?: boolean; category: "starters" | "mains" | "desserts" | "drinks"; }
export interface Event { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; badge: string; color: string; }

export interface SiteContent {
  logoImage: string;
  theme: 'light' | 'dark';
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; }>;
  welcomeImages: Array<{ url: string; alt: string; }>;
  aboutImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; };
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
  theme: 'light',
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
  },
  siteImages: {
    dogRescuePlaceholderImage: "/placeholder.svg",
  },
  siteTexts: { siteName: "Kingaroos", footerTagline: "Content loading..." },
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

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => { setUser(currentUser); });

    const unsubscribeSnapshot = onSnapshot(siteContentRef, (snapshot) => {
      if (snapshot.exists()) {
        const serverContent = snapshot.data() as Partial<SiteContent>;
        const mergedContent: SiteContent = {
          ...defaultSiteContent,
          ...serverContent,
          socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
          heroImages: serverContent.heroImages && serverContent.heroImages.length > 0 ? serverContent.heroImages : defaultSiteContent.heroImages,
          welcomeImages: serverContent.welcomeImages && serverContent.welcomeImages.length > 0 ? serverContent.welcomeImages : defaultSiteContent.welcomeImages,
          aboutImages: { ...defaultSiteContent.aboutImages, ...(serverContent.aboutImages || {}) },
          siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
          siteTexts: { ...defaultSiteContent.siteTexts, ...(serverContent.siteTexts || {}) },
        };
        setSiteContent(mergedContent);
      } else {
        setDoc(siteContentRef, defaultSiteContent);
        setSiteContent(defaultSiteContent);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      setLoading(false);
    });

    return () => { unsubscribeAuth(); unsubscribeSnapshot(); };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try { await signInWithEmailAndPassword(auth, "admin@kingaroos.com", password); return true; }
    catch (error) { return false; }
  };

  const logout = async () => { await signOut(auth); };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    if (!user) throw new Error("Not authenticated to make changes.");
    await setDoc(siteContentRef, updates, { merge: true });
  };

  const createCrudOperations = <T extends { id: string }>(stateKey: keyof SiteContent) => {
    const data = (siteContent[stateKey] as T[] | undefined) ?? [];
    const add = async (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: `id-${Date.now()}` } as T;
      await updateSiteContent({ [stateKey]: [...data, newItem] } as any);
    };
    const update = async (id: string, updates: Partial<T>) => {
      const newData = data.map(item => item.id === id ? { ...item, ...updates } : item);
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    const remove = async (id: string) => {
      const newData = data.filter(item => item.id !== id);
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    return { add, update, remove };
  };

  const dogOps = createCrudOperations<Dog>('dogs');
  const menuItemOps = createCrudOperations<MenuItem>('menuItems');
  const eventOps = createCrudOperations<Event>('events');
  const promotionOps = createCrudOperations<Promotion>('promotions');

  return (
    <AdminContext.Provider value={{
      isLoggedIn: !!user, login, logout, siteContent, loading, updateSiteContent,
      addDog: dogOps.add, updateDog: dogOps.update, deleteDog: dogOps.remove,
      addMenuItem: menuItemOps.add, updateMenuItem: menuItemOps.update, deleteMenuItem: menuItemOps.remove,
      addEvent: eventOps.add, updateEvent: eventOps.update, deleteEvent: eventOps.remove,
      addPromotion: promotionOps.add, updatePromotion: promotionOps.update, deletePromotion: promotionOps.remove,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
