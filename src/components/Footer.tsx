import { Heart, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brown-800 text-cream-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-aussie-orange" />
              <span className="font-heading text-2xl font-bold">KINGAROOS</span>
            </div>
            <p className="font-body text-cream-200 max-w-xs">
              Great Food. Good Vibes. Helping Paws. Every meal helps rescue a
              dog in need.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 font-body text-cream-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-aussie-orange" />
                <span>123 Outback Lane, Sydney, NSW 2000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-aussie-orange" />
                <span>(02) 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-aussie-orange" />
                <span>hello@kingaroos.com.au</span>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">
              Hours & Social
            </h3>
            <div className="space-y-2 font-body text-cream-200">
              <div>Mon-Thu: 11am - 9pm</div>
              <div>Fri-Sat: 11am - 10pm</div>
              <div>Sunday: 10am - 8pm</div>
            </div>
            <div className="flex space-x-4 pt-2">
              <Facebook className="h-6 w-6 text-cream-200 hover:text-aussie-orange cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-cream-200 hover:text-aussie-orange cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-8 pt-8 text-center">
          <p className="font-body text-cream-300">
            © 2024 KINGAROOS. All rights reserved.
            <br />
          </p>
        </div>
      </div>
    </footer>
  );
}
