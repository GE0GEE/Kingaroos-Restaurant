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
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">{siteContent.siteTexts?.homeTitle}</h1>
          <p className="font-body text-xl md:text-2xl mb-8">{siteContent.siteTexts?.homeSubtitle}</p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/menu")}>{siteContent.siteTexts?.homeViewMenuButton}</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/about")}>{siteContent.siteTexts?.homeLearnMoreButton}</Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-brown-800">{siteContent.siteTexts?.welcomeTitle}</h2>
            <p className="font-body text-lg text-brown-600 leading-relaxed">{siteContent.siteTexts?.welcomeText1}</p>
            <p className="font-body text-lg text-brown-600 leading-relaxed">{siteContent.siteTexts?.welcomeText2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <img
                  src={siteContent.siteImages?.welcomeImage1 ?? "/placeholder.svg"}
                  alt="Happy customers"
                  className="w-full h-40 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">{siteContent.siteTexts?.welcomeImage1Caption}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <img
                  src={siteContent.siteImages?.welcomeImage2 ?? "/placeholder.svg"}
                  alt="Delicious food"
                  className="w-full h-40 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">{siteContent.siteTexts?.welcomeImage2Caption}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Highlights & Hours/Location sections remain the same */}
      {/* ... */}
    </Layout>
  );
}
