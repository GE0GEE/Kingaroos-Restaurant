import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, RefreshCw } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

interface Review {
  authorAttribution: { displayName: string; photoUri?: string };
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription: string;
}

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Kingaroo%27s+Seaview+Resto+Bar/@9.2472567,123.2949989,15z/data=!4m8!3m7!1s0x33ab69f7f93062cf:0xedaf9d009a9047d0!8m2!3d9.2472567!4d123.2971426!9m1!1b1";

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-gray-200" fill="currentColor" strokeWidth={0} />
            {(filled || half) && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "50%" : "100%" }}>
                <Star size={size} className="text-[#FBBC04]" fill="currentColor" strokeWidth={0} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

const POPULAR_TIMES: Record<string, number[]> = {
  Sun: [0,0,0,0,0,0,0,0,0,10,40,65,80,85,75,65,70,80,75,60,45,25,10,0],
  Mon: [0,0,0,0,0,0,0,0,0,0,20,35,55,60,50,40,45,65,75,60,40,20,5,0],
  Tue: [0,0,0,0,0,0,0,0,0,0,15,30,50,55,45,35,40,60,70,55,35,15,5,0],
  Wed: [0,0,0,0,0,0,0,0,0,0,20,35,55,60,50,40,45,65,75,60,40,20,5,0],
  Thu: [0,0,0,0,0,0,0,0,0,0,20,40,60,65,55,45,55,75,85,70,50,25,10,0],
  Fri: [0,0,0,0,0,0,0,0,0,0,25,45,65,70,60,55,70,90,100,85,65,40,20,5],
  Sat: [0,0,0,0,0,0,0,0,0,10,30,55,75,85,80,75,85,95,100,90,70,50,30,10],
};
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function PopularTimes() {
  const todayKey = DAYS[new Date().getDay()];
  const [selected, setSelected] = useState(todayKey);
  const hours = POPULAR_TIMES[selected];
  const now = new Date().getHours();
  const label = (pct: number) => {
    if (pct === 0) return "";
    if (pct < 30) return "Not too busy";
    if (pct < 60) return "Moderately busy";
    if (pct < 85) return "Usually busy";
    return "As busy as it gets";
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-heading text-lg font-bold text-brown-800">Popular Times</h4>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
          className="text-xs text-aussie-orange hover:underline flex items-center gap-1">
          Live data <ExternalLink size={10} />
        </a>
      </div>
      <div className="flex gap-1 mb-4 flex-wrap">
        {DAYS.map((d) => (
          <button key={d} onClick={() => setSelected(d)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
              selected === d ? "bg-aussie-orange text-white" : "bg-sand-100 text-brown-600 hover:bg-sand-200"
            }`}>
            {d}
          </button>
        ))}
      </div>
      <div className="flex items-end gap-[3px] h-14 mb-1">
        {hours.map((pct, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div className={`rounded-sm transition-all ${
              selected === todayKey && i === now ? "bg-aussie-orange" : pct > 0 ? "bg-aussie-orange/35" : ""
            }`} style={{ height: `${pct}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-brown-400">
        <span>6a</span><span>9a</span><span>12p</span><span>3p</span><span>6p</span><span>9p</span><span>12a</span>
      </div>
      {selected === todayKey && label(hours[now]) && (
        <p className="mt-2 text-xs font-semibold text-aussie-orange">{label(hours[now])} right now</p>
      )}
      <p className="mt-1 text-[10px] text-brown-400">Typical visit patterns · not real-time</p>
    </div>
  );
}

const STATIC_REVIEWS: Review[] = [
  {
    authorAttribution: { displayName: "Rea Anne" },
    rating: 5,
    text: { text: "Different than anything else in the area — it brings a much needed change of venue. The food is very good and the sea wind and deck are perfect for dining." },
    relativePublishTimeDescription: "a month ago",
  },
  {
    authorAttribution: { displayName: "Juvie L." },
    rating: 5,
    text: { text: "The food, music and service is always good here. Love the seaview atmosphere! Will definitely come back." },
    relativePublishTimeDescription: "2 months ago",
  },
  {
    authorAttribution: { displayName: "Mark D." },
    rating: 4,
    text: { text: "Nice service and homey atmosphere. Great spot after visiting the area. The staff is very welcoming." },
    relativePublishTimeDescription: "3 months ago",
  },
];

export function GoogleReviewsSection() {
  const { siteContent } = useAdmin();
  const apiKey: string = siteContent.siteTexts?.googleApiKey ?? "";
  const placeId: string = siteContent.siteTexts?.googlePlaceId ?? "ChIJz2IwupfmnzMR0EeQmgCd79o";

  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [rating, setRating] = useState(4.3);
  const [count, setCount] = useState(39);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!apiKey) return;
    setLoading(true);
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&languageCode=en`, {
      headers: { "X-Goog-Api-Key": apiKey, "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.rating) setRating(data.rating);
        if (data.userRatingCount) setCount(data.userRatingCount);
        if (data.reviews?.length) setReviews(data.reviews.slice(0, 3));
        setLive(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [apiKey, placeId]);

  const ratingDist: Record<number, number> = { 5: 65, 4: 20, 3: 8, 2: 4, 1: 3 };

  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-heading text-4xl font-bold text-center text-brown-800 mb-2">What Our Guests Say</h2>
        <p className="font-body text-center text-brown-500 mb-12">Reviews from Google</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  <span className="text-xs font-semibold text-brown-500 uppercase tracking-wide">
                    Google Reviews {live && <span className="text-green-600 normal-case">· Live</span>}
                  </span>
                </div>
                <div className="flex items-end gap-3 mb-4">
                  <span className="font-heading text-6xl font-bold text-brown-800 leading-none">{rating.toFixed(1)}</span>
                  <div className="pb-1">
                    <StarRow rating={rating} size={20} />
                    <p className="text-xs text-brown-400 mt-1">{count} reviews</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-brown-500 w-3">{star}</span>
                      <Star size={10} className="text-[#FBBC04]" fill="currentColor" strokeWidth={0} />
                      <div className="flex-1 bg-sand-100 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-[#FBBC04] rounded-full" style={{ width: `${ratingDist[star]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-aussie-orange hover:bg-aussie-orange/90 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors">
                  Write a Review <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>
            <Card className="border-sand-200 shadow-lg">
              <CardContent className="p-6"><PopularTimes /></CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <RefreshCw className="h-6 w-6 text-aussie-orange animate-spin" />
              </div>
            ) : (
              <>
                {!live && (
                  <p className="text-xs text-brown-400 italic mb-1">
                    Showing sample reviews · add your Google API key in Admin → Settings to show live reviews.
                  </p>
                )}
                {reviews.map((r, i) => (
                  <Card key={i} className="border-sand-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        {r.authorAttribution.photoUri ? (
                          <img src={r.authorAttribution.photoUri} alt={r.authorAttribution.displayName}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-aussie-orange flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{r.authorAttribution.displayName.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="font-semibold text-brown-800 text-sm">{r.authorAttribution.displayName}</p>
                            <span className="text-xs text-brown-400">{r.relativePublishTimeDescription}</span>
                          </div>
                          <StarRow rating={r.rating} size={13} />
                          {r.text && (
                            <p className="mt-2 font-body text-sm text-brown-600 leading-relaxed line-clamp-4">{r.text.text}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-aussie-orange font-semibold hover:underline pt-2">
                  See all reviews on Google <ExternalLink size={14} />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
