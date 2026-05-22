import React, { useState, useEffect } from 'react';

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
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

// Data
import { products as staticProducts } from './data/products.mjs';
import { getProducts } from './services/productService';

// Hooks
import useCart from './hooks/useCart';
import { useAdminAuth } from './hooks/useAdminAuth';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { user } = useAdminAuth();
  
  // Usar el custom hook para el carrito
  const {
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Si hay usuario admin autenticado, mostrar panel
  // Note: admin views handled in renderView to keep hooks stable

  // Cargar productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      setCargando(true);
      try {
        const apiProducts = await getProducts();
        if (apiProducts.length > 0) {
          setProducts(apiProducts);
        } else {
          setProducts(staticProducts);
        }
      } catch (error) {
        console.warn('Usando datos estáticos debido a error en API:', error);
        setProducts(staticProducts);
      } finally {
        setCargando(false);
      }
    };
    loadProducts();
  }, []);

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
            loading={cargando}
            onNavigate={setCurrentView}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
          />
        );
      
      case 'products':
        return (
          <Products
            products={products}
            loading={cargando}
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

      case 'admin':
        return user ? (
          <AdminPanel />
        ) : (
          <AdminLogin onLoginSuccess={() => setCurrentView('home')} />
        );
      
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

  // El Return del componente principal resuelto
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
