// Run with: npm test
import assert from 'node:assert/strict'
import { bagCount, bagSubtotal, byCategory, FILTERS, imgUrl, PRODUCTS, searchProducts } from './catalog.ts'
import { LOOK, MEGA_MENUS } from './content.ts'

// every referenced product id exists, ids are unique, and every filter tab has stock
assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, PRODUCTS.length, 'duplicate product id')
for (const m of MEGA_MENUS) m.showcase.products.forEach((id) => assert.ok(PRODUCTS.some((p) => p.id === id), id))
for (const h of LOOK.hotspots) assert.ok(PRODUCTS.some((p) => p.id === h.productId), h.productId)
for (const [cat, tabs] of Object.entries(FILTERS)) for (const t of tabs) assert.ok(byCategory(cat as never, t).length > 0, `${cat}/${t} empty`)
for (const m of MEGA_MENUS)
  for (const c of m.columns) for (const l of c.links) if (l.filter) assert.ok(FILTERS[m.key].includes(l.filter), `${m.key}: bad filter ${l.filter}`)

// bag maths
const lines = [
  { id: 'sa-cotton-printed', variant: 'x', qty: 2 },
  { id: 'je-pearl-earrings', variant: 'y', qty: 1 },
]
assert.equal(bagCount(lines), 3)
assert.equal(bagSubtotal(lines), 1490 * 2 + 690)

// search: plural-insensitive, multi-word, US spelling
assert.ok(searchProducts('jhumkas').some((p) => p.id === 'je-oxidised-jhumkas'))
assert.ok(searchProducts('silk sarees').every((p) => p.category === 'sarees'))
assert.ok(searchProducts('jewelry').length > 0)
assert.deepEqual(searchProducts('   '), [])

// image refs
assert.equal(imgUrl('/images/a.jpg', 400), '/images/a.jpg')
assert.match(imgUrl('abc|0.5,0.7,2', 400), /w=400&h=533&crop=focalpoint&fp-x=0.5&fp-y=0.7&fp-z=2$/)

console.log('catalog checks passed')
