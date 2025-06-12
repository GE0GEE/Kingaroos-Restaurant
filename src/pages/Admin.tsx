import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAdmin } from "@/contexts/AdminContext";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Wifi,
  WifiOff,
  AlertTriangle,
  ImageIcon,
  Type,
} from "lucide-react";
import type { Dog, MenuItem, Event, Promotion, SiteContent } from "@/contexts/AdminContext";

type SiteTexts = SiteContent['siteTexts'];
type SiteImages = SiteContent['siteImages'];

export default function Admin() {
  const navigate = useNavigate();
  const {
    logout,
    siteContent,
    isServerConnected,
    updateSiteContent,
    addDog,
    updateDog,
    deleteDog,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addEvent,
    updateEvent,
    deleteEvent,
    addPromotion,
    updatePromotion,
    deletePromotion,
  } = useAdmin();

  const [editingTexts, setEditingTexts] = useState<SiteTexts>(siteContent.siteTexts);
  const [editingSiteImages, setEditingSiteImages] = useState<SiteImages>(siteContent.siteImages);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveAllChanges = async () => {
    try {
      await updateSiteContent({ siteTexts: editingTexts, siteImages: editingSiteImages });
      alert("All changes saved successfully!");
    } catch (error) {
      alert("Failed to save changes. Changes are saved locally.");
    }
  };

  const handleImageUpload = (field: keyof SiteImages, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditingSiteImages((prev) => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const textGroups = {
    "Header & Navigation": ["siteName", "headerNavHome", "headerNavMenu", "headerNavEvents", "headerNavPromotions", "headerNavAbout", "headerNavDogRescue", "headerNavContact"],
    "Home Page": ["homeTitle", "homeSubtitle", "homeViewMenuButton", "homeLearnMoreButton", "welcomeTitle", "welcomeText1", "welcomeText2", "welcomeImage1Caption", "welcomeImage2Caption", "homeHighlightsTitle", "dogFriendlyTitle", "dogFriendlyText", "aussieFoodTitle", "aussieFoodText", "rescueHelpTitle", "rescueHelpText", "homeVisitTitle", "homeHoursTitle", "homeLocationTitle", "homeAddress", "homePhone", "homeEmail", "googleMapsUrl", "hoursWeekday", "hoursWeekend", "hoursSunday"],
    "Menu Page": ["menuPageTitle", "menuPageSubtitle", "menuReadyToDineTitle", "menuReadyToDineText", "menuCallText", "menuAddressText"],
    "Dog Rescue Page": ["dogRescueTitle", "dogRescueSubtitle", "dogRescueMeetTitle", "dogRescueMeetSubtitle", "dogRescueNoDogsText", "dogRescueWantToKnowTitle", "dogRescueWantToKnowText", "dogRescueGetInvolvedTitle", "dogRescueGetInvolvedText"],
    "Promotions Page": ["promotionsTitle", "promotionsSubtitle", "promotionsNoOffersText", "promotionsReadyToSaveTitle", "promotionsReadyToSaveText", "promotionsFollowText", "promotionsCtaPhoneNumber", "promotionsCtaAddress"],
    "About Page": ["aboutTitle", "aboutSubtitle", "aboutMeetFamilyTitle", "aboutStoryParagraph1", "aboutStoryParagraph2", "aboutStoryParagraph3", "aboutJourneyTitle", "aboutFoodTruckTitle", "aboutFoodTruckText", "aboutRescuePartnershipTitle", "aboutRescuePartnershipText", "aboutRestaurantOpensTitle", "aboutRestaurantOpensText", "aboutMissionTitle", "aboutMissionQuote", "aboutMissionSignature", "aboutValuesTitle", "aboutCompassionTitle", "aboutCompassionText", "aboutCommunityTitle", "aboutCommunityText", "aboutQualityTitle", "aboutQualityText"],
    "Contact Page": ["contactTitle", "contactSubtitle", "contactLocationTitle", "contactLocationName", "contactLocationAddress", "contactLocationCity", "contactLocationCountry", "contactParkingText", "contactHoursTitle", "contactMondayThursday", "contactFridaySaturday", "contactSunday", "contactKitchenClosesText", "contactDetailsTitle", "contactPhoneDescription", "contactEmailDescription", "contactFindUsTitle", "contactFollowTitle", "contactFollowText", "contactFacebookDescription", "contactInstagramDescription", "contactInstagramHandle", "contactGoodToKnowTitle", "contactDogPolicyTitle", "contactReservationsTitle", "contactParkingAccessTitle", "contactPaymentTitle", "contactCantWaitTitle", "contactCantWaitText", "contactSeeYouText"],
    "Footer": ["footerTagline", "footerContactTitle", "footerHoursSocialTitle", "footerCopyright"],
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-heading text-4xl font-bold text-brown-800">KINGAROOS Admin Panel</h1>
              <div className="flex items-center space-x-2 mt-2">
                {isServerConnected ? (
                  <div className="flex items-center space-x-1 text-green-600"><Wifi className="h-4 w-4" /><span className="text-sm font-body">Server Connected</span></div>
                ) : (
                  <div className="flex items-center space-x-1 text-orange-600"><WifiOff className="h-4 w-4" /><span className="text-sm font-body">Offline Mode</span></div>
                )}
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-brown-600 border-brown-300"><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>

          {!isServerConnected && (
            <Alert variant="destructive" className="mb-6"><AlertTriangle className="h-4 w-4" /><AlertDescription><strong>Offline Mode:</strong> The admin server is not available. Changes will be saved to your browser but not to the live site. To make changes visible to all users, ensure the backend server is running.</AlertDescription></Alert>
          )}

          <Tabs defaultValue="texts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 gap-1">
              <TabsTrigger value="texts">Text Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
            </TabsList>

            <TabsContent value="texts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2"><Type className="h-5 w-5" /><span>Edit Website Text Content</span></CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full space-y-4">
                    {Object.entries(textGroups).map(([groupName, fields]) => (
                      <AccordionItem key={groupName} value={groupName} className="border border-border rounded-lg px-4">
                        <AccordionTrigger className="font-heading text-lg text-foreground">{groupName} ({fields.length} fields)</AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {(fields as Array<keyof SiteTexts>).map((field) => (
                              <div key={field} className="space-y-1.5">
                                <Label htmlFor={field} className="text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</Label>
                                <Textarea id={field} value={editingTexts[field] as string || ""} onChange={(e) => setEditingTexts((prev) => ({ ...prev, [field]: e.target.value }))} className="min-h-[60px]" />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <div className="space-y-6">
                 <Card>
                  <CardHeader><CardTitle>Site-wide Images</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(Object.keys(editingSiteImages) as Array<keyof SiteImages>).map((key) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key} className="capitalize font-semibold">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <Input id={key} type="file" accept="image/*" onChange={(e) => handleImageUpload(key, e)} />
                        <img src={editingSiteImages[key]} alt={key} className="w-full h-32 object-cover rounded-md border bg-muted" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

             {/* Other tabs like Settings, Dogs, Menu, etc. go here */}
             <TabsContent value="dogs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Manage Dogs</CardTitle><Dialog><DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Dog</Button></DialogTrigger><DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Add New Dog</DialogTitle></DialogHeader><DogForm dog={{}} onSubmit={async (dog) => { await addDog(dog as Omit<Dog, 'id'>); }} /></DialogContent></Dialog></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {siteContent.dogs.map((dog) => (
                      <Card key={dog.id} className="p-4 flex gap-4 items-start">
                        <img src={dog.afterImage || "/placeholder.svg"} alt={dog.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0 bg-muted" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1"><h3 className="font-heading text-lg font-bold">{dog.name}</h3><p className="text-sm">{dog.breed}</p></div>
                            <div className="flex space-x-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button></DialogTrigger><DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit {dog.name}</DialogTitle></DialogHeader><DogForm dog={dog} onSubmit={async (updates) => { await updateDog(dog.id, updates); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm(`Are you sure you want to delete ${dog.name}?`)) { await deleteDog(dog.id); } }}><Trash2 className="h-4 w-4" /></Button></div>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-3">{dog.personality}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button onClick={handleSaveAllChanges} size="lg"><Save className="h-4 w-4 mr-2" />Save All Changes</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Form components (DogForm, etc.) would be defined below
// These are simplified for brevity, but would be similar to your existing forms.
function DogForm({ dog, onSubmit }: { dog: Partial<Dog>; onSubmit: (dog: Partial<Dog>) => void; }) {
  const [formData, setFormData] = useState(dog);
  // ... form JSX and logic
  return <div className="p-4 border rounded-lg">Dog form for {formData.name || "a new dog"}. <Button onClick={() => onSubmit(formData)}>Save</Button></div>;
}
