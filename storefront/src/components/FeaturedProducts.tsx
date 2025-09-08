import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { PRODUCTS, BRANDS, CATEGORIES } from '../data/products'

export default function FeaturedProducts() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(200)

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) =>
      (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      p.price <= maxPrice
    )
  }, [selectedBrands, selectedCategories, maxPrice])

  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  return (
    <section className="mt-10 lg:mt-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="heading text-2xl sm:text-3xl font-semibold">Produits phares</h3>
        <a className="text-primary hover:underline" href="#">Voir tout</a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="card p-4 lg:col-span-1">
          <div>
            <h4 className="font-semibold">Marques</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => toggle(selectedBrands, setSelectedBrands, b)}
                  className={classNames('px-3 py-1 rounded-full border text-sm',
                    selectedBrands.includes(b) ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-gray-50')}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Catégories</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(selectedCategories, setSelectedCategories, c)}
                  className={classNames('px-3 py-1 rounded-full border text-sm',
                    selectedCategories.includes(c) ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-gray-50')}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Prix max ({maxPrice.toFixed(0)}€)</h4>
            <input type="range" min={0} max={200} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
          </div>
        </aside>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="card group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h5 className="font-medium">{p.name}</h5>
                <p className="text-sm text-gray-500">Ref. {p.ref}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold">{p.price.toFixed(2)}€</span>
                  <a className="btn-primary" href={`/produit/${p.id}`}>Voir</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

