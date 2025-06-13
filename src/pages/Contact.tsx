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
import { useAdmin } from "@/contexts/AdminContext";

export default function Contact() {
  const { siteContent, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading contact info...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-brown-200 to-sand-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            {siteContent.siteTexts.contactTitle}
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            {siteContent.siteTexts.contactSubtitle}
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
                    <span>{siteContent.siteTexts.contactLocationTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="font-body text-brown-600">
                    <p className="font-semibold text-lg">
                      {siteContent.siteTexts.contactLocationName}
                    </p>
                    <p>{siteContent.siteTexts.contactLocationAddress}</p>
                    <p>{siteContent.siteTexts.contactLocationCity}</p>
                    <p>{siteContent.siteTexts.contactLocationCountry}</p>
                  </div>
                  <div className="pt-3">
                    <div className="flex items-center space-x-2 text-aussie-orange">
                      <Navigation className="h-4 w-4" />
                      <span className="font-body text-sm">
                        {siteContent.siteTexts.contactParkingText}
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
                    <span>{siteContent.siteTexts.contactHoursTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>{siteContent.siteTexts.contactMondayThursday}</span>
                      <span className="font-semibold">{siteContent.siteTexts.contactHoursMondayThursday}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>{siteContent.siteTexts.contactFridaySaturday}</span>
                      <span className="font-semibold">{siteContent.siteTexts.contactHoursFridaySaturday}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-sand-200">
                      <span>{siteContent.siteTexts.contactSunday}</span>
                      <span className="font-semibold">{siteContent.siteTexts.contactHoursSunday}</span>
                    </div>
                    {/* ... */}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-heading text-2xl text-brown-800">
                    <Phone className="h-7 w-7 text-aussie-orange" />
                    <span>{siteContent.siteTexts.contactDetailsTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 font-body text-brown-600">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-aussie-orange" />
                      <div>
                        <p className="font-semibold">
                          {siteContent.siteTexts.homePhone}
                        </p>
                        <p className="text-sm">
                          {siteContent.siteTexts.contactPhoneDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-aussie-orange" />
                      <div>
                        <p className="font-semibold">
                          {siteContent.siteTexts.homeEmail}
                        </p>
                        <p className="text-sm">
                          {siteContent.siteTexts.contactEmailDescription}
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
                    {siteContent.siteTexts.contactFindUsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15751.867549789918!2d123.29718759559996!3d9.247256723398154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab69f7f93062cf%3A0xedaf9d009a9047d0!2sKingaroo's%20Seaview%20Resto%20Bar!5e0!3m2!1sen!2sus!4v1749525539183!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-lg"
                      title={`Map showing location of ${siteContent.siteTexts.contactLocationName}`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="border-sand-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-brown-800">
                    {siteContent.siteTexts.contactFollowTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="font-body text-brown-600">
                    {siteContent.siteTexts.contactFollowText}
                  </p>
                  <div className="space-y-4">
                        <a href={siteContent.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
                            <Facebook className="h-6 w-6 text-aussie-orange" />
                            <div>
                              <p className="font-body font-semibold text-brown-800">
                                @KingaroosRestaurant
                              </p>
                              <p className="font-body text-brown-600 text-sm">
                                {siteContent.siteTexts.contactFacebookDescription}
                              </p>
                            </div>
                          </div>
                        </a>
                        <a href={siteContent.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
                            <Instagram className="h-6 w-6 text-aussie-orange" />
                            <div>
                              <p className="font-body font-semibold text-brown-800">
                                {siteContent.siteTexts.contactInstagramHandle}
                              </p>
                              <p className="font-body text-brown-600 text-sm">
                                {siteContent.siteTexts.contactInstagramDescription}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
                      <Instagram className="h-6 w-6 text-aussie-orange" />
                      <div>
                        <p className="font-body font-semibold text-brown-800">
                          {siteContent.siteTexts.contactInstagramHandle}
                        </p>
                        <p className="font-body text-brown-600 text-sm">
                          {siteContent.siteTexts.contactInstagramDescription}
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
            {siteContent.siteTexts.contactGoodToKnowTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.contactDogPolicyTitle}
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• {siteContent.siteTexts.contactDogPolicy1}</p>
                  <p>• {siteContent.siteTexts.contactDogPolicy2}</p>
                  <p>• {siteContent.siteTexts.contactDogPolicy3}</p>
                  <p>• {siteContent.siteTexts.contactDogPolicy4}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.contactReservationsTitle}
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• {siteContent.siteTexts.contactReservations1}</p>
                  <p>• {siteContent.siteTexts.contactReservations2}</p>
                  <p>• {siteContent.siteTexts.contactReservations3}</p>
                  <p>• {siteContent.siteTexts.contactReservations4}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.contactParkingAccessTitle}
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• {siteContent.siteTexts.contactParkingAccess1}</p>
                  <p>• {siteContent.siteTexts.contactParkingAccess2}</p>
                  <p>• {siteContent.siteTexts.contactParkingAccess3}</p>
                  <p>• {siteContent.siteTexts.contactParkingAccess4}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-brown-800 mb-4">
                  {siteContent.siteTexts.contactPaymentTitle}
                </h3>
                <div className="space-y-2 font-body text-brown-600 text-sm">
                  <p>• {siteContent.siteTexts.contactPayment1}</p>
                  <p>• {siteContent.siteTexts.contactPayment2}</p>
                  <p>• {siteContent.siteTexts.contactPayment3}</p>
                  <p>• {siteContent.siteTexts.contactPayment4}</p>
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
            {siteContent.siteTexts.contactCantWaitTitle}
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            {siteContent.siteTexts.contactCantWaitText}
          </p>
          <div className="space-y-4 text-cream-100">
            <p className="font-body text-lg font-semibold">
              📞 {siteContent.siteTexts.homePhone} | 📍{" "}
              {siteContent.siteTexts.homeAddress}
            </p>
            <p className="font-body">
              {siteContent.siteTexts.contactSeeYouText}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
