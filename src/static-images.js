import ROUTE_IMG_B64 from "./data/route.js";
import LAST_YEAR_1_B64 from "./data/last-year-1.js";
import LAST_YEAR_2_B64 from "./data/last-year-2.js";
import LAST_YEAR_3_B64 from "./data/last-year-3.js";

const STATIC_IMAGES = {
  "route.jpg": ROUTE_IMG_B64,
  "last-year-1.jpg": LAST_YEAR_1_B64,
  "last-year-2.jpg": LAST_YEAR_2_B64,
  "last-year-3.jpg": LAST_YEAR_3_B64,
};

export function serveStaticImage(name) {
  const b64 = STATIC_IMAGES[name];
  if (!b64) return null;
  const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new Response(binary, {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=604800",
    },
  });
}
