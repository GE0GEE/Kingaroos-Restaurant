import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// --- INTERFACES ---
export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  personality: string;
  beforeImage: string;
  afterImage: string;
  rescueStory: string;
}

export interface MenuItem {
  id:string;
  name: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  category: "starters" | "mains" | "desserts" | "drinks";
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: "music" | "dogs" | "family" | "special" | "food";
  category: "thisWeek" | "comingSoon";
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  description: string;
  badge: string;
  color: string;
}

// This interface matches the latest one you provided
export interface SiteContent {
  logoImage: string;
  theme: 'light' | 'dark'; // Kept as per your latest file structure
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  heroImages: Array<{
    url: string;
    alt: string;
    gradient: string;
  }>;
  welcomeImages: Array<{
    url: string;
    alt: string;
  }>;
  siteImages: {
    familyPhoto: string;
    originalFoodTruck: string;
    firstRescueDog: string;
    dogRescuePlaceholderImage: string;
  };
  siteTexts: {
    [key: string]: any; // Allows for flexible text fields
  };
  dogs: Dog[];
  menuItems: MenuItem[];
  events: Event[];
  promotions: Promotion[];
}

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  siteContent: SiteContent;
  loading: boolean;
  isServerConnected: boolean;
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

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://kingaroos-backend.onrender.com/api";

const ADMIN_PASSWORD = "kingarooadmin";

// A minimal default state. The `initializeContent` function will populate this.
const defaultSiteContent: SiteContent = {
  logoImage: "",
  theme: 'light',
  socialLinks: { facebook: "", instagram: "", twitter: "" },
  heroImages: [],
  welcomeImages: [],
  siteImages: { familyPhoto: "", originalFoodTruck: "", firstRescueDog: "", dogRescuePlaceholderImage: ""},
  siteTexts: {},
  dogs: [],
  menuItems: [],
  events: [],
  promotions: [],
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // --- FIX 1: THE KEEP-ALIVE PING ---
  // This runs for every user and pings the backend every 10 minutes
  // to prevent it from going to sleep on free hosting services.
  useEffect(() => {
    const keepAliveInterval = setInterval(() => {
      fetch(`${API_BASE_URL}/content`).then(response => {
        if (response.ok) {
          console.log(`Keep-alive ping successful at ${new Date().toLocaleTimeString()}`);
          if (!isServerConnected) setIsServerConnected(true);
        } else {
          if (isServerConnected) setIsServerConnected(false);
        }
      }).catch(() => {
        console.warn('Keep-alive ping failed. Server might be offline.');
        if (isServerConnected) setIsServerConnected(false);
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(keepAliveInterval);
  }, [isServerConnected]); // Dependency ensures we can update connection status

  useEffect(() => {
    initializeContent();
  }, []);

  const initializeContent = async () => {
    setLoading(true);
    try {
      // Attempt to fetch fresh data from the server
      const response = await fetch(`${API_BASE_URL}/content`, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      
      const serverContent = await response.json();
      
      // Deep merge server content with defaults to prevent crashes from missing fields
      const mergedContent = {
        ...defaultSiteContent,
        ...serverContent,
        siteTexts: { ...defaultSiteContent.siteTexts, ...(serverContent.siteTexts || {}) },
        siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
        socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
      };

      setSiteContent(mergedContent);
      setIsServerConnected(true);
      console.log("✅ Data successfully loaded from server.");

    } catch (error) {
      console.warn("⚠️ Server not available, using local data as fallback.", error);
      setIsServerConnected(false);

      // If server fails, fall back to localStorage
      const saved = localStorage.getItem("kingaroos-admin-content");
      if (saved) {
        try {
          const localContent = JSON.parse(saved);
          // Also merge local content with defaults to be safe
          const mergedContent = {
            ...defaultSiteContent,
            ...localContent,
            siteTexts: { ...defaultSiteContent.siteTexts, ...(localContent.siteTexts || {}) },
            siteImages: { ...defaultSiteContent.siteImages, ...(localContent.siteImages || {}) },
            socialLinks: { ...defaultSiteContent.socialLinks, ...(localContent.socialLinks || {}) },
          };
          setSiteContent(mergedContent);
          console.log("📱 Displaying content from local storage.");
        } catch {
          setSiteContent(defaultSiteContent); // If local data is corrupted
        }
      } else {
        setSiteContent(defaultSiteContent); // If no local data, use defaults
        console.log("🔄 No local data found, using default content.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = (content: SiteContent) => {
    localStorage.setItem("kingaroos-admin-content", JSON.stringify(content));
  };

  const apiCall = async (url: string, options: RequestInit = {}) => {
    if (!isServerConnected) throw new Error("Server not available for API call");
    const response = await fetch(`${API_BASE_URL}${url}`, {
      signal: AbortSignal.timeout(10000), ...options, headers: { "Content-Type": "application/json", ...options.headers },
    });
    if (!response.ok) throw new Error(`API call to ${url} failed: ${response.status}`);
    return response.json();
  };
  
  const login = async (password: string): Promise<boolean> => {
    if (password !== ADMIN_PASSWORD) return false;
    setIsLoggedIn(true);
    await initializeContent(); // Re-fetch content on login to get latest data
    return true;
  };

  const logout = () => setIsLoggedIn(false);
  
  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    // Optimistically update the local state for a fast UI
    const newContent = {
      ...siteContent,
      ...updates,
      // Ensure nested objects are merged correctly
      siteTexts: { ...siteContent.siteTexts, ...updates.siteTexts },
      siteImages: { ...siteContent.siteImages, ...updates.siteImages },
      socialLinks: { ...siteContent.socialLinks, ...updates.socialLinks },
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
    
    // Attempt to sync with the server
    if (isServerConnected) {
      try {
        await apiCall("/content", { method: "PUT", body: JSON.stringify(updates) });
      } catch (error) {
        console.error("Server update failed, changes are saved locally.", error);
        setIsServerConnected(false);
      }
    }
  };

  const createCrudOperations = <T extends { id: string }>(endpoint: string, stateKey: keyof SiteContent) => {
    const data = (siteContent[stateKey] as T[] | undefined) ?? [];
    
    const add = async (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: Date.now().toString() } as T;
      const newContent = { ...siteContent, [stateKey]: [...data, newItem] };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) { try { await apiCall(`/${endpoint}`, { method: 'POST', body: JSON.stringify(item) }); await initializeContent(); } catch (e) { setIsServerConnected(false); } }
    };

    const update = async (id: string, updates: Partial<T>) => {
      const newData = data.map(item => item.id === id ? { ...item, ...updates } : item);
      const newContent = { ...siteContent, [stateKey]: newData };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) { try { await apiCall(`/${endpoint}/${id}`, { method: 'PUT', body: JSON.stringify(updates) }); await initializeContent(); } catch (e) { setIsServerConnected(false); } }
    };

    const remove = async (id: string) => {
      const newData = data.filter(item => item.id !== id);
      const newContent = { ...siteContent, [stateKey]: newData };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) { try { await apiCall(`/${endpoint}/${id}`, { method: 'DELETE' }); await initializeContent(); } catch (e) { setIsServerConnected(false); } }
    };
    
    return { add, update, remove };
  };

  const dogOps = createCrudOperations<Dog>('dogs', 'dogs');
  const menuItemOps = createCrudOperations<MenuItem>('menu-items', 'menuItems');
  const eventOps = createCrudOperations<Event>('events', 'events');
  const promotionOps = createCrudOperations<Promotion>('promotions', 'promotions');

  return (
    <AdminContext.Provider value={{
        isLoggedIn, login, logout, siteContent, loading, isServerConnected, updateSiteContent,
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
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
