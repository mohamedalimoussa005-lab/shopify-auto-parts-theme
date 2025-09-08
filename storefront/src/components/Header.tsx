import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Catégories', to: '/categories' },
  { label: 'Marques', to: '/marques' },
  { label: 'Promotions', to: '/promotions' },
  { label: 'Blog / Conseils', to: '/blog' },
]

const sampleData = [
  'Plaquettes de frein',
  'Disques de frein',
  'Filtre à huile',
  'Alternateur',
  'Pompe à eau',
  'Amortisseur',
  'Échappement',
]

export default function Header() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return sampleData.filter((s) => s.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  return (
    <header className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">
            <Bars3Icon className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white font-bold">A</div>
            <span className="heading text-xl font-semibold text-primary">AutoParts</span>
          </Link>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              placeholder="Recherchez par modèle, marque ou référence"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-card overflow-hidden">
                {suggestions.map((s) => (
                  <button key={s} className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((n) => (
              <Link key={n.label} to={n.to} className="text-sm font-medium hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link to="/favoris" className="p-2 hover:text-accent" aria-label="Favoris">
              <HeartIcon className="w-6 h-6" />
            </Link>
            <Link to="/compte" className="p-2 hover:text-primary" aria-label="Compte">
              <UserIcon className="w-6 h-6" />
            </Link>
            <Link to="/panier" className="p-2 hover:text-primary" aria-label="Panier">
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog onClose={setMobileOpen} className="relative z-50 lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-80 max-w-[80%] bg-white h-full shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white font-bold">A</div>
                    <span className="heading text-lg font-semibold text-primary">AutoParts</span>
                  </Link>
                  <button className="p-2" onClick={() => setMobileOpen(false)} aria-label="Fermer">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full rounded-full border border-gray-300 pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      placeholder="Recherchez par modèle, marque ou référence"
                    />
                  </div>
                  <div className="mt-4 grid gap-2">
                    {navItems.map((n) => (
                      <Link key={n.label} to={n.to} className="px-3 py-2 rounded-md hover:bg-gray-50">
                        {n.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  )
}

