import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";

// ─── Category Config ──────────────────────────────────────────────────────────
const MAIN_CATEGORIES = [
  { id: "food",   label: "Food" },
  { id: "drinks", label: "Drinks" },
] as const;

type MainCategoryId = "food" | "drinks";

interface SubCategory {
  id: string;
  label: string;
  icon: string;
  categories: string[];
}

const SUB_CATEGORIES: Record<MainCategoryId, SubCategory[]> = {
  food: [
    { id: "all-food",   label: "All Food",   icon: "🍽️", categories: ["soups","appetizers","sizzlers","salads","mains","noodles","breakfast","desserts"] },
    { id: "soups",      label: "Soups",      icon: "🍲", categories: ["soups"] },
    { id: "appetizers", label: "Appetizers", icon: "🥗", categories: ["appetizers","sizzlers","salads"] },
    { id: "mains",      label: "Mains",      icon: "🍖", categories: ["mains","noodles","breakfast"] },
    { id: "desserts",   label: "Desserts",   icon: "🍨", categories: ["desserts"] },
  ],
  drinks: [
    { id: "all-drinks",    label: "All Drinks",     icon: "🍹", categories: ["cocktails","shots","beers","wines","liquor","non-alcoholic","hot-drinks"] },
    { id: "cocktails",     label: "Cocktails",      icon: "🍸", categories: ["cocktails"] },
    { id: "shots",         label: "Shots & Spirits",icon: "🥃", categories: ["shots"] },
    { id: "beers",         label: "Beers",          icon: "🍺", categories: ["beers"] },
    { id: "wines",         label: "Wines",          icon: "🍷", categories: ["wines"] },
    { id: "liquor",        label: "Liquor",         icon: "🫙", categories: ["liquor"] },
    { id: "non-alcoholic", label: "Non-Alcoholic",  icon: "🧃", categories: ["non-alcoholic","hot-drinks"] },
  ],
};

const CATEGORY_LABELS: Record<string, string> = {
  soups:           "Soups",
  appetizers:      "Appetizers",
  sizzlers:        "Sizzlers",
  salads:          "Salads",
  mains:           "Main Dishes",
  noodles:         "Noodles & Pasta",
  breakfast:       "Breakfast",
  desserts:        "Desserts",
  cocktails:       "Cocktails",
  shots:           "Shots & Spirits",
  beers:           "Beers",
  wines:           "Wines",
  liquor:          "Liquor",
  "non-alcoholic": "Non-Alcoholic Drinks",
  "hot-drinks":    "Hot & Cold Drinks",
};

