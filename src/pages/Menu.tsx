import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";
import { Heart } from "lucide-react";

export default function Menu() {
  const { siteContent, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading menu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const groupedItems = siteContent.menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof siteContent.menuItems>,
  );

  const sectionTitles = {
    starters: "Starters",
    mains: "Mains",
    desserts: "Desserts",
    drinks: "Drinks",
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-sand-200 to-brown-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            {siteContent.siteTexts.menuPageTitle}
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            {siteContent.siteTexts.menuPageSubtitle}
          </p>
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="bg-cream-100 py-8 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(sectionTitles).map(([key, title]) => (
              <a
                key={key}
                href={`#${key}`}
                className="font-body font-semibold text-brown-700 hover:text-aussie-orange transition-colors px-4 py-2 rounded-full hover:bg-sand-200"
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {Object.entries(sectionTitles).map(([category, title]) => {
            const items = groupedItems[category] || [];
            if (items.length === 0) return null;

            return (
              <div key={category} id={category} className="scroll-mt-32">
                <h2 className="font-heading text-4xl font-bold text-brown-800 text-center mb-12">
                  {title}
                </h2>
                <div className="grid gap-8">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className={`border-sand-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                        item.featured ? "ring-2 ring-aussie-orange" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Compact Image Section */}
                        <div className="flex-shrink-0">
                          <div className="w-full md:w-32 h-24 md:h-32">
                            {item.image && item.image !== "/placeholder.svg" ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-md border border-sand-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-sand-200 flex items-center justify-center rounded-md border border-sand-300">
                                <div className="text-center">
                                  <Heart className="h-6 w-6 text-brown-400 mx-auto" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="font-heading text-2xl font-bold text-brown-800">
                                  {item.name}
                                </h3>
                                {item.featured && (
                                  <Badge className="bg-aussie-orange text-white font-body text-xs">
                                    House Special
                                  </Badge>
                                )}
                              </div>
                              <p className="font-body text-brown-600 leading-relaxed text-lg">
                                {item.description}
                              </p>
                            </div>
                            <div className="ml-6 text-right">
                              <span className="font-heading text-2xl font-bold text-aussie-orange">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-aussie-orange py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            {siteContent.siteTexts.menuReadyToDineTitle}
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            {siteContent.siteTexts.menuReadyToDineText}
          </p>
          <div className="space-y-4">
            <p className="font-body text-cream-100">
              📞 {siteContent.siteTexts.menuCallText}{" "}
              <span className="font-semibold">{siteContent.siteTexts.homePhone}</span>
            </p>
            <p className="font-body text-cream-100">
              📍 {siteContent.siteTexts.menuAddressText}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
