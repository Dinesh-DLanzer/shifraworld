import { Img, useParallax } from '../components/ui'
import { useStore } from '../store'

// Deterministic gold particle field
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  size: 3 + ((i * 7) % 6),
  delay: `${(i * 0.7) % 8}s`,
  duration: `${8 + ((i * 3) % 7)}s`,
}))

export function EditorialBanner() {
  const { showCategory } = useStore()
  const big = useParallax<HTMLDivElement>(-0.1)
  const small = useParallax<HTMLDivElement>(0.14)

  return (
    <section aria-labelledby="editorial-title" className="relative isolate overflow-hidden bg-plum py-24 text-ivory md:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_40%,rgba(81,38,116,.95),rgba(33,15,49,1)_55%,#0b090d_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {PARTICLES.map((p, i) => (
          <span key={i} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      <div className="shell grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="reveal relative z-10">
          <p className="eyebrow flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            The Festive Edit
          </p>
          <h2 id="editorial-title" className="display mt-6 text-[clamp(2.7rem,5.8vw,5.4rem)]">
            Where Tradition Meets <em className="text-champagne">Timeless Beauty.</em>
          </h2>
          <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ivory/75">Celebrate every moment with a saree as unique as you.</p>
          <button type="button" className="btn btn-gold magnetic mt-10" onClick={() => showCategory('sarees', 'Silk')}>
            Discover the Collection
          </button>
        </div>

        <div className="reveal reveal-delay-1 relative h-[480px] sm:h-[600px] lg:h-[680px]">
          <div className="absolute top-0 right-0 h-[86%] w-[74%] overflow-hidden rounded-t-[999px] border border-gold/30">
            <div ref={big} className="absolute inset-x-0 -inset-y-14">
              <Img src="1778148046667-ec1b619d5064" w={900} sizes="(min-width: 1024px) 38vw, 74vw" alt="Model in a flowing saree dancing in warm golden light" className="h-full w-full object-cover" />
            </div>
            <span className="absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 h-[50%] w-[46%] overflow-hidden border-[6px] border-plum shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
            <div ref={small} className="absolute inset-x-0 -inset-y-12">
              <Img src="1778148046782-2b5c2ce37612" w={600} sizes="(min-width: 1024px) 22vw, 46vw" alt="Detail of a saree drape in golden-hour light" className="h-full w-full object-cover" />
            </div>
          </div>
          <p className="eyebrow absolute right-0 bottom-0 text-[9.5px] text-champagne/70 [writing-mode:vertical-rl]">Golden hour, in silk</p>
        </div>
      </div>
    </section>
  )
}
