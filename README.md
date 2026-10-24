# SHIFRA WORLD — homepage demo

Single-page luxury storefront demo for SHIFRA WORLD (sarees, imitation jewellery, Korean hair accessories).
React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm test         # catalogue/data integrity checks
```

## Editing content

| What | Where |
|---|---|
| Products (name, price, images, type, description, material, variants, `new`/`featured` tags) | `src/data/catalog.ts` → `PRODUCTS` |
| Filter tabs per category | `src/data/catalog.ts` → `FILTERS` (a product's `type` must match a tab) |
| Mega menus, nav, announcement bar, hero slides, "Complete the Look" hotspots, testimonials, Instagram tiles, phone / Instagram / WhatsApp | `src/data/content.ts` |

Image refs are a local path (`/images/x.jpg` in `public/`) or an Unsplash photo id; `id|x,y,zoom` gives a focal-point detail crop (used as the hover image).
Run `npm test` after editing — it catches unknown product ids, empty filter tabs and bad menu filters.

## Demo content — replace before launch

- All products, prices, descriptions and the testimonials are **sample content**. Testimonials are labelled as samples on the page.
- Photography: the two client saree photos in `public/images/` plus free Unsplash photos (Unsplash License) served from Unsplash's CDN. Swap in SHIFRA WORLD's own product photography when available.
- The logo (`public/logo-gold.webp`) is the supplied logo with its black background made transparent — artwork and colours unchanged.
- Wishlist and bag are in-memory only; there is no checkout, payment, account or newsletter backend.
