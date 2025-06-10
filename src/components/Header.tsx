import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/AdminContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { siteContent } = useAdmin();

  const navigation = [
    { name: siteContent.siteTexts.headerNavHome, href: "/" },
    { name: siteContent.siteTexts.headerNavMenu, href: "/menu" },
    { name: siteContent.siteTexts.headerNavEvents, href: "/events" },
    { name: siteContent.siteTexts.headerNavPromotions, href: "/promotions" },
    { name: siteContent.siteTexts.headerNavAbout, href: "/about" },
    { name: siteContent.siteTexts.headerNavDogRescue, href: "/dog-rescue" },
    { name: siteContent.siteTexts.headerNavContact, href: "/contact" },
  ];

  return (
    <header className="bg-cream-50 shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {siteContent.logoImage ? (
              <img
                src={siteContent.logoImage}
                alt="KINGAROOS Logo"
                className="h-8 w-8 object-cover rounded"
              />
            ) : (
              <Heart className="h-8 w-8 text-aussie-orange" />
            )}
            <span className="font-heading text-2xl font-bold text-brown-800">
              {siteContent.siteTexts.siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "font-body text-sm font-medium transition-colors hover:text-aussie-orange",
                  location.pathname === item.href
                    ? "text-aussie-orange border-b-2 border-aussie-orange pb-1"
                    : "text-brown-700",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cream-100 rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-aussie-orange text-white"
                      : "text-brown-700 hover:bg-sand-100 hover:text-aussie-orange",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
