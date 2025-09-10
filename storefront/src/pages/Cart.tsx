import { useMemo } from 'react'
import { useShop } from '../context/ShopContext'
import { PRODUCTS } from '../data/products'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useShop()
  const items = useMemo(() => cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id)! })), [cart])
  const subtotal = items.reduce((sum, i) => sum + i.qty * (i.product?.price ?? 0), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <Breadcrumbs items={[{ label: 'Panier' }]} />
      <h1 className="heading text-3xl font-semibold mt-4">Votre panier</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.id} className="card p-4 flex gap-4 items-center">
              <img src={i.product.image} alt={i.product.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{i.product.name}</div>
                <div className="text-sm text-gray-500">{i.product.ref}</div>
                <div className="mt-2 text-lg font-semibold">{i.product.price.toFixed(2)}€</div>
              </div>
              <input type="number" min={1} value={i.qty} onChange={(e) => updateQty(i.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
              <button className="text-red-600" onClick={() => removeFromCart(i.id)}>Supprimer</button>
            </div>
          ))}
        </div>
        <aside className="card p-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <button className="btn-accent w-full mt-4">Passer la commande</button>
        </aside>
      </div>
    </div>
  )
}

