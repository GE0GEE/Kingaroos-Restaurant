

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, UtensilsCrossed, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";

export default function Home() {
  const { siteContent, loading } = useAdmin();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (siteContent.heroImages && siteContent.heroImages.length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === siteContent.heroImages.length - 1 ? 0 : prevIndex + 1,
          );
        }, 5000);

        return () => clearInterval(interval);
    }
  }, [siteContent.heroImages]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading KINGAROOS...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Banner with Rotating Background Images */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {siteContent.heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image Placeholder */}
            <div
              className="absolute inset-0 bg-sand-200"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Balanced Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {siteContent.siteTexts.homeTitle}
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 animate-fade-in delay-150">
            {siteContent.siteTexts.homeSubtitle}
          </p>
          <div className="space-x-4 animate-fade-in delay-300">
            <Button
              size="lg"
              className="bg-aussie-orange hover:bg-aussie-burnt-red text-white font-body font-semibold"
              onClick={() => navigate("/menu")}
            >
              {siteContent.siteTexts.homeViewMenuButton}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brown-800 font-body font-semibold"
              onClick={() => navigate("/about")}
            >
              {siteContent.siteTexts.homeLearnMoreButton}
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {siteContent.heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-brown-800">
              {siteContent.siteTexts.welcomeTitle}
            </h2>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              {siteContent.siteTexts.welcomeText1}
            </p>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              {siteContent.siteTexts.welcomeText2}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src={siteContent.welcomeImages[0]?.url || "/placeholder.svg"}
                  alt={siteContent.welcomeImages[0]?.alt || "Happy customers with dogs"}
                  className="w-full h-32 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                  {siteContent.siteTexts.welcomeImage1Caption}
                </p>
              </CardContent>
            </Card>
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src={siteContent.welcomeImages[1]?.url || "/placeholder.svg"}
                  alt={siteContent.welcomeImages[1]?.alt || "Delicious food"}
                  className="w-full h-32 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                   {siteContent.siteTexts.welcomeImage2Caption}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Highlights */}
      <section className="py-16 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            {siteContent.siteTexts.homeHighlightsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.dogFriendlyTitle}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts.dogFriendlyText}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto mb-6">
                  <UtensilsCrossed className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.aussieFoodTitle}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts.aussieFoodText}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.rescueHelpTitle}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts.rescueHelpText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            {siteContent.siteTexts.homeVisitTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hours & Contact */}
            <div className="space-y-8">
              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Clock className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">
                      {siteContent.siteTexts.homeHoursTitle}
                    </h3>
                  </div>
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span className="font-semibold">{siteContent.siteTexts.hoursWeekday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span className="font-semibold">{siteContent.siteTexts.hoursWeekend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">{siteContent.siteTexts.hoursSunday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <MapPin className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">
                      {siteContent.siteTexts.homeLocationTitle}
                    </h3>
                  </div>
                  <div className="space-y-2 font-body text-brown-600">
                    <p className="font-semibold">
                      {siteContent.siteTexts.homeAddress}
                    </p>
                    <p className="text-aussie-orange font-semibold">
                      {siteContent.siteTexts.homePhone}
                    </p>
                    <p className="text-aussie-orange">
                      {siteContent.siteTexts.homeEmail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full min-h-[400px]">
                  <iframe
                    src={siteContent.siteTexts.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="KINGAROOS Restaurant Location Map"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
