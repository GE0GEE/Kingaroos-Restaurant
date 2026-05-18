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
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { db, auth } from "../firebase-config";

// --- PROMOTION CATEGORIES ---
export const promotionCategories = {
  happyHour: {
    name: "Happy Hour",
    badge: "Limited Time",
    colorClasses: "from-aussie-orange to-aussie-burnt-red",
  },
  dogSpecial: {
    name: "Dog Special",
    badge: "Pawsome Deal",
    colorClasses: "from-aussie-eucalyptus to-green-700",
  },
  familyDeal: {
    name: "Family Deal",
    badge: "Family Fun",
    colorClasses: "from-brown-600 to-brown-800",
  },
  loyalty: {
    name: "Loyalty Offer",
    badge: "Member's Gift",
    colorClasses: "from-sand-600 to-aussie-orange",
  },
  general: {
    name: "Special Offer",
    badge: "Special",
    colorClasses: "from-gray-500 to-gray-700",
  },
};
export type PromotionCategoryKey = keyof typeof promotionCategories;

// --- INTERFACES ---
export interface Dog { id: string; name: string; breed: string; age: string; personality: string; beforeImage: string; afterImage: string; rescueStory: string; }

// ✅ CHANGED: category is now `string` to support all your menu sections
export interface MenuItem { id: string; name: string; description: string; price: string; image: string; featured?: boolean; category: string; }

export interface Event { id: string; title: string; date: string; time: string; description: string; type: "music" | "dogs" | "family" | "special" | "food"; category: "thisWeek" | "comingSoon"; }
export interface Promotion { id: string; title: string; subtitle: string; details: string; description: string; category: PromotionCategoryKey; }

export interface SiteContent {
  logoImage: string;
  faviconImage: string;
  theme: "light" | "dark";
  socialLinks: { facebook: string; instagram: string; twitter: string; };
  heroImages: Array<{ url: string; alt: string; }>;
  welcomeImages: Array<{ url: string; alt: string; }>;
  aboutImages: { familyPhoto: string; originalFoodTruck: string; firstRescueDog: string; restaurantOpensImage: string; };
  siteImages: { dogRescuePlaceholderImage: string; };
  siteTexts: { [key: string]: any; };
  dogs: Dog[];
  menuItems: MenuItem[];
  events: Event[];
  promotions: Promotion[];
}

