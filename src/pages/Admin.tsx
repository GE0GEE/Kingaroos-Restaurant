import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";
import { promotionCategories } from "@/components/siteConfig.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Trash2,
  Edit,
  Plus,
  Save,
  LogOut,
  Type,
  DatabaseZap,
  Loader2,
} from "lucide-react";
import type { Dog, MenuItem, Event, Promotion, PromotionCategoryKey } from "@/contexts/AdminContext";
import imageCompression from "browser-image-compression";

// --- HELPER FUNCTION FOR IMAGE COMPRESSION AND CONVERSION ---
const handleFileAndCompress = async (file: File): Promise<string> => {
  console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

  const options = {
    maxSizeMB: 0.9,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.9,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  } catch (error) {
    console.error("Image compression failed:", error);
    throw error;
  }
};

// --- REUSABLE IMAGE INPUT COMPONENT ---
interface ImageInputProps {
  label: string;
  value: string | undefined;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  isProcessing: boolean;
}

function ImageInput({ label, value, onFileChange, onUrlChange, onRemove, isProcessing }: ImageInputProps) {
  const [urlInput, setUrlInput] = useState(value?.startsWith("http") ? value : "");
  const [imgError, setImgError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  useEffect(() => {
    if (value?.startsWith("http")) setUrlInput(value);
    setImgError(false);
    setImgKey((k) => k + 1);
  }, [value]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setImgError(false);
    onUrlChange(e);
  };

  // Proxy the image through a CORS-friendly service to bypass hotlink blocks
  const proxiedSrc = value?.startsWith("http")
    ? `https://images.weserv.nl/?url=${encodeURIComponent(value)}&w=400&output=webp`
    : value ?? "";

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="file" accept="image/*" onChange={onFileChange} disabled={isProcessing} />
      <Input type="text" placeholder="Or paste image URL" value={urlInput} onChange={handleUrlChange} />
      {value && (
        <div className="relative mt-2">
          {imgError ? (
            <div className="w-full h-32 rounded-md bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center px-3 gap-1">
              <p className="text-xs font-semibold text-red-500">Could not preview image</p>
              <p className="text-[11px] text-gray-500 leading-snug">
                The URL may be private or broken. It will still be saved — check the live site to confirm it displays correctly.
              </p>
            </div>
          ) : (
            <img
              key={imgKey}
              src={proxiedSrc}
              alt={label}
              className="w-full h-32 object-cover rounded-md"
              onError={() => setImgError(true)}
            />
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-7 w-7"
            onClick={() => { onRemove(); setUrlInput(""); setImgError(false); }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}


// --- FORM COMPONENTS (Updated to use ImageInput) ---

function DogForm({ dog, onSubmit }: { dog: Partial<Dog>; onSubmit: (dog: Partial<Dog>) => void; }) {
  const [formData, setFormData] = useState(dog);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (field: "beforeImage" | "afterImage", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const base64String = await handleFileAndCompress(file);
        setFormData((prev) => ({ ...prev, [field]: base64String }));
      } catch (error) {
        alert("Image processing failed. Please try a different image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {isUploading && <div className="flex items-center justify-center text-sm text-blue-600"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing image...</div>}
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Name</Label><Input value={formData.name || ""} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} /></div>
        <div><Label>Breed</Label><Input value={formData.breed || ""} onChange={(e) => setFormData((prev) => ({ ...prev, breed: e.target.value }))} /></div>
      </div>
      <div><Label>Age</Label><Input type="number" value={formData.age || ""} onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))} /></div>
      <div><Label>Personality</Label><Textarea value={formData.personality || ""} onChange={(e) => setFormData((prev) => ({ ...prev, personality: e.target.value }))} /></div>
      <div><Label>Rescue Story</Label><Textarea value={formData.rescueStory || ""} onChange={(e) => setFormData((prev) => ({ ...prev, rescueStory: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <ImageInput
          label="Before Image"
          value={formData.beforeImage}
          onFileChange={(e) => handleImageUpload("beforeImage", e)}
          onUrlChange={(e) => setFormData((prev) => ({ ...prev, beforeImage: e.target.value }))}
          onRemove={() => setFormData((prev) => ({ ...prev, beforeImage: "" }))}
          isProcessing={isUploading}
        />
        <ImageInput
          label="After Image"
          value={formData.afterImage}
          onFileChange={(e) => handleImageUpload("afterImage", e)}
          onUrlChange={(e) => setFormData((prev) => ({ ...prev, afterImage: e.target.value }))}
          onRemove={() => setFormData((prev) => ({ ...prev, afterImage: "" }))}
          isProcessing={isUploading}
        />
      </div>
      <Button onClick={() => onSubmit(formData)} className="w-full" disabled={isUploading}>Save Dog</Button>
    </div>
  );
}

function MenuItemForm({ item, onSubmit }: { item: Partial<MenuItem>; onSubmit: (item: Partial<MenuItem>) => void; }) {
  const [formData, setFormData] = useState(item);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const base64String = await handleFileAndCompress(file);
        setFormData((prev) => ({ ...prev, image: base64String }));
      } catch (error) {
        alert("Image processing failed. Please try a different image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {isUploading && <div className="flex items-center justify-center text-sm text-blue-600"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing image...</div>}
      <div><Label>Name</Label><Input value={formData.name || ""} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} /></div>
      <div><Label>Description</Label><Textarea value={formData.description || ""} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Price</Label><Input value={formData.price || ""} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))} /></div>
        <div><Label>Category</Label><Select value={formData.category || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as MenuItem["category"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="starters">Starters</SelectItem><SelectItem value="mains">Mains</SelectItem><SelectItem value="desserts">Desserts</SelectItem><SelectItem value="drinks">Drinks</SelectItem></SelectContent></Select></div>
      </div>
      <div className="flex items-center space-x-2"><Checkbox id="featured" checked={formData.featured || false} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked as boolean }))} /><Label htmlFor="featured">Featured Item</Label></div>
      <ImageInput
        label="Item Image"
        value={formData.image}
        onFileChange={handleImageUpload}
        onUrlChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
        onRemove={() => setFormData((prev) => ({ ...prev, image: "" }))}
        isProcessing={isUploading}
      />
      <Button onClick={() => onSubmit(formData)} className="w-full" disabled={isUploading}>Save Menu Item</Button>
    </div>
  );
}

function EventForm({ event, onSubmit }: { event: Partial<Event>; onSubmit: (event: Partial<Event>) => void; }) {
  const [formData, setFormData] = useState(event);
  return (
    <div className="space-y-4">
      <div><Label>Title</Label><Input value={formData.title || ""} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Date</Label><Input value={formData.date || ""} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} /></div>
        <div><Label>Time</Label><Input value={formData.time || ""} onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))} /></div>
      </div>
      <div><Label>Description</Label><Textarea value={formData.description || ""} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Type</Label><Select value={formData.type || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as Event["type"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="music">Music</SelectItem><SelectItem value="dogs">Dogs</SelectItem><SelectItem value="family">Family</SelectItem><SelectItem value="special">Special</SelectItem><SelectItem value="food">Food</SelectItem></SelectContent></Select></div>
        <div><Label>Category</Label><Select value={formData.category || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as Event["category"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="thisWeek">This Week</SelectItem><SelectItem value="comingSoon">Coming Soon</SelectItem></SelectContent></Select></div>
      </div>
      <Button onClick={() => onSubmit(formData)} className="w-full">Save Event</Button>
    </div>
  );
}

function PromotionForm({ promotion, onSubmit }: { promotion: Partial<Promotion>; onSubmit: (promotion: Partial<Promotion>) => void; }) {
  const [formData, setFormData] = useState(promotion);
  return (
    <div className="space-y-4">
      <div><Label>Title</Label><Input value={formData.title || ""} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} /></div>
      <div><Label>Subtitle</Label><Input value={formData.subtitle || ""} onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))} /></div>
      <div><Label>Details</Label><Input value={formData.details || ""} onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))} /></div>
      <div><Label>Description</Label><Textarea value={formData.description || ""} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} /></div>
      <div>
        <Label>Category</Label>
        <Select
          value={formData.category || ""}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as PromotionCategoryKey }))}
        >
          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
          <SelectContent>
            {Object.entries(promotionCategories).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => onSubmit(formData)} className="w-full">Save Promotion</Button>
    </div>
  );
}

