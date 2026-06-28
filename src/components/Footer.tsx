import { MouseEvent } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Mail, Phone, MessageSquare, Clock } from "lucide-react";
import Logo from "./Logo";
import { businessConfig } from "../config/business";

const socialPlatforms = [
  {
    name: "Google Business Profile",
    href: "https://maps.google.com/?q=QuickDrop+Salt+Lake+Kolkata",
    color: "hover:bg-[#4285F4]/15 hover:text-[#4285F4] hover:border-[#4285F4]",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9 10.4C21.9 10 21.9 9.5 21.8 9.1H12V13.1H17.5C17.3 14.2 16.6 15.2 15.6 15.8V18.4H19.3C21.4 16.4 22.7 13.5 21.9 10.4Z" fill="#4285F4"/>
        <path d="M12 20.5C14.8 20.5 17.2 19.5 18.9 17.9L15.6 15.3C14.7 15.9 13.5 16.3 12 16.3C9.3 16.3 7 14.4 6.2 11.9H2.4V14.8C4.1 18.2 7.8 20.5 12 20.5Z" fill="#34A853"/>
        <path d="M6.2 11.9C6 11.3 5.9 10.7 5.9 10C5.9 9.3 6 8.7 6.2 8.1V5.2H2.4C1.6 6.7 1.1 8.3 1.1 10C1.1 11.7 1.6 13.3 2.4 14.8L6.2 11.9Z" fill="#FBBC05"/>
        <path d="M12 3.7C13.5 3.7 14.9 4.2 16 5.2L18.9 2.3C17.1 0.9 14.7 0 12 0C7.8 0 4.1 2.3 2.4 5.7L6.2 8.6C7 6.1 9.3 3.7 12 3.7Z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: "WhatsApp Business",
    href: "https://wa.me/917001055879",
    color: "hover:bg-[#25D366]/15 hover:text-[#25D366] hover:border-[#25D366]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 0C5.437 0 .1 5.337.098 11.93a11.87 11.87 0 001.584 5.955L0 24l6.335-1.662a11.85 11.85 0 005.7 1.455h.004c6.594 0 11.93-5.337 11.933-11.93A11.93 11.93 0 0012.03 0zm5.441 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    )
  },
  {
    name: "Facebook Business Page",
    href: "https://facebook.com/quickdrop.delivery",
    color: "hover:bg-[#1877F2]/15 hover:text-[#1877F2] hover:border-[#1877F2]",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: "Instagram Business",
    href: "https://instagram.com/quickdrop.delivery",
    color: "hover:bg-gradient-to-tr hover:from-[#f9ce34]/15 hover:via-[#ee2a7b]/15 hover:to-[#6228d7]/15 hover:text-[#e1306c] hover:border-[#e1306c]",
    icon: (
      <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  }
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const servicesLinks = [
  { label: "Chinese Food", href: "#featured" },
  { label: "Rolls & Wraps", href: "#featured" },
  { label: "Fast Food", href: "#featured" },
  { label: "Fresh Vegetables", href: "#featured" },
  { label: "Dairy Products", href: "#featured" },
  { label: "Stationery Essentials", href: "#featured" },
];

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("/");
    }
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 150);
  };

  const handlePageLink = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <footer className="relative bg-background pt-20 pb-8 px-6 md:px-12 border-t border-outline overflow-hidden">
      {/* Visual glowing blobs in background */}
      <div className="absolute bottom-[-10%] left-[20%] w-[350px] aspect-square rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Main 4-column link directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand pitch and socials */}
          <div className="lg:col-span-4 flex flex-col gap-5 text-left items-start">
            <Logo className="h-10" />
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mt-3">
              QuickDrop is the premier hyperlocal courier network delivering foods, fresh vegetables, groceries, and stationery staples straight to your doorstep in under 30 minutes.
            </p>
            {/* Follow Us Social Matrix */}
            <div className="flex flex-col gap-3 mt-2">
              <h4 className="font-display font-bold text-xs tracking-widest text-on-surface-variant uppercase">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialPlatforms.map((social) => (
                  <div key={social.name} className="relative group">
                    {/* Premium Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-on-surface text-on-primary text-[10px] font-mono tracking-wider font-extrabold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md z-50">
                      {social.name}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-dark" />
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-11 h-11 rounded-full bg-surface border border-outline flex items-center justify-center transition-all shadow-sm ${social.color}`}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links Directory */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h4 className="font-display font-bold text-sm tracking-widest text-on-surface-variant uppercase">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Active Services Index */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-left">
            <h4 className="font-display font-bold text-sm tracking-widest text-on-surface-variant uppercase">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust Seal & Contacts */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-left">
            <h4 className="font-display font-bold text-sm tracking-widest text-on-surface-variant uppercase">
              Contact Center
            </h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-on-surface-variant">
                <Mail size={14} className="text-brand-cyan" />
                <a href={`mailto:${businessConfig.contact.email}`} className="hover:text-primary transition-colors">{businessConfig.contact.email}</a>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-on-surface-variant">
                <Phone size={14} className="text-brand-cyan" />
                <a href={`tel:${businessConfig.contact.phone}`} className="hover:text-primary transition-colors">{businessConfig.contact.phone}</a>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-on-surface-variant">
                <MessageSquare size={14} className="text-emerald-500 fill-emerald-500/10 animate-pulse" />
                <a href={`https://wa.me/${businessConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{businessConfig.contact.phone}</a>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-rounded text-sm text-primary mt-0.5">location_on</span>
                <a href={businessConfig.contact.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {businessConfig.contact.address.street}, {businessConfig.contact.address.po}<br/>
                  {businessConfig.contact.address.city}, {businessConfig.contact.address.district}<br/>
                  {businessConfig.contact.address.state} {businessConfig.contact.address.postalCode}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant font-mono font-bold mt-1">
                <Clock size={13} className="text-brand-cyan" />
                <span>{businessConfig.hours.days}: {businessConfig.hours.openTime} – {businessConfig.hours.closeTime}</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-2 p-3 rounded-lg bg-primary/5 border border-brand-primary/10">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-rounded text-sm text-primary">location_on</span> Service Area</span>
                  <span className="text-right">Nischintapur (Up to 10 KM)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-rounded text-sm text-primary">local_shipping</span> Avg Delivery</span>
                  <span className="text-right">~{businessConfig.delivery.averageTimeMins} Minutes</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-rounded text-sm text-emerald-500">payments</span> Delivery Fee</span>
                  <span className="text-right">₹{businessConfig.delivery.charge}</span>
                </div>
                <div className="mt-1 pt-2 border-t border-brand-primary/10 flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-cyan">🚀 Expanding Soon</span>
                </div>
              </div>
              
              {/* Trust Badge Card */}
              <div className="mt-1 p-4 rounded-xl bg-surface border border-outline flex items-center gap-2.5 shadow-sm">
                <ShieldCheck size={22} className="text-brand-cyan" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Insured Delivery</span>
                  <span className="text-[10px] text-on-surface-variant">Damages fully reimbursed</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-outline" />

        {/* Footer Base bar: Copy, links, and design tag */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-on-surface-variant font-bold tracking-wider">
          <p>&copy; {new Date().getFullYear()} {businessConfig.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => handlePageLink(e, "/privacy-policy")}
              className="hover:text-primary transition-colors"
              id="footer-privacy-link"
            >
              PRIVACY POLICY
            </a>
            <a
              href="/terms-and-conditions"
              onClick={(e) => handlePageLink(e, "/terms-and-conditions")}
              className="hover:text-primary transition-colors"
              id="footer-terms-link"
            >
              TERMS & CONDITIONS
            </a>
            <a
              href="/copyright"
              onClick={(e) => handlePageLink(e, "/copyright")}
              className="hover:text-primary transition-colors"
              id="footer-copyright-link"
            >
              COPYRIGHT
            </a>
          </div>
          <div className="flex items-center gap-1 uppercase">
            <span>Designed & Developed for {businessConfig.name}.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