// ============================================================
// 🆕 YOUR FULL MENU ARRAY (paste it here)
// ============================================================
const fullMenuItems: MenuItem[] = [
  // ---- SOUPS ----
  { id: "soup1", category: "soups", name: "Bulalo", price: "₱550", description: "Tender beef shank and bone marrow soup with vegetables. Serves 4-5.", featured: true, image: "/placeholder.svg" },
  { id: "soup2", category: "soups", name: "Chicken Soup (Tinulang Manok)", price: "₱250", description: "Traditional Filipino chicken soup with ginger and green papaya.", featured: false, image: "/placeholder.svg" },
  { id: "soup3", category: "soups", name: "Fish Soup (Tinulang Isda)", price: "₱275", description: "Light and sour fish soup with vegetables.", featured: false, image: "/placeholder.svg" },
  { id: "soup4", category: "soups", name: "Chicken Halang-Halang", price: "₱275", description: "Spicy coconut-based chicken stew.", featured: false, image: "/placeholder.svg" },
  { id: "soup5", category: "soups", name: "Shrimp Sinigang", price: "₱295", description: "Sour tamarind soup with fresh shrimp.", featured: false, image: "/placeholder.svg" },
  { id: "soup6", category: "soups", name: "Pork Sinigang", price: "₱280", description: "Classic sour soup with pork belly and vegetables.", featured: false, image: "/placeholder.svg" },
  { id: "soup7", category: "soups", name: "Fish Sinigang", price: "₱280", description: "Sour tamarind soup with fresh fish fillet.", featured: false, image: "/placeholder.svg" },

  // ---- APPETIZERS ----
  { id: "app1", category: "appetizers", name: "Calamares", price: "₱295", description: "Crispy fried squid rings served with dipping sauce.", featured: false, image: "/placeholder.svg" },
  { id: "app2", category: "appetizers", name: "Breaded Shrimp", price: "₱295", description: "Crunchy breaded shrimp with homemade dip.", featured: false, image: "/placeholder.svg" },
  { id: "app3", category: "appetizers", name: "Kinilaw", price: "₱265", description: "Fresh raw fish cured in vinegar, ginger, and chili.", featured: false, image: "/placeholder.svg" },
  { id: "app4", category: "appetizers", name: "Bacon Wrapped Shrimp", price: "₱295", description: "Succulent shrimp wrapped in crispy bacon.", featured: false, image: "/placeholder.svg" },
  { id: "app5", category: "appetizers", name: "Pork Spring Rolls (Lumpia)", price: "₱185", description: "Golden fried spring rolls filled with seasoned pork.", featured: false, image: "/placeholder.svg" },
  { id: "app6", category: "appetizers", name: "French Fries", price: "₱150", description: "Classic salted fries.", featured: false, image: "/placeholder.svg" },
  { id: "app7", category: "appetizers", name: "Homemade French Fries", price: "₱185", description: "Thick-cut, crispy, and seasoned with special spices.", featured: false, image: "/placeholder.svg" },
  { id: "app8", category: "appetizers", name: "Bruschetta", price: "₱195", description: "Toasted bread topped with fresh tomatoes, garlic, and basil.", featured: false, image: "/placeholder.svg" },
  { id: "app9", category: "appetizers", name: "Garlic Bread", price: "₱150", description: "Toasted bread with garlic butter.", featured: false, image: "/placeholder.svg" },
  { id: "app10", category: "appetizers", name: "Onion Rings", price: "₱175", description: "Beer-battered crispy onion rings.", featured: false, image: "/placeholder.svg" },
  { id: "app11", category: "appetizers", name: "Dynamite", price: "₱175", description: "Green chili peppers stuffed with ham and cheese, wrapped in lumpia wrapper and fried.", featured: true, image: "/placeholder.svg" },

  // ---- SIZZLERS ----
  { id: "sizz1", category: "sizzlers", name: "Sisig", price: "₱195", description: "Sizzling chopped pork with onions, chili, and calamansi.", featured: true, image: "/placeholder.svg" },
  { id: "sizz2", category: "sizzlers", name: "Sizzling Beef Patty with Fries", price: "₱265", description: "Juicy beef patty on a sizzling plate with crispy fries.", featured: false, image: "/placeholder.svg" },
  { id: "sizz3", category: "sizzlers", name: "Sizzling Squid Rings with Fries", price: "₱295", description: "Tender squid rings sizzling with garlic and butter, served with fries.", featured: false, image: "/placeholder.svg" },
  { id: "sizz4", category: "sizzlers", name: "Sizzling Ginger Oystered Beef", price: "₱385", description: "Beef stir-fried with ginger and oyster sauce on a hot plate.", featured: false, image: "/placeholder.svg" },
  { id: "sizz5", category: "sizzlers", name: "Gambas", price: "₱270", description: "Peeled shrimp sautéed in garlic and spicy chili sauce.", featured: false, image: "/placeholder.svg" },

  // ---- SALADS ----
  { id: "salad1", category: "salads", name: "Caesar Salad", price: "₱250", description: "Crisp romaine lettuce, parmesan, croutons, and creamy Caesar dressing.", featured: false, image: "/placeholder.svg" },
  { id: "salad2", category: "salads", name: "Greek Salad", price: "₱275", description: "Mixed greens, feta cheese, olives, tomatoes, cucumber, and oregano vinaigrette.", featured: false, image: "/placeholder.svg" },
  { id: "salad3", category: "salads", name: "Side Salad", price: "₱80", description: "Fresh mixed greens with choice of dressing.", featured: false, image: "/placeholder.svg" },

  // ---- MAIN COURSES ----
  { id: "main1", category: "mains", name: "Baby Back Ribs", price: "₱380", description: "Tender pork ribs glazed with barbecue sauce. Served with fries or rice.", featured: true, image: "/placeholder.svg" },
  { id: "main2", category: "mains", name: "Pork Schnitzel", price: "₱375", description: "Breaded and fried pork cutlet. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main3", category: "mains", name: "Chicken Schnitzel", price: "₱350", description: "Crispy breaded chicken breast. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main4", category: "mains", name: "Chicken Cordon Bleu", price: "₱365", description: "Chicken breast stuffed with ham and cheese, breaded and fried. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main5", category: "mains", name: "Chicken Wings", price: "₱325", description: "Classic fried chicken wings. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main6", category: "mains", name: "BBQ Chicken Wings", price: "₱335", description: "Grilled wings glazed with smoky barbecue sauce. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main7", category: "mains", name: "Grilled Fish", price: "₱265", description: "Fresh fish fillet grilled to perfection. Served with fries or rice.", featured: false, image: "/placeholder.svg" },
  { id: "main8", category: "mains", name: "Chicken Fingers", price: "₱275", description: "Crispy chicken strips with dipping sauce.", featured: false, image: "/placeholder.svg" },
  { id: "main9", category: "mains", name: "Fish and Chips", price: "₱295", description: "Beer-battered fish fillet with thick-cut fries.", featured: false, image: "/placeholder.svg" },
  { id: "main10", category: "mains", name: "Battered Chicken", price: "₱295", description: "Crispy battered chicken pieces.", featured: false, image: "/placeholder.svg" },
  { id: "main11", category: "mains", name: "Sweet & Sour Fish", price: "₱275", description: "Fried fish fillet in sweet and sour sauce with bell peppers and pineapple.", featured: false, image: "/placeholder.svg" },
  { id: "main12", category: "mains", name: "Crispy Pata", price: "₱650", description: "Deep-fried pork knuckle served with soy-vinegar dip.", featured: true, image: "/placeholder.svg" },
  { id: "main13", category: "mains", name: "Crisp Pork Belly", price: "₱285", description: "Lechon kawali style – crispy skin, tender meat.", featured: false, image: "/placeholder.svg" },
  { id: "main14", category: "mains", name: "Pork Adobo", price: "₱275", description: "Filipino adobo – pork simmered in soy sauce, vinegar, garlic, and spices.", featured: false, image: "/placeholder.svg" },
  { id: "main15", category: "mains", name: "Chicken Adobo", price: "₱260", description: "Chicken cooked adobo style.", featured: false, image: "/placeholder.svg" },
  { id: "main16", category: "mains", name: "Chicken Curry (Boneless)", price: "₱275", description: "Creamy coconut chicken curry with vegetables.", featured: false, image: "/placeholder.svg" },
  { id: "main17", category: "mains", name: "Chili Con Carne w/ Bread & Sausage", price: "₱350", description: "Hearty chili with ground beef, beans, and Kevin's sausage, served with mashed potato.", featured: false, image: "/placeholder.svg" },
  { id: "main18", category: "mains", name: "Beef Quesadilla", price: "₱250", description: "Grilled tortilla filled with seasoned beef and cheese. Served with fries.", featured: false, image: "/placeholder.svg" },
  { id: "main19", category: "mains", name: "Chopseuy (No Meat)", price: "₱195", description: "Mixed vegetables stir-fried in savory sauce.", featured: false, image: "/placeholder.svg" },
  { id: "main20", category: "mains", name: "Chopseuy with Pork", price: "₱260", description: "Mixed vegetables with pork.", featured: false, image: "/placeholder.svg" },
  { id: "main21", category: "mains", name: "Chopseuy with Shrimp", price: "₱275", description: "Mixed vegetables with fresh shrimp.", featured: false, image: "/placeholder.svg" },
  { id: "main22", category: "mains", name: "Chopseuy with Chicken", price: "₱250", description: "Mixed vegetables with chicken.", featured: false, image: "/placeholder.svg" },

  // ---- NOODLES & PASTA ----
  { id: "noodle1", category: "noodles", name: "Carbonara", price: "₱275", description: "Creamy pasta with bacon and parmesan. Served with bread.", featured: false, image: "/placeholder.svg" },
  { id: "noodle2", category: "noodles", name: "Chicken Pesto", price: "₱290", description: "Grilled chicken on pesto pasta. Served with bread.", featured: false, image: "/placeholder.svg" },
  { id: "noodle3", category: "noodles", name: "Spaghetti Bolognese", price: "₱285", description: "Classic meat sauce spaghetti. Served with bread.", featured: false, image: "/placeholder.svg" },
  { id: "noodle4", category: "noodles", name: "Beef Stroganoff", price: "₱310", description: "Tender beef strips in creamy mushroom sauce over pasta.", featured: false, image: "/placeholder.svg" },
  { id: "noodle5", category: "noodles", name: "Filipino Style Spaghetti", price: "₱260", description: "Sweet-style spaghetti with hotdog slices and grated cheese. Served with bread.", featured: false, image: "/placeholder.svg" },
  { id: "noodle6", category: "noodles", name: "Stir Fry Seafood Noodles", price: "₱315", description: "Egg noodles wok-tossed with mixed seafood and vegetables.", featured: true, image: "/placeholder.svg" },
  { id: "noodle7", category: "noodles", name: "Pancit Guisado (Pork)", price: "₱280", description: "Stir-fried noodles with pork and vegetables.", featured: false, image: "/placeholder.svg" },
  { id: "noodle8", category: "noodles", name: "Pancit Guisado (Chicken)", price: "₱260", description: "Stir-fried noodles with chicken.", featured: false, image: "/placeholder.svg" },
  { id: "noodle9", category: "noodles", name: "Sotanghon Guisado", price: "₱295", description: "Glass noodles stir-fried with meat and vegetables.", featured: false, image: "/placeholder.svg" },

  // ---- BREAKFAST (All Day) ----
  { id: "bf1", category: "breakfast", name: "Homemade Sausage Breakfast", price: "₱280", description: "Homemade sausage, egg, tomato, baked beans, toasted bread with butter & jam. Includes instant coffee or iced tea.", featured: false, image: "/placeholder.svg" },
  { id: "bf2", category: "breakfast", name: "Breakfast #1", price: "₱295", description: "Two eggs, 4 slices bacon, toasted bread with butter & jam. Includes instant coffee or iced tea.", featured: false, image: "/placeholder.svg" },
  { id: "bf3", category: "breakfast", name: "Breakfast #2", price: "₱325", description: "Hash brown, 2 eggs, 2 slices bacon, baked beans, toasted bread with butter & jam. Includes instant coffee or iced tea.", featured: false, image: "/placeholder.svg" },
  { id: "bf4", category: "breakfast", name: "Pancake (Banana/Mango)", price: "₱200", description: "Fluffy pancake topped with fresh banana or mango slices.", featured: false, image: "/placeholder.svg" },
  { id: "bf5", category: "breakfast", name: "Tapsilog", price: "₱215", description: "Beef tapa, fried egg, and garlic rice.", featured: true, image: "/placeholder.svg" },
  { id: "bf6", category: "breakfast", name: "Spanish Omelette", price: "₱250", description: "Omelette with tomato, onion, garlic, and cheese.", featured: false, image: "/placeholder.svg" },
  { id: "bf7", category: "breakfast", name: "Ham & Cheese Omelette", price: "₱225", description: "Fluffy omelette filled with ham and cheese.", featured: false, image: "/placeholder.svg" },

  // ---- DESSERTS ----
  { id: "dessert1", category: "desserts", name: "Banana Split", price: "₱225", description: "Sliced banana with scoops of ice cream, chocolate syrup, and cherries.", featured: false, image: "/placeholder.svg" },
  { id: "dessert2", category: "desserts", name: "Mango Split", price: "₱250", description: "Fresh mango slices with ice cream and toppings.", featured: false, image: "/placeholder.svg" },
  { id: "dessert3", category: "desserts", name: "Silvanas (Cookie) with Ice Cream", price: "₱150", description: "Cashew cookie topped with a scoop of ice cream.", featured: false, image: "/placeholder.svg" },
  { id: "dessert4", category: "desserts", name: "Silvanas (per piece)", price: "₱50", description: "Single cashew cookie.", featured: false, image: "/placeholder.svg" },
  { id: "dessert5", category: "desserts", name: "Ice Cream Scoop", price: "₱65", description: "Choice of chocolate, strawberry, vanilla, or ube.", featured: false, image: "/placeholder.svg" },

  // ---- COCKTAILS (Alcoholic) ----
  { id: "cocktail1", category: "cocktails", name: "Frozen Margarita", price: "₱165", description: "Classic frozen lime margarita.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail2", category: "cocktails", name: "Mango Margarita", price: "₱185", description: "Margarita with fresh mango.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail3", category: "cocktails", name: "Raspberry Margarita", price: "₱200", description: "Sweet-tart raspberry margarita.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail4", category: "cocktails", name: "Mango Daiquiri", price: "₱165", description: "Frozen daiquiri with mango.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail5", category: "cocktails", name: "Tequila Sunrise", price: "₱150", description: "Tequila, orange juice, and grenadine.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail6", category: "cocktails", name: "Pina Colada", price: "₱190", description: "Rum, coconut cream, and pineapple juice.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail7", category: "cocktails", name: "Blue Lagoon", price: "₱140", description: "Vodka, blue curaçao, and lemonade.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail8", category: "cocktails", name: "Lady Green", price: "₱130", description: "Melon liqueur based cocktail.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail9", category: "cocktails", name: "Long Island Iced Tea", price: "₱200", description: "Strong mix of five spirits with cola.", featured: true, image: "/placeholder.svg" },
  { id: "cocktail10", category: "cocktails", name: "Gin Tonic", price: "₱85", description: "Gin and tonic water.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail11", category: "cocktails", name: "Rhum Coke", price: "₱85", description: "Rum and cola.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail12", category: "cocktails", name: "Cuba Libre", price: "₱85", description: "Rum, cola, and lime.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail13", category: "cocktails", name: "Screwdriver", price: "₱110", description: "Vodka and orange juice.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail14", category: "cocktails", name: "Sidecar", price: "₱110", description: "Cognac, orange liqueur, and lemon juice.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail15", category: "cocktails", name: "Between the Sheets", price: "₱125", description: "Rum, cognac, orange liqueur, and lemon.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail16", category: "cocktails", name: "Ocean Breeze", price: "₱110", description: "Vodka, cranberry, and grapefruit.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail17", category: "cocktails", name: "Adios Mother Fucker", price: "₱195", description: "Powerful mix of five spirits with blue curaçao.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail18", category: "cocktails", name: "Frozen Mudslide", price: "₱195", description: "Vodka, coffee liqueur, Irish cream blended.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail19", category: "cocktails", name: "Mudslide", price: "₱140", description: "Creamy mix of vodka, coffee liqueur, and Irish cream.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail20", category: "cocktails", name: "Hang Over", price: "₱165", description: "Hair-of-the-dog style cocktail.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail21", category: "cocktails", name: "Cosmopolitan", price: "₱175", description: "Vodka, cranberry, lime, and triple sec.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail22", category: "cocktails", name: "White Russian", price: "₱180", description: "Vodka, coffee liqueur, and cream.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail23", category: "cocktails", name: "Dirty Mother", price: "₱180", description: "Brandy, coffee liqueur, and vodka.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail24", category: "cocktails", name: "Espresso Martini", price: "₱200", description: "Vodka, espresso, and coffee liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail25", category: "cocktails", name: "Amaretto Mist", price: "₱220", description: "Amaretto sour style.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail26", category: "cocktails", name: "Jagerbomb", price: "₱160", description: "Jägermeister dropped into energy drink.", featured: false, image: "/placeholder.svg" },
  { id: "cocktail27", category: "cocktails", name: "Bloody Mary", price: "₱180", description: "Vodka, tomato juice, and spices.", featured: false, image: "/placeholder.svg" },

  // ---- SHOOTERS & NON-ALCOHOLIC COCKTAILS ----
  { id: "shooter1", category: "shots", name: "B-52", price: "₱150", description: "Layered shot of coffee liqueur, Irish cream, and triple sec.", featured: false, image: "/placeholder.svg" },
  { id: "shooter2", category: "shots", name: "Blow Job", price: "₱120", description: "Creamy shot (no hands!).", featured: false, image: "/placeholder.svg" },
  { id: "shooter3", category: "shots", name: "Tainted Love Shots", price: "₱120", description: "Sweet and sour shot.", featured: false, image: "/placeholder.svg" },
  { id: "nonal1", category: "non-alcoholic", name: "Witch Brew", price: "₱95", description: "Fruity non-alcoholic mix.", featured: false, image: "/placeholder.svg" },
  { id: "nonal2", category: "non-alcoholic", name: "Caribbean Breeze", price: "₱110", description: "Pineapple and coconut refresher.", featured: false, image: "/placeholder.svg" },
  { id: "nonal3", category: "non-alcoholic", name: "Shirley Temple", price: "₱120", description: "Ginger ale, grenadine, and cherry.", featured: false, image: "/placeholder.svg" },

  // ---- BEERS ----
  { id: "beer1", category: "beers", name: "SMB (San Miguel Pale Pilsen)", price: "₱70", description: "Classic Filipino pilsner.", featured: false, image: "/placeholder.svg" },
  { id: "beer2", category: "beers", name: "SML (San Miguel Light)", price: "₱70", description: "Light lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer3", category: "beers", name: "San Miguel Apple", price: "₱70", description: "Flavored malt beverage with apple.", featured: false, image: "/placeholder.svg" },
  { id: "beer4", category: "beers", name: "San Miguel Lemon", price: "₱70", description: "Lemon-flavored malt drink.", featured: false, image: "/placeholder.svg" },
  { id: "beer5", category: "beers", name: "San Miguel Lychee", price: "₱70", description: "Lychee-flavored malt beverage.", featured: false, image: "/placeholder.svg" },
  { id: "beer6", category: "beers", name: "San Miguel Zero", price: "₱70", description: "Non-alcoholic beer.", featured: false, image: "/placeholder.svg" },
  { id: "beer7", category: "beers", name: "San Miguel Superdry", price: "₱75", description: "Crisp, dry lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer8", category: "beers", name: "Cerveza Negra", price: "₱75", description: "Dark lager with caramel notes.", featured: false, image: "/placeholder.svg" },
  { id: "beer9", category: "beers", name: "Beer na Beer", price: "₱70", description: "Premium Filipino lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer10", category: "beers", name: "Red Horse Stallion", price: "₱70", description: "Strong lager (6.9% abv).", featured: false, image: "/placeholder.svg" },
  { id: "beer11", category: "beers", name: "Smirnoff Mule", price: "₱95", description: "Vodka, ginger beer, and lime.", featured: false, image: "/placeholder.svg" },
  { id: "beer12", category: "beers", name: "Heineken", price: "₱105", description: "International premium lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer13", category: "beers", name: "Cali", price: "₱70", description: "Local craft lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer14", category: "beers", name: "Apolong Pilsner (285ml)", price: "₱115", description: "Craft pilsner.", featured: false, image: "/placeholder.svg" },
  { id: "beer15", category: "beers", name: "Apolong Farmhouse (285ml)", price: "₱110", description: "Saison-style ale.", featured: false, image: "/placeholder.svg" },
  { id: "beer16", category: "beers", name: "Apolong Lager (285ml)", price: "₱115", description: "Craft lager.", featured: false, image: "/placeholder.svg" },
  { id: "beer17", category: "beers", name: "Apolong Porter (285ml)", price: "₱115", description: "Dark, roasty porter.", featured: false, image: "/placeholder.svg" },

  // ---- WINES & LIQUOR (Bottle/Glass) ----
  { id: "wine1", category: "wines", name: "Hardy's Cabernet Sauvignon (Bottle)", price: "₱850", description: "Full-bodied red wine.", featured: false, image: "/placeholder.svg" },
  { id: "wine2", category: "wines", name: "Hardy's Merlot (Bottle)", price: "₱850", description: "Smooth red with berry notes.", featured: false, image: "/placeholder.svg" },
  { id: "wine3", category: "wines", name: "Yellowtail Merlot (Bottle)", price: "₱950", description: "Easy-drinking Australian red.", featured: false, image: "/placeholder.svg" },
  { id: "wine4", category: "wines", name: "Yellowtail Cabernet Sauvignon (Bottle)", price: "₱950", description: "Rich red with blackcurrant.", featured: false, image: "/placeholder.svg" },
  { id: "wine5", category: "wines", name: "Frontera Merlot (Bottle)", price: "₱850", description: "Chilean red.", featured: false, image: "/placeholder.svg" },
  { id: "wine6", category: "wines", name: "Franzia Red (Glass)", price: "₱120", description: "California red blend by the glass.", featured: false, image: "/placeholder.svg" },
  { id: "wine7", category: "wines", name: "Hardy's Red Wine (Glass)", price: "₱180", description: "Glass of Hardy's red.", featured: false, image: "/placeholder.svg" },
  { id: "wine8", category: "wines", name: "Yellowtail Red Wine (Glass)", price: "₱200", description: "Glass of Yellowtail red.", featured: false, image: "/placeholder.svg" },
  { id: "wine9", category: "wines", name: "Yellowtail Red Moscato (Glass)", price: "₱200", description: "Sweet, lightly sparkling red.", featured: false, image: "/placeholder.svg" },

  // ---- LIQUOR (Bottles & Sets) ----
  { id: "liquor1", category: "liquor", name: "Tanduay 5 Years (Bottle)", price: "₱450", description: "Aged rum.", featured: false, image: "/placeholder.svg" },
  { id: "liquor2", category: "liquor", name: "Emperador (Bottle)", price: "₱350", description: "Popular brandy.", featured: false, image: "/placeholder.svg" },
  { id: "liquor3", category: "liquor", name: "Fundador Light (Bottle)", price: "₱650", description: "Light brandy.", featured: false, image: "/placeholder.svg" },
  { id: "liquor4", category: "liquor", name: "Tanduay 5yrs + Ice Tea or Coke (Set)", price: "₱600", description: "Bottle with 3 chasers.", featured: false, image: "/placeholder.svg" },
  { id: "liquor5", category: "liquor", name: "Emperador + Ice Tea or Coke (Set)", price: "₱500", description: "Bottle with 3 chasers.", featured: false, image: "/placeholder.svg" },
  { id: "liquor6", category: "liquor", name: "Fundador Light + Ice Tea or Coke (Set)", price: "₱750", description: "Bottle with 3 chasers.", featured: false, image: "/placeholder.svg" },

  // ---- SHOTS (per shot) ----
  { id: "shot1", category: "shots", name: "Wild Turkey (Whiskey)", price: "₱150", description: "Kentucky straight bourbon.", featured: false, image: "/placeholder.svg" },
  { id: "shot2", category: "shots", name: "Jameson (Whiskey)", price: "₱130", description: "Irish whiskey.", featured: false, image: "/placeholder.svg" },
  { id: "shot3", category: "shots", name: "Jim Beam (Whiskey)", price: "₱95", description: "Classic bourbon.", featured: false, image: "/placeholder.svg" },
  { id: "shot4", category: "shots", name: "Jack Daniels (Whiskey)", price: "₱150", description: "Tennessee whiskey.", featured: false, image: "/placeholder.svg" },
  { id: "shot5", category: "shots", name: "White Castle 69 (Whiskey)", price: "₱55", description: "Budget whiskey.", featured: false, image: "/placeholder.svg" },
  { id: "shot6", category: "shots", name: "Dewar's White Label (Whiskey)", price: "₱110", description: "Blended Scotch.", featured: false, image: "/placeholder.svg" },
  { id: "shot7", category: "shots", name: "Chivas Regal 12yr (Whiskey)", price: "₱120", description: "Deluxe blended Scotch.", featured: false, image: "/placeholder.svg" },
  { id: "shot8", category: "shots", name: "Johnny Walker (Whiskey)", price: "₱120", description: "Johnnie Walker Red Label.", featured: false, image: "/placeholder.svg" },
  { id: "shot9", category: "shots", name: "Don Papa (Rhum)", price: "₱150", description: "Premium Filipino rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot10", category: "shots", name: "Captain Morgan Gold", price: "₱65", description: "Spiced gold rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot11", category: "shots", name: "Malibu", price: "₱95", description: "Coconut rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot12", category: "shots", name: "Boracay Rum", price: "₱45", description: "Local coconut rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot13", category: "shots", name: "Bacardi Silver", price: "₱75", description: "White rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot14", category: "shots", name: "Tanduay White", price: "₱50", description: "Classic Tanduay.", featured: false, image: "/placeholder.svg" },
  { id: "shot15", category: "shots", name: "Tanduay 5yrs", price: "₱50", description: "Aged rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot16", category: "shots", name: "Tanduay 12yrs", price: "₱60", description: "Extra aged.", featured: false, image: "/placeholder.svg" },
  { id: "shot17", category: "shots", name: "Tanduay 15yrs", price: "₱65", description: "Premium aged rum.", featured: false, image: "/placeholder.svg" },
  { id: "shot18", category: "shots", name: "Absolut Blue Vodka", price: "₱95", description: "Swedish vodka.", featured: false, image: "/placeholder.svg" },
  { id: "shot19", category: "shots", name: "Grey Goose", price: "₱170", description: "Premium French vodka.", featured: false, image: "/placeholder.svg" },
  { id: "shot20", category: "shots", name: "Russian Standard Vodka", price: "₱90", description: "Russian vodka.", featured: false, image: "/placeholder.svg" },
  { id: "shot21", category: "shots", name: "Toska Vodka", price: "₱50", description: "Budget vodka.", featured: false, image: "/placeholder.svg" },
  { id: "shot22", category: "shots", name: "Smirnoff Vodka", price: "₱95", description: "Classic vodka.", featured: false, image: "/placeholder.svg" },
  { id: "shot23", category: "shots", name: "Bombay Sapphire Gin", price: "₱120", description: "Premium London dry gin.", featured: false, image: "/placeholder.svg" },
  { id: "shot24", category: "shots", name: "Tanqueray Gin", price: "₱120", description: "Classic London dry.", featured: false, image: "/placeholder.svg" },
  { id: "shot25", category: "shots", name: "Gilbey's Gin", price: "₱60", description: "Economy gin.", featured: false, image: "/placeholder.svg" },
  { id: "shot26", category: "shots", name: "El Hombre Gold Tequila", price: "₱65", description: "Gold tequila.", featured: false, image: "/placeholder.svg" },
  { id: "shot27", category: "shots", name: "El Hombre Silver Tequila", price: "₱65", description: "Silver/blanco tequila.", featured: false, image: "/placeholder.svg" },
  { id: "shot28", category: "shots", name: "Mojitos Gold Tequila", price: "₱75", description: "Gold tequila.", featured: false, image: "/placeholder.svg" },
  { id: "shot29", category: "shots", name: "Mojitos Silver Tequila", price: "₱75", description: "Silver tequila.", featured: false, image: "/placeholder.svg" },
  { id: "shot30", category: "shots", name: "Jose Cuervo Gold", price: "₱120", description: "Well-known gold tequila.", featured: false, image: "/placeholder.svg" },
  { id: "shot31", category: "shots", name: "Fundador Brandy", price: "₱90", description: "Spanish brandy.", featured: false, image: "/placeholder.svg" },
  { id: "shot32", category: "shots", name: "Fundador Light", price: "₱40", description: "Light brandy.", featured: false, image: "/placeholder.svg" },
  { id: "shot33", category: "shots", name: "Emperador Light", price: "₱50", description: "Light brandy.", featured: false, image: "/placeholder.svg" },
  { id: "shot34", category: "shots", name: "Jagermeister", price: "₱120", description: "Herbal liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot35", category: "shots", name: "Drambuie", price: "₱180", description: "Scotch whisky liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot36", category: "shots", name: "Amaretto Disaronno", price: "₱180", description: "Italian almond liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot37", category: "shots", name: "Cointreau", price: "₱160", description: "Orange liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot38", category: "shots", name: "Vaccari", price: "₱120", description: "Sambuca-style anise liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot39", category: "shots", name: "Kahlua", price: "₱130", description: "Coffee liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot40", category: "shots", name: "Tia Maria", price: "₱120", description: "Jamaican coffee liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot41", category: "shots", name: "Tequila Rose", price: "₱120", description: "Strawberry cream liqueur.", featured: false, image: "/placeholder.svg" },
  { id: "shot42", category: "shots", name: "Baileys Irish Cream", price: "₱110", description: "Classic Irish cream.", featured: false, image: "/placeholder.svg" },

  // ---- NON-ALCOHOLIC BEVERAGES ----
  { id: "drink1", category: "non-alcoholic", name: "Four Seasons Juice (Can)", price: "₱65", description: "Mixed fruit juice.", featured: false, image: "/placeholder.svg" },
  { id: "drink2", category: "non-alcoholic", name: "Mango Juice (Can)", price: "₱65", description: "Mango nectar.", featured: false, image: "/placeholder.svg" },
  { id: "drink3", category: "non-alcoholic", name: "Pineapple Juice (Can)", price: "₱65", description: "Pineapple drink.", featured: false, image: "/placeholder.svg" },
  { id: "drink4", category: "non-alcoholic", name: "Pineorange Juice (Can)", price: "₱65", description: "Pineapple-orange blend.", featured: false, image: "/placeholder.svg" },
  { id: "drink5", category: "non-alcoholic", name: "Coke Regular (Can)", price: "₱70", description: "Classic cola.", featured: false, image: "/placeholder.svg" },
  { id: "drink6", category: "non-alcoholic", name: "Coke Zero (Can)", price: "₱70", description: "Sugar-free cola.", featured: false, image: "/placeholder.svg" },
  { id: "drink7", category: "non-alcoholic", name: "Coke Light (Can)", price: "₱70", description: "Diet cola.", featured: false, image: "/placeholder.svg" },
  { id: "drink8", category: "non-alcoholic", name: "Tonic Water", price: "₱70", description: "Carbonated quinine water.", featured: false, image: "/placeholder.svg" },
  { id: "drink9", category: "non-alcoholic", name: "Soda Water", price: "₱70", description: "Carbonated water.", featured: false, image: "/placeholder.svg" },
  { id: "drink10", category: "non-alcoholic", name: "Coke (Bottle)", price: "₱40", description: "Bottled cola.", featured: false, image: "/placeholder.svg" },
  { id: "drink11", category: "non-alcoholic", name: "Sprite (Bottle)", price: "₱40", description: "Lemon-lime soda.", featured: false, image: "/placeholder.svg" },
  { id: "drink12", category: "non-alcoholic", name: "Royal (Bottle)", price: "₱40", description: "Orange soda.", featured: false, image: "/placeholder.svg" },
  { id: "drink13", category: "non-alcoholic", name: "Iced Tea", price: "₱65", description: "Freshly brewed iced tea.", featured: false, image: "/placeholder.svg" },
  { id: "drink14", category: "non-alcoholic", name: "Calamansi Juice", price: "₱65", description: "Freshly squeezed calamansi.", featured: false, image: "/placeholder.svg" },
  { id: "shake1", category: "non-alcoholic", name: "Mango Shake", price: "₱130", description: "Thick mango shake.", featured: false, image: "/placeholder.svg" },
  { id: "shake2", category: "non-alcoholic", name: "Pineapple Shake", price: "₱120", description: "Pineapple shake.", featured: false, image: "/placeholder.svg" },
  { id: "shake3", category: "non-alcoholic", name: "Banana Shake", price: "₱120", description: "Banana milk shake.", featured: false, image: "/placeholder.svg" },
  { id: "shake4", category: "non-alcoholic", name: "Buko Shake", price: "₱120", description: "Young coconut shake.", featured: false, image: "/placeholder.svg" },
  { id: "shake5", category: "non-alcoholic", name: "Avocado Shake", price: "₱120", description: "Creamy avocado shake.", featured: false, image: "/placeholder.svg" },
  { id: "shake6", category: "non-alcoholic", name: "Ice Cream Shake", price: "₱150", description: "Choice of chocolate, strawberry, vanilla, or ube.", featured: false, image: "/placeholder.svg" },
  { id: "pitcher1", category: "non-alcoholic", name: "Pitcher - Four Seasons Juice", price: "₱180", description: "Serves 3-4.", featured: false, image: "/placeholder.svg" },
  { id: "pitcher2", category: "non-alcoholic", name: "Pitcher - Orange Juice", price: "₱180", description: "Fresh orange juice pitcher.", featured: false, image: "/placeholder.svg" },
  { id: "pitcher3", category: "non-alcoholic", name: "Pitcher - Calamansi Juice", price: "₱150", description: "Pitcher of fresh calamansi.", featured: false, image: "/placeholder.svg" },
  { id: "pitcher4", category: "non-alcoholic", name: "Pitcher - Iced Tea", price: "₱150", description: "Pitcher of iced tea.", featured: false, image: "/placeholder.svg" },

  // ---- HOT & COLD DRINKS ----
  { id: "hot1", category: "hot-drinks", name: "Iced Coffee", price: "₱130", description: "Chilled brewed coffee.", featured: false, image: "/placeholder.svg" },
  { id: "hot2", category: "hot-drinks", name: "Iced Chocolate", price: "₱120", description: "Cold chocolate drink.", featured: false, image: "/placeholder.svg" },
  { id: "hot3", category: "hot-drinks", name: "Iced Latte", price: "₱140", description: "Espresso with cold milk.", featured: false, image: "/placeholder.svg" },
  { id: "hot4", category: "hot-drinks", name: "Iced Mocha", price: "₱150", description: "Coffee, chocolate, and milk over ice.", featured: false, image: "/placeholder.svg" },
  { id: "hot5", category: "hot-drinks", name: "Cold Calamansi Juice", price: "₱65", description: "Chilled calamansi.", featured: false, image: "/placeholder.svg" },
  { id: "tea1", category: "hot-drinks", name: "Green Tea", price: "₱65", description: "Hot green tea.", featured: false, image: "/placeholder.svg" },
  { id: "tea2", category: "hot-drinks", name: "Black Tea", price: "₱65", description: "Classic black tea.", featured: false, image: "/placeholder.svg" },
  { id: "tea3", category: "hot-drinks", name: "Hibiscus Tea", price: "₱65", description: "Floral and tart herbal tea.", featured: false, image: "/placeholder.svg" },
  { id: "water1", category: "hot-drinks", name: "Bottled Water (500ml)", price: "₱35", description: "Purified water.", featured: false, image: "/placeholder.svg" },
];

