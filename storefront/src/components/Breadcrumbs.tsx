import { Link } from 'react-router-dom'

type Crumb = { label: string; to?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-600" aria-label="Fil d’Ariane">
      <ol className="flex items-center gap-2 flex-wrap">
        <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>/</span>
            {it.to ? (
              <Link to={it.to} className="hover:text-primary">{it.label}</Link>
            ) : (
              <span className="text-gray-800">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

