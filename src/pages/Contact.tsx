import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Navigation,
} from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-brown-200 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            Get In Touch
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            Come visit us, give us a call, or connect with us online. We'd love
            to hear from you and welcome you to the KINGAROOS family!
          </p>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-8">
              {/* Location Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-heading text-2xl text-brown-800">
                    <MapPin className="h-7 w-7 text-aussie-orange" />
                    <span>Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="font-body text-brown-600">
                    <p className="font-semibold text-lg">
                      KINGAROOS Restaurant
                    </p>
                    <p>123 Outback Lane</p>
                    <p>Sydney, NSW 2000</p>
                    <p>Australia</p>
                  </div>
                  <div className="pt-3">
                    <div className="flex items-center space-x-2 text-aussie-orange">
                      <Navigation className="h-4 w-4" />
                      <span className="font-body text-sm">
                        Easy parking available on-site
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-heading text-2xl text-brown-800">
                    <Clock className="h-7 w-7 text-aussie-orange" />
                    <span>Opening Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Monday - Thursday</span>
                      <span className="font-semibold">11:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Friday - Saturday</span>
                      <span className="font-semibold">11:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>Sunday</span>
                      <span className="font-semibold">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-sm text-aussie-orange">
                        Kitchen closes 30 minutes before closing time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-heading text-2xl text-brown-800">
                    <Phone className="h-7 w-7 text-aussie-orange" />
                    <span>Contact Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-aussie-orange" />
                      <div>
                        <p className="font-semibold">(02) 1234 5678</p>
                        <p className="text-sm">
                          Call for reservations or inquiries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-aussie-orange" />
                      <div>
                        <p className="font-semibold">hello@kingaroos.com.au</p>
                        <p className="text-sm">
                          General inquiries and feedback
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-brown-800">
                    Find Us Here
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full h-96 bg-sand-200 rounded-b-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="h-16 w-16 text-aussie-orange mx-auto" />
                      <div className="space-y-2">
                        <p className="font-body text-brown-600 font-semibold">
                          Google Maps Integration
                        </p>
                        <p className="font-body text-brown-500 text-sm max-w-xs">
                          Interactive map would be embedded here showing our
                          exact location and nearby landmarks
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-brown-800">
                    Follow Our Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="font-body text-brown-600">
                    Stay connected with us on social media for the latest
                    updates, rescue dog stories, and behind-the-scenes moments!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
                      <Facebook className="h-6 w-6 text-aussie-orange" />
                      <div>
                        <p className="font-body font-semibold text-brown-800">
                          @KingaroosRestaurant
                        </p>
                        <p className="font-body text-brown-600 text-sm">
                          Daily updates and community stories
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
                      <Instagram className="h-6 w-6 text-aussie-orange" />
                      <div>
                        <p className="font-body font-semibold text-brown-800">
                          @kingaroos_sydney
                        </p>
                        <p className="font-body text-brown-600 text-sm">
                          Food photos and rescue dog features
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-brown-800 mb-8">
            Good to Know
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  🐶 Bringing Your Dog?
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• Dogs must be well-behaved and leashed</p>
                  <p>• We provide water bowls and dog treats</p>
                  <p>• Outdoor seating area is dog-friendly</p>
                  <p>• Please clean up after your pet</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  📞 Reservations
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• Recommended for dinner and weekends</p>
                  <p>• Call ahead for large groups (6+ people)</p>
                  <p>• Walk-ins welcome based on availability</p>
                  <p>• Special events may require booking</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  🚗 Parking & Access
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• Free on-site parking available</p>
                  <p>• Wheelchair accessible entrance</p>
                  <p>• Public transport: Bus stop 2 blocks away</p>
                  <p>• Bicycle parking available</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  💳 Payment & Policies
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• Cash and all major cards accepted</p>
                  <p>• No BYO alcohol policy</p>
                  <p>• Split bills welcome</p>
                  <p>• 10% service charge for groups of 8+</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-aussie-orange py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">
            We Can't Wait to Meet You!
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            Whether you're dining solo, bringing the family, or coming with your
            furry friend, we're here to make your experience memorable. Every
            visit helps a rescue dog too!
          </p>
          <div className="space-y-4 text-cream-100">
            <p className="font-body text-lg font-semibold">
              📞 (02) 1234 5678 | 📍 123 Outback Lane, Sydney
            </p>
            <p className="font-body">
              See you soon at KINGAROOS - where great food meets helping paws!
              🐾
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
