// Editable homepage content: navigation, mega menus, hero slides, looks, testimonials and gallery.
// Category names beyond SHIFRA WORLD's confirmed ranges are illustrative demo categories.
import type { CategoryKey } from './catalog'

export interface MenuLink {
  label: string
  /** Preview image shown in the mega menu while this link is hovered */
  image?: string
  /** Filter tab to select when the link is chosen (defaults to "All") */
  filter?: string
}

export interface MegaMenu {
  key: CategoryKey
  label: string
  columns: { title: string; links: MenuLink[] }[]
  showcase: {
    image: string
    eyebrow: string
    title: string
    cta: string
    /** Two product ids shown as clickable thumbnails */
    products: [string, string]
    sparkle?: boolean
  }
}

export const MEGA_MENUS: MegaMenu[] = [
  {
    key: 'sarees',
    label: 'Sarees',
    columns: [
      {
        title: 'Shop by Fabric',
        links: [
          { label: 'Cotton Sarees', image: '1609748341932-f0206c09412b', filter: 'Cotton' },
          { label: 'Silk Sarees', image: '1610030469983-98e550d6193c', filter: 'Silk' },
          { label: 'Chiffon Sarees', image: '1609748340041-f5d61e061ebc', filter: 'Chiffon' },
          { label: 'Georgette Sarees', image: '1610189026297-df356264479c', filter: 'Georgette' },
          { label: 'Organza Sarees', image: '1739429945610-95901c2baf18' },
          { label: 'Linen Sarees', image: '1610276580899-53d1af1a1359' },
          { label: 'Soft Silk Sarees', image: '1610030469245-ab65c4583802', filter: 'Silk' },
          { label: 'Art Silk Sarees', image: '1610189013429-a703f4b245cf', filter: 'Silk' },
        ],
      },
      {
        title: 'Shop by Style',
        links: [
          { label: 'Kanjivaram Sarees', image: '/images/client-purple-kanjivaram.jpg', filter: 'Silk' },
          { label: 'Banarasi Sarees', image: '1727430228383-aa1fb59db8bf', filter: 'Silk' },
          { label: 'Designer Sarees', image: '1742287724816-4a8a1cc7ad5c', filter: 'Designer' },
          { label: 'Printed Sarees', image: '1769275061202-cf3ef67d7279' },
          { label: 'Embroidered Sarees', image: '1787220272461-2c53528c9349' },
          { label: 'Traditional Sarees', image: '1617627143750-d86bc21e42bb' },
          { label: 'Contemporary Sarees', image: '1610030469668-8e9f641aaf27', filter: 'Designer' },
        ],
      },
      {
        title: 'Shop by Occasion',
        links: [
          { label: 'Wedding Collection', image: '/images/client-ivory-silk.jpg' },
          { label: 'Festive Collection', image: '1692992193981-d3d92fabd9cb' },
          { label: 'Party Wear', image: '1742287724816-4a8a1cc7ad5c' },
          { label: 'Daily Wear', image: '1610030469069-cb6620bea733', filter: 'Cotton' },
          { label: 'Office Wear', image: '1609748340041-f5d61e061ebc' },
          { label: 'Casual Elegance', image: '1778148046667-ec1b619d5064' },
          { label: 'Special Occasions', image: '1641699862936-be9f49b1c38d' },
        ],
      },
    ],
    showcase: {
      image: '1727430228383-aa1fb59db8bf',
      eyebrow: 'Featured Collection',
      title: 'The Silk Story',
      cta: 'Explore Sarees',
      products: ['sa-royal-blue', 'sa-emerald'],
    },
  },
  {
    key: 'jewellery',
    label: 'Jewellery',
    columns: [
      {
        title: 'Shop by Type',
        links: [
          { label: 'Imitation Jewellery', image: '1601121141461-9d6647bca1ed' },
          { label: 'Necklace Sets', image: '1738754719555-05aca36707b1', filter: 'Necklace Sets' },
          { label: 'Earrings', image: '1671642883395-0ab89c3ac890', filter: 'Earrings' },
          { label: 'Jhumkas', image: '1714733831162-0a6e849141be', filter: 'Jhumkas' },
          { label: 'Bangles', image: '1690175867343-2af70ea57537', filter: 'Bangles' },
          { label: 'Bracelets', image: '1611591437281-460bfbe1220a', filter: 'Bangles' },
          { label: 'Rings', image: '1679156271376-3a69ba96a2dc', filter: 'Rings' },
          { label: 'Pendants', image: '1705326452390-3ecf6070595f' },
          { label: 'Chains', image: '1771734065116-61e16b353ded' },
        ],
      },
      {
        title: 'Shop by Style',
        links: [
          { label: 'Traditional Jewellery', image: '1601121141418-c1caa10a2a0b' },
          { label: 'Temple Jewellery', image: '/images/client-ivory-silk.jpg' },
          { label: 'Oxidised Jewellery', image: '1762686130435-897de4b26aac', filter: 'Jhumkas' },
          { label: 'Pearl Jewellery', image: '1682822749969-61a63203c501', filter: 'Earrings' },
          { label: 'Kundan Style', image: '1787831398033-d70495c1e8a4', filter: 'Bridal' },
          { label: 'American Diamond Style', image: '1679156271376-3a69ba96a2dc', filter: 'Rings' },
          { label: 'Contemporary Jewellery', image: '1707149974686-0c198fdebd51' },
        ],
      },
      {
        title: 'Shop by Occasion',
        links: [
          { label: 'Bridal Jewellery', image: '1600685890506-593fdf55949b', filter: 'Bridal' },
          { label: 'Wedding Guest Jewellery', image: '1756483560049-e7b2208f99a0' },
          { label: 'Festive Jewellery', image: '1751606615009-30f61ff1a510' },
          { label: 'Party Wear Jewellery', image: '1671642883395-0ab89c3ac890', filter: 'Earrings' },
          { label: 'Everyday Jewellery', image: '1763628212781-7d52844cf358' },
          { label: 'Statement Accessories', image: '1738754712726-d126c15e206b', filter: 'Necklace Sets' },
        ],
      },
    ],
    showcase: {
      image: '1601121141461-9d6647bca1ed',
      eyebrow: 'Elegance in Every Detail',
      title: 'Gold-Tone Heirlooms',
      cta: 'Explore Jewellery',
      products: ['je-oxidised-jhumkas', 'je-statement-set'],
      sparkle: true,
    },
  },
  {
    key: 'accessories',
    label: 'Hair Accessories',
    columns: [
      {
        title: 'Shop by Category',
        links: [
          { label: 'Korean Hair Clips', image: '1578220154766-1c39bcecc1dc', filter: 'Hair Clips' },
          { label: 'Claw Clips', image: '1744177762258-c98418b7a4eb', filter: 'Claw Clips' },
          { label: 'Hair Bows', image: '1776267033953-25f51bc59120', filter: 'Hair Bows' },
          { label: 'Hair Bands', image: '1779405949253-7019e6c88249', filter: 'Hair Bands' },
          { label: 'Scrunchies', image: '1788079961873-e1663ddf5ec0', filter: 'Scrunchies' },
          { label: 'Hair Pins', image: '1758723208958-c18fa48aaff3', filter: 'Hair Pins' },
          { label: 'Decorative Hair Accessories', image: '1782776852521-77b0aed8831d', filter: 'Decorative' },
          { label: 'Statement Hair Accessories', image: '1759756655330-5c4f7567dc13', filter: 'Hair Bows' },
        ],
      },
      {
        title: 'Shop by Style',
        links: [
          { label: 'Minimalist', image: '1744177762256-e2594b4894b6', filter: 'Claw Clips' },
          { label: 'Elegant', image: '1776267034399-cda082a04350', filter: 'Hair Bows' },
          { label: 'Everyday', image: '1630081757773-a87bffbdea5e', filter: 'Scrunchies' },
          { label: 'Party Styling', image: '1788079962246-69f95a30e3d5' },
          { label: 'Trend-Inspired', image: '1791002598975-890efc064b27', filter: 'Hair Bows' },
        ],
      },
    ],
    showcase: {
      image: '1788079962935-56e2bbebaabb',
      eyebrow: 'The Finishing Touch',
      title: 'Seoul-Inspired Details',
      cta: 'Explore Accessories',
      products: ['ac-pearl-clips', 'ac-gold-claw'],
    },
  },
]

