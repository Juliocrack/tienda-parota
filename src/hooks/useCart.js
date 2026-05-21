// useCart.js
// Aquí puedes definir un custom hook para la lógica del carrito de compras.
import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0) {
      alert('Producto agotado');
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > product.stock) {
          alert(`Solo hay ${product.stock} unidades disponibles`);
          return prev.map(item =>
            item.id === product.id 
              ? { ...item, quantity: product.stock }
              : item
          );
        }
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener cantidad de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};

export default useCart;