const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const pageview = (url: string) => {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (!gtag) return;
  gtag("config", GA_ID, {
    page_path: url,
  });
};

export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (GA_ID && gtag) {
    gtag("event", action, params || {});
    return;
  }
  console.log(`[Analytics] event: ${action}`, params);
};

export default {
  pageview,
  trackEvent,
};
