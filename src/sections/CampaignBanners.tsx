import { Img } from '../components/ui'
import type { CategoryKey } from '../data/catalog'
import { useStore } from '../store'

const BANNERS: { eyebrow: string; title: string; cta: string; to: CategoryKey; image: string; focus: string; alt: string }[] = [
  {
    eyebrow: 'The Saree Collection',
    title: 'A Celebration of Tradition',
    cta: 'Shop Sarees',
    to: 'sarees',
    image: '1727430228383-aa1fb59db8bf',
    focus: '50% 22%',
    alt: 'Model in a graceful silk saree against a soft sky',
  },
  {
    eyebrow: 'The Jewellery Collection',
    title: 'The Beauty of Every Detail',
    cta: 'Shop Jewellery',
    to: 'jewellery',
    image: '1601121141418-c1caa10a2a0b',
    focus: '50% 50%',
    alt: 'Intricate gold-tone necklace on a dark background',
  },
]

export function CampaignBanners() {
  const { showCategory } = useStore()
  return (
    <section aria-label="Featured campaigns" className="bg-ivory py-20 md:py-28">
      <div className="shell grid gap-5 md:grid-cols-2 md:gap-6">
        {BANNERS.map((b, n) => (
          <article key={b.title} className={`reveal ${n ? 'reveal-delay-1' : ''} group relative isolate aspect-[4/5] overflow-hidden bg-plum text-ivory md:aspect-[5/6]`}>
            <Img
              src={b.image}
              w={1000}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt={b.alt}
              style={{ objectPosition: b.focus }}
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1800ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-champagne/40 transition-all duration-700 group-hover:inset-6 group-hover:border-champagne/80" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className="eyebrow text-[10px] text-champagne">{b.eyebrow}</p>
              <h3 className="display mt-4 max-w-sm text-[clamp(2rem,3.4vw,3.2rem)] tracking-[0.02em] uppercase">{b.title}</h3>
              <button type="button" className="btn btn-outline magnetic mt-8" onClick={() => showCategory(b.to)}>
                {b.cta}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
