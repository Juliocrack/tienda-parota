// ProductCarousel.jsx
// Componente carrusel que muestra productos de forma deslizable.
// Permite navegar entre productos con flechas o botones y mostrar detalles con click.
// Soporta paginación automática y pausa al hover o al interactuar (touch/pointer) para móviles.
// Props: products (array), onViewDetails (función callback), onAddToCart (función callback),
//        autoScrollInterval (ms, default 5000) – tiempo entre transiciones automáticas.

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = ({ products = [], onViewDetails, onAddToCart, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerView, maxIndex]);

  useEffect(() => {
    if (!autoScrollInterval || autoScrollInterval <= 0 || isPaused) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [autoScrollInterval, maxIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
  };

  const pauseHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onPointerEnter: () => setIsPaused(true),
    onPointerLeave: () => setIsPaused(false),
    onTouchStart: () => setIsPaused(true),
    onTouchEnd: () => setIsPaused(false),
    onTouchCancel: () => setIsPaused(false),
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay productos disponibles en el carrusel.</p>
      </div>
    );
  }

  const totalPages = maxIndex + 1;
  const currentPageIndex = currentIndex;
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative" {...pauseHandlers}>
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
          aria-label="Producto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

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

        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
          aria-label="Producto siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
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
