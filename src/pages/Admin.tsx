import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";

export function Footer() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Directly use the context. The provider handles defaults, loading, and state updates.
  const { siteContent, login } = useAdmin();

  const handleAdminClick = () => {
    setShowLoginDialog(true);
    setError("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      const success = await login(password);
      if (success) {
        setShowLoginDialog(false);
        navigate("/admin");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
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
                className="font-heading text-2xl font-bold cursor-pointer hover:text-aussie-orange transition-colors"
                onClick={handleAdminClick}
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
            <br />
          </p>
        </div>
      </div>

      {/* Admin Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-brown-800">
              {siteContent.siteTexts.adminLoginTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-brown-800">
                {siteContent.siteTexts.adminPasswordLabel}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mt-1"
                placeholder={siteContent.siteTexts.adminPasswordPlaceholder}
                autoFocus
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleLogin}
                className="flex-1 bg-aussie-orange hover:bg-aussie-burnt-red"
              >
                {siteContent.siteTexts.adminLoginButton}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowLoginDialog(false)}
                className="flex-1"
              >
                {siteContent.siteTexts.adminCancelButton}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
