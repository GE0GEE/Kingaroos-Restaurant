import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, X } from "lucide-react";

const rescueDogs = [
  {
    name: "Bandit",
    breed: "Border Collie Mix",
    age: "3 years old",
    personality:
      "Energetic and loves playing fetch. Great with kids and other dogs.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Found wandering the streets, scared and malnourished. Now a confident, happy dog ready for adventure!",
  },
  {
    name: "Rosie",
    breed: "Golden Retriever Mix",
    age: "5 years old",
    personality:
      "Gentle soul who loves cuddles and long walks. Perfect family dog.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Abandoned at a shelter, she was shy and withdrawn. Today she's full of love and ready to be someone's best friend!",
  },
  {
    name: "Max",
    breed: "Australian Cattle Dog",
    age: "2 years old",
    personality:
      "Smart and loyal. Needs an active family who loves adventures.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Came to us as an injured puppy. After months of care and training, he's now a strong, healthy young dog!",
  },
  {
    name: "Luna",
    breed: "Labrador Mix",
    age: "4 years old",
    personality: "Sweet and calm, loves children and is great with cats too.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Rescued from neglect, she was fearful of humans. Now she's the sweetest, most trusting companion you could ask for!",
  },
  {
    name: "Cooper",
    breed: "Beagle Mix",
    age: "6 years old",
    personality:
      "Friendly senior who just wants a quiet home to enjoy his golden years.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Senior dog found as a stray, thin and tired. With proper care, he's now healthy and looking for a peaceful retirement home!",
  },
  {
    name: "Bella",
    breed: "Australian Shepherd Mix",
    age: "1 year old",
    personality:
      "Playful puppy energy! Needs training but so much love to give.",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    rescueStory:
      "Born in the shelter, she needed socialization and training. Now she's a confident, playful pup ready for her family!",
  },
];

export default function DogRescue() {
  const [selectedDog, setSelectedDog] = useState<(typeof rescueDogs)[0] | null>(
    null,
  );

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-eucalyptus/20 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-6">
            Dogs We're Helping
          </h1>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-cream-50 border-sand-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Heart className="h-8 w-8 text-aussie-orange" />
                  <h2 className="font-heading text-2xl font-bold text-brown-800">
                    Every Meal Makes a Difference
                  </h2>
                </div>
                <p className="font-body text-lg text-brown-600 leading-relaxed">
                  At KINGAROOS, every plate you order helps rescue a dog in
                  need. We partner with local shelters to provide food, medical
                  care, and love to abandoned dogs while they wait for their
                  forever homes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="font-heading text-4xl font-bold text-aussie-orange">
                127
              </div>
              <div className="font-body text-brown-600">
                Dogs Helped This Year
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-heading text-4xl font-bold text-aussie-orange">
                89
              </div>
              <div className="font-body text-brown-600">Dogs Found Homes</div>
            </div>
            <div className="space-y-2">
              <div className="font-heading text-4xl font-bold text-aussie-orange">
                $42,500
              </div>
              <div className="font-body text-brown-600">
                Raised for Rescue Care
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dog Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-8">
            Meet Our Rescue Friends
          </h2>
          <p className="font-body text-center text-brown-600 mb-12 max-w-2xl mx-auto">
            Click on any dog to see their amazing transformation story from
            rescue to recovery!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rescueDogs.map((dog, index) => (
              <Card
                key={index}
                className="border-sand-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedDog(dog)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-64 bg-sand-200 rounded-t-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Heart className="h-12 w-12 text-aussie-orange mx-auto" />
                        <p className="font-body text-brown-600 text-sm">
                          Click to see {dog.name}'s story
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-2xl font-bold text-brown-800">
                        {dog.name}
                      </h3>
                      <span className="font-body text-brown-600 text-sm">
                        {dog.age}
                      </span>
                    </div>
                    <p className="font-body text-brown-600 font-semibold">
                      {dog.breed}
                    </p>
                    <p className="font-body text-brown-600 leading-relaxed">
                      {dog.personality}
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-aussie-orange text-aussie-orange hover:bg-aussie-orange hover:text-white"
                      >
                        See {dog.name}'s Transformation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dog Story Modal */}
      <Dialog open={!!selectedDog} onOpenChange={() => setSelectedDog(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-bold text-brown-800">
              {selectedDog?.name}'s Transformation Story
            </DialogTitle>
          </DialogHeader>

          {selectedDog && (
            <div className="space-y-6">
              {/* Dog Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-body text-brown-600">
                    <span className="font-semibold">Breed:</span>{" "}
                    {selectedDog.breed}
                  </p>
                  <p className="font-body text-brown-600">
                    <span className="font-semibold">Age:</span>{" "}
                    {selectedDog.age}
                  </p>
                </div>
                <div>
                  <p className="font-body text-brown-600">
                    <span className="font-semibold">Personality:</span>{" "}
                    {selectedDog.personality}
                  </p>
                </div>
              </div>

              {/* Before and After Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-bold text-brown-800 text-center">
                    Before Rescue
                  </h3>
                  <Card className="border-sand-200">
                    <CardContent className="p-4">
                      <div className="w-full h-64 bg-sand-200 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center space-y-2">
                          <Heart className="h-12 w-12 text-brown-400 mx-auto" />
                          <p className="font-body text-brown-500 text-sm">
                            Before: {selectedDog.name} when first rescued
                          </p>
                        </div>
                      </div>
                      <p className="font-body text-brown-600 text-center text-sm italic">
                        When we first found {selectedDog.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-bold text-brown-800 text-center">
                    After Recovery
                  </h3>
                  <Card className="border-sand-200">
                    <CardContent className="p-4">
                      <div className="w-full h-64 bg-sand-200 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center space-y-2">
                          <Heart className="h-12 w-12 text-aussie-orange mx-auto" />
                          <p className="font-body text-aussie-orange text-sm">
                            After: {selectedDog.name} today
                          </p>
                        </div>
                      </div>
                      <p className="font-body text-brown-600 text-center text-sm italic">
                        {selectedDog.name} today - happy and healthy!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Rescue Story */}
              <Card className="bg-cream-50 border-sand-200">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brown-800 mb-4 flex items-center">
                    <Heart className="h-6 w-6 text-aussie-orange mr-2" />
                    {selectedDog.name}'s Journey
                  </h3>
                  <p className="font-body text-brown-600 leading-relaxed">
                    {selectedDog.rescueStory}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call to Action */}
      <section className="bg-brown-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-6">
            Want to Know More About Our Rescue Program?
          </h2>
          <p className="font-body text-xl text-cream-200 mb-8">
            Every meal you enjoy with us helps provide food, medical care, and
            love to rescue dogs in need. Together, we're making a real
            difference!
          </p>
          <div className="space-y-6">
            <Card className="bg-cream-50 border-sand-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-aussie-orange" />
                  <h3 className="font-heading text-lg font-bold text-brown-800">
                    Get Involved
                  </h3>
                </div>
                <p className="font-body text-brown-600">
                  Talk to us in-store or message us on Facebook to learn more
                  about specific dogs, volunteer opportunities, or how to adopt.
                </p>
              </CardContent>
            </Card>
            <div className="space-y-2 text-cream-200">
              <p className="font-body">
                📘 Follow us on Facebook: @KingaroosRestaurant
              </p>
              <p className="font-body">📞 Call us: (02) 1234 5678</p>
              <p className="font-body">🏪 Visit us: 123 Outback Lane, Sydney</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
