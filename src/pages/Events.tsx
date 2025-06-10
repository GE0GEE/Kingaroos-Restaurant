import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, Users, Heart, Coffee } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const getEventIcon = (type: string) => {
  switch (type) {
    case "music":
      return Music;
    case "dogs":
      return Heart;
    case "family":
      return Users;
    case "special":
      return Coffee;
    case "food":
      return Coffee;
    default:
      return Calendar;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case "music":
      return "bg-aussie-orange";
    case "dogs":
      return "bg-aussie-eucalyptus";
    case "family":
      return "bg-brown-600";
    case "special":
      return "bg-aussie-burnt-red";
    case "food":
      return "bg-sand-600";
    default:
      return "bg-brown-600";
  }
};

export default function Events() {
  const { siteContent, loading } = useAdmin();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center space-y-4">
            <Calendar className="h-12 w-12 text-aussie-orange mx-auto animate-pulse" />
            <p className="font-body text-brown-600">Loading events...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const thisWeekEvents = siteContent.events.filter(
    (event) => event.category === "thisWeek",
  );
  const comingSoonEvents = siteContent.events.filter(
    (event) => event.category === "comingSoon",
  );

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-orange/20 to-brown-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            {siteContent.siteTexts.eventsTitle}
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            {siteContent.siteTexts.eventsSubtitle}
          </p>
        </div>
      </section>

      {/* This Week Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <Calendar className="h-8 w-8 text-aussie-orange" />
            <h2 className="font-heading text-4xl font-bold text-brown-800">
              This Week
            </h2>
          </div>

          {thisWeekEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-brown-400 mx-auto mb-4" />
              <p className="font-body text-brown-600">
                No events scheduled for this week. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thisWeekEvents.map((event) => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <Card
                    key={event.id}
                    className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 ${getEventColor(event.type)} rounded-full flex items-center justify-center`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-aussie-orange text-white font-body">
                          This Week
                        </Badge>
                      </div>
                      <CardTitle className="font-heading text-xl text-brown-800">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <p className="font-body font-semibold text-brown-700">
                          {event.date}
                        </p>
                        <p className="font-body text-brown-600">{event.time}</p>
                      </div>
                      <p className="font-body text-brown-600 leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <Calendar className="h-8 w-8 text-aussie-burnt-red" />
            <h2 className="font-heading text-4xl font-bold text-brown-800">
              Coming Soon
            </h2>
          </div>

          {comingSoonEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-brown-400 mx-auto mb-4" />
              <p className="font-body text-brown-600">
                No upcoming events scheduled. Check back soon for new events!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comingSoonEvents.map((event) => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <Card
                    key={event.id}
                    className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div
                          className={`w-16 h-16 ${getEventColor(event.type)} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-heading text-xl font-bold text-brown-800">
                              {event.title}
                            </h3>
                            {event.type === "special" && (
                              <Badge className="bg-aussie-burnt-red text-white font-body text-xs">
                                Special Event
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="font-body font-semibold text-brown-700">
                              {event.date}
                            </p>
                            <p className="font-body text-brown-600">
                              {event.time}
                            </p>
                          </div>
                          <p className="font-body text-brown-600 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Types Legend */}
      <section className="py-12 bg-sand-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="font-heading text-2xl font-bold text-center text-brown-800 mb-8">
            Event Types
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-aussie-orange rounded-full"></div>
              <span className="font-body text-brown-600 text-sm">
                Live Music
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-aussie-eucalyptus rounded-full"></div>
              <span className="font-body text-brown-600 text-sm">
                Dog Events
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brown-600 rounded-full"></div>
              <span className="font-body text-brown-600 text-sm">
                Family Fun
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-aussie-burnt-red rounded-full"></div>
              <span className="font-body text-brown-600 text-sm">
                Special Events
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-sand-600 rounded-full"></div>
              <span className="font-body text-brown-600 text-sm">
                Food Events
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brown-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-6">
            Don't Miss Out!
          </h2>
          <p className="font-body text-xl text-cream-200 mb-8">
            Follow us on social media or call ahead to secure your spot at our
            special events. Some events may have limited seating!
          </p>
          <div className="space-y-4 text-cream-200">
            <p className="font-body">
              📞 Call for reservations:{" "}
              <span className="font-semibold">(02) 1234 5678</span>
            </p>
            <p className="font-body">
              📘 Follow us on Facebook: @KingaroosRestaurant
            </p>
            <p className="font-body">
              📷 Follow us on Instagram: @kingaroos_sydney
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
