import { Heart, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { bagCount, bagSubtotal, formatINR, getProduct } from '../data/catalog'
import { useStore } from '../store'
import { Dialog, Img } from './ui'

function Shell({ open, title, count, onClose, children }: { open: boolean; title: string; count: number; onClose: () => void; children: ReactNode }) {
  return (
    <Dialog open={open} onClose={onClose} label={title} className="drawer-right">
      <div className="flex h-full flex-col bg-ivory text-plum">
        <div className="flex items-center justify-between border-b border-plum/10 px-6 py-5">
          <h2 className="font-serif text-[1.9rem] leading-none">
            {title} <span className="ml-1 align-middle text-sm font-sans text-mist">({count})</span>
          </h2>
          <button type="button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`} className="icon-btn hover:bg-plum hover:text-champagne">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </div>
    </Dialog>
  )
}

function Empty({ icon, text, onShop }: { icon: ReactNode; text: string; onShop: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-full border border-gold/50 text-gold-deep">{icon}</span>
      <p className="mt-6 font-serif text-2xl">{text}</p>
      <button type="button" onClick={onShop} className="btn btn-plum mt-8">
        Explore Sarees
      </button>
    </div>
  )
}

export function CartDrawer() {
  const { panel, setPanel, bag, setQty, showCategory, notify } = useStore()
  const close = () => setPanel(null)
  return (
    <Shell open={panel === 'bag'} title="Your Bag" count={bagCount(bag)} onClose={close}>
      {bag.length === 0 ? (
        <Empty icon={<ShoppingBag size={28} strokeWidth={1.3} />} text="Your bag is waiting to be filled." onShop={() => showCategory('sarees')} />
      ) : (
        <>
          <ul className="flex-1 divide-y divide-plum/10 overflow-y-auto px-6">
            {bag.map((l) => {
              const p = getProduct(l.id)
              return (
                <li key={`${l.id}-${l.variant}`} className="flex gap-4 py-5">
                  <Img src={p.images[0]} w={200} hw={1.25} sizes="84px" alt="" className="h-[105px] w-[84px] shrink-0 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="eyebrow text-[9.5px] text-gold-deep">{p.type}</p>
                    <p className="mt-1 font-serif text-lg leading-tight">{p.name}</p>
                    <p className="mt-0.5 text-xs text-mist">{l.variant}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-9 items-center border border-plum/20" role="group" aria-label={`Quantity of ${p.name}`}>
                        <button type="button" className="grid h-full w-9 place-items-center hover:text-royal" onClick={() => setQty(l.id, l.variant, l.qty - 1)} aria-label="Decrease quantity">
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                        <button type="button" className="grid h-full w-9 place-items-center hover:text-royal" onClick={() => setQty(l.id, l.variant, l.qty + 1)} aria-label="Increase quantity">
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="font-semibold tabular-nums">{formatINR(p.price * l.qty)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setQty(l.id, l.variant, 0)} aria-label={`Remove ${p.name}`} className="icon-btn -mt-2 -mr-2 h-9 w-9 self-start text-mist hover:text-royal">
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-plum/10 bg-white px-6 py-6">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-[10.5px]">Subtotal</span>
              <span className="font-serif text-3xl tabular-nums">{formatINR(bagSubtotal(bag))}</span>
            </div>
            <p className="mt-1 text-xs text-mist">Demo bag — no orders or payments are processed.</p>
            <button type="button" className="btn btn-gold mt-5 w-full" onClick={() => notify('Checkout isn’t part of this demo storefront')}>
              Proceed to Checkout
            </button>
            <button type="button" className="mt-3 w-full py-2 text-[11px] font-bold tracking-[0.2em] text-plum/70 uppercase hover:text-royal" onClick={close}>
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </Shell>
  )
}

export function WishlistDrawer() {
  const { panel, setPanel, wishlist, toggleWish, addToBag, setQuickView, showCategory } = useStore()
  return (
    <Shell open={panel === 'wishlist'} title="Wishlist" count={wishlist.length} onClose={() => setPanel(null)}>
      {wishlist.length === 0 ? (
        <Empty icon={<Heart size={28} strokeWidth={1.3} />} text="Tap the heart on any piece to save it here." onShop={() => showCategory('sarees')} />
      ) : (
        <ul className="flex-1 divide-y divide-plum/10 overflow-y-auto px-6">
          {wishlist.map((id) => {
            const p = getProduct(id)
            return (
              <li key={id} className="flex gap-4 py-5">
                <button
                  type="button"
                  onClick={() => {
                    setPanel(null)
                    setQuickView(id)
                  }}
                  aria-label={`Quick view: ${p.name}`}
                  className="shrink-0"
                >
                  <Img src={p.images[0]} w={200} hw={1.25} sizes="84px" alt="" className="h-[105px] w-[84px] object-cover" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="eyebrow text-[9.5px] text-gold-deep">{p.type}</p>
                  <p className="mt-1 font-serif text-lg leading-tight">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold tabular-nums">{formatINR(p.price)}</p>
                  <div className="mt-auto flex gap-2 pt-3">
                    <button type="button" className="btn btn-plum min-h-9 flex-1 px-3 text-[10px]" onClick={() => addToBag(id)}>
                      Add to Bag
                    </button>
                    <button type="button" onClick={() => toggleWish(id)} aria-label={`Remove ${p.name} from wishlist`} className="icon-btn h-9 w-9 border border-plum/15 text-mist hover:text-royal">
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Shell>
  )
}
