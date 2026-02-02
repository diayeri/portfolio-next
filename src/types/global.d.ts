export {};

type GtagCommand = "config" | "event" | "js";

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  page_path?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: GtagCommand,
      targetIdOrEventName: string | Date,
      params?: GtagEventParams,
    ) => void;
  }
}
