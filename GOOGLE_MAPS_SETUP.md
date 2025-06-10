# Google Maps API Setup for KINGAROOS Website

## Getting Your Google Maps API Key

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" and then "New Project"
3. Name your project (e.g., "KINGAROOS Restaurant Map")
4. Click "Create"

### Step 2: Enable Google Maps JavaScript API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"

### Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### Step 4: Secure Your API Key (Recommended)

1. Click on your API key to edit it
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your website domains (e.g., `localhost:*`, `yourdomainname.com/*`)
4. Under "API restrictions", select "Restrict key"
5. Choose "Maps JavaScript API" from the list
6. Click "Save"

### Step 5: Add API Key to Your Project

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Restart your development server

## Current Map Configuration

The map is set to display at coordinates:

- **Latitude:** 9°14'50"N (9.247222°)
- **Longitude:** 123°17'49"E (123.296944°)

These coordinates can be changed through the admin panel under:
Contact Page → Contact Map Latitude / Contact Map Longitude

## Troubleshooting

### Map shows error message

- Check that your API key is correctly set in the `.env` file
- Verify the API key has Maps JavaScript API enabled
- Ensure your domain is whitelisted in the API key restrictions

### Map doesn't load

- Check browser console for error messages
- Verify internet connection
- Make sure the Google Cloud billing account is set up (required for API usage)

### Billing Information

- Google Maps API requires a billing account after the free tier
- Free tier includes: 28,500 map loads per month
- Check [Google Maps Platform pricing](https://cloud.google.com/maps-platform/pricing) for details

## Map Features

The integrated map includes:

- 🦘 Custom KINGAROOS marker with restaurant branding
- 📍 Info window with restaurant details
- 🎨 Custom styling to match website theme
- 📱 Responsive design for mobile devices
- 🐶 Dog-friendly messaging in info popup

## Admin Controls

Through the admin panel, you can edit:

- Map coordinates (latitude/longitude)
- Restaurant name displayed on map
- Address shown in info window
- All other location-related text content
