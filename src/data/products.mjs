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
    name: "Mesa patas pino",
    price: 8500,
    image: "/images/mesa_patas_pino.jpg",
    images: [
      "/images/mesa_patas_pino.jpg",
      "/images/mesa_patas_pino2.jpg"
    ],
    description: "Mesa de parota con patas de pino, elegante y resistente.",
    detailedDescription: "Esta mesa combina la solidez de la parota con las patas de pino, ofreciendo un diseño contemporáneo y robusto. Ideal para comedores modernos y espacios con estilo.",
    features: [
      "Tablero de parota maciza",
      "Patas de pino reforzadas",
      "Diseño elegante",
      "Acabado natural"
    ],
    dimensions: "200cm x 100cm x 75cm",
    weight: "75 kg",
    stock: 2,
    rating: 5.0
  },
  {
    id: 5,
    name: "Mesa de Comedor Parota Extensible",
    price: 5200,
    image: "/images/mesa_extensible.jpg",
    images: [
      "/images/mesa_extensible.jpg",
      "/images/mesa_extensible_2.jpg",
      "/images/mesa_extensible_3.jpg"
    ],
    video: "/videos/mesa_extensible.mp4",
    description: "Mesa extensible de parota para cenas familiares grandes.",
    detailedDescription: "Mesa de comedor extensible con acabado natural. Ideal para reuniones familiares, su diseño permite adaptarse a espacios pequeños y ampliarse cuando necesitas más lugar. Incluye video de presentación para mostrar su funcionamiento y estilo.",
    features: [
      "Mecanismo extensible fácil de usar",
      "Parota natural con acabado protector",
      "Capacidad para hasta 10 personas",
      "Diseño elegante y resistente",
      "Perfecta para espacios flexibles"
    ],
    dimensions: "180-240cm x 100cm x 75cm",
    weight: "90 kg",
    stock: 4,
    rating: 4.9,
    featured: true
  },
  {
    id: 6,
    name: "Mesa Auxiliar Parota con Cajón",
    price: 1950,
    image: "/images/mesa_auxiliar_cajon.jpg",
    images: [
      "/images/mesa_auxiliar_cajon.jpg",
      "/images/mesa_auxiliar_cajon_2.jpg"
    ],
    description: "Mesa auxiliar de parota con cajón integrado para almacenamiento.",
    detailedDescription: "Diseñada para salas, recámaras o espacios de lectura, esta mesa auxiliar incluye un cajón discreto que ayuda a mantener el orden sin sacrificar el estilo natural de la parota.",
    features: [
      "Cajón integrado",
      "Acabado natural resistente",
      "Tamaño compacto",
      "Diseño versátil para cualquier habitación"
    ],
    dimensions: "80cm x 45cm x 60cm",
    weight: "28 kg",
    stock: 6,
    rating: 4.8
  },
  {
    id: 7,
    name: "Mesa de Parota para Terraza Exterior",
    price: 4100,
    image: "/images/mesa_terraza.jpg",
    images: [
      "/images/mesa_terraza.jpg",
      "/images/mesa_terraza_2.jpg",
      "/images/mesa_terraza_3.jpg"
    ],
    description: "Mesa de parota resistente para terraza y espacios al aire libre.",
    detailedDescription: "Perfecta para desayunos o comidas al aire libre, esta mesa de parota está tratada para resistir mejor la humedad y ofrecer una apariencia natural impecable.",
    features: [
      "Tratamiento para exteriores",
      "Parota resistente",
      "Diseño para terraza y jardín",
      "Fácil de limpiar"
    ],
    dimensions: "150cm x 85cm x 75cm",
    weight: "55 kg",
    stock: 3,
    rating: 4.7
  }
];