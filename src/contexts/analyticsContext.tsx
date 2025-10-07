// src/contexts/AnalyticsContext.tsx
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

// --- 1. Type Definitions for Absolute Type Safety 🛡️ ---

// Type for the parameters object passed to gtag (generic GA event parameters)
type GtagParams = Record<string, string | number | boolean | undefined>;

// Define the shape of Google Analytics' global gtag function (if it exists)
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params: GtagParams,
    ) => void;
  }
}

// 1. Define all application-specific events using a Discriminated Union.
export type AppEvent =
  | { type: "lead_generated"; source: string; medium: string; campaign: string }
  | { type: "profile_view"; profileId: string; source: string }
  | { type: "nfc_scan"; cardType: string; location: string }
  | { type: "qr_scan"; qrType: string; source: string }
  | { type: "demo_booked"; product: string; source: string }
  | { type: "app_download"; platform: string }
  | { type: "contact_form_submitted"; formType: string };

// 2. Define the public interface for the hook
interface AnalyticsContextType {
  logEvent: (event: AppEvent) => void;
}

// --- 2. Core Implementation ---

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);

// Helper to check if gtag is available
const isGtagAvailable = (): boolean =>
  typeof window !== "undefined" && !!window.gtag;

const GA_MEASUREMENT_ID = "GA_MEASUREMENT_ID"; // 💡 Replace with your actual GA ID

/**
 * 💡 Hook to easily access typesafe analytics functions in any client component.
 */
export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

/**
 * 🚀 Centralized Analytics Provider for Next.js applications.
 */
export const AnalyticsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Construct the full path (memoized for stability)
  const fullPath = useMemo((): string => {
    return (
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    );
  }, [pathname, searchParams]);

  /**
   * 🔗 Base function to call the Google Analytics gtag event.
   * This handles the low-level external library interaction.
   */
  const trackGtagEvent = useCallback(
    (action: string, params: GtagParams): void => {
      if (isGtagAvailable() && window.gtag) {
        window.gtag("event", action, params);
        // Optional: console.log(`GA Event: ${action}`, params);
      }
    },
    [],
  );

  /**
   * ✨ Application-specific high-level event logging function.
   * Maps the typesafe AppEvent to the GA parameter structure.
   */
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
          // TypeScript Exhaustiveness Check
          const _exhaustiveCheck: never = event;
          return _exhaustiveCheck;
      }
    },
    [trackGtagEvent],
  );

  // --- 3. Page View Tracking ---

  // Track page views on route changes
  useEffect(() => {
    if (isGtagAvailable() && window.gtag) {
      // Use 'config' to track page view in GA4
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: fullPath,
        send_page_view: true,
      });
    }
  }, [fullPath]);

  const contextValue = useMemo(
    () => ({
      logEvent,
    }),
    [logEvent],
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};
