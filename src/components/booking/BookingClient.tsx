"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { creatorBySlug, packageById } from "@/data/creators";
import { computePricing, resolveAddOns } from "@/lib/pricing";
import { addDays, dateLong, usd } from "@/lib/format";
import { useDemo } from "@/lib/demo-store";
import { useToast } from "@/components/ui/Toast";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CreatorMiniCard } from "@/components/marketplace/CreatorMiniCard";
import { PackageCard } from "@/components/marketplace/PackageCard";
import { TrustBand } from "@/components/marketplace/TrustBand";
import { CrossfadeValue } from "@/components/marketplace/CrossfadeValue";
import { AddOnCheckbox } from "./AddOnCheckbox";
import { DatePicker } from "./DatePicker";
import { LocationField } from "./LocationField";
import { FormField } from "./FormField";
import { MustHaveShots } from "./MustHaveShots";
import { DeliverablesList } from "./DeliverablesList";
import { BookingSummary } from "./BookingSummary";

const creator = creatorBySlug("lena-ortiz")!;

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-6 first:pt-0">
      <h2 className="flex items-center gap-2 text-h3 text-ink">
        <span className="text-num text-sm text-ink-muted">{n}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function BookingClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const {
    booking,
    setPackage,
    toggleAddOn,
    setDate,
    setLocationMode,
    setBriefField,
    setMustHaveShots,
    confirmBooking,
    studioAddress,
  } = useDemo();

  // Preselect package from ?package= (coming from a specific package card).
  const wantedPkg = params.get("package");
  useEffect(() => {
    if (wantedPkg && wantedPkg !== booking.packageId && packageById(creator, wantedPkg)) {
      setPackage(wantedPkg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantedPkg]);

  const pkg = packageById(creator, booking.packageId) ?? creator.packages![1];
  const pricing = useMemo(
    () => computePricing(pkg, booking.addOnIds),
    [pkg, booking.addOnIds],
  );
  const selectedAddOns = resolveAddOns(pkg, booking.addOnIds);
  const deliveryDate = addDays(booking.date, pkg.deliveryDays);

  const onConfirm = () => {
    confirmBooking();
    toast("Booking confirmed. Lena will accept within ~2h.");
    router.push("/projects/rosewood-bakehouse");
  };

  return (
    <PageShell>
      <div className="container-editorial">
        <Breadcrumbs
          items={[
            { label: "Discover", href: "/discover" },
            { label: creator.name, href: `/creators/${creator.slug}` },
            { label: "Book" },
          ]}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <h1 className="text-h1 text-ink">Book {creator.name}</h1>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href={`/creators/${creator.slug}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to profile
            </Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* ---- Form column ---- */}
          <div className="min-w-0">
            <Section n={1} title="Creator & package">
              <div className="rounded-lg border border-border bg-surface p-4">
                <CreatorMiniCard creator={creator} href={`/creators/${creator.slug}`} />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {creator.packages!.map((p) => (
                  <PackageCard
                    key={p.id}
                    pkg={p}
                    mode="select"
                    selected={p.id === booking.packageId}
                    onSelect={() => setPackage(p.id)}
                  />
                ))}
              </div>
            </Section>

            {pkg.addOns.length > 0 && (
              <Section n={2} title="Add-ons">
                <div className="flex flex-col gap-2">
                  {pkg.addOns.map((a) => (
                    <AddOnCheckbox
                      key={a.id}
                      addOn={a}
                      checked={booking.addOnIds.includes(a.id)}
                      onToggle={() => toggleAddOn(a.id)}
                    />
                  ))}
                </div>
              </Section>
            )}

            <Section n={3} title="Date">
              <DatePicker value={booking.date} onChange={setDate} />
              <p className="mt-3 rounded-md bg-surface-sunken px-3 py-2 text-sm text-ink-muted">
                <span className="font-medium text-ink">{dateLong(booking.date)}</span>,{" "}
                {booking.timeLabel}. Lena is available.{" "}
                <span className="whitespace-nowrap">
                  Delivered by{" "}
                  <span className="font-medium text-ink">
                    <CrossfadeValue value={dateLong(deliveryDate)} />
                  </span>
                  .
                </span>
              </p>
            </Section>

            <Section n={4} title="Location">
              <LocationField
                mode={booking.locationMode}
                address={booking.address}
                onModeChange={setLocationMode}
                studioAddress={studioAddress}
              />
            </Section>

            <Section n={5} title="Brief">
              <div className="flex flex-col gap-5">
                <FormField
                  as="textarea"
                  label="What do you need?"
                  required
                  helper="A sentence or two on the shoot — what, how many, and the vibe."
                  value={booking.brief.need}
                  onChange={(v) => setBriefField("need", v)}
                  validate={(v) =>
                    v.trim().length < 12 ? "Add a little more detail so Lena can prep." : null
                  }
                />
                <FormField
                  label="Style / mood"
                  helper="e.g. warm morning light, lots of negative space."
                  value={booking.brief.mood}
                  onChange={(v) => setBriefField("mood", v)}
                />
                <MustHaveShots
                  shots={booking.mustHaveShots}
                  onChange={setMustHaveShots}
                />
                <FormField
                  label="Where will you use the content?"
                  helper="Helps Lena pick the right crops and licensing."
                  value={booking.brief.usage}
                  onChange={(v) => setBriefField("usage", v)}
                />
              </div>
            </Section>

            <Section n={6} title="Deliverables">
              <DeliverablesList
                includes={pkg.includes}
                addOns={selectedAddOns}
                deliveryDate={deliveryDate}
              />
            </Section>

            <Section n={7} title="Payment">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-verified" aria-hidden="true" />
                <p>
                  Payment method on file ending{" "}
                  <span className="text-num text-ink">4242</span>. You&rsquo;ll be
                  charged <span className="text-num text-ink">{usd(pricing.totalUSD)}</span>{" "}
                  now and it&rsquo;s held securely — released to Lena only after you
                  approve the delivery.
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button size="lg" onClick={onConfirm} className="sm:flex-1">
                  Confirm &amp; book · <CrossfadeValue value={usd(pricing.totalUSD)} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => toast("Draft saved (demo).")}
                >
                  Save as draft
                </Button>
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                Free to cancel up to 48 hours before the shoot.
              </p>
              <TrustBand className="mt-6" />
            </Section>
          </div>

          {/* ---- Sticky summary (desktop) ---- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingSummary
                creator={creator}
                pkg={pkg}
                selectedAddOnLabels={selectedAddOns.map((a) => a.label)}
                date={booking.date}
                timeLabel={booking.timeLabel}
                address={booking.address}
                pricing={pricing}
              />
            </div>
          </aside>
        </div>
      </div>

      <div className="h-24 lg:hidden" aria-hidden="true" />

      {/* ---- Sticky total + CTA (mobile) ---- */}
      <div className="fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-border bg-surface px-4 py-3 shadow-[0_-4px_16px_rgba(28,25,23,0.06)] lg:hidden">
        <div>
          <p className="text-xs text-ink-muted">Total</p>
          <p className="text-num text-lg font-semibold text-ink">
            <CrossfadeValue value={usd(pricing.totalUSD)} />
          </p>
        </div>
        <Button onClick={onConfirm} className="ml-auto shrink-0">
          Confirm &amp; book
        </Button>
      </div>
    </PageShell>
  );
}
