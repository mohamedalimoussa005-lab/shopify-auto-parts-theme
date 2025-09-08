import Header from './components/Header'
import HeroCarousel from './components/HeroCarousel'
import FeaturedProducts from './components/FeaturedProducts'
import Categories from './components/Categories'
import ReviewsSecurity from './components/ReviewsSecurity'
import Footer from './components/Footer'
import FloatingHelp from './components/FloatingHelp'
import Breadcrumbs from './components/Breadcrumbs'

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          <Breadcrumbs items={[]} />
          <HeroCarousel />
          <FeaturedProducts />
          <Categories />
          <ReviewsSecurity />
        </div>
      </main>
      <Footer />
      <FloatingHelp />
    </div>
  )
}

export default App
