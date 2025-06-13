import {
  createContext,
 string; firstRescueDog: string; dogRescuePlaceholderImage: string; };
  siteTexts: { [key  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
: string]: any; };
  dogs: Dog[];
  menuItems: MenuItem[];
  events: Eventimport { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  signInWithEmail[];
  promotions: Promotion[];
}

// Default content to prevent crashes before Firebase loads
const defaultSiteContent:AndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth"; SiteContent = {
  logoImage: "", theme: 'light', socialLinks: { facebook: "", instagram:
import { db, auth } from "../firebase-config"; // This imports the file you created

// --- YOUR INTERFACES ---
export interface Dog { id: string; name: string; breed: string; age: string "", twitter: "" },
  heroImages: [], welcomeImages: [],
  siteImages: { familyPhoto: "", originalFoodTruck: "", firstRescueDog: "", dogRescuePlaceholderImage: "" },
  siteTexts: {},; personality: string; beforeImage: string; afterImage: string; rescueStory: string; }
export interface MenuItem { id:string; name: string; description: string; price: string; image: string; featured?: boolean; category dogs: [], menuItems: [], events: [], promotions: [],
};

// --- THIS IS THE CORRECTED INTERFACE ---
: "starters" | "mains" | "desserts" | "drinks"; }
export interface Eventinterface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => Promise< { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek"boolean>;
  logout: () => void;
  siteContent: SiteContent;
  loading: boolean;
  updateSiteContent: (content: Partial<SiteContent>) => Promise<void>;
  addDog: | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; badge: string; color: string; }
export interface SiteContent {
   (dog: Omit<Dog, "id">) => Promise<void>;
  updateDog: (id: string, dog: Partial<Dog>) => Promise<void>;
  deleteDog: (id: string)logoImage: string;
  theme: 'light' | 'dark';
  socialLinks: { facebook: => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; gradient: string; }>;
  welcomeImages: Array<{ url:string; alt: string; }>;
<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addEvent: (event: O  siteImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; dogRescuemit<Event, "id">) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<voidPlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs:>;
  addPromotion: (promo: Omit<Promotion, "id">) => Promise<void>;
 Dog[];
  menuItems: MenuItem[];
  events: Event[];
  promotions: Promotion[];
}  updatePromotion: (id: string, promo: Partial<Promotion>) => Promise<void>;
  deletePromotion

const defaultSiteContent: SiteContent = {
  logoImage: "", theme: 'light', socialLinks: { facebook: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType |: "", instagram: "", twitter: "" },
  heroImages: [], welcomeImages: [],
  siteImages: { familyPhoto: "", originalFoodTruck: "", firstRescueDog: "", dogRescuePlaceholderImage: ""},
   undefined>(undefined);

// A direct reference to our single document in the Firestore database.
const siteContentRef = doc(siteTexts: {}, dogs: [], menuItems: [], events: [], promotions: [],
};

// This is the new,db, "content", "main");

export function AdminProvider({ children }: { children: ReactNode }) {
 simplified type for our context
interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading]) => Promise<boolean>;
  logout: () => void;
  siteContent: SiteContent;
   = useState(true);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    // This listener checks if the admin is logged in or not.
loading: boolean;
  updateSiteContent: (content: Partial<SiteContent>) => Promise<void>;
  addDog: (dog: Omit<Dog, "id">) => Promise<void>;
  update    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    Dog: (id: string, dog: Partial<Dog>) => Promise<void>;
  deleteDog: (});

    // This listener gets data from Firebase in REAL-TIME.
    // Any change in the database will automatically updateid: string) => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id the website on all devices.
    const unsubscribeSnapshot = onSnapshot(siteContentRef, (snapshot) => {
      ">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) =>if (snapshot.exists()) {
        const serverContent = snapshot.data() as SiteContent;
        // Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addEvent: Merge with defaults to prevent the app from crashing if a new field is added to the code
        const mergedContent = { ... (event: Omit<Event, "id">) => Promise<void>;
  updateEvent: (iddefaultSiteContent, ...serverContent,
            siteTexts: { ...defaultSiteContent.siteTexts, ...(server: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string)Content.siteTexts || {}) },
            siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
            socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent. => Promise<void>;
  addPromotion: (promo: Omit<Promotion, "id">) => Promise<void>;
  updatePromotion: (id: string, promo: Partial<Promotion>) => Promise<void>;socialLinks || {}) },
        };
        setSiteContent(mergedContent);
      } else {
        
  deletePromotion: (id: string) => Promise<void>;
}

const AdminContext = createContext<// This runs only ONCE, the very first time the app connects to an empty database.
        console.logAdminContextType | undefined>(undefined);

