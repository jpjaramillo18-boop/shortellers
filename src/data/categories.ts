import type { Category } from "./types";
import { CATEGORY_COVERS } from "./images";

export const categories: Category[] = [
  {
    slug: "food-menu",
    label: "Food & Menu",
    iconName: "Croissant",
    cover: CATEGORY_COVERS["food-menu"],
    blurb: "Dishes, drinks and menu photography.",
  },
  {
    slug: "interiors",
    label: "Interiors & Space",
    iconName: "Armchair",
    cover: CATEGORY_COVERS["interiors"],
    blurb: "Show the room, the light, the feel.",
  },
  {
    slug: "products",
    label: "Products & Packaging",
    iconName: "Package",
    cover: CATEGORY_COVERS["products"],
    blurb: "Retail shots, packaging, still life.",
  },
  {
    slug: "events",
    label: "Events & Openings",
    iconName: "Sparkles",
    cover: CATEGORY_COVERS["events"],
    blurb: "Launches, tastings, pop-ups.",
  },
  {
    slug: "social",
    label: "Social Content",
    iconName: "Clapperboard",
    cover: CATEGORY_COVERS["social"],
    blurb: "Short vertical clips and photo bundles.",
  },
  {
    slug: "brand-story",
    label: "Brand Story",
    iconName: "BookOpen",
    cover: CATEGORY_COVERS["brand-story"],
    blurb: "The people and story behind the shop.",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
