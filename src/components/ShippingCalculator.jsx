import React, { useState, useEffect } from 'react';
import { Truck, AlertCircle, CheckCircle, Loader, Package } from 'lucide-react';
import { calculateShippingRates } from '../services/skydropxService';

const ShippingCalculator = ({ cart, postalCode, onShippingSelected }) => {
  const [loading, setLoading] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [error, setError] = useState('');
  const [calculated, setCalculated] = useState(false);

  // Auto-calcular cuando cambia el código postal (si tiene 5 dígitos)
  useEffect(() => {
    if (postalCode && postalCode.length === 5 && !calculated) {
      handleCalculate();
    }
  }, [postalCode]);

  const handleCalculate = async () => {
    if (!postalCode || postalCode.length !== 5) {
      setError('Por favor ingresa un código postal válido de 5 dígitos');
      return;
    }

    if (!cart || cart.length === 0) {
      setError('No hay productos en el carrito');
      return;
    }

    setLoading(true);
    setError('');
    setShippingOptions([]);
    setSelectedShipping(null);
    onShippingSelected(null);
    
    try {
      const destination = { postalCode };
      const rates = await calculateShippingRates(destination, cart);
      
      if (rates.length === 0) {
        setError(
          'No hay cobertura disponible para tu código postal. ' +
          'Por favor contáctanos por WhatsApp para opciones alternativas.'
        );
      } else {
        setShippingOptions(rates);
        setCalculated(true);
        
        // Auto-seleccionar la opción más económica
        if (rates.length > 0) {
          handleSelectShipping(rates[0]);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al calcular envío. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShipping = (option) => {
    setSelectedShipping(option);
    onShippingSelected(option);
  };

  const getTotalWeight = () => {
    return cart.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-8 h-8 text-amber-600 animate-spin mr-3" />
          <div>
            <p className="text-lg font-semibold">Calculando opciones de envío...</p>
            <p className="text-sm text-gray-600">Consultando paqueterías disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-semibold">Opciones de Envío</h3>
      </div>

      {/* Información del paquete */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-sm">Información del paquete:</span>
        </div>
        <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
          <div>Productos: {cart.reduce((sum, item) => sum + item.quantity, 0)}</div>
          <div>Peso total: {getTotalWeight().toFixed(1)} kg</div>
        </div>
      </div>

      {!shippingOptions.length && !error ? (
        <div>
          <p className="text-gray-600 mb-4">
            {postalCode && postalCode.length === 5 
              ? 'Haz clic en calcular para ver las opciones de envío disponibles'
              : 'Completa tu código postal para calcular el envío'
            }
          </p>
          <button
            onClick={handleCalculate}
            disabled={!postalCode || postalCode.length !== 5}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Calcular Envío
          </button>
        </div>
      ) : error ? (
        <div>
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold mb-1">No se pudo calcular el envío</p>
              <p className="text-red-700 text-sm">{error}</p>
              {error.includes('cobertura') && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-sm text-red-700 mb-2">Contacta con nosotros:</p>
                  <a 
                    href="https://wa.me/5551234567?text=Hola,%20necesito%20cotizar%20envío%20para%20mi%20pedido"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    📱 Cotizar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleCalculate}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm">
              Selecciona una opción de envío:
            </p>
            <button
              onClick={() => {
                setShippingOptions([]);
                setSelectedShipping(null);
                setCalculated(false);
                onShippingSelected(null);
              }}
              className="text-amber-600 hover:text-amber-700 text-sm font-semibold"
            >
              Recalcular
            </button>
          </div>
          
          {shippingOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelectShipping(option)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedShipping?.id === option.id
                  ? 'border-amber-600 bg-amber-50 shadow-md'
                  : 'border-gray-200 hover:border-amber-300 hover:shadow'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg">{option.providerName}</h4>
                    {selectedShipping?.id === option.id && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {index === 0 && !selectedShipping && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                        Más económico
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{option.serviceLevelName}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⏱️ {option.estimatedDays} días hábiles</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${option.totalPrice.toLocaleString('es-MX')}
                  </p>
                  <p className="text-xs text-gray-500">{option.currency}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Importante:</strong> Los tiempos de entrega son estimados y pueden variar. 
              El envío incluye seguro de cobertura básica.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;