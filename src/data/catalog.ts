// DEMO CATALOGUE — every product, price and description below is sample content.
// Replace with SHIFRA WORLD's real inventory: edit the PRODUCTS array; nothing else needs to change.
//
// Image refs are either:
//   • a local file in /public, e.g. '/images/client-purple-kanjivaram.jpg'
//   • an Unsplash photo id, e.g. '1610030469983-98e550d6193c'
//   • an Unsplash id plus a focal-point detail crop: 'id|x,y,zoom' (x/y are 0–1, zoom ≥ 1)

export type CategoryKey = 'sarees' | 'jewellery' | 'accessories'

export interface Product {
  id: string
  name: string
  category: CategoryKey
  /** Drives the filter tabs, e.g. "Silk", "Jhumkas", "Claw Clips" */
  type: string
  /** Demo price in ₹ */
  price: number
  /** Optional original price — only set this when a real offer exists */
  mrp?: number
  images: string[]
  description: string
  material: string
  variants?: { label: string; options: string[] }
  tags?: Array<'new' | 'featured'>
}

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  sarees: 'Sarees',
  jewellery: 'Jewellery',
  accessories: 'Hair Accessories',
}

/** Section element id for each category */
export const CATEGORY_SECTION: Record<CategoryKey, string> = {
  sarees: 'sarees',
  jewellery: 'jewellery',
  accessories: 'accessories',
}

export const FILTERS: Record<CategoryKey, string[]> = {
  sarees: ['All', 'Cotton', 'Silk', 'Chiffon', 'Georgette', 'Designer'],
  jewellery: ['All', 'Necklace Sets', 'Earrings', 'Jhumkas', 'Bangles', 'Rings', 'Bridal'],
  accessories: ['All', 'Hair Clips', 'Claw Clips', 'Hair Bows', 'Scrunchies', 'Hair Pins', 'Hair Bands', 'Decorative'],
}

const DEFAULT_VARIANTS: Record<CategoryKey, { label: string; options: string[] }> = {
  sarees: { label: 'Blouse', options: ['With blouse piece', 'Without blouse piece'] },
  jewellery: { label: 'Finish', options: ['Antique gold', 'Matte gold'] },
  accessories: { label: 'Pack', options: ['Single', 'Pair'] },
}

