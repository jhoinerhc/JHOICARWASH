import { LoyalCustomer, CustomerReward, BottleneckMetric, SeasonalForecast } from '../types';

export const INITIAL_LOYAL_CUSTOMERS: LoyalCustomer[] = [
  {
    id: 'cli-01',
    name: 'Andrés Felipe Restrepo',
    phone: '312 458 9021',
    plate: 'KLR-89G',
    vehicleType: 'Moto',
    totalVisits: 8,
    totalSpentCOP: 485000,
    tier: 'VIP Master',
    points: 850,
    lastVisit: 'Ayer',
    favoriteService: 'Combo MotoCraft Total Performance',
    assignedRewards: ['Cera Hydro SiO2 de Obsequio', 'Desengrase de Cadena Gratis']
  },
  {
    id: 'cli-02',
    name: 'Valentina Morales Henao',
    phone: '314 772 1045',
    plate: 'FGH-452',
    vehicleType: 'Auto',
    totalVisits: 6,
    totalSpentCOP: 620000,
    tier: 'Oro',
    points: 620,
    lastVisit: 'Hace 3 días',
    favoriteService: 'Aspirado y Detallado Interior Profundo',
    assignedRewards: ['20% Descto en Próximo Detallado']
  },
  {
    id: 'cli-03',
    name: 'Santiago Cárdenas Gil',
    phone: '318 643 2219',
    plate: 'XYZ-123',
    vehicleType: 'Auto',
    totalVisits: 11,
    totalSpentCOP: 1150000,
    tier: 'VIP Master',
    points: 1200,
    lastVisit: 'Hoy',
    favoriteService: 'Combo Auto Care Élite Integral',
    assignedRewards: ['Lavado Premium 100% Gratis', 'Microfibra 600 GSM Regalo']
  },
  {
    id: 'cli-04',
    name: 'Mateo Osorio Zuluaga',
    phone: '300 234 5678',
    plate: 'NMT-23F',
    vehicleType: 'Moto',
    totalVisits: 5,
    totalSpentCOP: 390000,
    tier: 'Oro',
    points: 480,
    lastVisit: 'Hace 1 semana',
    favoriteService: 'Detallado Cerámico Ceramic Coating 9H',
    assignedRewards: ['Lubricante de Cadena de Cortesía']
  },
  {
    id: 'cli-05',
    name: 'Camila Montoya López',
    phone: '311 987 6543',
    plate: 'LKM-902',
    vehicleType: 'Auto',
    totalVisits: 3,
    totalSpentCOP: 220000,
    tier: 'Plata',
    points: 250,
    lastVisit: 'Hace 2 semanas',
    favoriteService: 'Lavado Premium & Descontaminado',
    assignedRewards: ['Aromatizante de Lujo Spa']
  },
  {
    id: 'cli-06',
    name: 'David Alejandro Gaviria',
    phone: '317 890 3341',
    plate: 'PQX-54E',
    vehicleType: 'Moto',
    totalVisits: 4,
    totalSpentCOP: 215000,
    tier: 'Plata',
    points: 310,
    lastVisit: 'Hace 5 días',
    favoriteService: 'Lavado Técnico Detallado MotoCraft',
    assignedRewards: ['Brillo Polimérico de Rines de Regalo']
  }
];

export const AVAILABLE_REWARDS: CustomerReward[] = [
  {
    id: 'rew-1',
    title: 'Desengrase de Cadena 360° de Cortesía',
    description: 'Válido para clientes MotoCraft con más de 300 puntos acumulados.',
    pointsCost: 300,
    badge: 'Motos'
  },
  {
    id: 'rew-2',
    title: 'Cera Hydro SiO2 de Obsequio en Spray (500ml)',
    description: 'Frasco para llevar a casa tras acumular 500 puntos en detallados.',
    pointsCost: 500,
    badge: 'General'
  },
  {
    id: 'rew-3',
    title: 'Lavado Premium Exterior 100% Gratis',
    description: 'Lavado completo de dos cubos sin costo por fidelidad continua.',
    pointsCost: 750,
    badge: 'Autos'
  },
  {
    id: 'rew-4',
    title: 'Bono VIP $40.000 COP en Detallado Cerámico',
    description: 'Descuento redimible en aplicación de Ceramic Coating 9H.',
    pointsCost: 400,
    badge: 'VIP'
  },
  {
    id: 'rew-5',
    title: 'Microfibra 600 GSM sin costuras de Regalo',
    description: 'Paño profesional corte láser para cuidado personal de tu vehículo.',
    pointsCost: 200,
    badge: 'Insumos'
  }
];

