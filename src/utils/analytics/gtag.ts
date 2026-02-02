"use client";

type GAEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const sendEvent = ({ action, category, label, value }: GAEvent) => {
  if (!window.gtag || process.env.NODE_ENV !== "production") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