export type NavItem = { label: string; href: string; menu?: undefined } | { label: string; menu: CategoryKey; href?: undefined }

export const NAV: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Sarees', menu: 'sarees' },
  { label: 'Jewellery', menu: 'jewellery' },
  { label: 'Hair Accessories', menu: 'accessories' },
  { label: 'New Arrivals', href: '#new-arrivals' },
  { label: 'Best Sellers', href: '#best-sellers' },
  { label: 'Collections', href: '#collections' },
  { label: 'Contact', href: '#contact' },
]

export const ANNOUNCEMENTS = [
  'Welcome to SHIFRA WORLD',
  'Timeless Sarees • Elegant Jewellery • Beautiful Accessories',
  'Explore Our Latest Collection',
]

export interface HeroSlide {
  eyebrow: string
  /** Short label on the glass caption beside the image */
  caption: string
  title: [string, string]
  text: string
  image: string
  /** Where the subject sits in the frame (CSS object-position) */
  focus: string
  primary: { label: string; to: CategoryKey }
  secondary: { label: string; to: CategoryKey }
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: 'Draped in Elegance',
    caption: 'Silk & Cotton Sarees',
    title: ['Elegance That', 'Defines You.'],
    text: 'Discover timeless sarees, statement jewellery, and beautiful accessories, curated for your every occasion.',
    image: '/images/client-purple-kanjivaram.jpg',
    focus: '50% 30%',
    primary: { label: 'Explore Sarees', to: 'sarees' },
    secondary: { label: 'Discover Jewellery', to: 'jewellery' },
  },
  {
    eyebrow: 'The Art of Adornment',
    caption: 'Gold-Tone Jewellery',
    title: ['The Art of', 'Adornment.'],
    text: 'Gold-tone imitation jewellery — necklace sets, jhumkas and bangles made to complete every drape.',
    image: '/images/client-ivory-silk.jpg',
    focus: '45% 25%',
    primary: { label: 'Discover Jewellery', to: 'jewellery' },
    secondary: { label: 'Explore Sarees', to: 'sarees' },
  },
  {
    eyebrow: 'Small Details. Beautiful Style.',
    caption: 'Korean Hair Accessories',
    title: ['Small Details.', 'Beautiful Style.'],
    text: 'Korean-inspired claw clips, satin bows and pearl pins — the finishing touch for every day.',
    image: '1776267034399-cda082a04350',
    focus: '50% 40%',
    primary: { label: 'Explore Accessories', to: 'accessories' },
    secondary: { label: 'Discover Jewellery', to: 'jewellery' },
  },
]

