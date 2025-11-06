// Footer.jsx
// Aquí va el componente de pie de página de la tienda online.
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mesas de Parota</h3>
              </div>
            </div>
            <p className="text-amber-100 text-sm">
              Artesanía mexicana auténtica. Cada mesa cuenta una historia única.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-amber-100">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#productos" className="hover:text-white transition-colors">Productos</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3 text-amber-100">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+52 55 12353475</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">saiasijulio07@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-sm">San Vicente Chicoloapan<br />Estado de México</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div>
            <h4 className="font-bold text-lg mb-4">Síguenos</h4>
            <p className="text-amber-100 text-sm mb-4">
              Síguenos en nuestras redes sociales para ver nuestras últimas creaciones.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-700 p-2 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-700 p-2 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-700 p-2 rounded-full transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-amber-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-amber-100 text-sm">
            <p>&copy; 2024 Mesas de Parota. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <span>|</span>
              <a href="#terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;