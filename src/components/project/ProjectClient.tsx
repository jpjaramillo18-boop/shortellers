"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { creatorBySlug, packageById } from "@/data/creators";
import { project, buildTimeline } from "@/data/projects";
import { business } from "@/data/business";
import { computePricing, resolveAddOns } from "@/lib/pricing";
import { dateLong } from "@/lib/format";
import { useDemo } from "@/lib/demo-store";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CreatorMiniCard } from "@/components/marketplace/CreatorMiniCard";
import { MapPreview } from "@/components/marketplace/MapPreview";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { StatusPill, type ProjectStatusKey } from "./StatusPill";
import { ProgressStepper } from "./ProgressStepper";
import { DeliveryNote } from "./DeliveryNote";
import { DeliverablesBento } from "./DeliverablesBento";
import { ApprovalBar } from "./ApprovalBar";
import { MessageThread } from "./MessageThread";
import { ReviewPrompt } from "./ReviewPrompt";

const creator = creatorBySlug("lena-ortiz")!;

const STATUS_TO_PILL: Record<string, ProjectStatusKey> = {
  delivered: "delivered",
  "changes-requested": "changes-requested",
  approved: "approved",
};

export function ProjectClient() {
  const { projectStatus, paymentReleased, changeNote, booking, hydrated } = useDemo();

  const pkg = packageById(creator, booking.packageId) ?? creator.packages![1];
  const addOns = resolveAddOns(pkg, booking.addOnIds);
  const pricing = useMemo(
    () => computePricing(pkg, booking.addOnIds),
    [pkg, booking.addOnIds],
  );
  const timeline = useMemo(() => buildTimeline(projectStatus), [projectStatus]);
  const locked = projectStatus !== "approved";

  return (
    <PageShell>
      <div className="container-editorial">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects/rosewood-bakehouse" },
            { label: project.title },
          ]}
        />

        {/* Header */}
        <header className="mt-4 flex flex-col gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-h1 text-ink">{project.title}</h1>
            <StatusPill status={STATUS_TO_PILL[projectStatus]} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <CreatorMiniCard creator={creator} href={`/creators/${creator.slug}`} showLocation={false} />
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {dateLong(project.shootDate)} · {project.shootTimeLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <MapPin className="h-4 w-4 text-info" aria-hidden="true" />
              {project.address}
            </span>
          </div>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <div className="min-w-0">
            {/* Timeline */}
            <section aria-labelledby="timeline-h">
              <h2 id="timeline-h" className="text-eyebrow">
                Progress
              </h2>
              <div className="mt-4">
                <ProgressStepper steps={timeline} />
              </div>
            </section>

            {/* Delivery */}
            <section className="mt-10" aria-labelledby="delivery-h">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 id="delivery-h" className="text-h2 text-ink">
                  Delivered content
                </h2>
                <p className="text-sm text-ink-muted">
                  <span className="text-num">{project.deliverablesExpected.photos}</span>{" "}
                  photos ·{" "}
                  <span className="text-num">{project.deliverablesExpected.clips}</span>{" "}
                  clips
                  {locked && " · preview until you approve"}
                </p>
              </div>
              <div className="mt-4">
                <DeliveryNote creator={creator} note={project.deliveryNote} />
              </div>
              <div className="mt-4">
                <DeliverablesBento deliverables={project.deliverables} locked={locked} />
              </div>
            </section>

            {changeNote && projectStatus === "changes-requested" && (
              <div className="mt-4 rounded-lg border border-border bg-surface p-4">
                <p className="text-eyebrow">Your change request</p>
                <p className="mt-1 text-sm text-ink">{changeNote}</p>
              </div>
            )}

            {/* Review prompt (post approval) */}
            {projectStatus === "approved" && (
              <section className="mt-10">
                <ReviewPrompt creatorName={creator.name.split(" ")[0]} />
              </section>
            )}

            {/* Details */}
            <section className="mt-10" aria-labelledby="details-h">
              <h2 id="details-h" className="text-h2 text-ink">
                Project details
              </h2>
              <div className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
                <DetailRow label="Package">{pkg.name}</DetailRow>
                {addOns.length > 0 && (
                  <DetailRow label="Add-ons">
                    {addOns.map((a) => a.label).join(", ")}
                  </DetailRow>
                )}
                <DetailRow label="Brief">
                  <span className="block">{project.brief.need}</span>
                  <span className="mt-1 block text-ink-muted">{project.brief.mood}</span>
                </DetailRow>
                <DetailRow label="Must-have shots">
                  <ul className="list-disc space-y-0.5 pl-4">
                    {project.mustHaveShots.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </DetailRow>
                <DetailRow label="Usage">{project.brief.usage}</DetailRow>
              </div>

              <div className="mt-4 rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">Payment</p>
                  <span
                    className={
                      paymentReleased
                        ? "inline-flex items-center gap-1 rounded-full bg-verified-100 px-2 py-0.5 text-xs font-medium text-verified"
                        : "inline-flex items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-medium text-ink"
                    }
                  >
                    {paymentReleased
                      ? `Released to ${creator.name.split(" ")[0]}`
                      : "Held securely"}
                  </span>
                </div>
                <div className="mt-3">
                  <PriceBreakdown
                    data={pricing}
                    creatorName={creator.name.split(" ")[0]}
                    chargeNote={
                      paymentReleased ? "Charged and released" : "Charged now, held securely"
                    }
                  />
                </div>
              </div>
            </section>

            {/* Messages */}
            <section className="mt-10">
              <MessageThread creator={creator} />
            </section>
          </div>

          {/* Right rail (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="card-editorial p-5">
                <p className="text-eyebrow">Your move</p>
                <p className="mt-2 text-sm text-ink-muted">
                  {projectStatus === "delivered" &&
                    "Review the gallery, then approve to release payment — or ask for changes."}
                  {projectStatus === "changes-requested" &&
                    "Lena is working on your requested changes."}
                  {projectStatus === "approved" &&
                    "Project complete. Downloads are unlocked."}
                </p>
                <div className="mt-4">
                  <ApprovalBar
                    status={projectStatus}
                    payoutUSD={pricing.creatorPayoutUSD}
                    creatorName={creator.name.split(" ")[0]}
                  />
                </div>
              </div>

              <MapPreview
                pin={business.location.pin}
                label={business.name}
                address={project.address}
                aspect="aspect-[4/3]"
              />

              <Link
                href="/discover"
                className="text-center text-sm font-medium text-brand-700 hover:underline"
              >
                Book another shoot
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <div className="h-28 lg:hidden" aria-hidden="true" />

      {/* Sticky approval bar (mobile) */}
      {hydrated && (
        <ApprovalBar
          status={projectStatus}
          payoutUSD={pricing.creatorPayoutUSD}
          creatorName={creator.name.split(" ")[0]}
          sticky
        />
      )}
    </PageShell>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-4">
      <dt className="text-eyebrow">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}