export const PRODUCTS: Product[] = [
  // ───────── Sarees ─────────
  {
    id: 'sa-cotton-printed', name: 'Elegant Cotton Printed Saree', category: 'sarees', type: 'Cotton', price: 1490,
    images: ['1609748341932-f0206c09412b', '1609748341932-f0206c09412b|0.5,0.74,2.2'],
    description: 'A breezy mint-and-ivory cotton drape finished with a sunshine-yellow border — light enough for all-day wear.',
    material: 'Cotton blend',
  },
  {
    id: 'sa-soft-silk', name: 'Classic Soft Silk Saree', category: 'sarees', type: 'Silk', price: 3290,
    images: ['1610030469983-98e550d6193c', '1610030469983-98e550d6193c|0.5,0.7,2.4'],
    description: 'Deep aubergine soft silk with a woven gold border that catches the light with every pleat.',
    material: 'Soft silk blend',
  },
  {
    id: 'sa-pastel-chiffon', name: 'Pastel Chiffon Saree', category: 'sarees', type: 'Chiffon', price: 1890,
    images: ['1609748340041-f5d61e061ebc', '1609748340041-f5d61e061ebc|0.5,0.72,2.2'],
    description: 'Feather-light pastel chiffon with a soft sheen and a fluid fall — effortless from brunch to evening.',
    material: 'Chiffon',
  },
  {
    id: 'sa-traditional-silk', name: 'Traditional Silk Saree', category: 'sarees', type: 'Silk', price: 4650,
    images: ['1619516388835-2b60acc4049e', '1619516388835-2b60acc4049e|0.5,0.7,2.4'],
    description: 'Rani-pink silk with a rich zari border, woven in the spirit of South Indian temple traditions.',
    material: 'Art silk with zari',
    tags: ['featured'],
  },
  {
    id: 'sa-floral-georgette', name: 'Floral Georgette Saree', category: 'sarees', type: 'Georgette', price: 2190,
    images: ['1610189026297-df356264479c', '1610189026297-df356264479c|0.5,0.66,2.2'],
    description: 'A violet georgette canvas scattered with ivory florals, paired with a contrast border.',
    material: 'Georgette',
  },
  {
    id: 'sa-festive-designer', name: 'Festive Designer Saree', category: 'sarees', type: 'Designer', price: 3890,
    images: ['1742287724816-4a8a1cc7ad5c', '1742287724816-4a8a1cc7ad5c|0.55,0.66,2.2'],
    description: 'Fuchsia and jet-black colour-block silk with a striking gold stripe — made for celebrations.',
    material: 'Silk blend',
    tags: ['featured'],
  },
  {
    id: 'sa-royal-blue', name: 'Royal Blue Art Silk Saree', category: 'sarees', type: 'Silk', price: 2750,
    images: ['1610189013429-a703f4b245cf', '1610189013429-a703f4b245cf|0.5,0.72,2.2'],
    description: 'Royal blue art silk with gold motifs and a vivid tri-colour border.',
    material: 'Art silk',
  },
  {
    id: 'sa-emerald', name: 'Emerald Soft Silk Saree', category: 'sarees', type: 'Silk', price: 3450,
    images: ['1610030469245-ab65c4583802', '1610030469245-ab65c4583802|0.5,0.7,2.2'],
    description: 'Jewel-toned emerald soft silk with tonal buttas and a fine woven border.',
    material: 'Soft silk blend',
  },
  {
    id: 'sa-monochrome', name: 'Monochrome Designer Saree', category: 'sarees', type: 'Designer', price: 3190,
    images: ['1610030469668-8e9f641aaf27', '1610030469668-8e9f641aaf27|0.5,0.7,2.2'],
    description: 'Graphite and black with silver-toned weaving — a modern take on a classic drape.',
    material: 'Silk blend',
  },
  {
    id: 'sa-handloom-cotton', name: 'Handloom-Style Cotton Saree', category: 'sarees', type: 'Cotton', price: 1690,
    images: ['1610276580899-53d1af1a1359', '1610276580899-53d1af1a1359|0.6,0.6,2.2'],
    description: 'Cobalt cotton with a rainbow-striped pallu — playful, breathable and easy to drape.',
    material: 'Cotton',
  },
  {
    id: 'sa-sunset-cotton', name: 'Sunset Cotton Saree', category: 'sarees', type: 'Cotton', price: 1590,
    images: ['1610030469069-cb6620bea733', '1610030469069-cb6620bea733|0.5,0.7,2.2'],
    description: 'Warm tangerine and pink cotton with a contrast green border, made for sunny days.',
    material: 'Cotton',
  },
  {
    id: 'sa-ivory-georgette', name: 'Ivory Garden Georgette Saree', category: 'sarees', type: 'Georgette', price: 2390,
    images: ['1739429945610-95901c2baf18', '1739429945610-95901c2baf18|0.5,0.75,2.4'],
    description: 'Ivory georgette with a botanical border in green and plum, styled with a puff-sleeve blouse.',
    material: 'Georgette',
  },
  {
    id: 'sa-pastel-print', name: 'Pastel Print Chiffon Saree', category: 'sarees', type: 'Chiffon', price: 1990,
    images: ['1769275061202-cf3ef67d7279', '1769275061202-cf3ef67d7279|0.62,0.62,2.6'],
    description: 'A dreamy ombré of pink, yellow and lilac on flowing chiffon.',
    material: 'Chiffon',
    tags: ['new'],
  },
  {
    id: 'sa-purple-kanjivaram', name: 'Purple Kanjivaram-Style Silk Saree', category: 'sarees', type: 'Silk', price: 5890,
    images: ['/images/client-purple-kanjivaram.jpg'],
    description: 'Regal purple silk woven with copper-gold florals and a broad temple border — a SHIFRA WORLD signature.',
    material: 'Silk blend with zari',
    tags: ['new', 'featured'],
  },
  {
    id: 'sa-ivory-tissue', name: 'Ivory Tissue Silk Saree', category: 'sarees', type: 'Silk', price: 4990,
    images: ['/images/client-ivory-silk.jpg'],
    description: 'Luminous ivory tissue silk with gold florals, beautiful with temple-style jewellery.',
    material: 'Tissue silk blend',
    tags: ['new'],
  },
  {
    id: 'sa-amethyst', name: 'Amethyst Silk Saree', category: 'sarees', type: 'Designer', price: 4290,
    images: ['1641699862936-be9f49b1c38d', '1641699862936-be9f49b1c38d|0.5,0.8,2.2'],
    description: 'Amethyst and gold silk with an all-over floral buta and a contrast violet border.',
    material: 'Silk blend',
  },

  // ───────── Jewellery ─────────
  {
    id: 'je-gold-necklace', name: 'Traditional Gold-Tone Necklace Set', category: 'jewellery', type: 'Necklace Sets', price: 2450,
    images: ['1601121141461-9d6647bca1ed', '1601121141418-c1caa10a2a0b'],
    description: 'A sculpted gold-tone necklace with ruby-tone accents and matching studs.',
    material: 'Gold-tone alloy, faux stones',
    tags: ['featured'],
  },
  {
    id: 'je-pearl-earrings', name: 'Classic Pearl Earrings', category: 'jewellery', type: 'Earrings', price: 690,
    images: ['1682822749969-61a63203c501', '1623303179820-de8ec58b03dc'],
    description: 'Lustrous faux-pearl drops on gold-tone posts — quietly elegant, every day.',
    material: 'Faux pearl, gold-tone alloy',
    variants: { label: 'Finish', options: ['Gold tone', 'Silver tone'] },
  },
  {
    id: 'je-oxidised-jhumkas', name: 'Elegant Oxidised Jhumkas', category: 'jewellery', type: 'Jhumkas', price: 890,
    images: ['1714733831162-0a6e849141be', '1762686130435-897de4b26aac'],
    description: 'Two-tone oxidised jhumkas with engraved domes and delicate bead fringes.',
    material: 'Oxidised alloy',
    variants: { label: 'Finish', options: ['Two-tone', 'Oxidised silver'] },
    tags: ['featured'],
  },
  {
    id: 'je-statement-set', name: 'Statement Imitation Jewellery Set', category: 'jewellery', type: 'Necklace Sets', price: 2890,
    images: ['1738754719555-05aca36707b1', '1738754712726-d126c15e206b'],
    description: 'A bold pendant necklace with pastel stones and pearl fringe, with matching earrings.',
    material: 'Silver-tone alloy, faux stones, faux pearls',
    tags: ['new'],
  },
  {
    id: 'je-bangle-collection', name: 'Gold-Tone Bangle Collection', category: 'jewellery', type: 'Bangles', price: 1290,
    images: ['1690175867343-2af70ea57537', '1679156271456-d6068c543ee7'],
    description: 'A pair of slim gold-tone bangles with crystal-set bands.',
    material: 'Gold-tone alloy, crystals',
    variants: { label: 'Size', options: ['2.4', '2.6', '2.8'] },
    tags: ['featured'],
  },
  {
    id: 'je-stone-earrings', name: 'Contemporary Stone-Style Earrings', category: 'jewellery', type: 'Earrings', price: 990,
    images: ['1671642883395-0ab89c3ac890', '1671642883395-0ab89c3ac890|0.5,0.5,1.8'],
    description: 'Teardrop earrings with ruby-tone centres framed by sparkling stones.',
    material: 'Alloy, faux stones',
  },
  {
    id: 'je-chandbali-hoops', name: 'Pearl Chandbali Hoops', category: 'jewellery', type: 'Jhumkas', price: 1150,
    images: ['1648291531524-97afa1c2ac30', '1648291531524-97afa1c2ac30|0.5,0.6,1.8'],
    description: 'Gold-tone hoops with a mini jhumka and pearl drops — light on the ear, big on charm.',
    material: 'Gold-tone alloy, faux pearls',
  },
  {
    id: 'je-stone-kada', name: 'Stone-Studded Kada Pair', category: 'jewellery', type: 'Bangles', price: 1650,
    images: ['1611598935678-c88dca238fce', '1611598935678-c88dca238fce|0.5,0.5,1.8'],
    description: 'Openwork gold-tone kadas set with ruby-tone and clear stones.',
    material: 'Gold-tone alloy, faux stones',
    variants: { label: 'Size', options: ['2.4', '2.6', '2.8'] },
  },
  {
    id: 'je-sparkle-band', name: 'American Diamond-Style Band', category: 'jewellery', type: 'Rings', price: 590,
    images: ['1679156271376-3a69ba96a2dc', '1679156271376-3a69ba96a2dc|0.5,0.5,2'],
    description: 'A full-eternity band of brilliant-cut CZ stones.',
    material: 'Rhodium-tone alloy, CZ stones',
    variants: { label: 'Size', options: ['6', '7', '8'] },
  },
  {
    id: 'je-ring-stack', name: 'Delicate Ring Stack', category: 'jewellery', type: 'Rings', price: 490,
    images: ['1770721478216-3e5dbbe8dcc2', '1770721478216-3e5dbbe8dcc2|0.42,0.72,2.2'],
    description: 'Fine gold-tone rings and a tiny bow charm — wear together or apart.',
    material: 'Gold-tone alloy',
    variants: { label: 'Size', options: ['Adjustable'] },
  },
  {
    id: 'je-bridal-kundan', name: 'Bridal Kundan-Style Set', category: 'jewellery', type: 'Bridal', price: 4990,
    images: ['1787831398033-d70495c1e8a4', '1756483560049-e7b2208f99a0'],
    description: 'A layered kundan-style necklace, chandbalis and maang tikka for the bride.',
    material: 'Gold-tone alloy, faux kundan, faux pearls',
    tags: ['new'],
  },
  {
    id: 'je-choker-set', name: 'Contemporary Choker Set', category: 'jewellery', type: 'Necklace Sets', price: 1890,
    images: ['1707149974686-0c198fdebd51', '1707149974686-0c198fdebd51|0.5,0.72,2'],
    description: 'A jewelled choker with matching drops — a modern statement with festive roots.',
    material: 'Alloy, faux stones',
  },
  {
    id: 'je-glass-bangles', name: 'Colour Pop Glass Bangles', category: 'jewellery', type: 'Bangles', price: 450,
    images: ['1723144290281-de6d80a79028', '1723144290967-b9a692207d04'],
    description: 'A playful stack of turquoise, coral and gold-flecked bangles.',
    material: 'Glass with gold-tone detailing',
    variants: { label: 'Size', options: ['2.4', '2.6', '2.8'] },
    tags: ['new'],
  },
  {
    id: 'je-royal-bridal', name: 'Royal Bridal Choker Set', category: 'jewellery', type: 'Bridal', price: 5490,
    images: ['1600685890506-593fdf55949b', '1600685890506-593fdf55949b|0.5,0.6,2'],
    description: 'Heirloom-inspired choker, rani haar and earrings in rich antique gold tone.',
    material: 'Antique gold-tone alloy, faux stones',
  },
  {
    id: 'je-ad-layered', name: 'Ruby AD-Style Layered Necklace', category: 'jewellery', type: 'Necklace Sets', price: 3290,
    images: ['1641699862936-be9f49b1c38d|0.48,0.45,2.6', '1641699862936-be9f49b1c38d|0.48,0.38,4'],
    description: 'A choker and long haar in American diamond style with ruby-tone stones.',
    material: 'Rhodium-tone alloy, CZ & faux ruby',
  },
  {
    id: 'je-ad-jhumkas', name: 'Ruby AD-Style Jhumkas', category: 'jewellery', type: 'Jhumkas', price: 1190,
    images: ['1641699862936-be9f49b1c38d|0.4,0.255,6'],
    description: 'Sparkling dome jhumkas topped with a ruby-tone stud.',
    material: 'Rhodium-tone alloy, CZ & faux ruby',
  },
  {
    id: 'je-ruby-ring', name: 'Ruby Cocktail Ring', category: 'jewellery', type: 'Rings', price: 690,
    images: ['1641699862936-be9f49b1c38d|0.645,0.25,7'],
    description: 'An emerald-cut ruby-tone stone framed in a halo of CZ.',
    material: 'Rhodium-tone alloy, CZ & faux ruby',
    variants: { label: 'Size', options: ['Adjustable'] },
  },

  // ───────── Korean hair accessories ─────────
  {
    id: 'ac-gold-claw', name: 'Gold Bar Claw Clip', category: 'accessories', type: 'Claw Clips', price: 390,
    images: ['1744177762258-c98418b7a4eb', '1744177762256-e2594b4894b6'],
    description: 'A sleek metal claw clip that holds a twist or half-up style all day.',
    material: 'Gold-tone metal',
    tags: ['featured'],
  },
  {
    id: 'ac-tortoise-claw', name: 'Tortoiseshell Claw Clip', category: 'accessories', type: 'Claw Clips', price: 350,
    images: ['1635423759716-53ccaa71b3fa', '1774301844178-c9ce96b76d92'],
    description: 'Classic tortoiseshell with a strong grip — the everyday essential.',
    material: 'Acetate-style resin',
  },
  {
    id: 'ac-ivory-bow', name: 'Ivory Satin Hair Bow', category: 'accessories', type: 'Hair Bows', price: 420,
    images: ['1776267033953-25f51bc59120', '1776267034399-cda082a04350'],
    description: 'An oversized satin bow on a clip — romantic, soft and very Seoul.',
    material: 'Satin',
    variants: { label: 'Colour', options: ['Ivory', 'Blush', 'Black'] },
    tags: ['new', 'featured'],
  },
  {
    id: 'ac-velvet-bow', name: 'Black Velvet Hair Bow', category: 'accessories', type: 'Hair Bows', price: 450,
    images: ['1791002598975-890efc064b27', '1791002598975-890efc064b27|0.55,0.4,2'],
    description: 'Plush velvet bow on a barrette — polished for office or party.',
    material: 'Velvet',
  },
  {
    id: 'ac-ribbon-bow', name: 'Ribbon Bow Clip', category: 'accessories', type: 'Hair Bows', price: 350,
    images: ['1591067397912-ec7129dcf726', '1591067397912-ec7129dcf726|0.5,0.35,2'],
    description: 'Long satin ribbon tails for a soft, trend-led finish.',
    material: 'Satin',
    variants: { label: 'Colour', options: ['Ivory', 'Black'] },
  },
  {
    id: 'ac-champagne-scrunchie', name: 'Champagne Satin Scrunchie', category: 'accessories', type: 'Scrunchies', price: 290,
    images: ['1788079961873-e1663ddf5ec0', '1788079962935-56e2bbebaabb'],
    description: 'Silky champagne satin with tiny studs — kind to hair, lovely on the wrist.',
    material: 'Satin',
    tags: ['featured'],
  },
  {
    id: 'ac-crystal-scrunchie', name: 'Crystal Ivory Scrunchie', category: 'accessories', type: 'Scrunchies', price: 290,
    images: ['1788079962459-dceba255d033', '1788079962459-dceba255d033|0.5,0.5,1.8'],
    description: 'Ivory satin scattered with crystals for an elevated ponytail.',
    material: 'Satin, crystals',
  },
  {
    id: 'ac-velvet-scrunchie', name: 'Midnight Velvet Scrunchie', category: 'accessories', type: 'Scrunchies', price: 320,
    images: ['1788079962246-69f95a30e3d5', '1788079962246-69f95a30e3d5|0.5,0.5,1.8'],
    description: 'Inky black velvet with a scatter of rhinestones.',
    material: 'Velvet, rhinestones',
  },
  {
    id: 'ac-pastel-set', name: 'Pastel Scrunchie Set of 4', category: 'accessories', type: 'Scrunchies', price: 690,
    images: ['1630081757773-a87bffbdea5e', '1630081757773-a87bffbdea5e|0.3,0.3,2'],
    description: 'Rose, champagne, ivory and sky — a soft satin set for every mood.',
    material: 'Satin',
    variants: { label: 'Pack', options: ['Set of 4'] },
  },
  {
    id: 'ac-pearl-clips', name: 'Pearl Bar Hair Clips', category: 'accessories', type: 'Hair Clips', price: 380,
    images: ['1578220154766-1c39bcecc1dc', '1673710672449-81bef7305ee6'],
    description: 'Korean-style faux-pearl barrettes — clip two for an instant polished look.',
    material: 'Gold-tone metal, faux pearls',
    tags: ['new', 'featured'],
  },
  {
    id: 'ac-blossom-pins', name: 'Golden Blossom Hair Pins', category: 'accessories', type: 'Hair Pins', price: 490,
    images: ['1758723208958-c18fa48aaff3', '1758723209054-2ab996ef1c66'],
    description: 'Sculpted gold-tone flowers, some with a pearl heart — tuck into a bun or braid.',
    material: 'Gold-tone metal, faux pearls',
    variants: { label: 'Pack', options: ['Set of 3', 'Set of 5'] },
  },
  {
    id: 'ac-gold-flower', name: 'Gold Flower Hair Clip', category: 'accessories', type: 'Hair Pins', price: 450,
    images: ['1758723208952-e5b534af5515', '1758723208952-e5b534af5515|0.4,0.4,2'],
    description: 'A single statement bloom in brushed gold tone.',
    material: 'Gold-tone metal',
  },
  {
    id: 'ac-hair-vine', name: 'Pearl Bloom Hair Vine', category: 'accessories', type: 'Decorative', price: 890,
    images: ['1782776852521-77b0aed8831d', '1549236177-77e8271c34b6'],
    description: 'A bendable vine of pearls and crystal leaves for festive and bridal updos.',
    material: 'Wire, faux pearls, crystals',
    tags: ['new'],
  },
  {
    id: 'ac-floral-bun', name: 'Floral Bun Accessory', category: 'accessories', type: 'Decorative', price: 550,
    images: ['1641699862936-be9f49b1c38d|0.34,0.15,4.5'],
    description: 'A cluster of blush blooms and baby’s breath for a traditional bun.',
    material: 'Fabric flowers on comb',
  },
  {
    id: 'ac-jewelled-band', name: 'Jewelled Velvet Hair Band', category: 'accessories', type: 'Hair Bands', price: 590,
    images: ['1779405949253-7019e6c88249', '1779405949253-7019e6c88249|0.5,0.18,2.6'],
    description: 'A padded velvet hair band studded with jewel-tone stones.',
    material: 'Velvet, faux stones',
  },
  {
    id: 'ac-pearl-cuff', name: 'Pearl Ponytail Band', category: 'accessories', type: 'Hair Bands', price: 260,
    images: ['1767442989822-1f8efcfefc15', '1767442989822-1f8efcfefc15|0.5,0.48,2.4'],
    description: 'A stretch band of faux pearls that turns a simple ponytail into a moment.',
    material: 'Faux pearls on elastic',
  },
]