// A direct reference to our single document in the Firestore database.
const siteContent("No content document in Firebase. Creating one with default data.");
        setDoc(siteContentRef, defaultSiteRef = doc(db, "content", "main");

export function AdminProvider({ children }: { children: ReactContent);
        setSiteContent(defaultSiteContent);
      }
      setLoading(false);
    Node }) {
  const [user, setUser] = useState<User | null>(null);
  const [}, (error) => {
      console.error("Firebase Snapshot Error:", error);
      setLoading(falseloading, setLoading] = useState(true);
  const [siteContent, setSiteContent] = useState<Site);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      unsubscribeAuth();Content>(defaultSiteContent);

  useEffect(() => {
    // This listener checks if the admin is logged in
      unsubscribeSnapshot();
    };
  }, []);

  const login = async (password: string): Promise<boolean> or not.
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser( => {
    try {
      // Use the email you created in the Firebase console.
      await signInWithEmailAndPassword(currentUser);
    });

    // This listener gets data from Firebase in REAL-TIME.
    // Any change in the databaseauth, "admin@kingaroos.com", password);
      return true;
    } catch (error) will automatically update the website on all devices.
    const unsubscribeSnapshot = onSnapshot(siteContentRef, (snapshot {
      console.error("Firebase login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateSite) => {
      if (snapshot.exists()) {
        const serverContent = snapshot.data() as SiteContent = async (updates: Partial<SiteContent>) => {
    if (!user) {
      throw newContent;
        // Merge with defaults to prevent the app from crashing if a new field is added to the code
        const mergedContent = { ...defaultSiteContent, ...serverContent,
            siteTexts: { ...defaultSiteContent.site Error("Not authenticated. You must be logged in to make changes.");
    }
    // 'setDoc' with 'merge: true' is a powerful way to update only the fields you provide.
    await setDoc(siteContentTexts, ...(serverContent.siteTexts || {}) },
            siteImages: { ...defaultSiteContent.siteImagesRef, updates, { merge: true });
  };

  // This is a generic helper function to create add, ...(serverContent.siteImages || {}) },
            socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
        };
        setSiteContent(mergedContent);
      }/update/delete logic for any array in our data.
  const createCrudOperations = <T extends { id else {
        // This runs only ONCE, the very first time the app connects to an empty database.
: string }>(stateKey: keyof SiteContent) => {
    const data = (siteContent[state        console.log("No content document in Firebase. Creating one with default data.");
        setDoc(siteContentKey] as T[] | undefined) ?? [];
    
    const add = async (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: `id-${Date.Ref, defaultSiteContent);
        setSiteContent(defaultSiteContent);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      now()}` } as T;
      await updateSiteContent({ [stateKey]: [...data, newItem] }setLoading(false);
    });

    // Cleanup function to prevent memory leaks
    return () => {
 as any);
    };

    const update = async (id: string, updates: Partial<T>) =>      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const login = async (password: string): {
      const newData = data.map(item => item.id === id ? { ...item, ...updates } : item);
      await updateSiteContent({ [stateKey]: newData } as any);
    };

 Promise<boolean> => {
    try {
      // Use the email you created in the Firebase console.
      await signInWithEmailAndPassword(auth, "admin@kingaroos.com", password);
      return true;
    }    const remove = async (id: string) => {
      const newData = data.filter(item => item.id !== id);
      await updateSiteContent({ [stateKey]: newData } as any);
    }; catch (error) {
      console.error("Firebase login failed:", error);
      return false;
    
    
    return { add, update, remove };
  };

  const dogOps = createCrudOperations}
  };

  const logout = async () => {
    await signOut(auth);
  };

<Dog>('dogs');
  const menuItemOps = createCrudOperations<MenuItem>('menuItems');
    const updateSiteContent = async (updates: Partial<SiteContent>) => {
    if (!user) {
      throw new Error("Not authenticated. You must be logged in to make changes.");
    }
    //const eventOps = createCrudOperations<Event>('events');
  const promotionOps = createCrudOperations<Promotion 'setDoc' with 'merge: true' is a powerful way to update only the fields you provide.
    >('promotions');

  return (
    <AdminContext.Provider value={{
      isLoggedIn: !!user,
      login,
      logout,
      siteContent,
      loading,
      updateSiteContentawait setDoc(siteContentRef, updates, { merge: true });
  };

  // This is a,
      addDog: dogOps.add,
      updateDog: dogOps.update,
      delete generic helper function to create add/update/delete logic for any array in our data.
  const createCrudOperationsDog: dogOps.remove,
      addMenuItem: menuItemOps.add,
      updateMenuItem: menuItemOps = <T extends { id: string }>(stateKey: keyof SiteContent) => {
    const data = (siteContent[stateKey] as T[] | undefined) ?? [];
    
    const add = async.update,
      deleteMenuItem: menuItemOps.remove,
      addEvent: eventOps.add,
      updateEvent: eventOps.update,
      deleteEvent: eventOps.remove,
      addPromotion: (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: `id-${Date.now()}` } as T;
      await updateSiteContent({ [stateKey]: promotionOps.add,
      updatePromotion: promotionOps.update,
      deletePromotion: promotionOps.remove,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export [...data, newItem] } as any);
    };

    const update = async (id: string, updates function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    : Partial<T>) => {
      const newData = data.map(item => item.id === id ?throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
} { ...item, ...updates } : item);
      await updateSiteContent({ [stateKey]: newData } as any);
    };

    const remove = async (id: string) => {
      const newData = data