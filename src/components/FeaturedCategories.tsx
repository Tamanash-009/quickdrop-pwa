import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { featuredProducts } from "../data";
import { handleCallNowClick } from "../utils";
import LazyImage from "./LazyImage";

interface FeaturedCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onEnquiry: (productName: string) => void;
}

const categories = [
  "All Products",
  "Fast Food",
  "Restaurant Food",
  "Grocery & Staples",
  "Fruits",
  "Vegetables",
  "Dairy & Bakery",
  "Eggs, Meat & Fish",
  "Frozen Foods",
  "Snacks & Chocolates",
  "Biscuits & Cookies",
  "Tea & Coffee",
  "Cold Drinks & Juices",
  "Mineral Water",
  "Ice Cream",
  "Daily Needs",
  "Household Essentials",
  "Cleaning Supplies",
  "Personal Care",
  "Beauty & Cosmetics",
  "Baby Care",
  "Pet Care",
  "Stationery & Office Supplies",
  "Mobile Accessories",
  "Electrical Essentials",
  "Home Essentials",
  "Kitchen Essentials",
  "Puja & Religious Items",
  "Flowers & Bouquets",
  "Cakes & Celebration",
  "Gifts",
  "Seasonal Products",
  "Organic Products",
  "Healthcare & Wellness",
  "Medicines (Enquiry Only)"
];

const popularSearches = [
  "Double Chicken Kathi Roll",
  "Kolkata Dum Biryani",
  "Amul Gold Milk",
  "Fresh Tomato",
  "Crocin Relief",
  "Eggless Chocolate Fudge",
  "Detergent",
  "Classmate Register"
];

