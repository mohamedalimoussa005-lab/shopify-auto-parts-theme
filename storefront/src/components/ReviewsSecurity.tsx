export default function ReviewsSecurity() {
  return (
    <section className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card p-6">
        <div className="flex items-center gap-2 text-accent text-lg">★★★★★</div>
        <p className="mt-2 text-gray-700">
          Excellent service et pièces à haute qualité. Je recommande ce site !
        </p>
        <p className="mt-2 text-sm text-gray-500">— Jean M.</p>
      </div>
      <div className="card p-6">
        <h4 className="heading text-xl font-semibold">Paiement sécurisé</h4>
        <p className="mt-2 text-gray-700">Cartes, PayPal, 3D Secure.</p>
        <div className="mt-4 flex gap-2">
          <div className="w-12 h-8 bg-gray-200 rounded" />
          <div className="w-12 h-8 bg-gray-200 rounded" />
          <div className="w-12 h-8 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="card p-6">
        <h4 className="heading text-xl font-semibold">Livraison garantie</h4>
        <p className="mt-2 text-gray-700">Rapide, suivi, retours faciles.</p>
        <div className="mt-4 flex gap-2">
          <div className="w-16 h-10 bg-gray-200 rounded" />
          <div className="w-16 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  )
}

