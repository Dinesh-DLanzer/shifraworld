import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Img, Ornament, SectionHeading } from '../components/ui'
import { byCategory } from '../data/catalog'
import { useStore } from '../store'

const CIRCLES = [
  { filter: 'All', label: 'All Jewellery', image: '1601121141418-c1caa10a2a0b' },
  { filter: 'Necklace Sets', label: 'Necklace Sets', image: '1601121141461-9d6647bca1ed' },
  { filter: 'Earrings', label: 'Earrings', image: '1682822749969-61a63203c501' },
  { filter: 'Jhumkas', label: 'Jhumkas', image: '1714733831162-0a6e849141be' },
  { filter: 'Bangles', label: 'Bangles', image: '1690175867343-2af70ea57537' },
  { filter: 'Rings', label: 'Rings', image: '1679156271376-3a69ba96a2dc' },
  { filter: 'Bridal', label: 'Bridal Style', image: '1787831398033-d70495c1e8a4' },
]

const PREVIEW = 6

export function JewelleryCollection() {
  const { filters, setFilter } = useStore()
  const [expanded, setExpanded] = useState(false)
  const f = filters.jewellery
  const list = byCategory('jewellery', f)
  const shown = expanded ? list : list.slice(0, PREVIEW)

  const select = (v: string) => {
    setFilter('jewellery', v)
    setExpanded(false)
  }

  return (
    <section id="jewellery" aria-labelledby="jewellery-title" className="bg-ivory py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="jewellery-title" eyebrow="Imitation Jewellery" title="Adorn Your Elegance" subtitle="The perfect finishing touch for every look." />

        <div role="group" aria-label="Jewellery categories" className="no-scrollbar -mx-4 mt-12 flex gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-center md:gap-8 md:px-0">
          {CIRCLES.map((c) => {
            const on = f === c.filter
            return (
              <button key={c.filter} type="button" aria-pressed={on} onClick={() => select(c.filter)} className="group flex w-[88px] shrink-0 flex-col items-center gap-3 md:w-[120px]">
                <span
                  className={`block aspect-square w-full rounded-full p-1.5 transition-all duration-500 ${
                    on ? 'bg-gradient-to-br from-champagne via-gold to-gold-deep shadow-[0_12px_30px_-12px_rgba(138,106,43,0.8)]' : 'border border-gold/50 group-hover:border-gold'
                  }`}
                >
                  <span className="block h-full w-full overflow-hidden rounded-full border-2 border-ivory bg-white">
                    <Img src={c.image} w={240} hw={1} sizes="120px" alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                </span>
                <span className={`text-center text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors ${on ? 'text-royal' : 'text-plum/75 group-hover:text-plum'}`}>
                  {c.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
          <article className="reveal relative col-span-2 flex min-h-[380px] flex-col justify-end overflow-hidden bg-plum text-ivory lg:col-span-1 lg:row-span-2 lg:min-h-0">
            <Img src="1751606615009-30f61ff1a510" w={800} sizes="(min-width: 1024px) 25vw, 100vw" alt="Model wearing layered gold-tone jewellery" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-plum via-plum/50 to-transparent" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-champagne/40" />
            <div className="relative p-8 md:p-10">
              <Ornament className="text-gold" />
              <h3 className="display mt-4 text-[2.1rem] tracking-wide uppercase md:text-[2.4rem]">Every Detail Tells a Story</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">Gold-tone heirlooms, pearl drops and statement sets to finish every drape.</p>
              <button
                type="button"
                className="btn btn-outline mt-7"
                onClick={() => {
                  setFilter('jewellery', 'All')
                  setExpanded(true)
                }}
              >
                Shop Jewellery
              </button>
            </div>
          </article>

          {shown.map((p, n) => (
            <ProductCard key={`${f}-${p.id}`} product={p} hw={1.25} className="fade-in" style={{ animationDelay: `${(n % PREVIEW) * 60}ms` }} />
          ))}
        </div>

        {list.length > PREVIEW && (
          <div className="mt-14 text-center">
            <button type="button" className="btn btn-outline on-light magnetic" onClick={() => setExpanded((x) => !x)}>
              {expanded ? 'Show Fewer' : `View All ${f === 'All' ? 'Jewellery' : f} (${list.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
