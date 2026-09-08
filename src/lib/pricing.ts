import type { AddOn, Package, PriceBreakdown } from "@/data/types";

/** Platform commission. Transparent in payment/payout, never a headline figure. */
export const PLATFORM_FEE_PCT = 0.3;

export function resolveAddOns(pkg: Package, addOnIds: string[]): AddOn[] {
  return pkg.addOns.filter((a) => addOnIds.includes(a.id));
}

/**
 * Compute the full price breakdown for a package + selected add-ons.
 * Business total is the dominant figure; fee/payout are disclosure-only.
 */
export function computePricing(pkg: Package, addOnIds: string[]): PriceBreakdown {
  const addOns = resolveAddOns(pkg, addOnIds);

  const lineItems = [
    { label: `${pkg.name} (${pkg.duration.toLowerCase()})`, amountUSD: pkg.priceUSD },
    ...addOns.map((a) => ({ label: `Add-on: ${a.label}`, amountUSD: a.priceUSD })),
  ];

  const subtotalUSD = lineItems.reduce((sum, li) => sum + li.amountUSD, 0);
  const totalUSD = subtotalUSD;
  const platformFeeUSD = Math.round(totalUSD * PLATFORM_FEE_PCT * 100) / 100;
  const creatorPayoutUSD = Math.round((totalUSD - platformFeeUSD) * 100) / 100;

  return {
    lineItems,
    subtotalUSD,
    totalUSD,
    platformFeePct: PLATFORM_FEE_PCT,
    platformFeeUSD,
    creatorPayoutUSD,
  };
}
