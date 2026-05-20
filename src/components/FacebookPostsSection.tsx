import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, ExternalLink, AlertCircle } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

/**
 * Embeds the official Facebook Page Plugin so the Promotions page surfaces
 * the latest posts directly from the restaurant's public Facebook Page.
 *
 * Pulls the URL from siteContent.socialLinks.facebook (set in Admin → Settings).
 */
export function FacebookPostsSection() {
  const { siteContent } = useAdmin();
  const fbUrl = (siteContent.socialLinks?.facebook ?? "").trim();
  const hasUrl = fbUrl && fbUrl !== "#" && /facebook\.com/i.test(fbUrl);

  const [iframeError, setIframeError] = useState(false);

  if (!hasUrl) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-sand-200 shadow-md">
          <CardContent className="p-10 text-center space-y-4">
            <Facebook className="h-14 w-14 text-[#1877F2] mx-auto" />
            <h3 className="font-heading text-2xl font-bold text-brown-800">
              Facebook page not configured
            </h3>
            <p className="font-body text-brown-600 max-w-md mx-auto leading-relaxed">
              The Facebook page URL hasn't been set yet. An admin can add it from
              the Admin panel under <span className="font-semibold">Settings → Facebook URL</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Build the Page Plugin embed URL.
  const pluginSrc = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
    href: fbUrl,
    tabs: "timeline",
    width: "500",
    height: "700",
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  }).toString()}`;

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center">
            <Facebook className="h-5 w-5 text-white" fill="currentColor" />
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-brown-800 leading-tight">
              Latest from Facebook
            </p>
            <p className="font-body text-xs text-brown-500">
              Live timeline from our Facebook page
            </p>
          </div>
        </div>
        <a
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1877F2] hover:underline"
        >
          Open on Facebook <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Embed */}
      <Card className="border-sand-200 shadow-md overflow-hidden">
        <CardContent className="p-0 bg-white flex justify-center">
          {iframeError ? (
            <div className="p-10 text-center space-y-3 max-w-md">
              <AlertCircle className="h-10 w-10 text-aussie-burnt-red mx-auto" />
              <p className="font-body text-brown-700">
                We couldn't load the Facebook timeline here. The page may be private or
                the URL may not point to a public Facebook Page.
              </p>
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1877F2] hover:underline"
              >
                View posts on Facebook <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <iframe
              key={pluginSrc}
              title="Facebook Page Timeline"
              src={pluginSrc}
              width="500"
              height="700"
              style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
              onError={() => setIframeError(true)}
              className="w-full"
            />
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-brown-400">
        Posts are loaded directly from Facebook. Tip: only public Facebook
        <em> Pages</em> (not personal profiles) can be embedded.
      </p>
    </div>
  );
}
