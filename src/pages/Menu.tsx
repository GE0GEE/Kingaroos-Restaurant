import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const menuSections = [
  {
    id: "starters",
    title: "Starters",
    items: [
      {
        name: "Aussie Damper Bread",
        description:
          "Traditional bush bread served warm with native pepper butter",
        price: "$12",
        featured: true,
      },
      {
        name: "Kangaroo Carpaccio",
        description:
          "Thinly sliced kangaroo with native herbs and lemon myrtle",
        price: "$18",
      },
      {
        name: "Salt & Pepper Calamari",
        description: "Fresh local calamari with bush tomato aioli",
        price: "$16",
      },
      {
        name: "Wombat Holes",
        description: "House-made sausage rolls with tomato relish",
        price: "$14",
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      {
        name: "The Outback Burger",
        description:
          "Grass-fed beef, beetroot, egg, and our secret sauce on damper bun",
        price: "$28",
        featured: true,
      },
      {
        name: "Barramundi & Chips",
        description:
          "Beer-battered barramundi with hand-cut chips and mushy peas",
        price: "$32",
      },
      {
        name: "Slow-Cooked Lamb",
        description:
          "Rosemary lamb shoulder with roasted vegetables and mint jus",
        price: "$36",
      },
      {
        name: "Veggie Pie Floater",
        description:
          "Traditional vegetarian pie in mushy peas with tomato sauce",
        price: "$24",
      },
      {
        name: "Crocodile Curry",
        description: "Tender crocodile in coconut curry with jasmine rice",
        price: "$34",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Lamington Trifle",
        description: "Layers of sponge, cream, and berry compote with coconut",
        price: "$14",
      },
      {
        name: "Pavlova Stack",
        description: "Mini pavlovas with native fruits and cream",
        price: "$16",
        featured: true,
      },
      {
        name: "Anzac Biscuit Cheesecake",
        description: "Golden syrup cheesecake with oat crumble",
        price: "$15",
      },
      {
        name: "Wattleseed Ice Cream",
        description: "House-made ice cream with native wattleseed",
        price: "$12",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      {
        name: "Flat White",
        description: "Premium Australian coffee blend",
        price: "$5",
      },
      {
        name: "Billy Tea",
        description: "Traditional bush tea blend",
        price: "$4",
      },
      {
        name: "Coopers Pale Ale",
        description: "Classic Australian beer on tap",
        price: "$8",
      },
      {
        name: "Shiraz by the Glass",
        description: "South Australian red wine",
        price: "$12",
      },
      {
        name: "Lemon Myrtle Spritz",
        description: "Refreshing native citrus cocktail",
        price: "$14",
        featured: true,
      },
    ],
  },
];

export default function Menu() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-sand-200 to-brown-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl font-bold text-brown-800 mb-4">
            Our Menu
          </h1>
          <p className="font-body text-xl text-brown-600 max-w-2xl mx-auto">
            Authentic Australian flavors with a modern twist. Every dish is made
            with love, and every purchase helps a rescue dog find their forever
            home.
          </p>
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="bg-cream-100 py-8 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {menuSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="font-body font-semibold text-brown-700 hover:text-aussie-orange transition-colors px-4 py-2 rounded-full hover:bg-sand-200"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {menuSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="font-heading text-4xl font-bold text-brown-800 text-center mb-12">
                {section.title}
              </h2>
              <div className="grid gap-6">
                {section.items.map((item, index) => (
                  <Card
                    key={index}
                    className={`border-sand-200 shadow-sm hover:shadow-md transition-shadow ${
                      item.featured ? "ring-2 ring-aussie-orange" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-heading text-xl font-bold text-brown-800">
                              {item.name}
                            </h3>
                            {item.featured && (
                              <Badge className="bg-aussie-orange text-white font-body text-xs">
                                House Special
                              </Badge>
                            )}
                          </div>
                          <p className="font-body text-brown-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="ml-6">
                          <span className="font-heading text-xl font-bold text-aussie-orange">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-aussie-orange py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Dine With Us?
          </h2>
          <p className="font-body text-xl text-cream-100 mb-8">
            Book your table today and help us make a difference for rescue dogs!
          </p>
          <div className="space-y-4">
            <p className="font-body text-cream-100">
              📞 Call us at{" "}
              <span className="font-semibold">(02) 1234 5678</span>
            </p>
            <p className="font-body text-cream-100">
              📍 123 Outback Lane, Sydney, NSW 2000
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
