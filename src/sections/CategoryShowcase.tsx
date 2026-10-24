import { ArrowRight } from 'lucide-react'
import { Img, SectionHeading } from '../components/ui'
import type { CategoryKey } from '../data/catalog'
import { useStore } from '../store'

const CARDS: { key: CategoryKey; title: string; text: string; image: string; focus: string; cls: string }[] = [
  {
    key: 'sarees',
    title: 'Sarees',
    text: 'Silk, cotton, chiffon & georgette drapes',
    image: '1617627143750-d86bc21e42bb',
    focus: '50% 28%',
    cls: 'aspect-[4/5] md:aspect-auto md:col-span-7 md:row-span-2',
  },
  {
    key: 'jewellery',
    title: 'Jewellery',
    text: 'Necklace sets, jhumkas, bangles & more',
    image: '1787831398033-d70495c1e8a4',
    focus: '50% 38%',
    cls: 'aspect-[4/3] md:aspect-auto md:col-span-5',
  },
  {
    key: 'accessories',
    title: 'Korean Hair Accessories',
    text: 'Claw clips, bows, scrunchies & pins',
    image: '1776267033953-25f51bc59120',
    focus: '50% 30%',
    cls: 'aspect-[4/3] md:aspect-auto md:col-span-5',
  },
]

export function CategoryShowcase() {
  const { showCategory } = useStore()
  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-ivory py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="collections-title" eyebrow="Shop by Category" title="Discover Your Style" subtitle="Beautifully curated collections for every moment." />
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:grid-rows-[minmax(300px,40vh)_minmax(300px,40vh)] md:gap-5">
          {CARDS.map((c, n) => (
            <button
              key={c.key}
              type="button"
              onClick={() => showCategory(c.key)}
              className={`reveal ${n ? `reveal-delay-${n}` : ''} group relative isolate overflow-hidden bg-plum text-left ${c.cls}`}
            >
              <Img
                src={c.image}
                w={n ? 900 : 1200}
                sizes={n ? '(min-width: 768px) 40vw, 100vw' : '(min-width: 768px) 58vw, 100vw'}
                alt=""
                style={{ objectPosition: c.focus }}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-[1.07]"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-champagne/40 transition-all duration-700 group-hover:inset-5 group-hover:border-champagne/80" />

              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-95 rounded-full border border-white/30 bg-white/10 px-7 py-4 opacity-0 backdrop-blur-md transition duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="eyebrow text-[10.5px] whitespace-nowrap text-ivory">Explore Collection</span>
              </span>

              <span className="absolute inset-x-0 bottom-0 block p-7 md:p-9 lg:p-11">
                <span className="eyebrow block text-[10px] text-champagne">0{n + 1} — Collection</span>
                <span className={`display mt-3 block text-ivory ${n ? 'text-[2.2rem] md:text-[2.6rem]' : 'text-[2.6rem] md:text-[4rem]'}`}>{c.title}</span>
                <span className="mt-2 block text-sm text-ivory/75">{c.text}</span>
                <span className="eyebrow mt-6 inline-flex items-center gap-3 text-[10.5px] text-ivory">
                  Shop now
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/60 transition-colors duration-500 group-hover:bg-champagne group-hover:text-plum">
                    <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
