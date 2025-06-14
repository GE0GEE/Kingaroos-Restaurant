import { useState, useEffect } from "react";//
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";
import { promotionCategories } from "../config/siteConfig.ts";
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
  Upload,
  Type,
  DatabaseZap,
  Loader2,
} from "lucide-react";
import type { Dog, MenuItem, Event, Promotion, PromotionCategoryKey } from "@/contexts/AdminContext";
import imageCompression from 'browser-image-compression';

// --- HELPER FUNCTION FOR IMAGE COMPRESSION AND CONVERSION ---
const handleFileAndCompress = async (file: File): Promise<string> => {
    console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    // --- OPTIMIZED SETTINGS FOR BEST QUALITY ---
    const options = {
      maxSizeMB: 0.9,         // Target a much larger file size (just under the 1MB limit)
      maxWidthOrHeight: 1920,   // Keep a high resolution
      useWebWorker: true,
      initialQuality: 0.9,      // Start with 90% quality, library will reduce if needed
    };

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

        // Convert the compressed file to a Base64 string to store in Firestore
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


// --- FORM COMPONENTS (No changes needed, they use the helper above) ---
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
      {/* ... form fields ... */}
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Name</Label><Input value={formData.name || ""} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} /></div>
        <div><Label>Breed</Label><Input value={formData.breed || ""} onChange={(e) => setFormData((prev) => ({ ...prev, breed: e.target.value }))} /></div>
      </div>
      <div><Label>Age</Label><Input type="number" value={formData.age || ""} onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))} /></div>
      <div><Label>Personality</Label><Textarea value={formData.personality || ""} onChange={(e) => setFormData((prev) => ({ ...prev, personality: e.target.value }))} /></div>
      <div><Label>Rescue Story</Label><Textarea value={formData.rescueStory || ""} onChange={(e) => setFormData((prev) => ({ ...prev, rescueStory: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Before Image</Label><Input type="file" accept="image/*" onChange={(e) => handleImageUpload("beforeImage", e)} disabled={isUploading} />
          {formData.beforeImage && <img src={formData.beforeImage} alt="Before" className="w-full h-32 object-cover rounded-md mt-2" />}
        </div>
        <div>
          <Label>After Image</Label><Input type="file" accept="image/*" onChange={(e) => handleImageUpload("afterImage", e)} disabled={isUploading} />
          {formData.afterImage && <img src={formData.afterImage} alt="After" className="w-full h-32 object-cover rounded-md mt-2" />}
        </div>
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
      <div><Label>Item Image</Label><Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />{formData.image && <img src={formData.image} alt="Menu item" className="w-full h-32 object-cover rounded-md mt-2" />}</div>
      <Button onClick={() => onSubmit(formData)} className="w-full" disabled={isUploading}>Save Menu Item</Button>
    </div>
  );
}

// ... EventForm and PromotionForm remain unchanged ...
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

  useEffect(() => {
    setEditingTexts(siteContent.siteTexts);
    setEditingImages(siteContent.aboutImages);
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

  const handleGenericImageUpload = (updateFunction: (base64: string) => Promise<void>) => async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // ... textGroups object is unchanged ...
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
              {/* ... TabsList unchanged ... */}
              <TabsTrigger value="texts">All Text Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
            </TabsList>

            <TabsContent value="texts">
                {/* ... This tab is unchanged ... */}
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
                                <Textarea value={editingTexts[field] ?? ''} onChange={(e) => setEditingTexts((prev) => ({ ...prev, [field]: e.target.value }))} />
                              ) : (
                                <Input value={editingTexts[field] ?? ''} onChange={(e) => setEditingTexts((prev) => ({ ...prev, [field]: e.target.value }))} />
                              )}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="flex justify-center pt-6"><Button onClick={handleSaveTexts} size="lg"><Save className="mr-2 h-4 w-4"/>Save All Text</Button></div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">{/* ... unchanged ... */}</TabsContent>
            
            <TabsContent value="images">
              <div className="space-y-6">
                {isProcessing && <div className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing image... Please wait.</div>}
                <Card>
                  <CardHeader><CardTitle>Logo Image</CardTitle></CardHeader>
                  <CardContent><Input type="file" accept="image/*" onChange={handleGenericImageUpload((base64) => updateSiteContent({ logoImage: base64 }))} disabled={isProcessing}/><br/>{siteContent.logoImage && <img src={siteContent.logoImage} alt="Logo" className="w-32 h-32 mt-4" />}</CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Hero Images</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-4">
                    {(siteContent.heroImages ?? []).map((image, index) => (
                      <div key={index}>
                        <Label>Hero Image {index + 1}</Label>
                        <Input type="file" accept="image/*" onChange={handleGenericImageUpload((base64) => {const newImages = [...siteContent.heroImages]; newImages[index] = {...newImages[index], url: base64 }; return updateSiteContent({ heroImages: newImages });})} disabled={isProcessing}/>
                        {image.url && <img src={image.url} alt={image.alt} className="w-full h-32 mt-2 object-cover" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Welcome Images</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                    {(siteContent.welcomeImages ?? []).map((image, index) => (
                        <div key={index}>
                        <Label>Welcome Image {index + 1}</Label>
                        <Input type="file" accept="image/*" onChange={handleGenericImageUpload((base64) => {const newImages = [...siteContent.welcomeImages]; newImages[index] = {...newImages[index], url: base64 }; return updateSiteContent({ welcomeImages: newImages });})} disabled={isProcessing}/>
                        {image.url && <img src={image.url} alt={image.alt} className="w-full h-32 mt-2 object-cover" />}
                        </div>
                    ))}
                    </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>About Page Images</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div><Label>Family Photo</Label><Input type="file" accept="image/*" onChange={handleAboutFormImageUpload('familyPhoto')} disabled={isProcessing}/><br/>{editingImages.familyPhoto && <img src={editingImages.familyPhoto} className="w-full h-32 mt-2 object-cover"/>}</div>
                      <div><Label>Original Food Truck</Label><Input type="file" accept="image/*" onChange={handleAboutFormImageUpload('originalFoodTruck')} disabled={isProcessing}/><br/>{editingImages.originalFoodTruck && <img src={editingImages.originalFoodTruck} className="w-full h-32 mt-2 object-cover"/>}</div>
                      <div><Label>First Rescue Dog</Label><Input type="file" accept="image/*" onChange={handleAboutFormImageUpload('firstRescueDog')} disabled={isProcessing}/><br/>{editingImages.firstRescueDog && <img src={editingImages.firstRescueDog} className="w-full h-32 mt-2 object-cover"/>}</div>
                      <div><Label>Restaurant Opens Image</Label><Input type="file" accept="image/*" onChange={handleAboutFormImageUpload('restaurantOpensImage')} disabled={isProcessing}/><br/>{editingImages.restaurantOpensImage && <img src={editingImages.restaurantOpensImage} className="w-full h-32 mt-2 object-cover"/>}</div>
                    </div>
                    <Button onClick={handleSaveImages} disabled={isProcessing}><Save className="mr-2 h-4 w-4"/>Save About Images</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* The rest of the tabs require no changes */}
            <TabsContent value="dogs">{/* ... content ... */}</TabsContent>
            <TabsContent value="menu">{/* ... content ... */}</TabsContent>
            <TabsContent value="events">{/* ... content ... */}</TabsContent>
            <TabsContent value="promotions">{/* ... content ... */}</TabsContent>

          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
