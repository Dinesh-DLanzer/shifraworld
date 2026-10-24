import { ArrowUpRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { CATEGORY_LABEL, formatINR, searchProducts } from '../data/catalog'
import { useStore } from '../store'
import { Dialog, Img } from './ui'

const POPULAR = ['Silk saree', 'Jhumkas', 'Claw clip', 'Necklace set', 'Pearl', 'Scrunchie']

export function SearchOverlay() {
  const { panel, setPanel, setQuickView } = useStore()
  const [q, setQ] = useState('')
  const results = searchProducts(q)
  const pick = (id: string) => {
    setPanel(null)
    setQuickView(id)
  }

  return (
    <Dialog open={panel === 'search'} onClose={() => setPanel(null)} label="Search products" className="sheet-top">
      <div className="max-h-[100dvh] overflow-y-auto border-b border-gold/30 bg-plum text-ivory">
        <div className="shell py-6 md:py-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-champagne">Search SHIFRA WORLD</p>
            <button type="button" onClick={() => setPanel(null)} aria-label="Close search" className="icon-btn text-ivory hover:bg-ivory/10">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <form
            role="search"
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault()
              if (results[0]) pick(results[0].id)
            }}
          >
            <label className="flex items-center gap-4 border-b border-gold/50 pb-3 focus-within:border-champagne">
              <Search size={26} strokeWidth={1.3} className="shrink-0 text-gold" />
              <input
                data-autofocus
                type="text"
                enterKeyHint="search"
                autoComplete="off"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Sarees, jhumkas, claw clips…"
                aria-label="Search products"
                className="w-full bg-transparent font-serif text-[1.9rem] text-ivory outline-none placeholder:text-ivory/35 md:text-5xl"
              />
            </label>
          </form>

          {!q.trim() && (
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-2 text-[10px] text-ivory/50">Popular</span>
              {POPULAR.map((t) => (
                <button key={t} type="button" onClick={() => setQ(t)} className="rounded-full border border-ivory/20 px-4 py-2 text-[13px] text-ivory/85 transition hover:border-gold hover:text-champagne">
                  {t}
                </button>
              ))}
            </div>
          )}

          {q.trim() && results.length === 0 && (
            <p className="mt-8 text-ivory/70" role="status">
              No pieces match “{q}”. Try “silk”, “pearl” or “bow”.
            </p>
          )}

          {results.length > 0 && (
            <>
              <p className="sr-only" role="status">
                {results.length} results
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p) => (
                  <li key={p.id} className="fade-in">
                    <button
                      type="button"
                      onClick={() => pick(p.id)}
                      className="group flex w-full items-center gap-4 border border-ivory/10 bg-ivory/[0.04] p-2.5 text-left transition hover:border-gold/60 hover:bg-ivory/[0.08]"
                    >
                      <Img src={p.images[0]} w={160} hw={1.25} sizes="64px" alt="" className="h-20 w-16 shrink-0 object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block text-[9px] text-champagne/80">{CATEGORY_LABEL[p.category]}</span>
                        <span className="mt-1 block truncate font-serif text-lg leading-tight">{p.name}</span>
                        <span className="mt-0.5 block text-sm text-ivory/70 tabular-nums">{formatINR(p.price)}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-gold opacity-0 transition group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Dialog>
  )
}
