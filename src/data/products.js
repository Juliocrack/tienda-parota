// products.js
// Aquí puedes definir y exportar el arreglo de productos de la tienda.
export const products = [
  {
    id: 1,
    name: "Mesa de Parota Rústica Cristal Pequeña",
    price: 3800,
    image: "/images/mesa_cristal.jpg",
    images: [
      "images/mesa_cristal_3.jpg",
      "images/mesa_cristal_2.jpg",
      "images/mesa_cristal_4.jpg",
      "images/mesa_cristal_5.jpg",
      "images/mesa_cristal_6.jpg"
    ],
    description: "Mesa de parota maciza con acabado natural. Perfecta para comedor principal.",
    detailedDescription: "Esta hermosa mesa de parota fue cuidadosamente seleccionada y trabajada por artesanos expertos. La madera de parota es conocida por su durabilidad excepcional y sus vetas naturales únicas que hacen de cada pieza una obra de arte irrepetible. El acabado natural resalta la belleza de la madera mientras la protege para uso diario. Ideal para reuniones familiares y cenas especiales.",
    features: [
      "Madera 100% parota maciza",
      "Acabado natural con barniz protector",
      "Vetas únicas e irrepetibles",
      "Resistente y duradera",
      "Capacidad para 8-10 personas",
      "Hecha a mano por artesanos"
    ],
    dimensions: "200cm x 100cm x 75cm",
    weight: "85 kg",
    stock: 3,
    rating: 4.8
  },
  {
    id: 2,
    name: "Mesa de Parota Moderna Mediana Tololoche",
    price: 2300,
    image: "/images/mesa_tololoche.jpg",
    images: [
      "images/mesa_tololoche_2.jpg",
      "images/mesa_tololoche_3.jpg",
      "images/mesa_tololoche_4.jpg"
    ],
    description: "Mesa de parota con diseño contemporáneo y patas metálicas.",
    detailedDescription: "Fusión perfecta entre la calidez de la madera de parota y el diseño moderno. Las patas metálicas aportan un toque industrial elegante, mientras que la superficie de parota mantiene la esencia natural. Perfecta para espacios contemporáneos que buscan ese equilibrio entre modernidad y naturaleza.",
    features: [
      "Tablero de parota maciza",
      "Patas de acero industrial",
      "Diseño contemporáneo",
      "Fácil de limpiar",
      "Capacidad para 6-8 personas"
    ],
    dimensions: "160cm x 90cm x 75cm",
    weight: "65 kg",
    stock: 5,
    rating: 4.9
  },
  {
    id: 3,
    name: "Mesa de Centro Parota Mediana/Grande",
    price: 4500,
    image:"/images/mesa_mediana_ovalada.jpg",
    images: [
      "images/mesa_mediana_ovalada_2.jpg",
      "images/mesa_mediana_ovalada_3.jpg",
      "images/mesa_mediana_ovalada_4.jpg"
    ],
    description: "Mesa de centro en parota natural, ideal para sala de estar.",
    detailedDescription: "Elegante mesa de centro que combina funcionalidad y belleza natural. Su tamaño compacto la hace perfecta para salas de estar modernas.",
    features: [
      "Parota natural",
      "Tamaño ideal para salas",
      "Acabado protector",
      "Diseño versátil"
    ],
    dimensions: "120cm x 60cm x 45cm",
    weight: "35 kg",
    stock: 8,
    rating: 4.7
  },
  {
    id: 4,
    name: "Mesa de Parota Guitarra",
    price: 2800,
    image: "/images/mesa_guitarra.jpg",
    images: [
      "images/mesa_guitarra_2.jpg",
      "images/mesa_guitarra_3.jpg",
    ],
    description: "Mesa circular de parota perfecta para espacios acogedores.",
    detailedDescription: "El diseño circular fomenta la conversación y crea un ambiente acogedor. Perfecta para comedores íntimos.",
    features: [
      "Diseño circular único",
      "Parota de alta calidad",
      "Favorece la convivencia",
      "Base sólida y estable"
    ],
    dimensions: "140cm diámetro x 75cm",
    weight: "70 kg",
    // stock: 2,
    rating: 5.0
  }
  // {
  //   id: 5,
  //   name: "Mesa de Escritorio Parota",
  //   price: 6800,
  //   image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop",
  //   images: [
  //     "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop"
  //   ],
  //   description: "Mesa de escritorio en parota con cajones laterales.",
  //   detailedDescription: "Espacio de trabajo funcional con el toque cálido de la parota. Incluye almacenamiento integrado.",
  //   features: [
  //     "Con cajones de almacenamiento",
  //     "Superficie amplia de trabajo",
  //     "Parota resistente",
  //     "Ideal para home office"
  //   ],
  //   dimensions: "150cm x 70cm x 75cm", 
  //   weight: "45 kg",
  //   stock: 4,
  //   rating: 4.6
  // },
  // {
  //   id: 6,
  //   name: "Mesa de Parota XL Premium",
  //   price: 18500,
  //   image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&brightness=1.1",
  //   images: [
  //     "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&brightness=1.1"
  //   ],
  //   description: "Mesa extra grande de parota premium con acabado especial.",
  //   detailedDescription: "Nuestra pieza más exclusiva. Selección premium de parota con las vetas más hermosas y acabado de lujo.",
  //   features: [
  //     "Parota premium seleccionada",
  //     "Tamaño extra grande",
  //     "Acabado de lujo",
  //     "Capacidad para 12+ personas",
  //     "Pieza única"
  //   ],
  //   dimensions: "250cm x 120cm x 75cm",
  //   weight: "120 kg",
  //   stock: 1,
  //   rating: 5.0
  // }
  // ,
  // {
  //   id: 7,
  //   name: "Mesa de Parota Vintage Premium",
  //   price: 14200,
  //   image: "/images/mesa_vintage_main.jpg",
  //   images: [
  //     "/images/mesa_vintage_main.jpg",
  //     "/images/mesa_vintage_2.jpg",
  //     "/images/mesa_vintage_3.jpg",
  //     "/images/mesa_vintage_4.jpg"
  //   ],
  //   description: "Mesa vintage de parota con acabado envejecido y detalle artesanal.",
  //   detailedDescription: "Mesa de parota estilo vintage, con acabado envejecido y detalles hechos a mano por artesanos. Ideal para quienes buscan una pieza con carácter y presencia en su comedor o sala.",
  //   features: [
  //     "Acabado envejecido artesanal",
  //     "Parota maciza de alta calidad",
  //     "Diseño vintage distintivo",
  //     "Patas reforzadas"
  //   ],
  //   dimensions: "180cm x 95cm x 75cm",
  //   weight: "95 kg",
  //   stock: 2,
  //   rating: 4.9
  // }
];