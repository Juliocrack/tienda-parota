import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Star, MapPin, Phone, Mail, Check } from 'lucide-react';

const ParotaStore = () => {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '', paymentMethod: 'transfer'
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Datos de ejemplo de mesas de parota
  const products = [
    {
      id: 1,
      name: "Mesa de Parota Rústica Grande",
      price: 12500,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop",
      description: "Mesa de parota maciza con acabado natural. Perfecta para comedor principal.",
      dimensions: "200cm x 100cm x 75cm",
      weight: "85 kg",
      stock: 3,
      rating: 4.8
    },
    {
      id: 2,
      name: "Mesa de Parota Moderna Mediana",
      price: 8900,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
      description: "Mesa de parota con diseño contemporáneo y patas metálicas.",
      dimensions: "160cm x 90cm x 75cm",
      weight: "65 kg",
      stock: 5,
      rating: 4.9
    },
    {
      id: 3,
      name: "Mesa de Centro Parota",
      price: 4500,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&sat=-20",
      description: "Mesa de centro en parota natural, ideal para sala de estar.",
      dimensions: "120cm x 60cm x 45cm",
      weight: "35 kg",
      stock: 8,
      rating: 4.7
    },
    {
      id: 4,
      name: "Mesa de Parota Circular",
      price: 10200,
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop",
      description: "Mesa circular de parota perfecta para espacios acogedores.",
      dimensions: "140cm diámetro x 75cm",
      weight: "70 kg",
      stock: 2,
      rating: 5.0
    },
    {
      id: 5,
      name: "Mesa de Escritorio Parota",
      price: 6800,
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop",
      description: "Mesa de escritorio en parota con cajones laterales.",
      dimensions: "150cm x 70cm x 75cm",
      weight: "45 kg",
      stock: 4,
      rating: 4.6
    },
    {
      id: 6,
      name: "Mesa de Parota XL Premium",
      price: 18500,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&brightness=1.1",
      description: "Mesa extra grande de parota premium con acabado especial.",
      dimensions: "250cm x 120cm x 75cm",
      weight: "120 kg",
      stock: 1,
      rating: 5.0
    }
  ];

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Aquí integrarías con tu sistema de pagos real
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => {
      setOrderComplete(false);
      setCurrentView('home');
    }, 5000);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => setSelectedProduct(product)}
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
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-500">(Calificación promedio)</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            <div><strong>Dimensiones:</strong> {product.dimensions}</div>
            <div><strong>Peso:</strong> {product.weight}</div>
            <div><strong>Material:</strong> Parota maciza</div>
            <div><strong>Stock:</strong> {product.stock} disponibles</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-green-600">
              ${product.price.toLocaleString('es-MX')}
            </div>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setCurrentView('home')}
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
                onClick={() => setCurrentView('home')}
                className={`font-semibold transition-colors ${currentView === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
              >
                Inicio
              </button>
              <button 
                onClick={() => setCurrentView('products')}
                className={`font-semibold transition-colors ${currentView === 'products' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
              >
                Productos
              </button>
              <button 
                onClick={() => setCurrentView('contact')}
                className={`font-semibold transition-colors ${currentView === 'contact' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
              >
                Contacto
              </button>
            </nav>

            <button
              onClick={() => setCurrentView('cart')}
              className="relative bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Home View */}
      {currentView === 'home' && (
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
                onClick={() => setCurrentView('products')}
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
                  <ProductCard key={product.id} product={product} />
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
                  <p className="text-gray-600">Madera noble mexicana seleccionada cuidadosamente por su calidad y belleza natural.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">Artesanía Experta</h4>
                  <p className="text-gray-600">Cada pieza es trabajada por artesanos con décadas de experiencia en carpintería fina.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">Envío Seguro</h4>
                  <p className="text-gray-600">Empacado especializado y envío asegurado para que tu mesa llegue en perfectas condiciones.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Products View */}
      {currentView === 'products' && (
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart View */}
      {currentView === 'cart' && (
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Carrito de Compras</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">Tu carrito está vacío</p>
                <button
                  onClick={() => setCurrentView('products')}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600">${item.price.toLocaleString('es-MX')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-full p-1"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                  <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString('es-MX')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>${getTotalPrice().toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('checkout')}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold mt-4"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout View */}
      {currentView === 'checkout' && (
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h2>
            
            {orderComplete ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">¡Pedido Confirmado!</h3>
                <p className="text-green-700 mb-4">
                  Gracias por tu compra. Te contactaremos pronto para coordinar la entrega.
                </p>
                <p className="text-sm text-green-600">
                  Serás redirigido al inicio en unos segundos...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm(prev => ({...prev, name: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm(prev => ({...prev, email: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm(prev => ({...prev, phone: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm(prev => ({...prev, address: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm(prev => ({...prev, city: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.postalCode}
                          onChange={(e) => setCheckoutForm(prev => ({...prev, postalCode: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Método de Pago *
                      </label>
                      <select
                        value={checkoutForm.paymentMethod}
                        onChange={(e) => setCheckoutForm(prev => ({...prev, paymentMethod: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="transfer">Transferencia Bancaria</option>
                        <option value="cash">Efectivo (Contra Entrega)</option>
                        <option value="card">Tarjeta de Crédito/Débito</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold mt-6"
                    >
                      Confirmar Pedido
                    </button>
                  </form>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
                    <div className="space-y-3 mb-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-gray-600">Cantidad: {item.quantity}</div>
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toLocaleString('es-MX')}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>${getTotalPrice().toLocaleString('es-MX')}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Información Importante:</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Tiempo de entrega: 7-15 días hábiles</li>
                        <li>• Incluye empaque especializado</li>
                        <li>• Garantía de 2 años</li>
                        <li>• Te contactaremos para coordinar la entrega</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact View */}
      {currentView === 'contact' && (
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contacto</h2>
            <p className="text-gray-600 mb-6">¿Tienes dudas o quieres cotizar una mesa personalizada? Contáctanos:</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700"><Phone className="w-5 h-5" /> <span>+52 33 1234 5678</span></div>
              <div className="flex items-center gap-3 text-gray-700"><Mail className="w-5 h-5" /> <span>contacto@parotamesas.com</span></div>
              <div className="flex items-center gap-3 text-gray-700"><MapPin className="w-5 h-5" /> <span>Guadalajara, Jalisco, México</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParotaStore;
