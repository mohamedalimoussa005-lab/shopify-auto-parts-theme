import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProducts } from '../data/products'
import Breadcrumbs from '../components/Breadcrumbs'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const results = useMemo(() => searchProducts(q), [q])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <Breadcrumbs items={[{ label: 'Recherche' }]} />
      <h1 className="heading text-2xl font-semibold mt-2">Résultats pour “{q}”</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((p) => (
          <a key={p.id} href={`/produit/${p.id}`} className="card group">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h5 className="font-medium">{p.name}</h5>
              <p className="text-sm text-gray-500">{p.brand} · {p.ref}</p>
              <div className="mt-2 text-lg font-semibold">{p.price.toFixed(2)}€</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