export const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]))

export const getProduct = (id: string) => {
  const p = PRODUCT_BY_ID.get(id)
  if (!p) throw new Error(`Unknown product id: ${id}`)
  return p
}

export const variantsOf = (p: Product) => p.variants ?? DEFAULT_VARIANTS[p.category]

export const byCategory = (category: CategoryKey, type = 'All') =>
  PRODUCTS.filter((p) => p.category === category && (type === 'All' || p.type === type))

export const tagged = (tag: 'new' | 'featured') => PRODUCTS.filter((p) => p.tags?.includes(tag))

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const formatINR = (n: number) => inr.format(n)

// ───────── Images ─────────
const UNSPLASH = 'https://images.unsplash.com/photo-'

/** Resolve a /public path against the deploy base (env is undefined when run under plain Node tests) */
export const publicUrl = (path: string) => (import.meta.env?.BASE_URL ?? '/') + path.slice(1)

/** Build an image URL at width `w`. `hw` = height/width ratio for a hard crop. */
export function imgUrl(ref: string, w: number, hw?: number): string {
  if (ref.startsWith('/')) return publicUrl(ref)
  const [id, fp] = ref.split('|')
  if (fp && !hw) hw = 4 / 3 // focal-point zoom only applies to a hard crop
  let url = `${UNSPLASH}${id}?auto=format&fit=crop&q=72&w=${w}`
  if (hw) url += `&h=${Math.round(w * hw)}`
  if (fp) {
    const [x, y, z] = fp.split(',')
    url += `&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${z}`
  }
  return url
}

export function imgSrcSet(ref: string, widths: number[], hw?: number): string | undefined {
  if (ref.startsWith('/')) return undefined
  return widths.map((w) => `${imgUrl(ref, w, hw)} ${w}w`).join(', ')
}

// ───────── Search ─────────
const norm = (t: string) => (t.length > 3 ? t.replace(/s$/, '') : t)

export function searchProducts(query: string, limit = 8): Product[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean).map(norm)
  if (!tokens.length) return []
  return PRODUCTS.filter((p) => {
    const hay = [p.name, p.type, CATEGORY_LABEL[p.category], p.material, p.category === 'jewellery' ? 'jewelry' : '']
      .join(' ')
      .toLowerCase()
    return tokens.every((t) => hay.includes(t))
  }).slice(0, limit)
}

// ───────── Bag ─────────
export interface BagLine {
  id: string
  variant: string
  qty: number
}

export const bagCount = (lines: BagLine[]) => lines.reduce((n, l) => n + l.qty, 0)
export const bagSubtotal = (lines: BagLine[]) => lines.reduce((sum, l) => sum + getProduct(l.id).price * l.qty, 0)
