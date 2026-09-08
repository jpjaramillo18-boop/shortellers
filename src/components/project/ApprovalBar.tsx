"use client";

import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { useDemo, type DemoProjectStatus } from "@/lib/demo-store";
import { usd } from "@/lib/format";

export function ApprovalBar({
  status,
  payoutUSD,
  creatorName,
  sticky = false,
}: {
  status: DemoProjectStatus;
  payoutUSD: number;
  creatorName: string;
  sticky?: boolean;
}) {
  const { approveProject, requestChanges, markRedelivered } = useDemo();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [changesOpen, setChangesOpen] = useState(false);
  const [note, setNote] = useState("");

  const wrap = cn(
    sticky &&
      "fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] z-30 border-t border-border bg-surface px-4 py-3 shadow-[0_-4px_16px_rgba(28,25,23,0.06)] lg:hidden",
  );

  return (
    <div className={wrap}>
      <div className={cn(sticky && "container-editorial px-0")}>
        {status === "delivered" && (
          <div className="flex flex-col gap-2">
            <Button block onClick={() => setConfirmOpen(true)}>
              Approve &amp; release payment
            </Button>
            <Button variant="secondary" block onClick={() => setChangesOpen(true)}>
              Request changes
            </Button>
          </div>
        )}

        {status === "changes-requested" && (
          <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-[#FBEFD9]/60 p-4">
            <p className="text-sm text-ink">
              Changes requested — {creatorName} is on it. She&rsquo;ll re-deliver
              the updated gallery.
            </p>
            <Button
              variant="secondary"
              className="shrink-0"
              onClick={() => {
                markRedelivered();
                toast("Updated gallery re-delivered for your review.");
              }}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Mark re-delivered
            </Button>
          </div>
        )}

        {status === "approved" && (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-medium text-verified">
              Approved · {usd(payoutUSD)} released to {creatorName}
            </p>
            <Button
              variant="secondary"
              className="shrink-0"
              onClick={() => toast("Download started (demo).")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download all
            </Button>
          </div>
        )}
      </div>

      {/* Confirm approval */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve this delivery?</DialogTitle>
            <DialogDescription>
              This releases {usd(payoutUSD)} to {creatorName} and closes the
              project. You can still download everything and leave a review.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Not yet</Button>
            </DialogClose>
            <Button
              onClick={() => {
                approveProject();
                setConfirmOpen(false);
                toast("Payment released. Files unlocked.");
              }}
            >
              Approve &amp; release payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request changes */}
      <Dialog open={changesOpen} onOpenChange={setChangesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What would you like adjusted?</DialogTitle>
            <DialogDescription>
              Be specific — {creatorName} will re-edit and re-deliver.
            </DialogDescription>
          </DialogHeader>
          <label htmlFor="change-note" className="sr-only">
            Requested changes
          </label>
          <textarea
            id="change-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="e.g. The latte shots feel a little cool — could they be warmer? And one more wide shot of the counter."
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              disabled={note.trim().length === 0}
              onClick={() => {
                requestChanges(note);
                setChangesOpen(false);
                setNote("");
                toast("Change request sent to " + creatorName + ".");
              }}
            >
              Send request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
