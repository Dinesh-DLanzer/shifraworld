import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Img, SectionHeading } from '../components/ui'
import { formatINR, getProduct } from '../data/catalog'
import { LOOK } from '../data/content'
import { useStore } from '../store'

export function CompleteTheLook() {
  const { setQuickView, addToBag, notify } = useStore()
  const items = LOOK.hotspots.map((h) => ({ ...h, p: getProduct(h.productId) }))
  const [active, setActive] = useState(3)
  const cur = items[active]
  const total = items.reduce((s, i) => s + i.p.price, 0)

  return (
    <section aria-labelledby="look-title" className="relative isolate overflow-hidden bg-ink py-20 text-ivory md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_50%,rgba(81,38,116,.75),transparent_60%)]" />
      {/* fine HUD grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#d4af65_1px,transparent_1px),linear-gradient(90deg,#d4af65_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="shell grid items-center gap-12 lg:grid-cols-2 xl:gap-24">
        <div className="reveal relative mx-auto w-full max-w-[540px]">
          <div className="relative aspect-[2/3] overflow-hidden bg-plum">
            <Img src={LOOK.image} w={900} hw={1.5} sizes="(min-width: 1024px) 540px, 100vw" alt={LOOK.alt} className="absolute inset-0 h-full w-full object-cover" />
            {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute h-7 w-7 border-champagne/80 ${c}`} />
            ))}

            {items.map((h, n) => (
              <button
                key={h.productId}
                type="button"
                onClick={() => setActive(n)}
                aria-pressed={active === n}
                aria-label={`${h.label}: ${h.p.name}`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
              >
                <span className={`pulse-ring relative grid h-7 w-7 place-items-center rounded-full border backdrop-blur-sm transition ${active === n ? 'border-champagne bg-gold/40' : 'border-champagne/80 bg-ink/35'}`}>
                  <span className={`h-2 w-2 rounded-full bg-champagne transition-transform ${active === n ? 'scale-150' : ''}`} />
                </span>
              </button>
            ))}

            {/* Product preview card anchored to the active hotspot */}
            <div
              key={active}
              role="status"
              className="fade-in absolute z-10 hidden w-56 border border-ivory/20 bg-plum/75 p-3 shadow-2xl backdrop-blur-xl sm:block"
              style={{
                top: `clamp(12px, calc(${cur.y}% - 40px), calc(100% - 140px))`,
                ...(cur.x > 50 ? { right: `calc(${100 - cur.x}% + 30px)` } : { left: `calc(${cur.x}% + 30px)` }),
              }}
            >
              <div className="flex gap-3">
                <Img src={cur.p.images[0]} w={160} hw={1.25} sizes="56px" alt="" className="h-[70px] w-14 shrink-0 object-cover" />
                <div className="min-w-0">
                  <p className="eyebrow text-[9px] text-champagne">{cur.label}</p>
                  <p className="mt-1 font-serif text-[1.05rem] leading-tight">{cur.p.name}</p>
                  <p className="mt-1 text-[13px] font-semibold tabular-nums">{formatINR(cur.p.price)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickView(cur.p.id)}
                className="mt-3 flex h-9 w-full items-center justify-center gap-2 bg-ivory text-[10px] font-bold tracking-[0.18em] text-plum uppercase transition hover:bg-champagne"
              >
                <Eye size={14} /> Quick View
              </button>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading id="look-title" align="left" dark eyebrow="Style Your Look" title="Complete the Look" subtitle="Find the perfect pieces that belong together." />
          <ol className="mt-10 border-y border-ivory/10">
            {items.map((h, n) => (
              <li key={h.productId} className="border-b border-ivory/10 last:border-0">
                <button
                  type="button"
                  onClick={() => setActive(n)}
                  aria-pressed={active === n}
                  className={`flex w-full items-center gap-4 py-3.5 text-left transition-opacity duration-300 ${active === n ? '' : 'opacity-55 hover:opacity-100'}`}
                >
                  <span className={`w-6 font-serif text-lg ${active === n ? 'text-champagne' : 'text-ivory/60'}`}>0{n + 1}</span>
                  <Img src={h.p.images[0]} w={140} hw={1.25} sizes="48px" alt="" className="h-[60px] w-12 shrink-0 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-[9px] text-champagne/80">{h.label}</span>
                    <span className="mt-1 block truncate font-serif text-[1.25rem] leading-tight">{h.p.name}</span>
                  </span>
                  <span className="text-sm tabular-nums">{formatINR(h.p.price)}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p>
              <span className="eyebrow block text-[10px] text-ivory/55">The complete look</span>
              <span className="mt-1 block font-serif text-4xl text-champagne tabular-nums">{formatINR(total)}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-outline" onClick={() => setQuickView(cur.p.id)}>
                Quick View
              </button>
              <button
                type="button"
                className="btn btn-gold magnetic"
                onClick={() => {
                  items.forEach((i) => addToBag(i.p.id))
                  notify('The complete look is in your bag')
                }}
              >
                Add the Look
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
