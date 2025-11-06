// PayPalButton.jsx
// Componente para mostrar e integrar el botón de pago de PayPal en la tienda online.
// src/components/PayPalButton.jsx
import React, { useEffect } from 'react';

const PayPalButton = ({ total, onPaymentSuccess }) => {
  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toFixed(2) // Total real del carrito
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Pago realizado por ${details.payer.name.given_name}`);
            onPaymentSuccess(); // Llama a tu función de confirmación
          });
        },
        onError: (err) => {
          console.error('Error en el pago', err);
          alert('Hubo un problema al procesar el pago.');
        }
      }).render('#paypal-button-container');
    }
  }, [total, onPaymentSuccess]);

  return (
    <div className="mt-4">
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
