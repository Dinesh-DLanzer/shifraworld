import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { bagCount, type CategoryKey, publicUrl } from '../data/catalog'
import { ANNOUNCEMENTS, MEGA_MENUS, NAV } from '../data/content'
import { useStore } from '../store'
import { MegaMenu } from './MegaMenu'

function AnnouncementBar({ collapsed }: { collapsed: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className={`grid bg-royal transition-[grid-template-rows] duration-500 ${collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
      <div className="overflow-hidden">
        <p aria-live="off" className="flex h-9 items-center justify-center gap-3 overflow-hidden px-4 text-center text-[10px] font-semibold tracking-[0.32em] text-champagne/90 uppercase sm:text-[10.5px]">
          <span aria-hidden="true" className="text-gold">✦</span>
          <span key={i} className="ticker-in truncate">{ANNOUNCEMENTS[i]}</span>
          <span aria-hidden="true" className="text-gold">✦</span>
        </p>
      </div>
    </div>
  )
}

function Count({ n }: { n: number }) {
  if (!n) return null
  return (
    <span key={n} className="heart-pop absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-plum tabular-nums">
      {n}
    </span>
  )
}

export function Header() {
  const { bag, wishlist, setPanel, showCategory, goTo, notify } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<CategoryKey | null>(null)
  const [shown, setShown] = useState<CategoryKey>('sarees') // kept while the panel animates closed
  const wrap = useRef<HTMLDivElement>(null)
  const timer = useRef(0)
  const lastPointer = useRef('')

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = (k: CategoryKey) => {
    clearTimeout(timer.current)
    setOpen(k)
    setShown(k)
  }
  const closeMenu = () => {
    clearTimeout(timer.current)
    setOpen(null)
  }
  // hover intent: small delays stop flicker as the cursor travels between trigger and panel
  const later = (fn: () => void, ms: number) => {
    clearTimeout(timer.current)
    timer.current = window.setTimeout(fn, ms)
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && closeMenu()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      closeMenu()
      wrap.current?.querySelector<HTMLElement>(`[data-trigger="${open}"]`)?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const focusFirstLink = () => requestAnimationFrame(() => wrap.current?.querySelector<HTMLElement>('#mega-panel button')?.focus())

  const solid = scrolled || open !== null
  const iconCls = 'icon-btn relative text-ivory/90 hover:bg-ivory/10 hover:text-champagne'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ${
        solid ? 'bg-plum/95 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl' : 'bg-gradient-to-b from-ink/60 to-transparent'
      }`}
    >
      <AnnouncementBar collapsed={scrolled} />
      <div
        ref={wrap}
        className="relative"
        onPointerEnter={(e) => e.pointerType === 'mouse' && open && clearTimeout(timer.current)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && later(closeMenu, 220)}
        onBlur={(e) => open && !wrap.current?.contains(e.relatedTarget as Node) && closeMenu()}
      >
        <div
          className={`shell grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-[height] duration-500 xl:flex xl:justify-between ${
            scrolled ? 'h-[68px] xl:h-[76px]' : 'h-[76px] xl:h-[100px]'
          }`}
        >
          <div className="flex items-center gap-1 xl:hidden">
            <button type="button" className={iconCls} aria-label="Open menu" onClick={() => setPanel('menu')}>
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <button type="button" className={iconCls} aria-label="Search" onClick={() => setPanel('search')}>
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          <a href="#top" aria-label="SHIFRA WORLD — back to top" className="shrink-0 justify-self-center">
            <img
              src={publicUrl('/logo-gold.webp')}
              alt="SHIFRA WORLD"
              width={720}
              height={718}
              className={`w-auto transition-[height] duration-500 ${scrolled ? 'h-[54px] xl:h-[64px]' : 'h-[62px] xl:h-[88px]'}`}
            />
          </a>

          <nav aria-label="Main" className="hidden flex-1 justify-center xl:flex">
            <ul className="flex items-center gap-7 2xl:gap-9">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.menu ? (
                    <button
                      type="button"
                      data-trigger={item.menu}
                      aria-expanded={open === item.menu}
                      aria-controls="mega-panel"
                      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && later(() => openMenu(item.menu), open ? 0 : 110)}
                      onClick={() => {
                        // mouse users already see the menu on hover, so a click goes straight to the section
                        if (lastPointer.current === 'mouse') {
                          closeMenu()
                          showCategory(item.menu)
                        } else if (open === item.menu) closeMenu()
                        else openMenu(item.menu)
                        lastPointer.current = ''
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          openMenu(item.menu)
                          focusFirstLink()
                        }
                      }}
                      className="line-link inline-block py-3 text-[11.5px] font-semibold tracking-[0.2em] whitespace-nowrap text-ivory/90 uppercase transition-colors hover:text-champagne aria-expanded:text-champagne"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && open && later(closeMenu, 120)}
                      onClick={(e) => {
                        e.preventDefault()
                        closeMenu()
                        goTo(item.href.slice(1))
                      }}
                      className="line-link inline-block py-3 text-[11.5px] font-semibold tracking-[0.2em] whitespace-nowrap text-ivory/90 uppercase transition-colors hover:text-champagne"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            <button type="button" className={`${iconCls} hidden xl:inline-grid`} aria-label="Search" onClick={() => setPanel('search')}>
              <Search size={20} strokeWidth={1.5} className="transition-transform duration-500 hover:rotate-90" />
            </button>
            <button type="button" className={iconCls} aria-label={`Wishlist, ${wishlist.length} items`} onClick={() => setPanel('wishlist')}>
              <Heart size={20} strokeWidth={1.5} />
              <Count n={wishlist.length} />
            </button>
            <button type="button" className={iconCls} aria-label={`Shopping bag, ${bagCount(bag)} items`} onClick={() => setPanel('bag')}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              <Count n={bagCount(bag)} />
            </button>
            <button
              type="button"
              className={`${iconCls} hidden sm:inline-grid`}
              aria-label="Account"
              onClick={() => notify('Accounts aren’t part of this demo storefront')}
            >
              <UserRound size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className={`h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-0'}`} />

        <MegaMenu menu={MEGA_MENUS.find((m) => m.key === shown)!} open={open !== null} onNavigate={closeMenu} />
      </div>
    </header>
  )
}
