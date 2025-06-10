import { useState } from "react";
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
import type { Dog, MenuItem, Event, Promotion } from "@/contexts/AdminContext";

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

  const [editingTexts, setEditingTexts] = useState(siteContent.siteTexts);
  const [editingImages, setEditingImages] = useState(siteContent.aboutImages);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveTexts = async () => {
    try {
      await updateSiteContent({ siteTexts: editingTexts });
      alert("Site texts updated successfully!");
    } catch (error) {
      alert("Failed to update site texts. Changes saved locally.");
    }
  };

  const handleSaveImages = async () => {
    try {
      await updateSiteContent({ aboutImages: editingImages });
      alert("About page images updated successfully!");
    } catch (error) {
      alert("Failed to update images. Changes saved locally.");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        try {
          await updateSiteContent({ logoImage: result });
          alert("Logo updated successfully!");
        } catch (error) {
          alert("Failed to update logo. Change saved locally.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        const newHeroImages = [...siteContent.heroImages];
        newHeroImages[index] = { ...newHeroImages[index], url: result };
        try {
          await updateSiteContent({ heroImages: newHeroImages });
          alert(`Hero image ${index + 1} updated successfully!`);
        } catch (error) {
          alert(
            `Failed to update hero image ${index + 1}. Change saved locally.`,
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutImageUpload = (
    field: keyof typeof editingImages,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditingImages((prev) => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Group texts by page for better organization
  const textGroups = {
    "Header & Navigation": [
      "siteName",
      "headerNavHome",
      "headerNavMenu",
      "headerNavEvents",
      "headerNavPromotions",
      "headerNavAbout",
      "headerNavDogRescue",
      "headerNavContact",
    ],
    "Home Page": [
      "homeTitle",
      "homeSubtitle",
      "homeViewMenuButton",
      "homeLearnMoreButton",
      "welcomeTitle",
      "welcomeText1",
      "welcomeText2",
      "homeHighlightsTitle",
      "dogFriendlyTitle",
      "dogFriendlyText",
      "aussieFoodTitle",
      "aussieFoodText",
      "rescueHelpTitle",
      "rescueHelpText",
      "homeVisitTitle",
      "homeHoursTitle",
      "homeLocationTitle",
      "homeAddress",
      "homePhone",
      "homeEmail",
    ],
    "Menu Page": [
      "menuPageTitle",
      "menuPageSubtitle",
      "menuReadyToDineTitle",
      "menuReadyToDineText",
      "menuCallText",
      "menuAddressText",
    ],
    "Dog Rescue Page": [
      "dogRescueTitle",
      "dogRescueSubtitle",
      "dogRescueEveryMealTitle",
      "dogRescueEveryMealText",
      "dogRescueMeetTitle",
      "dogRescueMeetSubtitle",
      "dogRescueClickInstruction",
      "dogRescueNoDogsText",
      "dogRescueWantToKnowTitle",
      "dogRescueWantToKnowText",
      "dogRescueGetInvolvedTitle",
      "dogRescueGetInvolvedText",
    ],
    "Events Page": [
      "eventsTitle",
      "eventsSubtitle",
      "eventsThisWeekTitle",
      "eventsComingSoonTitle",
      "eventsNoThisWeekText",
      "eventsNoComingSoonText",
      "eventsTypesTitle",
      "eventsDontMissTitle",
      "eventsDontMissText",
      "eventsCallText",
      "eventsFacebookText",
      "eventsInstagramText",
    ],
    "Promotions Page": [
      "promotionsTitle",
      "promotionsSubtitle",
      "promotionsNoOffersText",
      "promotionsTermsTitle",
      "promotionsReadyToSaveTitle",
      "promotionsReadyToSaveText",
      "promotionsCallAheadText",
      "promotionsAddressText",
      "promotionsFollowText",
    ],
    "About Page": [
      "aboutTitle",
      "aboutSubtitle",
      "aboutMeetFamilyTitle",
      "aboutStoryParagraph1",
      "aboutStoryParagraph2",
      "aboutStoryParagraph3",
      "aboutJourneyTitle",
      "aboutFoodTruckTitle",
      "aboutFoodTruckText",
      "aboutRescuePartnershipTitle",
      "aboutRescuePartnershipText",
      "aboutRestaurantOpensTitle",
      "aboutRestaurantOpensText",
      "aboutMissionTitle",
      "aboutMissionQuote",
      "aboutMissionSignature",
      "aboutValuesTitle",
      "aboutCompassionTitle",
      "aboutCompassionText",
      "aboutCommunityTitle",
      "aboutCommunityText",
      "aboutQualityTitle",
      "aboutQualityText",
    ],
    "Contact Page": [
      "contactTitle",
      "contactSubtitle",
      "contactLocationTitle",
      "contactLocationName",
      "contactLocationAddress",
      "contactLocationCity",
      "contactLocationCountry",
      "contactParkingText",
      "contactHoursTitle",
      "contactMondayThursday",
      "contactFridaySaturday",
      "contactSunday",
      "contactKitchenClosesText",
      "contactDetailsTitle",
      "contactPhoneDescription",
      "contactEmailDescription",
      "contactFindUsTitle",
      "contactFollowTitle",
      "contactFollowText",
      "contactFacebookDescription",
      "contactInstagramDescription",
      "contactInstagramHandle",
      "contactGoodToKnowTitle",
      "contactDogPolicyTitle",
      "contactDogPolicy1",
      "contactDogPolicy2",
      "contactDogPolicy3",
      "contactDogPolicy4",
      "contactReservationsTitle",
      "contactReservations1",
      "contactReservations2",
      "contactReservations3",
      "contactReservations4",
      "contactParkingAccessTitle",
      "contactParkingAccess1",
      "contactParkingAccess2",
      "contactParkingAccess3",
      "contactParkingAccess4",
      "contactPaymentTitle",
      "contactPayment1",
      "contactPayment2",
      "contactPayment3",
      "contactPayment4",
      "contactCantWaitTitle",
      "contactCantWaitText",
      "contactSeeYouText",
      "contactMapLatitude",
      "contactMapLongitude",
    ],
    Footer: [
      "footerTagline",
      "footerContactTitle",
      "footerHoursSocialTitle",
      "footerMondayThursday",
      "footerFridaySaturday",
      "footerSunday",
      "footerCopyright",
    ],
    "Admin Interface": [
      "adminLoginTitle",
      "adminPasswordLabel",
      "adminPasswordPlaceholder",
      "adminLoginButton",
      "adminCancelButton",
    ],
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-heading text-4xl font-bold text-brown-800">
                KINGAROOS Admin Panel
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                {isServerConnected ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm font-body">Server Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-sm font-body">Offline Mode</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-brown-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {!isServerConnected && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Offline Mode:</strong> The admin server is not
                available. Changes will be saved locally and visible only to
                you. To make changes visible to all users, ensure the backend
                server is running.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="texts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="texts">All Text Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
            </TabsList>

            {/* All Text Content Tab */}
            <TabsContent value="texts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="h-5 w-5" />
                    <span>Edit All Website Text Content</span>
                  </CardTitle>
                  <p className="text-sm text-brown-600">
                    Every single piece of text on your website is editable here,
                    organized by page.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="multiple" className="space-y-4">
                    {Object.entries(textGroups).map(([groupName, fields]) => (
                      <AccordionItem
                        key={groupName}
                        value={groupName}
                        className="border border-sand-200 rounded-lg px-4"
                      >
                        <AccordionTrigger className="font-heading text-lg text-brown-800">
                          {groupName} ({fields.length} items)
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map((field) => (
                              <div key={field} className="space-y-2">
                                <Label className="text-brown-800 font-semibold text-sm">
                                  {field
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </Label>
                                {field.includes("Text") ||
                                field.includes("Paragraph") ||
                                field.includes("Quote") ||
                                field.includes("Description") ? (
                                  <Textarea
                                    value={
                                      editingTexts[
                                        field as keyof typeof editingTexts
                                      ]
                                    }
                                    onChange={(e) =>
                                      setEditingTexts((prev) => ({
                                        ...prev,
                                        [field]: e.target.value,
                                      }))
                                    }
                                    className="min-h-[80px] text-sm"
                                  />
                                ) : (
                                  <Input
                                    value={
                                      editingTexts[
                                        field as keyof typeof editingTexts
                                      ]
                                    }
                                    onChange={(e) =>
                                      setEditingTexts((prev) => ({
                                        ...prev,
                                        [field]: e.target.value,
                                      }))
                                    }
                                    className="text-sm"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={handleSaveTexts}
                      size="lg"
                      className="bg-aussie-orange hover:bg-aussie-burnt-red"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save All Text Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-brown-800">Theme Settings</h3>
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="theme-toggle">Theme</Label>
                      <Select 
                        value={siteContent.theme} 
                        onValueChange={(value) => {
                          updateSiteContent({ theme: value as 'light' | 'dark' });
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-brown-800">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook-link">Facebook URL</Label>
                        <Input 
                          id="facebook-link"
                          value={siteContent.socialLinks.facebook} 
                          onChange={(e) => {
                            const newSocialLinks = {...siteContent.socialLinks, facebook: e.target.value};
                            updateSiteContent({ socialLinks: newSocialLinks });
                          }}
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram-link">Instagram URL</Label>
                        <Input 
                          id="instagram-link"
                          value={siteContent.socialLinks.instagram} 
                          onChange={(e) => {
                            const newSocialLinks = {...siteContent.socialLinks, instagram: e.target.value};
                            updateSiteContent({ socialLinks: newSocialLinks });
                          }}
                          placeholder="https://instagram.com/yourhandle"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter-link">Twitter URL</Label>
                        <Input 
                          id="twitter-link"
                          value={siteContent.socialLinks.twitter} 
                          onChange={(e) => {
                            const newSocialLinks = {...siteContent.socialLinks, twitter: e.target.value};
                            updateSiteContent({ socialLinks: newSocialLinks });
                          }}
                          placeholder="https://twitter.com/yourhandle"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={() => alert("Settings saved successfully!")} 
                      className="bg-aussie-orange hover:bg-aussie-burnt-red"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Images Tab */}
            <TabsContent value="images">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Logo Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="flex-1"
                        />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      </div>
                      {siteContent.logoImage && (
                        <img
                          src={siteContent.logoImage}
                          alt="Logo"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hero Images (Homepage Background)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {siteContent.heroImages.map((image, index) => (
                        <div key={index} className="space-y-4">
                          <Label className="text-brown-800 font-semibold">
                            Hero Image {index + 1}
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleHeroImageUpload(index, e)}
                          />
                          <div className="w-full h-32 bg-sand-200 rounded-lg flex items-center justify-center">
                            <span className="text-brown-600 text-sm text-center px-2">
                              {image.alt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>About Page Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <Label className="text-brown-800 font-semibold">
                            Family Photo
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleAboutImageUpload("familyPhoto", e)
                            }
                          />
                          {editingImages.familyPhoto &&
                            editingImages.familyPhoto !==
                              "/placeholder.svg" && (
                              <img
                                src={editingImages.familyPhoto}
                                alt="Family"
                                className="w-full h-32 object-cover rounded-md"
                              />
                            )}
                        </div>

                        <div className="space-y-4">
                          <Label className="text-brown-800 font-semibold">
                            Original Food Truck
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleAboutImageUpload("originalFoodTruck", e)
                            }
                          />
                          {editingImages.originalFoodTruck &&
                            editingImages.originalFoodTruck !==
                              "/placeholder.svg" && (
                              <img
                                src={editingImages.originalFoodTruck}
                                alt="Food Truck"
                                className="w-full h-32 object-cover rounded-md"
                              />
                            )}
                        </div>

                        <div className="space-y-4">
                          <Label className="text-brown-800 font-semibold">
                            First Rescue Dog
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleAboutImageUpload("firstRescueDog", e)
                            }
                          />
                          {editingImages.firstRescueDog &&
                            editingImages.firstRescueDog !==
                              "/placeholder.svg" && (
                              <img
                                src={editingImages.firstRescueDog}
                                alt="First Rescue Dog"
                                className="w-full h-32 object-cover rounded-md"
                              />
                            )}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={handleSaveImages}
                          className="bg-aussie-orange hover:bg-aussie-burnt-red"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save About Page Images
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dogs Tab */}
            <TabsContent value="dogs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Dogs</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-aussie-orange hover:bg-aussie-burnt-red">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Dog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Dog</DialogTitle>
                      </DialogHeader>
                      <DogForm
                        dog={{}}
                        onSubmit={async (dog) => {
                          try {
                            await addDog(dog as Omit<Dog, "id">);
                            alert("Dog added successfully!");
                          } catch (error) {
                            alert("Failed to add dog. Added locally.");
                          }
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {siteContent.dogs.map((dog) => (
                      <Card key={dog.id} className="border-sand-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="font-heading text-lg font-bold text-brown-800">
                                {dog.name}
                              </h3>
                              <p className="text-brown-600">{dog.breed}</p>
                              <p className="text-brown-600 text-sm">
                                {dog.age}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit {dog.name}</DialogTitle>
                                  </DialogHeader>
                                  <DogForm
                                    dog={dog}
                                    onSubmit={async (updates) => {
                                      try {
                                        await updateDog(dog.id, updates);
                                        alert("Dog updated successfully!");
                                      } catch (error) {
                                        alert(
                                          "Failed to update dog. Updated locally.",
                                        );
                                      }
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete ${dog.name}?`,
                                    )
                                  ) {
                                    try {
                                      await deleteDog(dog.id);
                                      alert("Dog deleted successfully!");
                                    } catch (error) {
                                      alert(
                                        "Failed to delete dog. Deleted locally.",
                                      );
                                    }
                                  }
                                }}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-brown-600 text-sm">
                            {dog.personality}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Menu Tab */}
            <TabsContent value="menu">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Menu Items</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-aussie-orange hover:bg-aussie-burnt-red">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Menu Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Menu Item</DialogTitle>
                      </DialogHeader>
                      <MenuItemForm
                        item={{}}
                        onSubmit={async (item) => {
                          try {
                            await addMenuItem(item as Omit<MenuItem, "id">);
                            alert("Menu item added successfully!");
                          } catch (error) {
                            alert("Failed to add menu item. Added locally.");
                          }
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["starters", "mains", "desserts", "drinks"].map(
                      (category) => (
                        <div key={category}>
                          <h3 className="font-heading text-xl font-bold text-brown-800 mb-4 capitalize">
                            {category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {siteContent.menuItems
                              .filter((item) => item.category === category)
                              .map((item) => (
                                <Card key={item.id} className="border-sand-200">
                                  <CardContent className="p-4">
                                    <div className="flex space-x-4">
                                      {/* Image Preview */}
                                      <div className="w-16 h-16 flex-shrink-0">
                                        {item.image &&
                                        item.image !== "/placeholder.svg" ? (
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-md"
                                          />
                                        ) : (
                                          <div className="w-full h-full bg-sand-200 rounded-md flex items-center justify-center">
                                            <ImageIcon className="h-6 w-6 text-brown-400" />
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                          <div className="flex-1">
                                            <h4 className="font-semibold text-brown-800">
                                              {item.name}
                                            </h4>
                                            <p className="text-brown-600 text-sm">
                                              {item.description}
                                            </p>
                                            <p className="font-bold text-aussie-orange">
                                              {item.price}
                                            </p>
                                            {item.featured && (
                                              <span className="text-xs bg-aussie-orange text-white px-2 py-1 rounded">
                                                Featured
                                              </span>
                                            )}
                                          </div>
                                          <div className="flex space-x-2 ml-2">
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                >
                                                  <Edit className="h-4 w-4" />
                                                </Button>
                                              </DialogTrigger>
                                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                                <DialogHeader>
                                                  <DialogTitle>
                                                    Edit {item.name}
                                                  </DialogTitle>
                                                </DialogHeader>
                                                <MenuItemForm
                                                  item={item}
                                                  onSubmit={async (updates) => {
                                                    try {
                                                      await updateMenuItem(
                                                        item.id,
                                                        updates,
                                                      );
                                                      alert(
                                                        "Menu item updated successfully!",
                                                      );
                                                    } catch (error) {
                                                      alert(
                                                        "Failed to update menu item. Updated locally.",
                                                      );
                                                    }
                                                  }}
                                                />
                                              </DialogContent>
                                            </Dialog>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={async () => {
                                                if (
                                                  confirm(
                                                    `Are you sure you want to delete ${item.name}?`,
                                                  )
                                                ) {
                                                  try {
                                                    await deleteMenuItem(
                                                      item.id,
                                                    );
                                                    alert(
                                                      "Menu item deleted successfully!",
                                                    );
                                                  } catch (error) {
                                                    alert(
                                                      "Failed to delete menu item. Deleted locally.",
                                                    );
                                                  }
                                                }
                                              }}
                                              className="text-red-600 hover:bg-red-50"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Events</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-aussie-orange hover:bg-aussie-burnt-red">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                      </DialogHeader>
                      <EventForm
                        event={{}}
                        onSubmit={async (event) => {
                          try {
                            await addEvent(event as Omit<Event, "id">);
                            alert("Event added successfully!");
                          } catch (error) {
                            alert("Failed to add event. Added locally.");
                          }
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {siteContent.events.map((event) => (
                      <Card key={event.id} className="border-sand-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-heading text-lg font-bold text-brown-800">
                                {event.title}
                              </h3>
                              <p className="text-brown-600">
                                {event.date} - {event.time}
                              </p>
                              <span className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded">
                                {event.category} • {event.type}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Edit {event.title}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <EventForm
                                    event={event}
                                    onSubmit={async (updates) => {
                                      try {
                                        await updateEvent(event.id, updates);
                                        alert("Event updated successfully!");
                                      } catch (error) {
                                        alert(
                                          "Failed to update event. Updated locally.",
                                        );
                                      }
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete ${event.title}?`,
                                    )
                                  ) {
                                    try {
                                      await deleteEvent(event.id);
                                      alert("Event deleted successfully!");
                                    } catch (error) {
                                      alert(
                                        "Failed to delete event. Deleted locally.",
                                      );
                                    }
                                  }
                                }}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-brown-600 text-sm">
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Promotions Tab */}
            <TabsContent value="promotions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Promotions</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-aussie-orange hover:bg-aussie-burnt-red">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Promotion
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Promotion</DialogTitle>
                      </DialogHeader>
                      <PromotionForm
                        promotion={{}}
                        onSubmit={async (promotion) => {
                          try {
                            await addPromotion(
                              promotion as Omit<Promotion, "id">,
                            );
                            alert("Promotion added successfully!");
                          } catch (error) {
                            alert("Failed to add promotion. Added locally.");
                          }
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {siteContent.promotions.map((promo) => (
                      <Card key={promo.id} className="border-sand-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-heading text-lg font-bold text-brown-800">
                                {promo.title}
                              </h3>
                              <p className="text-brown-600">{promo.subtitle}</p>
                              <span className="text-xs bg-brown-100 text-brown-700 px-2 py-1 rounded">
                                {promo.badge}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Edit {promo.title}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <PromotionForm
                                    promotion={promo}
                                    onSubmit={async (updates) => {
                                      try {
                                        await updatePromotion(
                                          promo.id,
                                          updates,
                                        );
                                        alert(
                                          "Promotion updated successfully!",
                                        );
                                      } catch (error) {
                                        alert(
                                          "Failed to update promotion. Updated locally.",
                                        );
                                      }
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete ${promo.title}?`,
                                    )
                                  ) {
                                    try {
                                      await deletePromotion(promo.id);
                                      alert("Promotion deleted successfully!");
                                    } catch (error) {
                                      alert(
                                        "Failed to delete promotion. Deleted locally.",
                                      );
                                    }
                                  }
                                }}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-brown-600 text-sm">
                            {promo.details}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

// Enhanced Form Components with Image Upload
function DogForm({
  dog,
  onSubmit,
}: {
  dog: Partial<Dog>;
  onSubmit: (dog: Partial<Dog>) => void;
}) {
  const [formData, setFormData] = useState(dog);

  const handleImageUpload = (
    field: "beforeImage" | "afterImage",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Breed</Label>
          <Input
            value={formData.breed || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, breed: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <Label>Age</Label>
        <Input
          value={formData.age || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, age: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Personality</Label>
        <Textarea
          value={formData.personality || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, personality: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Rescue Story</Label>
        <Textarea
          value={formData.rescueStory || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, rescueStory: e.target.value }))
          }
        />
      </div>

      {/* Image Uploads */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Before Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload("beforeImage", e)}
          />
          {formData.beforeImage &&
            formData.beforeImage !== "/placeholder.svg" && (
              <img
                src={formData.beforeImage}
                alt="Before"
                className="w-full h-32 object-cover rounded-md mt-2"
              />
            )}
        </div>
        <div>
          <Label>After Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload("afterImage", e)}
          />
          {formData.afterImage &&
            formData.afterImage !== "/placeholder.svg" && (
              <img
                src={formData.afterImage}
                alt="After"
                className="w-full h-32 object-cover rounded-md mt-2"
              />
            )}
        </div>
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full">
        Save Dog
      </Button>
    </div>
  );
}

function MenuItemForm({
  item,
  onSubmit,
}: {
  item: Partial<MenuItem>;
  onSubmit: (item: Partial<MenuItem>) => void;
}) {
  const [formData, setFormData] = useState(item);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            value={formData.price || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                category: value as MenuItem["category"],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starters">Starters</SelectItem>
              <SelectItem value="mains">Mains</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured || false}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, featured: checked as boolean }))
          }
        />
        <Label htmlFor="featured">Featured Item (House Special)</Label>
      </div>

      {/* Image Upload */}
      <div>
        <Label>Item Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.image && formData.image !== "/placeholder.svg" && (
          <img
            src={formData.image}
            alt="Menu item"
            className="w-full h-32 object-cover rounded-md mt-2"
          />
        )}
      </div>

      <Button onClick={() => onSubmit(formData)} className="w-full">
        Save Menu Item
      </Button>
    </div>
  );
}

function EventForm({
  event,
  onSubmit,
}: {
  event: Partial<Event>;
  onSubmit: (event: Partial<Event>) => void;
}) {
  const [formData, setFormData] = useState(event);

  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            value={formData.date || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Time</Label>
          <Input
            value={formData.time || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, time: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Type</Label>
          <Select
            value={formData.type || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value as Event["type"] }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="dogs">Dogs</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Category</Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                category: value as Event["category"],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="comingSoon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={() => onSubmit(formData)} className="w-full">
        Save Event
      </Button>
    </div>
  );
}

function PromotionForm({
  promotion,
  onSubmit,
}: {
  promotion: Partial<Promotion>;
  onSubmit: (promotion: Partial<Promotion>) => void;
}) {
  const [formData, setFormData] = useState(promotion);

  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input
          value={formData.subtitle || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Details</Label>
        <Input
          value={formData.details || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, details: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Badge</Label>
          <Input
            value={formData.badge || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, badge: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Color (TailwindCSS classes)</Label>
          <Input
            value={formData.color || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, color: e.target.value }))
            }
            placeholder="from-aussie-orange to-aussie-burnt-red"
          />
        </div>
      </div>
      <Button onClick={() => onSubmit(formData)} className="w-full">
        Save Promotion
      </Button>
    </div>
  );
}
