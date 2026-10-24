import { Carousel } from '../components/Carousel'
import { ProductCard } from '../components/ProductCard'
import { FilterPills, Img, SectionHeading } from '../components/ui'
import { byCategory, FILTERS } from '../data/catalog'
import { useStore } from '../store'

export function HairAccessories() {
  const { filters, setFilter } = useStore()
  const f = filters.accessories
  const list = byCategory('accessories', f)

  return (
    <section id="accessories" aria-labelledby="accessories-title" className="relative isolate overflow-hidden bg-blush py-20 md:py-28">
      <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#ecdff3] blur-3xl" />
      <div aria-hidden="true" className="absolute -right-32 -bottom-48 -z-10 h-[480px] w-[480px] rounded-full bg-[#f8e3dc] blur-3xl" />

      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="accessories-title"
            align="left"
            eyebrow="Korean Hair Accessories"
            title="The Little Things That Make a Statement"
            subtitle="Chic finishing touches for your everyday style."
          />
          <figure className="reveal reveal-delay-1 mt-10 hidden lg:block">
            <div className="aspect-[4/3] overflow-hidden">
              <Img src="1774301844178-c9ce96b76d92" w={700} hw={0.75} sizes="400px" alt="Comb, claw clips and satin scrunchies arranged on linen" className="h-full w-full object-cover" />
            </div>
            <figcaption className="eyebrow mt-3 text-[9.5px] text-gold-deep">Curated in soft pastels</figcaption>
          </figure>
        </div>

        <div className="min-w-0">
          <FilterPills label="Accessories" options={FILTERS.accessories} value={f} onChange={(v) => setFilter('accessories', v)} />
          <div className="mt-8">
            <Carousel label="Hair accessories" itemClass="w-[68%] sm:w-[42%] xl:w-[calc((100%-3rem)/3)]">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} hw={1.25} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 42vw, 68vw" />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
