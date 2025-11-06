// Header.jsx
// Aquí va el componente de cabecera de la tienda online.
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = ({ currentView, onNavigate, cartItemsCount }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mesas de Parota</h1>
              <p className="text-sm text-gray-600">Artesanía mexicana auténtica</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`font-semibold transition-colors ${
                currentView === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => onNavigate('products')}
              className={`font-semibold transition-colors ${
                currentView === 'products' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              Productos
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className={`font-semibold transition-colors ${
                currentView === 'contact' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              Contacto
            </button>
          </nav>

          <button
            onClick={() => onNavigate('cart')}
            className="relative bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;