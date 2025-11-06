// Products.jsx
// Aquí va la vista de listado de productos.
import React from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ products, onAddToCart, onViewDetails }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Nuestra Colección
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Descubre todas nuestras mesas de parota disponibles
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;