// --- MAIN ADMIN COMPONENT ---

export default function Admin() {
  const navigate = useNavigate();
  const {
    logout, siteContent, updateSiteContent,
    addDog, updateDog, deleteDog,
    addMenuItem, updateMenuItem, deleteMenuItem,
    addEvent, updateEvent, deleteEvent,
    addPromotion, updatePromotion, deletePromotion,
  } = useAdmin();

  const [editingTexts, setEditingTexts] = useState(siteContent.siteTexts);
  const [editingImages, setEditingImages] = useState(siteContent.aboutImages);
  const [isProcessing, setIsProcessing] = useState(false);

  // B5 FIX: Local state for the Settings tab's social links.
  // Previously each <Input> called updateSiteContent() on every keystroke,
  // which fired a Firestore write on every character typed (O(n) writes per
  // field).  Now changes are buffered in editingSettings and only written to
  // Firestore when the admin explicitly clicks "Save Settings".
  const [editingSettings, setEditingSettings] = useState(siteContent.socialLinks);

  useEffect(() => {
    setEditingTexts(siteContent.siteTexts);
    setEditingImages(siteContent.aboutImages);
    // B5 FIX: Keep local settings state in sync when Firestore pushes an
    // update (e.g. another admin session saved different values).
    setEditingSettings(siteContent.socialLinks);
  }, [siteContent]);

  const handleLogout = () => { logout(); navigate("/"); };

  const handleSaveTexts = async () => {
    try {
      await updateSiteContent({ siteTexts: editingTexts });
      alert("Site texts updated successfully!");
    } catch (error: any) {
      alert(`Error saving texts: ${error.message}`);
    }
  };

  const handleSaveImages = async () => {
    try {
      await updateSiteContent({ aboutImages: editingImages });
      alert("About page images updated successfully!");
    } catch (error: any) {
      alert(`Error saving images: ${error.message}`);
    }
  };

  // B5 FIX: Dedicated save handler for the Settings tab — writes to Firestore
  // once on explicit user action rather than on every keystroke.
  const handleSaveSettings = async () => {
    try {
      await updateSiteContent({ socialLinks: editingSettings });
      alert("Settings saved successfully!");
    } catch (error: any) {
      alert(`Error saving settings: ${error.message}`);
    }
  };

  const handleGenericImageUpload = (updateFunction: (value: string) => Promise<void>) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const base64String = await handleFileAndCompress(file);
      await updateFunction(base64String);
      alert("Image updated!");
    } catch (error: any) {
      alert(`Error processing image: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAboutFormImageUpload = (field: keyof typeof editingImages) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const base64String = await handleFileAndCompress(file);
        setEditingImages((prev) => ({ ...prev, [field]: base64String }));
      } catch (error) {
        alert("Image processing failed. The new image is not saved.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const textGroups = {
    "Header & Navigation": ["siteName", "headerNavHome", "headerNavMenu", "headerNavEvents", "headerNavPromotions", "headerNavAbout", "headerNavDogRescue", "headerNavContact"],
    "Home Page": ["homeTitle", "homeSubtitle", "homeViewMenuButton", "homeLearnMoreButton", "welcomeTitle", "welcomeText1", "welcomeText2", "welcomeImage1Caption", "welcomeImage2Caption", "homeHighlightsTitle", "dogFriendlyTitle", "dogFriendlyText", "aussieFoodTitle", "aussieFoodText", "rescueHelpTitle", "rescueHelpText", "homeVisitTitle", "homeHoursTitle", "homeLocationTitle", "homeAddress", "homePhone", "homeEmail", "googleMapsUrl"],
    "Menu Page": ["menuPageTitle", "menuPageSubtitle", "menuReadyToDineTitle", "menuReadyToDineText", "menuCallText", "menuAddressText"],
    "Dog Rescue Page": ["dogRescueTitle", "dogRescueSubtitle", "dogRescueEveryMealTitle", "dogRescueEveryMealText", "dogRescueMeetTitle", "dogRescueMeetSubtitle", "dogRescueClickInstruction", "dogRescueNoDogsText", "dogRescueWantToKnowTitle", "dogRescueWantToKnowText", "dogRescueGetInvolvedTitle", "dogRescueGetInvolvedText"],
    "Events Page": ["eventsTitle", "eventsSubtitle", "eventsThisWeekTitle", "eventsComingSoonTitle", "eventsNoThisWeekText", "eventsNoComingSoonText", "eventsTypesTitle", "eventsDontMissTitle", "eventsDontMissText", "eventsCallText", "eventsFacebookText", "eventsInstagramText"],
    "Promotions Page": ["promotionsTitle", "promotionsSubtitle", "promotionsNoOffersText", "promotionsTermsTitle", "promotionsReadyToSaveTitle", "promotionsReadyToSaveText", "promotionsCallAheadText", "promotionsAddressText", "promotionsFollowText"],
    "About Page": ["aboutTitle", "aboutSubtitle", "aboutMeetFamilyTitle", "aboutStoryParagraph1", "aboutStoryParagraph2", "aboutStoryParagraph3", "aboutJourneyTitle", "aboutFoodTruckTitle", "aboutFoodTruckText", "aboutRescuePartnershipTitle", "aboutRescuePartnershipText", "aboutRestaurantOpensTitle", "aboutRestaurantOpensText", "aboutMissionTitle", "aboutMissionQuote", "aboutMissionSignature", "aboutValuesTitle", "aboutCompassionTitle", "aboutCompassionText", "aboutCommunityTitle", "aboutCommunityText", "aboutQualityTitle", "aboutQualityText"],
    "Contact Page": ["contactTitle", "contactSubtitle", "contactLocationTitle", "contactLocationName", "contactLocationAddress", "contactLocationCity", "contactLocationCountry", "contactParkingText", "contactHoursTitle", "contactMondayThursday", "contactHoursMondayThursday", "contactFridaySaturday", "contactHoursFridaySaturday", "contactSunday", "contactHoursSunday", "contactKitchenClosesText", "contactDetailsTitle", "contactPhoneDescription", "contactEmailDescription", "contactFindUsTitle", "contactFollowTitle", "contactFollowText", "contactFacebookDescription", "contactInstagramDescription", "contactInstagramHandle", "contactGoodToKnowTitle", "contactDogPolicyTitle", "contactDogPolicy1", "contactDogPolicy2", "contactDogPolicy3", "contactDogPolicy4", "contactReservationsTitle", "contactReservations1", "contactReservations2", "contactReservations3", "contactReservations4", "contactParkingAccessTitle", "contactParkingAccess1", "contactParkingAccess2", "contactParkingAccess3", "contactParkingAccess4", "contactPaymentTitle", "contactPayment1", "contactPayment2", "contactPayment3", "contactPayment4", "contactCantWaitTitle", "contactCantWaitText", "contactSeeYouText", "contactMapLatitude", "contactMapLongitude"],
    "Footer": ["footerTagline", "footerContactTitle", "footerHoursSocialTitle", "footerCopyright", "footerMondayThursday", "footerFridaySaturday", "footerSunday"],
    "Admin Interface": ["adminLoginTitle", "adminPasswordLabel", "adminPasswordPlaceholder", "adminLoginButton", "adminCancelButton"],
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-heading text-4xl font-bold text-brown-800">KINGAROOS Admin Panel</h1>
              <div className="flex items-center space-x-1 text-green-600 mt-2">
                <DatabaseZap className="h-4 w-4" />
                <span className="text-sm font-body">Live Sync with Firebase</span>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-brown-600"><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>

          <Tabs defaultValue="texts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 gap-1">
              <TabsTrigger value="texts">All Text Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
            </TabsList>

            <TabsContent value="texts">
              <Card>
                <CardHeader><CardTitle className="flex items-center space-x-2"><Type /> Website Text</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-4">
                    {Object.entries(textGroups).map(([groupName, fields]) => (
                      <AccordionItem key={groupName} value={groupName} className="border rounded-lg px-4">
                        <AccordionTrigger>{groupName}</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                          {fields.map((field) => (
                            <div key={field}>
                              <Label className="font-semibold">{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</Label>
                              {field.toLowerCase().includes("text") || field.toLowerCase().includes("paragraph") ? (
                                <Textarea value={editingTexts[field] ?? ""} onChange={(e) => setEditingTexts((prev) => ({ ...prev, [field]: e.target.value }))} />
                              ) : (
                                <Input value={editingTexts[field] ?? ""} onChange={(e) => setEditingTexts((prev) => ({ ...prev, [field]: e.target.value }))} />
                              )}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="flex justify-center pt-6"><Button onClick={handleSaveTexts} size="lg"><Save className="mr-2 h-4 w-4" />Save All Text</Button></div>
                </CardContent>
              </Card>
            </TabsContent>

            {/*
              B5 FIX: Settings tab now uses editingSettings (local state) for
              controlled inputs and only calls updateSiteContent when the admin
              clicks "Save Settings".  The original code bound each <Input>
              directly to updateSiteContent via its onChange handler, firing a
              Firestore write on every single character typed — O(n) writes per
              field, causing write quota exhaustion, UI jitter, and potential
              data corruption if two fields were being edited concurrently.
            */}
            <TabsContent value="settings">
              <Card>
                <CardHeader><CardTitle>Site Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Facebook URL</Label>
                    <Input
                      value={editingSettings?.facebook ?? ""}
                      onChange={(e) =>
                        setEditingSettings((prev) => ({ ...prev, facebook: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Instagram URL</Label>
                    <Input
                      value={editingSettings?.instagram ?? ""}
                      onChange={(e) =>
                        setEditingSettings((prev) => ({ ...prev, instagram: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Twitter URL</Label>
                    <Input
                      value={editingSettings?.twitter ?? ""}
                      onChange={(e) =>
                        setEditingSettings((prev) => ({ ...prev, twitter: e.target.value }))
                      }
                    />
                  </div>
                  {/* B5 FIX: Explicit Save button — Firestore write happens once here */}
                  <div className="flex justify-start pt-2">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Google Reviews API Key */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    Google Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-brown-500">
                    Paste your <strong>Google Places API key</strong> here to show live reviews on the home page.
                    Get one at{" "}
                    <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer"
                      className="text-aussie-orange underline">console.cloud.google.com</a>
                    {" "}— enable the <em>Places API (New)</em>.
                  </p>
                  <div>
                    <Label>API Key</Label>
                    <Input
                      type="password"
                      placeholder="AIza..."
                      value={editingTexts?.googleApiKey ?? ""}
                      onChange={(e) => setEditingTexts((prev) => ({ ...prev, googleApiKey: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Place ID</Label>
                    <Input
                      placeholder="ChIJ..."
                      value={editingTexts?.googlePlaceId ?? "ChIJz2IwupfmnzMR0EeQmgCd79o"}
                      onChange={(e) => setEditingTexts((prev) => ({ ...prev, googlePlaceId: e.target.value }))}
                    />
                    <p className="text-xs text-brown-400 mt-1">
                      Pre-filled with Kingaroo's Place ID. Find yours at{" "}
                      <a href="https://developers.google.com/maps/documentation/javascript/place-id" target="_blank" rel="noopener noreferrer"
                        className="text-aussie-orange underline">Place ID Finder</a>.
                    </p>
                  </div>
                  <Button onClick={handleSaveTexts}>
                    <Save className="mr-2 h-4 w-4" />Save &amp; Activate
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <div className="space-y-6">
                {isProcessing && <div className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing image... Please wait.</div>}
                <Card>
                  <CardHeader><CardTitle>Logo Image</CardTitle></CardHeader>
                  <CardContent>
                    <ImageInput
                      label="Logo Image"
                      value={siteContent.logoImage}
                      onFileChange={handleGenericImageUpload((base64) => updateSiteContent({ logoImage: base64 }))}
                      onUrlChange={(e) => updateSiteContent({ logoImage: e.target.value })}
                      onRemove={() => updateSiteContent({ logoImage: "" })}
                      isProcessing={isProcessing}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Hero Images</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-4">
                    {(siteContent.heroImages ?? []).map((image, index) => (
                      <ImageInput
                        key={index}
                        label={`Hero Image ${index + 1}`}
                        value={image.url}
                        onFileChange={handleGenericImageUpload((base64) => { const newImages = [...siteContent.heroImages]; newImages[index] = { ...newImages[index], url: base64 }; return updateSiteContent({ heroImages: newImages }); })}
                        onUrlChange={(e) => { const newImages = [...siteContent.heroImages]; newImages[index] = { ...newImages[index], url: e.target.value }; updateSiteContent({ heroImages: newImages }); }}
                        onRemove={() => { const newImages = [...siteContent.heroImages]; newImages[index] = { ...newImages[index], url: "" }; updateSiteContent({ heroImages: newImages }); }}
                        isProcessing={isProcessing}
                      />
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Welcome Images</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    {(siteContent.welcomeImages ?? []).map((image, index) => (
                      <ImageInput
                        key={index}
                        label={`Welcome Image ${index + 1}`}
                        value={image.url}
                        onFileChange={handleGenericImageUpload((base64) => { const newImages = [...siteContent.welcomeImages]; newImages[index] = { ...newImages[index], url: base64 }; return updateSiteContent({ welcomeImages: newImages }); })}
                        onUrlChange={(e) => { const newImages = [...siteContent.welcomeImages]; newImages[index] = { ...newImages[index], url: e.target.value }; updateSiteContent({ welcomeImages: newImages }); }}
                        onRemove={() => { const newImages = [...siteContent.welcomeImages]; newImages[index] = { ...newImages[index], url: "" }; updateSiteContent({ welcomeImages: newImages }); }}
                        isProcessing={isProcessing}
                      />
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>About Page Images</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <ImageInput
                        label="Family Photo"
                        value={editingImages.familyPhoto}
                        onFileChange={handleAboutFormImageUpload("familyPhoto")}
                        onUrlChange={(e) => setEditingImages((prev) => ({ ...prev, familyPhoto: e.target.value }))}
                        onRemove={() => setEditingImages((prev) => ({ ...prev, familyPhoto: "" }))}
                        isProcessing={isProcessing}
                      />
                      <ImageInput
                        label="Original Food Truck"
                        value={editingImages.originalFoodTruck}
                        onFileChange={handleAboutFormImageUpload("originalFoodTruck")}
                        onUrlChange={(e) => setEditingImages((prev) => ({ ...prev, originalFoodTruck: e.target.value }))}
                        onRemove={() => setEditingImages((prev) => ({ ...prev, originalFoodTruck: "" }))}
                        isProcessing={isProcessing}
                      />
                      <ImageInput
                        label="First Rescue Dog"
                        value={editingImages.firstRescueDog}
                        onFileChange={handleAboutFormImageUpload("firstRescueDog")}
                        onUrlChange={(e) => setEditingImages((prev) => ({ ...prev, firstRescueDog: e.target.value }))}
                        onRemove={() => setEditingImages((prev) => ({ ...prev, firstRescueDog: "" }))}
                        isProcessing={isProcessing}
                      />
                      <ImageInput
                        label="Restaurant Opens Image"
                        value={editingImages.restaurantOpensImage}
                        onFileChange={handleAboutFormImageUpload("restaurantOpensImage")}
                        onUrlChange={(e) => setEditingImages((prev) => ({ ...prev, restaurantOpensImage: e.target.value }))}
                        onRemove={() => setEditingImages((prev) => ({ ...prev, restaurantOpensImage: "" }))}
                        isProcessing={isProcessing}
                      />
                    </div>
                    <Button onClick={handleSaveImages} disabled={isProcessing}><Save className="mr-2 h-4 w-4" />Save About Images</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dogs">
              <Card>
                <CardHeader className="flex justify-between items-center"><CardTitle>Manage Dogs</CardTitle><Dialog><DialogTrigger asChild><Button><Plus /> Add Dog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Dog</DialogTitle><DialogDescription className="sr-only">Fill in the form to add a new dog.</DialogDescription></DialogHeader><DogForm dog={{}} onSubmit={async (dog) => { await addDog(dog as Omit<Dog, "id">); alert("Dog added!"); }} /></DialogContent></Dialog></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {(siteContent.dogs ?? []).map((dog) => (<Card key={dog.id} className="p-4"><h3 className="font-bold">{dog.name}</h3><p>{dog.breed}</p><div className="flex gap-2 mt-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit {dog.name}</DialogTitle><DialogDescription className="sr-only">Update the details for this dog.</DialogDescription></DialogHeader><DogForm dog={dog} onSubmit={async (updates) => { await updateDog(dog.id, updates); alert("Dog updated!"); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm("Delete?")) await deleteDog(dog.id); }}><Trash2 /></Button></div></Card>))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="menu">
              <Card>
                <CardHeader className="flex justify-between items-center"><CardTitle>Manage Menu</CardTitle><Dialog><DialogTrigger asChild><Button><Plus /> Add Item</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Menu Item</DialogTitle><DialogDescription className="sr-only">Fill in the form to add a new menu item.</DialogDescription></DialogHeader><MenuItemForm item={{}} onSubmit={async (item) => { await addMenuItem(item as Omit<MenuItem, "id">); alert("Item added!"); }} /></DialogContent></Dialog></CardHeader>
                <CardContent className="space-y-4">
                  {["starters", "mains", "desserts", "drinks"].map((cat) => (<div key={cat}><h3 className="font-bold capitalize text-lg mb-2">{cat}</h3><div className="grid md:grid-cols-2 gap-4">{(siteContent.menuItems ?? []).filter((i) => i.category === cat).map((item) => (<Card key={item.id} className="p-4"><h4 className="font-semibold">{item.name}</h4><p>{item.price}</p><div className="flex gap-2 mt-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit {item.name}</DialogTitle><DialogDescription className="sr-only">Update the details for this menu item.</DialogDescription></DialogHeader><MenuItemForm item={item} onSubmit={async (updates) => { await updateMenuItem(item.id, updates); alert("Item updated!"); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm("Delete?")) await deleteMenuItem(item.id); }}><Trash2 /></Button></div></Card>))}</div></div>))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader className="flex justify-between items-center"><CardTitle>Manage Events</CardTitle><Dialog><DialogTrigger asChild><Button><Plus /> Add Event</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Event</DialogTitle><DialogDescription className="sr-only">Fill in the form to add a new event.</DialogDescription></DialogHeader><EventForm event={{}} onSubmit={async (event) => { await addEvent(event as Omit<Event, "id">); alert("Event added!"); }} /></DialogContent></Dialog></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {(siteContent.events ?? []).map((event) => (<Card key={event.id} className="p-4"><h3 className="font-bold">{event.title}</h3><p>{event.date} at {event.time}</p><div className="flex gap-2 mt-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit {event.title}</DialogTitle><DialogDescription className="sr-only">Update the details for this event.</DialogDescription></DialogHeader><EventForm event={event} onSubmit={async (updates) => { await updateEvent(event.id, updates); alert("Event updated!"); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm("Delete?")) await deleteEvent(event.id); }}><Trash2 /></Button></div></Card>))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="promotions">
              <Card>
                <CardHeader className="flex justify-between items-center"><CardTitle>Manage Promotions</CardTitle><Dialog><DialogTrigger asChild><Button><Plus /> Add Promotion</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Promotion</DialogTitle><DialogDescription className="sr-only">Fill in the form to add a new promotion.</DialogDescription></DialogHeader><PromotionForm promotion={{}} onSubmit={async (promo) => { await addPromotion(promo as Omit<Promotion, "id">); alert("Promotion added!"); }} /></DialogContent></Dialog></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {(siteContent.promotions ?? []).map((promo) => (<Card key={promo.id} className="p-4"><h3 className="font-bold">{promo.title}</h3><p>{promo.subtitle}</p><div className="flex gap-2 mt-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit {promo.title}</DialogTitle><DialogDescription className="sr-only">Update the details for this promotion.</DialogDescription></DialogHeader><PromotionForm promotion={promo} onSubmit={async (updates) => { await updatePromotion(promo.id, updates); alert("Promotion updated!"); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm("Delete?")) await deletePromotion(promo.id); }}><Trash2 /></Button></div></Card>))}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
