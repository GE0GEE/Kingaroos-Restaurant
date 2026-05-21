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
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { db, auth, googleProvider } from "../firebase-config";

const ALLOWED_EMAILS: string[] = [
  "gorhamgeorge70@gmail.com",
];

export const promotionCategories = {
  happyHour: { name: "Happy Hour", badge: "Limited Time", colorClasses: "from-aussie-orange to-aussie-burnt-red" },
  dogSpecial: { name: "Dog Special", badge: "Pawsome Deal", colorClasses: "from-aussie-eucalyptus to-green-700" },
  familyDeal: { name: "Family Deal", badge: "Family Fun", colorClasses: "from-brown-600 to-brown-800" },
  loyalty: { name: "Loyalty Offer", badge: "Member's Gift", colorClasses: "from-sand-600 to-aussie-orange" },
  general: { name: "Special Offer", badge: "Special", colorClasses: "from-gray-500 to-gray-700" },
};
export type PromotionCategoryKey = keyof typeof promotionCategories;

export interface Dog { id: string; name: string; breed: string; age: string; personality: string; beforeImage: string; afterImage: string; rescueStory: string; }
export interface MenuItem { id: string; name: string; description: string; price: string; image: string; featured?: boolean; category: string; }
export interface PhysicalMenuImage { id: string; url: string; caption: string; }
export interface Event { id: string; title: string; date: string; time: string; description: string; imageUrl?: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export type AnnouncementType = "general" | "promo" | "event" | "closure" | "newItem" | "holidayHours" | "news";
export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  description: string;
  category: PromotionCategoryKey;
  /** New announcement-specific fields (all optional, backwards-compatible) */
  type?: AnnouncementType;
  imageUrl?: string;
  pinned?: boolean;
  startDate?: string;
  endDate?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface MerchSection {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  link: string;
  linkLabel: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  tagline: string;
  sections: MerchSection[];
}

export type SocialIconKey =
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "pinterest"
  | "threads"
  | "snapchat"
  | "link";

export interface CustomSocial {
  id: string;
  name: string;
  url: string;
  iconKey: SocialIconKey;
}

export interface SiteContent {
  logoImage: string; faviconImage: string; theme: "light" | "dark";
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  /** Admin-managed extra social profile links (YouTube, TikTok, etc.) */
  customSocials?: CustomSocial[];
  heroImages: Array<{ url: string; alt: string; }>;
  welcomeImages: Array<{ url: string; alt: string; }>;
  aboutImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; restaurantOpensImage: string; };
  siteImages: { dogRescuePlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs: Dog[]; menuItems: MenuItem[]; physicalMenuImages: PhysicalMenuImage[]; events: Event[]; promotions: Promotion[]; merch: MerchItem[]; holidayStatuses: Record<string, boolean>; eventTypeImages: Record<string, string>;
  themeSettings?: {
    forcedThemeId?: string | null;
    monthlyThemeEnabled?: Record<number, boolean>;
    /** Per-theme banner duration: "month" | "weeks" | "week" | "days" */
    bannerDurations?: Record<string, string>;
    /** Per-theme custom banner title/subtitle override */
    bannerMessages?: Record<string, { title?: string; subtitle?: string }>;
  };
  customBanner?: {
    enabled?: boolean;
    text?: string;
    subtitle?: string;
    colorFrom?: string;
    colorTo?: string;
    startDate?: string;
    endDate?: string;
  };
  /** Free-form text key/value store — admin can add any text they want here */
  customTexts?: Record<string, string>;
}

const defaultSiteContent: SiteContent = {
  logoImage: "/placeholder.svg", faviconImage: "", theme: "light",
  socialLinks: { facebook: "#", instagram: "#", twitter: "#" },
  customSocials: [],
  heroImages: [
    { url: "/placeholder.svg", alt: "Kingaroos food hero 1" },
    { url: "/placeholder.svg", alt: "Kingaroos atmosphere hero 2" },
    { url: "/placeholder.svg", alt: "Happy dogs at Kingaroos hero 3" },
  ],
  welcomeImages: [
    { url: "/placeholder.svg", alt: "Happy customers" },
    { url: "/placeholder.svg", alt: "Delicious food" },
  ],
  aboutImages: { familyPhoto: "/placeholder.svg", originalFoodTruck: "/placeholder.svg", firstRescueDog: "/placeholder.svg", restaurantOpensImage: "/placeholder.svg" },
  siteImages: { dogRescuePlaceholderImage: "/placeholder.svg" },
  siteTexts: {
    // --- Header & Navigation ---
    siteName: "Kingaroo's", headerNavHome: "Home", headerNavMenu: "Menu", headerNavEvents: "Events", headerNavPromotions: "Promotions", headerNavAbout: "About", headerNavDogRescue: "Dog Rescue", headerNavContact: "Contact",

    // --- Home Page ---
    homeTitle: "Welcome to Kingaroo's", homeSubtitle: "Seaview Resto Bar — Australian soul, Filipino heart.",
    homeViewMenuButton: "View Menu", homeLearnMoreButton: "Our Story",
    welcomeTitle: "G'day from Kingaroo's!", welcomeText1: "Kingaroo's Seaview Resto Bar is your home away from home in Bacong, Negros Oriental. We bring the bold, laid-back spirit of Australia together with the warmth of Filipino hospitality — all while overlooking the stunning Tañon Strait.", welcomeText2: "Whether you're here for an ice-cold beer at sunset, a hearty Aussie-inspired meal, or to hang out with your fur babies on our dog-friendly patio, there's always a seat and a smile waiting for you at Kingaroo's.",
    welcomeImage1Caption: "Enjoying cold drinks with a seaview sunset", welcomeImage2Caption: "Fresh, Aussie-inspired dishes made with local ingredients",
    homeHighlightsTitle: "What Makes Us Special",
    dogFriendlyTitle: "Dog Friendly", dogFriendlyText: "Bring your fur babies! Our seaview patio welcomes dogs of all sizes with fresh water bowls and plenty of love. We're passionate about dog rescue too.",
    aussieFoodTitle: "Aussie-Inspired Food", aussieFoodText: "From our signature Vegemite Beef Jerky to hearty burgers and refreshing drinks, we blend Australian flavours with fresh Filipino ingredients for a menu like no other.",
    rescueHelpTitle: "Supporting Rescues", rescueHelpText: "Every meal you enjoy helps rescue dogs in need. We partner with local shelters to provide food, medical care, and find forever homes for strays.",
    homeVisitTitle: "Come Say G'day!", homeHoursTitle: "Our Hours",
    hoursWeekday: "11am - 9pm", hoursWeekend: "11am - 10pm", hoursSunday: "10am - 8pm",
    homeLocationTitle: "Our Location", homeAddress: "Number 2 Larena Street, North Poblacion, Bacong, Negros Oriental, 6216, Philippines", homePhone: "0915 994 6696", homeEmail: "kingnegros@hotmail.com",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15751.867549789918!2d123.29718759559996!3d9.247256723398154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab69f7f93062cf%3A0xedaf9d009a9047d0!2sKingaroo's%20Seaview%20Resto%20Bar!5e0!3m2!1sen!2sus!4v1749525539183!5m2!1sen!2sus",
    homeCTATitle: "Ready for a taste of Australia?", homeCTAText: "Drop by for a cold drink, good food, and the best seaview in Bacong. Your fur babies are welcome too!",
    statDogs: "50+", statDogsLabel: "Dogs Rescued", statYears: "2+", statYearsLabel: "Years Serving", statRating: "4.3", statRatingLabel: "Google Rating", statMenuItems: "30+", statMenuItemsLabel: "Menu Items",

    // --- Menu Page ---
    menuPageTitle: "Our Menu", menuPageSubtitle: "Aussie-inspired eats with a Filipino twist — served with a seaview.",
    menuReadyToDineTitle: "Ready to Dine With Us?", menuReadyToDineText: "Walk-ins welcome or call ahead for large groups. Every meal helps support our dog rescue mission!",
    menuCallText: "Call us at 0915 994 6696", menuAddressText: "Number 2 Larena Street, North Poblacion, Bacong, Negros Oriental",

    // --- Dog Rescue Page ---
    dogRescueTitle: "Dog Rescue", dogRescueSubtitle: "Every meal you enjoy helps a rescue dog find their forever home.",
    dogRescueEveryMealTitle: "Every Meal Makes a Difference", dogRescueEveryMealText: "A portion of every order goes directly to feeding, vaccinating, and rehabilitating rescue dogs in the Bacong and Dumaguete area.",
    dogRescueMeetTitle: "Meet Our Rescue Friends", dogRescueMeetSubtitle: "Click on any dog to see their amazing transformation story from rescue to recovery!",
    dogRescueClickInstruction: "Click on any dog to see their transformation", dogRescueNoDogsText: "No rescue dogs to display at the moment. Check back soon!",
    dogRescueWantToKnowTitle: "Want to Know More About Our Rescue Program?", dogRescueWantToKnowText: "Every meal you enjoy with us helps provide food, medical care, and love to rescue dogs in need. Together, we're making a real difference!",
    dogRescueGetInvolvedTitle: "Get Involved", dogRescueGetInvolvedText: "Talk to us in-store or message us on Facebook to learn more about specific dogs, volunteer opportunities, or how to adopt.",

    // --- Events Page ---
    eventsTitle: "Events", eventsSubtitle: "Join us for great food, live music, and good times by the sea.",
    eventsThisWeekTitle: "This Week", eventsComingSoonTitle: "Coming Soon",
    eventsNoThisWeekText: "No events scheduled for this week. Check back soon!", eventsNoComingSoonText: "No upcoming events scheduled. Check back soon!",
    eventsTypesTitle: "Event Types",
    eventsDontMissTitle: "Don't Miss Out!", eventsDontMissText: "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations: 0915 994 6696", eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant", eventsInstagramText: "Follow us on Instagram: @KingaroosRestaurant",

    // --- Promotions Page ---
    promotionsTitle: "Promotions & News", promotionsSubtitle: "Exclusive deals, announcements, and updates for our valued guests.",
    promotionsFacebookTabLabel: "Facebook Posts", promotionsOffersTabLabel: "Current Offers",
    promotionsNoOffersText: "No active promotions right now — follow us on Facebook for flash deals!", promotionsTermsTitle: "Terms & Conditions",
    promotionsReadyToSaveTitle: "Ready to Save?", promotionsReadyToSaveText: "Visit us today and take advantage of these great offers!",
    promotionsCallAheadText: "Call ahead: 0915 994 6696", promotionsAddressText: "Number 2 Larena Street, North Poblacion, Bacong", promotionsFollowText: "Follow us on Facebook for flash deals and updates!",

    // --- About Page ---
    aboutTitle: "About Us", aboutSubtitle: "Our story, our mission, our family.",
    aboutMeetFamilyTitle: "Meet the Kingaroo's Family",
    aboutStoryParagraph1: "Kingaroo's was born from a simple dream — to bring the laid-back Aussie lifestyle to the beautiful shores of Negros Oriental. What started as a love for good food, cold beers, and rescued dogs turned into a seaview resto bar that the whole community now calls home.",
    aboutStoryParagraph2: "We're proudly Australian-owned and Filipino-hearted. Our menu fuses bold Australian flavours with fresh, locally sourced Filipino ingredients. And because we believe in giving back, a portion of every meal goes toward rescuing and rehabilitating stray dogs in the area.",
    aboutStoryParagraph3: "Whether you're a local regular, a travelling expat, or a first-time visitor to Bacong — grab a seat, order a cold one, and let us make you feel at home. That's the Kingaroo's way.",
    aboutJourneyTitle: "Our Journey",
    aboutFoodTruckTitle: "The Dream Begins", aboutFoodTruckText: "It all started with a passion for Aussie-style food and a desire to create something special in the Philippines. The idea for Kingaroo's was born over many barbecues and beers.",
    aboutRescuePartnershipTitle: "Rescue Partnership", aboutRescuePartnershipText: "From day one, we knew dog rescue would be part of our mission. We began partnering with local shelters to rehome strays and provide food and medical care.",
    aboutRestaurantOpensTitle: "Kingaroo's Opens!", aboutRestaurantOpensText: "We opened our doors on Larena Street, Bacong with a stunning seaview, cold drinks, and a dream to serve the community. The rest is history — and we're just getting started.",
    aboutMissionTitle: "Our Mission",
    aboutMissionQuote: "Great food, cold drinks, ocean views, and a better life for every stray dog we meet — that's the Kingaroo's promise.",
    aboutMissionSignature: "— The Kingaroo's Family, Bacong, Negros Oriental",
    aboutValuesTitle: "Our Values",
    aboutCompassionTitle: "Compassion", aboutCompassionText: "We believe every dog deserves love, food, and a safe home. Our rescue program is at the heart of everything we do.",
    aboutCommunityTitle: "Community", aboutCommunityText: "Kingaroo's is more than a restaurant — it's a gathering place for locals, expats, and travellers to connect over great food and good vibes.",
    aboutQualityTitle: "Quality", aboutQualityText: "From our kitchen to your table, we use fresh local ingredients and authentic Aussie recipes to deliver food that's bold, honest, and delicious.",

    // --- Contact Page ---
    contactTitle: "Contact Us", contactSubtitle: "We'd love to hear from you — drop by, call, or message us anytime!",
    contactLocationTitle: "Our Location", contactLocationName: "Kingaroo's Seaview Resto Bar", contactLocationAddress: "Number 2 Larena Street, North Poblacion", contactLocationCity: "Bacong, Negros Oriental, 6216", contactLocationCountry: "Philippines", contactParkingText: "Outdoor seating | Takeout | Dine-in",
    contactHoursTitle: "Opening Hours",
    contactMondayThursday: "Monday - Thursday", contactHoursMondayThursday: "11:00 AM - 9:00 PM",
    contactFridaySaturday: "Friday - Saturday", contactHoursFridaySaturday: "11:00 AM - 10:00 PM",
    contactSunday: "Sunday", contactHoursSunday: "10:00 AM - 8:00 PM",
    contactKitchenClosesText: "Kitchen closes 30 minutes before closing time",
    contactDetailsTitle: "Get in Touch", contactPhoneDescription: "Call or text us anytime during business hours", contactEmailDescription: "For reservations, events, or general enquiries",
    contactFindUsTitle: "Find Us", contactFollowTitle: "Follow Us", contactFollowText: "Stay connected for updates, events, and daily specials!",
    contactFacebookHandle: "Kingaroo's Seaview Resto Bar", contactFacebookDescription: "Like our page for news & promos", contactInstagramHandle: "@KingaroosRestaurant", contactInstagramDescription: "Follow us for food photos & stories",
    contactGoodToKnowTitle: "Good to Know",
    contactDogPolicyTitle: "Dog Friendly", contactDogPolicy1: "Dogs welcome in our outdoor seaview area", contactDogPolicy2: "Fresh water bowls provided for your fur babies", contactDogPolicy3: "Must be leashed at all times for safety", contactDogPolicy4: "We love meeting your furry friends!",
    contactReservationsTitle: "Reservations", contactReservations1: "Walk-ins are always welcome", contactReservations2: "For groups of 8+, please call ahead", contactReservations3: "Private events and celebrations can be arranged", contactReservations4: "Call us at 0915 994 6696 to book",
    contactParkingAccessTitle: "Parking & Access", contactParkingAccess1: "Street parking available along Larena Street", contactParkingAccess2: "Accessible entrance for all guests", contactParkingAccess3: "Located near the Bacong seaview area", contactParkingAccess4: "Easy to find — look for the Kingaroos signage!",
    contactPaymentTitle: "Payment Methods", contactPayment1: "Cash payments accepted", contactPayment2: "GCash accepted", contactPayment3: "Maya / PayMaya accepted", contactPayment4: "No credit cards at this time",
    contactCantWaitTitle: "Can't Wait to See You!", contactCantWaitText: "Whether it's a casual meal with mates, a family celebration, or just a cold drink by the sea — we're here for you.", contactSeeYouText: "See you soon at Kingaroo's!",

    // --- Footer ---
    footerTagline: "Australian soul, Filipino heart. Seaview dining in Bacong, Negros Oriental.",
    footerContactTitle: "Contact", footerHoursSocialTitle: "Hours & Social", footerCopyright: "Kingaroo's Seaview Resto Bar. All rights reserved.",
    footerMondayThursday: "Mon - Thu: 11am - 9pm", footerFridaySaturday: "Fri - Sat: 11am - 10pm", footerSunday: "Sun: 10am - 8pm",

    // --- Admin Interface ---
    adminLoginTitle: "Admin Login", adminPasswordLabel: "Password", adminPasswordPlaceholder: "Enter admin password", adminLoginButton: "Login", adminCancelButton: "Cancel",
  },
  dogs: [], menuItems: [], physicalMenuImages: [], events: [], promotions: [], merch: [], holidayStatuses: {}, eventTypeImages: {},
  themeSettings: {
    forcedThemeId: null,
    monthlyThemeEnabled: {
      0: true, 1: true, 2: true, 3: true, 4: true, 5: true,
      6: true, 7: true, 8: true, 9: true, 10: true, 11: true,
    },
  },
  customBanner: {
    enabled: false,
    text: "",
    subtitle: "",
    colorFrom: "#E67E22",
    colorTo: "#C0392B",
    startDate: "",
    endDate: "",
  },
  customTexts: {},
};

interface AdminContextType {
  isLoggedIn: boolean;
  justLoggedIn: boolean;
  clearJustLoggedIn: () => void;
  login: () => Promise<void>;
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
  addMerchItem: (item: Omit<MerchItem, "id">) => Promise<void>;
  updateMerchItem: (id: string, item: Partial<MerchItem>) => Promise<void>;
  deleteMerchItem: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const firestoreDocRef = doc(db, "content", "main");
const MAX_SNAPSHOT_RETRIES = 3;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [authReady, setAuthReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const loading = !authReady || !dataReady;
  const userRef = useRef<User | null>(null);

  // Keeps a always-fresh copy of siteContent for use inside async CRUD closures,
  // avoiding the stale-closure bug where createCrudOperations captured an outdated
  // snapshot of the array and silently overwrote newer data.
  const liveContentRef = useRef<SiteContent>(defaultSiteContent);

  // --- Auth listener ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      const allowed =
        currentUser && ALLOWED_EMAILS.includes(currentUser.email ?? "")
          ? currentUser
          : null;
      if (currentUser && !allowed) {
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
        firestoreDocRef,
        (snapshot) => {
          retryCount = 0;
          if (snapshot.exists()) {
            const serverContent = snapshot.data() as Partial<SiteContent>;
            const mergedContent: SiteContent = {
              ...defaultSiteContent, ...serverContent,
              socialLinks: { ...defaultSiteContent.socialLinks, ...(serverContent.socialLinks || {}) },
              customSocials: serverContent.customSocials ?? [],
              heroImages: serverContent.heroImages && serverContent.heroImages.length > 0 ? serverContent.heroImages : defaultSiteContent.heroImages,
              welcomeImages: serverContent.welcomeImages && serverContent.welcomeImages.length > 0 ? serverContent.welcomeImages : defaultSiteContent.welcomeImages,
              faviconImage: serverContent.faviconImage ?? defaultSiteContent.faviconImage,
              aboutImages: { ...defaultSiteContent.aboutImages, ...(serverContent.aboutImages || {}) },
              siteImages: { ...defaultSiteContent.siteImages, ...(serverContent.siteImages || {}) },
              siteTexts: { ...defaultSiteContent.siteTexts, ...(serverContent.siteTexts || {}) },
              physicalMenuImages: serverContent.physicalMenuImages ?? [],
              merch: serverContent.merch ?? [],
              themeSettings: { ...defaultSiteContent.themeSettings, ...(serverContent.themeSettings || {}) },
            };
            liveContentRef.current = mergedContent;
            setSiteContent(mergedContent);
          } else {
            if (userRef.current) {
              setDoc(firestoreDocRef, defaultSiteContent, { merge: true });
            }
            liveContentRef.current = defaultSiteContent;
            setSiteContent(defaultSiteContent);
          }
          setDataReady(true);
        },
        (error) => {
          console.error("Firebase Snapshot Error:", error);
          if (retryCount < MAX_SNAPSHOT_RETRIES) {
            const delayMs = Math.pow(2, retryCount) * 1000;
            retryCount += 1;
            retryTimer = setTimeout(subscribe, delayMs);
          } else {
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

  // --- Google Sign-In via popup ---
  const login = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setJustLoggedIn(true);
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err?.code, err?.message, err);
      throw err;
    }
  };

  const clearJustLoggedIn = () => setJustLoggedIn(false);
  const logout = async () => { await signOut(auth); };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    if (!user) throw new Error("Not authenticated to make changes.");
    await setDoc(firestoreDocRef, updates, { merge: true });
  };

