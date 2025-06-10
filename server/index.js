const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "data", "content.json");

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Default content
const defaultContent = {
  logoImage: "",
  heroImages: [
    {
      url: "/placeholder.svg",
      alt: "Restaurant exterior with outdoor seating and happy customers with dogs",
      gradient: "from-sand-300/80 to-brown-300/80",
    },
    {
      url: "/placeholder.svg",
      alt: "Delicious Australian food spread on wooden table",
      gradient: "from-aussie-orange/70 to-brown-400/80",
    },
    {
      url: "/placeholder.svg",
      alt: "Happy rescue dogs playing in restaurant garden area",
      gradient: "from-aussie-eucalyptus/60 to-sand-400/80",
    },
  ],
  siteTexts: {
    homeTitle: "KINGAROOS",
    homeSubtitle: "Great Food. Good Vibes. Helping Paws.",
    welcomeTitle: "Welcome to the Pack",
    welcomeText1:
      "At KINGAROOS, we believe great food brings people together – and their furry friends too! Our cozy restaurant serves up delicious Australian-inspired dishes in a warm, dog-friendly atmosphere where every meal makes a difference.",
    welcomeText2:
      "Started by the King family with a passion for good food and a love for rescue dogs, we've created a space where community, compassion, and culinary excellence come together.",
    menuPageTitle: "Our Menu",
    menuPageSubtitle:
      "Authentic Australian flavors with a modern twist. Every dish is made with love, and every purchase helps a rescue dog find their forever home.",
    dogRescueTitle: "Dogs We're Helping",
    dogRescueSubtitle:
      "At KINGAROOS, every plate you order helps rescue a dog in need. We partner with local shelters to provide food, medical care, and love to abandoned dogs while they wait for their forever homes.",
    eventsTitle: "Events & Happenings",
    eventsSubtitle:
      "Join us for special events, live music, and community gatherings. There's always something fun happening at KINGAROOS!",
    promotionsTitle: "Current Promotions",
    promotionsSubtitle:
      "Great food at even better prices! Check out our ongoing deals and special offers that make dining at KINGAROOS even more delicious.",
    aboutTitle: "Our Story",
    aboutSubtitle:
      "From a small food truck dream to a community gathering place that's changing lives, one meal and one rescue dog at a time.",
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Come visit us, give us a call, or connect with us online. We'd love to hear from you and welcome you to the KINGAROOS family!",
  },
  dogs: [
    {
      id: "1",
      name: "Bandit",
      breed: "Border Collie Mix",
      age: "3 years old",
      personality:
        "Energetic and loves playing fetch. Great with kids and other dogs.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Found wandering the streets, scared and malnourished. Now a confident, happy dog ready for adventure!",
    },
    {
      id: "2",
      name: "Rosie",
      breed: "Golden Retriever Mix",
      age: "5 years old",
      personality:
        "Gentle soul who loves cuddles and long walks. Perfect family dog.",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      rescueStory:
        "Abandoned at a shelter, she was shy and withdrawn. Today she's full of love and ready to be someone's best friend!",
    },
  ],
  menuItems: [
    {
      id: "1",
      name: "Aussie Damper Bread",
      description:
        "Traditional bush bread served warm with native pepper butter",
      price: "$12",
      featured: true,
      category: "starters",
    },
    {
      id: "2",
      name: "The Outback Burger",
      description:
        "Grass-fed beef, beetroot, egg, and our secret sauce on damper bun",
      price: "$28",
      featured: true,
      category: "mains",
    },
  ],
  events: [
    {
      id: "1",
      title: "Live Acoustic Friday",
      date: "Friday, Dec 8",
      time: "7:00 PM - 9:00 PM",
      description: "Local musicians perform acoustic sets while you dine",
      type: "music",
      category: "thisWeek",
    },
  ],
  promotions: [
    {
      id: "1",
      title: "Happy Hour Special",
      subtitle: "Monday, Wednesday & Friday",
      details: "20% off all drinks from 2-5 PM",
      description: "Unwind with discounted drinks and great vibes",
      badge: "Weekly Deal",
      color: "from-aussie-orange to-aussie-burnt-red",
    },
  ],
};

