import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { FilterPills, SectionHeading } from '../components/ui'
import { byCategory, FILTERS } from '../data/catalog'
import { useStore } from '../store'

const PREVIEW = 8

export function SareeEdit() {
  const { filters, setFilter } = useStore()
  const [expanded, setExpanded] = useState(false)
  const f = filters.sarees
  const list = byCategory('sarees', f)
  const shown = expanded || f !== 'All' ? list : list.slice(0, PREVIEW)
  const showingAll = f === 'All' && shown.length === list.length

  return (
    <section id="sarees" aria-labelledby="sarees-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading id="sarees-title" align="left" eyebrow="Sarees" title="The Saree Edit" subtitle="Tradition, reimagined for today's elegance." />
          <FilterPills
            label="Sarees"
            options={FILTERS.sarees}
            value={f}
            onChange={(v) => {
              setFilter('sarees', v)
              setExpanded(false)
            }}
          />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
          {shown.map((p, n) => (
            <ProductCard key={`${f}-${p.id}`} product={p} className="fade-in" style={{ animationDelay: `${(n % PREVIEW) * 60}ms` }} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            type="button"
            className="btn btn-outline on-light magnetic"
            onClick={() => {
              if (showingAll) return setExpanded(false)
              setFilter('sarees', 'All')
              setExpanded(true)
            }}
          >
            {showingAll ? 'Show Fewer Sarees' : 'Explore All Sarees'}
          </button>
        </div>
      </div>
    </section>
  )
}
