import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, UtensilsCrossed, MapPin, Clock, Star, Music, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";
import { KangarooLoader } from "@/components/KangarooLoader";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";

export default function Home() {
  const { siteContent, loading } = useAdmin();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (siteContent?.heroImages && siteContent.heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === siteContent.heroImages.length - 1 ? 0 : prevIndex + 1,
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [siteContent?.heroImages]);

  if (loading || !siteContent) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <KangarooLoader className="text-aussie-orange" text="Loading KINGAROOS..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {(siteContent.heroImages ?? []).map((image, index) => (
          <div
            key={image?.url || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-sand-200"
              style={{
                backgroundImage: `url(${image?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {siteContent.siteTexts?.homeTitle ?? "Welcome to Kingaroo's"}
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 animate-fade-in delay-150">
            {siteContent.siteTexts?.homeSubtitle ?? "Seaview Resto Bar — Australian soul, Filipino heart."}
          </p>
          <div className="space-x-4 animate-fade-in delay-300">
            <Button
              size="lg"
              className="bg-aussie-orange hover:bg-aussie-burnt-red text-white font-body font-semibold"
              onClick={() => navigate("/menu")}
            >
              {siteContent.siteTexts?.homeViewMenuButton ?? "View Menu"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-black/30 hover:bg-white hover:text-brown-800 font-body font-semibold"
              onClick={() => navigate("/about")}
            >
              {siteContent.siteTexts?.homeLearnMoreButton ?? "Our Story"}
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {(siteContent.heroImages ?? []).map((_, index) => (
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
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="font-body text-aussie-orange text-sm font-bold uppercase tracking-[0.2em]">Welcome to the family</p>
            <h2 className="font-heading text-4xl font-bold text-brown-800">
              {siteContent.siteTexts?.welcomeTitle ?? "G'day from Kingaroo's!"}
            </h2>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              {siteContent.siteTexts?.welcomeText1 ?? "Kingaroo's Seaview Resto Bar is your home away from home in Bacong, Negros Oriental. We bring the bold, laid-back spirit of Australia together with the warmth of Filipino hospitality — all while overlooking the stunning Tañon Strait."}
            </p>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              {siteContent.siteTexts?.welcomeText2 ?? "Whether you're here for an ice-cold beer at sunset, a hearty Aussie-inspired meal, or to hang out with your fur babies on our dog-friendly patio, there's always a seat and a smile waiting for you at Kingaroo's."}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-aussie-orange" />
                <span className="font-body text-sm text-brown-600 font-medium">Seaview Dining</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-aussie-orange" />
                <span className="font-body text-sm text-brown-600 font-medium">Dog Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-aussie-orange" />
                <span className="font-body text-sm text-brown-600 font-medium">Live Events</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src={siteContent.welcomeImages?.[0]?.url ?? "/placeholder.svg"}
                  alt={siteContent.welcomeImages?.[0]?.alt ?? "Happy customers with dogs"}
                  className="w-full h-40 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                  {siteContent.siteTexts?.welcomeImage1Caption ?? "Enjoying cold drinks with a seaview sunset"}
                </p>
              </CardContent>
            </Card>
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src={siteContent.welcomeImages?.[1]?.url ?? "/placeholder.svg"}
                  alt={siteContent.welcomeImages?.[1]?.alt ?? "Delicious food"}
                  className="w-full h-40 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                  {siteContent.siteTexts?.welcomeImage2Caption ?? "Fresh, Aussie-inspired dishes made with local ingredients"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Highlights */}
      <section className="py-20 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-body text-aussie-orange text-sm font-bold uppercase tracking-[0.2em] text-center mb-3">Why Kingaroo's?</p>
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            {siteContent.siteTexts?.homeHighlightsTitle ?? "What Makes Us Special"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts?.dogFriendlyTitle ?? "Dog Friendly"}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts?.dogFriendlyText ?? "Bring your fur babies! Our seaview patio welcomes dogs of all sizes with fresh water bowls and plenty of love. We're passionate about dog rescue too."}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto mb-6">
                  <UtensilsCrossed className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts?.aussieFoodTitle ?? "Aussie-Inspired Food"}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts?.aussieFoodText ?? "From our signature Vegemite Beef Jerky to hearty burgers and refreshing drinks, we blend Australian flavours with fresh Filipino ingredients for a menu like no other."}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts?.rescueHelpTitle ?? "Supporting Rescues"}
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  {siteContent.siteTexts?.rescueHelpText ?? "Every meal you enjoy helps rescue dogs in need. We partner with local shelters to provide food, medical care, and find forever homes for strays."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats / Trust Section */}
      <section className="py-14 bg-brown-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-3xl md:text-4xl font-bold text-aussie-orange">{siteContent.siteTexts?.statDogs ?? "50+"}</p>
              <p className="font-body text-cream-200 text-sm mt-1">{siteContent.siteTexts?.statDogsLabel ?? "Dogs Rescued"}</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-bold text-aussie-orange">{siteContent.siteTexts?.statYears ?? "2+"}</p>
              <p className="font-body text-cream-200 text-sm mt-1">{siteContent.siteTexts?.statYearsLabel ?? "Years Serving"}</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-bold text-aussie-orange">{siteContent.siteTexts?.statRating ?? "4.3"}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-4 w-4 text-cream-200 fill-cream-200" />
                <p className="font-body text-cream-200 text-sm">{siteContent.siteTexts?.statRatingLabel ?? "Google Rating"}</p>
              </div>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-bold text-aussie-orange">{siteContent.siteTexts?.statMenuItems ?? "30+"}</p>
              <p className="font-body text-cream-200 text-sm mt-1">{siteContent.siteTexts?.statMenuItemsLabel ?? "Menu Items"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews & Popular Times */}
      <GoogleReviewsSection />

      {/* Hours & Location */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-aussie-orange text-sm font-bold uppercase tracking-[0.2em] text-center mb-3">Visit Us</p>
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">{siteContent.siteTexts?.homeVisitTitle ?? "Come Say G'day!"}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Clock className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">{siteContent.siteTexts?.homeHoursTitle ?? "Our Hours"}</h3>
                  </div>
                  <div className="space-y-4 font-body text-brown-600">
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Monday - Thursday</span>
                      <span className="font-semibold text-brown-800">{siteContent.siteTexts?.hoursWeekday ?? "11am - 9pm"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Friday - Saturday</span>
                      <span className="font-semibold text-brown-800">{siteContent.siteTexts?.hoursWeekend ?? "11am - 10pm"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Sunday</span>
                      <span className="font-semibold text-brown-800">{siteContent.siteTexts?.hoursSunday ?? "10am - 8pm"}</span>
                    </div>
                    <p className="text-sm text-aussie-orange pt-2">Kitchen closes 30 minutes before closing time</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <MapPin className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">{siteContent.siteTexts?.homeLocationTitle ?? "Our Location"}</h3>
                  </div>
                  <div className="space-y-3 font-body text-brown-600">
                    <p className="font-semibold text-lg text-brown-800">{siteContent.siteTexts?.homeAddress ?? "Number 2 Larena Street North Poblacion Bacong Negros Oriental, Philippines, 6216"}</p>
                    <p className="text-aussie-orange font-semibold">{siteContent.siteTexts?.homePhone ?? "0915 994 6696"}</p>
                    <p className="text-aussie-orange">{siteContent.siteTexts?.homeEmail ?? "kingnegros@hotmail.com"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full min-h-[400px]">
                  <iframe
                    key={siteContent.siteTexts?.googleMapsUrl}
                    src={siteContent.siteTexts?.googleMapsUrl}
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
