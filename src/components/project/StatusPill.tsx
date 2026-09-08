import {
  CheckCircle2,
  CircleDashed,
  CircleDot,
  Clock3,
  PackageCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type ProjectStatusKey =
  | "requested"
  | "accepted"
  | "in-progress"
  | "delivered"
  | "changes-requested"
  | "approved"
  | "completed";

const MAP: Record<
  ProjectStatusKey,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  requested: { label: "Requested", icon: CircleDashed, className: "bg-surface-sunken text-ink" },
  accepted: { label: "Accepted", icon: CircleDot, className: "bg-info-100 text-info" },
  "in-progress": { label: "In progress", icon: Clock3, className: "bg-[#FBEFD9] text-warning" },
  delivered: { label: "Delivered — awaiting your approval", icon: PackageCheck, className: "bg-brand-100 text-brand-700" },
  "changes-requested": { label: "Changes requested", icon: Clock3, className: "bg-[#FBEFD9] text-warning" },
  approved: { label: "Approved", icon: CheckCircle2, className: "bg-verified-100 text-verified" },
  completed: { label: "Completed", icon: CheckCircle2, className: "bg-verified-100 text-verified" },
};

/** Colour + icon + text. Never colour alone. */
export function StatusPill({
  status,
  className,
}: {
  status: ProjectStatusKey;
  className?: string;
}) {
  const { label, icon: Icon, className: tone } = MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
        tone,
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </span>
  );
}
