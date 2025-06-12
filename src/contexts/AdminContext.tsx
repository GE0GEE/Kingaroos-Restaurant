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

export interface SiteContent {
  logoImage: string;
  theme: 'light' | 'dark';
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
    // Header
    siteName: string;
    headerNavHome: string;
    headerNavMenu: string;
    headerNavEvents: string;
    headerNavPromotions: string;
    headerNavAbout: string;
    headerNavDogRescue: string;
    headerNavContact: string;

    // Home Page
    homeTitle: string;
    homeSubtitle: string;
    homeViewMenuButton: string;
    homeLearnMoreButton: string;

    welcomeTitle: string;
    welcomeText1: string;
    welcomeText2: string;
    welcomeImage1Caption: string;
    welcomeImage2Caption: string;

    homeHighlightsTitle: string;
    dogFriendlyTitle: string;
    dogFriendlyText: string;
    aussieFoodTitle: string;
    aussieFoodText: string;
    rescueHelpTitle: string;
    rescueHelpText: string;

    homeVisitTitle: string;
    homeHoursTitle: string;
    homeLocationTitle: string;
    homeAddress: string;
    homePhone: string;
    homeEmail: string;
    googleMapsUrl: string;
    hoursWeekday: string;
    hoursWeekend: string;
    hoursSunday: string;

    // Menu Page
    menuPageTitle: string;
    menuPageSubtitle: string;
    menuReadyToDineTitle: string;
    menuReadyToDineText: string;
    menuCallText: string;
    menuAddressText: string;

    // Dog Rescue Page
    dogRescueTitle: string;
    dogRescueSubtitle: string;
    dogRescueImpactTitle: string;
    dogRescueEveryMealTitle: string;
    dogRescueEveryMealText: string;
    dogRescueMeetTitle: string;
    dogRescueMeetSubtitle: string;
    dogRescueClickInstruction: string;
    dogRescueNoDogsText: string;
    dogRescueWantToKnowTitle: string;
    dogRescueWantToKnowText: string;
    dogRescueGetInvolvedTitle: string;
    dogRescueGetInvolvedText: string;

    // Events Page
    eventsTitle: string;
    eventsSubtitle: string;
    eventsThisWeekTitle: string;
    eventsComingSoonTitle: string;
    eventsNoThisWeekText: string;
    eventsNoComingSoonText: string;
    eventsTypesTitle: string;
    eventsDontMissTitle: string;
    eventsDontMissText: string;
    eventsCallText: string;
    eventsFacebookText: string;
    eventsInstagramText: string;

    // Promotions Page
    promotionsTitle: string;
    promotionsSubtitle: string;
    promotionsNoOffersText: string;
    promotionsTermsTitle: string;
    promotionsReadyToSaveTitle: string;
    promotionsReadyToSaveText: string;
    promotionsCallAheadText: string;
    promotionsAddressText: string;
    promotionsFollowText: string;
    promotionsCtaPhoneNumber: string;
    promotionsCtaAddress: string;

    // About Page
    aboutTitle: string;
    aboutSubtitle: string;
    aboutMeetFamilyTitle: string;
    aboutStoryParagraph1: string;
    aboutStoryParagraph2: string;
    aboutStoryParagraph3: string;
    aboutJourneyTitle: string;
    aboutFoodTruckTitle: string;
    aboutFoodTruckText: string;
    aboutRescuePartnershipTitle: string;
    aboutRescuePartnershipText: string;
    aboutRestaurantOpensTitle: string;
    aboutRestaurantOpensText: string;
    aboutMissionTitle: string;
    aboutMissionQuote: string;
    aboutMissionSignature: string;
    aboutValuesTitle: string;
    aboutCompassionTitle: string;
    aboutCompassionText: string;
    aboutCommunityTitle: string;
    aboutCommunityText: string;
    aboutQualityTitle: string;
    aboutQualityText: string;

