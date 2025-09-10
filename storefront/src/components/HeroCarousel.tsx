import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'

const slides = [
  {
    title: '-20% sur les plaquettes de frein',
    subtitle: 'Qualité constructeur au meilleur prix',
    cta: 'Achetez maintenant',
    image:
      'https://images.unsplash.com/photo-1616406432338-6b0f2d88d56a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Nouveaux produits',
    subtitle: 'Les dernières pièces compatibles avec votre véhicule',
    cta: 'Voir la collection',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Produits phares',
    subtitle: 'Sélection approuvée par nos clients',
    cta: 'Découvrir',
    image:
      'https://images.unsplash.com/photo-1556316918-8fe3623f8974?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function HeroCarousel() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden shadow-card"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]">
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="text-white max-w-xl">
                  <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold">{s.title}</h2>
                  <p className="mt-4 text-white/90 text-lg">{s.subtitle}</p>
                  <div className="mt-6 flex gap-3">
                    <Link to="/promotions" className="btn-accent">{s.cta}</Link>
                    <Link to="/catalogue" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">Voir le catalogue</Link>
                  </div>
                  <p className="mt-6 text-sm text-white/80">Livraison rapide | Garantie constructeur | Paiement sécurisé</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

