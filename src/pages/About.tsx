import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Truck, Home } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export default function About() {
  const { siteContent, loading } = useAdmin();

  if (loading || !siteContent.aboutImages) { // Added guard for aboutImages
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading our story...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-brown-200 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            {siteContent.siteTexts.aboutTitle}
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            {siteContent.siteTexts.aboutSubtitle}
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <h2 className="font-heading text-4xl font-bold text-brown-800">
                {siteContent.siteTexts.aboutMeetFamilyTitle}
              </h2>
              <div className="space-y-4 font-body text-brown-600 leading-relaxed">
                <p>{siteContent.siteTexts.aboutStoryParagraph1}</p>
                <p>{siteContent.siteTexts.aboutStoryParagraph2}</p>
                <p>{siteContent.siteTexts.aboutStoryParagraph3}</p>
              </div>
            </div>

            {/* Family Photo */}
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-96 bg-sand-200 rounded-lg flex items-center justify-center">
                  {siteContent.aboutImages.familyPhoto &&
                  siteContent.aboutImages.familyPhoto !== "/placeholder.svg" ? (
                    <img
                      src={siteContent.aboutImages.familyPhoto}
                      alt="The King Family"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <Users className="h-16 w-16 text-aussie-orange mx-auto" />
                      <div className="space-y-2">
                        <p className="font-body text-brown-600 font-semibold">
                          The King Family
                        </p>
                        <p className="font-body text-brown-500 text-sm">
                          Sarah, David, and their three kids with rescue dog
                          Rusty
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            {siteContent.siteTexts.aboutJourneyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Food Truck Card */}
            <Card className="border-sand-200 shadow-lg text-center overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-orange-100 flex items-center justify-center">
                  {siteContent.aboutImages.originalFoodTruck && siteContent.aboutImages.originalFoodTruck !== "/placeholder.svg" ? (
                    <img src={siteContent.aboutImages.originalFoodTruck} alt="Original food truck" className="w-full h-full object-cover"/>
                  ) : (
                    <Truck className="h-16 w-16 text-aussie-orange" />
                  )}
                </div>
                <div className="p-8 bg-white">
                  <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                    {siteContent.siteTexts.aboutFoodTruckTitle}
                  </h3>
                  <p className="font-body text-brown-600 leading-relaxed">
                    {siteContent.siteTexts.aboutFoodTruckText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Rescue Partnership Card */}
            <Card className="border-sand-200 shadow-lg text-center overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-green-100 flex items-center justify-center">
                  {siteContent.aboutImages.firstRescueDog && siteContent.aboutImages.firstRescueDog !== "/placeholder.svg" ? (
                    <img src={siteContent.aboutImages.firstRescueDog} alt="First rescue dog partner" className="w-full h-full object-cover"/>
                  ) : (
                    <Heart className="h-16 w-16 text-aussie-eucalyptus" />
                  )}
                </div>
                <div className="p-8 bg-white">
                  <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                    {siteContent.siteTexts.aboutRescuePartnershipTitle}
                  </h3>
                  <p className="font-body text-brown-600 leading-relaxed">
                    {siteContent.siteTexts.aboutRescuePartnershipText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Restaurant Opens Card */}
            <Card className="border-sand-200 shadow-lg text-center overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-red-100 flex items-center justify-center">
                  {siteContent.aboutImages.restaurantOpensImage && siteContent.aboutImages.restaurantOpensImage !== "/placeholder.svg" ? (
                    <img src={siteContent.aboutImages.restaurantOpensImage} alt="Restaurant opens" className="w-full h-full object-cover"/>
                  ) : (
                    <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center">
                      <Home className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-8 bg-white">
                  <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                    {siteContent.siteTexts.aboutRestaurantOpensTitle}
                  </h3>
                  <p className="font-body text-brown-600 leading-relaxed">
                    {siteContent.siteTexts.aboutRestaurantOpensText}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-brown-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-8">
            {siteContent.siteTexts.aboutMissionTitle}
          </h2>
          <Card className="bg-cream-50 border-sand-200 shadow-xl">
            <CardContent className="p-12">
              <blockquote className="font-heading text-2xl text-brown-800 italic leading-relaxed">
                "{siteContent.siteTexts.aboutMissionQuote}"
              </blockquote>
              <div className="mt-6 text-center">
                <p className="font-body text-brown-600">
                  {siteContent.siteTexts.aboutMissionSignature}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-sand-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            {siteContent.siteTexts.aboutValuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                {siteContent.siteTexts.aboutCompassionTitle}
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                {siteContent.siteTexts.aboutCompassionText}
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                {siteContent.siteTexts.aboutCommunityTitle}
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                {siteContent.siteTexts.aboutCommunityText}
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                {siteContent.siteTexts.aboutQualityTitle}
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                {siteContent.siteTexts.aboutQualityText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
