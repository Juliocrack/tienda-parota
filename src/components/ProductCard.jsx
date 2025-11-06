// ProductCard.jsx
// Aquí va el componente para mostrar la tarjeta de producto individual.
import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-contain bg-gray-50 cursor-pointer p-4"
          onClick={() => onViewDetails(product)}
        />
        <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center text-sm">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          {product.rating}
        </div>
        {product.stock <= 2 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
            ¡Últimas {product.stock}!
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <div>Dimensiones: {product.dimensions}</div>
          <div>Stock disponible: {product.stock}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-green-600">
            ${product.price.toLocaleString('es-MX')}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {product.stock === 0 ? 'Sin Stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;