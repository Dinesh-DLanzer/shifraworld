import { Carousel } from '../components/Carousel'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/ui'
import { tagged } from '../data/catalog'

export function BestSellers() {
  return (
    <section id="best-sellers" aria-labelledby="best-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading id="best-title" eyebrow="Popular Picks" title="Loved for a Reason" subtitle="Featured favourites from across our sarees, jewellery and hair accessories." />
        <div className="mt-12 md:mt-16">
          <Carousel label="Popular picks">
            {tagged('featured')
              .slice(0, 8)
              .map((p) => (
                <ProductCard key={p.id} product={p} showCategory />
              ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
