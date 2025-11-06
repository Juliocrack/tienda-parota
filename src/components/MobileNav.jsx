// MobileNav.jsx
// Aquí va el componente de navegación móvil para la tienda online.
import React from 'react';

const MobileNav = ({ currentView, onNavigate, cartItemsCount }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center py-2 ${
            currentView === 'home' ? 'text-amber-600' : 'text-gray-600'
          }`}
        >
          <div className="w-6 h-6 mb-1">🏠</div>
          <span className="text-xs">Inicio</span>
        </button>
        
        <button 
          onClick={() => onNavigate('products')}
          className={`flex flex-col items-center py-2 ${
            currentView === 'products' ? 'text-amber-600' : 'text-gray-600'
          }`}
        >
          <div className="w-6 h-6 mb-1">🪑</div>
          <span className="text-xs">Productos</span>
        </button>
        
        <button 
          onClick={() => onNavigate('cart')}
          className={`flex flex-col items-center py-2 relative ${
            currentView === 'cart' ? 'text-amber-600' : 'text-gray-600'
          }`}
        >
          <div className="w-6 h-6 mb-1">🛒</div>
          <span className="text-xs">Carrito</span>
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => onNavigate('contact')}
          className={`flex flex-col items-center py-2 ${
            currentView === 'contact' ? 'text-amber-600' : 'text-gray-600'
          }`}
        >
          <div className="w-6 h-6 mb-1">📞</div>
          <span className="text-xs">Contacto</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;