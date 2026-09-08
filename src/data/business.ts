import type { Business } from "./types";
import { AVATARS } from "./images";

/** The demo user — a small bakery in Alberta Arts, Portland. */
export const business: Business = {
  id: "rosewood-bakehouse",
  name: "Rosewood Bakehouse",
  avatar: AVATARS.rosewood,
  category: "Bakery",
  contactName: "Marisol",
  memberSince: 2024,
  address: "1420 NE Alberta St, Portland, OR 97211",
  location: {
    neighborhood: "Alberta Arts",
    city: "Portland",
    state: "OR",
    pin: { x: 0.46, y: 0.31 },
  },
};
