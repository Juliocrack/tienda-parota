import React from 'react';
import { Check, Star, MapPin } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';

const Home = ({ products, onNavigate, onAddToCart, onViewDetails }) => {
  return (
    <div>
      {/* Carrusel de productos destacados */}
      <ProductCarousel 
        products={(() => {
          const featuredProducts = products.filter((product) => product.featured)
          return featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : products.slice(0, 4)
        })()}
        onViewDetails={onViewDetails}
        onAddToCart={onAddToCart}
        autoScrollInterval={5000} // Auto-scroll cada 5 segundos
      />

      {/* Mesas de Parota Auténticas */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mesas de Parota Auténticas
            </h2>
            <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
              Cada mesa cuenta una historia. Madera noble mexicana trabajada por artesanos expertos. Piezas únicas que transforman tu hogar.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg"
            >
              Ver Colección
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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