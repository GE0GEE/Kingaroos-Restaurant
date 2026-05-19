import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, Users, Heart, Coffee } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const getEventIcon = (type: string) => {
  switch (type) {
    case "music": return Music;
    case "dogs": return Heart;
    case "family": return Users;
    case "special": return Coffee;
    case "food": return Coffee;
    default: return Calendar;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case "music": return "bg-aussie-orange";
    case "dogs": return "bg-aussie-eucalyptus";
    case "family": return "bg-brown-600";
    case "special": return "bg-aussie-burnt-red";
    case "food": return "bg-sand-600";
    default: return "bg-brown-600";
  }
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  music: "Live Music",
  dogs: "Dog Events",
  family: "Family Fun",
  special: "Special Events",
  food: "Food Events",
};

function EventTypeBadge({ type, images, size = "sm" }: { type: string; images: Record<string, string>; size?: "sm" | "lg" }) {
  const img = images[type];
  const Icon = getEventIcon(type);
  const color = getEventColor(type);
  const dim = size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const iconDim = size === "lg" ? "h-8 w-8" : "h-6 w-6";
  if (img) {
    return (
      <div className={`${dim} rounded-full overflow-hidden border-2 border-white shadow shrink-0`}>
        <img src={img} alt={type} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`${dim} ${color} rounded-full flex items-center justify-center shrink-0`}>
      <Icon className={`${iconDim} text-white`} />
    </div>
  );
}

export default function Events() {
  const { siteContent, loading } = useAdmin();
  const eventTypeImages: Record<string, string> = (siteContent as any).eventTypeImages ?? {};

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

  const thisWeekEvents = siteContent.events.filter((e) => e.category === "thisWeek");
  const comingSoonEvents = siteContent.events.filter((e) => e.category === "comingSoon");

  return (
    <Layout>
      {/* Hero */}
      <div className="relative bg-stone-900 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <p className="relative font-body text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
          Kingaroos Restaurant
        </p>
        <h1 className="relative font-heading text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
          {siteContent.siteTexts.eventsTitle || "Events"}
        </h1>
        <p className="relative font-body text-stone-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          {siteContent.siteTexts.eventsSubtitle || "Join us for great food, music, and good times."}
        </p>
      </div>

      {/* This Week */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <Calendar className="h-8 w-8 text-aussie-orange" />
            <h2 className="font-heading text-4xl font-bold text-brown-800">This Week</h2>
          </div>
          {thisWeekEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-brown-400 mx-auto mb-4" />
              <p className="font-body text-brown-600">No events scheduled for this week. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thisWeekEvents.map((event) => {
                return (
                  <Card key={event.id} className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <EventTypeBadge type={event.type} images={eventTypeImages} size="sm" />
                        <Badge className="bg-aussie-orange text-white font-body">This Week</Badge>
                      </div>
                      <CardTitle className="font-heading text-xl text-brown-800">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <p className="font-body font-semibold text-brown-700">{event.date}</p>
                        <p className="font-body text-brown-600">{event.time}</p>
                      </div>
                      <p className="font-body text-brown-600 leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-4 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <Calendar className="h-8 w-8 text-aussie-burnt-red" />
            <h2 className="font-heading text-4xl font-bold text-brown-800">Coming Soon</h2>
          </div>
          {comingSoonEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-brown-400 mx-auto mb-4" />
              <p className="font-body text-brown-600">No upcoming events scheduled. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comingSoonEvents.map((event) => {
                return (
                  <Card key={event.id} className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <EventTypeBadge type={event.type} images={eventTypeImages} size="lg" />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-heading text-xl font-bold text-brown-800">{event.title}</h3>
                            {event.type === "special" && (
                              <Badge className="bg-aussie-burnt-red text-white font-body text-xs">Special Event</Badge>
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="font-body font-semibold text-brown-700">{event.date}</p>
                            <p className="font-body text-brown-600">{event.time}</p>
                          </div>
                          <p className="font-body text-brown-600 leading-relaxed">{event.description}</p>
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
          <h3 className="font-heading text-2xl font-bold text-center text-brown-800 mb-8">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { key: "music",   color: "bg-aussie-orange",     label: "Live Music"     },
              { key: "dogs",    color: "bg-aussie-eucalyptus", label: "Dog Events"     },
              { key: "family",  color: "bg-brown-600",         label: "Family Fun"     },
              { key: "special", color: "bg-aussie-burnt-red",  label: "Special Events" },
              { key: "food",    color: "bg-sand-600",          label: "Food Events"    },
            ].map(({ key, color, label }) => {
              const img = eventTypeImages[key];
              return (
                <div key={key} className="flex flex-col items-center gap-2 text-center">
                  {img ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow">
                      <img src={img} alt={label} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 ${color} rounded-full`} />
                  )}
                  <span className="font-body text-brown-600 text-sm">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brown-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream-50 mb-6">
            {siteContent.siteTexts.eventsDontMissTitle}
          </h2>
          <p className="font-body text-xl text-cream-200 mb-8">{siteContent.siteTexts.eventsDontMissText}</p>
          <div className="space-y-4 text-cream-200">
            <p className="font-body">📞 {siteContent.siteTexts.eventsCallText} <span className="font-semibold">{siteContent.siteTexts.homePhone}</span></p>
            <p className="font-body">📘 {siteContent.siteTexts.eventsFacebookText}</p>
            <p className="font-body">📷 {siteContent.siteTexts.eventsInstagramText}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
