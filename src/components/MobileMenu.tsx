import { ChevronDown, Instagram, Phone, Plus, Search, X } from 'lucide-react'
import { INSTAGRAM_URL, MEGA_MENUS, NAV, PHONE_DISPLAY, PHONE_TEL } from '../data/content'
import { publicUrl } from '../data/catalog'
import { useStore } from '../store'
import { Dialog, Img } from './ui'

/** Mobile & tablet navigation: mega menus become nested native accordions with thumbnails */
export function MobileMenu() {
  const { panel, setPanel, showCategory, goTo } = useStore()
  const close = () => setPanel(null)
  const row = 'flex w-full items-center justify-between border-b border-ivory/10 py-4 font-serif text-[1.65rem] leading-none'

  return (
    <Dialog open={panel === 'menu'} onClose={close} label="Menu" className="drawer-left">
      <div className="flex h-full flex-col bg-plum text-ivory">
        <div className="flex items-center justify-between border-b border-gold/20 px-5 py-3">
          <img src={publicUrl('/logo-gold.webp')} alt="SHIFRA WORLD" width={720} height={718} className="h-14 w-auto" />
          <div className="flex">
            <button type="button" className="icon-btn hover:bg-ivory/10" aria-label="Search" onClick={() => setPanel('search')}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button type="button" className="icon-btn hover:bg-ivory/10" aria-label="Close menu" onClick={close}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-6">
          <button type="button" className={row} onClick={() => goTo('top')}>
            Home
          </button>
          {MEGA_MENUS.map((m) => (
            <details key={m.key} className="border-b border-ivory/10">
              <summary className="flex items-center justify-between py-4 font-serif text-[1.65rem] leading-none">
                {m.label}
                <ChevronDown size={20} strokeWidth={1.3} className="chev text-gold transition-transform duration-300" />
              </summary>
              <div className="pb-5">
                <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-4">
                  {m.columns[0].links.slice(0, 6).map((l) => (
                    <button key={l.label} type="button" onClick={() => showCategory(m.key, l.filter)} className="w-[86px] shrink-0 text-left">
                      <span className="block aspect-[4/5] overflow-hidden border border-gold/30">
                        <Img src={l.image!} w={180} hw={1.25} sizes="86px" alt="" className="h-full w-full object-cover" />
                      </span>
                      <span className="mt-2 block text-[11px] leading-tight text-ivory/80">{l.label}</span>
                    </button>
                  ))}
                </div>
                {m.columns.map((col) => (
                  <details key={col.title} className="border-t border-ivory/10">
                    <summary className="eyebrow flex items-center justify-between py-3.5 text-[10.5px] text-champagne">
                      {col.title}
                      <Plus size={14} className="chev-plus transition-transform duration-300" />
                    </summary>
                    <ul className="grid grid-cols-2 gap-x-4 pb-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <button type="button" onClick={() => showCategory(m.key, l.filter)} className="w-full py-2 text-left text-[14px] text-ivory/80 hover:text-champagne">
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
                <button type="button" onClick={() => showCategory(m.key)} className="btn btn-outline mt-3 w-full">
                  {m.showcase.cta}
                </button>
              </div>
            </details>
          ))}
          {NAV.filter((n) => n.href && n.href !== '#top').map((n) => (
            <button key={n.label} type="button" className={row} onClick={() => goTo(n.href!.slice(1))}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="space-y-3 border-t border-gold/20 px-5 py-5 text-sm text-ivory/80">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 hover:text-champagne">
            <Phone size={16} className="text-gold" /> {PHONE_DISPLAY}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-champagne">
            <Instagram size={16} className="text-gold" /> @shifraworld
          </a>
        </div>
      </div>
    </Dialog>
  )
}
