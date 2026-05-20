import { useState, useMemo, useEffect } from "react";
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

// ─── Menu Style Toggle ─────────────────────────────────────────────────────────
type MenuStyle = "digital" | "classic";

// ─── Physical Menu Flipbook (3D page-turn) ─────────────────────────────────────
function PhysicalMenuGallery() {
  const { siteContent } = useAdmin();
  const images = siteContent.physicalMenuImages ?? [];
  const totalPages = images.length + 1; // +1 for cover
  const [flippedPages, setFlippedPages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  if (images.length === 0) return (
    <div className="text-center py-20 text-stone-400">
      <p className="text-lg">No physical menu pages uploaded yet.</p>
      <p className="text-sm mt-1">Ask the admin to upload menu photos.</p>
    </div>
  );

  const currentVisiblePage = flippedPages.size;

  const flipNext = () => {
    if (currentVisiblePage >= totalPages) return;
    setFlippedPages((prev) => new Set([...prev, currentVisiblePage]));
  };

  const flipPrev = () => {
    if (currentVisiblePage <= 0) return;
    setFlippedPages((prev) => {
      const next = new Set(prev);
      next.delete(currentVisiblePage - 1);
      return next;
    });
  };

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) flipNext();
    if (diff < -50) flipPrev();
    setTouchStart(null);
  };

  return (
    <div className="py-8 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Book wrapper — responsive sizing */}
          <div
            className="relative select-none w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px]"
            style={{ aspectRatio: "3/4", perspective: "1800px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Book shadow */}
            <div className="absolute inset-0 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />

            {/* Pages */}
            {Array.from({ length: totalPages }, (_, i) => totalPages - 1 - i).map((pageIndex) => {
              const isFlipped = flippedPages.has(pageIndex);
              const isCover = pageIndex === 0;
              const imageIndex = pageIndex - 1;

              return (
                <div
                  key={pageIndex}
                  className="absolute inset-0 rounded-lg cursor-pointer"
                  style={{
                    transformOrigin: "left center",
                    transition: "transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                    transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                    zIndex: isFlipped ? pageIndex : totalPages - pageIndex,
                  }}
                  onClick={() => {
                    if (!isFlipped) {
                      setFlippedPages((prev) => new Set([...prev, pageIndex]));
                    } else {
                      setFlippedPages((prev) => {
                        const next = new Set(prev);
                        next.delete(pageIndex);
                        return next;
                      });
                    }
                  }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden border border-amber-900/20"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {isCover ? (
                      <div className="w-full h-full bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-6 sm:p-8 relative">
                        <div className="absolute inset-2 sm:inset-3 border-2 border-amber-400/30 rounded-lg pointer-events-none" />
                        <div className="absolute inset-4 sm:inset-5 border border-amber-400/15 rounded-lg pointer-events-none" />
                        <div className="text-center space-y-3 sm:space-y-4 relative z-10">
                          <div className="text-4xl sm:text-5xl mb-2">🦘</div>
                          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-400 tracking-tight">
                            Kingaroos
                          </h2>
                          <p className="text-amber-200/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
                            Menu
                          </p>
                          <div className="w-12 sm:w-16 h-px bg-amber-400/40 mx-auto my-3 sm:my-4" />
                          <p className="text-stone-400 text-[11px] sm:text-xs italic">Seaview Resto Bar</p>
                        </div>
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-l-2 border-amber-400/40 rounded-tl" />
                        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-r-2 border-amber-400/40 rounded-tr" />
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-l-2 border-amber-400/40 rounded-bl" />
                        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-r-2 border-amber-400/40 rounded-br" />
                        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-400/60 text-[11px] sm:text-xs font-medium">
                          <span>Tap to open</span>
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white relative">
                        <img
                          src={images[imageIndex]?.url}
                          alt={images[imageIndex]?.caption || `Menu page ${imageIndex + 1}`}
                          className="w-full h-full object-contain bg-stone-50"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full">
                          {imageIndex + 1} / {images.length}
                        </div>
                        {images[imageIndex]?.caption && (
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full max-w-[80%] truncate">
                            {images[imageIndex].caption}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Back face */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <button
              onClick={flipPrev}
              disabled={currentVisiblePage <= 0}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-white transition-all disabled:opacity-30"
              aria-label="Previous page"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center max-w-[200px] sm:max-w-[300px]">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const newFlipped = new Set<number>();
                    for (let j = 0; j < i; j++) newFlipped.add(j);
                    setFlippedPages(newFlipped);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                    currentVisiblePage === i ? "bg-amber-400 scale-150" : "bg-stone-500 hover:bg-stone-400"
                  }`}
                  aria-label={i === 0 ? "Cover" : `Page ${i}`}
                />
              ))}
            </div>

            <button
              onClick={flipNext}
              disabled={currentVisiblePage >= totalPages}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-white transition-all disabled:opacity-30"
              aria-label="Next page"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          <p className="text-stone-500 text-[10px] sm:text-[11px] mt-2 sm:mt-3">
            <span className="hidden sm:inline">Click pages to flip · Use ← → keys · </span>
            <span className="sm:hidden">Tap or swipe to flip · </span>
            Page {currentVisiblePage + 1} of {totalPages}
          </p>
        </div>
      </div>
    </div>
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
    <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100">
      <div className="relative h-32 sm:h-44 overflow-hidden bg-stone-100">
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
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-400 text-amber-900 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow">
            ★ Featured
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-800 text-[13px] sm:text-[15px] leading-snug flex-1">{item.name}</h3>
          <span className="text-amber-600 font-bold text-[13px] sm:text-[15px] whitespace-nowrap">{item.price}</span>
        </div>
        <p className="mt-1 sm:mt-1.5 text-stone-500 text-[11px] sm:text-[13px] leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const { siteContent } = useAdmin();
  const menuItems: MenuItem[] = (siteContent.menuItems ?? []) as MenuItem[];
  const hasPhysicalMenu = (siteContent.physicalMenuImages ?? []).length > 0;

  const [search, setSearch] = useState("");
  const [activeMain, setActiveMain] = useState<MainCategoryId>("food");
  const [activeSub, setActiveSub] = useState("all-food");
  const [menuStyle, setMenuStyle] = useState<MenuStyle>("digital");

  const handleMainChange = (main: MainCategoryId) => {
    setActiveMain(main);
    setActiveSub(main === "food" ? "all-food" : "all-drinks");
    setSearch("");
  };

  const subCategories = SUB_CATEGORIES[activeMain];
  const currentSubCats = subCategories.find((s) => s.id === activeSub)?.categories ?? [];
  const spansMultiple = (subCategories.find((s) => s.id === activeSub)?.categories.length ?? 1) > 1;
  const isAllActive = activeSub === "all-food" || activeSub === "all-drinks";

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
      <div className="relative bg-stone-900 text-white py-12 sm:py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <p className="relative text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-3">
          Kingaroos Restaurant
        </p>
        <h1 className="relative font-heading text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3">Our Menu</h1>
        <p className="relative text-stone-400 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Every dish crafted with care. Every sip worth savouring.
        </p>

        {/* Search */}
        <div className="relative mt-6 sm:mt-10 max-w-lg mx-auto">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes, drinks…"
            className="w-full pl-9 sm:pl-11 pr-9 sm:pr-10 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15 transition text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition text-lg leading-none">✕</button>
          )}
        </div>

        {/* Menu Style Toggle — only show if physical menu exists */}
        {hasPhysicalMenu && (
          <div className="relative mt-6 sm:mt-8 flex justify-center">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/10">
              <button
                onClick={() => setMenuStyle("digital")}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  menuStyle === "digital"
                    ? "bg-amber-400 text-amber-900 shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                🖥️ Digital Menu
              </button>
              <button
                onClick={() => setMenuStyle("classic")}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  menuStyle === "classic"
                    ? "bg-amber-400 text-amber-900 shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                📖 Classic Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Classic Menu (Flipbook) ── */}
      {menuStyle === "classic" && hasPhysicalMenu && (
        <div className="bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
          <PhysicalMenuGallery />
        </div>
      )}

      {/* ── Digital Menu ── */}
      {menuStyle === "digital" && (
        <>
          {/* Sticky Category Bar */}
          <div className="sticky top-0 z-20 bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-3 sm:px-4">
              <div className="flex gap-0.5 sm:gap-1 pt-2 sm:pt-3 border-b border-stone-100">
                {MAIN_CATEGORIES.map((main) => (
                  <button
                    key={main.id}
                    onClick={() => handleMainChange(main.id)}
                    className={`px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wide rounded-t-lg transition-all duration-200 ${
                      activeMain === main.id
                        ? "bg-stone-900 text-white"
                        : "text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {main.id === "food" ? "🍽️ " : "🍹 "}{main.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 sm:gap-2 py-2 sm:py-3 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => { setActiveSub(sub.id); setSearch(""); }}
                    className={`whitespace-nowrap px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[13px] font-semibold transition-all duration-200 flex-shrink-0 ${
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

          {/* Content */}
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10 min-h-[40vh]">
            {search && (
              <p className="text-stone-400 text-xs sm:text-sm mb-4 sm:mb-8">
                {filteredItems.length === 0
                  ? `No results for "${search}" in this category.`
                  : `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} for "${search}"`}
              </p>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-16 sm:py-28 text-stone-400">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{search ? "🔍" : "🍽️"}</div>
                <p className="text-base sm:text-lg font-semibold text-stone-600">
                  {search ? "Nothing matched your search." : "No items in this category yet."}
                </p>
                <p className="text-xs sm:text-sm mt-1">{search ? "Try a different term or browse by category." : "Check back soon!"}</p>
              </div>
            )}

            {Array.from(grouped.entries()).map(([cat, items]) => (
              <section key={cat} className="mb-8 sm:mb-14">
                {showSectionHeaders && (
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                    <h2 className="font-heading text-base sm:text-xl font-extrabold text-stone-800 tracking-tight">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </h2>
                    <span className="text-[10px] sm:text-[12px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
                  {items.map((item) => <MenuCard key={item.id} item={item} />)}
                </div>
              </section>
            ))}
          </div>

          <div className="text-center text-stone-400 text-[10px] sm:text-xs pb-6 sm:pb-10 pt-3 sm:pt-4 border-t border-stone-100">
            All prices are in Philippine Peso (₱) and subject to change without prior notice.
          </div>
        </>
      )}
    </Layout>
  );
}