export const BOTTLENECK_METRICS: BottleneckMetric[] = [
  {
    serviceId: 'moto-ceramic',
    serviceName: 'Detallado Cerámico 9H (MotoCraft)',
    category: 'MotoCraft',
    avgDurationMin: 180,
    criticalStep: 'Micro-corrección de barniz y tiempo de curado por lámpara infrarroja.',
    impactLevel: 'Crítico',
    recommendation: 'Agendar exclusivamente con reserva previa entre 1:00 PM y 4:00 PM para no congestionar las bahías de lavado rápido matutinas.',
    bayRequirement: 'Bahía 3 (Luz LED de Inspección & Ambiente Cerrado)'
  },
  {
    serviceId: 'auto-interior',
    serviceName: 'Aspirado & Interior Profundo a Vapor (Auto Care)',
    category: 'Auto Care',
    avgDurationMin: 90,
    criticalStep: 'Extracción de humedad en cojinería y secado con turbina de aire caliente.',
    impactLevel: 'Alto',
    recommendation: 'Asignar soplador de aire industrial doble turbina para reducir el tiempo de secado de asientos en 25 minutos.',
    bayRequirement: 'Bahía 2 (Secado & Detallado Interior)'
  },
  {
    serviceId: 'auto-chassis',
    serviceName: 'Limpieza y Protección de Chasis (Auto Care)',
    category: 'Auto Care',
    avgDurationMin: 60,
    criticalStep: 'Elevación en rampa única y desincrustación angular inferior de lodo petrificado.',
    impactLevel: 'Alto',
    recommendation: 'Cuello de botella estructural por tener 1 solo elevador hidráulico. Programar turnos de chasis con intervalo de 30 minutos.',
    bayRequirement: 'Rampa Hidráulica de Elevación Principal'
  },
  {
    serviceId: 'moto-chain',
    serviceName: 'Desengrase 360° y Secado de Cadena (MotoCraft)',
    category: 'MotoCraft',
    avgDurationMin: 30,
    criticalStep: 'Secado meticuloso con aire para no atrapar solvente antes de la cera líquida.',
    impactLevel: 'Medio',
    recommendation: 'Tener cepillos rotativos 360 pre-empapados en dieléctrico para acelerar la remoción de grasa en 10 minutos.',
    bayRequirement: 'Bahía 1 (Paddock de Lavado Técnico)'
  }
];

export const HOURLY_TRAFFIC_DATA = [
  { hora: '07:00 AM', motos: 1, autos: 1, nivel: 'Calmado (Valle)', flujo: 15 },
  { hora: '08:00 AM', motos: 3, autos: 2, nivel: 'Calmado (Valle)', flujo: 30 },
  { hora: '09:00 AM', motos: 7, autos: 6, nivel: 'Pico de Entrada', flujo: 85 },
  { hora: '10:00 AM', motos: 9, autos: 8, nivel: 'Pico Máximo Matutino', flujo: 98 },
  { hora: '11:00 AM', motos: 8, autos: 7, nivel: 'Alto Volumen', flujo: 88 },
  { hora: '12:00 PM', motos: 4, autos: 3, nivel: 'Calmado (Almuerzo)', flujo: 35 },
  { hora: '01:00 PM', motos: 3, autos: 3, nivel: 'Calmado (Almuerzo)', flujo: 32 },
  { hora: '02:00 PM', motos: 6, autos: 5, nivel: 'Reactivación', flujo: 65 },
  { hora: '03:00 PM', motos: 8, autos: 8, nivel: 'Pico Vespertino', flujo: 92 },
  { hora: '04:00 PM', motos: 10, autos: 9, nivel: 'Pico Máximo de Tarde', flujo: 100 },
  { hora: '05:00 PM', motos: 7, autos: 6, nivel: 'Alto Volumen', flujo: 75 },
  { hora: '06:00 PM', motos: 3, autos: 2, nivel: 'Cierre y Entregas', flujo: 25 },
];

