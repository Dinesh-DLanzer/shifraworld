import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { FilterPills, SectionHeading } from '../components/ui'
import { tagged, type CategoryKey } from '../data/catalog'

const TABS: Record<string, CategoryKey | null> = { All: null, Sarees: 'sarees', Jewellery: 'jewellery', Accessories: 'accessories' }
// varied crops give the grid its editorial, masonry rhythm
const RATIOS = [1.45, 1.15, 1.3, 1.5, 1.2, 1.35]

export function NewArrivals() {
  const [tab, setTab] = useState('All')
  const list = tagged('new').filter((p) => !TABS[tab] || p.category === TABS[tab])

  return (
    <section id="new-arrivals" aria-labelledby="new-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading id="new-title" align="left" eyebrow="New Arrivals" title="Just Arrived" subtitle="Fresh drapes, adornments and finishing touches — newly added to our world." />
          <FilterPills label="Arrivals" options={Object.keys(TABS)} value={tab} onChange={setTab} />
        </div>
        <div className="mt-12 columns-2 gap-4 md:gap-6 lg:columns-4">
          {list.map((p, n) => (
            <div key={`${tab}-${p.id}`} className="mb-10 break-inside-avoid md:mb-12">
              <ProductCard product={p} hw={RATIOS[n % RATIOS.length]} showCategory className="fade-in" style={{ animationDelay: `${n * 60}ms` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
