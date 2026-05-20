import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, ExternalLink, AlertCircle, Sparkles, Tag, Music, Heart, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { SocialIcon } from "@/components/SocialIcon";

const FB_BLUE = "#1877F2";
const FB_BLUE_DARK = "#0866FF";

/**
 * Embeds the official Facebook Page Plugin so the Promotions page surfaces
 * the latest posts directly from the restaurant's public Facebook Page.
 *
 * The embed is centered, responsively sized to its container (Facebook's
 * Page Plugin caps at 500px wide), and dressed in a Facebook-branded card.
 *
 * Pulls the URL from siteContent.socialLinks.facebook (set in Admin → Settings).
 */
export function FacebookPostsSection() {
  const { siteContent } = useAdmin();
  const fbUrl = (siteContent.socialLinks?.facebook ?? "").trim();
  const hasUrl = fbUrl && fbUrl !== "#" && /facebook\.com/i.test(fbUrl);

  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Responsively size the iframe to fit its parent (cap at 500 — Facebook's max).
  const measureRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(500);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.min(500, Math.max(280, Math.floor(el.clientWidth)));
      setEmbedWidth(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasUrl]);

  // -- Empty state -----------------------------------------------------------
  if (!hasUrl) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-sand-200 shadow-md overflow-hidden">
          <div
            className="px-8 py-10 text-center"
            style={{
              background: `linear-gradient(135deg, ${FB_BLUE} 0%, ${FB_BLUE_DARK} 100%)`,
            }}
          >
            <div className="inline-flex w-16 h-16 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm mb-4">
              <Facebook className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Facebook page not connected
            </h3>
          </div>
          <CardContent className="p-8 text-center space-y-3">
            <p className="font-body text-brown-600 max-w-md mx-auto leading-relaxed">
              An admin can add the page URL in{" "}
              <span className="font-semibold text-brown-800">
                Admin → Settings → Facebook URL
              </span>{" "}
              to display the live timeline here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // -- Plugin embed URL ------------------------------------------------------
  const pluginSrc = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
    href: fbUrl,
    tabs: "timeline",
    width: String(embedWidth),
    height: "700",
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  }).toString()}`;

  // -- Embed view ------------------------------------------------------------
  // Pull other socials so we can showcase them in the desktop sidebar.
  const instagram = (siteContent.socialLinks?.instagram ?? "").trim();
  const twitter = (siteContent.socialLinks?.twitter ?? "").trim();
  const customSocials = (siteContent.customSocials ?? []).filter(
    (s) => s.url && s.url.trim() !== "" && s.url.trim() !== "#"
  );
  const otherSocials: { name: string; url: string; iconKey: any }[] = [];
  if (instagram && instagram !== "#") otherSocials.push({ name: "Instagram", url: instagram, iconKey: "instagram" });
  if (twitter && twitter !== "#") otherSocials.push({ name: "Twitter / X", url: twitter, iconKey: "twitter" });
  for (const s of customSocials) otherSocials.push({ name: s.name || s.iconKey, url: s.url, iconKey: s.iconKey });

  const followBenefits: { icon: typeof Tag; label: string; text: string }[] = [
    { icon: Tag,   label: "Deals & specials", text: "Be first to see promos and limited-time offers." },
    { icon: Music, label: "Live music & events", text: "Gig schedules and event line-ups." },
    { icon: Heart, label: "Rescue updates",  text: "Meet our latest rescue mates and adoption news." },
    { icon: Clock, label: "Holiday hours",    text: "Closure notices and special opening times." },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Branded header card — full width */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div
          className="relative px-6 py-5 sm:px-8 sm:py-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${FB_BLUE} 0%, ${FB_BLUE_DARK} 100%)`,
          }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 ring-1 ring-white/30">
              <Facebook className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-lg sm:text-xl font-bold leading-tight flex items-center gap-1.5">
                Latest from Facebook
                <Sparkles className="h-4 w-4 opacity-80" />
              </p>
              <p className="font-body text-xs sm:text-sm text-white/80 mt-0.5">
                Live timeline straight from our page
              </p>
            </div>
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm ring-1 ring-white/20"
            >
              Visit page <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>

      {/* Desktop: 2-column with embed + sidebar. Mobile: stack. */}
      <div className="grid lg:grid-cols-[500px_minmax(0,1fr)] gap-6 items-start justify-center">
        {/* Embed column — fixed 500px on desktop, flexible on mobile */}
        <div ref={measureRef} className="w-full justify-self-center lg:justify-self-end">
          <Card className="border-sand-200 shadow-md overflow-hidden mx-auto" style={{ maxWidth: 500 }}>
            <CardContent className="p-0 bg-white relative" style={{ minHeight: iframeError ? "auto" : 700 }}>
              {iframeError ? (
                <div className="p-10 text-center space-y-4">
                  <div className="inline-flex w-12 h-12 rounded-full bg-red-50 items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-aussie-burnt-red" />
                  </div>
                  <p className="font-body text-brown-700 leading-relaxed max-w-sm mx-auto">
                    We couldn't load the Facebook timeline. The page may be private,
                    or the URL may not point to a public Facebook <em>Page</em>.
                  </p>
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1877F2] hover:bg-[#0866FF] px-4 py-2 rounded-full transition-colors"
                  >
                    View on Facebook <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <>
                  {/* Skeleton while iframe loads */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-cream-50 to-white animate-pulse">
                      <div className="text-center space-y-3">
                        <Facebook className="h-10 w-10 text-[#1877F2]/40 mx-auto" />
                        <p className="font-body text-sm text-brown-400">
                          Loading posts...
                        </p>
                      </div>
                    </div>
                  )}
                  <iframe
                    key={pluginSrc}
                    title="Facebook Page Timeline"
                    src={pluginSrc}
                    width={embedWidth}
                    height={700}
                    style={{
                      border: "none",
                      overflow: "hidden",
                      display: "block",
                      margin: "0 auto",
                    }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                    onError={() => setIframeError(true)}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — desktop column-2 / mobile below the embed */}
        <aside className="space-y-4 lg:sticky lg:top-24 w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
          {/* Big visit-page CTA */}
          <Card className="border-0 shadow-md overflow-hidden">
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 text-white transition-transform hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${FB_BLUE} 0%, ${FB_BLUE_DARK} 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/20 ring-1 ring-white/30 flex items-center justify-center shrink-0">
                  <Facebook className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-base font-bold leading-tight">
                    Follow us on Facebook
                  </p>
                  <p className="font-body text-xs text-white/85 mt-0.5">
                    Like the page to never miss a post
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-white/80 shrink-0" />
              </div>
            </a>
          </Card>

          {/* Why follow us */}
          <Card className="border-sand-200 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <p className="font-heading text-sm font-bold text-brown-800 uppercase tracking-wider">
                What you'll see
              </p>
              <ul className="space-y-3">
                {followBenefits.map(({ icon: Icon, label, text }) => (
                  <li key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aussie-orange/10 text-aussie-orange flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-brown-800 leading-tight">
                        {label}
                      </p>
                      <p className="font-body text-xs text-brown-500 leading-snug mt-0.5">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Other socials */}
          {otherSocials.length > 0 && (
            <Card className="border-sand-200 shadow-sm">
              <CardContent className="p-5 space-y-3">
                <p className="font-heading text-sm font-bold text-brown-800 uppercase tracking-wider">
                  Find us elsewhere
                </p>
                <div className="flex flex-wrap gap-2">
                  {otherSocials.map((s) => (
                    <a
                      key={`${s.iconKey}-${s.url}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-cream-100 hover:bg-aussie-orange hover:text-white text-brown-700 text-sm font-medium transition-colors border border-sand-200"
                    >
                      <SocialIcon iconKey={s.iconKey} size={16} />
                      <span className="text-xs">{s.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footnote */}
          <p className="text-xs text-brown-400 leading-relaxed text-center lg:text-left">
            Posts loaded directly from Facebook. Only public Facebook{" "}
            <em>Pages</em> (not personal profiles) can be embedded.
          </p>
        </aside>
      </div>
    </div>
  );
}
