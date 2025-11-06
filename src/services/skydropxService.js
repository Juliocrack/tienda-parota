import axios from 'axios';

// ⚠️ IMPORTANTE: En producción, esto debería estar en variables de entorno
const SKYDROPX_API_KEY = process.env.REACT_APP_SKYDROPX_API_KEY || 'tu_api_key_aqui';
const SKYDROPX_URL = 'https://api-demo.skydropx.com/v1'; // URL de pruebas
// Para producción usar: 'https://api.skydropx.com/v1'

const api = axios.create({
  baseURL: SKYDROPX_URL,
  headers: {
    'Authorization': `Token token=${SKYDROPX_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Calcula las tarifas de envío disponibles
 * @param {Object} destination - Información del destino
 * @param {Array} cartItems - Items en el carrito
 * @returns {Promise<Array>} Lista de opciones de envío
 */
export const calculateShippingRates = async (destination, cartItems) => {
  try {
    // Calcular peso total
    const totalWeight = cartItems.reduce((sum, item) => {
      return sum + (item.weight * item.quantity);
    }, 0);
    
    // Encontrar las dimensiones del paquete más grande
    // (En envíos múltiples, esto se puede mejorar)
    let maxLength = 0, maxWidth = 0, totalHeight = 0;
    
    cartItems.forEach(item => {
      const dims = item.dimensionsArray;
      if (dims.length > maxLength) maxLength = dims.length;
      if (dims.width > maxWidth) maxWidth = dims.width;
      totalHeight += dims.height * item.quantity; // Apilar mesas
    });

    // Preparar el paquete
    const parcel = {
      weight: totalWeight,
      distance_unit: "CM",
      mass_unit: "KG",
      height: Math.min(totalHeight, 200), // Máximo 200cm
      width: maxWidth,
      length: maxLength
    };

    console.log('Calculando envío para:', {
      destino: destination.postalCode,
      paquete: parcel
    });

    const response = await api.post('/shipments/rates', {
      zip_from: "56334", // Tu código postal (Chimalhuacán)
      zip_to: destination.postalCode,
      parcel: parcel
    });

    // Procesar las tarifas
    if (response.data && response.data.data) {
      const rates = response.data.data
        .filter(rate => rate.available) // Solo mostrar disponibles
        .map(rate => ({
          id: rate.id,
          provider: rate.provider,
          providerName: getProviderDisplayName(rate.provider),
          serviceLevelName: rate.service_level_name,
          totalPrice: parseFloat(rate.total_pricing),
          currency: rate.currency,
          estimatedDays: rate.days || 'No especificado',
          available: rate.available,
          deliveryEstimate: rate.delivery_estimate
        }))
        .sort((a, b) => a.totalPrice - b.totalPrice); // Ordenar por precio

      return rates;
    }

    return [];
  } catch (error) {
    console.error('Error calculando tarifas:', error.response?.data || error.message);
    
    // Si es error de cobertura
    if (error.response?.status === 400) {
      throw new Error('No hay cobertura para este código postal');
    }
    
    throw new Error('Error al calcular el envío. Por favor intenta de nuevo.');
  }
};

/**
 * Crea un envío y genera la guía
 * @param {Object} orderData - Datos completos de la orden
 * @returns {Promise<Object>} Información del envío creado
 */
export const createShipment = async (orderData) => {
  try {
    const response = await api.post('/shipments', {
      address_from: {
        province: "Estado de México",
        city: "Chimalhuacán",
        name: "Mesas de Parota",
        zip: "56334",
        country: "MX",
        address1: "Tu dirección completa", // ⚠️ Actualizar con tu dirección
        company: "Mesas de Parota",
        phone: "5551234567", // ⚠️ Actualizar con tu teléfono
        email: "ventas@mesasparota.mx", // ⚠️ Actualizar con tu email
        reference: "Taller de carpintería"
      },
      address_to: {
        province: orderData.state,
        city: orderData.city,
        name: orderData.customerName,
        zip: orderData.postalCode,
        country: "MX",
        address1: orderData.address,
        phone: orderData.phone,
        email: orderData.email,
        reference: orderData.reference || ''
      },
      parcels: orderData.parcels.map(parcel => ({
        weight: parcel.weight,
        distance_unit: "CM",
        mass_unit: "KG",
        height: parcel.height,
        width: parcel.width,
        length: parcel.length
      })),
      consignment_note_class_code: "53131600", // Código para muebles
      consignment_note_packaging_code: "1H1", // Empaque de madera
      shipment: {
        type: orderData.shippingType || 'parcel'
      }
    });

    return {
      success: true,
      trackingNumber: response.data.tracking_number,
      labelUrl: response.data.label_url,
      trackingUrl: response.data.tracking_url_provider,
      shipmentId: response.data.id
    };
  } catch (error) {
    console.error('Error creando envío:', error.response?.data || error.message);
    throw new Error('Error al crear la guía de envío');
  }
};

/**
 * Obtiene el estado de rastreo de un envío
 * @param {string} trackingNumber - Número de guía
 * @returns {Promise<Object>} Estado del envío
 */
export const trackShipment = async (trackingNumber) => {
  try {
    const response = await api.get(`/shipments/${trackingNumber}`);
    return {
      status: response.data.status,
      statusHistory: response.data.tracking_status,
      currentLocation: response.data.current_location
    };
  } catch (error) {
    console.error('Error rastreando envío:', error);
    throw new Error('Error al rastrear el envío');
  }
};

/**
 * Valida un código postal
 * @param {string} postalCode - Código postal a validar
 * @returns {Promise<Object>} Información del código postal
 */
export const validatePostalCode = async (postalCode) => {
  try {
    const response = await api.get(`/zip_codes/${postalCode}`);
    return {
      valid: true,
      city: response.data.city,
      state: response.data.province,
      neighborhoods: response.data.neighborhoods || []
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Código postal no válido'
    };
  }
};

// Helper: Nombres amigables de paqueterías
const getProviderDisplayName = (provider) => {
  const names = {
    'estafeta': 'Estafeta',
    'estafeta_carga': 'Estafeta Carga',
    'redpack': 'Redpack',
    'fedex': 'FedEx',
    'dhl': 'DHL Express',
    'paquetexpress': 'Paquetexpress',
    '99minutos': '99 Minutos',
    'sendex': 'Sendex',
    'carssa': 'Carssa'
  };
  return names[provider.toLowerCase()] || provider;
};

export default {
  calculateShippingRates,
  createShipment,
  trackShipment,
  validatePostalCode
};