import Header from './components/Header'
import Footer from './components/Footer'
import FloatingHelp from './components/FloatingHelp'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie/:name" element={<Category />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/recherche" element={<SearchResults />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/favoris" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
      <FloatingHelp />
    </div>
  )
}

export default App
