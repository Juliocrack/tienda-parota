import React, { useState, useEffect } from 'react';
import { Check, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';

const Home = ({ products, loading, onNavigate, onAddToCart, onViewDetails }) => {
  const featuredProducts = loading ? [] : products.filter((product) => product.featured);
  const carouselProducts = loading ? [] : featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : products.slice(0, 4);

  // Estado para el slider de fotos
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Imágenes del slider - puedes reemplazar estas URLs con tus propias imágenes
  const heroImages = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop'
  ];

  // Auto-scroll del slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Funciones para navegar el slider
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div>
      {/* Hero Section con Slider de Fotos */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Slider de imágenes */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <img 
                src={image} 
                alt={`Mesa de Parota ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Contenido superpuesto */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mesas de Parota
              <span className="block text-amber-300">Auténticas</span>
            </h2>
            <button
              onClick={() => onNavigate('products')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105"
            >
              Ver Colección
            </button>
          </div>
        </div>

        {/* Botones de navegación del slider */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores del slider */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-amber-500 w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Productos Destacados
          </h3>
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-700">Cargando productos...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Colección Destacada</h3>
          <ProductCarousel
            products={carouselProducts}
            onViewDetails={onViewDetails}
            onAddToCart={onAddToCart}
            autoScrollInterval={5000}
          />
        </div>
      </section>

      <section className="bg-white/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir nuestras mesas?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">100% Parota Auténtica</h4>
              <p className="text-gray-600">
                Madera noble mexicana seleccionada cuidadosamente por su calidad y belleza natural.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Artesanía Experta</h4>
              <p className="text-gray-600">
                Cada pieza es trabajada por artesanos con décadas de experiencia en carpintería fina.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Envío Seguro</h4>
              <p className="text-gray-600">
                Empacado especializado y envío asegurado para que tu mesa llegue en perfectas condiciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;