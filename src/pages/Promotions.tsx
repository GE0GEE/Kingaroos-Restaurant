import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Utensils, Gift, Star } from "lucide-react";
import { useAdmin, promotionCategories } from "@/contexts/AdminContext";

const getPromotionIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (
    lowerTitle.includes("happy hour") ||
    lowerTitle.includes("early bird")
  ) {
    return Clock;
  }
  if (
    lowerTitle.includes("dog") ||
    lowerTitle.includes("rescue") ||
    lowerTitle.includes("pooch")
  ) {
    return Heart;
  }
  if (
    lowerTitle.includes("birthday") ||
    lowerTitle.includes("club") ||
    lowerTitle.includes("loyalty")
  ) {
    return Gift;
  }
  if (
    lowerTitle.includes("family") ||
    lowerTitle.includes("sunday") ||
    lowerTitle.includes("deal")
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
                {siteContent.siteTexts.promotionsNoOffersText}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteContent.promotions.map((promo) => {
                const IconComponent = getPromotionIcon(promo.title);
                const categoryKey = promo.category && promotionCategories[promo.category] ? promo.category : 'general';
                const categoryDetails = promotionCategories[categoryKey];
                
                return (
                  <Card
                    key={promo.id}
                    className="border-sand-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`bg-gradient-to-r ${categoryDetails.colorClasses} p-6 text-white relative`}
                    >
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

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-aussie-orange to-aussie-burnt-red py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">
            {siteContent.siteTexts.promotionsReadyToSaveTitle}
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            {siteContent.siteTexts.promotionsReadyToSaveText}
          </p>
          <div className="space-y-6 text-cream-100">
            <p className="font-body text-lg">
              📞 {siteContent.siteTexts.promotionsCallAheadText}
            </p>
            <p className="font-body">📍 {siteContent.siteTexts.promotionsAddressText}</p>
            <p className="font-body text-sm">
              {siteContent.siteTexts.promotionsFollowText}
            </p>
            <div className="flex justify-center space-x-4 pt-2">
              <button
                onClick={() =>
                  (window.location.href = `tel:${siteContent.siteTexts.homePhone}`)
                }
                className="bg-white text-aussie-orange hover:bg-cream-100 px-6 py-3 rounded-md font-semibold transition-colors duration-200"
              >
                Call Now
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(siteContent.siteTexts.homeAddress)}`,
                    "_blank",
                  )
                }
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold transition-colors duration-200"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
