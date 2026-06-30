import { ServiceItem, WhyChooseUsItem, DeliveryStep, ProductItem, TestimonialItem, FAQItem, StatsItem } from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "fastfood",
    title: "Fast Food",
    description: "Sizzling rolls, hand-crafted momos, hot noodles, savory paneer rolls, burgers, and crispy fries.",
    iconName: "Flame",
    tag: "Hot & Fresh"
  },
  {
    id: "restaurant",
    title: "Restaurant Food",
    description: "North Indian curries, South Indian dosas, Biryani plates, Thalis, and Mughlai dinners.",
    iconName: "Utensils"
  },
  {
    id: "grocery",
    title: "Grocery Essentials",
    description: "Premium basmati rice, sharbati wheat flour, cooking oils, iodized salt, sugar, and pulses.",
    iconName: "ShoppingBag"
  },
  {
    id: "fruits",
    title: "Fresh Fruits",
    description: "Sweet royal apples, alphonso mangoes, fresh oranges, watermelons, and tender coconuts.",
    iconName: "Apple"
  },
  {
    id: "vegetables",
    title: "Fresh Vegetables",
    description: "Potatoes, red onions, vine tomatoes, spinach, ginger, garlic, and fresh green chillies.",
    iconName: "Sprout",
    tag: "Organic"
  },
  {
    id: "dairy",
    title: "Dairy & Bakery",
    description: "Chilled milk, fresh paneer, butter, cheese slices, brown bread, and farm eggs.",
    iconName: "Coffee"
  },
  {
    id: "beverages",
    title: "Beverages",
    description: "Ice-cold soft drinks, natural juices, mineral water, CTC tea, and instant premium coffee.",
    iconName: "GlassWater"
  },
  {
    id: "snacks",
    title: "Snacks & Chocolates",
    description: "Classic potato chips, crispy namkeen, popcorn, butter cookies, and chocolates.",
    iconName: "Cookie"
  },
  {
    id: "stationery",
    title: "Stationery Supply",
    description: "Gel pens, wooden pencils, ruled registers, notebooks, and colorful sticky notes.",
    iconName: "BookOpen"
  },
  {
    id: "household",
    title: "Household Essentials",
    description: "Surf Excel detergent, floor cleaners, kitchen foil, and garbage bags.",
    iconName: "Home"
  },
  {
    id: "personal",
    title: "Personal Care",
    description: "Neem face wash, nourishing moisturizers, body deodorants, and shaving kits.",
    iconName: "Sparkles"
  },
  {
    id: "daily",
    title: "Daily Needs",
    description: "Everyday kitchen essentials, breakfast items, instant food, baby care, pet food, and seasonal items.",
    iconName: "Zap",
    tag: "Must Haves"
  }
];

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "speed",
    title: "Fast Delivery",
    description: "Our hyper-local fleet knows the shortcuts in Salt Lake to deliver everything hot, fresh, and on time.",
    iconName: "Zap"
  },
  {
    id: "fresh",
    title: "Fresh Products",
    description: "Fruits, vegetables, and food items are carefully inspected and packed in temperature-controlled bags.",
    iconName: "Leaf"
  },
  {
    id: "range",
    title: "Wide Product Range",
    description: "From steaming hot biryani to fresh daily groceries and stationery, we deliver over 600+ items.",
    iconName: "ShoppingBag"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Ordering",
    description: "No complex apps needed. Order instantly through our seamless and secure WhatsApp integration.",
    iconName: "MessageCircle"
  },
  {
    id: "trust",
    title: "Trusted Local Service",
    description: "Rated 4.9/5 stars by thousands of families. We believe in premium local services at standard flat rates.",
    iconName: "ShieldCheck"
  },
  {
    id: "support",
    title: "Friendly Support",
    description: "Our dedicated support executives are always available via WhatsApp or phone call to assist you.",
    iconName: "Headphones"
  }
];

export const deliveryProcessData: DeliveryStep[] = [
  {
    stepNumber: 1,
    title: "Choose Product",
    description: "Browse curated collections of foods, farm-fresh produce, or daily stationery items.",
    iconName: "Search"
  },
  {
    stepNumber: 2,
    title: "Send Enquiry",
    description: "Tap 'Connect Now' to fill out your quick delivery details in our premium frosted glass modal.",
    iconName: "ShoppingCart"
  },
  {
    stepNumber: 3,
    title: "Instant Confirmation",
    description: "Open WhatsApp automatically with the auto-populated message to connect with our dispatch team.",
    iconName: "CheckCircle"
  },
  {
    stepNumber: 4,
    title: "Rider Assigned",
    description: "A dedicated local QuickDrop rider accepts and picks up your package from the nearest partner store.",
    iconName: "Truck"
  },
  {
    stepNumber: 5,
    title: "Delivery at Doorstep",
    description: "Your delivery arrives intact in under 30 minutes, packed elegantly in eco-friendly bags.",
    iconName: "Gift"
  }
];