// ─── Physical Menu Gallery ─────────────────────────────────────────────────────
function PhysicalMenuGallery() {
  const { siteContent } = useAdmin();
  const images = siteContent.physicalMenuImages ?? [];
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="bg-stone-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-2">
            Peruse at Your Leisure
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Curated Menus
          </h2>
          <p className="mt-3 text-stone-400 max-w-lg mx-auto text-sm leading-relaxed">
            Prefer to browse in the traditional manner? Every page of our handcrafted menu is presented here — a full portrait of each culinary delight we have to offer.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.url)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <img
                src={img.url}
                alt={img.caption || "Menu page"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium">{img.caption || "Tap to enlarge"}</span>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/60 hover:text-white text-4xl font-thin" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Menu enlarged" className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// ─── Menu Item Card ───────────────────────────────────────────────────────────
interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  image: string;
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100">
      <div className="relative h-44 overflow-hidden bg-stone-100">
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
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-800 text-[15px] leading-snug flex-1">{item.name}</h3>
          <span className="text-amber-600 font-bold text-[15px] whitespace-nowrap">{item.price}</span>
        </div>
        <p className="mt-1.5 text-stone-500 text-[13px] leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const { siteContent } = useAdmin();
  const menuItems: MenuItem[] = (siteContent.menuItems ?? []) as MenuItem[];

  const [search, setSearch]     = useState("");
  const [activeMain, setActiveMain] = useState<MainCategoryId>("food");
  const [activeSub, setActiveSub]   = useState("all-food");

  const handleMainChange = (main: MainCategoryId) => {
    setActiveMain(main);
    setActiveSub(main === "food" ? "all-food" : "all-drinks");
    setSearch("");
  };

  const subCategories        = SUB_CATEGORIES[activeMain];
  const currentSubCats       = subCategories.find((s) => s.id === activeSub)?.categories ?? [];
  const spansMultiple        = (subCategories.find((s) => s.id === activeSub)?.categories.length ?? 1) > 1;
  const isAllActive          = activeSub === "all-food" || activeSub === "all-drinks";

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return menuItems.filter((item) => {
      if (!currentSubCats.includes(item.category)) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });
  }, [menuItems, currentSubCats, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of filteredItems) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    const ordered = new Map<string, MenuItem[]>();
    for (const cat of currentSubCats) {
      if (map.has(cat)) ordered.set(cat, map.get(cat)!);
    }
    return ordered;
  }, [filteredItems, currentSubCats]);

  const showSectionHeaders = isAllActive || spansMultiple || !!search;

  return (
    <Layout>
      {/* ── Hero ── */}
      <div className="relative bg-stone-900 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <p className="relative text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
          Kingaroos Restaurant
        </p>
        <h1 className="relative font-heading text-4xl md:text-6xl font-extrabold tracking-tight mb-3">Our Menu</h1>
        <p className="relative text-stone-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Every dish crafted with care. Every sip worth savouring.
        </p>

        {/* Search */}
        <div className="relative mt-10 max-w-lg mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes, drinks, ingredients…"
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15 transition text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition text-lg leading-none">✕</button>
          )}
        </div>
      </div>

      {/* ── Physical Menu Gallery ── */}
      <PhysicalMenuGallery />

      {/* ── Sticky Category Bar ── */}
      <div className="sticky top-0 z-20 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 pt-3 border-b border-stone-100">
            {MAIN_CATEGORIES.map((main) => (
              <button
                key={main.id}
                onClick={() => handleMainChange(main.id)}
                className={`px-6 py-2.5 text-sm font-bold tracking-wide rounded-t-lg transition-all duration-200 ${
                  activeMain === main.id
                    ? "bg-stone-900 text-white"
                    : "text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                }`}
              >
                {main.id === "food" ? "🍽️ " : "🍹 "}{main.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => { setActiveSub(sub.id); setSearch(""); }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 flex-shrink-0 ${
                  activeSub === sub.id
                    ? "bg-amber-400 text-amber-900 ring-1 ring-amber-300"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
                }`}
              >
                {sub.icon} {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-[40vh]">
        {search && (
          <p className="text-stone-400 text-sm mb-8">
            {filteredItems.length === 0
              ? `No results for "${search}" in this category.`
              : `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} for "${search}"`}
          </p>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-28 text-stone-400">
            <div className="text-6xl mb-4">{search ? "🔍" : "🍽️"}</div>
            <p className="text-lg font-semibold text-stone-600">
              {search ? "Nothing matched your search." : "No items in this category yet."}
            </p>
            <p className="text-sm mt-1">{search ? "Try a different term or browse by category." : "Check back soon!"}</p>
          </div>
        )}

        {Array.from(grouped.entries()).map(([cat, items]) => (
          <section key={cat} className="mb-14">
            {showSectionHeaders && (
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-heading text-xl font-extrabold text-stone-800 tracking-tight">
                  {CATEGORY_LABELS[cat] ?? cat}
                </h2>
                <span className="text-[12px] font-semibold text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full">
                  {items.length}
                </span>
                <div className="flex-1 h-px bg-stone-100" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </section>
        ))}
      </div>

      <div className="text-center text-stone-400 text-xs pb-10 pt-4 border-t border-stone-100">
        All prices are in Philippine Peso (₱) and subject to change without prior notice.
      </div>
    </Layout>
  );
}