export const SEASONAL_FORECAST_DATA: SeasonalForecast[] = [
  {
    period: 'Viernes y Sábados (Fines de Semana)',
    label: 'Días Pico Semanales',
    climateFactor: 'Clima Soleado / Preparación de Viajes',
    demandTrend: 'Pico Extraordinario',
    expectedMotos: 28,
    expectedAutos: 22,
    expectedRevenueCOP: 4200000,
    recommendations: [
      'Reforzar con 1 técnico extra en secado e interiores.',
      'Promover agendamiento previo desde el jueves para evitar colas de más de 45 min.',
      'Tener listos combos rápidos para agilizar rotación de bahías.'
    ]
  },
  {
    period: 'Martes y Miércoles (Lluvias Continuas)',
    label: 'Días Valle / Críticos de Baja Afluencia',
    climateFactor: 'Lluvias / Carreteras Mojadas',
    demandTrend: 'Bajo Volumen (Crítico)',
    expectedMotos: 6,
    expectedAutos: 5,
    expectedRevenueCOP: 780000,
    recommendations: [
      'Activar la promoción "Día de Lluvia: 20% OFF en Sellador Hidrofóbico Hydro".',
      'Contactar clientes VIP para detallados cerámicos de larga duración bajo techo.',
      'Mantenimiento preventivo de bombas y compresores.'
    ]
  },
  {
    period: 'Noviembre - Diciembre (Fin de Año)',
    label: 'Temporada Festiva y Vacaciones',
    climateFactor: 'Verano / Paseos y Fiestas',
    demandTrend: 'Pico Extraordinario',
    expectedMotos: 480,
    expectedAutos: 410,
    expectedRevenueCOP: 68000000,
    recommendations: [
      'Ampliar inventario de cerámicas 9H y ceras Hydro en un 60%.',
      'Abrir jornada continua desde las 6:30 AM.',
      'Ofrecer tarjetas de regalo navideñas JHOICARWASH para familiares y amigos.'
    ]
  },
  {
    period: 'Abril - Mayo (Temporada Invernal)',
    label: 'Meses de Mayor Precipitación',
    climateFactor: 'Invierno / Lluvia Constante',
    demandTrend: 'Bajo Volumen (Crítico)',
    expectedMotos: 180,
    expectedAutos: 160,
    expectedRevenueCOP: 22500000,
    recommendations: [
      'Focalizar en servicios interiores (Aspirado profundo, vapor y sanitización).',
      'Ofrecer desengrase de cadena express post-lluvia a precio especial para motociclistas.',
      'Campaña: "Protege tu pintura del agua ácida con Sellado Cerámico".'
    ]
  }
];

export const VEHICLE_COMPARISON_TIMEFRAMES = {
  diario: {
    periodo: 'Día de Hoy (vs. Promedio Diario)',
    motosAtendidas: 14,
    autosAtendidos: 11,
    motosIngresosCOP: 625000,
    autosIngresosCOP: 885000,
    extrasIngresosCOP: 190000,
    totalCOP: 1700000,
    comparacionAyer: '+18.2% vs. Ayer',
    diaCriticoVsPico: 'Pico Moderado'
  },
  semanal: {
    periodo: 'Semana en Curso (7 Días)',
    motosAtendidas: 84,
    autosAtendidos: 62,
    motosIngresosCOP: 3825000,
    autosIngresosCOP: 5690000,
    extrasIngresosCOP: 1225000,
    totalCOP: 10740000,
    comparacionAyer: '+12.4% vs. Semana Anterior',
    diaCriticoVsPico: 'Sábado concentró el 32% del volumen'
  },
  mensual: {
    periodo: 'Mes en Curso (Acumulado 30 Días)',
    motosAtendidas: 345,
    autosAtendidos: 268,
    motosIngresosCOP: 16450000,
    autosIngresosCOP: 24800000,
    extrasIngresosCOP: 4890000,
    totalCOP: 46140000,
    comparacionAyer: '+22.6% vs. Mes Anterior',
    diaCriticoVsPico: 'Crecimiento sostenido en segmento MotoCraft'
  }
};

export const DAILY_ASCENDING_GROWTH = [
  { dia: 'Día 01', ventasCOP: 950000, acumuladoCOP: 950000, motos: 8, autos: 6, volumenTotal: 14 },
  { dia: 'Día 02', ventasCOP: 1150000, acumuladoCOP: 2100000, motos: 9, autos: 8, volumenTotal: 17 },
  { dia: 'Día 03', ventasCOP: 890000, acumuladoCOP: 2990000, motos: 7, autos: 5, volumenTotal: 12 },
  { dia: 'Día 04', ventasCOP: 1360000, acumuladoCOP: 4350000, motos: 11, autos: 9, volumenTotal: 20 },
  { dia: 'Día 05', ventasCOP: 1840000, acumuladoCOP: 6190000, motos: 15, autos: 12, volumenTotal: 27 },
  { dia: 'Día 06', ventasCOP: 2750000, acumuladoCOP: 8940000, motos: 21, autos: 18, volumenTotal: 39 },
  { dia: 'Día 07', ventasCOP: 1700000, acumuladoCOP: 10640000, motos: 14, autos: 11, volumenTotal: 25 },
  { dia: 'Día 08', ventasCOP: 1450000, acumuladoCOP: 12090000, motos: 12, autos: 10, volumenTotal: 22 },
  { dia: 'Día 09', ventasCOP: 1980000, acumuladoCOP: 14070000, motos: 16, autos: 13, volumenTotal: 29 },
  { dia: 'Día 10', ventasCOP: 2920000, acumuladoCOP: 16990000, motos: 23, autos: 19, volumenTotal: 42 }
];

