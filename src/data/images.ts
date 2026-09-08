/**
 * Centralised image references. Every external URL in the demo lives here.
 *
 * Loading strategy (see components/media/SmartImage):
 *   1. Unsplash CDN URL below (best fidelity)
 *   2. on error -> deterministic Lorem Picsum photo at the right size
 *   3. on error -> on-brand warm placeholder block (never a broken image)
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

function u(id: string, w = 1200): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=70`;
}

/* ---- Category tile covers ---------------------------------------------- */
export const CATEGORY_COVERS: Record<string, string> = {
  "food-menu": u("1509440159596-0249088772ff", 900),
  interiors: u("1521017432531-fbd92d768814", 900),
  products: u("1514362545857-3bc16c4c7d1b", 900),
  events: u("1476224203421-9ac39bcb3327", 900),
  social: u("1486427944299-d1955d23e34d", 900),
  "brand-story": u("1452587925148-ce544e77e70d", 900),
};

/* ---- Avatars --------------------------------------------------------------- */
export const AVATARS = {
  lena: u("1544005313-94ddf0286df2", 256),
  marcus: u("1502685104226-ee32379fefbe", 256),
  priya: u("1534528741775-53994a69daeb", 256),
  toby: u("1500648767791-00dcc994a43e", 256),
  sofia: u("1438761681033-6461ffad8d80", 256),
  devon: u("1507003211169-0a1dd7228f2d", 256),
  hana: u("1573496359142-b8d87734a5a2", 256),
  ray: u("1519085360753-af0119f7cbe7", 256),
  nora: u("1544005313-94ddf0286df2", 256),
  iggy: u("1502920917128-1aa500764cbd", 256),
  rosewood: u("1517433670267-08bbd4be890f", 256),
  amara: u("1438761681033-6461ffad8d80", 128),
  ben: u("1500648767791-00dcc994a43e", 128),
  steph: u("1534528741775-53994a69daeb", 128),
  marisol: u("1573496359142-b8d87734a5a2", 128),
};

/* ---- Creator card covers ------------------------------------------------- */
export const CREATOR_COVERS = {
  lena: u("1517433670267-08bbd4be890f", 1200),
  marcus: u("1414235077428-338989a2e8c0", 1200),
  priya: u("1509042239860-f550ce710b93", 1200),
  toby: u("1476224203421-9ac39bcb3327", 1200),
  sofia: u("1517248135467-4c7edcad34c4", 1200),
  devon: u("1442512595331-e89e73853f31", 1200),
  hana: u("1452587925148-ce544e77e70d", 1200),
  ray: u("1445116572660-236099ec97a0", 1200),
  nora: u("1514362545857-3bc16c4c7d1b", 1200),
  iggy: u("1541167760496-1628856ab772", 1200),
};

/* ---- Lena Ortiz portfolio (18 items) ----------------------------------- */
export const LENA_PORTFOLIO_IMAGES = [
  u("1509440159596-0249088772ff", 1200), // croissants
  u("1517433670267-08bbd4be890f", 1200), // pastry case
  u("1549931319-a545dcf3bc73", 1000), // croissant closeup
  u("1495474472287-4d71bcdd2085", 1000), // latte art
  u("1461023058943-07fcbe16d735", 1200), // coffee cups overhead
  u("1521017432531-fbd92d768814", 1200), // cozy cafe with plants
  u("1554118811-1e0d58224f24", 1200), // cafe seating
  u("1464349095431-e9a21285b5f3", 1000), // cake slice
  u("1488477181946-6428a0291777", 1000), // donuts overhead
  u("1447933601403-0c6688de566e", 1000), // coffee flatlay on wood
  u("1504754524776-8f4f37790ca0", 1200), // brunch flatlay
  u("1481391319762-47dff72954d9", 1200), // bread loaves
  u("1514362545857-3bc16c4c7d1b", 1000), // latte closeup
  u("1517248135467-4c7edcad34c4", 1200), // restaurant interior
  u("1470337458703-46ad1756a187", 1000), // coffee cup on saucer
  u("1556742049-0cfed4f6a45d", 1000), // owner portrait
  u("1541167760496-1628856ab772", 1200), // coffee shop interior
  u("1476224203421-9ac39bcb3327", 1200), // seasonal drinks
];

/* ---- Project deliverables (reuse the portfolio grade) ----------------- */
export const DELIVERABLE_IMAGES = {
  photos: [
    u("1509440159596-0249088772ff", 1000),
    u("1549931319-a545dcf3bc73", 1000),
    u("1495474472287-4d71bcdd2085", 1000),
    u("1461023058943-07fcbe16d735", 1000),
    u("1517433670267-08bbd4be890f", 1000),
    u("1464349095431-e9a21285b5f3", 1000),
    u("1447933601403-0c6688de566e", 1000),
    u("1504754524776-8f4f37790ca0", 1000),
    u("1521017432531-fbd92d768814", 1000),
    u("1470337458703-46ad1756a187", 1000),
    u("1554118811-1e0d58224f24", 1000),
    u("1481391319762-47dff72954d9", 1000),
  ],
  videoPosters: [
    u("1486427944299-d1955d23e34d", 1000),
    u("1514362545857-3bc16c4c7d1b", 1000),
    u("1476224203421-9ac39bcb3327", 1000),
  ],
};

/* ---- Review photos ---------------------------------------------------- */
export const REVIEW_PHOTOS = {
  amara: u("1504754524776-8f4f37790ca0", 800),
};

/* ---- Home hero collage ---------------------------------------------------- */
export const HERO_COLLAGE = [
  u("1509440159596-0249088772ff", 900),
  u("1521017432531-fbd92d768814", 900),
  u("1495474472287-4d71bcdd2085", 700),
  u("1517433670267-08bbd4be890f", 700),
  u("1464349095431-e9a21285b5f3", 700),
  u("1554118811-1e0d58224f24", 900),
];
