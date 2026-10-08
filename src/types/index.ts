export type ItemCategory = 'motos' | 'autos' | 'combos' | 'extras';
export type ItemKind = 'service' | 'combo' | 'product';

export interface CatalogItem {
  id: string;
  name: string;
  category: ItemCategory;
  kind: ItemKind;
  priceCOP: number;
  durationMin?: number; // Minutes for services and combos
  description: string;
  imageUrl: string;
  stock?: number; // Stock for extra products
  featured?: boolean;
  savingsCOP?: number; // For combo savings
  includes?: string[]; // Detailed what's included list
  benefits?: string[]; // Direct benefits for vehicle
  guarantee?: string; // Quality / safety guarantee badge
  recommendedFrequency?: string; // e.g. "Cada 15 días", "Semestral"
}

export interface CartItem {
  item: CatalogItem;
  quantity: number;
}

export type OrderStatus = 'En Espera' | 'En Proceso' | 'Finalizado';

export interface ServiceOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone?: string;
  vehiclePlate: string;
  vehicleType: 'Moto' | 'Auto' | 'Especial';
  items: CartItem[];
  totalCOP: number;
  totalDurationMin: number;
  status: OrderStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  technicianName?: string;
  notes?: string;
  paymentMethod?: 'Efectivo' | 'Transferencia Nequi/Daviplata' | 'Tarjeta Débito/Crédito';
}

export type UserRole = 'admin' | 'reception';

export interface UserSession {
  role: UserRole;
  name: string;
  title: string;
  email: string;
  avatar: string;
  isAuthenticatedAdmin?: boolean;
}

export type LoyaltyTier = 'Bronce' | 'Plata' | 'Oro' | 'VIP Master';

export interface CustomerReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  badge: string;
}

export interface LoyalCustomer {
  id: string;
  name: string;
  phone: string;
  plate: string;
  vehicleType: 'Moto' | 'Auto';
  totalVisits: number;
  totalSpentCOP: number;
  tier: LoyaltyTier;
  points: number;
  lastVisit: string;
  favoriteService: string;
  assignedRewards: string[]; // List of claimed or available benefits
}

export interface BottleneckMetric {
  serviceId: string;
  serviceName: string;
  category: 'MotoCraft' | 'Auto Care';
  avgDurationMin: number;
  criticalStep: string;
  impactLevel: 'Alto' | 'Medio' | 'Crítico';
  recommendation: string;
  bayRequirement: string;
}

export interface SeasonalForecast {
  period: string;
  label: string;
  climateFactor: string;
  demandTrend: 'Alto Volumen' | 'Volumen Medio' | 'Bajo Volumen (Crítico)' | 'Pico Extraordinario';
  expectedMotos: number;
  expectedAutos: number;
  expectedRevenueCOP: number;
  recommendations: string[];
}

export interface HourlyQueueSnapshot {
  hourIndex: number; // 0 to 11 (from 7 AM to 6 PM)
  hourLabel: string; // e.g. "07:00 AM", "10:00 AM"
  enEspera: number;
  enProceso: number;
  completados: number;
  motosEnTaller: number;
  autosEnTaller: number;
  ocupacionPct: number;
  tiempoPromedioEsperaMin: number;
  notaOperativa?: string;
  vehiculosEnEseMomento?: {
    placa: string;
    cliente: string;
    tipo: 'Moto' | 'Auto';
    servicio: string;
    estado: OrderStatus;
    tecnico: string;
  }[];
}

export interface HistoricalDayQueue {
  id: string; // 'hoy' | 'ayer' | 'hace-2-dias' | 'hace-3-dias' | 'hace-4-dias' | 'hace-7-dias'
  label: string; // e.g. "Ayer (Día Anterior)"
  fechaTexto: string; // e.g. "Martes 06 de Octubre"
  clima: string; // e.g. "Soleado / Tráfico Elevado"
  totalFinalizadoDia: number;
  picoHora: string; // e.g. "10:00 AM"
  snapshots: HourlyQueueSnapshot[];
}