const categoryBanners: Record<string, { title: string; image: string; desc: string; stat: string }> = {
  "All Products": {
    title: "Neighborhood Hyperlocal Catalog",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    desc: "Browse our entire curated catalog of local goods, groceries, restaurant-quality fast foods, personal care items, and daily needs.",
    stat: "750+ Items Available"
  },
  "Fast Food": {
    title: "Sizzling Hot Fast Food",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=80",
    desc: "Piping hot kathi rolls, crispy burgers, spicy momos, and local favorites prepared fresh by Salt Lake's most loved kitchens.",
    stat: "Delivered Hot under 30m"
  },
  "Restaurant Food": {
    title: "Gourmet Restaurant Delicacies",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?auto=format&fit=crop&w=1200&q=80",
    desc: "Aromatic biryanis, luxury North Indian curries, and Chinese master-dishes sourced from premium grade dining partners.",
    stat: "Freshly Cooked & Sealed"
  },
  "Grocery & Staples": {
    title: "Daily Pantry Staples & Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    desc: "Premium long-grain Basmati rice, premium chakki whole-wheat flour, cold-pressed oils, and high-quality culinary spices.",
    stat: "100% Quality Checked"
  },
  "Fruits": {
    title: "Fresh Handpicked Orchard Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80",
    desc: "Crispy Himalayan apples, premium Robusta sweet bananas, sweet Alphonso mangoes, and juicy seasonal citrus fruits.",
    stat: "Picked Fresh This Morning"
  },
  "Vegetables": {
    title: "Farm-Fresh Local Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    desc: "Earthy potatoes, crisp red onions, vine-ripened local tomatoes, and pesticide-free green leafy vegetables.",
    stat: "Sourced from Local Farms"
  },
  "Dairy & Bakery": {
    title: "Fresh Dairy, Milks & Soft Breads",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80",
    desc: "High-nutrient pasteurized milk packets, super soft cottage cheese, fresh butter blocks, and freshly baked sliced breads.",
    stat: "Chilled Carrier Delivery"
  },
  "Eggs, Meat & Fish": {
    title: "High-Protein Fresh Eggs & Meat",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1200&q=80",
    desc: "Dermatologist-certified hormone-free tender poultry cuts, farm fresh protein eggs, and cleaned whole river fishes.",
    stat: "Strict Hygiene Inspected"
  },
  "Frozen Foods": {
    title: "Instant Sizzle Frozen Delights",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    desc: "Par-fried vegetable nuggets, golden smiles, and french fries. Perfect for quick frying, baking, or air-frying at home.",
    stat: "Stored at Sub-Zero"
  },
  "Snacks & Chocolates": {
    title: "Sweet Cravings & Salty Munchies",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    desc: "Crunchy potato chips, double-seasoned crisps, velvety rich milk chocolates, and local savory mixtures.",
    stat: "Sealed & Crispy Guarded"
  },
  "Biscuits & Cookies": {
    title: "Oven-Baked Biscuits & Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
    desc: "Crunchy butter cookies, nut-loaded digestives, cream-filled biscuits, and rich chocolate-injected cookies.",
    stat: "Perfect Tea Companions"
  },
  "Tea & Coffee": {
    title: "Premium Teas & Ground Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    desc: "Darjeeling long-leaf orthodox teas, strong CTC blends, aromatic instant coffee powders, and roasted beans.",
    stat: "Aromatic Freshness"
  },
  "Cold Drinks & Juices": {
    title: "Chilled Fizzy Drinks & Fruit Juices",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80",
    desc: "Chilled carbonated soft drinks, revitalizing energy cans, fresh-pressed fruit juices, and premium squashes.",
    stat: "Delivered Ice-Cold"
  },
  "Mineral Water": {
    title: "Ozonated Mineral Rehydration",
    image: "https://images.unsplash.com/photo-1548839140-29a88648f238?auto=format&fit=crop&w=1200&q=80",
    desc: "Ultra-purified, multi-stage ozonated pure drinking water containing natural vital minerals like magnesium.",
    stat: "Safe & Pure Sealed"
  },
  "Ice Cream": {
    title: "Rich Gourmet Ice Cream Tubs",
    image: "https://images.unsplash.com/photo-1501443715934-62e42b291a0c?auto=format&fit=crop&w=1200&q=80",
    desc: "Velvety real milk ice creams, gourmet butterscotch swirls, decadent dark chocolate tubs, and fruit pops.",
    stat: "Insulated Thermal Delivery"
  },
  "Daily Needs": {
    title: "Everyday Essential Comforts",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    desc: "Long-lasting alkaline batteries, mosquito repellents, matchboxes, shoe polishes, and standard home utilities.",
    stat: "Instant Neighborhood Stock"
  },
  "Household Essentials": {
    title: "Kitchen Foils, Napkins & Essentials",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    desc: "Food-grade high-strength aluminium kitchen foils, absorbent paper rolls, facial tissues, and trash bags.",
    stat: "Sourced for Convenience"
  },
  "Cleaning Supplies": {
    title: "Hygiene & Deep Cleaning Supplies",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    desc: "Disinfectant floor cleaners, enzymatic laundry powders, stain-removing liquids, and bathroom cleaners.",
    stat: "Spill-Proof Packaged"
  },
  "Personal Care": {
    title: "Pampering Personal Care & Hygiene",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&q=80",
    desc: "Therapeutic herbal soaps, dandruff clearing scalp shampoos, skin washes, and oral hygiene dental pastes.",
    stat: "Dermatologically Tested"
  },
  "Beauty & Cosmetics": {
    title: "Nourishing Beauty & Daily Cosmetics",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    desc: "Deep skin moisturizing creams, oil-free hydration gels, lip treatments, and body nourishment milks.",
    stat: "Pure Botanical Care"
  },
  "Baby Care": {
    title: "Extra Gentle Baby Hygiene Care",
    image: "https://images.unsplash.com/photo-1594953539126-7df09cc92d43?auto=format&fit=crop&w=1200&q=80",
    desc: "Alcohol-free ultra gentle baby wipes, protective leak-proof baby diapers, tear-free baby washes, and soft powders.",
    stat: "Pediatrician Approved"
  },
  "Pet Care": {
    title: "Gourmet Nutrition For Your Pets",
    image: "https://images.unsplash.com/photo-1589924691124-400d16be38cb?auto=format&fit=crop&w=1200&q=80",
    desc: "High protein, mineral-dense dry dog kibbles, premium mackerel wet food for cats, and grooming items.",
    stat: "Active Pet Certified"
  },
  "Stationery & Office Supplies": {
    title: "Premium Notebooks, Pens & Stationery",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
    desc: "Extra smooth dark drawing pencils, dark ink writing gel pens, ruled college register notebooks, and sticky notes.",
    stat: "Perfect for School & Office"
  },
  "Mobile Accessories": {
    title: "Rapid USB Wall Chargers & Accessories",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80",
    desc: "High-wattage rapid smart adapters, robust braided type-C USB charging cables, and secure glass protectors.",
    stat: "Tested & Certified Safe"
  },
  "Electrical Essentials": {
    title: "Energy Saver LED Bulbs & Batteries",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    desc: "Eco-efficient bright daylight LED bulbs, high discharge AA / AAA cells, and multi-pin power adapters.",
    stat: "Saves up to 85% Power"
  },
  "Home Essentials": {
    title: "Scented Sprays & Home Aura Essentials",
    image: "https://images.unsplash.com/photo-1530268589889-548548317ed2?auto=format&fit=crop&w=1200&q=80",
    desc: "Odor neutralizing aerosol spray air fresheners, slow burning scented wax candles, and home decor items.",
    stat: "Fresh & Elegant Aura"
  },
  "Kitchen Essentials": {
    title: "Dishwashing Scrubs, Brushes & Sponge",
    image: "https://images.unsplash.com/photo-1585672841961-d6f73fa0010c?auto=format&fit=crop&w=1200&q=80",
    desc: "Abrasive heavy duty scouring pads, non-scratch dish sponges, active dishwashing bar soaps, and sink brushes.",
    stat: "Sparkling Clean Guard"
  },
  "Puja & Religious Items": {
    title: "Charcoal-Free Pure Incense Sticks",
    image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ce?auto=format&fit=crop&w=1200&q=80",
    desc: "Organic pure bamboo agarbatti rolled in high oils, metal ghee diyas, red mauli threads, and camphor tabs.",
    stat: "Sourced with Pure Care"
  },
  "Flowers & Bouquets": {
    title: "Fresh Hand-Tied Rose Bouquets",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
    desc: "Premium red roses bouquets wrapped elegantly in organic jute meshes, lilies, and custom celebration petals.",
    stat: "Fresh cut from Gardens"
  },
  "Cakes & Celebration": {
    title: "Oven-Fresh Baked Eggless Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    desc: "Decadent eggless chocolate fudge cakes, premium red velvet sponge layers, birthday candles, and party banners.",
    stat: "Freshly Baked & Packed"
  },
  "Gifts": {
    title: "Thoughtful Warm Gift Boxes & Packs",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
    desc: "Luxury aroma wax candle boxes, dry fruit collections, assorted gourmet chocolate trays, and gift hampers.",
    stat: "Premium Gift Wrapped"
  },
  "Seasonal Products": {
    title: "Rain Gear, Umbrellas & Season Protectors",
    image: "https://images.unsplash.com/photo-1530268589889-548548317ed2?auto=format&fit=crop&w=1200&q=80",
    desc: "Windproof heavy-duty foldable umbrellas, lightweight water-resistant protective raincoats, and seasonal products.",
    stat: "All-Weather Protection"
  },
  "Organic Products": {
    title: "100% Pesticide-Free Certified Organic",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    desc: "Chemical-free stoneground staples, single-sourced pure forest honeys, organic cow ghee, and natural whole pulses.",
    stat: "USDA Certified Organic"
  },
  "Healthcare & Wellness": {
    title: "Herbal Wellness & Immunity Boosters",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80",
    desc: "Traditional Ayurvedic chyawanprash paste made with fresh forest amla pulp, health juices, and herbal aids.",
    stat: "100% Safe Herbal Extracts"
  },
  "Medicines (Enquiry Only)": {
    title: "Clinical Pharmacy (Prescription Required)",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    desc: "Essential clinic OTC pain reliefs, dermatologist creams, and standard medicines. *PRESCRIPTION REQUIRED prior to rider dispatch.*",
    stat: "Registered Pharmacy Sourced"
  }
};

