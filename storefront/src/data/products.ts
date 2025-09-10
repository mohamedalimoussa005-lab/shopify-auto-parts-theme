export type Product = {
  id: string
  name: string
  ref: string
  price: number
  brand: string
  category: string
  image: string
  rating?: number
  description?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'oil-filter',
    name: 'Filtre à huile',
    ref: 'OF-1234',
    price: 8.99,
    brand: 'Bosch',
    category: 'Moteur',
    image:
      'https://images.unsplash.com/photo-1592853625591-141c13454e43?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    description: 'Filtration efficace et durable pour protéger votre moteur.'
  },
  {
    id: 'brake-disc',
    name: 'Disques de frein',
    ref: 'BD-5678',
    price: 49.59,
    brand: 'Brembo',
    category: 'Freins',
    image:
      'https://images.unsplash.com/photo-1517148262263-68bfae05df57?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    description: 'Disques ventilés haute performance pour un freinage optimal.'
  },
  {
    id: 'gear-knob',
    name: 'Pommeau de changement de vitesse',
    ref: 'GK-1010',
    price: 18.09,
    brand: 'Sparco',
    category: 'Intérieur',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    rating: 4.2,
    description: 'Prise en main confortable et sportive.'
  },
  {
    id: 'alternator',
    name: 'Alternateur',
    ref: 'ALT-9902',
    price: 150.0,
    brand: 'Valeo',
    category: 'Électrique',
    image:
      'https://images.unsplash.com/photo-1610420464128-2ca1be40add5?q=80&w=800&auto=format&fit=crop',
    rating: 4.4,
    description: 'Alternateur fiable pour un courant stable.'
  },
]

export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)))
export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)))

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return [] as Product[]
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q)
  )
}

