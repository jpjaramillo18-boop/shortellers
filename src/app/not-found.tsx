import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="container-editorial flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-eyebrow">404</p>
      <h1 className="text-h1 text-ink">We couldn&rsquo;t find that page</h1>
      <p className="max-w-prose text-ink-muted">
        The link may be broken, or the page may have moved. Try starting from
        discovery.
      </p>
      <Button asChild className="mt-2">
        <Link href="/discover">Browse creators</Link>
      </Button>
    </main>
  );
}
