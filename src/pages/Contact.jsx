import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contacto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">¡Hablemos!</h3>
            <p className="text-gray-600 mb-6">
              ¿Tienes alguna pregunta sobre nuestras mesas de parota? ¿Necesitas medidas especiales 
              o un diseño personalizado? Estamos aquí para ayudarte.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-600 rounded-full p-2">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Teléfono</div>
                  <div className="text-gray-600">+52 55 12353475</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-amber-600 rounded-full p-2">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-600">saiasijulio07@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-amber-600 rounded-full p-2">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Ubicación</div>
                  <div className="text-gray-600">San Vicente Chicoloapan, Estado de México</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Horarios de Atención:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Lunes a Viernes: 9:00 AM - 7:00 PM</div>
                <div>Sábados: 9:00 AM - 5:00 PM</div>
                <div>Domingos: 10:00 AM - 3:00 PM</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Selecciona un tema</option>
                  <option value="info">Información general</option>
                  <option value="custom">Mesa personalizada</option>
                  <option value="shipping">Envío y entrega</option>
                  <option value="warranty">Garantía</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Cuéntanos qué necesitas..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 bg-amber-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Preguntas Frecuentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">¿Hacen mesas a medida?</h4>
              <p className="text-gray-600 text-sm">
                Sí, podemos crear mesas con las dimensiones exactas que necesites. 
                Contáctanos para cotización personalizada.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">¿Cuánto tiempo tarda la entrega?</h4>
              <p className="text-gray-600 text-sm">
                Entre 7-15 días hábiles para mesas en stock. Las personalizadas 
                pueden tardar 3-4 semanas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">¿Incluyen garantía?</h4>
              <p className="text-gray-600 text-sm">
                Todas nuestras mesas incluyen garantía de 1 mes contra 
                defectos de fabricación.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">¿Envían a toda la República?</h4>
              <p className="text-gray-600 text-sm">
                Sí, enviamos a todo México con empaque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;