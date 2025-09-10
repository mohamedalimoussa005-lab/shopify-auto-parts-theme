export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h5 className="font-semibold mb-3">Liens rapides</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Aide</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Retours</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Réseaux sociaux</h5>
          <div className="flex gap-3 text-sm text-gray-600">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">X</a>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h5 className="font-semibold mb-3">Newsletter</h5>
          <div className="flex gap-2">
            <input className="flex-1 border rounded-md px-3 py-2" placeholder="Adresse email" />
            <button className="btn-primary">S’inscrire</button>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Légal</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">CGV</a></li>
            <li><a href="#">Confidentialité</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} AutoParts. Tous droits réservés.</div>
    </footer>
  )
}

