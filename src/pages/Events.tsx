import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, Users, Heart, Coffee, Store, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const ALL_HOLIDAYS: { key: string; name: string; month: number; day: number; }[] = [
  { key: "ph-newyear",            name: "New Year's Day",               month: 0,  day: 1  },
  { key: "ph-edsa",               name: "EDSA People Power Revolution",  month: 1,  day: 25 },
  { key: "valentines",            name: "Valentine's Day",              month: 1,  day: 14 },
  { key: "ph-chineseny",          name: "Chinese New Year",             month: 1,  day: 10 },
  { key: "ph-araw-ng-kagitingan", name: "Araw ng Kagitingan (Day of Valor)", month: 3, day: 9 },
  { key: "ph-maundy",             name: "Maundy Thursday",              month: 3,  day: 17 },
  { key: "ph-goodfriday",         name: "Good Friday",                  month: 3,  day: 18 },
  { key: "ph-blacksaturday",      name: "Black Saturday",               month: 3,  day: 19 },
  { key: "ph-eidalfitr",          name: "Eid'l Fitr",                   month: 3,  day: 10 },
  { key: "ph-labor",              name: "Labor Day",                    month: 4,  day: 1  },
  { key: "mothers-day",           name: "Mother's Day",                 month: 4,  day: 11 },
  { key: "ph-independence",       name: "Independence Day",             month: 5,  day: 12 },
  { key: "ph-eidaladha",          name: "Eid'l Adha",                   month: 5,  day: 28 },
  { key: "fathers-day",           name: "Father's Day",                 month: 5,  day: 15 },
  { key: "ph-ninoy",              name: "Ninoy Aquino Day",             month: 7,  day: 21 },
  { key: "ph-nationalheroes",     name: "National Heroes Day",          month: 7,  day: 25 },
  { key: "ph-eidalmawlid",        name: "Mawlid (Prophet's Birthday)",  month: 8,  day: 15 },
  { key: "halloween",             name: "Halloween",                    month: 9,  day: 31 },
  { key: "ph-allsaints",          name: "All Saints' Day",              month: 10, day: 1  },
  { key: "ph-allsouls",           name: "All Souls' Day",               month: 10, day: 2  },
  { key: "ph-bonifacio",          name: "Bonifacio Day",                month: 10, day: 30 },
  { key: "thanksgiving",          name: "Thanksgiving",                 month: 10, day: 28 },
  { key: "ph-rizal",              name: "Rizal Day",                    month: 11, day: 30 },
  { key: "ph-christmas-eve",      name: "Christmas Eve",                month: 11, day: 24 },
  { key: "ph-christmas",          name: "Christmas Day",                month: 11, day: 25 },
  { key: "ph-newyeareve",         name: "New Year's Eve",               month: 11, day: 31 },
];

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

function EventTypeBadge({ type, typeImages, size = "sm" }: { type: string; typeImages: Record<string, string>; size?: "sm" | "lg" }) {
  const img = typeImages[type];
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

/* Lightbox Modal for event images */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-2xl object-cover"
          style={{ aspectRatio: "2/3", maxHeight: "85vh", width: "auto" }}
        />
      </div>
    </div>
  );
}

export default function Events() {
  const { siteContent, loading } = useAdmin();
  const eventTypeImages: Record<string, string> = (siteContent as any).eventTypeImages ?? {};
  const holidayStatuses: Record<string, boolean> = (siteContent as any).holidayStatuses ?? {};
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

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
  const thisMonthHolidays = ALL_HOLIDAYS.filter((h) => h.month === currentMonth);

  return (
    <Layout>
      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}

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

      {/* Holiday Hours — this month only */}
      {thisMonthHolidays.length > 0 && (
        <section className="py-10 px-4 bg-amber-50 border-b border-amber-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Store className="h-6 w-6 text-aussie-orange" />
              <h2 className="font-heading text-2xl font-bold text-brown-800">
                Holiday Hours — {MONTH_NAMES[currentMonth]}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {thisMonthHolidays.map((holiday) => {
                const statusKey = `${currentYear}-${holiday.key}`;
                const isOpen = holidayStatuses[statusKey] !== false;
                return (
                  <div
                    key={holiday.key}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                      isOpen ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div>
                      <p className="font-body font-semibold text-brown-800 text-sm">{holiday.name}</p>
                      <p className="font-body text-xs text-brown-500">
                        {new Date(currentYear, holiday.month, holiday.day).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <span className={`font-body text-xs font-bold px-2.5 py-1 rounded-full ${
                      isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
              {thisWeekEvents.map((event) => (
                <Card key={event.id} className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  {event.imageUrl && (
                    <div
                      className="cursor-pointer overflow-hidden"
                      onClick={() => setLightboxImage({ src: event.imageUrl!, alt: event.title })}
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full object-cover hover:scale-105 transition-transform duration-300"
                        style={{ aspectRatio: "2/3" }}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      {!event.imageUrl && (
                        <EventTypeBadge type={event.type} typeImages={eventTypeImages} size="sm" />
                      )}
                      <Badge className="bg-aussie-orange text-white font-body ml-auto">This Week</Badge>
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
              ))}
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
              {comingSoonEvents.map((event) => (
                <Card key={event.id} className="border-sand-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  {event.imageUrl && (
                    <div
                      className="cursor-pointer overflow-hidden"
                      onClick={() => setLightboxImage({ src: event.imageUrl!, alt: event.title })}
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full object-cover hover:scale-105 transition-transform duration-300"
                        style={{ aspectRatio: "2/3" }}
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      {!event.imageUrl && (
                        <EventTypeBadge type={event.type} typeImages={eventTypeImages} size="lg" />
                      )}
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
              ))}
            </div>
          )}
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
