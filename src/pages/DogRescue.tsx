import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import type { Dog } from "@/contexts/AdminContext";

export default function DogRescue() {
  const { siteContent, loading } = useAdmin();
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading rescue dogs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-eucalyptus/20 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-6">
            {siteContent.siteTexts.dogRescueTitle}
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
                  {siteContent.siteTexts.dogRescueSubtitle}
                </p>
              </CardContent>
            </Card>
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

          {siteContent.dogs.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-aussie-orange mx-auto mb-4" />
              <p className="font-body text-brown-600">
                No rescue dogs to display at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteContent.dogs.map((dog) => (
                <Card
                  key={dog.id}
                  className="border-sand-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedDog(dog)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="w-full h-64 bg-sand-200 rounded-t-lg overflow-hidden">
                        {dog.afterImage && dog.afterImage !== "/placeholder.svg" ? (
                          <img 
                            src={dog.afterImage} 
                            alt={`${dog.name} after recovery`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <Heart className="h-12 w-12 text-aussie-orange mx-auto" />
                              <p className="font-body text-brown-600 text-sm">
                                Click to see {dog.name}'s story
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <p className="text-white font-semibold text-sm">Click to view {dog.name}'s transformation</p>
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
          )}
        </div>
      </section>

      {/* Dog Story Modal */}
      <Dialog open={!!selectedDog} onOpenChange={() => setSelectedDog(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-bold text-brown-800">
              {selectedDog?.name}'s Transformation Story
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detailed story and information about {selectedDog?.name}.
            </DialogDescription>
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
                        {selectedDog.beforeImage &&
                        selectedDog.beforeImage !== "/placeholder.svg" ? (
                          <img
                            src={selectedDog.beforeImage}
                            alt={`${selectedDog.name} before rescue`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center space-y-2">
                            <Heart className="h-12 w-12 text-brown-400 mx-auto" />
                            <p className="font-body text-brown-500 text-sm">
                              Before: {selectedDog.name} when first rescued
                            </p>
                          </div>
                        )}
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
                        {selectedDog.afterImage &&
                        selectedDog.afterImage !== "/placeholder.svg" ? (
                          <img
                            src={selectedDog.afterImage}
                            alt={`${selectedDog.name} after recovery`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center space-y-2">
                            <Heart className="h-12 w-12 text-aussie-orange mx-auto" />
                            <p className="font-body text-aussie-orange text-sm">
                              After: {selectedDog.name} today
                            </p>
                          </div>
                        )}
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
