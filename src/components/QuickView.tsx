import { Heart, Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { CATEGORY_LABEL, formatINR, getProduct, variantsOf, type Product } from '../data/catalog'
import { useStore } from '../store'
import { Dialog, Img, Ornament } from './ui'

export function ProductQuickView() {
  const { quickView, setQuickView } = useStore()
  const p = quickView ? getProduct(quickView) : null
  return (
    <Dialog
      open={!!p}
      onClose={() => setQuickView(null)}
      label={p ? `Quick view: ${p.name}` : 'Quick view'}
      className="modal w-[min(1060px,calc(100vw-20px))]"
    >
      {p && <Body key={p.id} p={p} />}
    </Dialog>
  )
}

function Body({ p }: { p: Product }) {
  const { setQuickView, addToBag, setPanel, wishlist, toggleWish } = useStore()
  const v = variantsOf(p)
  const [img, setImg] = useState(0)
  const [variant, setVariant] = useState(v.options[0])
  const [qty, setQty] = useState(1)
  const wished = wishlist.includes(p.id)

  return (
    <div className="relative grid max-h-[94dvh] overflow-y-auto bg-ivory text-plum md:grid-cols-[1.05fr_1fr] md:overflow-hidden">
      <button
        type="button"
        onClick={() => setQuickView(null)}
        aria-label="Close quick view"
        className="icon-btn absolute top-3 right-3 z-10 bg-white/90 text-plum shadow hover:bg-plum hover:text-champagne"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      <div className="relative aspect-[4/5] bg-[#efe8dd] md:aspect-auto md:h-[min(700px,94dvh)]">
        <Img key={img} src={p.images[img]} w={900} hw={1.25} sizes="(min-width: 768px) 540px, 100vw" alt={p.name} loading="eager" className="fade-in absolute inset-0 h-full w-full object-cover" />
        {p.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {p.images.map((src, n) => (
              <button
                key={src}
                type="button"
                onClick={() => setImg(n)}
                aria-label={`Show image ${n + 1}`}
                aria-current={img === n}
                className={`h-[76px] w-[60px] overflow-hidden border-2 transition ${img === n ? 'border-gold' : 'border-white/70 opacity-80 hover:opacity-100'}`}
              >
                <Img src={src} w={140} hw={1.25} sizes="60px" alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 pb-8 md:overflow-y-auto md:p-10">
        <p className="eyebrow text-[10px] text-gold-deep">
          {CATEGORY_LABEL[p.category]} · {p.type}
        </p>
        <h2 className="display mt-3 pr-10 text-[2.1rem] md:text-[2.6rem]">{p.name}</h2>
        <p className="mt-3 flex items-baseline gap-3 text-xl font-semibold tabular-nums">
          {formatINR(p.price)}
          {p.mrp && <s className="text-base font-normal text-mist">{formatINR(p.mrp)}</s>}
        </p>
        <Ornament className="mt-5 text-gold" />
        <p className="mt-5 text-[15px] leading-relaxed text-mist">{p.description}</p>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-plum/10 py-4 text-sm">
          <dt className="eyebrow text-[10px] text-plum/60">Material</dt>
          <dd>{p.material}</dd>
          <dt className="eyebrow text-[10px] text-plum/60">Collection</dt>
          <dd>{CATEGORY_LABEL[p.category]}</dd>
        </dl>

        <fieldset className="mt-6">
          <legend className="eyebrow text-[10px] text-plum/60">
            {v.label}: <span className="text-plum normal-case tracking-normal">{variant}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {v.options.map((o) => (
              <button key={o} type="button" className="pill" aria-pressed={variant === o} onClick={() => setVariant(o)}>
                {o}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 flex gap-3">
          <div className="flex h-[50px] items-center border border-plum/20" role="group" aria-label="Quantity">
            <button type="button" className="grid h-full w-11 place-items-center hover:text-royal disabled:opacity-30" onClick={() => setQty((q) => q - 1)} disabled={qty <= 1} aria-label="Decrease quantity">
              <Minus size={15} />
            </button>
            <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
            <button type="button" className="grid h-full w-11 place-items-center hover:text-royal" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              <Plus size={15} />
            </button>
          </div>
          <button
            type="button"
            className="btn btn-gold flex-1 px-4"
            onClick={() => {
              addToBag(p.id, variant, qty)
              setQuickView(null)
              setPanel('bag')
            }}
          >
            Add to Bag
          </button>
        </div>
        <button
          type="button"
          onClick={() => toggleWish(p.id)}
          aria-pressed={wished}
          className="mt-3 flex h-[50px] items-center justify-center gap-2 border border-plum/15 text-[11px] font-bold tracking-[0.2em] uppercase transition hover:border-gold"
        >
          <Heart key={String(wished)} size={16} strokeWidth={1.6} className={wished ? 'heart-pop fill-royal text-royal' : ''} />
          {wished ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
        <p className="mt-6 text-xs leading-relaxed text-mist">Demo listing — images, price and details are sample content for this preview.</p>
      </div>
    </div>
  )
}