// Read content from file
const readContent = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default content
    await writeContent(defaultContent);
    return defaultContent;
  }
};

// Write content to file
const writeContent = async (content) => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2));
};

// API Routes

// Get all content
app.get("/api/content", async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to read content" });
  }
});

// Update site content
app.put("/api/content", async (req, res) => {
  try {
    const currentContent = await readContent();
    const updatedContent = { ...currentContent, ...req.body };
    await writeContent(updatedContent);
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update content" });
  }
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "kingarooadmin") {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// Dogs CRUD
app.post("/api/dogs", async (req, res) => {
  try {
    const content = await readContent();
    const newDog = { ...req.body, id: Date.now().toString() };
    content.dogs.push(newDog);
    await writeContent(content);
    res.json(newDog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create dog" });
  }
});

app.put("/api/dogs/:id", async (req, res) => {
  try {
    const content = await readContent();
    const dogIndex = content.dogs.findIndex((dog) => dog.id === req.params.id);
    if (dogIndex === -1) {
      return res.status(404).json({ error: "Dog not found" });
    }
    content.dogs[dogIndex] = { ...content.dogs[dogIndex], ...req.body };
    await writeContent(content);
    res.json(content.dogs[dogIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update dog" });
  }
});

app.delete("/api/dogs/:id", async (req, res) => {
  try {
    const content = await readContent();
    content.dogs = content.dogs.filter((dog) => dog.id !== req.params.id);
    await writeContent(content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete dog" });
  }
});

// Menu Items CRUD
app.post("/api/menu-items", async (req, res) => {
  try {
    const content = await readContent();
    const newItem = { ...req.body, id: Date.now().toString() };
    content.menuItems.push(newItem);
    await writeContent(content);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

app.put("/api/menu-items/:id", async (req, res) => {
  try {
    const content = await readContent();
    const itemIndex = content.menuItems.findIndex(
      (item) => item.id === req.params.id,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    content.menuItems[itemIndex] = {
      ...content.menuItems[itemIndex],
      ...req.body,
    };
    await writeContent(content);
    res.json(content.menuItems[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

app.delete("/api/menu-items/:id", async (req, res) => {
  try {
    const content = await readContent();
    content.menuItems = content.menuItems.filter(
      (item) => item.id !== req.params.id,
    );
    await writeContent(content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

// Events CRUD
app.post("/api/events", async (req, res) => {
  try {
    const content = await readContent();
    const newEvent = { ...req.body, id: Date.now().toString() };
    content.events.push(newEvent);
    await writeContent(content);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const content = await readContent();
    const eventIndex = content.events.findIndex(
      (event) => event.id === req.params.id,
    );
    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found" });
    }
    content.events[eventIndex] = { ...content.events[eventIndex], ...req.body };
    await writeContent(content);
    res.json(content.events[eventIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const content = await readContent();
    content.events = content.events.filter(
      (event) => event.id !== req.params.id,
    );
    await writeContent(content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Promotions CRUD
app.post("/api/promotions", async (req, res) => {
  try {
    const content = await readContent();
    const newPromotion = { ...req.body, id: Date.now().toString() };
    content.promotions.push(newPromotion);
    await writeContent(content);
    res.json(newPromotion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create promotion" });
  }
});

app.put("/api/promotions/:id", async (req, res) => {
  try {
    const content = await readContent();
    const promoIndex = content.promotions.findIndex(
      (promo) => promo.id === req.params.id,
    );
    if (promoIndex === -1) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    content.promotions[promoIndex] = {
      ...content.promotions[promoIndex],
      ...req.body,
    };
    await writeContent(content);
    res.json(content.promotions[promoIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update promotion" });
  }
});

app.delete("/api/promotions/:id", async (req, res) => {
  try {
    const content = await readContent();
    content.promotions = content.promotions.filter(
      (promo) => promo.id !== req.params.id,
    );
    await writeContent(content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete promotion" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
