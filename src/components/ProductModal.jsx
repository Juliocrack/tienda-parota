// ProductModal.jsx
// Aquí va el componente para mostrar el modal de detalles del producto.
import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';

const ProductModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [imageIndex, setImageIndex] = useState(0);
  // Asegurarse de que la primera imagen sea la que se usa como preview (product.image)
  // y luego agregar el resto de product.images sin duplicados.
  const productImages = (() => {
    const imgs = [];
    if (product.image) imgs.push(product.image);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (!imgs.includes(img)) imgs.push(img);
      });
    }
    return imgs.length ? imgs : [product.image];
  })();
  
  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 z-10 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Carrusel de imágenes */}
          <div className="relative bg-gray-50">
            <img 
              src={productImages[imageIndex]} 
              alt={`${product.name} - Imagen ${imageIndex + 1}`} 
              className="w-full h-96 object-contain p-6" 
            />
            
            {/* Controles del carrusel si hay más de una imagen */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Indicadores de imágenes */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === imageIndex ? 'bg-amber-600 w-6' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Miniaturas de imágenes */}
          {productImages.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === imageIndex ? 'border-amber-600' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-500">(Calificación promedio)</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
          
          <div className="text-4xl font-bold text-green-600 mb-6">
            ${product.price.toLocaleString('es-MX')}
          </div>
          
          {/* Descripción breve */}
          <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
          
          {/* Descripción detallada */}
          {product.detailedDescription && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Descripción Detallada</h3>
              <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
            </div>
          )}
          
          {/* Características */}
          {product.features && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Características</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Especificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <div className="text-sm text-gray-600 mb-1">Dimensiones</div>
              <div className="font-semibold">{product.dimensions}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Peso</div>
              <div className="font-semibold">{product.weight}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Stock Disponible</div>
              <div className="font-semibold text-green-600">{product.stock} unidades</div>
            </div>
          </div>
          
          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
              className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
                onBuyNow();
              }}
              disabled={product.stock === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;