// --- CORRECTED defaultSiteContent with 3 HERO IMAGES & FULL MENU ITEMS ---
const defaultSiteContent: SiteContent = {
  logoImage: "/placeholder.svg",
  faviconImage: "",
  theme: "light",
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
    restaurantOpensImage: "/placeholder.svg",
  },
  siteImages: {
    dogRescuePlaceholderImage: "/placeholder.svg",
  },
  siteTexts: {
    siteName: "Kingaroos",
    footerTagline: "Content loading...",
    contactMondayThursday: "Monday - Thursday",
    contactHoursMondayThursday: "11:00 AM - 9:00 PM",
    contactFridaySaturday: "Friday - Saturday",
    contactHoursFridaySaturday: "11:00 AM - 10:00 PM",
    contactSunday: "Sunday",
    contactHoursSunday: "10:00 AM - 8:00 PM",
    footerMondayThursday: "Mon - Thu: 11am - 9pm",
    footerFridaySaturday: "Fri - Sat: 11am - 10pm",
    footerSunday: "Sun: 10am - 8pm",
    menuReadyToDineTitle: "Ready to Dine With Us?",
    menuReadyToDineText: "Book your table today and help us make a difference for rescue dogs!",
    menuCallText: "Call us at",
    menuAddressText: "123 Outback Lane, Sydney, NSW 2000",
    eventsDontMissTitle: "Don't Miss Out!",
    eventsDontMissText: "Follow us on social media or call ahead to secure your spot at our special events. Some events may have limited seating!",
    eventsCallText: "Call for reservations:",
    eventsFacebookText: "Follow us on Facebook: @KingaroosRestaurant",
    eventsInstagramText: "Follow us on Instagram: @kingaroos_sydney",
    homePhone: "(02) 1234 5678",
    homeEmail: "hello@kingaroos.com",
    homeAddress: "123 Outback Lane, Sydney, NSW 2000",
  },
  dogs: [],
  // ✅ REPLACED empty array with fullMenuItems
  menuItems: fullMenuItems,
  events: [],
  promotions: [],
};

// ... rest of the file unchanged (AdminContext, provider, etc.)
