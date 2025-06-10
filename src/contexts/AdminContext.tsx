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
  login: (password: string) => boolean;
  logout: () => void;
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  addDog: (dog: Omit<Dog, "id">) => void;
  updateDog: (id: string, dog: Partial<Dog>) => void;
  deleteDog: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addPromotion: (promo: Omit<Promotion, "id">) => void;
  updatePromotion: (id: string, promo: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

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
  ],
  menuItems: [
    {
      id: "1",
      name: "Aussie Damper Bread",
      description:
        "Traditional bush bread served warm with native pepper butter",
      price: "$12",
      featured: true,
      category: "starters",
    },
    {
      id: "2",
      name: "The Outback Burger",
      description:
        "Grass-fed beef, beetroot, egg, and our secret sauce on damper bun",
      price: "$28",
      featured: true,
      category: "mains",
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
  ],
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [siteContent, setSiteContent] =
    useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const saved = localStorage.getItem("kingaroos-admin-content");
    if (saved) {
      setSiteContent(JSON.parse(saved));
    }
  }, []);

  const saveContent = (content: SiteContent) => {
    setSiteContent(content);
    localStorage.setItem("kingaroos-admin-content", JSON.stringify(content));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateSiteContent = (updates: Partial<SiteContent>) => {
    const newContent = { ...siteContent, ...updates };
    saveContent(newContent);
  };

  const addDog = (dog: Omit<Dog, "id">) => {
    const newDog = { ...dog, id: Date.now().toString() };
    const newContent = {
      ...siteContent,
      dogs: [...siteContent.dogs, newDog],
    };
    saveContent(newContent);
  };

  const updateDog = (id: string, updates: Partial<Dog>) => {
    const newContent = {
      ...siteContent,
      dogs: siteContent.dogs.map((dog) =>
        dog.id === id ? { ...dog, ...updates } : dog,
      ),
    };
    saveContent(newContent);
  };

  const deleteDog = (id: string) => {
    const newContent = {
      ...siteContent,
      dogs: siteContent.dogs.filter((dog) => dog.id !== id),
    };
    saveContent(newContent);
  };

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() };
    const newContent = {
      ...siteContent,
      menuItems: [...siteContent.menuItems, newItem],
    };
    saveContent(newContent);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const newContent = {
      ...siteContent,
      menuItems: siteContent.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    };
    saveContent(newContent);
  };

  const deleteMenuItem = (id: string) => {
    const newContent = {
      ...siteContent,
      menuItems: siteContent.menuItems.filter((item) => item.id !== id),
    };
    saveContent(newContent);
  };

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = { ...event, id: Date.now().toString() };
    const newContent = {
      ...siteContent,
      events: [...siteContent.events, newEvent],
    };
    saveContent(newContent);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const newContent = {
      ...siteContent,
      events: siteContent.events.map((event) =>
        event.id === id ? { ...event, ...updates } : event,
      ),
    };
    saveContent(newContent);
  };

  const deleteEvent = (id: string) => {
    const newContent = {
      ...siteContent,
      events: siteContent.events.filter((event) => event.id !== id),
    };
    saveContent(newContent);
  };

  const addPromotion = (promo: Omit<Promotion, "id">) => {
    const newPromo = { ...promo, id: Date.now().toString() };
    const newContent = {
      ...siteContent,
      promotions: [...siteContent.promotions, newPromo],
    };
    saveContent(newContent);
  };

  const updatePromotion = (id: string, updates: Partial<Promotion>) => {
    const newContent = {
      ...siteContent,
      promotions: siteContent.promotions.map((promo) =>
        promo.id === id ? { ...promo, ...updates } : promo,
      ),
    };
    saveContent(newContent);
  };

  const deletePromotion = (id: string) => {
    const newContent = {
      ...siteContent,
      promotions: siteContent.promotions.filter((promo) => promo.id !== id),
    };
    saveContent(newContent);
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        siteContent,
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