export const MONTHLY_ASCENDING_GROWTH = [
  { mes: 'Ene', ventasMensualesCOP: 24500000, acumuladoAnualCOP: 24500000, motos: 195, autos: 160, volumenTotal: 355, crecimientoPct: '+10.2%' },
  { mes: 'Feb', ventasMensualesCOP: 26800000, acumuladoAnualCOP: 51300000, motos: 210, autos: 175, volumenTotal: 385, crecimientoPct: '+9.4%' },
  { mes: 'Mar', ventasMensualesCOP: 31200000, acumuladoAnualCOP: 82500000, motos: 245, autos: 205, volumenTotal: 450, crecimientoPct: '+16.4%' },
  { mes: 'Abr', ventasMensualesCOP: 33500000, acumuladoAnualCOP: 116000000, motos: 260, autos: 215, volumenTotal: 475, crecimientoPct: '+7.4%' },
  { mes: 'May', ventasMensualesCOP: 37900000, acumuladoAnualCOP: 153900000, motos: 290, autos: 240, volumenTotal: 530, crecimientoPct: '+13.1%' },
  { mes: 'Jun', ventasMensualesCOP: 41800000, acumuladoAnualCOP: 195700000, motos: 315, autos: 260, volumenTotal: 575, crecimientoPct: '+10.3%' },
  { mes: 'Jul', ventasMensualesCOP: 44200000, acumuladoAnualCOP: 239900000, motos: 330, autos: 270, volumenTotal: 600, crecimientoPct: '+5.7%' },
  { mes: 'Ago', ventasMensualesCOP: 46800000, acumuladoAnualCOP: 286700000, motos: 345, autos: 285, volumenTotal: 630, crecimientoPct: '+5.9%' },
  { mes: 'Sep', ventasMensualesCOP: 49500000, acumuladoAnualCOP: 336200000, motos: 360, autos: 295, volumenTotal: 655, crecimientoPct: '+5.8%' },
  { mes: 'Oct (Hoy)', ventasMensualesCOP: 54200000, acumuladoAnualCOP: 390400000, motos: 385, autos: 315, volumenTotal: 700, crecimientoPct: '+9.5%' }
];

export const DAILY_SERVICES_PIE_DATA = [
  { name: 'Lavado Técnico MotoCraft', value: 14, porcentaje: '28%', fill: '#00E5FF' },
  { name: 'Lavado Premium Auto Care', value: 11, porcentaje: '22%', fill: '#003399' },
  { name: 'Aspirado e Interior Profundo', value: 8, porcentaje: '16%', fill: '#38bdf8' },
  { name: 'Combos Pro Especiales', value: 7, porcentaje: '14%', fill: '#818cf8' },
  { name: 'Desengrase de Cadena 360°', value: 6, porcentaje: '12%', fill: '#34d399' },
  { name: 'Insumos & Extras Hydro', value: 4, porcentaje: '8%', fill: '#f59e0b' }
];

export const MONTHLY_SERVICES_PIE_DATA = [
  { name: 'Lavado Premium & MotoCraft Básico', value: 295, porcentaje: '42.1%', fill: '#00E5FF' },
  { name: 'Combos Especiales (Ahorro)', value: 148, porcentaje: '21.1%', fill: '#003399' },
  { name: 'Interiores a Vapor & Desmanchado', value: 112, porcentaje: '16.0%', fill: '#38bdf8' },
  { name: 'Chasis & Desengrase Integral', value: 74, porcentaje: '10.6%', fill: '#818cf8' },
  { name: 'Detallado Cerámico 9H Élite', value: 41, porcentaje: '5.9%', fill: '#34d399' },
  { name: 'Ceras Hydro & Cuidados Casa', value: 30, porcentaje: '4.3%', fill: '#f59e0b' }
];

