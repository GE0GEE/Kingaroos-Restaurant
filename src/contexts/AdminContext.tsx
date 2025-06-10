import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  id: string;
  name: string;
  description: string;
  price: string;
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

export interface SiteContent {
  logoImage: string;
  heroImages: Array<{
    url: string;
    alt: string;
    gradient: string;
  }>;
  siteTexts: {
    homeTitle: string;
    homeSubtitle: string;
    welcomeTitle: string;
    welcomeText1: string;
    welcomeText2: string;
    menuPageTitle: string;
    menuPageSubtitle: string;
    dogRescueTitle: string;
    dogRescueSubtitle: string;
    eventsTitle: string;
    eventsSubtitle: string;
    promotionsTitle: string;
    promotionsSubtitle: string;
    aboutTitle: string;
    aboutSubtitle: string;
    contactTitle: string;
    contactSubtitle: string;
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
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const defaultSiteContent: SiteContent = {
  logoImage: "",
  heroImages: [
    {
      url: "/placeholder.svg",
      alt: "Restaurant exterior with outdoor seating and happy customers with dogs",
      gradient: "from-sand-300/80 to-brown-300/80",
    },
    {
      url: "/placeholder.svg",
      alt: "Delicious Australian food spread on wooden table",
      gradient: "from-aussie-orange/70 to-brown-400/80",
    },
    {
      url: "/placeholder.svg",
      alt: "Happy rescue dogs playing in restaurant garden area",
      gradient: "from-aussie-eucalyptus/60 to-sand-400/80",
    },
  ],
  siteTexts: {
    homeTitle: "KINGAROOS",
    homeSubtitle: "Great Food. Good Vibes. Helping Paws.",
    welcomeTitle: "Welcome to the Pack",
    welcomeText1:
      "At KINGAROOS, we believe great food brings people together – and their furry friends too! Our cozy restaurant serves up delicious Australian-inspired dishes in a warm, dog-friendly atmosphere where every meal makes a difference.",
    welcomeText2:
      "Started by the King family with a passion for good food and a love for rescue dogs, we've created a space where community, compassion, and culinary excellence come together.",
    menuPageTitle: "Our Menu",
    menuPageSubtitle:
      "Authentic Australian flavors with a modern twist. Every dish is made with love, and every purchase helps a rescue dog find their forever home.",
    dogRescueTitle: "Dogs We're Helping",
    dogRescueSubtitle:
      "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    eventsTitle: "Events & Happenings",
    eventsSubtitle:
      "Join us for special events, live music, and community gatherings. There's always something fun happening at KINGAROOS!",
    promotionsTitle: "Current Promotions",
    promotionsSubtitle:
      "Great food at even better prices! Check out our ongoing deals and special offers that make dining at KINGAROOS even more delicious.",
    aboutTitle: "Our Story",
    aboutSubtitle:
      "From a small food truck dream to a community gathering place that's changing lives, one meal and one rescue dog at a time.",
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Come visit us, give us a call, or connect with us online. We'd love to hear from you and welcome you to the KINGAROOS family!",
  },
  dogs: [],
  menuItems: [],
  events: [],
  promotions: [],
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [siteContent, setSiteContent] =
    useState<SiteContent>(defaultSiteContent);

  // Fetch content from server on mount
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/content`);
      if (response.ok) {
        const content = await response.json();
        setSiteContent(content);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedContent = await response.json();
        setSiteContent(updatedContent);
      }
    } catch (error) {
      console.error("Failed to update content:", error);
    }
  };

  const addDog = async (dog: Omit<Dog, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dog),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to add dog:", error);
    }
  };

  const updateDog = async (id: string, updates: Partial<Dog>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to update dog:", error);
    }
  };

  const deleteDog = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to delete dog:", error);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to add menu item:", error);
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to update menu item:", error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const addEvent = async (event: Omit<Event, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const addPromotion = async (promo: Omit<Promotion, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promo),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to add promotion:", error);
    }
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to update promotion:", error);
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchContent(); // Refresh content
      }
    } catch (error) {
      console.error("Failed to delete promotion:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        siteContent,
        loading,
        updateSiteContent,
        addDog,
        updateDog,
        deleteDog,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addEvent,
        updateEvent,
        deleteEvent,
        addPromotion,
        updatePromotion,
        deletePromotion,
      }}
    >
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
