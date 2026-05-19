import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

export function Footer() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  const { siteContent, login } = useAdmin();

  const handleAdminClick = () => {
    setShowLoginDialog(true);
    setError("");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login();
    } catch (err: any) {
      const code = err?.code ?? "";
      const msg = err?.message ?? "";
      if (code === "auth/unauthorized-domain") {
        setError("This domain is not authorised in Firebase. Add it to Authentication → Settings → Authorized domains in the Firebase Console.");
      } else {
        setError(code ? `${code}: ${msg}` : msg || "Sign-in failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brown-800 text-cream-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {siteContent.logoImage ? (
                <img
                  src={siteContent.logoImage}
                  alt={`${siteContent.siteTexts.siteName} Logo`}
                  className="h-8 w-8 object-cover rounded"
                />
              ) : (
                <Heart className="h-8 w-8 text-aussie-orange" />
              )}
              <span
                className={`font-heading text-2xl font-bold transition-colors ${isContactPage ? "cursor-pointer hover:text-aussie-orange" : "cursor-default"}`}
                onClick={isContactPage ? handleAdminClick : undefined}
              >
                {siteContent.siteTexts.siteName}
              </span>
            </div>
            <p className="font-body text-cream-200 max-w-xs">
              {siteContent.siteTexts.footerTagline}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">
              {siteContent.siteTexts.footerContactTitle}
            </h3>
            <div className="space-y-2 font-body text-cream-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-aussie-orange" />
                <span>{siteContent.siteTexts.homeAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-aussie-orange" />
                <span>{siteContent.siteTexts.homePhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-aussie-orange" />
                <span>{siteContent.siteTexts.homeEmail}</span>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">
              {siteContent.siteTexts.footerHoursSocialTitle}
            </h3>
            <div className="space-y-2 font-body text-cream-200">
              <div>{siteContent.siteTexts.footerMondayThursday}</div>
              <div>{siteContent.siteTexts.footerFridaySaturday}</div>
              <div>{siteContent.siteTexts.footerSunday}</div>
            </div>
            <div className="flex space-x-4 pt-2">
              {siteContent.socialLinks?.facebook && (
                <a href={siteContent.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-6 w-6 text-cream-200 hover:text-aussie-orange cursor-pointer transition-colors" />
                </a>
              )}
              {siteContent.socialLinks?.instagram && (
                <a href={siteContent.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-6 w-6 text-cream-200 hover:text-aussie-orange cursor-pointer transition-colors" />
                </a>
              )}
              {siteContent.socialLinks?.twitter && (
                <a href={siteContent.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-6 w-6 text-cream-200 hover:text-aussie-orange cursor-pointer transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-8 pt-8 text-center">
          <p className="font-body text-cream-300">
            {siteContent.siteTexts.footerCopyright}
          </p>
        </div>
      </div>

      {/* Admin Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-brown-800">
              Admin Access
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Sign in with your authorised Google account to access the admin panel.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm font-medium"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? "Redirecting to Google…" : "Sign in with Google"}
            </Button>

            {error && (
              <p className="text-red-600 text-sm text-center leading-snug">{error}</p>
            )}

            <Button
              variant="ghost"
              onClick={() => { setShowLoginDialog(false); setError(""); }}
              className="w-full text-gray-400 hover:text-gray-600"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
