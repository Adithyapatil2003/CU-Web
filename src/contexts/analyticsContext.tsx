"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params: GtagParams,
    ) => void;
  }
}

export type DemoProduct = "Standard" | "Premium" | "Enterprise" | "Other";
export type DemoSource = "cta_button" | "taponn" | "pricing_page" | "footer";
export type AppPlatform = "IOS" | "Android" | "Windows" | "macOS";
type LeadSource = "website_form" | "api_integration" | "referral";
type LeadMedium = "web" | "partner" | "sales";
type LeadCampaign = "Q4_Promo" | "Summer_Launch" | "Evergreen" | "None";
type FormType = "Contact" | "Support" | "Feedback";
type ProfileSource = "search" | "direct_link" | "internal";
type NfcCardType = "Business" | "Personal" | "Access";
type QrType = "Dynamic" | "Static" | "Product";
type QrSource = "PrintAd" | "DigitalScreen" | "Email";

export type AppEvent =
  | {
      type: "lead_generated";
      source: LeadSource;
      medium: LeadMedium;
      campaign: LeadCampaign;
    }
  | { type: "profile_view"; profileId: string; source: ProfileSource }
  | { type: "nfc_scan"; cardType: NfcCardType; location: string }
  | { type: "qr_scan"; qrType: QrType; source: QrSource }
  | { type: "demo_booked"; product: DemoProduct; source: DemoSource }
  | { type: "app_download"; platform: AppPlatform }
  | { type: "contact_form_submitted"; formType: FormType };

interface AnalyticsContextType {
  logEvent: (event: AppEvent) => void;
  trackDemoBooking: (product: DemoProduct, source: DemoSource) => void;
  trackAppDownload: (platform: AppPlatform) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);

const isGtagAvailable = (): boolean =>
  typeof window !== "undefined" && !!window.gtag;

const GA_MEASUREMENT_ID = "GA_MEASUREMENT_ID";

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

export const AnalyticsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullPath = useMemo((): string => {
    return (
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    );
  }, [pathname, searchParams]);

  const trackGtagEvent = useCallback(
    (action: string, params: GtagParams): void => {
      if (isGtagAvailable() && window.gtag) {
        window.gtag("event", action, params);
        console.log(`GA Event: ${action}`, params);
      }
    },
    [],
  );

  const logEvent = useCallback(
    (event: AppEvent): void => {
      switch (event.type) {
        case "lead_generated":
          trackGtagEvent("lead_generated", {
            event_category: "conversion",
            value: 1,
            source: event.source,
            medium: event.medium,
            campaign: event.campaign,
          });
          break;

        case "profile_view":
          trackGtagEvent("profile_view", {
            event_category: "engagement",
            profile_id: event.profileId,
            source: event.source,
          });
          break;

        case "nfc_scan":
          trackGtagEvent("nfc_scan", {
            event_category: "interaction",
            card_type: event.cardType,
            location: event.location,
          });
          break;

        case "qr_scan":
          trackGtagEvent("qr_scan", {
            event_category: "interaction",
            qr_type: event.qrType,
            source: event.source,
          });
          break;

        case "demo_booked":
          trackGtagEvent("demo_booked", {
            event_category: "conversion",
            product_name: event.product,
            source: event.source,
          });
          break;

        case "app_download":
          trackGtagEvent("app_download", {
            event_category: "conversion",
            platform: event.platform,
          });
          break;

        case "contact_form_submitted":
          trackGtagEvent("contact_form_submitted", {
            event_category: "engagement",
            form_type: event.formType,
          });
          break;

        default:
          const _exhaustiveCheck: never = event;
          return _exhaustiveCheck;
      }
    },
    [trackGtagEvent],
  );

  const trackDemoBooking = useCallback(
    (product: DemoProduct, source: DemoSource): void => {
      logEvent({ type: "demo_booked", product, source });
    },
    [logEvent],
  );

  const trackAppDownload = useCallback(
    (platform: AppPlatform): void => {
      logEvent({ type: "app_download", platform });
    },
    [logEvent],
  );

  useEffect(() => {
    if (isGtagAvailable() && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: fullPath,
        send_page_view: true,
      });
    }
  }, [fullPath]);

  const contextValue = useMemo(
    () => ({
      logEvent,
      trackDemoBooking,
      trackAppDownload,
    }),
    [logEvent, trackDemoBooking, trackAppDownload],
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
