import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, Users, Heart, Coffee } from "lucide-react";

const thisWeekEvents = [
  {
    title: "Live Acoustic Friday",
    date: "Friday, Dec 8",
    time: "7:00 PM - 9:00 PM",
    description: "Local musicians perform acoustic sets while you dine",
    icon: Music,
    type: "music",
  },
  {
    title: "Puppy Playdate",
    date: "Saturday, Dec 9",
    time: "10:00 AM - 12:00 PM",
    description: "Bring your pups for a social morning with other dog families",
    icon: Heart,
    type: "dogs",
  },
  {
    title: "Sunday Brunch & Trivia",
    date: "Sunday, Dec 10",
    time: "11:00 AM - 2:00 PM",
    description: "Family-friendly trivia with prizes and bottomless coffee",
    icon: Coffee,
    type: "family",
  },
];

const comingSoonEvents = [
  {
    title: "Christmas Carol Singalong",
    date: "Friday, Dec 15",
    time: "6:00 PM - 8:00 PM",
    description: "Join us for festive carols and holiday cheer",
    icon: Music,
    type: "special",
  },
  {
    title: "Rescue Dog Meet & Greet",
    date: "Saturday, Dec 16",
    time: "1:00 PM - 4:00 PM",
    description: "Meet adoptable dogs from our partner rescue organizations",
    icon: Heart,
    type: "dogs",
  },
  {
    title: "New Year's Family Feast",
    date: "Sunday, Dec 31",
    time: "5:00 PM - 9:00 PM",
    description: "Celebrate the new year with a special family-style dinner",
    icon: Users,
    type: "special",
  },
  {
    title: "Aussie BBQ Championship",
    date: "Saturday, Jan 13",
    time: "12:00 PM - 6:00 PM",
    description: "Watch our chefs compete in the ultimate BBQ showdown",
    icon: Users,
    type: "food",
  },
];

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
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-aussie-orange/20 to-brown-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            Events & Happenings
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            Join us for special events, live music, and community gatherings.
            There's always something fun happening at KINGAROOS!
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {thisWeekEvents.map((event, index) => (
              <Card
                key={index}
                className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 ${getEventColor(event.type)} rounded-full flex items-center justify-center`}
                    >
                      <event.icon className="h-6 w-6 text-white" />
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
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonEvents.map((event, index) => (
              <Card
                key={index}
                className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div
                      className={`w-16 h-16 ${getEventColor(event.type)} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <event.icon className="h-8 w-8 text-white" />
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
                        <p className="font-body text-brown-600">{event.time}</p>
                      </div>
                      <p className="font-body text-brown-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
