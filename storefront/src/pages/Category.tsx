import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Category() {
  const params = useParams()
  const categoryName = params.name ? decodeURIComponent(params.name) : ''
  const items = useMemo(() => PRODUCTS.filter((p) => p.category === categoryName), [categoryName])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <Breadcrumbs items={[{ label: 'Catégories', to: '/categories' }, { label: categoryName }]} />
      <h1 className="heading text-3xl font-semibold mt-4">{categoryName}</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <a key={p.id} href={`/produit/${p.id}`} className="card group">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h5 className="font-medium">{p.name}</h5>
              <p className="text-sm text-gray-500">{p.ref}</p>
              <div className="mt-2 text-lg font-semibold">{p.price.toFixed(2)}€</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

