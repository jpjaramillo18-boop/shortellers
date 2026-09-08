/** Formatting helpers. Locale-aware, tabular-safe. */

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const USD_WHOLE = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** "$860.00" */
export function usd(amount: number): string {
  return USD.format(amount);
}

/** "$680" — for compact contexts like card "from" prices and package headers. */
export function usdWhole(amount: number): string {
  return USD_WHOLE.format(amount);
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const RANGE_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

/** Parse an ISO date (YYYY-MM-DD) as a local calendar date, avoiding TZ drift. */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "Thursday, October 16, 2025" */
export function dateLong(iso: string): string {
  return LONG_DATE.format(parseISODate(iso));
}

/** "Oct 16, 2025" */
export function dateShort(iso: string): string {
  return SHORT_DATE.format(parseISODate(iso));
}

/** "Oct 16" */
export function dateRangeShort(iso: string): string {
  return RANGE_DATE.format(parseISODate(iso));
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

/** "~2h", "~1 day" */
export function responseTime(hours: number): string {
  if (hours < 24) return `~${hours}h`;
  const days = Math.round(hours / 24);
  return `~${days} day${days > 1 ? "s" : ""}`;
}
