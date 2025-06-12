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
  aboutImages: {
    familyPhoto: string;
    originalFoodTruck: string;
    firstRescueDog: string;
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

    // Contact Page - Additional Fields for hardcoded content
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
    footerMondayThursday: string;
    footerFridaySaturday: string;
    footerSunday: string;
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
    {
      url: "/placeholder.svg",
      alt: "Restaurant exterior with outdoor seating and happy customers with dogs",
      gradient: "from-brown-800/40 to-brown-900/60",
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
  aboutImages: {
    familyPhoto: "/placeholder.svg",
    originalFoodTruck: "/placeholder.svg",
    firstRescueDog: "/placeholder.svg",
  },
  siteTexts: {
    // Header
    siteName: "KINGAROOS",
    headerNavHome: "Home",
    headerNavMenu: "Menu",
    headerNavEvents: "Events",
    headerNavPromotions: "Promotions",
    headerNavAbout: "About",
    headerNavDogRescue: "Rescue",
    headerNavContact: "Contact",

    // Home Page
    homeTitle: "KINGAROOS",
    homeSubtitle: "Great Food. Good Vibes. Helping Paws.",
    homeViewMenuButton: "View Menu",
    homeLearnMoreButton: "Learn More",

    welcomeTitle: "Welcome to the Pack",
    welcomeText1:
      "At KINGAROOS, we believe great food brings people together – and their furry friends too! Our cozy restaurant serves up delicious Australian-inspired dishes in a warm, dog-friendly atmosphere where every meal makes a difference.",
    welcomeText2:
      "Started by the King family with a passion for good food and a love for rescue dogs, we've created a space where community, compassion, and culinary excellence come together.",

    homeHighlightsTitle: "What Makes Us Special",
    dogFriendlyTitle: "🐶 Dog-Friendly",
    dogFriendlyText:
      "Bring your furry friends! We welcome well-behaved dogs with open arms, water bowls, and even special treats.",
    aussieFoodTitle: "🥩 Aussie-Inspired Food",
    aussieFoodText:
      "From hearty meat pies to fresh barramundi, our menu celebrates the bold flavors and comfort food traditions of Australia.",
    rescueHelpTitle: "❤️ Every Meal Helps a Rescue",
    rescueHelpText:
      "A portion of every purchase goes directly to local dog rescue organizations, helping give abandoned dogs a second chance.",

    homeVisitTitle: "Visit Us Today",
    homeHoursTitle: "Opening Hours",
    homeLocationTitle: "Location",
    homeAddress: "123 Outback Lane, Sydney, NSW 2000",
    homePhone: "(02) 1234 5678",
    homeEmail: "hello@kingaroos.com.au",

    // Menu Page
    menuPageTitle: "Our Menu",
    menuPageSubtitle:
      "Authentic Australian flavors with a modern twist. Every dish is made with love, and every purchase helps a rescue dog find their forever home.",
    menuReadyToDineTitle: "Ready to Dine With Us?",
    menuReadyToDineText:
      "Book your table today and help us make a difference for rescue dogs!",
    menuCallText: "Call us at (02) 1234 5678",
    menuAddressText: "123 Outback Lane, Sydney, NSW 2000",

    // Dog Rescue Page
    dogRescueTitle: "Dogs We're Helping",
    dogRescueSubtitle:
      "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    dogRescueImpactTitle: "Our Impact",
    dogRescueEveryMealTitle: "Every Meal Makes a Difference",
    dogRescueEveryMealText:
      "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    dogRescueMeetTitle: "Meet Our Rescue Friends",
    dogRescueMeetSubtitle:
      "Click on any dog to see their amazing transformation story from rescue to recovery!",
    dogRescueClickInstruction: "Click to see their story",
    dogRescueNoDogsText:
      "No rescue dogs to display at the moment. Check back soon!",
    dogRescueWantToKnowTitle: "Want to Know More About Our Rescue Program?",
    dogRescueWantToKnowText:
      "Every meal you enjoy with us helps provide food, medical care, and love to rescue dogs in need. Together, we're making a real difference!",
    dogRescueGetInvolvedTitle: "Get Involved",
    dogRescueGetInvolvedText:
      "Talk to us in-store or message us on Facebook to learn more about specific dogs, volunteer opportunities, or how to adopt.",

    // Events Page
    eventsTitle: "Events & Happenings",
    eventsSubtitle:
      "Join us for special events, live music, and community gatherings. There's always something fun happening at KINGAROOS!",
    eventsThisWeekTitle: "This Week",
    eventsComingSoonTitle: "Coming Soon",
    eventsNoThisWeekText: "No events scheduled for this week. Check back soon!",
    eventsNoComingSoonText:
      "No upcoming events scheduled. Check back soon for new events!",
    eventsTypesTitle: "Event Types",
    eventsDontMissTitle: "Don't Miss Out!",
    eventsDontMissText:
      "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations: (02) 1234 5678",
    eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant",
    eventsInstagramText: "Follow us on Instagram: @kingaroos_sydney",

    // Promotions Page
    promotionsTitle: "Current Promotions",
    promotionsSubtitle:
      "Great food at even better prices! Check out our ongoing deals and special offers that make dining at KINGAROOS even more delicious.",
    promotionsNoOffersText:
      "No promotions available at the moment. Check back soon for great deals!",
    promotionsTermsTitle: "Terms & Conditions",
    promotionsReadyToSaveTitle: "Ready to Save & Make a Difference?",
    promotionsReadyToSaveText:
      "Visit us today to take advantage of these great deals while helping rescue dogs find their forever homes. Every meal matters!",
    promotionsCallAheadText: "Call ahead for reservations: (02) 1234 5678",
    promotionsAddressText: "123 Outback Lane, Sydney, NSW 2000",
    promotionsFollowText:
      "Follow us on social media for flash sales and surprise promotions!",

    // About Page
    aboutTitle: "Our Story",
    aboutSubtitle:
      "From a small food truck dream to a community gathering place that's changing lives, one meal and one rescue dog at a time.",
    aboutMeetFamilyTitle: "Meet the King Family",
    aboutStoryParagraph1:
      "KINGAROOS began as a dream shared around our family dinner table. Sarah and David King, along with their three kids, had always been passionate about two things: creating amazing food and helping animals in need.",
    aboutStoryParagraph2:
      "What started as weekend barbecues for friends slowly grew into something bigger. Our neighbors kept asking us to cater their events, and we realized we had something special brewing. But it wasn't until we rescued our first dog, Rusty, that we found our true purpose.",
    aboutStoryParagraph3:
      "Rusty came from a local shelter, scared and skinny. Watching him transform into the happy, confident dog he is today made us realize how many other dogs needed that same second chance. That's when we decided to combine our love of food with our passion for animal rescue.",
    aboutJourneyTitle: "Our Journey",
    aboutFoodTruckTitle: "2019: The Food Truck",
    aboutFoodTruckText:
      'Started with a single food truck, "King\'s Mobile Kitchen," serving Australian comfort food at local markets and events.',
    aboutRescuePartnershipTitle: "2021: First Rescue Partnership",
    aboutRescuePartnershipText:
      "After rescuing Rusty, we partnered with Sydney Animal Rescue to donate a portion of profits to help other dogs.",
    aboutRestaurantOpensTitle: "2023: KINGAROOS Opens",
    aboutRestaurantOpensText:
      "Opened our first brick-and-mortar restaurant with a mission: great food, good vibes, and helping paws.",
    aboutMissionTitle: "Our Mission",
    aboutMissionQuote:
      "We believe in good food, family, and giving every dog a second chance. At KINGAROOS, every meal shared is a step toward building a more compassionate community.",
    aboutMissionSignature: "— The King Family",
    aboutValuesTitle: "What We Stand For",
    aboutCompassionTitle: "Compassion",
    aboutCompassionText:
      "Every decision we make considers the wellbeing of animals, our community, and our planet.",
    aboutCommunityTitle: "Community",
    aboutCommunityText:
      "We're more than a restaurant - we're a gathering place where friendships form and families grow.",
    aboutQualityTitle: "Quality",
    aboutQualityText:
      "From our locally-sourced ingredients to our carefully crafted atmosphere, we never compromise on quality.",

    // Contact Page
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Come visit us, give us a call, or connect with us online. We'd love to hear from you and welcome you to the KINGAROOS family!",
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
    contactFollowText:
      "Stay connected with us on social media for the latest updates, rescue dog stories, and behind-the-scenes moments!",
    contactFacebookDescription: "Daily updates and community stories",
    contactInstagramDescription: "Food photos and rescue dog features",
    contactGoodToKnowTitle: "Good to Know",
    contactDogPolicyTitle: "🐶 Bringing Your Dog?",
    contactReservationsTitle: "📞 Reservations",
    contactParkingAccessTitle: "🚗 Parking & Access",
    contactPaymentTitle: "💳 Payment & Policies",
    contactCantWaitTitle: "We Can't Wait to Meet You!",
    contactCantWaitText:
      "Whether you're dining solo, bringing the family, or coming with your furry friend, we're here to make your experience memorable. Every visit helps a rescue dog too!",
    contactSeeYouText:
      "See you soon at KINGAROOS - where great food meets helping paws! 🐾",

    // Contact Page - Additional Fields for hardcoded content
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

    // Footer
    footerTagline:
      "Great Food. Good Vibes. Helping Paws. Every meal helps rescue a dog in need.",
    footerContactTitle: "Contact Us",
    footerHoursSocialTitle: "Hours & Social",
    footerMondayThursday: "Mon-Thu: 11am - 9pm",
    footerFridaySaturday: "Fri-Sat: 11am - 10pm",
    footerSunday: "Sunday: 10am - 8pm",
    footerCopyright: "© 2024 KINGAROOS. All rights reserved.",

    // Admin Login
    adminLoginTitle: "Admin Login",
    adminPasswordLabel: "Password",
    adminPasswordPlaceholder: "Enter admin password",
    adminLoginButton: "Login",
    adminCancelButton: "Cancel",
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

  // Apply theme to the root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (siteContent.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [siteContent.theme]);

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
        // Ensure all required fields from defaultSiteContent are present
        const mergedContent = {
          ...defaultSiteContent,
          ...content,
          siteTexts: {
            ...defaultSiteContent.siteTexts,
            ...(content.siteTexts || {})
          }
        };
        setSiteContent(mergedContent);
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
          // Ensure defaultSiteContent fields are merged with localStorage content
          const mergedContent = {
            ...defaultSiteContent,
            ...parsedContent,
            siteTexts: {
              ...defaultSiteContent.siteTexts,
              ...(parsedContent.siteTexts || {})
            }
          };
          setSiteContent(mergedContent);
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
