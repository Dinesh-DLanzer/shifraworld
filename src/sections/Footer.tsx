import { Check, Instagram, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { type CategoryKey, publicUrl } from '../data/catalog'
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../data/content'
import { useStore } from '../store'

const EXPLORE: { label: string; cat?: CategoryKey; id?: string }[] = [
  { label: 'Sarees', cat: 'sarees' },
  { label: 'Jewellery', cat: 'jewellery' },
  { label: 'Hair Accessories', cat: 'accessories' },
  { label: 'New Arrivals', id: 'new-arrivals' },
  { label: 'Best Sellers', id: 'best-sellers' },
]
const COLLECTIONS: { label: string; cat: CategoryKey; filter: string }[] = [
  { label: 'Cotton Sarees', cat: 'sarees', filter: 'Cotton' },
  { label: 'Silk Sarees', cat: 'sarees', filter: 'Silk' },
  { label: 'Chiffon Sarees', cat: 'sarees', filter: 'Chiffon' },
  { label: 'Jewellery Sets', cat: 'jewellery', filter: 'Necklace Sets' },
  { label: 'Korean Hair Accessories', cat: 'accessories', filter: 'All' },
]

function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <div className="border-b border-gold/20 bg-plum">
      <div className="shell grid items-center gap-8 py-14 md:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-champagne">Newsletter</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)]">Join the World of Shifra</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/65">New arrivals and styling notes, now and then.</p>
        </div>
        {done ? (
          <p role="status" className="fade-in flex items-center gap-4 border border-gold/40 bg-ivory/5 p-6 text-ivory/85">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-plum">
              <Check size={18} />
            </span>
            Thank you for joining! This is a demo, so no email was sent.
          </p>
        ) : (
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              className="h-[54px] flex-1 border border-ivory/25 bg-ivory/5 px-5 text-[15px] text-ivory outline-none placeholder:text-ivory/40 focus:border-gold"
            />
            <button type="submit" className="btn btn-gold h-[54px] px-6 text-[10.5px]">
              Join the World of Shifra
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export function Footer() {
  const { showCategory, goTo } = useStore()
  const link = 'line-link text-left text-[14px] text-ivory/70 transition-colors hover:text-champagne'
  const head = 'eyebrow mb-6 text-[10.5px] text-champagne'
  return (
    <footer id="contact" className="bg-ink text-ivory">
      <Newsletter />
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <img src={publicUrl('/logo-gold.webp')} alt="SHIFRA WORLD" width={720} height={718} loading="lazy" className="h-44 w-auto md:h-52" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">Sarees, imitation jewellery and Korean hair accessories — curated for every occasion.</p>
        </div>
        <nav aria-label="Explore">
          <p className={head}>Explore</p>
          <ul className="space-y-3.5">
            {EXPLORE.map((e) => (
              <li key={e.label}>
                <button type="button" className={link} onClick={() => (e.cat ? showCategory(e.cat) : goTo(e.id!))}>
                  {e.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Collections">
          <p className={head}>Collections</p>
          <ul className="space-y-3.5">
            {COLLECTIONS.map((c) => (
              <li key={c.label}>
                <button type="button" className={link} onClick={() => showCategory(c.cat, c.filter)}>
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={head}>Get in Touch</p>
          <ul className="space-y-4 text-[14px]">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-3 text-ivory/80 hover:text-champagne">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-plum">
                  <Phone size={16} strokeWidth={1.5} />
                </span>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-ivory/80 hover:text-champagne">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-plum">
                  <Instagram size={16} strokeWidth={1.5} />
                </span>
                @shifraworld
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-ivory/80 hover:text-champagne">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-plum">
                  <MessageCircle size={16} strokeWidth={1.5} />
                </span>
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col gap-2 py-6 pr-20 text-xs text-ivory/45 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} SHIFRA WORLD. All rights reserved.</p>
          <p>Demo storefront — products, prices and testimonials shown are sample content.</p>
        </div>
      </div>
    </footer>
  )
}
