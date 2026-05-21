import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Heart, Utensils, Gift, Star, Tag, Facebook } from "lucide-react";
import { KangarooLoader } from "@/components/KangarooLoader";
import { useAdmin, promotionCategories } from "@/contexts/AdminContext";
import { FacebookPostsSection } from "@/components/FacebookPostsSection";

const getPromotionIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("happy hour") || t.includes("early bird")) return Clock;
  if (t.includes("dog") || t.includes("rescue") || t.includes("pooch")) return Heart;
  if (t.includes("birthday") || t.includes("club") || t.includes("loyalty")) return Gift;
  if (t.includes("family") || t.includes("sunday") || t.includes("deal")) return Utensils;
  return Star;
};

export default function Promotions() {
  const { siteContent, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <KangarooLoader className="text-aussie-orange" text="Loading promotions..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
          {siteContent.siteTexts.promotionsTitle || "Promotions"}
        </h1>
        <p className="relative font-body text-stone-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          {siteContent.siteTexts.promotionsSubtitle || "Exclusive deals and offers for our valued guests."}
        </p>
      </div>

      {/* Tabbed content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="facebook" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-cream-100 border border-sand-200 h-auto p-1.5">
                <TabsTrigger
                  value="facebook"
                  className="font-body data-[state=active]:bg-[#1877F2] data-[state=active]:text-white px-5 py-2.5 gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  {siteContent.siteTexts.promotionsFacebookTabLabel || "Facebook Posts"}
                </TabsTrigger>
                <TabsTrigger
                  value="offers"
                  className="font-body data-[state=active]:bg-aussie-orange data-[state=active]:text-white px-5 py-2.5 gap-2"
                >
                  <Tag className="h-4 w-4" />
                  {siteContent.siteTexts.promotionsOffersTabLabel || "Current Offers"}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Current Offers Tab */}
            <TabsContent value="offers" className="mt-0">
              {siteContent.promotions.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="h-16 w-16 text-brown-400 mx-auto mb-4" />
                  <p className="font-body text-brown-600">{siteContent.siteTexts.promotionsNoOffersText}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {siteContent.promotions.map((promo) => {
                    const IconComponent = getPromotionIcon(promo.title);
                    const categoryKey = promo.category && promotionCategories[promo.category] ? promo.category : "general";
                    const categoryDetails = promotionCategories[categoryKey];
                    return (
                      <Card key={promo.id} className="border-sand-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className={`bg-gradient-to-r ${categoryDetails.colorClasses} p-6 text-white relative`}>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/20 text-white border-white/30 font-body text-xs">
                              {categoryDetails.badge}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-heading text-xl font-bold mb-1">{promo.title}</h3>
                              <p className="font-body text-white/90 text-sm">{promo.subtitle}</p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div className="text-center">
                            <p className="font-heading text-2xl font-bold text-aussie-orange mb-2">{promo.details}</p>
                            <p className="font-body text-brown-600 leading-relaxed">{promo.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Facebook Posts Tab */}
            <TabsContent value="facebook" className="mt-0">
              <FacebookPostsSection />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA section removed */}
    </Layout>
  );
}
