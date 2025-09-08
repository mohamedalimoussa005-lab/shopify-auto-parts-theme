import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ProductDetail() {
  const { id } = useParams()
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id])
  if (!product) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <Breadcrumbs items={[{ label: product.category, to: `/categorie/${encodeURIComponent(product.category)}` }, { label: product.name }]} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="heading text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-500 mt-1">Ref. {product.ref}</p>
          <div className="mt-4 text-2xl font-bold">{product.price.toFixed(2)}€</div>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <button className="btn-primary">Ajouter au panier</button>
            <button className="btn-accent">Ajouter aux favoris</button>
          </div>
        </div>
      </div>
    </div>
  )
}

