import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

/** Native scroll-snap carousel: swipe on touch, arrows on desktop, optional dot indicators */
export function Carousel({
  children,
  label,
  dark = false,
  dots = false,
  itemClass = 'w-[72%] sm:w-[44%] lg:w-[calc((100%-4.5rem)/4)]',
}: {
  children: ReactNode
  label: string
  dark?: boolean
  dots?: boolean
  itemClass?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const [state, setState] = useState({ start: true, end: false, index: 0 })

  const update = () => {
    const t = track.current
    if (!t) return
    const first = t.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(t).columnGap || '0') : t.clientWidth
    setState({
      start: t.scrollLeft < 8,
      end: t.scrollLeft + t.clientWidth > t.scrollWidth - 8,
      index: Math.min(items.length - 1, Math.round(t.scrollLeft / step)),
    })
  }

  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
    update()
  }, [items.length, items.map((i) => (i as { key?: string }).key).join()])

  const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') as ScrollBehavior
  const go = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.85, behavior: smooth() })
  const goTo = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined
    if (el) track.current!.scrollTo({ left: el.offsetLeft - track.current!.offsetLeft, behavior: smooth() })
  }

  const arrow = `icon-btn h-12 w-12 border backdrop-blur disabled:opacity-0 transition ${
    dark ? 'border-gold/50 bg-plum/50 text-champagne hover:bg-gold hover:text-plum' : 'border-plum/15 bg-white/90 text-plum shadow-lg hover:border-gold hover:bg-plum hover:text-champagne'
  }`

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={update}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:scroll-px-0 md:gap-6 md:px-0"
      >
        {items.map((child, i) => (
          <div key={(child as { key?: string }).key ?? i} className={`shrink-0 snap-start ${itemClass}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="hover-only pointer-events-none absolute inset-x-0 top-[38%] hidden justify-between md:flex">
        <button type="button" onClick={() => go(-1)} disabled={state.start} aria-label="Previous" className={`${arrow} pointer-events-auto -translate-x-1/2`}>
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => go(1)} disabled={state.end} aria-label="Next" className={`${arrow} pointer-events-auto translate-x-1/2`}>
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      {dots && (
        <div className="mt-8 flex justify-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={state.index === i}
              className="grid h-6 place-items-center"
            >
              <span className={`block h-[3px] rounded-full transition-all duration-500 ${state.index === i ? 'w-9 bg-gold' : `w-4 ${dark ? 'bg-ivory/30' : 'bg-plum/20'}`}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