/** "Complete the Look" — hotspot positions are % of the photo's width/height */
export const LOOK = {
  image: '1641699862936-be9f49b1c38d',
  alt: 'Model in an amethyst silk saree with layered necklace, jhumkas and a floral bun accessory',
  hotspots: [
    { productId: 'ac-floral-bun', x: 34, y: 15.5, label: 'Hair accessory' },
    { productId: 'je-ad-jhumkas', x: 40, y: 26, label: 'Earrings' },
    { productId: 'je-ruby-ring', x: 64.5, y: 24.8, label: 'Ring' },
    { productId: 'je-ad-layered', x: 48, y: 44, label: 'Necklace' },
    { productId: 'sa-amethyst', x: 42, y: 74, label: 'Saree' },
  ],
}

// SAMPLE PLACEHOLDERS — replace with verified customer reviews before going live.
export const TESTIMONIALS = [
  { name: 'Ananya R.', city: 'Chennai', text: 'The silk had such a beautiful sheen and the colour was exactly what I hoped for. I felt special all evening.' },
  { name: 'Meera K.', city: 'Coimbatore', text: 'The jhumkas are light enough to wear for hours and look stunning with both sarees and kurtas.' },
  { name: 'Divya S.', city: 'Bengaluru', text: 'I ordered claw clips and a satin bow — such pretty details, and they hold my hair perfectly.' },
  { name: 'Kavya N.', city: 'Madurai', text: 'Helpful on WhatsApp, quick to answer my questions about draping and matching jewellery.' },
  { name: 'Shreya P.', city: 'Hyderabad', text: 'My festive look was complete with one saree and a necklace set. Everyone asked where it was from!' },
]

export const INSTAGRAM_URL = 'https://www.instagram.com/shifraworld/'
export const PHONE_DISPLAY = '+91 73974 34472'
export const PHONE_TEL = '+917397434472'
export const WHATSAPP_URL = `https://wa.me/917397434472?text=${encodeURIComponent('Hello SHIFRA WORLD! I would like to know more about your collection.')}`

// Curated preview images — not a live Instagram feed.
export const GALLERY = [
  { image: '1778148046680-cd802a2199ea', alt: 'Saree in golden-hour light' },
  { image: '1648291531524-97afa1c2ac30', alt: 'Pearl chandbali earring close-up' },
  { image: '1788079962935-56e2bbebaabb', alt: 'Satin scrunchie flat-lay with gold accents' },
  { image: '1738754719555-05aca36707b1', alt: 'Statement necklace set flat-lay' },
  { image: '1776267034399-cda082a04350', alt: 'Ivory satin hair bow styling' },
  { image: '1688382654723-a7366006519b', alt: 'Green silk saree styled with jewellery' },
]
