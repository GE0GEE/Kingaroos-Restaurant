import { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  featured: boolean;
  image: string;
}

interface MenuPageProps {
  menuItems: MenuItem[];
}

// ─── Category Config ──────────────────────────────────────────────────────────
const MAIN_CATEGORIES = [
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
] as const;

type MainCategoryId = "food" | "drinks";

interface SubCategory {
  id: string;
  label: string;
  categories: string[];
}

const SUB_CATEGORIES: Record<MainCategoryId, SubCategory[]> = {
  food: [
    { id: "all-food", label: "All Food", categories: ["soups", "appetizers", "sizzlers", "salads", "mains", "noodles", "breakfast", "desserts"] },
    { id: "soups", label: "Soups", categories: ["soups"] },
    { id: "appetizers", label: "Appetizers", categories: ["appetizers", "sizzlers", "salads"] },
    { id: "mains", label: "Mains", categories: ["mains", "noodles", "breakfast"] },
    { id: "desserts", label: "Desserts", categories: ["desserts"] },
  ],
  drinks: [
    { id: "all-drinks", label: "All Drinks", categories: ["cocktails", "shots", "beers", "wines", "liquor", "non-alcoholic", "hot-drinks"] },
    { id: "cocktails", label: "Cocktails", categories: ["cocktails"] },
    { id: "shots", label: "Shots & Spirits", categories: ["shots"] },
    { id: "beers", label: "Beers", categories: ["beers"] },
    { id: "wines", label: "Wines", categories: ["wines"] },
    { id: "liquor", label: "Liquor", categories: ["liquor"] },
    { id: "non-alcoholic", label: "Non-Alcoholic", categories: ["non-alcoholic", "hot-drinks"] },
  ],
};

// ─── Card Component ───────────────────────────────────────────────────────────
function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
          }}
        />
        {item.featured && (
          <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
            ★ Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-800 text-[15px] leading-snug flex-1">
            {item.name}
          </h3>
          <span className="text-amber-600 font-bold text-[15px] whitespace-nowrap">
            {item.price}
          </span>
        </div>
        <p className="mt-1.5 text-stone-500 text-[13px] leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage({ menuItems }: MenuPageProps) {
  const [search, setSearch] = useState("");
  const [activeMain, setActiveMain] = useState<MainCategoryId>("food");
  const [activeSub, setActiveSub] = useState("all-food");

  // When switching main category, reset sub to "all-*"
  const handleMainChange = (main: MainCategoryId) => {
    setActiveMain(main);
    setActiveSub(main === "food" ? "all-food" : "all-drinks");
    setSearch("");
  };

  const subCategories = SUB_CATEGORIES[activeMain];

  const currentSubCategories =
    subCategories.find((s) => s.id === activeSub)?.categories ?? [];

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return menuItems.filter((item) => {
      const inSub = currentSubCategories.includes(item.category);
      if (!inSub) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [menuItems, currentSubCategories, search]);

  // Group by raw category for display when "all" is active
  const isAllActive =
    activeSub === "all-food" || activeSub === "all-drinks";

  const categoryLabel: Record<string, string> = {
    soups: "Soups",
    appetizers: "Appetizers",
    sizzlers: "Sizzlers",
    salads: "Salads",
    mains: "Main Dishes",
    noodles: "Noodles & Pasta",
    breakfast: "Breakfast",
    desserts: "Desserts",
    cocktails: "Cocktails",
    shots: "Shots & Spirits",
    beers: "Beers",
    wines: "Wines",
    liquor: "Liquor",
    "non-alcoholic": "Non-Alcoholic",
    "hot-drinks": "Hot & Cold Drinks",
  };

  // Group items by category
  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of filteredItems) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    // Preserve the order of currentSubCategories
    const ordered = new Map<string, MenuItem[]>();
    for (const cat of currentSubCategories) {
      if (map.has(cat)) ordered.set(cat, map.get(cat)!);
    }
    return ordered;
  }, [filteredItems, currentSubCategories]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Hero / Header ── */}
      <div className="relative bg-stone-900 text-white py-16 px-4 text-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Our Menu
        </h1>
        <p className="relative text-stone-400 text-base md:text-lg max-w-md mx-auto">
          Fresh ingredients, bold flavors, unforgettable drinks.
        </p>

        {/* Search */}
        <div className="relative mt-8 max-w-md mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes or drinks…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition text-sm backdrop-blur-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Sticky Category Bar ── */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-stone-100">
        {/* Main tabs */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 pt-3">
            {MAIN_CATEGORIES.map((main) => (
              <button
                key={main.id}
                onClick={() => handleMainChange(main.id)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-t-lg transition-all duration-200 ${
                  activeMain === main.id
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                }`}
              >
                {main.label}
              </button>
            ))}
          </div>

          {/* Sub-category pills */}
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSub(sub.id);
                  setSearch("");
                }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 flex-shrink-0 ${
                  activeSub === sub.id
                    ? "bg-amber-400 text-amber-900 shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search results label */}
        {search && (
          <p className="text-stone-500 text-sm mb-6">
            {filteredItems.length === 0
              ? `No results for "${search}"`
              : `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} for "${search}"`}
          </p>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-24 text-stone-400">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-lg font-medium">Nothing found</p>
            <p className="text-sm mt-1">Try a different search or category.</p>
          </div>
        )}

        {/* Grouped sections */}
        {isAllActive || search ? (
          // Grouped by raw category
          Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat} className="mb-12">
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-3">
                <span>{categoryLabel[cat] ?? cat}</span>
                <span className="text-[13px] font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          // Single subcategory — flat grid, still grouped by raw cat
          Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat} className="mb-12">
              {/* Only show sub-header if the sub-cat spans multiple raw cats */}
              {subCategories.find((s) => s.id === activeSub)!.categories.length > 1 && (
                <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-3">
                  <span>{categoryLabel[cat] ?? cat}</span>
                  <span className="text-[13px] font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ── Footer note ── */}
      <div className="text-center text-stone-400 text-xs pb-10">
        Prices are in Philippine Peso (₱) and subject to change.
      </div>
    </div>
  );
}
