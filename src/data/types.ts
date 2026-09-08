/**
 * Shortellers demo — data contracts.
 * Presentation is kept out of this file. Swapping the mock modules in this
 * folder for real API responses should be the only change required later.
 */

export type CategorySlug =
  | "food-menu"
  | "interiors"
  | "products"
  | "events"
  | "social"
  | "brand-story";

export interface Category {
  slug: CategorySlug;
  label: string;
  /** lucide-react icon name */
  iconName: string;
  cover: string;
  blurb: string;
}

/** Normalised 0..1 coordinates for the stylised (non-API) map. */
export interface GeoPin {
  x: number;
  y: number;
}

export interface Location {
  neighborhood: string;
  city: string;
  state: string;
  pin: GeoPin;
}

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerBusiness: string;
  /** ISO date */
  date: string;
  rating: number;
  text: string;
  photo?: string;
  projectType: string;
}

export type MediaAspect = "1x1" | "4x5" | "3x2" | "16x9";

export interface PortfolioItem {
  id: string;
  image: string;
  aspect: MediaAspect;
  category: CategorySlug;
  title: string;
  alt: string;
  context: string;
  /** spans 2 columns in the bento */
  feature?: boolean;
  packageId?: string;
}

export interface AddOn {
  id: string;
  label: string;
  priceUSD: number;
}

export interface Package {
  id: string;
  name: string;
  priceUSD: number;
  duration: string;
  popular?: boolean;
  summary: string;
  includes: string[];
  deliveryDays: number;
  addOns: AddOn[];
}

export interface Creator {
  slug: string;
  name: string;
  avatar: string;
  cover: string;
  headline: string;
  bio: string;
  categories: CategorySlug[];
  location: Location;
  serviceRadiusKm: number;
  verified: boolean;
  verifiedSince?: string;
  ratingAvg: number;
  ratingCount: number;
  ratingBreakdown?: RatingBreakdown;
  responseTimeHours: number;
  memberSince: number;
  projectsCompleted: number;
  onTimePct?: number;
  rebookPct?: number;
  startingPrice: number;
  availabilityLabel: string;
  services?: string[];
  portfolio?: PortfolioItem[];
  packages?: Package[];
  reviews?: Review[];
}

export interface Business {
  id: string;
  name: string;
  avatar: string;
  category: string;
  location: Location;
  contactName: string;
  memberSince: number;
  address: string;
}

export interface Deliverable {
  id: string;
  type: "photo" | "video";
  image: string;
  alt: string;
  duration?: string;
}

export type StepState = "done" | "current" | "upcoming";

export interface TimelineStep {
  key: string;
  label: string;
  date?: string;
  state: StepState;
  description: string;
}

export interface PriceLineItem {
  label: string;
  amountUSD: number;
}

export interface PriceBreakdown {
  lineItems: PriceLineItem[];
  subtotalUSD: number;
  totalUSD: number;
  platformFeePct: number;
  platformFeeUSD: number;
  creatorPayoutUSD: number;
}

export interface Project {
  slug: string;
  title: string;
  businessId: string;
  creatorSlug: string;
  packageId: string;
  addOnIds: string[];
  shootDate: string;
  shootTimeLabel: string;
  address: string;
  brief: { need: string; mood: string; usage: string };
  mustHaveShots: string[];
  deliverablesExpected: { photos: number; clips: number };
  deliverables: Deliverable[];
  deliveryNote: string;
  deliveredDate: string;
  editingRange: { from: string; to: string };
  requestedDate: string;
  acceptedDate: string;
}
