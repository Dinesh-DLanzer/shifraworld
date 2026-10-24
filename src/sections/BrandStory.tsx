import { Img, Ornament, useParallax } from '../components/ui'
import { useStore } from '../store'

/** Fine gold botanical sprig, echoing the leaf in the logo */
function Sprig({ className = '' }: { className?: string }) {
  const leaves = [
    [118, 52, -38],
    [96, 92, 34],
    [92, 140, -30],
    [70, 178, 40],
    [66, 226, -24],
  ]
  return (
    <svg viewBox="0 0 200 320" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden="true">
      <path d="M150 10 C 110 80, 120 160, 70 230 S 40 300, 60 316" />
      {leaves.map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0 C 14 -10, 34 -10, 46 0 C 34 10, 14 10, 0 0 Z" />
          <path d="M0 0 L 40 0" strokeWidth=".6" />
        </g>
      ))}
      <circle cx="150" cy="10" r="3" fill="currentColor" />
    </svg>
  )
}

export function BrandStory() {
  const { showCategory } = useStore()
  const img = useParallax<HTMLDivElement>(-0.08)
  return (
    <section aria-labelledby="story-title" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[440px] overflow-hidden bg-plum lg:min-h-[760px]">
          <div ref={img} className="absolute inset-x-0 -inset-y-16">
            <Img src="1769275061721-bb6439d24ebc" w={1100} sizes="(min-width: 1024px) 50vw, 100vw" alt="Model in a black and gold saree in soft forest light" className="h-full w-full object-cover" />
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-5 border border-champagne/40" />
        </div>
        <div className="relative isolate flex items-center overflow-hidden bg-ivory px-6 py-20 md:px-16 lg:px-20 xl:px-28">
          <Sprig className="absolute -top-6 -right-6 -z-10 h-72 w-48 text-gold/45 md:h-96 md:w-64" />
          <div className="reveal max-w-lg">
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              Our Story
            </p>
            <h2 id="story-title" className="display mt-6 text-[clamp(2.5rem,4.8vw,4.2rem)]">
              Discover the World of <em className="text-royal">Shifra</em>
            </h2>
            <Ornament className="mt-7 text-gold" />
            <p className="mt-7 text-[16.5px] leading-[1.8] text-mist">
              At Shifra World, we believe elegance lives in every detail. Explore sarees, jewellery and accessories that bring together timeless tradition and
              contemporary style.
            </p>
            <ul className="mt-9 grid grid-cols-3 border-y border-gold/30 text-center">
              {['Sarees', 'Jewellery', 'Accessories'].map((t, n) => (
                <li key={t} className={`py-5 font-serif text-lg ${n ? 'border-l border-gold/30' : ''}`}>
                  {t}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-outline on-light magnetic mt-10" onClick={() => showCategory('sarees')}>
              Explore the Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
