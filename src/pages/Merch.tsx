import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ChevronDown, ChevronUp, ExternalLink, Package } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import type { MerchItem } from "@/contexts/AdminContext";

export default function Merch() {
  const { siteContent, loading } = useAdmin();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("All");

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
      {/* Hero */}
      <section className="bg-gradient-to-r from-aussie-orange/20 to-brown-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="h-10 w-10 text-aussie-orange" />
            <h1 className="font-heading text-5xl font-bold text-brown-800">
              Merch &amp; Shop
            </h1>
          </div>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            Take a piece of Kingaroos home — from our iconic Vegemite Beef Jerky to
            branded cups, mugs, cup holders &amp; more.
          </p>
        </div>
      </section>

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
              <p className="font-body text-brown-500 text-lg">
                No merch here yet — check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-sand-100 to-cream-200 px-5 pt-5 pb-4">
                    {item.category && (
                      <Badge className="bg-aussie-orange text-white font-body mb-2">
                        {item.category}
                      </Badge>
                    )}
                    <h2 className="font-heading text-xl font-bold text-brown-800 leading-tight">
                      {item.name}
                    </h2>
                    {item.tagline && (
                      <p className="font-body text-sm text-brown-600 mt-1">{item.tagline}</p>
                    )}
                  </div>

                  {/* Sections */}
                  <CardContent className="p-0 divide-y divide-sand-100">
                    {(item.sections ?? []).map((section, idx) => {
                      const key = `${item.id}-${section.id}`;
                      const open = isOpen(item.id, section.id, idx);
                      return (
                        <div key={section.id}>
                          <button
                            onClick={() => toggleSection(key)}
                            className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-cream-100 transition-colors"
                          >
                            <span className="font-body font-semibold text-brown-700 text-sm">
                              {section.title}
                            </span>
                            {open ? (
                              <ChevronUp className="h-4 w-4 text-brown-400 shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-brown-400 shrink-0" />
                            )}
                          </button>

                          {open && (
                            <div className="px-5 pb-5 space-y-3">
                              {section.imageUrl && (
                                <img
                                  src={section.imageUrl}
                                  alt={section.title}
                                  className="w-full h-44 object-cover rounded-lg border border-sand-200"
                                />
                              )}
                              {section.description && (
                                <p className="font-body text-sm text-brown-600 leading-relaxed">
                                  {section.description}
                                </p>
                              )}
                              {section.price && (
                                <p className="font-heading font-bold text-aussie-orange text-lg">
                                  {section.price}
                                </p>
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
                          )}
                        </div>
                      );
                    })}

                    {(item.sections ?? []).length === 0 && (
                      <div className="px-5 py-6 text-center text-brown-400 font-body text-sm">
                        Details coming soon!
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brown-800 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-4">
            Want to stock Kingaroos merch?
          </h2>
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
