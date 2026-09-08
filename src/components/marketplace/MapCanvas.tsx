import { cn } from "@/lib/cn";

/**
 * Shared stylised map surface — a warm panel with a faint street grid.
 * No map API: this is a representation, not a live map. Location data
 * is always available as text alongside it.
 */
export function MapCanvas({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 bg-[#EFEAE0]", className)}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="mc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#mc-grid)" />
        <path d="M -10 90 L 410 60" stroke="#E0D6C6" strokeWidth="6" fill="none" />
        <path d="M 120 -10 L 150 310" stroke="#E0D6C6" strokeWidth="6" fill="none" />
        <path d="M -10 210 L 410 235" stroke="#E0D6C6" strokeWidth="5" fill="none" />
        <rect x="250" y="150" width="70" height="55" rx="6" fill="#DCE7DA" />
        <path
          d="M 20 300 C 60 220 40 180 90 120 C 130 70 110 30 160 -10"
          stroke="#CBDDF2"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** The teardrop glyph on its own (no positioning). */
export function MapPinGlyph({
  tone = "brand",
  className,
}: {
  tone?: "brand" | "info";
  className?: string;
}) {
  const color = tone === "brand" ? "var(--brand-600)" : "var(--info)";
  return (
    <svg
      width="26"
      height="34"
      viewBox="0 0 26 34"
      aria-hidden="true"
      className={cn("drop-shadow-[0_2px_3px_rgba(28,25,23,0.28)]", className)}
    >
      <path
        d="M13 0C5.82 0 0 5.82 0 13c0 9.25 13 21 13 21s13-11.75 13-21C26 5.82 20.18 0 13 0z"
        fill={color}
      />
      <circle cx="13" cy="13" r="5" fill="#fff" />
    </svg>
  );
}

/** Positioned pin for the single-location MapPreview. */
export function MapPin({
  x,
  y,
  label,
  tone = "brand",
  pulse = false,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "brand" | "info";
  pulse?: boolean;
}) {
  const color = tone === "brand" ? "var(--brand-600)" : "var(--info)";
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
    >
      <span className="relative flex flex-col items-center">
        {pulse && (
          <span
            className="absolute bottom-0 h-3 w-3 animate-pin-pulse rounded-full motion-reduce:hidden"
            style={{ backgroundColor: color }}
          />
        )}
        <MapPinGlyph tone={tone} />
        <span className="sr-only">{label}</span>
      </span>
    </span>
  );
}
