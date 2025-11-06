import React, { useState } from 'react';
import { Check } from 'lucide-react';
import ShippingCalculator from '../components/ShippingCalculator';

const Checkout = ({ cart, getTotalPrice, onOrderComplete }) => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'transfer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!shippingInfo) {
      alert('Por favor selecciona una opción de envío');
      return;
    }
    
    setOrderComplete(true);
    onOrderComplete();
    setTimeout(() => {
      setOrderComplete(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleShippingSelected = (shippingOption) => {
    if (shippingOption) {
      setShippingCost(shippingOption.totalPrice);
      setShippingInfo(shippingOption);
    } else {
      setShippingCost(0);
      setShippingInfo(null);
    }
  };

  const getFinalTotal = () => {
    return getTotalPrice() + shippingCost;
  };

  // ... resto del componente con el JSX actualizado
  
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ... todos tus campos del formulario ... */}
              
              {/* AGREGAR AQUÍ EL CALCULADOR DE ENVÍO */}
              <ShippingCalculator
                cart={cart}
                postalCode={formData.postalCode}
                onShippingSelected={handleShippingSelected}
              />
              
              <button
                type="submit"
                disabled={!shippingInfo}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold mt-6"
              >
                Confirmar Pedido
              </button>
            </form>
          </div>

          <div>
            {/* Resumen con envío */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
              
              {/* Productos */}
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
              
              {/* Totales */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toLocaleString('es-MX')}</span>
                </div>
                
                {shippingInfo ? (
                  <div className="flex justify-between text-lg">
                    <div>
                      <div>Envío:</div>
                      <div className="text-xs text-gray-500">{shippingInfo.providerName}</div>
                    </div>
                    <span>${shippingCost.toLocaleString('es-MX')}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-lg text-gray-500">
                    <span>Envío:</span>
                    <span>Por calcular</span>
                  </div>
                )}
                
                <div className="flex justify-between text-2xl font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-green-600">${getFinalTotal().toLocaleString('es-MX')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;