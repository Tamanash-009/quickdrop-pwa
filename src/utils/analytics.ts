import { seoConfig } from "../config/seo";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// 1. Initialize Analytics (Only called when consent is given)
export const initAnalytics = () => {
  if (typeof window === "undefined") return;

  // Initialize GA4
  const gaId = seoConfig.analytics.ga4MeasurementId;
  if (gaId && gaId !== "G-XXXXXXXXXX") {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
  }

  // Initialize MS Clarity
  const clarityId = seoConfig.analytics.clarityProjectId;
  if (clarityId && clarityId !== "xxxxxxxxx") {
    (function(c:any,l:any,a:any,r:any,i:any,t?:any,y?:any){
      c[a]=c[a]||function(...args: any[]){(c[a].q=c[a].q||[]).push(args)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityId);
  }
};

// 2. Event Tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackWhatsAppClick = (productName: string) => {
  trackEvent("whatsapp_click", "engagement", productName);
};

export const trackCallClick = () => {
  trackEvent("call_click", "engagement", "Phone Dial");
};

export const trackSearch = (query: string) => {
  trackEvent("search", "engagement", query);
};

export const trackSocialClick = (platform: string) => {
  trackEvent("social_click", "engagement", platform);
};
