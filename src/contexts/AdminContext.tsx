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
export interface MenuItem { id: string; name: string; description: string; price: string; image: string; featured?: boolean; category: "starters" | "mains" | "desserts" | "drinks"; }
export interface Event { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; badge: string; color: string; }
export interface SiteContent {
  logoImage: string;
  theme: 'light' | 'dark';
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; gradient: string; }>;
  welcomeImages: Array<{ url:string; alt: string; }>;
  siteImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; dogRescuePlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs: Dog[];
  menuItems: MenuItem[];
  events: Event[];
  promotions: Promotion[];
}

// --- THIS IS THE MAJOR FIX ---
// We now provide a default for every single text key the app uses.
// This prevents crashes if a key is not yet in the Firebase database.
const defaultSiteContent: SiteContent = {
  logoImage: "/placeholder.svg",
  theme: 'light',
  socialLinks: { facebook: "#", instagram: "#", twitter: "#" },
  heroImages: [],
  welcomeImages: [],
  siteImages: { familyPhoto: "/placeholder.svg", originalFoodTruck: "/placeholder.svg", firstRescueDog: "/placeholder.svg", dogRescuePlaceholderImage: "/placeholder.svg"},
  dogs: [],
  menuItems: [],
  events: [],
  promotions: [],
  siteTexts: {
    siteName: "Kingaroos",
    headerNavHome: "Home", headerNavMenu: "Menu", headerNavEvents: "Events", headerNavPromotions: "Promos", headerNavAbout: "About", headerNavDogRescue: "Dog Rescue", headerNavContact: "Contact",
    homeTitle: "Welcome to Kingaroos", homeSubtitle: "Great Food. Good Vibes. Helping Paws.", homeViewMenuButton: "View Our Menu", homeLearnMoreButton: "Learn More",
    welcomeTitle: "Welcome to the Pack", welcomeText1: "Welcome text paragraph 1.", welcomeText2: "Welcome text paragraph 2.",
    welcomeImage1Caption: "Our lovely patio.", welcomeImage2Caption: "Delicious food, served daily.",
    homeHighlightsTitle: "Why You'll Love It Here",
    dogFriendlyTitle: "Dog Friendly", dogFriendlyText: "Well-behaved dogs are always welcome on our patio.",
    aussieFoodTitle: "Aussie-Inspired Food", aussieFoodText: "A taste of down under, with a modern twist.",
    rescueHelpTitle: "Supporting Rescues", rescueHelpText: "Every meal you buy helps a dog in need find a home.",
    homeVisitTitle: "Come Say G'day!", homeHoursTitle: "Our Hours", homeLocationTitle: "Our Location",
    homeAddress: "123 Aussie Way, Sydney, AUS", homePhone: "(02) 1234 5678", homeEmail: "contact@kingaroos.com", googleMapsUrl: "",
    menuPageTitle: "Our Menu", menuPageSubtitle: "Authentic Australian flavors with a modern twist.", menuReadyToDineTitle: "Ready to Dine?", menuReadyToDineText: "Come on in or give us a call.", menuCallText: "Call Us", menuAddressText: "Find Us",
    dogRescueTitle: "Dogs We're Helping", dogRescueSubtitle: "Find your new best friend.", dogRescueEveryMealTitle: "Every Meal Helps", dogRescueEveryMealText: "A portion of every purchase goes to our rescue partners.", dogRescueMeetTitle: "Meet the Pups", dogRescueMeetSubtitle: "These lovely dogs are looking for a forever home.", dogRescueClickInstruction: "Click a dog's photo to learn more.", dogRescueNoDogsText: "No dogs currently available, but check back soon!", dogRescueWantToKnowTitle: "Want to Know More?", dogRescueWantToKnowText: "Contact us for details on adoption.", dogRescueGetInvolvedTitle: "Get Involved", dogRescueGetInvolvedText: "Learn how you can help.",
    eventsTitle: "Events & Happenings", eventsSubtitle: "There's always something on at Kingaroos.", eventsThisWeekTitle: "This Week", eventsComingSoonTitle: "Coming Soon", eventsNoThisWeekText: "No events this week, check back soon!", eventsNoComingSoonText: "No upcoming events scheduled.", eventsTypesTitle: "Event Types", eventsDontMissTitle: "Don't Miss Out!", eventsDontMissText: "Follow us on social media for the latest news.", eventsCallText: "Call Ahead", eventsFacebookText: "Follow on Facebook", eventsInstagramText: "Follow on Instagram",
    promotionsTitle: "Current Promotions", promotionsSubtitle: "Great food at even better prices!", promotionsNoOffersText: "No special offers right now.", promotionsTermsTitle: "Terms & Conditions", promotionsReadyToSaveTitle: "Ready to Save?", promotionsReadyToSaveText: "Visit us today to take advantage of these deals.", promotionsCallAheadText: "Call Ahead", promotionsAddressText: "Our Address", promotionsFollowText: "Follow Us",
    aboutTitle: "Our Story", aboutSubtitle: "From a food truck to a family.", aboutMeetFamilyTitle: "Meet the King Family", aboutStoryParagraph1: "Our story paragraph 1.", aboutStoryParagraph2: "Our story paragraph 2.", aboutStoryParagraph3: "Our story paragraph 3.", aboutJourneyTitle: "Our Journey", aboutFoodTruckTitle: "The Food Truck", aboutFoodTruckText: "It started with a simple food truck.", aboutRescuePartnershipTitle: "Rescue Partnership", aboutRescuePartnershipText: "We partnered with local rescues.", aboutRestaurantOpensTitle: "Restaurant Opens", aboutRestaurantOpensText: "We finally opened our doors.", aboutMissionTitle: "Our Mission", aboutMissionQuote: "A quote about our mission.", aboutMissionSignature: "- The King Family", aboutValuesTitle: "Our Values", aboutCompassionTitle: "Compassion", aboutCompassionText: "For people and paws.", aboutCommunityTitle: "Community", aboutCommunityText: "Bringing everyone together.", aboutQualityTitle: "Quality", aboutQualityText: "The best ingredients, always.",
    contactTitle: "Get In Touch", contactSubtitle: "We'd love to hear from you.", contactLocationTitle: "Our Location", contactLocationName: "Kingaroos Restaurant", contactLocationAddress: "123 Aussie Way", contactLocationCity: "Sydney, NSW", contactLocationCountry: "Australia", contactParkingText: "Parking info here.",
    contactHoursTitle: "Opening Hours", hoursWeekday: "11am - 9pm", hoursWeekend: "11am - 10pm", hoursSunday: "10am - 8pm", contactKitchenClosesText: "Kitchen closes 30 mins before.",
    contactDetailsTitle: "Contact Details", contactPhoneDescription: "For reservations & inquiries", contactEmailDescription: "For events & other questions",
    contactFindUsTitle: "Find Us Online", contactFollowTitle: "Follow Us", contactFollowText: "Stay up to date with news and events.", contactFacebookDescription: "facebook.com/kingaroos", contactInstagramDescription: "instagram.com/kingaroos", contactInstagramHandle: "@kingaroos",
    contactGoodToKnowTitle: "Good to Know", contactDogPolicyTitle: "Dog Policy", contactDogPolicy1: "1. Well-behaved dogs welcome.", contactDogPolicy2: "2. Pups on the patio only.", contactDogPolicy3: "3. Please keep them leashed.", contactDogPolicy4: "4. Water bowls provided!",
    contactReservationsTitle: "Reservations", contactReservations1: "1. Recommended for groups.", contactReservations2: "2. Call us to book.", contactReservations3: "3. Walk-ins welcome.", contactReservations4: "4. Please be on time.",
    contactParkingAccessTitle: "Parking & Access", contactParkingAccess1: "1. Street parking available.", contactParkingAccess2: "2. Paid lot nearby.", contactParkingAccess3: "3. Wheelchair accessible.", contactParkingAccess4: "4. Bike racks out front.",
    contactPaymentTitle: "Payment", contactPayment1: "1. All major cards accepted.", contactPayment2: "2. Apple Pay & Google Pay.", contactPayment3: "3. Cash accepted.", contactPayment4: "4. No personal checks.",
    contactCantWaitTitle: "We Can't Wait To See You!", contactCantWaitText: "Come on down for a good time.", contactSeeYouText: "See you soon, mate!", contactMapLatitude: "-33.8688", contactMapLongitude: "151.2093",
    footerTagline: "Great Food. Good Vibes. Helping Paws.", footerContactTitle: "Contact", footerHoursSocialTitle: "Hours & Social", footerCopyright: "© 2024 Kingaroos. All Rights Reserved.",
    // --- FIX FOR FOOTER ---
    footerMondayThursday: "Mon - Thu: 11am - 9pm", footerFridaySaturday: "Fri - Sat: 11am - 10pm", footerSunday: "Sun: 10am - 8pm",
    adminLoginTitle: "Admin Login", adminPasswordLabel: "Password", adminPasswordPlaceholder: "Enter password...", adminLoginButton: "Login", adminCancelButton: "Cancel",
  },
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
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const unsubscribeSnapshot = onSnapshot(siteContentRef, (snapshot) => {
      if (snapshot.exists()) {
        const serverContent = snapshot.data() as SiteContent;
        // The deep merge is now even more important
        const mergedContent = {
          ...defaultSiteContent,
          ...serverContent,
          socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
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

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, "admin@kingaroos.com", password);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

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
      isLoggedIn: !!user,
      login, logout, siteContent, loading, updateSiteContent,
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
