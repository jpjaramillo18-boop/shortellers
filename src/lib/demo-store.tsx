"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ========================================================================
   Client-side demo state.
   - Holds the booking draft and the project lifecycle status.
   - Persists to localStorage so navigating between screens never resets
     the story. All reads/writes are guarded.
   - Defaults ARE the approved narrative, so first render (and SSR) is
     already story-consistent without waiting for hydration.
   ===================================================================== */

export type DemoProjectStatus = "delivered" | "changes-requested" | "approved";

export interface BookingDraft {
  creatorSlug: string;
  packageId: string;
  addOnIds: string[];
  /** ISO date */
  date: string;
  timeLabel: string;
  locationMode: "business" | "studio";
  address: string;
  brief: { need: string; mood: string; usage: string };
  mustHaveShots: string[];
}

export interface DemoReview {
  rating: number;
  text: string;
}

interface DemoState {
  booking: BookingDraft;
  bookingConfirmed: boolean;
  projectStatus: DemoProjectStatus;
  paymentReleased: boolean;
  changeNote: string | null;
  review: DemoReview | null;
}

const STORAGE_KEY = "shortellers-demo-v1";

const STUDIO_ADDRESS = "Lena's studio · 2210 NE Alberta St, Portland, OR 97211";
const BUSINESS_ADDRESS = "1420 NE Alberta St, Portland, OR 97211";

const DEFAULT_STATE: DemoState = {
  booking: {
    creatorSlug: "lena-ortiz",
    packageId: "signature-menu-shoot",
    addOnIds: ["extra-15-images"],
    date: "2025-10-16",
    timeLabel: "8:00–12:00",
    locationMode: "business",
    address: BUSINESS_ADDRESS,
    brief: {
      need: "Autumn menu refresh — 6 pastries + 2 seasonal drinks. Warm morning light, lots of negative space for menu layout. A few shots of the counter and window seating. Vertical clips for Instagram. Cozy, unfussy, local.",
      mood: "Cozy, unfussy, local. Warm morning light.",
      usage: "Website, print menu, Instagram",
    },
    mustHaveShots: [
      "Laminated croissant cross-section",
      "Pumpkin cardamom latte, overhead",
      "Counter at opening",
    ],
  },
  bookingConfirmed: false,
  projectStatus: "delivered",
  paymentReleased: false,
  changeNote: null,
  review: null,
};

function clone(state: DemoState): DemoState {
  return {
    ...state,
    booking: {
      ...state.booking,
      addOnIds: [...state.booking.addOnIds],
      brief: { ...state.booking.brief },
      mustHaveShots: [...state.booking.mustHaveShots],
    },
    review: state.review ? { ...state.review } : null,
  };
}

interface DemoContextValue extends DemoState {
  hydrated: boolean;
  studioAddress: string;
  businessAddress: string;
  setPackage: (packageId: string) => void;
  toggleAddOn: (addOnId: string) => void;
  setDate: (iso: string) => void;
  setLocationMode: (mode: "business" | "studio") => void;
  setBriefField: (key: keyof BookingDraft["brief"], value: string) => void;
  setMustHaveShots: (shots: string[]) => void;
  confirmBooking: () => void;
  approveProject: () => void;
  requestChanges: (note: string) => void;
  markRedelivered: () => void;
  submitReview: (review: DemoReview) => void;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DemoState>;
        setState((prev) => ({
          ...prev,
          ...parsed,
          booking: { ...prev.booking, ...(parsed.booking ?? {}) },
        }));
      }
    } catch {
      /* ignore corrupt / unavailable storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration only).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const update = useCallback((fn: (draft: DemoState) => void) => {
    setState((prev) => {
      const draft = clone(prev);
      fn(draft);
      return draft;
    });
  }, []);

  const setPackage = useCallback(
    (packageId: string) =>
      update((d) => {
        d.booking.packageId = packageId;
        d.booking.addOnIds = []; // add-ons are package-specific
      }),
    [update],
  );

  const toggleAddOn = useCallback(
    (addOnId: string) =>
      update((d) => {
        const i = d.booking.addOnIds.indexOf(addOnId);
        if (i >= 0) d.booking.addOnIds.splice(i, 1);
        else d.booking.addOnIds.push(addOnId);
      }),
    [update],
  );

  const setDate = useCallback(
    (iso: string) => update((d) => void (d.booking.date = iso)),
    [update],
  );

  const setLocationMode = useCallback(
    (mode: "business" | "studio") =>
      update((d) => {
        d.booking.locationMode = mode;
        d.booking.address = mode === "business" ? BUSINESS_ADDRESS : STUDIO_ADDRESS;
      }),
    [update],
  );

  const setBriefField = useCallback(
    (key: keyof BookingDraft["brief"], value: string) =>
      update((d) => void (d.booking.brief[key] = value)),
    [update],
  );

  const setMustHaveShots = useCallback(
    (shots: string[]) => update((d) => void (d.booking.mustHaveShots = shots)),
    [update],
  );

  const confirmBooking = useCallback(
    () => update((d) => void (d.bookingConfirmed = true)),
    [update],
  );

  const approveProject = useCallback(
    () =>
      update((d) => {
        d.projectStatus = "approved";
        d.paymentReleased = true;
        d.changeNote = null;
      }),
    [update],
  );

  const requestChanges = useCallback(
    (note: string) =>
      update((d) => {
        d.projectStatus = "changes-requested";
        d.changeNote = note.trim() || null;
      }),
    [update],
  );

  const markRedelivered = useCallback(
    () =>
      update((d) => {
        d.projectStatus = "delivered";
      }),
    [update],
  );

  const submitReview = useCallback(
    (review: DemoReview) => update((d) => void (d.review = review)),
    [update],
  );

  const resetDemo = useCallback(() => setState(clone(DEFAULT_STATE)), []);

  const value = useMemo<DemoContextValue>(
    () => ({
      ...state,
      hydrated,
      studioAddress: STUDIO_ADDRESS,
      businessAddress: BUSINESS_ADDRESS,
      setPackage,
      toggleAddOn,
      setDate,
      setLocationMode,
      setBriefField,
      setMustHaveShots,
      confirmBooking,
      approveProject,
      requestChanges,
      markRedelivered,
      submitReview,
      resetDemo,
    }),
    [
      state,
      hydrated,
      setPackage,
      toggleAddOn,
      setDate,
      setLocationMode,
      setBriefField,
      setMustHaveShots,
      confirmBooking,
      approveProject,
      requestChanges,
      markRedelivered,
      submitReview,
      resetDemo,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within <DemoProvider>");
  return ctx;
}