    // Contact Page
    contactTitle: string;
    contactSubtitle: string;
    contactLocationTitle: string;
    contactLocationName: string;
    contactLocationAddress: string;
    contactLocationCity: string;
    contactLocationCountry: string;
    contactParkingText: string;
    contactHoursTitle: string;
    contactMondayThursday: string;
    contactFridaySaturday: string;
    contactSunday: string;
    contactKitchenClosesText: string;
    contactDetailsTitle: string;
    contactPhoneDescription: string;
    contactEmailDescription: string;
    contactFindUsTitle: string;
    contactFollowTitle: string;
    contactFollowText: string;
    contactFacebookDescription: string;
    contactInstagramDescription: string;
    contactGoodToKnowTitle: string;
    contactDogPolicyTitle: string;
    contactReservationsTitle: string;
    contactParkingAccessTitle: string;
    contactPaymentTitle: string;
    contactCantWaitTitle: string;
    contactCantWaitText: string;
    contactSeeYouText: string;
    contactDogPolicy1: string;
    contactDogPolicy2: string;
    contactDogPolicy3: string;
    contactDogPolicy4: string;
    contactReservations1: string;
    contactReservations2: string;
    contactReservations3: string;
    contactReservations4: string;
    contactParkingAccess1: string;
    contactParkingAccess2: string;
    contactParkingAccess3: string;
    contactParkingAccess4: string;
    contactPayment1: string;
    contactPayment2: string;
    contactPayment3: string;
    contactPayment4: string;
    contactInstagramHandle: string;
    contactMapLatitude: number;
    contactMapLongitude: number;

    // Footer
    footerTagline: string;
    footerContactTitle: string;
    footerHoursSocialTitle: string;
    footerCopyright: string;

