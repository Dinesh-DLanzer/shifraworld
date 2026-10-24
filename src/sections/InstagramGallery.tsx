import { Instagram } from 'lucide-react'
import { Img, SectionHeading } from '../components/ui'
import { GALLERY, INSTAGRAM_URL } from '../data/content'

export function InstagramGallery() {
  return (
    <section aria-labelledby="insta-title" className="bg-ivory py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="insta-title" eyebrow="@shifraworld" title="Follow Our World of Elegance" subtitle="Styling inspiration, new pieces and the little details we love." />
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {GALLERY.map((g, n) => (
            <a
              key={g.image}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${g.alt} — open @shifraworld on Instagram`}
              className={`reveal ${n % 3 ? `reveal-delay-${n % 3}` : ''} group relative block aspect-square overflow-hidden bg-plum`}
            >
              <Img src={g.image} w={500} hw={1} sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw" alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-royal/75 via-plum/45 to-gold/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Instagram size={30} strokeWidth={1.3} className="text-ivory" />
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-mist">Curated preview images — visit Instagram for our latest posts.</p>
        <div className="mt-10 text-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-plum magnetic">
            <Instagram size={16} strokeWidth={1.6} /> Follow @shifraworld
          </a>
        </div>
      </div>
    </section>
  )
}