// Seed templates for programmatic product expansion (making 650+ unique products!)
interface SeedTemplate {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  isVeg?: boolean;
  isOrganic?: boolean;
  isFreshToday?: boolean;
  prescriptionRequired?: boolean;
  variants: {
    nameSuffix?: string;
    unit: string;
    rating: number;
    isPopular?: boolean;
    isFastDelivery?: boolean;
    isAvailableToday?: boolean;
  }[];
}

const productSeeds: SeedTemplate[] = [
  // 1. Fast Food
  {
    name: "Kathi Roll",
    category: "Fast Food",
    subcategory: "Rolls",
    description: "Delicious Kolkata-style kathi roll wrapped in a flaky lachha paratha with onions and green chillies.",
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Double Chicken", unit: "1 Pc", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Egg Chicken", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Double Egg", unit: "1 Pc", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Classic Paneer Tikka", unit: "1 Pc", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Garden Veggie", unit: "1 Pc", rating: 4.5, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Steamed Momos",
    category: "Fast Food",
    subcategory: "Momos",
    description: "Soft, juicy hand-crafted momos stuffed with seasonal fillings, served with spicy garlic red chilli dip.",
    image: "https://images.unsplash.com/photo-1625220194771-7ebedd0b4a2b?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Juicy Chicken", unit: "6 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Fresh Vegetable", unit: "6 Pcs", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Paneer Cheese", unit: "6 Pcs", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Fried Momos",
    category: "Fast Food",
    subcategory: "Momos",
    description: "Crispy, golden-fried dumplings served with spicy schezwan sauce and creamy mayo.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Crispy Chicken", unit: "6 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Crunchy Veggie", unit: "6 Pcs", rating: 4.5, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Schezwan Cheese Paneer", unit: "6 Pcs", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Hakka Noodles",
    category: "Fast Food",
    subcategory: "Chowmein",
    description: "Classic stir-fried noodles loaded with crunchy vegetables, soy sauce, and aromatic white pepper.",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Veg Schezwan", unit: "1 Plate", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Egg Hakka", unit: "1 Plate", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Premium Chicken Garlic", unit: "1 Plate", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Gourmet Burger",
    category: "Fast Food",
    subcategory: "Burgers",
    description: "Juicy customized patty layered with fresh lettuce, sliced tomatoes, onions, cheese, and chef's special secret burger sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Crispy Aloo Tikki Cheese", unit: "1 Pc", rating: 4.6, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Double Spicy Grilled Chicken", unit: "1 Pc", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Paneer Maharaja Veg", unit: "1 Pc", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Classic Pizza",
    category: "Fast Food",
    subcategory: "Pizza",
    description: "Fresh hand-stretched crust topped with rich tomato sauce, premium mozzarella cheese, and selection of toppings.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Double Cheese Margherita", unit: "8 Inch", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Spicy Chicken Tikka Feast", unit: "8 Inch", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Garden Fresh Veggie Delight", unit: "8 Inch", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Fresh Grilled Sandwich",
    category: "Fast Food",
    subcategory: "Sandwiches",
    description: "Fresh golden toasted bread stuffed with butter, loaded fillings, and grilled perfectly with mint chutney.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Bombay Masala Grilled", unit: "1 Pc", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Corn & Cheese Golden", unit: "1 Pc", rating: 4.5, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Creamy Chicken Mayo Club", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 2. Restaurant Food
  {
    name: "Aromatic Basmati Biryani",
    category: "Restaurant Food",
    subcategory: "Biryani",
    description: "Rich, aromatic long-grain basmati rice cooked on slow fire dum-pukht with Mughlai spices, served with fresh raita and potato.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Kolkata Chicken Dum", unit: "1 Plate", rating: 4.9, isPopular: true, isFastDelivery: false, isAvailableToday: true },
      { nameSuffix: "Royal Mutton Dum Special", unit: "1 Plate", rating: 4.9, isPopular: true, isFastDelivery: false, isAvailableToday: true },
      { nameSuffix: "Spiced Paneer Tikka Veg", unit: "1 Plate", rating: 4.5, isPopular: false, isFastDelivery: false, isAvailableToday: true }
    ]
  },
  {
    name: "Curry Handi",
    category: "Restaurant Food",
    subcategory: "North Indian",
    description: "Slow-simmered rich North Indian style gravy prepared with real butter, cashew paste, and fresh cream.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Shahi Paneer Butter Masala", unit: "500 Ml", rating: 4.8, isPopular: true, isFastDelivery: false, isAvailableToday: true },
      { nameSuffix: "Dhabastyle Dal Makhani Black", unit: "500 Ml", rating: 4.7, isPopular: true, isFastDelivery: false, isAvailableToday: true },
      { nameSuffix: "Royal Chicken Tikka Butter Masala", unit: "500 Ml", rating: 4.9, isPopular: true, isFastDelivery: false, isAvailableToday: true }
    ]
  },
  {
    name: "South Indian Tiffin",
    category: "Restaurant Food",
    subcategory: "South Indian",
    description: "Traditional South Indian style savory crepes and steamed rice cakes, served with piping hot sambar and fresh coconut chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Ghee Roast Masala Dosa", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Super Soft Steamed Idli", unit: "2 Pcs", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Crispy Fried Medu Vada", unit: "2 Pcs", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Classic Indian Bread",
    category: "Restaurant Food",
    subcategory: "Tandoori",
    description: "Freshly baked Indian clay-oven flatbreads brushed with premium butter or garlic.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Butter Tandoori Roti", unit: "1 Pc", rating: 4.5, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Butter Naan Soft", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Garlic Butter Naan Premium", unit: "1 Pc", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 3. Grocery & Staples
  {
    name: "Basmati Rice",
    category: "Grocery & Staples",
    subcategory: "Rice",
    description: "Premium long-grain, aged basmati rice perfect for cooking daily pulao, biryani, or steamed rice.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "India Gate Super", unit: "1 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "India Gate Premium Feast", unit: "5 Kg", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Daawat Rozana", unit: "1 Kg", rating: 4.5, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Wheat Flour (Atta)",
    category: "Grocery & Staples",
    subcategory: "Flour",
    description: "100% pure stone-ground, whole wheat flour made from premium high-grade Sharbati grains for soft rotis.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Aashirvaad Shudh Chakki", unit: "5 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Aashirvaad Superior MP Sharbati", unit: "10 Kg", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Fortune Premium Chakki", unit: "5 Kg", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Cooking Oil",
    category: "Grocery & Staples",
    subcategory: "Oils",
    description: "Healthy multi-filtered refined and cold-pressed cooking oils containing rich omega nutrients.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Fortune Refined Soyabean Oil", unit: "1 Ltr", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Fortune Kachi Ghani Mustard Oil", unit: "1 Ltr", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Saffola Gold Pro Healthy Blend", unit: "2 Ltr", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Organic Honey",
    category: "Organic Products",
    subcategory: "Honey",
    description: "100% pure raw wild forest honey rich in active natural enzymes, vitamins, and high immunity properties.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isOrganic: true,
    variants: [
      { nameSuffix: "Dabur Pure Wild", unit: "250 Gm", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Organic India Forest Honey", unit: "500 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 4. Fruits
  {
    name: "Apple",
    category: "Fruits",
    subcategory: "Fresh Fruits",
    description: "Crispy, sweet, and incredibly juicy high-grade apples handpicked and imported from Himalayan orchards.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Royal Delicious Red", unit: "4 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Washington Crisp Premium", unit: "1 Kg", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Shimla Sweet Selection", unit: "1 Kg", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Banana",
    category: "Fruits",
    subcategory: "Fresh Fruits",
    description: "Perfectly sweet, energetic, and fully ripened bananas sourced directly from local partner orchards.",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Robust Robusta Yellow", unit: "6 Pcs", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Singapuri Sweet", unit: "1 Dozen", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Mangoes",
    category: "Fruits",
    subcategory: "Seasonal Products",
    description: "Sweet, highly aromatic, and fully ripe premium quality King of Mangoes, handpicked for peak sweetness.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Alphonso Devgad Hapus", unit: "2 Pcs", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Sweetest Safeda Premium", unit: "1 Kg", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 5. Vegetables
  {
    name: "Potato",
    category: "Vegetables",
    subcategory: "Fresh Vegetables",
    description: "Premium versatile, soil-rich local potatoes sourced daily from verified local cold storages.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Jyoti Potatoes Fresh", unit: "1 Kg", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Chandra Mukhi Premium", unit: "2 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Onions",
    category: "Vegetables",
    subcategory: "Fresh Vegetables",
    description: "High-grade, pungent red-skinned onions picked from farm soils, dried perfectly for storage durability.",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Nashik Premium Red", unit: "1 Kg", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Nashik Premium Red Bulky", unit: "2 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Vine Tomatoes",
    category: "Vegetables",
    subcategory: "Fresh Vegetables",
    description: "Plump, scarlet red, fully ripe tomatoes picked from vines, loaded with natural sour and sweet flavor juices.",
    image: "https://images.unsplash.com/photo-1518977822534-7049a61fc0c2?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Local Desi Tomatoes", unit: "500 Gm", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Hybrid Salad Tomatoes", unit: "1 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 6. Dairy & Bakery
  {
    name: "Fresh Milk",
    category: "Dairy & Bakery",
    subcategory: "Milk",
    description: "Pasteurized, high-nutrition fresh cow and buffalo milk packed cleanly in secure polymer packets.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Amul Taaza Homogenized", unit: "500 Ml", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Amul Gold Full Cream", unit: "1 Ltr", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Mother Dairy Toned Milk", unit: "500 Ml", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Fresh Paneer",
    category: "Dairy & Bakery",
    subcategory: "Dairy Products",
    description: "Super soft, moist, vacuum-packed fresh cottage cheese chunks containing rich protein cream layers.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Amul Fresh Paneer Block", unit: "200 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Amul Fresh Paneer Block", unit: "500 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Sliced Bread",
    category: "Dairy & Bakery",
    subcategory: "Bakery",
    description: "Freshly baked, super pillowy sliced breads prepared with real grains and yeast extracts.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Britannia Premium Sandwich White", unit: "400 Gm", rating: 4.6, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Britannia 100% Whole Wheat Brown", unit: "400 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 7. Eggs, Meat & Fish
  {
    name: "Fresh Farm Eggs",
    category: "Eggs, Meat & Fish",
    subcategory: "Eggs",
    description: "Naturally laid, high-protein fresh poultry farm eggs sorted and packed cleanly in safety crates.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "White Poultry Eggs Crate", unit: "6 Pcs", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "White Poultry Eggs Crate Jumbo", unit: "30 Pcs", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Organic Brown Eggs", unit: "6 Pcs", rating: 4.8, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Fresh Raw Chicken",
    category: "Eggs, Meat & Fish",
    subcategory: "Meat",
    description: "100% tender, hormone-free freshly dressed raw chicken cuts sourced from certified local farms.",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Skinless Curry Cut", unit: "500 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Tender Boneless Breast Fillets", unit: "500 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 8. Frozen Foods
  {
    name: "Frozen Veg Nuggets",
    category: "Frozen Foods",
    subcategory: "Frozen Snacks",
    description: "Crunchy par-fried vegetable and cheese nuggets ready to deep fry or air-fry instantly.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "McCain Veggie Nuggets Pack", unit: "320 Gm", rating: 4.6, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "McCain Smiles Crisp", unit: "320 Gm", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 9. Snacks & Chocolates
  {
    name: "Classic Potato Chips",
    category: "Snacks & Chocolates",
    subcategory: "Snacks",
    description: "Crispy, double-fried seasoned sliced potato chips packed in air-sealed hygiene bags.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d22?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Lay's Magic Masala", unit: "50 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Lay's Classic Salted", unit: "50 Gm", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Lay's American Style Onion", unit: "50 Gm", rating: 4.8, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Smooth Milk Chocolate",
    category: "Snacks & Chocolates",
    subcategory: "Chocolates",
    description: "Velvety, creamy classic milk chocolate loaded with sweet milk fats and rich cocoa blend.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Cadbury Dairy Milk Silk", unit: "60 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Nestle KitKat Bar 4-Finger", unit: "38 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 10. Biscuits & Cookies
  {
    name: "Crispy Cookies",
    category: "Biscuits & Cookies",
    subcategory: "Cookies",
    description: "Baked to perfection crunchy cookies filled with cashews, butter drops, or chocolate chips.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Britannia Good Day Cashew", unit: "100 Gm", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Sunfeast Dark Fantasy Choco Fills", unit: "75 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 11. Tea & Coffee
  {
    name: "Instant Coffee Powder",
    category: "Tea & Coffee",
    subcategory: "Coffee",
    description: "Premium rich blend of selected Robusta and Arabica coffee beans roasted and grounded to perfection.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Nescafe Classic Jar", unit: "100 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Bru Instant Coffee", unit: "100 Gm", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 12. Cold Drinks & Juices
  {
    name: "Carbonated Soft Drink",
    category: "Cold Drinks & Juices",
    subcategory: "Cold Drinks",
    description: "Chilled carbonated fizzy refreshment drinks packed in safe recyclable PET bottles or cans.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Coca-Cola Original Taste", unit: "750 Ml", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Thums Up Strong Fizzy", unit: "750 Ml", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Sprite Lemon & Lime", unit: "750 Ml", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 13. Mineral Water
  {
    name: "Mineral Water Bottle",
    category: "Mineral Water",
    subcategory: "Mineral Water",
    description: "Pure ozonated drinking water with added vital minerals like magnesium and calcium for instant rehydration.",
    image: "https://images.unsplash.com/photo-1548839140-29a88648f238?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Bisleri Ozonated Active", unit: "1 Ltr", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Kinley Purified Water", unit: "1 Ltr", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 14. Ice Cream
  {
    name: "Creamy Ice Cream Tub",
    category: "Ice Cream",
    subcategory: "Ice Cream",
    description: "Rich, premium dairy ice cream whipped with rich flavor bases and gourmet mix-ins.",
    image: "https://images.unsplash.com/photo-1501443715934-62e42b291a0c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Amul Vanilla Gold Tub", unit: "1 Ltr", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Kwality Walls Butterscotch Delight", unit: "700 Ml", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 15. Daily Needs
  {
    name: "Heavy Duty Batteries",
    category: "Daily Needs",
    subcategory: "Electrical Essentials",
    description: "Long-lasting alkaline AA / AAA batteries ideal for wall clocks, remote controls, and toys.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Duracell Ultra Alkaline AA", unit: "4 Pcs", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Duracell Ultra Alkaline AAA", unit: "4 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Goodknight Vaporizer",
    category: "Daily Needs",
    subcategory: "Household Essentials",
    description: "Active mosquito repellent chemical formula designed to keep mosquitoes and bugs away.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Goodknight Gold Flash Machine", unit: "1 Pc", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Goodknight Gold Refill Cartridge", unit: "2 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 16. Household Essentials
  {
    name: "Aluminium Kitchen Foil",
    category: "Household Essentials",
    subcategory: "Kitchen Essentials",
    description: "Food-grade high-strength aluminium foil roll designed to keep cooked meals hot and perfectly fresh.",
    image: "https://images.unsplash.com/photo-1585672841961-d6f73fa0010c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "FreshWrap Aluminium Roll", unit: "72 Mtr", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 17. Cleaning Supplies
  {
    name: "Concentrated Floor Cleaner",
    category: "Cleaning Supplies",
    subcategory: "Household Essentials",
    description: "Sanitizing germ-killing scented floor cleaner liquid recommended for bright, stain-free surfaces.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Lizol Citrus Floral Liquid", unit: "1 Ltr", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Lizol Lavender Disinfectant", unit: "2 Ltr", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Premium Laundry Detergent",
    category: "Cleaning Supplies",
    subcategory: "Household Essentials",
    description: "Powerful enzymatic cleaning powder or liquid designed to dissolve tough dirt stains on fabrics.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Surf Excel Easy Wash Powder", unit: "1 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Surf Excel Matic Liquid Comfort", unit: "1 Ltr", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 18. Personal Care
  {
    name: "Nourishing Herbal Soap",
    category: "Personal Care",
    subcategory: "Personal Care",
    description: "Cleansing bathing bars made from therapeutic herbal formulations and organic hydration lipids.",
    image: "https://images.unsplash.com/photo-1607006342411-91f1585e056d?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Santoor Sandalwood & Turmeric", unit: "4-Pack", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Dettol Original Germ Protection", unit: "3-Pack", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Anti-Hairfall Shampoo",
    category: "Personal Care",
    subcategory: "Personal Care",
    description: "Herbal and peptide based nourishing shampoo cleanses dandruff scales and restores scalp oils.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Clinic Plus Strong Hair", unit: "340 Ml", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Head & Shoulders Cool Menthol", unit: "340 Ml", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 19. Beauty & Cosmetics
  {
    name: "Herbal Nourishing Cream",
    category: "Beauty & Cosmetics",
    subcategory: "Personal Care",
    description: "Deep nourishing moisturizers enriched with vitamin beads and herbal botanical extracts.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Nivea Soft Cream Moisture", unit: "100 Ml", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 20. Baby Care
  {
    name: "Baby Wipes",
    category: "Baby Care",
    subcategory: "Baby Care",
    description: "Incredibly gentle, dermatologist approved alcohol-free baby wipes crafted with pure water and aloe extracts.",
    image: "https://images.unsplash.com/photo-1594953539126-7df09cc92d43?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Himalaya Herbal Gentle Wipes", unit: "72 Wipes", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 21. Pet Care
  {
    name: "Gourmet Pet Food",
    category: "Pet Care",
    subcategory: "Pet Care",
    description: "Highly nutritious and balanced food meals enriched with meat fats, fibers, and organic minerals for pets.",
    image: "https://images.unsplash.com/photo-1589924691124-400d16be38cb?auto=format&fit=crop&w=600&q=80",
    isVeg: false,
    variants: [
      { nameSuffix: "Pedigree Dry Dog Meat & Veg", unit: "1.2 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Whiskas Mackerel Dry Cat Food", unit: "1.1 Kg", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 22. Stationery & Office Supplies
  {
    name: "Premium Writing Tools",
    category: "Stationery & Office Supplies",
    subcategory: "Pens",
    description: "High-grade writing gel pens and smooth lead pencils for school homework or professional office records.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Reynolds Gel Slimmax Black", unit: "5 Pcs", rating: 4.6, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Apsara Platinum Extra Dark HB", unit: "10 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },
  {
    name: "Ruled College Register",
    category: "Stationery & Office Supplies",
    subcategory: "Notebooks",
    description: "Premium acid-free smooth paper registers with hard covers for writing records or studies.",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Classmate Premium Single Line", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 23. Mobile Accessories
  {
    name: "Rapid USB Wall Charger",
    category: "Mobile Accessories",
    subcategory: "Chargers",
    description: "High power wattage rapid charging adapter protecting smart devices from voltage surges.",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Mi 18W Fast Charger Adapter", unit: "1 Pc", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 24. Electrical Essentials
  {
    name: "Energy Saver LED Bulb",
    category: "Electrical Essentials",
    subcategory: "LED Bulbs",
    description: "Incredibly efficient cool daylight LED bulbs designed to conserve energy with premium brightness.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Philips 9W Cool Daylight LED", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Philips 12W Cool Daylight LED", unit: "1 Pc", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 25. Home Essentials
  {
    name: "Aromatic Spray Freshener",
    category: "Home Essentials",
    subcategory: "Air Freshener",
    description: "Premium aromatic mist spray formula designed to neutralize bad odors and spread soothing flora scents.",
    image: "https://images.unsplash.com/photo-1530268589889-548548317ed2?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Odonil Room Air Spray Citrus", unit: "220 Ml", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 26. Kitchen Essentials
  {
    name: "Heavy Duty Scrub Pads",
    category: "Kitchen Essentials",
    subcategory: "Cleaning Supplies",
    description: "Abrasive scouring pad fiber layers paired with sponges for stain-free kitchen dishwashing.",
    image: "https://images.unsplash.com/photo-1585672841961-d6f73fa0010c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Scotch-Brite Double Scrub Sponge", unit: "3 Pcs", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 27. Puja & Religious Items
  {
    name: "Premium Incense Sticks",
    category: "Puja & Religious Items",
    subcategory: "Incense Sticks",
    description: "Aromatic charcoal-free organic bamboo incense sticks rolled in natural woods and lavender oils.",
    image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ce?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Cycle Pure Agarbatti Sandalwood", unit: "1 Box", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Zed Black 3-in-1 Premium", unit: "1 Box", rating: 4.7, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 28. Flowers & Bouquets
  {
    name: "Fresh Elegant Bouquet",
    category: "Flowers & Bouquets",
    subcategory: "Flowers",
    description: "Hand-arranged fresh seasonal flowers wrapped elegantly in jute meshes with greeting paper ribbons.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isFreshToday: true,
    variants: [
      { nameSuffix: "Red Roses Premium Bouquet", unit: "10 Stems", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Bright Yellow Lilies Bloom", unit: "6 Stems", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 29. Cakes & Celebration
  {
    name: "Fresh Baked Cream Cake",
    category: "Cakes & Celebration",
    subcategory: "Cakes",
    description: "Moist freshly-baked sponge cakes layered with whipped cream toppings and pure fruit flavors.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Eggless Chocolate Fudge", unit: "500 Gm", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Eggless Red Velvet Heart", unit: "500 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 30. Gifts
  {
    name: "Scented Wax Candle Set",
    category: "Gifts",
    subcategory: "Gifts",
    description: "Beautiful aroma therapy gift wax containers loaded with sweet vanilla, ocean, and lavender essences.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Bella Vita Aroma Luxury Set", unit: "3-Pack", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 31. Seasonal Products
  {
    name: "Windproof Protection",
    category: "Seasonal Products",
    subcategory: "Daily Needs",
    description: "High density waterproof materials styled beautifully to protect from extreme weather seasons.",
    image: "https://images.unsplash.com/photo-1530268589889-548548317ed2?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Foldable Premium Umbrella Red", unit: "1 Pc", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Waterproof Lightweight Raincoat", unit: "1 Pc", rating: 4.6, isPopular: false, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 32. Organic Products
  {
    name: "Pure Organic Staple",
    category: "Organic Products",
    subcategory: "Organic Products",
    description: "Chemical pesticide-free natural whole pulses and grains cleaned and packed in eco-bags under standards.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    isOrganic: true,
    variants: [
      { nameSuffix: "Organic Tattva Moong Dal", unit: "500 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Organic Tattva Premium Cow Ghee", unit: "500 Ml", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 33. Healthcare & Wellness
  {
    name: "Herbal Health Booster",
    category: "Healthcare & Wellness",
    subcategory: "Healthcare",
    description: "Traditional Ayurvedic rich health pastes loaded with forest amla pulp and rare herb essences.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    variants: [
      { nameSuffix: "Dabur Chyawanprash Immunity", unit: "500 Gm", rating: 4.8, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  },

  // 34. Medicines (Enquiry Only)
  {
    name: "Clinical Tablet Box",
    category: "Medicines (Enquiry Only)",
    subcategory: "Healthcare",
    description: "Dermatologist and physician prescribed medicine tablets. PRESCRIPTION REQUIRED prior to rider dispatch.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    prescriptionRequired: true,
    variants: [
      { nameSuffix: "Crocin 650mg Relief", unit: "15 Tabs", rating: 4.9, isPopular: true, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Pantocid 40mg Acid Reflux", unit: "10 Tabs", rating: 4.8, isPopular: false, isFastDelivery: true, isAvailableToday: true },
      { nameSuffix: "Gelusil Antacid Liquid Mint", unit: "200 Ml", rating: 4.7, isPopular: true, isFastDelivery: true, isAvailableToday: true }
    ]
  }
];

// PROGRAMMATIC COMPREHENSIVE EXPANSION TO GENERATE EXACTLY 750+ DENSELY POPULATED HYPERLOCAL PRODUCTS!
const generateFullCatalog = (): ProductItem[] => {
  const fullList: ProductItem[] = [];
  let currentIdNum = 1;

  // Track counts per category to maintain healthy distribution
  productSeeds.forEach((seed) => {
    seed.variants.forEach((v) => {
      // Create full product name
      const fullName = v.nameSuffix ? `${v.nameSuffix} ${seed.name}` : seed.name;
      
      // Seed product
      fullList.push({
        id: `qp_${currentIdNum++}`,
        name: fullName,
        category: seed.category,
        subcategory: seed.subcategory,
        description: seed.description,
        price: 150, // Standard compatible pricing field
        unit: v.unit,
        image: seed.image,
        rating: v.rating,
        isVeg: seed.isVeg,
        isPopular: v.isPopular || false,
        isAvailableToday: v.isAvailableToday !== undefined ? v.isAvailableToday : true,
        isFastDelivery: v.isFastDelivery !== undefined ? v.isFastDelivery : true,
        isOrganic: seed.isOrganic || false,
        isFreshToday: seed.isFreshToday || false,
        prescriptionRequired: seed.prescriptionRequired || false
      });
    });
  });

  // Since we want the database to resemble a full-scale hyperlocal directory with hundreds of catalog entries,
  // we will programmatically auto-replicate and differentiate variants to build exactly 750 high-quality unique items!
  // This guarantees depth, prevents massive code size while delivering exact results.
  const replicationBrands = [
    "Amul", "Mother Dairy", "Britannia", "Nestle", "Tata", "ITC Premium", "Aashirvaad", "Himalaya", "Fortune", "Philips", "Dabur", "Bella Vita", "Good Day", "Hindustan Unilever"
  ];

  const flavorVariants = [
    "Original", "Classic", "Sweet Honey", "Spicy Chili Masala", "Mint Fusion", "Rich Garlic Butter", "Premium Saffron", "Tangy Tomato", "Natural Herb Oil", "Rose Essence", "Fresh Lavender", "Wild Charcoal", "Cooling Menthol", "Ginger Lime"
  ];

  const sizeUnits = [
    { label: "Small Pack", multiply: 0.5, unit: "150 Gm" },
    { label: "Value Pack", multiply: 1.2, unit: "450 Gm" },
    { label: "Family Saver Pack", multiply: 2.2, unit: "1.5 Kg" },
    { label: "Single Serving", multiply: 1, unit: "1 Pc" },
    { label: "Double Feast Pack", multiply: 2, unit: "2 Pcs" },
    { label: "Rider Express Box", multiply: 1, unit: "1 Box" }
  ];

  // We loop to expand the catalog organically up to 750 items!
  let loopIndex = 0;
  while (fullList.length < 750) {
    const sourceProd = fullList[loopIndex % fullList.length];
    const targetBrand = replicationBrands[loopIndex % replicationBrands.length];
    const targetFlavor = flavorVariants[loopIndex % flavorVariants.length];
    const targetSize = sizeUnits[loopIndex % sizeUnits.length];

    const isMedicine = sourceProd.category === "Medicines (Enquiry Only)";
    const isFood = sourceProd.category === "Fast Food" || sourceProd.category === "Restaurant Food";
    const isFruitVeg = sourceProd.category === "Fruits" || sourceProd.category === "Vegetables";

    // Formulate a distinct, highly realistic product name
    let newName = "";
    if (isMedicine) {
      newName = `${sourceProd.name} (${targetFlavor} formulation)`;
    } else if (isFood) {
      newName = `${targetFlavor} ${sourceProd.name}`;
    } else if (isFruitVeg) {
      newName = `Organic ${sourceProd.name} (${targetSize.label})`;
    } else {
      newName = `${targetBrand} ${targetFlavor} ${sourceProd.name.split(" ").slice(-2).join(" ")}`;
    }

    // Clean duplicate words in name
    const words = newName.split(" ");
    const uniqueWords = words.filter((value, index, self) => self.indexOf(value) === index);
    newName = uniqueWords.join(" ");

    // Verify name uniqueness in catalog
    const nameExists = fullList.some(p => p.name.toLowerCase() === newName.toLowerCase());
    if (!nameExists) {
      fullList.push({
        id: `qp_${currentIdNum++}`,
        name: newName,
        category: sourceProd.category,
        subcategory: sourceProd.subcategory || sourceProd.category,
        description: `Premium handpicked select quality ${newName.toLowerCase()} - sourced directly from leading neighborhood suppliers.`,
        price: sourceProd.price,
        unit: isFood ? "1 Serving" : targetSize.unit,
        image: sourceProd.image,
        rating: Math.round((4.2 + (Math.random() * 0.7)) * 10) / 10,
        isVeg: sourceProd.isVeg,
        isPopular: Math.random() > 0.7,
        isAvailableToday: Math.random() > 0.05, // 95% in-stock rate
        isFastDelivery: sourceProd.isFastDelivery,
        isOrganic: sourceProd.isOrganic || (isFruitVeg && Math.random() > 0.6),
        isFreshToday: sourceProd.isFreshToday || (isFruitVeg && Math.random() > 0.3),
        prescriptionRequired: sourceProd.prescriptionRequired
      });
    }
    loopIndex++;
  }

  return fullList;
};

export const featuredProducts = generateFullCatalog();

export const testimonialData: TestimonialItem[] = [
  {
    id: "r1",
    name: "Aman Sen",
    role: "Local Business Consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "QuickDrop is an absolute life-saver! I sent an enquiry for a double chicken roll and medicines. The automated WhatsApp setup was so seamless, and they arrived in exactly 22 minutes. The rolls were piping hot!",
    rating: 5,
    date: "June 15, 2026"
  },
  {
    id: "r2",
    name: "Sonia Banerjee",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    comment: "The glassmorphic interface is gorgeous and incredibly intuitive. I love the 'Remember my details' checkbox—now when I click Connect Now, I just tap send on WhatsApp and they pick the absolute best apples for me. Professional service!",
    rating: 5,
    date: "June 20, 2026"
  },
  {
    id: "r3",
    name: "Rishi Mukherjee",
    role: "University Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    comment: "I order kathi rolls, chowmein, and stationery for college work late at night. Delivery speeds are consistently under 30 minutes, and the WhatsApp dispatchers are super responsive.",
    rating: 5,
    date: "June 24, 2026"
  }
];

export const faqData: FAQItem[] = [
  {
    id: "faq1",
    question: "What areas does QuickDrop serve?",
    answer: "QuickDrop provides fast hyperlocal delivery services across Salt Lake, New Town, Sector V, and Rajarhat in Kolkata."
  },
  {
    id: "faq2",
    question: "How fast is QuickDrop delivery?",
    answer: "QuickDrop guarantees delivery within 30 to 45 minutes for all supported hyperlocal areas in Kolkata. Our dedicated local riders optimize block-by-block for ultra-rapid response times."
  },
  {
    id: "faq3",
    question: "Does QuickDrop deliver groceries and medicines?",
    answer: "Yes, QuickDrop delivers a wide variety of items including fresh groceries, fruits, vegetables, dairy, pharmacy medicines, stationery, and daily household needs."
  },
  {
    id: "faq4",
    question: "How do I order from QuickDrop using WhatsApp?",
    answer: "Browse our catalog, click 'Connect Now' on any product, and fill out your address. We automatically generate a beautifully structured WhatsApp message and open WhatsApp Click-to-Chat so you can instantly connect directly with our dispatch operator."
  },
  {
    id: "faq5",
    question: "Is there a minimum order limit for QuickDrop?",
    answer: "There is absolutely no minimum order limit. Whether you need a single pen, one bottle of milk, or a full daily grocery list, QuickDrop will coordinate and deliver it with premium care."
  },
  {
    id: "faq6",
    question: "How do I pay for my QuickDrop delivery?",
    answer: "We support flexible payment options including UPI (GPay, PhonePe, Paytm), cash on delivery (COD), and direct bank transfers to our delivery executives upon arrival."
  },
  {
    id: "faq7",
    question: "Are QuickDrop products fresh and authentic?",
    answer: "Absolutely. We handpick daily fresh vegetables, fruits, and dairy products directly from verified local suppliers. Packaged goods are thoroughly checked for expiry dates and authenticity before dispatch."
  }
];

export const statsData: StatsItem[] = [
  {
    value: "140k+",
    label: "Orders Delivered",
    iconName: "ShoppingBag"
  },
  {
    value: "25k+",
    label: "Happy Customers",
    iconName: "Users"
  },
  {
    value: "80+",
    label: "Partner Stores",
    iconName: "Store"
  },
  {
    value: "12",
    label: "Active Zones",
    iconName: "MapPin"
  }
];
