import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Utensils, Gift, Calendar, Star } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const getPromotionIcon = (title: string) => {
  if (
    title.toLowerCase().includes("happy hour") ||
    title.toLowerCase().includes("early bird")
  ) {
    return Clock;
  }
  if (
    title.toLowerCase().includes("dog") ||
    title.toLowerCase().includes("rescue") ||
    title.toLowerCase().includes("pooch")
  ) {
    return Heart;
  }
  if (
    title.toLowerCase().includes("birthday") ||
    title.toLowerCase().includes("club")
  ) {
    return Gift;
  }
  if (
    title.toLowerCase().includes("family") ||
    title.toLowerCase().includes("sunday")
  ) {
    return Utensils;
  }
  return Star;
};

export default function Promotions() {
  const { siteContent, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Gift className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading promotions...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-orange/20 to-aussie-burnt-red/20 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            {siteContent.siteTexts.promotionsTitle}
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            {siteContent.siteTexts.promotionsSubtitle}
          </p>
        </div>
      </section>

      {/* Main Promotions Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {siteContent.promotions.length === 0 ? (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 text-brown-400 mx-auto mb-4" />
              <p className="font-body text-brown-600">
                No promotions available at the moment. Check back soon for great
                deals!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteContent.promotions.map((promo) => {
                const IconComponent = getPromotionIcon(promo.title);
                return (
                  <Card
                    key={promo.id}
                    className="border-sand-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`bg-gradient-to-r ${promo.color} p-6 text-white relative`}
                    >
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 text-white border-white/30 font-body text-xs">
                          {promo.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold mb-1">
                            {promo.title}
                          </h3>
                          <p className="font-body text-white/90 text-sm">
                            {promo.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="text-center">
                        <p className="font-heading text-2xl font-bold text-aussie-orange mb-2">
                          {promo.details}
                        </p>
                        <p className="font-body text-brown-600 leading-relaxed">
                          {promo.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-12 bg-sand-100">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-heading text-2xl font-bold text-center text-brown-800 mb-8">
            Terms & Conditions
          </h3>
          <Card className="border-sand-200 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-brown-600 text-sm">
                <div className="space-y-2">
                  <p>• Promotions cannot be combined with other offers</p>
                  <p>• Dog discount requires well-behaved, leashed pets</p>
                  <p>• Happy hour applies to alcoholic beverages only</p>
                  <p>• Kids eat free applies to children 12 and under</p>
                </div>
                <div className="space-y-2">
                  <p>• Birthday club requires valid ID on visit</p>
                  <p>• Early bird special excludes weekends and holidays</p>
                  <p>• Seasonal promotions subject to availability</p>
                  <p>• Management reserves the right to modify promotions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-aussie-orange to-aussie-burnt-red py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">
            Ready to Save & Make a Difference?
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            Visit us today to take advantage of these great deals while helping
            rescue dogs find their forever homes. Every meal matters!
          </p>
          <div className="space-y-4 text-cream-100">
            <p className="font-body text-lg">
              📞 Call ahead for reservations:{" "}
              <span className="font-semibold">(02) 1234 5678</span>
            </p>
            <p className="font-body">📍 123 Outback Lane, Sydney, NSW 2000</p>
            <p className="font-body text-sm">
              Follow us on social media for flash sales and surprise promotions!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
