import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapPin, AlertCircle } from "lucide-react";

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  restaurantName?: string;
  address?: string;
}

export function GoogleMap({
  lat,
  lng,
  zoom = 15,
  height = "384px",
  restaurantName = "KINGAROOS Restaurant",
  address = "Restaurant Location",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get API key from environment variable
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          setMapError(
            "Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.",
          );
          return;
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places", "geometry"],
        });

        const google = await loader.load();

        if (!mapRef.current) return;

        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: zoom,
          styles: [
            // Custom styling to match our theme
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add custom marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: restaurantName,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#E67E22", // aussie-orange
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 3,
          },
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: 'Lato', sans-serif; padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #8B4513; font-weight: bold; font-size: 16px;">
                🦘 ${restaurantName}
              </h3>
              <p style="margin: 0 0 8px 0; color: #6B5B73; font-size: 14px;">
                ${address}
              </p>
              <p style="margin: 0; color: #E67E22; font-size: 12px; font-weight: 500;">
                🐶 Dog-friendly • Great Food • Helping Paws
              </p>
            </div>
          `,
        });

        // Show info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        // Auto-open info window on load
        infoWindow.open(map, marker);

        setMapLoaded(true);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setMapError(
          "Failed to load Google Maps. Please check your internet connection and API configuration.",
        );
      }
    };

    initMap();
  }, [lat, lng, zoom, restaurantName, address]);

  if (mapError) {
    return (
      <div
        className="w-full bg-sand-200 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center space-y-4 p-8">
          <AlertCircle className="h-16 w-16 text-aussie-orange mx-auto" />
          <div className="space-y-2 max-w-md">
            <p className="font-body text-brown-600 font-semibold">
              Map Loading Error
            </p>
            <p className="font-body text-brown-500 text-sm">{mapError}</p>
            <div className="mt-4 p-3 bg-cream-100 rounded border border-sand-300">
              <p className="font-body text-brown-600 text-xs">
                <strong>Coordinates:</strong> {lat}°N, {lng}°E
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div
        className="w-full bg-sand-200 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-aussie-orange mx-auto animate-pulse" />
          <div className="space-y-2">
            <p className="font-body text-brown-600 font-semibold">
              Loading Interactive Map...
            </p>
            <p className="font-body text-brown-500 text-sm">
              Connecting to Google Maps
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full rounded-lg border-2 border-sand-200"
      style={{ height }}
    />
  );
}
