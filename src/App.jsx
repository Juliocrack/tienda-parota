import React, { useState } from 'react';

// Components
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

// Data
import { products } from './data/products';

// Custom Hook
import useCart from './hooks/useCart';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Usar el custom hook para el carrito
  const {
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Función para completar la orden
  const handleOrderComplete = () => {
    clearCart();
    setTimeout(() => {
      setCurrentView('home');
    }, 5000);
  };

  // Renderizar la vista actual
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            products={products}
            onNavigate={setCurrentView}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
          />
        );
      
      case 'products':
        return (
          <Products
            products={products}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
          />
        );
      
      case 'cart':
        return (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onNavigate={setCurrentView}
            getTotalPrice={getTotalPrice}
          />
        );
      
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            getTotalPrice={getTotalPrice}
            onOrderComplete={handleOrderComplete}
          />
        );
      
      case 'contact':
        return <Contact />;
      
      default:
        return (
          <Home
            products={products}
            onNavigate={setCurrentView}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        cartItemsCount={getTotalItems()}
      />

      {renderView()}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onBuyNow={() => setCurrentView('cart')}
        />
      )}

      <Footer />

      <MobileNav
        currentView={currentView}
        onNavigate={setCurrentView}
        cartItemsCount={getTotalItems()}
      />
    </div>
  );
}

export default App;