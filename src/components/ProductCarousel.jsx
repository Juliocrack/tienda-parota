// ProductCarousel.jsx
// Componente carrusel que muestra productos de forma deslizable.
// Permite navegar entre productos con flechas o botones y mostrar detalles con click.
// Props: products (array), onViewDetails (función callback), onAddToCart (función callback)

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = ({ products = [], onViewDetails, onAddToCart, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay productos disponibles en el carrusel.</p>
      </div>
    );
  }

  const itemsPerView = 3;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // Si llegamos al final, vuelve al inicio para efecto de loop continuo
      return next > maxIndex ? 0 : next;
    });
  };

  // Auto-scroll con intervalo configurable
  useEffect(() => {
    if (autoScrollInterval && autoScrollInterval > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          return next > maxIndex ? 0 : next;
        });
      }, autoScrollInterval);

      return () => clearInterval(timer);
    }
  }, [autoScrollInterval, maxIndex]);

  // Calcula el índice de página actual para los indicadores
  // El número de páginas es cuantas posiciones diferentes de inicio podemos tener
  const totalPages = maxIndex + 1;
  const currentPageIndex = currentIndex;

  // Obtener los productos visibles en el carrusel actual
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative">
      {/* Contenedor del carrusel */}
      <div className="flex items-center gap-4">
        {/* Botón anterior */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
          aria-label="Producto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Grid de productos visibles */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-gray-50 cursor-pointer p-3"
                  onClick={() => onViewDetails && onViewDetails(product)}
                />
                <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-sm">
                  ⭐ {product.rating}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold text-green-600">
                    ${product.price.toLocaleString('es-MX')}
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart && onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  {product.stock === 0 ? 'Sin Stock' : 'Agregar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
          aria-label="Producto siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores de página */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(Math.min(idx * itemsPerView, maxIndex))}
            className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
              currentPageIndex === idx
                ? 'bg-amber-600 w-8'
                : 'bg-gray-300 w-2'
            }`}
            aria-label={`Ir a página ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
