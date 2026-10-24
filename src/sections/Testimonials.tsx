import { Quote, Star } from 'lucide-react'
import { Carousel } from '../components/Carousel'
import { SectionHeading } from '../components/ui'
import { TESTIMONIALS } from '../data/content'

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="relative isolate overflow-hidden bg-royal py-20 text-ivory md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#6a3596_0%,#512674_40%,#210f31_100%)]" />
      <Quote aria-hidden="true" strokeWidth={0.6} className="absolute -top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 text-gold/10" />

      <div className="shell">
        <SectionHeading id="reviews-title" dark eyebrow="Kind Words" title="Words From Our Customers" />
        <p className="mx-auto mt-4 max-w-md text-center text-xs leading-relaxed text-ivory/55">
          Sample testimonials for this demo — to be replaced with verified customer reviews.
        </p>
        <div className="mt-12 md:mt-14">
          <Carousel dark dots label="Customer testimonials" itemClass="w-[86%] sm:w-[60%] lg:w-[calc((100%-3rem)/3)]">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex h-full flex-col border border-ivory/15 bg-ivory/[0.06] p-8 backdrop-blur-md transition-colors duration-500 hover:border-gold/50 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-gold" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} className="fill-gold" />
                    ))}
                  </div>
                  <span className="eyebrow rounded-full border border-ivory/20 px-2.5 py-1 text-[8.5px] text-ivory/60">Sample review</span>
                </div>
                <blockquote className="mt-6 flex-1 font-serif text-[1.45rem] leading-snug text-ivory/95 italic">“{t.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-ivory/10 pt-6">
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 font-serif text-lg text-champagne">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-ivory/55">{t.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
