import { Link } from 'react-router-dom'

const cats = [
  { name: 'Moteur', image: 'https://images.unsplash.com/photo-1619640962305-551d8ee62b6a?q=80&w=900&auto=format&fit=crop' },
  { name: 'Freins', image: 'https://images.unsplash.com/photo-1517148262263-68bfae05df57?q=80&w=900&auto=format&fit=crop' },
  { name: 'Échappement', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=900&auto=format&fit=crop' },
  { name: 'Suspension', image: 'https://images.unsplash.com/photo-1629459518269-35f25f8a69c5?q=80&w=900&auto=format&fit=crop' },
]

export default function Categories() {
  return (
    <section className="mt-12 lg:mt-16">
      <h3 className="heading text-2xl sm:text-3xl font-semibold mb-6">Catégories populaires</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cats.map((c) => (
          <Link key={c.name} to={`/categorie/${encodeURIComponent(c.name)}`} className="group card relative overflow-hidden">
            <div className="aspect-[4/3]">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-3 left-3">
              <div className="text-white heading text-lg font-semibold">{c.name}</div>
              <div className="mt-1 inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-sm">Voir tous les produits</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