export default function FeaturedCategories({
  selectedCategory,
  setSelectedCategory,
  onEnquiry,
}: FeaturedCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voicePhrase, setVoicePhrase] = useState("");

  // Filters State
  const [activeVegFilter, setActiveVegFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyFastDelivery, setOnlyFastDelivery] = useState(false);
  const [onlyFreshToday, setOnlyFreshToday] = useState(false);

  // Horizontal Slider & Swipe Logic for Categories & Product Shelf
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const categoriesSliderRef = useRef<HTMLDivElement>(null);
  const [categoriesConstraints, setCategoriesConstraints] = useState({ left: 0, right: 0 });

  const shelfContainerRef = useRef<HTMLDivElement>(null);
  const shelfSliderRef = useRef<HTMLDivElement>(null);
  const [shelfConstraints, setShelfConstraints] = useState({ left: 0, right: 0 });

  const selectedBanner = useMemo(() => {
    return categoryBanners[selectedCategory] || categoryBanners["All Products"];
  }, [selectedCategory]);

  // Search History
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("qd_search_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5); // Max 5 items
      localStorage.setItem("qd_search_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("qd_search_history");
  };

  // Voice search simulation
  const handleVoiceSearch = () => {
    if (isListening) return;
    setIsListening(true);
    const randomPhrase = popularSearches[Math.floor(Math.random() * popularSearches.length)];
    setVoicePhrase(randomPhrase);
    setTimeout(() => {
      setSearchQuery(randomPhrase);
      setIsListening(false);
      addToHistory(randomPhrase);
    }, 1500);
  };

  // Live Suggestions Engine
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matches: string[] = [];
    for (const p of featuredProducts) {
      if (p.name.toLowerCase().includes(query)) {
        if (!matches.includes(p.name)) {
          matches.push(p.name);
          if (matches.length >= 6) break;
        }
      }
    }
    return matches;
  }, [searchQuery]);

  // Handle Suggestion Click
  const handleSuggestionSelect = (name: string) => {
    setSearchQuery(name);
    setIsSuggestionsOpen(false);
    addToHistory(name);
  };

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((product) => {
      // Category Match
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;

      // Search Match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query);

      // Vegetarian Match
      const matchesVeg =
        activeVegFilter === "all" ||
        (activeVegFilter === "veg" && product.isVeg === true) ||
        (activeVegFilter === "non-veg" && product.isVeg === false);

      // Other toggles
      const matchesAvailable = !onlyAvailable || product.isAvailableToday === true;
      const matchesOrganic = !onlyOrganic || product.isOrganic === true;
      const matchesFastDelivery = !onlyFastDelivery || product.isFastDelivery === true;
      const matchesFreshToday = !onlyFreshToday || product.isFreshToday === true;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesVeg &&
        matchesAvailable &&
        matchesOrganic &&
        matchesFastDelivery &&
        matchesFreshToday
      );
    });
  }, [
    selectedCategory,
    searchQuery,
    activeVegFilter,
    onlyAvailable,
    onlyOrganic,
    onlyFastDelivery,
    onlyFreshToday,
  ]);

  // Reset page filters on category change to prevent confusing empty grids
  // Filters are now reset in the category button onClick handler

  useEffect(() => {
    const handleResize = () => {
      if (categoriesSliderRef.current && categoriesContainerRef.current) {
        const sliderWidth = categoriesSliderRef.current.scrollWidth;
        const containerWidth = categoriesContainerRef.current.offsetWidth;
        setCategoriesConstraints({
          left: -Math.max(0, sliderWidth - containerWidth),
          right: 0
        });
      }
    };

    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (shelfSliderRef.current && shelfContainerRef.current) {
        const sliderWidth = shelfSliderRef.current.scrollWidth;
        const containerWidth = shelfContainerRef.current.offsetWidth;
        setShelfConstraints({
          left: -Math.max(0, sliderWidth - containerWidth),
          right: 0
        });
      }
    };

    const timer = setTimeout(handleResize, 150);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedCategory, searchQuery, activeVegFilter, onlyAvailable, onlyOrganic, onlyFastDelivery, onlyFreshToday]);

  return (
    <section
      id="featured"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-brand-light"
    >
      {/* Visual background accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] aspect-square rounded-full bg-brand-cyan/5 blur-[80px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] aspect-square rounded-full bg-brand-primary/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-brand-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-brand-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>Neighborhood Mart</span>
          </motion.div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-brand-dark tracking-tight">
            Explore 750+ Local Products
          </h2>
          <p className="mt-4 text-sm md:text-base text-brand-dark/70 leading-relaxed">
            Choose a neighborhood catalog section or search directly. Every card has a direct <b>Connect Now</b> WhatsApp trigger. Absolutely zero hidden surcharges or online checkout required.
          </p>
        </div>

        {/* Advanced Search, Popular, History and Filter Tools */}
        <div className="flex flex-col gap-6 mb-12 glass-card p-6 md:p-8 rounded-[32px] border border-white/60 bg-white/40 shadow-sm relative z-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Search Box with Suggestions & Voice placeholder */}
            <div className="col-span-1 lg:col-span-7 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-dark/40">
                  <span className="material-symbols-rounded text-xl">search</span>
                </div>
                
                <input
                  type="text"
                  placeholder="Search for rolls, momos, milk, veggies, stationery, medicines..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSuggestionsOpen(true);
                  }}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  onBlur={() => {
                    // Slight delay to allow suggestions clicks to process
                    setTimeout(() => setIsSuggestionsOpen(false), 200);
                  }}
                  className="w-full pl-11 pr-24 py-4 rounded-2xl bg-white border border-brand-dark/15 hover:border-brand-primary focus:border-brand-primary outline-none font-medium text-sm text-brand-dark transition-all shadow-sm focus:shadow-md"
                  id="product-search-bar"
                />

                {/* Voice Search Button */}
                <div className="absolute inset-y-2 right-2 flex items-center gap-1">
                  <button
                    onClick={handleVoiceSearch}
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-slate-100 hover:bg-slate-200 text-brand-dark/60 hover:text-brand-dark"
                    }`}
                    title="Simulate Voice Search"
                  >
                    <span className="material-symbols-rounded text-xl">
                      {isListening ? "mic" : "keyboard_voice"}
                    </span>
                  </button>
                  
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsSuggestionsOpen(false);
                      }}
                      className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-dark/50 flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-rounded text-sm">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions Dropdown Popover */}
              <AnimatePresence>
                {isSuggestionsOpen && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-brand-dark/10 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[300px] overflow-y-auto"
                  >
                    <div className="px-4 py-2.5 bg-slate-50 text-[10px] font-bold text-brand-dark/40 uppercase tracking-wider">
                      Live Suggestions
                    </div>
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onMouseDown={() => handleSuggestionSelect(s)}
                        className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-brand-primary/5 text-brand-dark hover:text-brand-primary transition-all flex items-center gap-2.5 border-b border-slate-50 last:border-0 cursor-pointer"
                      >
                        <span className="material-symbols-rounded text-base text-brand-dark/30">search</span>
                        <span>{s}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voice Listening feedback overlay */}
              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl bg-brand-dark/95 flex items-center justify-center gap-3 text-white font-mono text-sm z-40"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>Listening to Salt Lake voice feed... Speaking "{voicePhrase}"</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Veg / Non-Veg Quick Selector Segment */}
            <div className="col-span-1 lg:col-span-5 flex justify-end">
              <div className="bg-slate-100 p-1 rounded-2xl flex w-full max-w-md shadow-inner">
                {(["all", "veg", "non-veg"] as const).map((filter) => {
                  const isActive = activeVegFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveVegFilter(filter)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-brand-dark shadow-sm"
                          : "text-brand-dark/50 hover:text-brand-dark"
                      }`}
                    >
                      {filter === "all" ? "All Diets" : filter === "veg" ? "Veg Only" : "Non-Veg Only"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search History & Popular Searches */}
          <div className="border-t border-brand-dark/5 pt-4 flex flex-col gap-3.5">
            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-dark/45 uppercase tracking-wide">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    addToHistory(term);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary border border-brand-dark/5 text-xs font-medium text-brand-dark/70 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100/70 pt-3">
                <span className="text-xs font-bold text-brand-dark/45 uppercase tracking-wide">Recent:</span>
                {searchHistory.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-transparent text-xs font-medium text-brand-dark/70 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{term}</span>
                    <span className="material-symbols-rounded text-[11px] text-brand-dark/30">history</span>
                  </button>
                ))}
                <button
                  onClick={clearHistory}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-all ml-auto cursor-pointer"
                >
                  Clear History
                </button>
              </div>
            )}
          </div>

          {/* Stacking Toggle Filter Badges */}
          <div className="border-t border-brand-dark/5 pt-4">
            <div className="flex flex-wrap gap-2.5">
              <span className="text-xs font-bold text-brand-dark/45 uppercase tracking-wide self-center mr-1">Toggles:</span>
              
              {/* Available Today Toggle */}
              <button
                onClick={() => setOnlyAvailable(!onlyAvailable)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyAvailable
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 border border-brand-dark/10 text-brand-dark/70"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${onlyAvailable ? "bg-white animate-pulse" : "bg-emerald-500"}`} />
                <span>Available Today</span>
              </button>

              {/* Fast Delivery Toggle */}
              <button
                onClick={() => setOnlyFastDelivery(!onlyFastDelivery)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyFastDelivery
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 border border-brand-dark/10 text-brand-dark/70"
                }`}
              >
                <span className="material-symbols-rounded text-xs">{onlyFastDelivery ? "bolt" : "bolt"}</span>
                <span>30m Fast Delivery</span>
              </button>

              {/* Organic Toggle */}
              <button
                onClick={() => setOnlyOrganic(!onlyOrganic)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyOrganic
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 border border-brand-dark/10 text-brand-dark/70"
                }`}
              >
                <span className="material-symbols-rounded text-xs">eco</span>
                <span>Organic Certified</span>
              </button>

              {/* Fresh Today Toggle */}
              <button
                onClick={() => setOnlyFreshToday(!onlyFreshToday)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyFreshToday
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 border border-brand-dark/10 text-brand-dark/70"
                }`}
              >
                <span className="material-symbols-rounded text-xs">calendar_today</span>
                <span>Fresh Today</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Categories Segment Control */}
        <div ref={categoriesContainerRef} className="relative w-full border-b border-brand-dark/5 pb-2 mb-12 overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div 
            ref={categoriesSliderRef}
            drag="x"
            dragConstraints={categoriesConstraints}
            dragElastic={0.15}
            className="flex gap-2.5 pb-3 pt-1 px-2 select-none"
            style={{ x: 0 }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchQuery("");
                    setActiveVegFilter("all");
                    setOnlyAvailable(false);
                    setOnlyOrganic(false);
                    setOnlyFastDelivery(false);
                    setOnlyFreshToday(false);
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-brand-primary to-brand-gradient-end text-white shadow-md scale-[1.01]"
                      : "bg-white border border-brand-dark/15 text-brand-dark hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Category Banner */}
        {selectedBanner && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-r from-brand-dark/95 to-brand-dark/80 text-white shadow-xl flex items-center p-6 md:p-12 min-h-[160px] md:min-h-[220px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <LazyImage
                src={selectedBanner.image}
                alt={selectedBanner.title}
                category={selectedCategory}
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 max-w-xl text-left">
              <span className="px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/35 text-[10px] font-mono font-extrabold uppercase tracking-widest text-brand-cyan inline-flex items-center gap-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                <span>{selectedBanner.stat}</span>
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl leading-tight text-white tracking-tight">
                {selectedBanner.title}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed max-w-md">
                {selectedBanner.desc}
              </p>
            </div>
          </motion.div>
        )}

        {/* Swipe indicator helper for mobile devices */}
        <div className="flex sm:hidden items-center justify-center gap-2 mb-6 text-brand-primary/60 text-xs font-mono font-bold uppercase tracking-widest animate-pulse select-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <span>Swipe left / right to browse items</span>
        </div>

        {/* Dynamic Shelf Grid with Drag gesture on touch devices */}
        <div ref={shelfContainerRef} className="overflow-hidden sm:overflow-visible w-full cursor-grab active:cursor-grabbing pb-4">
          <motion.div
            ref={shelfSliderRef}
            drag="x"
            dragConstraints={shelfConstraints}
            dragElastic={0.15}
            dragListener={typeof window !== "undefined" && window.innerWidth < 640}
            layout
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 min-h-[400px] w-full"
            style={{ x: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 100).map((product) => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                    key={product.id}
                    className="group rounded-[24px] glass-card hover:glass-card-hover border border-white/60 bg-white/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-[280px] sm:w-auto shrink-0 sm:shrink"
                  >
                    {/* Image & Badges Banner */}
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-dark/5">
                      <LazyImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient shading overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                      {/* Left Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isPopular && (
                          <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-brand-primary text-white rounded-md shadow-sm">
                            POPULAR
                          </span>
                        )}
                        {product.isOrganic && (
                          <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-teal-600 text-white rounded-md shadow-sm">
                            ORGANIC
                          </span>
                        )}
                        {product.isFreshToday && (
                          <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-amber-500 text-white rounded-md shadow-sm">
                            FRESH
                          </span>
                        )}
                      </div>

                      {/* Right Veg/Non-Veg Indicator Dot */}
                      {product.isVeg !== undefined && (
                        <div className="absolute top-3 right-3 bg-white/95 border border-white p-1 rounded-md shadow-sm flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${product.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                          <span className="text-[9px] font-bold text-brand-dark/70 pr-1 select-none">
                            {product.isVeg ? "VEG" : "NON-VEG"}
                          </span>
                        </div>
                      )}

                      {/* Available Today Badge / Unit Info */}
                      {product.isAvailableToday ? (
                        <div className="absolute bottom-3 left-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/35 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-mono font-extrabold text-emerald-700 tracking-wider uppercase select-none">
                            Available Today • {product.unit}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute bottom-3 left-3 bg-red-500/10 backdrop-blur-md border border-red-500/35 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-[9px] font-mono font-extrabold text-red-700 tracking-wider uppercase select-none">
                            Out of Stock • {product.unit}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Rating Block & Availability Badge */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                              <span className="material-symbols-rounded text-sm font-fill">star</span>
                            </div>
                            <span className="text-xs font-bold text-brand-dark/80">{product.rating}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-brand-primary/80 uppercase tracking-wide bg-brand-primary/5 px-2 py-0.5 rounded-md">
                            <span className="material-symbols-rounded text-xs">bolt</span>
                            <span>{product.isFastDelivery ? "30m Delivery" : "Standard"}</span>
                          </div>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-display font-bold text-base md:text-lg text-brand-dark tracking-tight line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Category / Subcategory Badge Row */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-brand-dark/50 bg-slate-100 px-2 py-0.5 rounded">
                            {product.category}
                          </span>
                          {product.subcategory && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                              {product.subcategory}
                            </span>
                          )}
                        </div>

                        {/* Prescription Required warning */}
                        {product.prescriptionRequired && (
                          <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 flex items-center gap-1.5 text-red-700 text-[10px] font-bold">
                            <span className="material-symbols-rounded text-sm">prescription</span>
                            <span>Prescription Required prior to dispatch</span>
                          </div>
                        )}

                        <p className="text-xs text-brand-dark/60 mt-2.5 line-clamp-2">
                          {product.description || `Premium quality fresh ${product.name.toLowerCase()} sourced from verified local partner shops in Salt Lake.`}
                        </p>
                      </div>

                      {/* Interactive Contact/WhatsApp Row */}
                      <div className="mt-5 border-t border-brand-dark/5 pt-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onEnquiry(product.name)}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-gradient-end text-white text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.83.001-2.628-1.02-5.1-2.871-6.954C16.586 1.968 14.12.94 11.488.94 6.054.94 1.631 5.348 1.628 10.771c0 1.705.452 3.237 1.411 4.789L2.03 21.07l5.617-1.472z" />
                          </svg>
                          <span>Connect Now</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCallNowClick}
                          className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-dark/70 hover:text-brand-dark transition-all flex items-center justify-center cursor-pointer"
                          title="Call Now"
                        >
                          <span className="material-symbols-rounded text-base">phone</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Fallback Empty Search state */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-1 sm:col-span-2 lg:col-span-4 py-20 flex flex-col items-center justify-center text-center w-full shrink-0 sm:shrink-1"
              >
                <div className="w-16 h-16 rounded-full bg-brand-dark/5 flex items-center justify-center text-brand-dark/40 mb-4">
                  <span className="material-symbols-rounded text-3xl">shopping_bag</span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-dark">No Products Found</h3>
                <p className="text-sm text-brand-dark/60 mt-1 max-w-sm">
                  No active neighborhood partner stock matches your filters or keyword "{searchQuery}" under "{selectedCategory}". Try updating your filters.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
