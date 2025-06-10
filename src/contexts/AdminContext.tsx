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
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const ADMIN_PASSWORD = "kingarooadmin";

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
  dogs: [
    {
      id: "1",
      name: "Bandit",
      breed: "Border Collie Mix",
      age: "3 years old",
      personality:
        "Energetic and loves playing fetch. Great with kids and other dogs.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Found wandering the streets, scared and malnourished. Now a confident, happy dog ready for adventure!",
    },
    {
      id: "2",
      name: "Rosie",
      breed: "Golden Retriever Mix",
      age: "5 years old",
      personality:
        "Gentle soul who loves cuddles and long walks. Perfect family dog.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Abandoned at a shelter, she was shy and withdrawn. Today she's full of love and ready to be someone's best friend!",
    },
    {
      id: "3",
      name: "Max",
      breed: "Australian Cattle Dog",
      age: "2 years old",
      personality:
        "Smart and loyal. Needs an active family who loves adventures.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Came to us as an injured puppy. After months of care and training, he's now a strong, healthy young dog!",
    },
    {
      id: "4",
      name: "Luna",
      breed: "Labrador Mix",
      age: "4 years old",
      personality: "Sweet and calm, loves children and is great with cats too.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Rescued from neglect, she was fearful of humans. Now she's the sweetest, most trusting companion you could ask for!",
    },
  ],
  menuItems: [
    {
      id: "1",
      name: "Aussie Damper Bread",
      description:
        "Traditional bush bread served warm with native pepper butter",
      price: "$12",
      image: "/placeholder.svg",
      featured: true,
      category: "starters",
    },
    {
      id: "2",
      name: "Kangaroo Carpaccio",
      description: "Thinly sliced kangaroo with native herbs and lemon myrtle",
      price: "$18",
      image: "/placeholder.svg",
      category: "starters",
    },
    {
      id: "3",
      name: "Salt & Pepper Calamari",
      description: "Fresh local calamari with bush tomato aioli",
      price: "$16",
      image: "/placeholder.svg",
      category: "starters",
    },
    {
      id: "4",
      name: "The Outback Burger",
      description:
        "Grass-fed beef, beetroot, egg, and our secret sauce on damper bun",
      price: "$28",
      image: "/placeholder.svg",
      featured: true,
      category: "mains",
    },
    {
      id: "5",
      name: "Barramundi & Chips",
      description:
        "Beer-battered barramundi with hand-cut chips and mushy peas",
      price: "$32",
      image: "/placeholder.svg",
      category: "mains",
    },
    {
      id: "6",
      name: "Slow-Cooked Lamb",
      description:
        "Rosemary lamb shoulder with roasted vegetables and mint jus",
      price: "$36",
      image: "/placeholder.svg",
      category: "mains",
    },
    {
      id: "7",
      name: "Lamington Trifle",
      description: "Layers of sponge, cream, and berry compote with coconut",
      price: "$14",
      image: "/placeholder.svg",
      category: "desserts",
    },
    {
      id: "8",
      name: "Pavlova Stack",
      description: "Mini pavlovas with native fruits and cream",
      price: "$16",
      image: "/placeholder.svg",
      featured: true,
      category: "desserts",
    },
    {
      id: "9",
      name: "Flat White",
      description: "Premium Australian coffee blend",
      price: "$5",
      image: "/placeholder.svg",
      category: "drinks",
    },
    {
      id: "10",
      name: "Lemon Myrtle Spritz",
      description: "Refreshing native citrus cocktail",
      price: "$14",
      image: "/placeholder.svg",
      featured: true,
      category: "drinks",
    },
  ],
  events: [
    {
      id: "1",
      title: "Live Acoustic Friday",
      date: "Friday, Dec 8",
      time: "7:00 PM - 9:00 PM",
      description: "Local musicians perform acoustic sets while you dine",
      type: "music",
      category: "thisWeek",
    },
    {
      id: "2",
      title: "Puppy Playdate",
      date: "Saturday, Dec 9",
      time: "10:00 AM - 12:00 PM",
      description:
        "Bring your pups for a social morning with other dog families",
      type: "dogs",
      category: "thisWeek",
    },
    {
      id: "3",
      title: "Sunday Brunch & Trivia",
      date: "Sunday, Dec 10",
      time: "11:00 AM - 2:00 PM",
      description: "Family-friendly trivia with prizes and bottomless coffee",
      type: "family",
      category: "thisWeek",
    },
    {
      id: "4",
      title: "Christmas Carol Singalong",
      date: "Friday, Dec 15",
      time: "6:00 PM - 8:00 PM",
      description: "Join us for festive carols and holiday cheer",
      type: "music",
      category: "comingSoon",
    },
    {
      id: "5",
      title: "Rescue Dog Meet & Greet",
      date: "Saturday, Dec 16",
      time: "1:00 PM - 4:00 PM",
      description: "Meet adoptable dogs from our partner rescue organizations",
      type: "dogs",
      category: "comingSoon",
    },
    {
      id: "6",
      title: "New Year's Family Feast",
      date: "Sunday, Dec 31",
      time: "5:00 PM - 9:00 PM",
      description: "Celebrate the new year with a special family-style dinner",
      type: "special",
      category: "comingSoon",
    },
  ],
  promotions: [
    {
      id: "1",
      title: "Happy Hour Special",
      subtitle: "Monday, Wednesday & Friday",
      details: "20% off all drinks from 2-5 PM",
      description: "Unwind with discounted drinks and great vibes",
      badge: "Weekly Deal",
      color: "from-aussie-orange to-aussie-burnt-red",
    },
    {
      id: "2",
      title: "Every Meal Helps Rescue a Dog!",
      subtitle: "With Every Purchase",
      details: "$2 from every main dish goes to dog rescue",
      description: "Dine with purpose and make a difference",
      badge: "Always Active",
      color: "from-aussie-eucalyptus to-green-600",
    },
    {
      id: "3",
      title: "Bring Your Pooch Discount",
      subtitle: "Dog-Friendly Dining",
      details: "10% off when you bring your well-behaved dog",
      description: "We love our four-legged customers!",
      badge: "Dog Special",
      color: "from-brown-600 to-brown-800",
    },
    {
      id: "4",
      title: "Family Feast Sunday",
      subtitle: "Every Sunday",
      details: "Kids eat free with adult main dish purchase",
      description: "Perfect for family outings and bonding time",
      badge: "Family Deal",
      color: "from-sand-500 to-brown-500",
    },
    {
      id: "5",
      title: "Birthday Club",
      subtitle: "Join Our Community",
      details: "Free dessert on your birthday month",
      description: "Sign up in-store to join our birthday club",
      badge: "Loyalty Program",
      color: "from-aussie-burnt-red to-red-700",
    },
    {
      id: "6",
      title: "Early Bird Special",
      subtitle: "Before 6 PM Weekdays",
      details: "15% off all main dishes",
      description: "Beat the rush and save on dinner",
      badge: "Weekday Deal",
      color: "from-brown-500 to-aussie-orange",
    },
  ],
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [siteContent, setSiteContent] =
    useState<SiteContent>(defaultSiteContent);

  // Check server connectivity and load content
  useEffect(() => {
    initializeContent();
  }, []);

  const initializeContent = async () => {
    try {
      setLoading(true);

      // Try to fetch from server first
      const response = await fetch(`${API_BASE_URL}/content`, {
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (response.ok) {
        const content = await response.json();
        setSiteContent(content);
        setIsServerConnected(true);
        console.log("✅ Connected to server");
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.warn(
        "⚠️ Server not available, using localStorage fallback:",
        error,
      );
      setIsServerConnected(false);

      // Fallback to localStorage
      const saved = localStorage.getItem("kingaroos-admin-content");
      if (saved) {
        try {
          const parsedContent = JSON.parse(saved);
          setSiteContent(parsedContent);
          console.log("📱 Loaded content from localStorage");
        } catch (parseError) {
          console.error("Failed to parse localStorage content:", parseError);
          setSiteContent(defaultSiteContent);
        }
      } else {
        setSiteContent(defaultSiteContent);
        console.log("🔄 Using default content");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = (content: SiteContent) => {
    try {
      localStorage.setItem("kingaroos-admin-content", JSON.stringify(content));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };

  const apiCall = async (url: string, options: RequestInit = {}) => {
    if (!isServerConnected) {
      throw new Error("Server not available");
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      signal: AbortSignal.timeout(10000), // 10 second timeout
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    return response.json();
  };

  const login = async (password: string): Promise<boolean> => {
    // Always check password locally first
    if (password !== ADMIN_PASSWORD) {
      return false;
    }

    // If server is available, validate with server
    if (isServerConnected) {
      try {
        await apiCall("/admin/login", {
          method: "POST",
          body: JSON.stringify({ password }),
        });
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        console.error("Server login failed, using local validation:", error);
        setIsServerConnected(false);
      }
    }

    // Fallback to local validation
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    const newContent = { ...siteContent, ...updates };

    if (isServerConnected) {
      try {
        const updatedContent = await apiCall("/content", {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        setSiteContent(updatedContent);
        saveToLocalStorage(updatedContent);
        return;
      } catch (error) {
        console.error("Server update failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    // Fallback to localStorage
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const addDog = async (dog: Omit<Dog, "id">) => {
    const newDog = { ...dog, id: Date.now().toString() };

    if (isServerConnected) {
      try {
        await apiCall("/dogs", {
          method: "POST",
          body: JSON.stringify(dog),
        });
        await initializeContent(); // Refresh from server
        return;
      } catch (error) {
        console.error("Server add dog failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    // Fallback to localStorage
    const newContent = {
      ...siteContent,
      dogs: [...siteContent.dogs, newDog],
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const updateDog = async (id: string, updates: Partial<Dog>) => {
    if (isServerConnected) {
      try {
        await apiCall(`/dogs/${id}`, {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        await initializeContent(); // Refresh from server
        return;
      } catch (error) {
        console.error("Server update dog failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    // Fallback to localStorage
    const newContent = {
      ...siteContent,
      dogs: siteContent.dogs.map((dog) =>
        dog.id === id ? { ...dog, ...updates } : dog,
      ),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const deleteDog = async (id: string) => {
    if (isServerConnected) {
      try {
        await apiCall(`/dogs/${id}`, {
          method: "DELETE",
        });
        await initializeContent(); // Refresh from server
        return;
      } catch (error) {
        console.error("Server delete dog failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    // Fallback to localStorage
    const newContent = {
      ...siteContent,
      dogs: siteContent.dogs.filter((dog) => dog.id !== id),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() };

    if (isServerConnected) {
      try {
        await apiCall("/menu-items", {
          method: "POST",
          body: JSON.stringify(item),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server add menu item failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      menuItems: [...siteContent.menuItems, newItem],
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    if (isServerConnected) {
      try {
        await apiCall(`/menu-items/${id}`, {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server update menu item failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      menuItems: siteContent.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const deleteMenuItem = async (id: string) => {
    if (isServerConnected) {
      try {
        await apiCall(`/menu-items/${id}`, {
          method: "DELETE",
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server delete menu item failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      menuItems: siteContent.menuItems.filter((item) => item.id !== id),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const addEvent = async (event: Omit<Event, "id">) => {
    const newEvent = { ...event, id: Date.now().toString() };

    if (isServerConnected) {
      try {
        await apiCall("/events", {
          method: "POST",
          body: JSON.stringify(event),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error("Server add event failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      events: [...siteContent.events, newEvent],
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    if (isServerConnected) {
      try {
        await apiCall(`/events/${id}`, {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error("Server update event failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      events: siteContent.events.map((event) =>
        event.id === id ? { ...event, ...updates } : event,
      ),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const deleteEvent = async (id: string) => {
    if (isServerConnected) {
      try {
        await apiCall(`/events/${id}`, {
          method: "DELETE",
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error("Server delete event failed, using localStorage:", error);
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      events: siteContent.events.filter((event) => event.id !== id),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const addPromotion = async (promo: Omit<Promotion, "id">) => {
    const newPromo = { ...promo, id: Date.now().toString() };

    if (isServerConnected) {
      try {
        await apiCall("/promotions", {
          method: "POST",
          body: JSON.stringify(promo),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server add promotion failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      promotions: [...siteContent.promotions, newPromo],
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    if (isServerConnected) {
      try {
        await apiCall(`/promotions/${id}`, {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server update promotion failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      promotions: siteContent.promotions.map((promo) =>
        promo.id === id ? { ...promo, ...updates } : promo,
      ),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  const deletePromotion = async (id: string) => {
    if (isServerConnected) {
      try {
        await apiCall(`/promotions/${id}`, {
          method: "DELETE",
        });
        await initializeContent();
        return;
      } catch (error) {
        console.error(
          "Server delete promotion failed, using localStorage:",
          error,
        );
        setIsServerConnected(false);
      }
    }

    const newContent = {
      ...siteContent,
      promotions: siteContent.promotions.filter((promo) => promo.id !== id),
    };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        siteContent,
        loading,
        isServerConnected,
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
