import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { CATEGORY_SECTION, getProduct, variantsOf, type BagLine, type CategoryKey } from './data/catalog'

type Panel = null | 'bag' | 'wishlist' | 'search' | 'menu'

interface Store {
  bag: BagLine[]
  addToBag: (id: string, variant?: string, qty?: number) => void
  setQty: (id: string, variant: string, qty: number) => void
  wishlist: string[]
  toggleWish: (id: string) => void
  quickView: string | null
  setQuickView: (id: string | null) => void
  panel: Panel
  setPanel: (p: Panel) => void
  filters: Record<CategoryKey, string>
  setFilter: (c: CategoryKey, f: string) => void
  /** Select a category filter and scroll to its homepage section */
  showCategory: (c: CategoryKey, f?: string) => void
  /** Close any panel and scroll to an element id on the page */
  goTo: (id: string) => void
  toast: { id: number; text: string } | null
  notify: (text: string) => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [quickView, setQuickView] = useState<string | null>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [filters, setFilters] = useState<Record<CategoryKey, string>>({ sarees: 'All', jewellery: 'All', accessories: 'All' })
  const [toast, setToast] = useState<Store['toast']>(null)
  const toastTimer = useRef(0)

  const notify = (text: string) => {
    setToast({ id: Date.now(), text })
    clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }

  const addToBag = (id: string, variant = variantsOf(getProduct(id)).options[0], qty = 1) => {
    setBag((lines) =>
      lines.some((l) => l.id === id && l.variant === variant)
        ? lines.map((l) => (l.id === id && l.variant === variant ? { ...l, qty: l.qty + qty } : l))
        : [...lines, { id, variant, qty }],
    )
    notify(`${getProduct(id).name} added to your bag`)
  }

  const setQty = (id: string, variant: string, qty: number) =>
    setBag((lines) =>
      qty <= 0
        ? lines.filter((l) => !(l.id === id && l.variant === variant))
        : lines.map((l) => (l.id === id && l.variant === variant ? { ...l, qty } : l)),
    )

  const toggleWish = (id: string) => {
    const adding = !wishlist.includes(id)
    setWishlist((w) => (adding ? [...w, id] : w.filter((x) => x !== id)))
    notify(adding ? `Saved to wishlist` : `Removed from wishlist`)
  }

  const setFilter = (c: CategoryKey, f: string) => setFilters((all) => ({ ...all, [c]: f }))

  const goTo = (id: string) => {
    setPanel(null)
    // wait for any open dialog to close (it locks page scroll) before scrolling
    setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60)
  }

  const showCategory = (c: CategoryKey, f = 'All') => {
    setFilter(c, f)
    goTo(CATEGORY_SECTION[c])
  }

  return (
    <Ctx.Provider
      value={{ bag, addToBag, setQty, wishlist, toggleWish, quickView, setQuickView, panel, setPanel, filters, setFilter, showCategory, goTo, toast, notify }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside <StoreProvider>')
  return s
}
