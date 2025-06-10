import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Truck, Home } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-brown-200 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            Our Story
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            From a small food truck dream to a community gathering place that's
            changing lives, one meal and one rescue dog at a time.
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
                Meet the King Family
              </h2>
              <div className="space-y-4 font-body text-brown-600 leading-relaxed">
                <p>
                  KINGAROOS began as a dream shared around our family dinner
                  table. Sarah and David King, along with their three kids, had
                  always been passionate about two things: creating amazing food
                  and helping animals in need.
                </p>
                <p>
                  What started as weekend barbecues for friends slowly grew into
                  something bigger. Our neighbors kept asking us to cater their
                  events, and we realized we had something special brewing. But
                  it wasn't until we rescued our first dog, Rusty, that we found
                  our true purpose.
                </p>
                <p>
                  Rusty came from a local shelter, scared and skinny. Watching
                  him transform into the happy, confident dog he is today made
                  us realize how many other dogs needed that same second chance.
                  That's when we decided to combine our love of food with our
                  passion for animal rescue.
                </p>
              </div>
            </div>

            {/* Family Photo Placeholder */}
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-96 bg-sand-200 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Users className="h-16 w-16 text-aussie-orange mx-auto" />
                    <div className="space-y-2">
                      <p className="font-body text-brown-600 font-semibold">
                        The King Family
                      </p>
                      <p className="font-body text-brown-500 text-sm">
                        Sarah, David, and their three kids with rescue dog Rusty
                      </p>
                    </div>
                  </div>
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
            Our Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-sand-200 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  2019: The Food Truck
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  Started with a single food truck, "King's Mobile Kitchen,"
                  serving Australian comfort food at local markets and events.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  2021: First Rescue Partnership
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  After rescuing Rusty, we partnered with Sydney Animal Rescue
                  to donate a portion of profits to help other dogs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  2023: KINGAROOS Opens
                </h3>
                <p className="font-body text-brown-600 leading-relaxed">
                  Opened our first brick-and-mortar restaurant with a mission:
                  great food, good vibes, and helping paws.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Impact Stats */}
            <div className="space-y-8">
              <h2 className="font-heading text-4xl font-bold text-brown-800">
                Our Impact So Far
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="font-heading text-4xl font-bold text-aussie-orange mb-2">
                    127
                  </div>
                  <div className="font-body text-brown-600">Dogs Helped</div>
                </div>
                <div className="text-center p-4">
                  <div className="font-heading text-4xl font-bold text-aussie-orange mb-2">
                    89
                  </div>
                  <div className="font-body text-brown-600">
                    Forever Homes Found
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="font-heading text-4xl font-bold text-aussie-orange mb-2">
                    $42K
                  </div>
                  <div className="font-body text-brown-600">
                    Donated to Rescues
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="font-heading text-4xl font-bold text-aussie-orange mb-2">
                    3
                  </div>
                  <div className="font-body text-brown-600">
                    Rescue Partners
                  </div>
                </div>
              </div>
              <p className="font-body text-brown-600 leading-relaxed">
                Every number represents a life changed - whether it's a dog
                finding their forever family or a family discovering the joy of
                rescue pet adoption.
              </p>
            </div>

            {/* Rusty's Story */}
            <Card className="border-aussie-orange border-2 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-12 w-12 text-aussie-orange" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-brown-800 mb-2">
                    Meet Rusty
                  </h3>
                  <p className="font-body text-aussie-orange font-semibold">
                    Our First Rescue & Restaurant Mascot
                  </p>
                </div>
                <p className="font-body text-brown-600 leading-relaxed text-center">
                  Rusty was found wandering the streets, skinny and scared.
                  Today, he's our official restaurant greeter, welcome
                  committee, and inspiration for everything we do. He reminds us
                  daily why our mission matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-brown-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-8">
            Our Mission
          </h2>
          <Card className="bg-cream-50 border-aussie-orange border-2 shadow-xl">
            <CardContent className="p-12">
              <blockquote className="font-heading text-2xl text-brown-800 italic leading-relaxed">
                "We believe in good food, family, and giving every dog a second
                chance. At KINGAROOS, every meal shared is a step toward
                building a more compassionate community."
              </blockquote>
              <div className="mt-6 text-center">
                <p className="font-body text-brown-600">— The King Family</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-sand-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-orange rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                Compassion
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                Every decision we make considers the wellbeing of animals, our
                community, and our planet.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-eucalyptus rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                Community
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                We're more than a restaurant - we're a gathering place where
                friendships form and families grow.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-aussie-burnt-red rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brown-800">
                Quality
              </h3>
              <p className="font-body text-brown-600 leading-relaxed">
                From our locally-sourced ingredients to our carefully crafted
                atmosphere, we never compromise on quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
