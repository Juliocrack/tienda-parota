// Home.jsx
// Aquí va la vista principal de inicio de la tienda online.
import React from 'react';
import { Check, Star, MapPin } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = ({ products, onNavigate, onAddToCart, onViewDetails }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-24">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Mesas de Parota
            <span className="block text-amber-300">Auténticas</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Cada mesa cuenta una historia. Madera noble mexicana trabajada por artesanos expertos.
            Piezas únicas que transforman tu hogar.
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105"
          >
            Ver Colección
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Productos Destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
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