import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type CartItem = { id: string; qty: number }

type ShopState = {
  cart: CartItem[]
  favorites: string[]
  addToCart: (id: string, qty?: number) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  cartQty: number
}

const ShopContext = createContext<ShopState | undefined>(undefined)

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])
  return [value, setValue] as const
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('shop:cart', [])
  const [favorites, setFavorites] = useLocalStorage<string[]>('shop:favorites', [])

  const addToCart = (id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id, qty }]
    })
  }

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id))
  const updateQty = (id: string, qty: number) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const isFavorite = (id: string) => favorites.includes(id)
  const cartQty = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart])

  const value: ShopState = { cart, favorites, addToCart, removeFromCart, updateQty, toggleFavorite, isFavorite, cartQty }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}

