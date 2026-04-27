export const trackEvent = (eventName: string, data?: any) => {
  console.log(`[Analytics] Event: ${eventName}`, data);
  
  // In production, integrate with Google Analytics or Mixpanel
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', eventName, data);
  // }
};
