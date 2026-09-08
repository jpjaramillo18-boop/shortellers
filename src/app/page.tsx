import Link from "next/link";
import { ArrowRight, Compass, PackageCheck, Star } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSearch } from "@/components/home/HeroSearch";
import { SmartImage } from "@/components/media/SmartImage";
import { CreatorCard } from "@/components/marketplace/CreatorCard";
import { TrustBand } from "@/components/marketplace/TrustBand";
import { Reveal } from "@/components/marketplace/Reveal";
import { Button } from "@/components/ui/Button";
import { StubButton } from "@/components/ui/StubButton";
import { categories } from "@/data/categories";
import { featuredCreators } from "@/data/creators";
import { HERO_COLLAGE } from "@/data/images";

const HOW_IT_WORKS = [
  {
    icon: Compass,
    title: "Discover",
    body: "Search your area and compare real portfolios, packages and prices.",
  },
  {
    icon: Star,
    title: "Book",
    body: "Pick a package, choose a date, and share a short brief.",
  },
  {
    icon: PackageCheck,
    title: "Get your content",
    body: "Review the delivery and approve. Payment releases when you're happy.",
  },
];

export default function HomePage() {
  return (
    <PageShell padded={false}>
      {/* ---- Hero ---- */}
      <section className="container-editorial pt-8 md:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="text-eyebrow">A marketplace for local content</p>
            <h1 className="text-display mt-3 max-w-[18ch] text-ink">
              Find a local creator who gets your business.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-ink-muted">
              Photographers and videographers in your neighborhood. See their
              work, compare packages, book in minutes.
            </p>
            <div className="mt-6 max-w-xl">
              <HeroSearch />
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Popular near you:{" "}
              <Link href="/discover?cat=food-menu" className="text-brand-700 hover:underline">
                Food &amp; menu
              </Link>
              ,{" "}
              <Link href="/discover?cat=interiors" className="text-brand-700 hover:underline">
                interiors
              </Link>
              ,{" "}
              <Link href="/discover?cat=social" className="text-brand-700 hover:underline">
                social clips
              </Link>
            </p>
          </div>

          {/* Editorial collage — decorative; photography carries the colour */}
          <div className="grid grid-cols-3 gap-3" aria-hidden="true">
            <div className="col-span-2 overflow-hidden rounded-lg border border-border">
              <div className="aspect-[4/3]">
                <SmartImage src={HERO_COLLAGE[0]} alt="" decorative seed="hero-0" priority />
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="aspect-[3/4]">
                <SmartImage src={HERO_COLLAGE[2]} alt="" decorative seed="hero-2" />
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="aspect-square">
                <SmartImage src={HERO_COLLAGE[3]} alt="" decorative seed="hero-3" />
              </div>
            </div>
            <div className="col-span-2 overflow-hidden rounded-lg border border-border">
              <div className="aspect-[16/9]">
                <SmartImage src={HERO_COLLAGE[5]} alt="" decorative seed="hero-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Categories ---- */}
      <section className="container-editorial mt-16 md:mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-h2 text-ink">Browse by what you need</h2>
          <Link
            href="/discover"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-700 hover:underline sm:inline-flex"
          >
            All creators <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/discover?cat=${cat.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
              >
                <div className="aspect-[3/2] overflow-hidden bg-surface-sunken">
                  <SmartImage
                    src={cat.cover}
                    alt=""
                    decorative
                    seed={`cat-${cat.slug}`}
                    className="transition-transform duration-[var(--dur-hover)] ease-editorial group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <span className="text-sm font-semibold text-ink">{cat.label}</span>
                  <span className="text-xs text-ink-muted">{cat.blurb}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Featured creators ---- */}
      <section className="container-editorial mt-16 md:mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-h2 text-ink">Verified creators near Portland</h2>
            <p className="mt-1 text-sm text-ink-muted">
              A few local photographers and videographers taking bookings now.
            </p>
          </div>
          <Button asChild variant="secondary" className="hidden shrink-0 sm:inline-flex">
            <Link href="/discover">See all</Link>
          </Button>
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCreators.map((creator, i) => (
            <li key={creator.slug}>
              <Reveal delay={i * 40} className="h-full">
                <CreatorCard creator={creator} className="h-full" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- How it works ---- */}
      <section id="how-it-works" className="container-editorial mt-16 scroll-mt-24 md:mt-24">
        <h2 className="text-h2 text-ink">How it works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-num text-sm font-semibold text-brand-700">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-h3 text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Trust ---- */}
      <section className="container-editorial mt-12">
        <TrustBand />
      </section>

      {/* ---- Become a creator ---- */}
      <section className="container-editorial mt-16 md:mt-20">
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-paper-warm p-6 sm:flex-row sm:items-center md:p-8">
          <div>
            <h2 className="text-h2 text-ink">Are you a creator?</h2>
            <p className="mt-1 max-w-prose text-sm text-ink-muted">
              Show your portfolio, set your packages and prices, and get booked by
              local businesses that need your work.
            </p>
          </div>
          <StubButton
            variant="secondary"
            className="shrink-0"
            message="Creator onboarding is outside this demo's scope."
          >
            Become a creator
          </StubButton>
        </div>
      </section>
    </PageShell>
  );
}
