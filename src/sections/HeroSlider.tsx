import { ChevronLeft, ChevronRight, Sparkle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Img, useParallax } from '../components/ui'
import { HERO_SLIDES } from '../data/content'
import { useStore } from '../store'

const DURATION = 7000

export function HeroSlider() {
  const { showCategory } = useStore()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const bg = useParallax<HTMLDivElement>(0.18)
  const visual = useParallax<HTMLDivElement>(-0.06)
  const s = HERO_SLIDES[i]
  const n = HERO_SLIDES.length

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((x) => (x + 1) % n), DURATION)
    return () => clearTimeout(t)
  }, [i, paused, n])

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden bg-plum text-ivory"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Ambient colour field taken from the active photograph */}
      <div ref={bg} className="absolute inset-x-0 -inset-y-24 -z-20" aria-hidden="true">
        {HERO_SLIDES.map((sl, k) => (
          <Img
            key={sl.image}
            src={sl.image}
            w={500}
            alt=""
            loading={k === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full scale-125 object-cover blur-3xl saturate-150 transition-opacity duration-[1600ms] ${k === i ? 'opacity-50' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#210f31_0%,rgba(33,15,49,.92)_38%,rgba(33,15,49,.55)_70%,rgba(11,9,13,.45)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/70 to-transparent" />
      {/* editorial grid lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <span className="absolute inset-y-0 left-[54%] w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      </div>

      <div className="shell grid min-h-[100svh] items-center gap-8 pt-[142px] pb-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pt-[150px] lg:pb-32">
        <div key={i} aria-live="polite" className="relative z-10 order-2 lg:order-1">
          <p className="eyebrow fade-in flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {s.eyebrow}
          </p>
          <h1 className="display mt-5 text-[clamp(2.9rem,7.2vw,7rem)] text-ivory lg:mt-7">
            <span className="line-mask">
              <span>{s.title[0]}</span>
            </span>
            <span className="line-mask">
              <span className="text-champagne italic" style={{ animationDelay: '.12s' }}>
                {s.title[1]}
              </span>
            </span>
          </h1>
          <p className="fade-in mt-6 max-w-md text-[15.5px] leading-relaxed text-ivory/75 lg:mt-8" style={{ animationDelay: '.35s' }}>
            {s.text}
          </p>
          <div className="fade-in mt-9 flex flex-wrap gap-3 sm:gap-4 lg:mt-11" style={{ animationDelay: '.5s' }}>
            <button type="button" className="btn btn-gold magnetic" onClick={() => showCategory(s.primary.to)}>
              {s.primary.label}
            </button>
            <button type="button" className="btn btn-outline magnetic" onClick={() => showCategory(s.secondary.to)}>
              {s.secondary.label}
            </button>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div ref={visual} className="relative mx-auto aspect-[4/5] w-[62%] max-w-[480px] sm:w-[48%] lg:w-[80%]">
            <span aria-hidden="true" className="absolute -inset-3 translate-x-3 -translate-y-3 rounded-t-full border border-gold/45 md:-inset-4 md:translate-x-5 md:-translate-y-5" />
            <div className="absolute inset-0 overflow-hidden rounded-t-full border border-gold/30 bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              {HERO_SLIDES.map((sl, k) => (
                <Img
                  key={sl.image}
                  src={sl.image}
                  w={760}
                  hw={1.25}
                  sizes="(min-width: 1024px) 36vw, 62vw"
                  alt={k === i ? `${sl.eyebrow} — SHIFRA WORLD` : ''}
                  loading={k === 0 ? 'eager' : 'lazy'}
                  fetchPriority={k === 0 ? 'high' : 'auto'}
                  style={{ objectPosition: sl.focus }}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1300ms] ${k === i ? 'ken-burns opacity-100' : 'opacity-0'}`}
                />
              ))}
              <span className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
            </div>

            {/* rotating brand seal */}
            <div aria-hidden="true" className="absolute -bottom-6 -left-8 h-28 w-28 sm:-left-12 sm:h-32 sm:w-32 lg:-left-16 lg:h-36 lg:w-36">
              <div className="absolute inset-0 rounded-full border border-gold/40 bg-plum/70 backdrop-blur-md" />
              <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full text-champagne">
                <defs>
                  <path id="seal" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
                </defs>
                <text fontSize="6.4" fill="currentColor" fontFamily="Manrope, sans-serif" fontWeight="600">
                  {/* textLength stretches the phrase to exactly one lap of the circle (2π × 37) */}
                  <textPath href="#seal" textLength="230" lengthAdjust="spacing">
                    SHIFRA WORLD • SAREES • JEWELLERY • ACCESSORIES •
                  </textPath>
                </text>
              </svg>
              <Sparkle size={22} strokeWidth={1.2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-gold/40 text-gold" />
            </div>

            <div className="absolute -right-2 bottom-[14%] hidden border border-ivory/20 bg-ivory/10 px-5 py-4 backdrop-blur-md sm:block md:-right-6">
              <p className="eyebrow text-[9px] text-champagne">No. 0{i + 1}</p>
              <p className="mt-1 font-serif text-lg leading-tight text-ivory">{s.caption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute inset-x-0 bottom-0 pb-6 md:pb-8">
        <div className="shell flex items-center justify-between gap-6 pr-20 md:pr-24 2xl:pr-12">
          <div className="flex items-center gap-4 md:gap-6">
            {HERO_SLIDES.map((sl, k) => (
              <button
                key={sl.image}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}: ${sl.eyebrow}`}
                aria-current={k === i}
                className="group flex flex-col items-start gap-2 py-2 text-left"
              >
                <span className={`text-[11px] font-semibold tracking-[0.2em] tabular-nums transition-colors ${k === i ? 'text-champagne' : 'text-ivory/45 group-hover:text-ivory/80'}`}>
                  0{k + 1}
                </span>
                <span className="relative block h-px w-12 overflow-hidden bg-ivory/20 md:w-20">
                  {k === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="progress-bar absolute inset-0 bg-gold"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous slide" onClick={() => setI((x) => (x - 1 + n) % n)} className="icon-btn h-11 w-11 border border-ivory/25 text-ivory hover:border-gold hover:text-champagne">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => setI((x) => (x + 1) % n)} className="icon-btn h-11 w-11 border border-ivory/25 text-ivory hover:border-gold hover:text-champagne">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
