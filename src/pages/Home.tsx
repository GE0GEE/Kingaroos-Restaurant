import { Heart, Users, UtensilsCrossed, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sand-300 to-brown-300">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            KINGAROOS
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 animate-fade-in delay-150">
            Great Food. Good Vibes. Helping Paws.
          </p>
          <div className="space-x-4 animate-fade-in delay-300">
            <Button
              size="lg"
              className="bg-aussie-orange hover:bg-aussie-burnt-red text-white font-body font-semibold"
            >
              View Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brown-800 font-body font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-brown-800">
              Welcome to the Pack
            </h2>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              At KINGAROOS, we believe great food brings people together – and
              their furry friends too! Our cozy restaurant serves up delicious
              Australian-inspired dishes in a warm, dog-friendly atmosphere
              where every meal makes a difference.
            </p>
            <p className="font-body text-lg text-brown-600 leading-relaxed">
              Started by the King family with a passion for good food and a love
              for rescue dogs, we've created a space where community,
              compassion, and culinary excellence come together.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg"
                  alt="Happy customers with dogs"
                  className="w-full h-32 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                  Smiling customers enjoying our dog-friendly atmosphere
                </p>
              </CardContent>
            </Card>
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg"
                  alt="Delicious food"
                  className="w-full h-32 object-cover rounded-md mb-4 bg-sand-200"
                />
                <p className="font-body text-sm text-brown-600">
                  Fresh, delicious Australian-inspired cuisine
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
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  🐶 Dog-Friendly
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  Bring your furry friends! We welcome well-behaved dogs with
                  open arms, water bowls, and even special treats.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto mb-6">
                  <UtensilsCrossed className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  🥩 Aussie-Inspired Food
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  From hearty meat pies to fresh barramundi, our menu celebrates
                  the bold flavors and comfort food traditions of Australia.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brown-800 mb-4">
                  ❤️ Every Meal Helps a Rescue
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  A portion of every purchase goes directly to local dog rescue
                  organizations, helping give abandoned dogs a second chance.
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
            Visit Us Today
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hours & Contact */}
            <div className="space-y-8">
              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Clock className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">
                      Opening Hours
                    </h3>
                  </div>
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span className="font-semibold">11am - 9pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span className="font-semibold">11am - 10pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">10am - 8pm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sand-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <MapPin className="h-8 w-8 text-aussie-orange" />
                    <h3 className="font-heading text-2xl font-bold text-brown-800">
                      Location
                    </h3>
                  </div>
                  <div className="space-y-2 font-body text-brown-600">
                    <p className="font-semibold">123 Outback Lane</p>
                    <p>Sydney, NSW 2000</p>
                    <p className="text-aussie-orange font-semibold">
                      (02) 1234 5678
                    </p>
                    <p className="text-aussie-orange">hello@kingaroos.com.au</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-96 bg-sand-200 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-aussie-orange mx-auto" />
                    <p className="font-body text-brown-600">Google Maps</p>
                    <p className="font-body text-sm text-brown-500">
                      Interactive map would be embedded here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