    // Admin Login
    adminLoginTitle: string;
    adminPasswordLabel: string;
    adminPasswordPlaceholder: string;
    adminLoginButton: string;
    adminCancelButton: string;
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

const defaultSiteContent: SiteContent = {
  logoImage: "",
  theme: 'light',
  socialLinks: {
    facebook: "https://facebook.com/KingaroosRestaurant",
    instagram: "https://instagram.com/kingaroos_sydney",
    twitter: "https://twitter.com/kingaroos_syd",
  },
  heroImages: [
    { url: "/placeholder.svg", alt: "Restaurant exterior", gradient: "from-brown-800/40 to-brown-900/60" },
    { url: "/placeholder.svg", alt: "Delicious Australian food", gradient: "from-aussie-orange/70 to-brown-400/80" },
    { url: "/placeholder.svg", alt: "Happy rescue dogs", gradient: "from-aussie-eucalyptus/60 to-sand-400/80" },
  ],
  welcomeImages: [
      { url: "/placeholder.svg", alt: "Happy customers with their dogs" },
      { url: "/placeholder.svg", alt: "A spread of delicious food on a table" },
  ],
  siteImages: {
    familyPhoto: "/placeholder.svg",
    originalFoodTruck: "/placeholder.svg",
    firstRescueDog: "/placeholder.svg",
    dogRescuePlaceholderImage: "/placeholder.svg",
  },
  siteTexts: {
    siteName: "KINGAROOS",
    headerNavHome: "Home",
    headerNavMenu: "Menu",
    headerNavEvents: "Events",
    headerNavPromotions: "Promotions",
    headerNavAbout: "About",
    headerNavDogRescue: "Rescue",
    headerNavContact: "Contact",
    homeTitle: "KINGAROOS",
    homeSubtitle: "Great Food. Good Vibes. Helping Paws.",
    homeViewMenuButton: "View Menu",
    homeLearnMoreButton: "Learn More",
    welcomeTitle: "Welcome to the Pack",
    welcomeText1: "At KINGAROOS, we believe great food brings people together – and their furry friends too! Our cozy restaurant serves up delicious Australian-inspired dishes in a warm, dog-friendly atmosphere where every meal makes a difference.",
    welcomeText2: "Started by the King family with a passion for good food and a love for rescue dogs, we've created a space where community, compassion, and culinary excellence come together.",
    welcomeImage1Caption: "Smiling customers enjoying our dog-friendly atmosphere.",
    welcomeImage2Caption: "Fresh, delicious Australian-inspired cuisine.",
    homeHighlightsTitle: "What Makes Us Special",
    dogFriendlyTitle: "🐶 Dog-Friendly",
    dogFriendlyText: "Bring your furry friends! We welcome well-behaved dogs with open arms, water bowls, and even special treats.",
    aussieFoodTitle: "🥩 Aussie-Inspired Food",
    aussieFoodText: "From hearty meat pies to fresh barramundi, our menu celebrates the bold flavors and comfort food traditions of Australia.",
    rescueHelpTitle: "❤️ Every Meal Helps a Rescue",
    rescueHelpText: "A portion of every purchase goes directly to local dog rescue organizations, helping give abandoned dogs a second chance.",
    homeVisitTitle: "Visit Us Today",
    homeHoursTitle: "Opening Hours",
    homeLocationTitle: "Location",
    homeAddress: "123 Outback Lane, Sydney, NSW 2000",
    homePhone: "(02) 1234 5678",
    homeEmail: "hello@kingaroos.com.au",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15751.867549789918!2d123.29718759559996!3d9.247256723398154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab69f7f93062cf%3A0xedaf9d009a9047d0!2sKingaroo's%20Seaview%20Resto%20Bar!5e0!3m2!1sen!2sus!4v1749525539183!5m2!1sen!2sus",
    hoursWeekday: "11am - 9pm",
    hoursWeekend: "11am - 10pm",
    hoursSunday: "10am - 8pm",
    menuPageTitle: "Our Menu",
    menuPageSubtitle: "Authentic Australian flavors with a modern twist. Every dish is made with love, and every purchase helps a rescue dog find their forever home.",
    menuReadyToDineTitle: "Ready to Dine With Us?",
    menuReadyToDineText: "Book your table today and help us make a difference for rescue dogs!",
    menuCallText: "Call us at (02) 1234 5678",
    menuAddressText: "123 Outback Lane, Sydney, NSW 2000",
    dogRescueTitle: "Dogs We're Helping",
    dogRescueSubtitle: "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    dogRescueImpactTitle: "Our Impact",
    dogRescueEveryMealTitle: "Every Meal Makes a Difference",
    dogRescueEveryMealText: "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    dogRescueMeetTitle: "Meet Our Rescue Friends",
    dogRescueMeetSubtitle: "Click on any dog to see their amazing transformation story from rescue to recovery!",
    dogRescueClickInstruction: "Click to see their story",
    dogRescueNoDogsText: "No rescue dogs to display at the moment. Check back soon!",
    dogRescueWantToKnowTitle: "Want to Know More About Our Rescue Program?",
    dogRescueWantToKnowText: "Every meal you enjoy with us helps provide food, medical care, and love to rescue dogs in need. Together, we're making a real difference!",
    dogRescueGetInvolvedTitle: "Get Involved",
    dogRescueGetInvolvedText: "Talk to us in-store or message us on Facebook to learn more about specific dogs, volunteer opportunities, or how to adopt.",
    eventsTitle: "Events & Happenings",
    eventsSubtitle: "Join us for special events, live music, and community gatherings. There's always something fun happening at KINGAROOS!",
    eventsThisWeekTitle: "This Week",
    eventsComingSoonTitle: "Coming Soon",
    eventsNoThisWeekText: "No events scheduled for this week. Check back soon!",
    eventsNoComingSoonText: "No upcoming events scheduled. Check back soon for new events!",
    eventsTypesTitle: "Event Types",
    eventsDontMissTitle: "Don't Miss Out!",
    eventsDontMissText: "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations: (02) 1234 5678",
    eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant",
    eventsInstagramText: "Follow us on Instagram: @kingaroos_sydney",
    promotionsTitle: "Current Promotions",
    promotionsSubtitle: "Great food at even better prices! Check out our ongoing deals and special offers that make dining at KINGAROOS even more delicious.",
    promotionsNoOffersText: "No promotions available at the moment. Check back soon for great deals!",
    promotionsTermsTitle: "Terms & Conditions",
    promotionsReadyToSaveTitle: "Ready to Save & Make a Difference?",
    promotionsReadyToSaveText: "Visit us today to take advantage of these great deals while helping rescue dogs find their forever homes. Every meal matters!",
    promotionsCallAheadText: "Call ahead for reservations: (02) 1234 5678",
    promotionsAddressText: "2 Larena St, Bacong, 6216 Negros Oriental",
    promotionsFollowText: "Follow us on social media for flash sales and surprise promotions!",
    promotionsCtaPhoneNumber: "(02) 1234 5678",
    promotionsCtaAddress: "2 Larena St, Bacong, 6216 Negros Oriental",
    aboutTitle: "Our Story",
    aboutSubtitle: "From a small food truck dream to a community gathering place that's changing lives, one meal and one rescue dog at a time.",
    aboutMeetFamilyTitle: "Meet the King Family",
    aboutStoryParagraph1: "KINGAROOS began as a dream shared around our family dinner table. Sarah and David King, along with their three kids, had always been passionate about two things: creating amazing food and helping animals in need.",
    aboutStoryParagraph2: "What started as weekend barbecues for friends slowly grew into something bigger. Our neighbors kept asking us to cater their events, and we realized we had something special brewing. But it wasn't until we rescued our first dog, Rusty, that we found our true purpose.",
    aboutStoryParagraph3: "Rusty came from a local shelter, scared and skinny. Watching him transform into the happy, confident dog he is today made us realize how many other dogs needed that same second chance. That's when we decided to combine our love of food with our passion for animal rescue.",
    aboutJourneyTitle: "Our Journey",
    aboutFoodTruckTitle: "2019: The Food Truck",
    aboutFoodTruckText: 'Started with a single food truck, "King\'s Mobile Kitchen," serving Australian comfort food at local markets and events.',
    aboutRescuePartnershipTitle: "2021: First Rescue Partnership",
    aboutRescuePartnershipText: "After rescuing Rusty, we partnered with Sydney Animal Rescue to donate a portion of profits to help other dogs.",
    aboutRestaurantOpensTitle: "2023: KINGAROOS Opens",
    aboutRestaurantOpensText: "Opened our first brick-and-mortar restaurant with a mission: great food, good vibes, and helping paws.",
    aboutMissionTitle: "Our Mission",
    aboutMissionQuote: "We believe in good food, family, and giving every dog a second chance. At KINGAROOS, every meal shared is a step toward building a more compassionate community.",
    aboutMissionSignature: "— The King Family",
    aboutValuesTitle: "What We Stand For",
    aboutCompassionTitle: "Compassion",
    aboutCompassionText: "Every decision we make considers the wellbeing of animals, our community, and our planet.",
    aboutCommunityTitle: "Community",
    aboutCommunityText: "We're more than a restaurant - we're a gathering place where friendships form and families grow.",
    aboutQualityTitle: "Quality",
    aboutQualityText: "From our locally-sourced ingredients to our carefully crafted atmosphere, we never compromise on quality.",
    contactTitle: "Get In Touch",
    contactSubtitle: "Come visit us, give us a call, or connect with us online. We'd love to hear from you and welcome you to the KINGAROOS family!",
    contactLocationTitle: "Location",
    contactLocationName: "KINGAROOS Restaurant",
    contactLocationAddress: "123 Outback Lane",
    contactLocationCity: "Sydney, NSW 2000",
    contactLocationCountry: "Australia",
    contactParkingText: "Easy parking available on-site",
    contactHoursTitle: "Opening Hours",
    contactMondayThursday: "Monday - Thursday",
    contactFridaySaturday: "Friday - Saturday",
    contactSunday: "Sunday",
    contactKitchenClosesText: "Kitchen closes 30 minutes before closing time",
    contactDetailsTitle: "Contact Details",
    contactPhoneDescription: "Call for reservations or inquiries",
    contactEmailDescription: "General inquiries and feedback",
    contactFindUsTitle: "Find Us Here",
    contactFollowTitle: "Follow Our Journey",
    contactFollowText: "Stay connected with us on social media for the latest updates, rescue dog stories, and behind-the-scenes moments!",
    contactFacebookDescription: "Daily updates and community stories",
    contactInstagramDescription: "Food photos and rescue dog features",
    contactGoodToKnowTitle: "Good to Know",
    contactDogPolicyTitle: "🐶 Bringing Your Dog?",
    contactReservationsTitle: "📞 Reservations",
    contactParkingAccessTitle: "🚗 Parking & Access",
    contactPaymentTitle: "💳 Payment & Policies",
    contactCantWaitTitle: "We Can't Wait to Meet You!",
    contactCantWaitText: "Whether you're dining solo, bringing the family, or coming with your furry friend, we're here to make your experience memorable. Every visit helps a rescue dog too!",
    contactSeeYouText: "See you soon at KINGAROOS - where great food meets helping paws! 🐾",
    contactDogPolicy1: "Dogs must be well-behaved and leashed",
    contactDogPolicy2: "We provide water bowls and dog treats",
    contactDogPolicy3: "Outdoor seating area is dog-friendly",
    contactDogPolicy4: "Please clean up after your pet",
    contactReservations1: "Recommended for dinner and weekends",
    contactReservations2: "Call ahead for large groups (6+ people)",
    contactReservations3: "Walk-ins welcome based on availability",
    contactReservations4: "Special events may require booking",
    contactParkingAccess1: "Free on-site parking available",
    contactParkingAccess2: "Wheelchair accessible entrance",
    contactParkingAccess3: "Public transport: Bus stop 2 blocks away",
    contactParkingAccess4: "Bicycle parking available",
    contactPayment1: "Cash and all major cards accepted",
    contactPayment2: "No BYO alcohol policy",
    contactPayment3: "Split bills welcome",
    contactPayment4: "10% service charge for groups of 8+",
    contactInstagramHandle: "@kingaroos_sydney",
    contactMapLatitude: 9.247222,
    contactMapLongitude: 123.296944,
    footerTagline: "Great Food. Good Vibes. Helping Paws. Every meal helps rescue a dog in need.",
    footerContactTitle: "Contact Us",
    footerHoursSocialTitle: "Hours & Social",
    footerCopyright: "© 2024 KINGAROOS. All rights reserved.",
    adminLoginTitle: "Admin Login",
    adminPasswordLabel: "Password",
    adminPasswordPlaceholder: "Enter admin password",
    adminLoginButton: "Login",
    adminCancelButton: "Cancel",
  },
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

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", siteContent.theme === "dark");
  }, [siteContent.theme]);

  useEffect(() => {
    initializeContent();
  }, []);

  const initializeContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/content`, { signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const content = await response.json();
        const mergedContent = {
          ...defaultSiteContent,
          ...content,
          siteTexts: { ...defaultSiteContent.siteTexts, ...(content.siteTexts || {}) },
          siteImages: { ...defaultSiteContent.siteImages, ...(content.siteImages || {}) },
        };
        setSiteContent(mergedContent);
        setIsServerConnected(true);
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      setIsServerConnected(false);
      const saved = localStorage.getItem("kingaroos-admin-content");
      if (saved) {
        try {
          const parsedContent = JSON.parse(saved);
          const mergedContent = {
            ...defaultSiteContent,
            ...parsedContent,
            siteTexts: { ...defaultSiteContent.siteTexts, ...(parsedContent.siteTexts || {}) },
            siteImages: { ...defaultSiteContent.siteImages, ...(parsedContent.siteImages || {}) },
          };
          setSiteContent(mergedContent);
        } catch {
          setSiteContent(defaultSiteContent);
        }
      } else {
        setSiteContent(defaultSiteContent);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = (content: SiteContent) => {
    localStorage.setItem("kingaroos-admin-content", JSON.stringify(content));
  };

  const apiCall = async (url: string, options: RequestInit = {}) => {
    if (!isServerConnected) throw new Error("Server not available");
    const response = await fetch(`${API_BASE_URL}${url}`, {
      signal: AbortSignal.timeout(10000),
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    if (!response.ok) throw new Error(`API call failed: ${response.status}`);
    return response.json();
  };

  const login = async (password: string): Promise<boolean> => {
    if (password !== ADMIN_PASSWORD) return false;
    if (isServerConnected) {
      try {
        await apiCall("/admin/login", { method: "POST", body: JSON.stringify({ password }) });
      } catch (error) {
        setIsServerConnected(false);
      }
    }
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => setIsLoggedIn(false);

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    const newContent = { ...siteContent, ...updates };
    setSiteContent(newContent);
    saveToLocalStorage(newContent);
    if (isServerConnected) {
      try {
        await apiCall("/content", { method: "PUT", body: JSON.stringify(updates) });
      } catch (error) {
        setIsServerConnected(false);
      }
    }
  };
  
  // Generic CRUD helpers
  const createCrudOperations = <T extends { id: string }>(
    endpoint: string,
    stateKey: keyof SiteContent
  ) => {
    const data = siteContent[stateKey] as T[];
    
    const add = async (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: Date.now().toString() } as T;
      const newData = [...data, newItem];
      const newContent = { ...siteContent, [stateKey]: newData };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) {
        try {
          await apiCall(`/${endpoint}`, { method: 'POST', body: JSON.stringify(item) });
          await initializeContent();
        } catch (e) { setIsServerConnected(false); }
      }
    };

    const update = async (id: string, updates: Partial<T>) => {
      const newData = data.map(item => item.id === id ? { ...item, ...updates } : item);
      const newContent = { ...siteContent, [stateKey]: newData };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) {
        try {
          await apiCall(`/${endpoint}/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
          await initializeContent();
        } catch (e) { setIsServerConnected(false); }
      }
    };

    const remove = async (id: string) => {
      const newData = data.filter(item => item.id !== id);
      const newContent = { ...siteContent, [stateKey]: newData };
      setSiteContent(newContent);
      saveToLocalStorage(newContent);
      if (isServerConnected) {
        try {
          await apiCall(`/${endpoint}/${id}`, { method: 'DELETE' });
          await initializeContent();
        } catch (e) { setIsServerConnected(false); }
      }
    };
    
    return { add, update, remove };
  };

  const dogOps = createCrudOperations<Dog>('dogs', 'dogs');
  const menuItemOps = createCrudOperations<MenuItem>('menu-items', 'menuItems');
  const eventOps = createCrudOperations<Event>('events', 'events');
  const promotionOps = createCrudOperations<Promotion>('promotions', 'promotions');

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
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
