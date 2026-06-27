import { useState, useEffect, MouseEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { featuredProducts, servicesData } from "../data";
import { handleCallNowClick, scrollToContact } from "../utils";
import LazyImage from "./LazyImage";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
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
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? "py-3 px-4 md:px-8 mt-3" : "py-5 px-6 md:px-12 mt-0"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-[24px] transition-all duration-500 ${
            isScrolled
              ? "glass shadow-lg border-white/60 py-3 px-5 md:px-8"
              : "bg-transparent py-2 px-0 border-transparent"
          } flex items-center justify-between gap-4`}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="focus:outline-none shrink-0"
          >
            <Logo className="h-9 md:h-11" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 rounded-full text-xs lg:text-sm font-semibold tracking-wide transition-all duration-300 select-none ${
                    isActive
                      ? "text-brand-primary font-bold"
                      : "text-brand-dark/70 hover:text-brand-primary"
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

          {/* Interactive Desktop Search Bar */}
          <div
            ref={searchContainerRef}
            className="relative search-container hidden md:block"
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white/45 backdrop-blur-md transition-all duration-300 ${
                isSearchFocused
                  ? "w-48 lg:w-64 border-brand-primary/40 shadow-sm ring-2 ring-brand-primary/10"
                  : "w-36 lg:w-48 border-brand-dark/10 hover:border-brand-dark/20"
              }`}
            >
              <span className={`material-symbols-rounded text-lg select-none transition-colors duration-300 ${isSearchFocused ? "text-brand-primary" : "text-brand-dark/40"}`}>
                search
              </span>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[11px] lg:text-xs font-semibold text-brand-dark placeholder-brand-dark/40"
                id="desktop-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 rounded-full hover:bg-brand-dark/5 text-brand-dark/40 hover:text-brand-dark transition-colors"
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
                      <p className="text-xs font-semibold text-brand-dark/40">
                        No matching treats found
                      </p>
                      <p className="text-[10px] text-brand-dark/30 mt-1">
                        Try "Chowmein", "Apples", "Paneer" or "Fast Food"
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Categories / Departments Group */}
                      {suggestedCategories.length > 0 && (
                        <div>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-dark/40 uppercase block mb-2">
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
                                className="w-full p-2 rounded-xl hover:bg-brand-primary/5 transition-all text-left flex items-center justify-between group/cat cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 text-brand-primary flex items-center justify-center">
                                    <span className="material-symbols-rounded text-sm">category</span>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-brand-dark group-hover/cat:text-brand-primary transition-colors">
                                      {cat.title}
                                    </p>
                                    <p className="text-[9px] text-brand-dark/40 line-clamp-1">
                                      Browse department selection
                                    </p>
                                  </div>
                                </div>
                                <span className="material-symbols-rounded text-base text-brand-dark/30 group-hover/cat:text-brand-primary group-hover/cat:translate-x-0.5 transition-all">
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
                          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-dark/40 uppercase block mb-2">
                            In Stock Products
                          </span>
                          <div className="flex flex-col gap-2">
                            {suggestedProducts.map((prod) => {
                              return (
                                <div
                                  key={prod.id}
                                  className="p-2 rounded-xl hover:bg-white/60 border border-transparent hover:border-white/40 transition-all flex items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <LazyImage
                                      src={prod.image}
                                      alt={prod.name}
                                      category={prod.category}
                                      className="w-full h-full object-cover shrink-0"
                                      containerClassName="w-10 h-10 rounded-lg bg-slate-100 border border-brand-dark/5 shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-brand-dark truncate">
                                        {prod.name}
                                      </p>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[10px] font-mono font-bold text-brand-primary">
                                          ₹{prod.price}
                                        </span>
                                        <span className="text-[9px] text-brand-dark/40">
                                          / {prod.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleSearchProductClick(prod.name)}
                                    className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm flex items-center gap-1 cursor-pointer select-none shrink-0"
                                  >
                                    <span>Connect</span>
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

          {/* Right Action Controls: Call Now & Contact Us */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Call Now button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCallNowClick}
              className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-tr from-brand-primary to-brand-gradient-end text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer select-none"
              id="navbar-call-button"
            >
              <span className="material-symbols-rounded text-base animate-pulse font-fill">phone</span>
              <span className="hidden sm:inline">Call Now</span>
            </motion.button>

            {/* Contact Us Scroll button */}
            <button
              onClick={scrollToContact}
              className="hidden lg:flex items-center gap-1 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark hover:text-brand-primary hover:bg-brand-primary/5 border border-brand-dark/15 transition-all"
            >
              <span className="material-symbols-rounded text-base">support_agent</span>
              <span>Contact Us</span>
            </button>

            {/* Mobile Nav Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl xl:hidden text-brand-dark hover:bg-brand-dark/5 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-rounded text-2xl select-none">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
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
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-dark/10 bg-white/70">
                <span className="material-symbols-rounded text-lg text-brand-dark/40 select-none">search</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs font-semibold text-brand-dark placeholder-brand-dark/40"
                  id="mobile-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-0.5 rounded-full hover:bg-brand-dark/5"
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
                    className="overflow-y-auto max-h-[220px] mt-2 bg-white/50 backdrop-blur-md rounded-xl border border-brand-dark/5 divide-y divide-brand-dark/5 text-left"
                  >
                    {suggestedCategories.length === 0 &&
                    suggestedProducts.length === 0 ? (
                      <div className="py-4 px-3 text-center">
                        <p className="text-[11px] text-brand-dark/40 font-semibold">
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
                            className="w-full p-2 rounded-lg hover:bg-brand-primary/5 text-left flex items-center justify-between"
                          >
                            <span className="text-xs font-extrabold text-brand-dark">
                              {cat.title}{" "}
                              <span className="text-[9px] font-mono font-normal text-brand-dark/40">
                                (Dept)
                              </span>
                            </span>
                            <span className="material-symbols-rounded text-sm text-brand-primary">arrow_forward</span>
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
                                  <p className="text-xs font-bold text-brand-dark truncate">
                                    {prod.name}
                                  </p>
                                  <p className="text-[10px] font-bold text-brand-primary">
                                    ₹{prod.price}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleSearchProductClick(prod.name)}
                                className="px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase shrink-0 transition-all bg-brand-primary text-white"
                              >
                                Connect
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
                        ? "bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10 text-brand-primary"
                        : "text-brand-dark/80 hover:bg-brand-dark/5 hover:text-brand-dark"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />}
                  </motion.a>
                );
              })}
            </div>

            <hr className="border-brand-dark/5" />

            {/* Mobile Auxiliary Actions: Instantly triggers dialer */}
            <div className="flex items-center gap-3 justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCallNowClick();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-brand-primary to-brand-gradient-end text-white shadow-md"
              >
                <span className="material-symbols-rounded text-sm font-fill">phone</span>
                <span>Call Now</span>
              </button>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToContact();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-brand-dark border border-brand-dark/15 hover:bg-brand-primary/5 transition-all"
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
