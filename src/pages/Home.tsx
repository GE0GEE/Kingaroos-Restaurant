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
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % siteContent.heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [siteContent?.heroImages]);

  if (loading) {
    return <Layout><div className="h-screen flex items-center justify-center"><Heart className="animate-pulse h-12 w-12 text-aussie-orange" /></div></Layout>;
  }

  return (
    <Layout>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {(siteContent.heroImages ?? []).map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }} />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">{siteContent.siteTexts.homeTitle}</h1>
          <p className="font-body text-xl md:text-2xl mb-8">{siteContent.siteTexts.homeSubtitle}</p>
          <div className="space-x-4">
            <Button size="lg" className="bg-aussie-orange" onClick={() => navigate("/menu")}>{siteContent.siteTexts.homeViewMenuButton}</Button>
            <Button size="lg" variant="outline" className="border-white text-white" onClick={() => navigate("/about")}>{siteContent.siteTexts.homeLearnMoreButton}</Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-brown-800">{siteContent.siteTexts.welcomeTitle}</h2>
            <p className="font-body text-lg text-brown-600 leading-relaxed">{siteContent.siteTexts.welcomeText1}</p>
            <p className="font-body text-lg text-brown-600 leading-relaxed">{siteContent.siteTexts.welcomeText2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <img src={siteContent.siteImages.welcomeImage1} alt="Happy customers with dogs" className="w-full h-40 object-cover rounded-md mb-4" />
                <p className="font-body text-sm text-brown-600">{siteContent.siteTexts.welcomeImage1Caption}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <img src={siteContent.siteImages.welcomeImage2} alt="Delicious Australian-inspired cuisine" className="w-full h-40 object-cover rounded-md mb-4" />
                <p className="font-body text-sm text-brown-600">{siteContent.siteTexts.welcomeImage2Caption}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">{siteContent.siteTexts.homeHighlightsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8"><Heart className="mx-auto h-8 w-8" /><h3 className="text-2xl font-bold mt-4">{siteContent.siteTexts.dogFriendlyTitle}</h3><p className="mt-2">{siteContent.siteTexts.dogFriendlyText}</p></Card>
            <Card className="text-center p-8"><UtensilsCrossed className="mx-auto h-8 w-8" /><h3 className="text-2xl font-bold mt-4">{siteContent.siteTexts.aussieFoodTitle}</h3><p className="mt-2">{siteContent.siteTexts.aussieFoodText}</p></Card>
            <Card className="text-center p-8"><Users className="mx-auto h-8 w-8" /><h3 className="text-2xl font-bold mt-4">{siteContent.siteTexts.rescueHelpTitle}</h3><p className="mt-2">{siteContent.siteTexts.rescueHelpText}</p></Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">{siteContent.siteTexts.homeVisitTitle}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="p-8"><h3 className="text-2xl font-bold flex items-center"><Clock className="mr-2"/>{siteContent.siteTexts.homeHoursTitle}</h3><p className="mt-4">{siteContent.siteTexts.hoursWeekday}</p><p>{siteContent.siteTexts.hoursWeekend}</p><p>{siteContent.siteTexts.hoursSunday}</p></Card>
              <Card className="p-8"><h3 className="text-2xl font-bold flex items-center"><MapPin className="mr-2"/>{siteContent.siteTexts.homeLocationTitle}</h3><p className="mt-4">{siteContent.siteTexts.homeAddress}</p><p>{siteContent.siteTexts.homePhone}</p><p>{siteContent.siteTexts.homeEmail}</p></Card>
            </div>
            <Card className="p-0 h-full"><iframe src={siteContent.siteTexts.googleMapsUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe></Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
