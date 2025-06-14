// src/config/siteConfig.ts

export const promotionCategories = {
  happyHour: {
    name: "Happy Hour",
    badge: "Limited Time",
    colorClasses: "from-aussie-orange to-aussie-burnt-red",
  },
  dogSpecial: {
    name: "Dog Special",
    badge: "Pawsome Deal",
    colorClasses: "from-aussie-eucalyptus to-green-700",
  },
  familyDeal: {
    name: "Family Deal",
    badge: "Family Fun",
    colorClasses: "from-brown-600 to-brown-800",
  },
  loyalty: {
    name: "Loyalty Offer",
    badge: "Member's Gift",
    colorClasses: "from-sand-600 to-aussie-orange",
  },
  general: {
    name: "Special Offer",
    badge: "Special",
    colorClasses: "from-gray-500 to-gray-700",
  },
};
export type PromotionCategoryKey = keyof typeof promotionCategories;
