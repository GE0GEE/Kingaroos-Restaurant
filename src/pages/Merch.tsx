import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ChevronDown, ChevronUp, ExternalLink, Package, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import type { MerchItem } from "@/contexts/AdminContext";

/* Modal for viewing a merch item in detail */
function MerchModal({ item, onClose }: { item: MerchItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {(item as any).imageUrl && (
          <img
            src={(item as any).imageUrl}
            alt={item.name}
            className="w-full object-cover rounded-t-xl"
          />
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold text-brown-800">{item.name}</h2>
            {item.category && (
              <Badge className="bg-aussie-orange text-white font-body shrink-0">{item.category}</Badge>
            )}
          </div>
          {(item as any).price && (
            <p className="font-heading font-bold text-aussie-orange text-2xl">{(item as any).price}</p>
          )}
          {item.tagline && (
            <p className="font-body text-brown-600 leading-relaxed">{item.tagline}</p>
          )}
          {(item.sections ?? []).map((section) => (
            <div key={section.id} className="space-y-2 border-t border-sand-100 pt-4">
              <h3 className="font-body font-semibold text-brown-700">{section.title}</h3>
              {section.imageUrl && (
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="w-full object-cover rounded-lg border border-sand-200"
                />
              )}
              {section.description && (
                <p className="font-body text-sm text-brown-600 leading-relaxed">{section.description}</p>
              )}
              {section.link && (
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-aussie-orange hover:text-aussie-burnt-red transition-colors"
                >
                  {section.linkLabel || "Shop Now"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Merch() {
  const { siteContent, loading } = useAdmin();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);

  const merch: MerchItem[] = (siteContent as any).merch ?? [];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading merch...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const categories = ["All", ...Array.from(new Set(merch.map((m) => m.category).filter(Boolean)))];
  const filtered = activeCategory === "All" ? merch : merch.filter((m) => m.category === activeCategory);

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const isOpen = (itemId: string, sectionId: string, idx: number) => {
    const key = `${itemId}-${sectionId}`;
    return key in openSections ? openSections[key] : idx === 0;
  };

  return (
    <Layout>
      {/* Merch Detail Modal */}
      {selectedItem && (
        <MerchModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Hero */}
      <div className="relative bg-stone-900 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <p className="relative font-body text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
          Kingaroos Restaurant
        </p>
        <h1 className="relative font-heading text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
          Merch &amp; Shop
        </h1>
        <p className="relative font-body text-stone-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Take a piece of Kingaroos home — from our iconic Vegemite Beef Jerky to branded cups, mugs, cup holders &amp; more.
        </p>
      </div>

      {/* Category filter bar */}
      {categories.length > 1 && (
        <section className="bg-cream-100 border-b border-sand-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-aussie-orange text-white"
                    : "bg-white text-brown-700 border border-sand-300 hover:border-aussie-orange hover:text-aussie-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Merch grid */}
      <section className="py-16 px-4 bg-cream-50 min-h-[50vh]">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Package className="h-16 w-16 text-brown-300 mx-auto mb-4" />
              <p className="font-body text-brown-500 text-lg">No merch here yet — check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  {(item as any).imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={(item as any).imageUrl}
                        alt={item.name}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-sand-100 to-cream-200 px-5 pt-4 pb-4">
                    {item.category && (
                      <Badge className="bg-aussie-orange text-white font-body mb-2">{item.category}</Badge>
                    )}
                    <h2 className="font-heading text-xl font-bold text-brown-800 leading-tight">{item.name}</h2>
                    {(item as any).price && (
                      <p className="font-heading font-bold text-aussie-orange text-lg mt-1">{(item as any).price}</p>
                    )}
                    {item.tagline && (
                      <p className="font-body text-sm text-brown-600 mt-1 line-clamp-2">{item.tagline}</p>
                    )}
                    <p className="font-body text-xs text-brown-400 mt-2 group-hover:text-aussie-orange transition-colors">
                      Tap to view details →
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brown-800 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-4">Want to stock Kingaroos merch?</h2>
          <p className="font-body text-cream-200 text-lg mb-6">
            Reach out to us for wholesale or bulk orders — we'd love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block bg-aussie-orange hover:bg-aussie-burnt-red text-white font-body font-semibold px-8 py-3 rounded-md transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </Layout>
  );
}