  // FIX: reads from liveContentRef.current inside each async operation instead of
  // capturing `data` at call-site creation time. This prevents stale closures from
  // overwriting the array with an outdated snapshot (e.g. adding a second merch item
  // used to replace the first because `data` was still the empty initial array).
  const createCrudOperations = <T extends { id: string }>(stateKey: keyof SiteContent) => {
    const add = async (item: Omit<T, "id">) => {
      const data = (liveContentRef.current[stateKey] as T[] | undefined) ?? [];
      const newItem = { ...item, id: `id-${Date.now()}` } as T;
      await updateSiteContent({ [stateKey]: [...data, newItem] } as any);
    };
    const update = async (id: string, updates: Partial<T>) => {
      const data = (liveContentRef.current[stateKey] as T[] | undefined) ?? [];
      const newData = data.map((item) => (item.id === id ? { ...item, ...updates } : item));
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    const remove = async (id: string) => {
      const data = (liveContentRef.current[stateKey] as T[] | undefined) ?? [];
      const newData = data.filter((item) => item.id !== id);
      await updateSiteContent({ [stateKey]: newData } as any);
    };
    return { add, update, remove };
  };

  const dogOps       = createCrudOperations<Dog>("dogs");
  const menuItemOps  = createCrudOperations<MenuItem>("menuItems");
  const eventOps     = createCrudOperations<Event>("events");
  const promotionOps = createCrudOperations<Promotion>("promotions");
  const merchOps     = createCrudOperations<MerchItem>("merch");

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
        addDog: dogOps.add, updateDog: dogOps.update, deleteDog: dogOps.remove,
        addMenuItem: menuItemOps.add, updateMenuItem: menuItemOps.update, deleteMenuItem: menuItemOps.remove,
        addEvent: eventOps.add, updateEvent: eventOps.update, deleteEvent: eventOps.remove,
        addPromotion: promotionOps.add, updatePromotion: promotionOps.update, deletePromotion: promotionOps.remove,
        addMerchItem: merchOps.add, updateMerchItem: merchOps.update, deleteMerchItem: merchOps.remove,
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
