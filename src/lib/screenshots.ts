import ipadFieldTodayLight from "../assets/rosterease/screenshots/capture-2026-10-01/ipad-field-today-light.png";
import ipadFieldTodayDark from "../assets/rosterease/screenshots/capture-2026-10-01/ipad-field-today-dark.png";
import ipadFieldCalendarLight from "../assets/rosterease/screenshots/capture-2026-10-01/ipad-field-calendar-light.png";
import ipadFieldCalendarDark from "../assets/rosterease/screenshots/capture-2026-10-01/ipad-field-calendar-dark.png";
import shiftToday from "../assets/rosterease/screenshots/capture-2026-10-01/shift-today-dark.png";
import fieldToday from "../assets/rosterease/screenshots/capture-2026-10-01/field-today-dark.png";
import shiftImport from "../assets/rosterease/screenshots/review-2026-09-05/import-review.jpg";
import fieldImport from "../assets/rosterease/screenshots/review-2026-09-05/field-import-review.jpg";
import shiftCalendar from "../assets/rosterease/screenshots/capture-2026-10-01/shift-calendar-dark.png";
import fieldCalendar from "../assets/rosterease/screenshots/capture-2026-10-01/field-calendar-dark.png";
import fieldClients from "../assets/rosterease/screenshots/capture-2026-10-01/field-clients-dark.png";
import type { ImageMetadata } from "astro";
export interface AppScreen {
  dark: ImageMetadata;
  light?: ImageMetadata;
  alt: string;
}
// Native 1 October simulator captures use synthetic records; provenance is in capture-manifest.json.
// Import-review examples remain the genuine 5 September captures.
export const screens = {
  ipadFieldToday: {
    light: ipadFieldTodayLight,
    dark: ipadFieldTodayDark,
    alt: "Field Worker Today on iPad with a six-visit plan.",
  },
  ipadFieldCalendar: {
    light: ipadFieldCalendarLight,
    dark: ipadFieldCalendarDark,
    alt: "Field Worker Calendar on iPad with October visits and selected-day details.",
  },
  shiftToday: {
    dark: shiftToday,
    alt: "Shift Worker Today with the current shift, workplace and leave plan.",
  },
  fieldToday: {
    dark: fieldToday,
    alt: "Field Worker Today with the next visit and completion progress.",
  },
  shiftImport: {
    dark: shiftImport,
    alt: "Shift Worker import review with extracted shift details.",
  },
  fieldImport: {
    dark: fieldImport,
    alt: "Field Worker import review with extracted client details.",
  },
  shiftCalendar: {
    dark: shiftCalendar,
    alt: "Shift Worker monthly calendar with rostered shifts.",
  },
  fieldCalendar: {
    dark: fieldCalendar,
    alt: "Field Worker monthly calendar with planned visits.",
  },
  fieldClients: {
    dark: fieldClients,
    alt: "Field Worker client directory with visit details.",
  },
} satisfies Record<string, AppScreen>;
