import { CatalogItem, ServiceOrder } from '../types';

export const INITIAL_CATALOG_ITEMS: CatalogItem[] = [
  // =========================================================================
  // --- CATEGORÍA MOTOCICLETAS (Especialización MotoCraft) ---
  // =========================================================================
  {
    id: 'moto-1',
    name: 'Lavado Técnico Detallado MotoCraft',
    category: 'motos',
    kind: 'service',
    priceCOP: 35000,
    durationMin: 45,
    description: 'Lavado especializado con espuma activa PH neutro Snow Foam, limpieza milimétrica de rines y radios, desengrase de basculante y secado por aire caliente comprimido para evitar gotas en componentes eléctricos.',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Cada 15 a 20 días',
    guarantee: 'Garantía Cero Rayones en tanque y protección de sensores electrónicos.',
    includes: [
      'Pre-lavado con Snow Foam PH Neutro',
      'Desengrase superficial de tijera y rines',
      'Cepillado de mordazas y discos con cepillo de cerdas suaves',
      'Secado técnico con microfibra 600 GSM + soplador de aire caliente',
      'Brillo e hidratación de llantas sin silicona resbaladiza'
    ],
    benefits: [
      'Elimina mugre adherida sin desgastar el barniz de la pintura',
      'Protege los mandos y bornes de batería contra sulfatación',
      'Acabado limpio y seguro sin riesgo de patinadas en llantas'
    ]
  },
  {
    id: 'moto-2',
    name: 'Desengrasado y Restauración de Cadena',
    category: 'motos',
    kind: 'service',
    priceCOP: 25000,
    durationMin: 30,
    description: 'Tratamiento técnico para el kit de arrastre: desincrustación de grasa pesada con solvente dieléctrico seguro para retenes O-Ring/X-Ring, calibración de holgura y lubricación de teflón cerámico de alta adherencia.',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80',
    featured: false,
    recommendedFrequency: 'Cada 500 a 800 km',
    guarantee: 'Compatible 100% con retenes O-Ring, X-Ring y Z-Ring.',
    includes: [
      'Limpieza profunda con cepillo ergonómico 360°',
      'Disolvente desengrasante bio-degradable no corrosivo',
      'Eliminación de arenilla y lodo entre eslabones y sprocket',
      'Verificación y ajuste de tensión recomendada por fabricante',
      'Aplicación de lubricante de teflón sintético hidrofóbico'
    ],
    benefits: [
      'Extiende hasta en un 40% la vida útil del kit de arrastre',
      'Transmisión de potencia más suave y silenciosa',
      'Cero salpicaduras de grasa hacia la rueda trasera y rines'
    ]
  },
  {
    id: 'moto-3',
    name: 'Protección de Pintura y Plásticos MotoCraft',
    category: 'motos',
    kind: 'service',
    priceCOP: 60000,
    durationMin: 60,
    description: 'Sellado polimérico cerámico express con repelencia UV extrema para tanque y carenajes, combinado con nutrición y regeneración de plásticos negros rugosos que combate la resequedad del sol.',
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Cada 2 meses',
    guarantee: 'Brillo espejo y protección solar UV certificada por 60 días.',
    includes: [
      'Descontaminado suave de pintura de tanque y colín',
      'Sellador sintético hidrofóbico con efecto gota de agua',
      'Acondicionador cerámico en protectores de escape y tapas de motor',
      'Restauración de tono negro original en guardabarros y mandos',
      'Protección antiestática que reduce la acumulación de polvo'
    ],
    benefits: [
      'Evita que el sol decolore y opaque los plásticos y calcomanías',
      'Facilita los lavados posteriores gracias al efecto perla hidrofóbico',
      'Realza la profundidad del color y disimula micro-marcas'
    ]
  },
  {
    id: 'moto-4',
    name: 'Detallado Cerámico Ceramic Coating 9H Moto',
    category: 'motos',
    kind: 'service',
    priceCOP: 250000,
    durationMin: 180,
    description: 'Servicio élite de corrección microfina de barniz (eliminación de hologramas y microrayones por fricción), seguido de la aplicación de armadura cerámica multicapa 9H de grado aeroespacial en pintura, rines y motor.',
    imageUrl: 'https://images.unsplash.com/photo-1571188654249-7a9dc384918f?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Tratamiento anual de alto rendimiento',
    guarantee: 'Certificado de garantía de 12 meses con repelencia química y brillo.',
    includes: [
      'Descontaminado férrico y con barra de arcilla (Clay Bar)',
      'Pulido y corrección de pintura en 2 etapas (corte y acabado)',
      'Desengrase químico preparador de superficie (IPA Eraser)',
      'Aplicación de 2 capas de cerámica 9H con dureza de cuarzo',
      'Curado con lámpara infrarroja y sellado hidrofóbico final'
    ],
    benefits: [
      'Dureza extrema contra rayones superficiales de chaqueta o llaves',
      'Reflejo tipo cristal con saturación profunda del color',
      'Protección química contra excremento de aves, lluvia ácida y calor de motor'
    ]
  },

  // =========================================================================
  // --- CATEGORÍA AUTOMÓVILES (Especialización Auto Care) ---
  // =========================================================================
  {
    id: 'auto-1',
    name: 'Lavado Premium & Descontaminado Auto Care',
    category: 'autos',
    kind: 'service',
    priceCOP: 55000,
    durationMin: 60,
    description: 'Proceso de lavado de dos cubos con rejilla anti-remolino (Grit Guard), baño de espuma densa Snow Foam, descontaminado férrico en rines, detallado de marcos de puertas y cera líquida express.',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Cada 15 días',
    guarantee: 'Técnica de 2 cubos que evita micro-rayones (Swirls) en la pintura.',
    includes: [
      'Pre-lavado con espuma Snow Foam desincrustante',
      'Lavado de carrocería con guante de microfibra de lana merino',
      'Limpieza de rines y calipers con desferrizante no ácido',
      'Limpieza y aspirado de marcos de puertas, baúl y tapa de combustible',
      'Sellador de brillo húmedo Wet-Look aplicado en húmedo'
    ],
    benefits: [
      'Cuida el barniz transparente original del automóvil',
      'Rines libres de polvo negro de pastillas de freno horneado',
      'Acabado con tacto sedoso y brillo superior'
    ]
  },
  {
    id: 'auto-2',
    name: 'Aspirado y Detallado Interior Profundo',
    category: 'autos',
    kind: 'service',
    priceCOP: 90000,
    durationMin: 90,
    description: 'Higienización integral del habitáculo: inyección-extracción de tapicería en tela o nutrición con bálsamo de colágeno para cojinería de cuero, desinfección a vapor de ductos de aire acondicionado y techo.',
    imageUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Cada 2 a 3 meses',
    guarantee: 'Eliminación del 99.9% de ácaros, manchas superficiales y malos olores.',
    includes: [
      'Aspirado industrial de alfombras, baúl y entre-asientos',
      'Lavado y desmanchado de asientos con máquina de inyección-succión',
      'Tratamiento térmico con vapor a 140°C en rejillas de climatización',
      'Limpieza y nutrición de tablero, consola y paneles de puerta mate',
      'Cristales interiores desengrasados y libres de halo'
    ],
    benefits: [
      'Ambiente saludable y fresco libre de ácaros y alérgenos',
      'Elimina olores de humedad, comida o mascotas',
      'Tableros mates elegantes sin brillo grasoso reflectivo'
    ]
  },
  {
    id: 'auto-3',
    name: 'Limpieza y Protección de Chasis Auto Care',
    category: 'autos',
    kind: 'service',
    priceCOP: 70000,
    durationMin: 60,
    description: 'Lavado inferior en rampa o elevador con lanza de alta presión multidireccional, remoción de sales, lodo calcificado y aplicación de película protectora anticorrosiva para tren motriz y suspensión.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
    featured: false,
    recommendedFrequency: 'Cada 3 meses o post-viaje',
    guarantee: 'Protección anticorrosión para carrocería inferior y suspensiones.',
    includes: [
      'Elevación o acceso angular inferior',
      'Desincrustación con agua tibia a presión y desengrasante mineral',
      'Lavado de pasos de rueda y guardapolvos de amortiguador',
      'Revisión visual preventiva de fugas o gomas resecas',
      'Emulsión hidrofóbica que retarda la adherencia de nuevo lodo'
    ],
    benefits: [
      'Previene la oxidación por salitre o humedad estancada',
      'Mantiene gomas de suspensión y bujes lubricados y flexibles',
      'Conserva el valor de reventa del vehículo'
    ]
  },

  // =========================================================================
  // --- CATEGORÍA COMBOS & PAQUETES PROMOCIONALES (Mayor Claridad & Ahorro) ---
  // =========================================================================
  {
    id: 'combo-1',
    name: 'Combo MotoCraft Total Performance',
    category: 'combos',
    kind: 'combo',
    priceCOP: 105000,
    durationMin: 110,
    savingsCOP: 15000,
    description: 'El paquete más completo y solicitado para motocicletas: Lavado Técnico Detallado + Restauración de Cadena 360° + Protección Polimérica de Tanque y Plásticos con ahorro directo.',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Mensual para motos de uso diario o fin de semana',
    guarantee: 'Servicio integral garantizado: moto limpia, protegida y suave al rodar.',
    includes: [
      'Lavado Técnico Detallado con Snow Foam neutro (Valor: $35.000)',
      'Desengrasado, tensión y lubricación de Cadena (Valor: $25.000)',
      'Protección de Pintura UV y Renovación de Plásticos (Valor: $60.000)',
      'Aromatizado sutil y revisión técnica de presión de neumáticos de cortesía'
    ],
    benefits: [
      'Ahorras $15.000 COP frente a contratar cada servicio por separado',
      'Tu moto sale lista para rodar con transmisión suave y pintura protegida',
      'Atención preferente en bahía técnica especializada MotoCraft'
    ]
  },
  {
    id: 'combo-2',
    name: 'Combo Auto Care Élite Integral',
    category: 'combos',
    kind: 'combo',
    priceCOP: 190000,
    durationMin: 180,
    savingsCOP: 25000,
    description: 'Renovación completa 360° para tu vehículo: Lavado Premium & Descontaminado exterior + Detallado Interior Profundo con Vapor + Limpieza y Protección de Chasis inferior.',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Ideal antes de viajar, venta o mantenimiento bimestral',
    guarantee: 'Satisfacción 100% garantizada: auto impecable por fuera, por dentro y por abajo.',
    includes: [
      'Lavado Premium & Descontaminado de Rines y Carrocería (Valor: $55.000)',
      'Aspirado e Inyección-Extracción Interior Profundo a Vapor (Valor: $90.000)',
      'Limpieza y Protección Anticorrosiva de Chasis (Valor: $70.000)',
      'Gratis: Aplicación de cera rápida Hydro de SiO2 para extra brillo'
    ],
    benefits: [
      'Ahorro instantáneo de $25.000 COP en el paquete completo',
      'Sensación de auto 0 km tanto en cabina como en carrocería',
      'Protección contra corrosión y suciedad por más tiempo'
    ]
  },
  {
    id: 'combo-3',
    name: 'Combo Protección Cerámica & Mantenimiento Master',
    category: 'combos',
    kind: 'combo',
    priceCOP: 285000,
    durationMin: 210,
    savingsCOP: 45000,
    description: 'Tratamiento exclusivo de blindaje: Detallado Cerámico 9H + Descontaminado químico integral + Kit de Cera Rápida Hydro y Microfibra de 600 GSM para llevar a casa.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
    featured: true,
    recommendedFrequency: 'Recomendado para vehículos nuevos o fanáticos del brillo supremo',
    guarantee: 'Garantía extendida por escrito y asesoría directa del Master Detailer.',
    includes: [
      'Tratamiento Cerámico 9H multicapa con corrección previa',
      'Descontaminado férrico exhaustivo en pintura, cristales y rines',
      'De Obsequio: 1 Kit de Cera Hydro SiO2 ($45.000) + 1 Microfibra Pro ($18.000)',
      'Asesoría técnica personalizada para el lavado sin hologramas en casa'
    ],
    benefits: [
      'Máximo ahorro ($45.000 COP) y te llevas tus insumos profesionales',
      'Brillo de concurso con efecto espejo inolvidable',
      'Protección química y física superior contra cualquier clima'
    ]
  },

  // =========================================================================
  // --- CATEGORÍA PRODUCTOS EXTRAS & CUIDADO EN CASA ---
  // =========================================================================
  {
    id: 'extra-1',
    name: 'Kit de Cera Rápida Hydro SiO2 (500ml)',
    category: 'extras',
    kind: 'product',
    priceCOP: 45000,
    description: 'Spray sellador potenciador de brillo y efecto perlado instantáneo con fórmula de dióxido de silicio (SiO2). Aumenta la hidrofobia y repele el polvo entre lavados.',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
    stock: 24,
    featured: true,
    includes: [
      'Botella ergonómica con gatillo spray atomizador de precisión',
      'Fórmula nanotecnológica compatible con cerámicos y ceras',
      'Rinde para más de 12 aplicaciones completas'
    ],
    benefits: [
      'Aplicación en seco o húmedo en menos de 5 minutos',
      'Crea una capa ultra resbaladiza donde el agua y polvo resbalan'
    ]
  },
  {
    id: 'extra-2',
    name: 'Microfibra de Alto Gramaje (600 GSM)',
    category: 'extras',
    kind: 'product',
    priceCOP: 18000,
    description: 'Paño de microfibra profesional de 600 gramos por metro cuadrado, cortado por ultrasonido sin costuras para evitar cualquier microrayón en pintura delicada.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    stock: 45,
    featured: false,
    includes: [
      'Tejido 80/20 poliéster/poliamida ultra densa',
      'Borde cortado con láser sin hilo duro',
      'Absorbe hasta 8 veces su peso en agua'
    ],
    benefits: [
      'Segura al 100% en negros pianos y barnices blandos',
      'Lavable y reutilizable por más de 100 ciclos'
    ]
  },
  {
    id: 'extra-3',
    name: 'Acondicionador de Cuero y Plásticos Interiores',
    category: 'extras',
    kind: 'product',
    priceCOP: 38000,
    description: 'Emulsión nutritiva enriquecida con bloqueador solar UVA/UVB que revitaliza cueros naturales, sintéticos y plásticos sin dejar sensación grasosa ni aceitosa.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    featured: true,
    includes: [
      'Envase dosificador de 350ml con aroma a auto nuevo',
      'Fórmula al agua sin derivados de petróleo corrosivos'
    ],
    benefits: [
      'Previene cuarteaduras y pérdida de color por el sol',
      'Tacto suave y acabado mate satinado de fábrica'
    ]
  },
  {
    id: 'extra-4',
    name: 'Lubricante de Cadena Alta Adherencia (400ml)',
    category: 'extras',
    kind: 'product',
    priceCOP: 32000,
    description: 'Fórmula sintética reforzada con teflón líquido desarrollada para resistir altas revoluciones y lluvia intensa sin salpicar el rin o basculante.',
    imageUrl: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&w=900&q=80',
    stock: 30,
    featured: false,
    includes: [
      'Aerosol con cánula de aplicación dirigida para eslabones',
      'Película blanca transparente de fácil verificación visual'
    ],
    benefits: [
      'Resiste centrifugado a más de 140 km/h sin salpicar',
      'Protege contra oxidación por agua y humedad ambiental'
    ]
  }
];

