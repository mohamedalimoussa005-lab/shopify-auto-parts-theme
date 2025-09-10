import HeroCarousel from '../components/HeroCarousel'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import ReviewsSecurity from '../components/ReviewsSecurity'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <Breadcrumbs items={[]} />
      <HeroCarousel />
      <FeaturedProducts />
      <Categories />
      <ReviewsSecurity />
    </div>
  )
}

