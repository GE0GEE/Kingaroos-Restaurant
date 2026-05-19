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
import { Switch } from "@/components/ui/switch";
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
  Upload,
  ShoppingBag,
  GripVertical,
} from "lucide-react";
import type { Dog, MenuItem, Event, Promotion, PromotionCategoryKey, MerchItem, MerchSection } from "@/contexts/AdminContext";
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

  const isUrl = value?.startsWith("http");

  // Route URL images through our server proxy to bypass hotlink blocks (e.g. postimg.cc)
  const PROXY = `https://builder-vortex-landing.onrender.com/api/image-proxy?url=`;
  const previewSrc = isUrl
    ? PROXY + encodeURIComponent(value!)
    : value ?? "";

  useEffect(() => {
    if (isUrl) setUrlInput(value!);
    setImgError(false);
  }, [value]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setImgError(false);
    onUrlChange(e);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="file" accept="image/*" onChange={onFileChange} disabled={isProcessing} />
      <Input type="text" placeholder="Or paste image URL" value={urlInput} onChange={handleUrlChange} />
      {value && (
        <div className="relative mt-2">
          {imgError ? (
            <div className="w-full rounded-md bg-green-50 border border-green-200 flex items-center gap-3 px-3 py-2">
              <a href={value} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 w-16 h-16 rounded border border-green-200 overflow-hidden bg-white flex items-center justify-center hover:opacity-80 transition-opacity"
                title="Click to open image in new tab">
                <img src={value} alt="preview" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <span className="text-[10px] text-green-600 font-semibold absolute">↗</span>
              </a>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-green-700">✓ URL saved</p>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">Preview blocked by host. Click the box to verify the image.</p>
                <a href={value} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-blue-500 hover:underline truncate block mt-0.5">
                  Open image ↗
                </a>
              </div>
            </div>
          ) : (
            <img
              key={previewSrc}
              src={previewSrc}
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
        <div><Label>Category</Label><Input value={formData.category || ""} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} placeholder="e.g., soups, mains, desserts" /></div>
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

// --- EVENT TYPE IMAGES PANEL ---
const EVENT_TYPES = [
  { key: "music",   label: "Live Music",     color: "bg-aussie-orange"      },
  { key: "dogs",    label: "Dog Events",     color: "bg-aussie-eucalyptus"  },
  { key: "family",  label: "Family Fun",     color: "bg-brown-600"          },
  { key: "special", label: "Special Events", color: "bg-aussie-burnt-red"   },
  { key: "food",    label: "Food Events",    color: "bg-sand-600"           },
];

function EventTypeImagesPanel({
  images,
  onUpdate,
}: {
  images: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}) {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFile = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(key);
    try {
      const base64 = await handleFileAndCompress(file);
      onUpdate(key, base64);
    } catch {
      alert("Image upload failed.");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-4">
      {EVENT_TYPES.map(({ key, label, color }) => {
        const img = images[key] || "";
        const isUploading = uploading === key;
        return (
          <div key={key} className="border border-sand-200 rounded-lg bg-cream-50 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${color} rounded-full shrink-0`} />
              <span className="font-body font-semibold text-brown-800 text-sm">{label}</span>
            </div>
            {img && (
              <div className="relative">
                <img
                  src={img}
                  alt={label}
                  className="w-full h-32 object-cover rounded-lg border border-sand-200"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => onUpdate(key, "")}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="space-y-1">
              <Input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={(e) => handleFile(key, e)}
              />
              <Input
                placeholder="Or paste image URL"
                value={img.startsWith("http") ? img : ""}
                onChange={(e) => onUpdate(key, e.target.value)}
              />
              {isUploading && (
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}


// month is 0-indexed (0 = January)
const ALL_HOLIDAYS: { key: string; name: string; month: number; day: number; }[] = [
  // Philippine National Holidays
  { key: "ph-newyear",       name: "New Year's Day",              month: 0,  day: 1  },
  { key: "ph-edsa",          name: "EDSA People Power Revolution", month: 1,  day: 25 },
  { key: "ph-araw-ng-kagitingan", name: "Araw ng Kagitingan (Day of Valor)", month: 3, day: 9 },
  { key: "ph-maundy",        name: "Maundy Thursday",             month: 3,  day: 17 }, // approximate, changes yearly
  { key: "ph-goodfriday",    name: "Good Friday",                 month: 3,  day: 18 }, // approximate
  { key: "ph-blacksaturday", name: "Black Saturday",              month: 3,  day: 19 }, // approximate
  { key: "ph-labor",         name: "Labor Day",                   month: 4,  day: 1  },
  { key: "ph-independence",  name: "Independence Day",            month: 5,  day: 12 },
  { key: "ph-ninoy",         name: "Ninoy Aquino Day",            month: 7,  day: 21 },
  { key: "ph-nationalheroes",name: "National Heroes Day",         month: 7,  day: 25 }, // last Monday of August
  { key: "ph-allsaints",     name: "All Saints' Day",             month: 10, day: 1  },
  { key: "ph-allsouls",      name: "All Souls' Day",              month: 10, day: 2  },
  { key: "ph-bonifacio",     name: "Bonifacio Day",               month: 10, day: 30 },
  { key: "ph-rizal",         name: "Rizal Day",                   month: 11, day: 30 },
  { key: "ph-christmas-eve", name: "Christmas Eve",               month: 11, day: 24 },
  { key: "ph-christmas",     name: "Christmas Day",               month: 11, day: 25 },
  { key: "ph-newyeareve",    name: "New Year's Eve",              month: 11, day: 31 },
  // Philippine Special Non-Working Holidays
  { key: "ph-chineseny",     name: "Chinese New Year",            month: 1,  day: 10 }, // approximate
  { key: "ph-eidalfitr",     name: "Eid'l Fitr",                  month: 3,  day: 10 }, // approximate, Islamic calendar
  { key: "ph-eidaladha",     name: "Eid'l Adha",                  month: 5,  day: 28 }, // approximate
  { key: "ph-eidalmawlid",   name: "Mawlid (Prophet's Birthday)", month: 8,  day: 15 }, // approximate
  // Well-Known International / Family Holidays
  { key: "valentines",       name: "Valentine's Day",             month: 1,  day: 14 },
  { key: "mothers-day",      name: "Mother's Day",                month: 4,  day: 11 }, // 2nd Sunday of May (approx)
  { key: "fathers-day",      name: "Father's Day",                month: 5,  day: 15 }, // 3rd Sunday of June (approx)
  { key: "halloween",        name: "Halloween",                   month: 9,  day: 31 },
  { key: "thanksgiving",     name: "Thanksgiving",                month: 10, day: 28 }, // 4th Thursday of November (approx)
];

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function HolidayHoursPanel({ statuses, onToggle }: { statuses: Record<string, boolean>; onToggle: (key: string, value: boolean) => void; }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

  const monthHolidays = ALL_HOLIDAYS.filter((h) => h.month === selectedMonth);

  return (
    <div className="space-y-4">
      {/* Month selector */}
      <div className="flex flex-wrap gap-1.5">
        {MONTH_NAMES.map((name, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMonth(idx)}
            className={`px-3 py-1 rounded-full text-xs font-semibold font-body transition-colors ${
              selectedMonth === idx
                ? "bg-aussie-orange text-white"
                : "bg-cream-100 border border-sand-300 text-brown-600 hover:border-aussie-orange hover:text-aussie-orange"
            } ${idx === now.getMonth() ? "ring-1 ring-aussie-orange ring-offset-1" : ""}`}
          >
            {name.slice(0, 3)}
            {idx === now.getMonth() && <span className="ml-1 text-[10px] opacity-70">●</span>}
          </button>
        ))}
      </div>

      <p className="text-xs text-brown-400 font-body">{MONTH_NAMES[selectedMonth]} {currentYear} — {monthHolidays.length} holiday{monthHolidays.length !== 1 ? "s" : ""}</p>

      {monthHolidays.length === 0 ? (
        <div className="text-center py-6 text-brown-400 font-body text-sm border border-dashed border-sand-300 rounded-lg">
          No holidays in {MONTH_NAMES[selectedMonth]}.
        </div>
      ) : (
        <div className="space-y-2">
          {monthHolidays.map((holiday) => {
            const statusKey = `${currentYear}-${holiday.key}`;
            const isOpen = statuses[statusKey] !== false;
            return (
              <div key={holiday.key} className="flex items-center justify-between p-3 rounded-lg border border-sand-200 bg-cream-50">
                <div>
                  <p className="font-body font-semibold text-brown-800 text-sm">{holiday.name}</p>
                  <p className="font-body text-xs text-brown-500">
                    {new Date(currentYear, holiday.month, holiday.day).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-body text-xs font-semibold ${isOpen ? "text-green-600" : "text-red-500"}`}>
                    {isOpen ? "Open" : "Closed"}
                  </span>
                  <Switch checked={isOpen} onCheckedChange={(val) => onToggle(statusKey, val)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EventForm({ event, onSubmit }: { event: Partial<Event>; onSubmit: (event: Partial<Event>) => void; }) {
  const [formData, setFormData] = useState(event);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const base64 = await handleFileAndCompress(file);
      setFormData((prev) => ({ ...prev, imageUrl: base64 }));
    } catch {
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
      {/* Event Image */}
      <div>
        <Label>Event Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageFile} disabled={isUploading} />
        <Input
          className="mt-1"
          placeholder="Or paste image URL"
          value={formData.imageUrl?.startsWith("http") ? formData.imageUrl : ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
        />
        {isUploading && (
          <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
          </div>
        )}
        {formData.imageUrl && (
          <div className="relative mt-2">
            <img
              src={formData.imageUrl}
              alt="preview"
              className="w-full h-36 object-cover rounded-lg border border-sand-200"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      <div><Label>Title</Label><Input value={formData.title || ""} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Date</Label><Input value={formData.date || ""} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} /></div>
        <div><Label>Time</Label><Input value={formData.time || ""} onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))} /></div>
      </div>
      <div><Label>Description</Label><Textarea value={formData.description || ""} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Type</Label><Select value={formData.type || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as Event["type"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="music">Live Music</SelectItem><SelectItem value="dogs">Dog Events</SelectItem><SelectItem value="family">Family Fun</SelectItem><SelectItem value="special">Special Events</SelectItem><SelectItem value="food">Food Events</SelectItem></SelectContent></Select></div>
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

// --- THEMES PANEL ---
function ThemesPanel() {
  const { siteContent, updateSiteContent } = useAdmin();
  const themeSettings = siteContent.themeSettings || { forcedThemeId: null, monthlyThemeEnabled: {} };
  const [selectedForceTheme, setSelectedForceTheme] = useState<string>(themeSettings.forcedThemeId || "none");

  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Import themes dynamically
  const THEMES = [
    { id: "default", name: "Default (Aussie)", month: -1 },
    { id: "new-year", name: "New Year", month: 0 },
    { id: "valentines", name: "Valentine's Day", month: 1 },
    { id: "spring", name: "Spring", month: 2 },
    { id: "easter", name: "Easter", month: 3 },
    { id: "summer", name: "Summer", month: 4 },
    { id: "mid-year", name: "Mid Year", month: 5 },
    { id: "independence", name: "Independence Day", month: 6 },
    { id: "autumn", name: "Autumn", month: 7 },
    { id: "back-to-school", name: "Back to School", month: 8 },
    { id: "halloween", name: "Halloween", month: 9 },
    { id: "thanksgiving", name: "Thanksgiving", month: 10 },
    { id: "christmas", name: "Christmas", month: 11 },
  ];

  const currentMonth = new Date().getMonth();
  const currentTheme = THEMES.find((t) => t.month === currentMonth);

  const handleToggleMonthlyTheme = async (month: number, enabled: boolean) => {
    const updated = { ...themeSettings.monthlyThemeEnabled, [month]: enabled };
    await updateSiteContent({
      themeSettings: { ...themeSettings, monthlyThemeEnabled: updated },
    });
  };

  const handleForceTheme = async () => {
    if (selectedForceTheme === "none") {
      await updateSiteContent({
        themeSettings: { ...themeSettings, forcedThemeId: null },
      });
      alert("✅ Force theme removed. Themes will now auto-switch by month.");
    } else {
      await updateSiteContent({
        themeSettings: { ...themeSettings, forcedThemeId: selectedForceTheme },
      });
      const themeName = THEMES.find((t) => t.id === selectedForceTheme)?.name || selectedForceTheme;
      alert(`✅ Force theme set to: ${themeName}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Theme Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎨 Current Theme Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {themeSettings.forcedThemeId && themeSettings.forcedThemeId !== "none" ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-amber-800">
                  🔒 Force Mode Active
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Theme: <strong>{THEMES.find((t) => t.id === themeSettings.forcedThemeId)?.name || "Unknown"}</strong>
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  This theme will be used regardless of the current month.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800">
                  ✅ Auto-Switching Mode
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Current Month: <strong>{MONTH_NAMES[currentMonth]}</strong>
                </p>
                {currentTheme && (
                  <p className="text-sm text-green-700">
                    Active Theme: <strong>{currentTheme.name}</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Force Theme Control */}
      <Card>
        <CardHeader>
          <CardTitle>🔒 Force Theme Override</CardTitle>
          <p className="text-sm text-brown-500">
            Override the auto-switching and force a specific theme to be active, even when it's not that month.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Theme to Force</Label>
            <Select value={selectedForceTheme} onValueChange={setSelectedForceTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a theme..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">🚫 None (Auto-Switch by Month)</SelectItem>
                {THEMES.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name} {theme.month >= 0 ? `(${MONTH_NAMES[theme.month]})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleForceTheme} className="w-full bg-aussie-orange hover:bg-aussie-burnt-red">
            {selectedForceTheme === "none" ? "Remove Force Theme" : "Force This Theme"}
          </Button>
        </CardContent>
      </Card>

      {/* Monthly Theme Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>📅 Monthly Theme Settings</CardTitle>
          <p className="text-sm text-brown-500">
            Enable or disable automatic theme switching for specific months. Enabled by default.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {THEMES.filter((t) => t.month >= 0).map((theme) => {
              const isEnabled = themeSettings.monthlyThemeEnabled?.[theme.month] !== false;
              return (
                <div
                  key={theme.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-sand-200 bg-cream-50"
                >
                  <div className="flex-1">
                    <p className="font-body font-semibold text-brown-800 text-sm">{theme.name}</p>
                    <p className="font-body text-xs text-brown-500">{MONTH_NAMES[theme.month]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-body text-xs font-semibold ${isEnabled ? "text-green-600" : "text-red-500"}`}>
                      {isEnabled ? "Enabled" : "Disabled"}
                    </span>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={(val) => handleToggleMonthlyTheme(theme.month, val)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- MERCH SECTION EDITOR ---

function MerchSectionEditor({
  section,
  onChange,
  onDelete,
}: {
  section: MerchSection;
  onChange: (s: MerchSection) => void;
  onDelete: () => void;
}) {
  return (
    <div className="border border-sand-200 rounded-lg bg-cream-50 p-4 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-sm text-brown-700 flex items-center gap-1">
          <GripVertical className="h-4 w-4 text-brown-300" />
          Section
        </span>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <div>
        <Label>Section Title *</Label>
        <Input
          value={section.title}
          placeholder="e.g. Flavours, Sizing, How to Order"
          onChange={(e) => onChange({ ...section, title: e.target.value })}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={section.description}
          placeholder="Describe this section..."
          onChange={(e) => onChange({ ...section, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Link URL (optional)</Label>
          <Input
            value={section.link}
            placeholder="https://..."
            onChange={(e) => onChange({ ...section, link: e.target.value })}
          />
        </div>
        <div>
          <Label>Link Label</Label>
          <Input
            value={section.linkLabel}
            placeholder="e.g. Buy Now"
            onChange={(e) => onChange({ ...section, linkLabel: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// --- MERCH ITEM FORM ---

const newSection = (): MerchSection => ({
  id: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  title: "",
  description: "",
  imageUrl: "",
  price: "",
  link: "",
  linkLabel: "",
});

function MerchItemForm({
  item,
  onSubmit,
}: {
  item: Partial<MerchItem>;
  onSubmit: (item: Partial<MerchItem>) => void;
}) {
  const [formData, setFormData] = useState<Partial<MerchItem>>({
    sections: [],
    ...item,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const base64 = await handleFileAndCompress(file);
      setFormData((prev) => ({ ...prev, imageUrl: base64 }));
    } catch {
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const updateSection = (idx: number, s: MerchSection) =>
    setFormData((prev) => ({
      ...prev,
      sections: (prev.sections ?? []).map((sec, i) => (i === idx ? s : sec)),
    }));

  const deleteSection = (idx: number) =>
    setFormData((prev) => ({
      ...prev,
      sections: (prev.sections ?? []).filter((_, i) => i !== idx),
    }));

  const addSection = () =>
    setFormData((prev) => ({
      ...prev,
      sections: [...(prev.sections ?? []), newSection()],
    }));

  return (
    <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
      {/* Product Image */}
      <div>
        <Label>Product Image *</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          disabled={isUploading}
        />
        <Input
          className="mt-1"
          placeholder="Or paste image URL"
          value={(formData as any).imageUrl?.startsWith("http") ? (formData as any).imageUrl : ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
        />
        {isUploading && (
          <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
          </div>
        )}
        {(formData as any).imageUrl && (
          <div className="relative mt-2">
            <img
              src={(formData as any).imageUrl}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg border border-sand-200"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Product Name *</Label>
          <Input
            value={formData.name || ""}
            placeholder="e.g. Vegemite Beef Jerky"
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <Label>Category *</Label>
          <Input
            value={formData.category || ""}
            placeholder="e.g. Food, Apparel, Drinkware"
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <Label>Price *</Label>
        <Input
          value={(formData as any).price || ""}
          placeholder="e.g. $12.00"
          onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
        />
      </div>
      <div>
        <Label>Tagline (optional)</Label>
        <Input
          value={formData.tagline || ""}
          placeholder="e.g. The ultimate Aussie snack"
          onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
        />
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Sections</Label>
          <Button size="sm" variant="outline" onClick={addSection}>
            <Plus className="h-4 w-4 mr-1" /> Add Section
          </Button>
        </div>
        {(formData.sections ?? []).length === 0 && (
          <p className="text-sm text-brown-400 text-center py-4 border border-dashed border-sand-300 rounded-lg">
            No sections yet — add one above
          </p>
        )}
        {(formData.sections ?? []).map((section, idx) => (
          <MerchSectionEditor
            key={section.id}
            section={section}
            onChange={(s) => updateSection(idx, s)}
            onDelete={() => deleteSection(idx)}
          />
        ))}
      </div>

      <Button
        className="w-full bg-aussie-orange hover:bg-aussie-burnt-red text-white"
        onClick={() => onSubmit(formData)}
      >
        <Save className="h-4 w-4 mr-2" /> Save Merch Item
      </Button>
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
    addMerchItem, updateMerchItem, deleteMerchItem,
  } = useAdmin();

  const [editingTexts, setEditingTexts] = useState(siteContent.siteTexts);
  const [editingImages, setEditingImages] = useState(siteContent.aboutImages);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [editingSettings, setEditingSettings] = useState(siteContent.socialLinks);

  useEffect(() => {
    setEditingTexts(siteContent.siteTexts);
    setEditingImages(siteContent.aboutImages);
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

  // --- JSON IMPORT HANDLER ---
  const handleMenuImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (!Array.isArray(imported)) throw new Error("File must contain an array of menu items.");

      // Validate each item and normalize
      const validatedItems = imported.map((item: any, idx: number) => {
        if (!item.name || !item.price || !item.category) {
          throw new Error(`Item at index ${idx} missing name, price, or category.`);
        }
        // Add id if missing
        if (!item.id) {
          item.id = `import-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 8)}`;
        }
        // Ensure optional fields
        if (!item.description) item.description = "";
        if (!item.image) item.image = "/placeholder.svg";
        if (typeof item.featured !== "boolean") item.featured = false;
        return item;
      });

      await updateSiteContent({ menuItems: validatedItems });
      alert(`✅ Successfully imported ${validatedItems.length} menu items.`);
    } catch (err: any) {
      alert(`❌ Import failed: ${err.message}`);
    } finally {
      setImporting(false);
      event.target.value = ""; // reset input
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

  // Group menu items by category for display (dynamic categories)
  const menuItemsByCategory = (siteContent.menuItems ?? []).reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

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
            <TabsList className="grid w-full grid-cols-9 gap-1">
              <TabsTrigger value="texts">All Text Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="themes">🎨 Themes</TabsTrigger>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="merch">
                <ShoppingBag className="h-4 w-4 mr-1" />Merch
              </TabsTrigger>
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

            <TabsContent value="settings">
              <Card>
                <CardHeader><CardTitle>Site Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Facebook URL</Label>
                    <Input
                      value={editingSettings?.facebook ?? ""}
                      onChange={(e) => setEditingSettings((prev) => ({ ...prev, facebook: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Instagram URL</Label>
                    <Input
                      value={editingSettings?.instagram ?? ""}
                      onChange={(e) => setEditingSettings((prev) => ({ ...prev, instagram: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Twitter URL</Label>
                    <Input
                      value={editingSettings?.twitter ?? ""}
                      onChange={(e) => setEditingSettings((prev) => ({ ...prev, twitter: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-start pt-2">
                    <Button onClick={handleSaveSettings}>
                      <Save className="mr-2 h-4 w-4" />Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
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
                  <CardHeader>
                    <CardTitle>Browser Tab Icon (Favicon)</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">The small icon shown in the browser tab. Use a square PNG for best results.</p>
                  </CardHeader>
                  <CardContent>
                    <ImageInput
                      label="Favicon"
                      value={siteContent.faviconImage}
                      onFileChange={handleGenericImageUpload((base64) => updateSiteContent({ faviconImage: base64 }))}
                      onUrlChange={(e) => updateSiteContent({ faviconImage: e.target.value })}
                      onRemove={() => updateSiteContent({ faviconImage: "" })}
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
              {/* Existing menu management card */}
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Manage Menu</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><Plus /> Add Item</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Menu Item</DialogTitle>
                        <DialogDescription className="sr-only">Fill in the form to add a new menu item.</DialogDescription>
                      </DialogHeader>
                      <MenuItemForm item={{}} onSubmit={async (item) => {
                        await addMenuItem(item as Omit<MenuItem, "id">);
                        alert("Item added!");
                      }} />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(menuItemsByCategory).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-bold capitalize text-lg mb-2">{category}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.map((item) => (
                          <Card key={item.id} className="p-4">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p>{item.price}</p>
                            <div className="flex gap-2 mt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm"><Edit /></Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit {item.name}</DialogTitle>
                                    <DialogDescription className="sr-only">Update the details for this menu item.</DialogDescription>
                                  </DialogHeader>
                                  <MenuItemForm item={item} onSubmit={async (updates) => {
                                    await updateMenuItem(item.id, updates);
                                    alert("Item updated!");
                                  }} />
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={async () => {
                                if (confirm("Delete?")) await deleteMenuItem(item.id);
                              }}>
                                <Trash2 />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Physical Menu Images Card */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Physical Menu Gallery</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload photographs of your physical menus. These appear as an elegant gallery on the Menu page so guests can browse the printed menus before they arrive.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing images */}
                  {(siteContent.physicalMenuImages ?? []).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {(siteContent.physicalMenuImages ?? []).map((img, idx) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.url}
                            alt={img.caption || `Menu page ${idx + 1}`}
                            className="w-full aspect-[3/4] object-cover rounded-lg border border-gray-200"
                          />
                          <div className="mt-1">
                            <Input
                              value={img.caption}
                              placeholder="Caption (optional)"
                              className="text-xs h-7"
                              onChange={async (e) => {
                                const updated = (siteContent.physicalMenuImages ?? []).map((m) =>
                                  m.id === img.id ? { ...m, caption: e.target.value } : m
                                );
                                await updateSiteContent({ physicalMenuImages: updated });
                              }}
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={async () => {
                              if (confirm("Remove this menu photo?")) {
                                const updated = (siteContent.physicalMenuImages ?? []).filter((m) => m.id !== img.id);
                                await updateSiteContent({ physicalMenuImages: updated });
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload new */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center space-y-3">
                    <Upload className="h-8 w-8 text-gray-300 mx-auto" />
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Upload Menu Photos</p>
                      <p className="text-xs text-gray-400 mt-0.5">Select one or multiple images. They will be added to the gallery.</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isProcessing}
                      onChange={async (e) => {
                        const files = Array.from(e.target.files ?? []);
                        if (!files.length) return;
                        setIsProcessing(true);
                        try {
                          const newImages = await Promise.all(
                            files.map(async (file) => ({
                              id: `pmenu-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
                              url: await handleFileAndCompress(file),
                              caption: "",
                            }))
                          );
                          const existing = siteContent.physicalMenuImages ?? [];
                          await updateSiteContent({ physicalMenuImages: [...existing, ...newImages] });
                          alert(`✅ ${newImages.length} photo${newImages.length !== 1 ? "s" : ""} added to the gallery.`);
                        } catch {
                          alert("Image upload failed. Please try again.");
                        } finally {
                          setIsProcessing(false);
                          e.target.value = "";
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-aussie-orange file:text-white hover:file:bg-aussie-burnt-red disabled:opacity-50 cursor-pointer"
                    />
                    {isProcessing && (
                      <div className="flex items-center justify-center text-sm text-blue-600">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing images…
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* NEW: JSON Import Card */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Import Full Menu from JSON</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Upload a <strong>.json</strong> file containing an array of menu items.
                      <br />
                      Format: <code className="text-xs">[{"name, price, category, description, featured, image"}]</code>
                      <br />
                      The current menu will be <strong>replaced</strong> with the imported data.
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="application/json"
                        onChange={handleMenuImport}
                        disabled={importing}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-aussie-orange file:text-white hover:file:bg-aussie-burnt-red disabled:opacity-50"
                      />
                      {importing && <Loader2 className="h-5 w-5 animate-spin text-aussie-orange" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <div className="space-y-6">
                {/* Manage Events */}
                <Card>
                  <CardHeader className="flex justify-between items-center"><CardTitle>Manage Events</CardTitle><Dialog><DialogTrigger asChild><Button><Plus /> Add Event</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add Event</DialogTitle><DialogDescription className="sr-only">Fill in the form to add a new event.</DialogDescription></DialogHeader><EventForm event={{}} onSubmit={async (event) => { await addEvent(event as Omit<Event, "id">); alert("Event added!"); }} /></DialogContent></Dialog></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    {(siteContent.events ?? []).map((event) => (<Card key={event.id} className="p-4"><h3 className="font-bold">{event.title}</h3><p>{event.date} at {event.time}</p><div className="flex gap-2 mt-2"><Dialog><DialogTrigger asChild><Button variant="outline" size="sm"><Edit /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit {event.title}</DialogTitle><DialogDescription className="sr-only">Update the details for this event.</DialogDescription></DialogHeader><EventForm event={event} onSubmit={async (updates) => { await updateEvent(event.id, updates); alert("Event updated!"); }} /></DialogContent></Dialog><Button variant="destructive" size="sm" onClick={async () => { if (confirm("Delete?")) await deleteEvent(event.id); }}><Trash2 /></Button></div></Card>))}
                  </CardContent>
                </Card>

                {/* Event Type Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Event Type Images</CardTitle>
                    <p className="text-sm text-brown-500">Upload a banner image for each event type. These appear on event cards and the legend.</p>
                  </CardHeader>
                  <CardContent>
                    <EventTypeImagesPanel
                      images={(siteContent as any).eventTypeImages ?? {}}
                      onUpdate={async (key, value) => {
                        const updated = { ...((siteContent as any).eventTypeImages ?? {}), [key]: value };
                        await updateSiteContent({ eventTypeImages: updated } as any);
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Holiday Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Holiday Hours</CardTitle>
                    <p className="text-sm text-brown-500">Browse all holidays by month. Toggle open/closed for each one. Defaults to open.</p>
                  </CardHeader>
                  <CardContent>
                    <HolidayHoursPanel
                      statuses={(siteContent as any).holidayStatuses ?? {}}
                      onToggle={async (key, value) => {
                        const updated = { ...((siteContent as any).holidayStatuses ?? {}), [key]: value };
                        await updateSiteContent({ holidayStatuses: updated } as any);
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="merch">
              <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-aussie-orange" />
                      Manage Merch
                    </CardTitle>
                    <p className="text-sm text-brown-500 mt-1">
                      Add product cards with multiple sections — each section can have its own description, photo and buy link.
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-aussie-orange hover:bg-aussie-burnt-red text-white shrink-0">
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Merch Item</DialogTitle>
                        <DialogDescription>
                          Create a product card. Add sections for different variants, flavours or details.
                        </DialogDescription>
                      </DialogHeader>
                      <MerchItemForm
                        item={{}}
                        onSubmit={async (item) => {
                          await addMerchItem(item as Omit<MerchItem, "id">);
                          alert("Merch item added!");
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {(siteContent as any).merch?.length === 0 || !(siteContent as any).merch ? (
                    <div className="text-center py-16 border-2 border-dashed border-sand-200 rounded-xl">
                      <ShoppingBag className="h-12 w-12 text-brown-300 mx-auto mb-3" />
                      <p className="font-body text-brown-400">No merch items yet.</p>
                      <p className="text-sm text-brown-300">Click "Add Item" to get started.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {((siteContent as any).merch as MerchItem[]).map((item) => (
                        <Card key={item.id} className="border-sand-200 overflow-hidden">
                          <div className="bg-gradient-to-br from-sand-100 to-cream-100 px-4 pt-4 pb-3">
                            {item.category && (
                              <span className="text-xs font-semibold text-aussie-orange uppercase tracking-wide">
                                {item.category}
                              </span>
                            )}
                            <h3 className="font-heading font-bold text-brown-800 text-lg leading-tight mt-0.5">
                              {item.name}
                            </h3>
                            {item.tagline && (
                              <p className="text-xs text-brown-500 mt-0.5">{item.tagline}</p>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <p className="text-xs text-brown-400 mb-3">
                              {(item.sections ?? []).length} section{(item.sections ?? []).length !== 1 ? "s" : ""}
                              {(item.sections ?? []).length > 0 && (
                                <span className="ml-2 text-brown-300">
                                  — {(item.sections ?? []).map((s) => s.title).filter(Boolean).join(", ")}
                                </span>
                              )}
                            </p>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="h-3 w-3 mr-1" /> Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit {item.name}</DialogTitle>
                                    <DialogDescription className="sr-only">Update this merch item.</DialogDescription>
                                  </DialogHeader>
                                  <MerchItemForm
                                    item={item}
                                    onSubmit={async (updates) => {
                                      await updateMerchItem(item.id, updates);
                                      alert("Merch item updated!");
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={async () => {
                                  if (confirm(`Delete "${item.name}"?`)) await deleteMerchItem(item.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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

            <TabsContent value="themes">
              <ThemesPanel />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