export const INITIAL_ORDERS: ServiceOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'JHO-101',
    clientName: 'Carlos Mario Restrepo',
    clientPhone: '310 458 9921',
    vehiclePlate: 'KLR-89G',
    vehicleType: 'Moto',
    items: [
      {
        item: INITIAL_CATALOG_ITEMS[0], // Lavado Técnico MotoCraft
        quantity: 1
      },
      {
        item: INITIAL_CATALOG_ITEMS[1], // Desengrasado Cadena
        quantity: 1
      }
    ],
    totalCOP: 60000,
    totalDurationMin: 75,
    status: 'En Proceso',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    technicianName: 'Mateo (MotoCraft Lead)',
    notes: 'Cliente solicitó especial cuidado con el sensor ABS trasero.'
  },
  {
    id: 'ord-102',
    orderNumber: 'JHO-102',
    clientName: 'Valentina Gómez',
    clientPhone: '314 772 1045',
    vehiclePlate: 'FGH-452',
    vehicleType: 'Auto',
    items: [
      {
        item: INITIAL_CATALOG_ITEMS[7], // Combo Auto Care Élite Integral
        quantity: 1
      }
    ],
    totalCOP: 190000,
    totalDurationMin: 180,
    status: 'En Espera',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    technicianName: 'David & Andrés',
    notes: 'Vehículo para entrega antes de las 6:00 PM.'
  },
  {
    id: 'ord-103',
    orderNumber: 'JHO-103',
    clientName: 'Santiago Henao',
    clientPhone: '317 890 3341',
    vehiclePlate: 'NMT-23F',
    vehicleType: 'Moto',
    items: [
      {
        item: INITIAL_CATALOG_ITEMS[3], // Detallado Cerámico Moto
        quantity: 1
      }
    ],
    totalCOP: 250000,
    totalDurationMin: 180,
    status: 'Finalizado',
    createdAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    technicianName: 'Sebastián (Ceramic Pro)',
    paymentMethod: 'Transferencia Nequi/Daviplata'
  },
  {
    id: 'ord-104',
    orderNumber: 'JHO-104',
    clientName: 'Daniela Morales',
    clientPhone: '300 234 5678',
    vehiclePlate: 'XYZ-123',
    vehicleType: 'Auto',
    items: [
      {
        item: INITIAL_CATALOG_ITEMS[4], // Lavado Premium Auto
        quantity: 1
      },
      {
        item: INITIAL_CATALOG_ITEMS[6], // Chasis Auto
        quantity: 1
      }
    ],
    totalCOP: 125000,
    totalDurationMin: 120,
    status: 'Finalizado',
    createdAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    technicianName: 'David (Auto Care Master)',
    paymentMethod: 'Tarjeta Débito/Crédito'
  }
];

export const HISTORICAL_DAILY_DATA = [
  { day: 'Lun 01', motosCOP: 380000, autosCOP: 520000, extrasCOP: 95000, totalCOP: 995000 },
  { day: 'Mar 02', motosCOP: 420000, autosCOP: 610000, extrasCOP: 120000, totalCOP: 1150000 },
  { day: 'Mié 03', motosCOP: 310000, autosCOP: 480000, extrasCOP: 80000, totalCOP: 870000 },
  { day: 'Jue 04', motosCOP: 490000, autosCOP: 730000, extrasCOP: 140000, totalCOP: 1360000 },
  { day: 'Vie 05', motosCOP: 680000, autosCOP: 950000, extrasCOP: 210000, totalCOP: 1840000 },
  { day: 'Sáb 06', motosCOP: 920000, autosCOP: 1450000, extrasCOP: 380000, totalCOP: 2750000 },
  { day: 'Hoy 07', motosCOP: 625000, autosCOP: 885000, extrasCOP: 190000, totalCOP: 1700000 },
];
