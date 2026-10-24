import { Eye, Heart, ShoppingBag } from 'lucide-react'
import type { CSSProperties } from 'react'
import { CATEGORY_LABEL, formatINR, type Product } from '../data/catalog'
import { useStore } from '../store'
import { Img } from './ui'

export function WishButton({ id, name, className = '' }: { id: string; name: string; className?: string }) {
  const { wishlist, toggleWish } = useStore()
  const on = wishlist.includes(id)
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={() => toggleWish(id)}
      className={`icon-btn bg-white/85 text-plum shadow-sm backdrop-blur hover:bg-white ${className}`}
    >
      <Heart key={String(on)} size={18} strokeWidth={1.6} className={on ? 'heart-pop fill-royal text-royal' : ''} />
    </button>
  )
}

export function ProductCard({
  product: p,
  hw = 4 / 3,
  sizes = '(min-width: 1024px) 25vw, 50vw',
  showCategory = false,
  className = '',
  style,
}: {
  product: Product
  hw?: number
  sizes?: string
  showCategory?: boolean
  className?: string
  style?: CSSProperties
}) {
  const { addToBag, setQuickView } = useStore()
  const [main, alt] = p.images
  const isNew = p.tags?.includes('new')
  return (
    <article className={`product-card group relative flex flex-col ${className}`} style={style}>
      <div className="card-media relative overflow-hidden bg-[#efe8dd]" style={{ aspectRatio: `1 / ${hw}` }}>
        <button
          type="button"
          onClick={() => setQuickView(p.id)}
          className="absolute inset-0 block h-full w-full"
          aria-label={`Quick view: ${p.name}`}
        >
          <Img src={main} w={700} hw={hw} sizes={sizes} alt={p.name} className="card-main absolute inset-0 h-full w-full object-cover" />
          {alt && <Img src={alt} w={700} hw={hw} sizes={sizes} alt="" className="card-alt absolute inset-0 h-full w-full object-cover" />}
        </button>

        {isNew && (
          <span className="eyebrow pointer-events-none absolute top-3 left-3 bg-plum/90 px-2.5 py-1.5 text-[9.5px] tracking-[0.28em] text-champagne">
            New
          </span>
        )}
        <WishButton id={p.id} name={p.name} className="absolute top-2.5 right-2.5" />

        {/* Desktop: reveal on hover. Touch: compact bag button. */}
        <div className="card-actions hover-only absolute inset-x-3 bottom-3 flex gap-2">
          <button
            type="button"
            onClick={() => setQuickView(p.id)}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-white/90 text-[10.5px] font-bold tracking-[0.18em] text-plum uppercase backdrop-blur transition hover:bg-white"
          >
            <Eye size={15} strokeWidth={1.6} /> Quick View
          </button>
          <button
            type="button"
            onClick={() => addToBag(p.id)}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-plum text-[10.5px] font-bold tracking-[0.18em] text-champagne uppercase transition hover:bg-royal"
          >
            <ShoppingBag size={15} strokeWidth={1.6} /> Add to Bag
          </button>
        </div>
        <button
          type="button"
          onClick={() => addToBag(p.id)}
          aria-label={`Add ${p.name} to bag`}
          className="touch-only icon-btn absolute right-2.5 bottom-2.5 bg-plum text-champagne shadow-lg"
        >
          <ShoppingBag size={17} strokeWidth={1.6} />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow text-[10px] tracking-[0.24em] text-gold-deep">
          {showCategory ? `${CATEGORY_LABEL[p.category]} · ${p.type}` : p.type}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.2rem] leading-snug font-medium text-plum md:text-[1.35rem]">
          <button type="button" onClick={() => setQuickView(p.id)} className="text-left hover:text-royal">
            {p.name}
          </button>
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2 text-[15px] font-semibold text-plum tabular-nums">
          {formatINR(p.price)}
          {p.mrp && <s className="text-[13px] font-normal text-mist">{formatINR(p.mrp)}</s>}
        </p>
      </div>
    </article>
  )
}
