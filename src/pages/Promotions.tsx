import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Utensils, Gift, Calendar, Star } from "lucide-react";

const promotions = [
  {
    title: "Happy Hour Special",
    subtitle: "Monday, Wednesday & Friday",
    details: "20% off all drinks from 2-5 PM",
    description: "Unwind with discounted drinks and great vibes",
    icon: Clock,
    color: "from-aussie-orange to-aussie-burnt-red",
    badge: "Weekly Deal",
  },
  {
    title: "Every Meal Helps Rescue a Dog!",
    subtitle: "With Every Purchase",
    details: "$2 from every main dish goes to dog rescue",
    description: "Dine with purpose and make a difference",
    icon: Heart,
    color: "from-aussie-eucalyptus to-green-600",
    badge: "Always Active",
  },
  {
    title: "Bring Your Pooch Discount",
    subtitle: "Dog-Friendly Dining",
    details: "10% off when you bring your well-behaved dog",
    description: "We love our four-legged customers!",
    icon: Heart,
    color: "from-brown-600 to-brown-800",
    badge: "Dog Special",
  },
  {
    title: "Family Feast Sunday",
    subtitle: "Every Sunday",
    details: "Kids eat free with adult main dish purchase",
    description: "Perfect for family outings and bonding time",
    icon: Utensils,
    color: "from-sand-500 to-brown-500",
    badge: "Family Deal",
  },
  {
    title: "Birthday Club",
    subtitle: "Join Our Community",
    details: "Free dessert on your birthday month",
    description: "Sign up in-store to join our birthday club",
    icon: Gift,
    color: "from-aussie-burnt-red to-red-700",
    badge: "Loyalty Program",
  },
  {
    title: "Early Bird Special",
    subtitle: "Before 6 PM Weekdays",
    details: "15% off all main dishes",
    description: "Beat the rush and save on dinner",
    icon: Clock,
    color: "from-brown-500 to-aussie-orange",
    badge: "Weekday Deal",
  },
];

const seasonalPromotions = [
  {
    title: "Christmas Special Menu",
    date: "December 15-25",
    details: "Festive Australian Christmas dishes with holiday pricing",
    icon: Star,
    urgent: true,
  },
  {
    title: "New Year's Resolution Meals",
    date: "January 1-31",
    details: "Healthy options at special prices to start the year right",
    icon: Calendar,
    urgent: false,
  },
];

export default function Promotions() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-orange/20 to-aussie-burnt-red/20 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            Current Promotions
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            Great food at even better prices! Check out our ongoing deals and
            special offers that make dining at KINGAROOS even more delicious.
          </p>
        </div>
      </section>

      {/* Main Promotions Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <Card
                key={index}
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
                      <promo.icon className="h-6 w-6" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal/Limited Time Offers */}
      <section className="py-16 px-4 bg-cream-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            Seasonal Specials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasonalPromotions.map((promo, index) => (
              <Card
                key={index}
                className={`border-sand-200 shadow-lg hover:shadow-xl transition-shadow ${
                  promo.urgent ? "ring-2 ring-aussie-orange" : ""
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 ${
                        promo.urgent ? "bg-aussie-orange" : "bg-brown-600"
                      } rounded-lg flex items-center justify-center`}
                    >
                      <promo.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-heading text-2xl font-bold text-brown-800">
                          {promo.title}
                        </h3>
                        {promo.urgent && (
                          <Badge className="bg-aussie-orange text-white font-body">
                            Limited Time
                          </Badge>
                        )}
                      </div>
                      <p className="font-body font-semibold text-aussie-orange mb-2">
                        {promo.date}
                      </p>
                      <p className="font-body text-brown-600 leading-relaxed">
                        {promo.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
