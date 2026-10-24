import { useEffect, useRef, type ImgHTMLAttributes, type ReactNode } from 'react'
import { imgSrcSet, imgUrl } from '../data/catalog'

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  /** Largest width to request */
  w?: number
  /** height/width ratio for a hard crop */
  hw?: number
  alt: string
}

/** Responsive, lazy image for local or Unsplash refs */
export function Img({ src, w = 900, hw, sizes = '100vw', loading = 'lazy', alt, ...rest }: ImgProps) {
  const widths = [Math.round(w / 2), w, Math.round(w * 1.6)]
  return (
    <img
      src={imgUrl(src, w, hw)}
      srcSet={imgSrcSet(src, widths, hw)}
      sizes={sizes}
      loading={loading}
      decoding="async"
      alt={alt}
      draggable={false}
      {...rest}
    />
  )
}

/** Native <dialog> as a controlled modal: focus trap, Esc, inert page and backdrop for free */
export function Dialog({
  open,
  onClose,
  label,
  className = '',
  children,
}: {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current!
    if (open && !d.open) {
      d.showModal()
      d.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={className}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {open && children}
    </dialog>
  )
}

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 w-28 ${className}`} aria-hidden="true" fill="none">
      <path d="M0 6h48M72 6h48" stroke="currentColor" strokeWidth=".8" />
      <path d="M60 1l5 5-5 5-5-5z" stroke="currentColor" strokeWidth=".8" />
      <circle cx="60" cy="6" r="1.3" fill="currentColor" />
      <circle cx="51" cy="6" r=".9" fill="currentColor" />
      <circle cx="69" cy="6" r=".9" fill="currentColor" />
    </svg>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  id,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  dark?: boolean
  id?: string
}) {
  const center = align === 'center'
  return (
    <div className={`reveal ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}>
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''} ${dark ? 'text-champagne' : 'text-gold-deep'}`}>
          <span className={`h-px w-8 ${dark ? 'bg-gold' : 'bg-gold-deep'}`} aria-hidden="true" />
          {eyebrow}
          {center && <span className={`h-px w-8 ${dark ? 'bg-gold' : 'bg-gold-deep'}`} aria-hidden="true" />}
        </p>
      )}
      <h2 id={id} className={`display mt-5 text-[clamp(2.4rem,5vw,4.1rem)] ${dark ? 'text-ivory' : 'text-plum'}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-[15px] leading-relaxed md:text-base ${dark ? 'text-ivory/70' : 'text-mist'}`}>{subtitle}</p>}
    </div>
  )
}

export function FilterPills({
  options,
  value,
  onChange,
  label,
  className = '',
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  label: string
  className?: string
}) {
  return (
    <div role="group" aria-label={label} className={`no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:px-0 ${className}`}>
      {options.map((o) => (
        <button key={o} type="button" className="pill" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o === 'All' ? `All ${label}` : o}
        </button>
      ))}
    </div>
  )
}

/** Translate the element with scroll, relative to its parent's position in the viewport */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.parentElement!.getBoundingClientRect()
      if (r.bottom < -200 || r.top > innerHeight + 200) return
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])
  return ref
}
