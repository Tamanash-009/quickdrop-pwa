import { useState, useEffect, MouseEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { featuredProducts, servicesData } from "../data";
import { handleCallNowClick, scrollToContact } from "../utils";
import LazyImage from "./LazyImage";
import UserMenu from "../auth/components/UserMenu";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onSelectCategory: (category: string) => void;
  onEnquiry: (productName: string) => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Recommended", href: "#recommended" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  activeSection,
  onSelectCategory,
  onEnquiry,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search logic states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { itemCount, setIsCartOpen, addToCart } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === "#recommended") {
      const element = document.querySelector("#recommended");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSearchProductClick = (productName: string) => {
    setIsSearchFocused(false);
    setSearchQuery("");
    onEnquiry(productName);
  };

  const query = searchQuery.trim().toLowerCase();

  const suggestedCategories = query
    ? servicesData.filter(
        (service) =>
          !service.isComingSoon &&
          service.title.toLowerCase().includes(query)
      )
    : [];

  const suggestedProducts = query
    ? featuredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-center ${
          isScrolled ? "py-3 px-4 md:px-6 lg:px-8 mt-3" : "py-4 px-5 md:px-8 lg:px-10 mt-0"
        }`}
      >
        <div
          className={`w-full max-w-[1440px] mx-auto rounded-[32px] transition-all duration-500 ${
            isScrolled
              ? "glass shadow-lg border-outline py-3 px-5 md:px-8"
              : "bg-transparent py-2 px-0 border-transparent"
          } flex items-center justify-between gap-4`}
        >
          {/* Brand Logo - Left Section */}
          <div className="flex-shrink-0 z-20 flex items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="focus:outline-none shrink-0"
            >
              <Logo className="h-9 md:h-11" />
            </a>
          </div>

          {/* Desktop Navigation Links - Center Section */}
          <div className="hidden lg:flex flex-1 justify-center z-10 min-w-0">
            <nav className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 rounded-full text-xs lg:text-sm font-semibold tracking-wide transition-all duration-300 select-none ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-brand-primary to-brand-cyan rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            </nav>
          </div>

          {/* Right Section: Actions & Search */}
          <div className="flex items-center justify-end gap-2 lg:gap-4 shrink-0 z-20">
            {/* Interactive Desktop Search Bar */}
            <div
              ref={searchContainerRef}
              className="relative search-container hidden md:block"
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border bg-background/45 backdrop-blur-md transition-all duration-300 ${
                  isSearchFocused
                    ? "w-[280px] xl:w-[320px] border-brand-primary/40 shadow-sm ring-2 ring-brand-primary/10"
                    : "w-[240px] xl:w-[260px] border-outline hover:border-outline"
                }`}
              >
              <span className={`material-symbols-rounded text-lg select-none transition-colors duration-300 ${isSearchFocused ? "text-primary" : "text-on-surface/40"}`}>
                search
              </span>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[11px] lg:text-xs font-semibold text-on-surface placeholder-brand-dark/40"
                id="desktop-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 rounded-full hover:bg-on-surface/5 text-on-surface/40 hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-rounded text-sm">close</span>
                </button>
              )}
            </div>

            {/* FLOATING SUGGESTIONS DROPDOWN */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.trim() !== "" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 4, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-[320px] lg:w-[350px] max-h-[380px] overflow-y-auto rounded-2xl glass border border-white/80 shadow-2xl z-50 p-4 flex flex-col gap-4 text-left"
                >
                  {suggestedCategories.length === 0 &&
                  suggestedProducts.length === 0 ? (
                    <div className="py-8 px-4 text-center">
                      <p className="text-xs font-semibold text-on-surface/40">
                        No matching treats found
                      </p>
                      <p className="text-[10px] text-on-surface/30 mt-1">
                        Try "Chowmein", "Apples", "Paneer" or "Fast Food"
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Categories / Departments Group */}
                      {suggestedCategories.length > 0 && (
                        <div>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-on-surface/40 uppercase block mb-2">
                            Departments
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {suggestedCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  onSelectCategory(cat.title);
                                  setIsSearchFocused(false);
                                  setSearchQuery("");
                                }}
                                className="w-full p-2 rounded-xl hover:bg-primary/5 transition-all text-left flex items-center justify-between group/cat cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-rounded text-sm">category</span>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-on-surface group-hover/cat:text-primary transition-colors">
                                      {cat.title}
                                    </p>
                                    <p className="text-[9px] text-on-surface/40 line-clamp-1">
                                      Browse department selection
                                    </p>
                                  </div>
                                </div>
                                <span className="material-symbols-rounded text-base text-on-surface/30 group-hover/cat:text-primary group-hover/cat:translate-x-0.5 transition-all">
                                  arrow_right_alt
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Products Group */}
                      {suggestedProducts.length > 0 && (
                        <div>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-on-surface/40 uppercase block mb-2">
                            In Stock Products
                          </span>
                          <div className="flex flex-col gap-2">
                            {suggestedProducts.map((prod) => {
                              return (
                                <div
                                  key={prod.id}
                                  className="p-2 rounded-xl hover:bg-background/60 border border-transparent hover:border-white/40 transition-all flex items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <LazyImage
                                      src={prod.image}
                                      alt={prod.name}
                                      category={prod.category}
                                      className="w-full h-full object-cover shrink-0"
                                      containerClassName="w-10 h-10 rounded-lg bg-surface-variant border border-outline shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-on-surface truncate">
                                        {prod.name}
                                      </p>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[10px] font-mono font-bold text-primary">
                                          ₹{prod.price}
                                        </span>
                                        <span className="text-[9px] text-on-surface/40">
                                          / {prod.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      addToCart(prod);
                                      setIsSearchFocused(false);
                                      setSearchQuery("");
                                    }}
                                    className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all bg-primary text-on-primary hover:bg-primary/90 shadow-sm flex items-center gap-1 cursor-pointer select-none shrink-0"
                                  >
                                    <ShoppingBag size={12} />
                                    <span>Add</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Controls: Call Now, User Menu & Mobile Toggle */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User Account Menu (Auth Architecture) */}
            <UserMenu />

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-background border border-outline shadow-sm text-on-surface hover:text-primary transition-colors flex items-center justify-center"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </motion.button>

            {/* Call Now button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCallNowClick}
              className="hidden lg:flex px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-tr from-brand-primary to-brand-gradient-end text-on-primary shadow-md hover:shadow-lg transition-all items-center gap-2 cursor-pointer select-none"
              id="navbar-call-button"
            >
              <span className="material-symbols-rounded text-base animate-pulse font-fill">phone</span>
              <span>Call Now</span>
            </motion.button>

            {/* Mobile Nav Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl xl:hidden text-on-surface hover:bg-on-surface/5 transition-colors focus:outline-none ml-1"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-rounded text-2xl select-none">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 mx-4 p-5 rounded-3xl glass shadow-2xl z-40 border border-white/70 flex flex-col gap-5 xl:hidden"
          >
            {/* Mobile search bar */}
            <div className="relative w-full">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-outline bg-background/70">
                <span className="material-symbols-rounded text-lg text-on-surface/40 select-none">search</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs font-semibold text-on-surface placeholder-brand-dark/40"
                  id="mobile-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-0.5 rounded-full hover:bg-on-surface/5"
                  >
                    <span className="material-symbols-rounded text-sm">close</span>
                  </button>
                )}
              </div>

              {/* Mobile Suggestions Inline Wrapper */}
              <AnimatePresence>
                {searchQuery.trim() !== "" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-y-auto max-h-[220px] mt-2 bg-background/50 backdrop-blur-md rounded-xl border border-outline divide-y divide-brand-dark/5 text-left"
                  >
                    {suggestedCategories.length === 0 &&
                    suggestedProducts.length === 0 ? (
                      <div className="py-4 px-3 text-center">
                        <p className="text-[11px] text-on-surface/40 font-semibold">
                          No results found
                        </p>
                      </div>
                    ) : (
                      <div className="p-1.5 flex flex-col gap-1.5">
                        {suggestedCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              onSelectCategory(cat.title);
                              setIsMobileMenuOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full p-2 rounded-lg hover:bg-primary/5 text-left flex items-center justify-between"
                          >
                            <span className="text-xs font-extrabold text-on-surface">
                              {cat.title}{" "}
                              <span className="text-[9px] font-mono font-normal text-on-surface/40">
                                (Dept)
                              </span>
                            </span>
                            <span className="material-symbols-rounded text-sm text-primary">arrow_forward</span>
                          </button>
                        ))}
                        {suggestedProducts.map((prod) => {
                          return (
                            <div
                              key={prod.id}
                              className="p-1.5 rounded-lg flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <LazyImage
                                  src={prod.image}
                                  alt={prod.name}
                                  category={prod.category}
                                  className="w-full h-full object-cover shrink-0"
                                  containerClassName="w-8 h-8 rounded-lg shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-on-surface truncate">
                                    {prod.name}
                                  </p>
                                  <p className="text-[10px] font-bold text-primary">
                                    ₹{prod.price}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  addToCart(prod);
                                  setIsMobileMenuOpen(false);
                                  setSearchQuery("");
                                }}
                                className="px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase shrink-0 transition-all bg-primary text-on-primary flex items-center gap-1"
                              >
                                <ShoppingBag size={10} />
                                Add
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-4 py-2 mb-2">
                <span className="text-sm font-semibold text-on-surface-variant">Theme Appearance</span>
                <ThemeToggle />
              </div>
              
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10 text-primary"
                        : "text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />}
                  </motion.a>
                );
              })}
            </div>

            <hr className="border-outline" />

            {/* Mobile Auxiliary Actions: Instantly triggers dialer */}
            <div className="flex items-center gap-3 justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCallNowClick();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-brand-primary to-brand-gradient-end text-on-primary shadow-md"
              >
                <span className="material-symbols-rounded text-sm font-fill">phone</span>
                <span>Call Now</span>
              </button>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToContact();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-on-surface border border-outline hover:bg-primary/5 transition-all"
              >
                <span className="material-symbols-rounded text-sm">support_agent</span>
                <span>Contact Us</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
