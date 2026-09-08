import type { Deliverable, Project, TimelineStep } from "./types";
import { DELIVERABLE_IMAGES } from "./images";
import type { DemoProjectStatus } from "@/lib/demo-store";
import { dateRangeShort, dateShort } from "@/lib/format";

const deliverables: Deliverable[] = [
  ...DELIVERABLE_IMAGES.photos.map((image, i) => ({
    id: `d-photo-${i + 1}`,
    type: "photo" as const,
    image,
    alt: `Delivered photo ${i + 1} from the autumn menu shoot`,
  })),
  ...DELIVERABLE_IMAGES.videoPosters.map((image, i) => ({
    id: `d-clip-${i + 1}`,
    type: "video" as const,
    image,
    alt: `Vertical clip ${i + 1} from the autumn menu shoot`,
    duration: ["0:12", "0:15", "0:11"][i],
  })),
];

/** The single project that drives Screen 5. */
export const project: Project = {
  slug: "rosewood-bakehouse",
  title: "Autumn Menu Shoot",
  businessId: "rosewood-bakehouse",
  creatorSlug: "lena-ortiz",
  packageId: "signature-menu-shoot",
  addOnIds: ["extra-15-images"],
  shootDate: "2025-10-16",
  shootTimeLabel: "8:00–12:00",
  address: "1420 NE Alberta St, Portland, OR 97211",
  brief: {
    need: "Autumn menu refresh — 6 pastries + 2 seasonal drinks. A few shots of the counter and window seating. Vertical clips for Instagram.",
    mood: "Warm morning light, lots of negative space for menu layout. Brand feel: cozy, unfussy, local.",
    usage: "Website, print menu, Instagram",
  },
  mustHaveShots: [
    "Laminated croissant cross-section",
    "Pumpkin cardamom latte, overhead",
    "Counter at opening",
  ],
  deliverablesExpected: { photos: 55, clips: 3 },
  deliverables,
  deliveryNote:
    "All done! 55 edited photos and 3 vertical clips in the gallery. I leaned into the warm morning light like we discussed — the croissant cross-section came out great. Shout if you want any adjustments.",
  deliveredDate: "2025-10-22",
  editingRange: { from: "2025-10-17", to: "2025-10-22" },
  requestedDate: "2025-09-29",
  acceptedDate: "2025-09-30",
};

/**
 * Build the progress stepper from the fixed project + the live demo status.
 * "changes-requested" moves the current marker back to Editing so the flow
 * is never a dead end.
 */
export function buildTimeline(status: DemoProjectStatus): TimelineStep[] {
  const base: Omit<TimelineStep, "state">[] = [
    {
      key: "requested",
      label: "Requested",
      date: dateShort(project.requestedDate),
      description: "You sent the brief and package request.",
    },
    {
      key: "accepted",
      label: "Accepted",
      date: dateShort(project.acceptedDate),
      description: "Lena accepted and the date was locked in.",
    },
    {
      key: "shoot",
      label: "Shoot day",
      date: dateShort(project.shootDate),
      description: `On-site at ${project.address}.`,
    },
    {
      key: "editing",
      label: "Editing",
      date: `${dateRangeShort(project.editingRange.from)}–${dateRangeShort(
        project.editingRange.to,
      )}`,
      description: "Culling, colour and export.",
    },
    {
      key: "delivered",
      label: "Delivered",
      date: dateShort(project.deliveredDate),
      description: "Full gallery delivered for your review.",
    },
    {
      key: "approved",
      label: "Approved",
      date: undefined,
      description: "You approve the delivery and payment is released.",
    },
  ];

  return base.map((step) => {
    let state: TimelineStep["state"] = "upcoming";

    if (status === "approved") {
      state = step.key === "approved" ? "current" : "done";
      if (step.key === "approved") state = "done";
    } else if (status === "changes-requested") {
      const doneKeys = ["requested", "accepted", "shoot"];
      if (doneKeys.includes(step.key)) state = "done";
      else if (step.key === "editing") state = "current";
      else state = "upcoming";
    } else {
      // delivered
      const doneKeys = ["requested", "accepted", "shoot", "editing"];
      if (doneKeys.includes(step.key)) state = "done";
      else if (step.key === "delivered") state = "current";
      else state = "upcoming";
    }

    return { ...step, state };
  });
}
