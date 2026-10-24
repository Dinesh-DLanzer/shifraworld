import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatINR, getProduct } from '../data/catalog'
import type { MegaMenu as Menu, MenuLink } from '../data/content'
import { useStore } from '../store'
import { Img } from './ui'

export function MegaMenu({ menu, open, onNavigate }: { menu: Menu; open: boolean; onNavigate: () => void }) {
  const { showCategory, setQuickView } = useStore()
  const [preview, setPreview] = useState<MenuLink | null>(null)
  useEffect(() => setPreview(null), [menu.key])

  const go = (filter?: string) => {
    onNavigate()
    showCategory(menu.key, filter)
  }
  const { showcase } = menu
  const image = preview?.image ?? showcase.image
  const cols = menu.columns.length === 3 ? 'repeat(3, minmax(0,1fr)) minmax(0,2.2fr)' : 'repeat(2, minmax(0,1fr)) minmax(0,2.3fr)'

  return (
    <div id="mega-panel" data-open={open} inert={!open} className="mega absolute inset-x-0 top-full hidden xl:block">
      <div className="border-t border-gold/25 bg-ivory text-plum shadow-[0_50px_90px_-30px_rgba(11,9,13,0.6)]">
        <div key={menu.key} className="shell fade-in grid gap-10 py-10 2xl:gap-14" style={{ gridTemplateColumns: cols }}>
          {menu.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow border-b border-plum/10 pb-4 text-gold-deep">{col.title}</p>
              <ul className="mt-4 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onPointerEnter={() => setPreview(l)}
                      onFocus={() => setPreview(l)}
                      onClick={() => go(l.filter)}
                      className={`line-link py-[5px] text-left text-[14.5px] transition-colors hover:text-royal ${
                        preview?.label === l.label ? 'is-active text-royal' : 'text-plum/75'
                      }`}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
            <button type="button" onClick={() => go(preview?.filter)} className="group relative aspect-[4/5] overflow-hidden bg-plum text-left">
              <Img
                key={image}
                src={image}
                w={520}
                hw={1.25}
                sizes="300px"
                alt={preview?.label ?? showcase.title}
                className="fade-in absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
              <span className="pointer-events-none absolute inset-2.5 border border-champagne/40" />
              {showcase.sparkle &&
                ['top-[14%] left-[18%]', 'top-[30%] right-[16%] [animation-delay:.9s]', 'top-[52%] left-[30%] [animation-delay:1.7s]'].map((pos) => (
                  <span key={pos} aria-hidden="true" className={`twinkle absolute text-champagne ${pos}`}>
                    ✦
                  </span>
                ))}
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="eyebrow block text-[9.5px] text-champagne">{preview ? 'Now viewing' : showcase.eyebrow}</span>
                <span className="mt-1.5 block font-serif text-2xl leading-tight text-ivory">{preview?.label ?? showcase.title}</span>
                <span className="eyebrow mt-3 inline-flex items-center gap-2 text-[9.5px] text-ivory/85">
                  Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </button>

            <div className="flex flex-col">
              <p className="eyebrow text-[10px] text-gold-deep">{showcase.eyebrow}</p>
              <p className="mt-2 font-serif text-[1.75rem] leading-tight">{showcase.title}</p>
              <div className="mt-5 space-y-3">
                {showcase.products.map((id) => {
                  const p = getProduct(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        onNavigate()
                        setQuickView(id)
                      }}
                      className="group flex w-full items-center gap-3 border border-plum/10 bg-white p-2 text-left transition hover:border-gold hover:shadow-md"
                    >
                      <span className="h-[72px] w-[58px] shrink-0 overflow-hidden bg-ivory">
                        <Img src={p.images[0]} w={160} hw={1.25} sizes="58px" alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-serif text-[1.05rem] leading-tight">{p.name}</span>
                        <span className="mt-1 block text-[13px] font-semibold tabular-nums">{formatINR(p.price)}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <button type="button" onClick={() => go()} className="btn btn-outline on-light mt-auto w-full min-h-[46px] px-4 text-[10.5px]">
                {showcase.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
