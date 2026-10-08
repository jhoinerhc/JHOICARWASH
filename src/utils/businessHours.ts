/**
 * Official Business Hours and Open/Closed real-time status helper
 * JHOICARWASH MotoCraft & Auto Care
 * Propietario: Jhoiner Hincapie
 * 
 * Horarios oficiales:
 * - Martes a Viernes: 8:00 AM a 5:00 PM (08:00 a 17:00)
 * - Sábados y Domingos: 9:00 AM a 6:00 PM (09:00 a 18:00)
 * - Lunes: Cerrado (Mantenimiento técnico de bahías y descanso)
 */

export const OWNER_FULL_NAME = 'Jhoiner Hincapie';

export const OFFICIAL_SCHEDULE = {
  weekdays: 'Martes a Viernes: 8:00 AM a 5:00 PM',
  weekends: 'Sábados y Domingos: 9:00 AM a 6:00 PM',
  monday: 'Lunes: Cerrado (Mantenimiento Técnico)'
};

export interface StoreStatusResult {
  isOpen: boolean;
  statusText: 'ABIERTO AHORA' | 'CERRADO AHORA';
  shortText: string;
  badgeColor: 'green' | 'red';
  todaySchedule: string;
  nextOpeningMessage: string;
  dayOfWeekName: string;
  currentTimeFormatted: string;
}

export function checkStoreStatus(customDate?: Date): StoreStatusResult {
  const now = customDate || new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  const currentDayName = dayNames[day];
  const currentTimeFormatted = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  let isOpen = false;
  let todaySchedule = '';
  let nextOpeningMessage = '';

  // Case 1: Lunes (1) -> Closed all day
  if (day === 1) {
    isOpen = false;
    todaySchedule = 'Lunes: Cerrado por mantenimiento';
    nextOpeningMessage = 'Abrimos mañana martes a las 8:00 AM';
  } 
  // Case 2: Martes (2) a Viernes (5) -> 8:00 AM a 5:00 PM (08:00 to 17:00)
  else if (day >= 2 && day <= 5) {
    const openTime = 8 * 60; // 08:00 -> 480 mins
    const closeTime = 17 * 60; // 17:00 -> 1020 mins
    todaySchedule = 'Hoy: 8:00 AM a 5:00 PM';

    if (currentTotalMinutes >= openTime && currentTotalMinutes < closeTime) {
      isOpen = true;
      nextOpeningMessage = `Cierre hoy a las 5:00 PM (${Math.floor((closeTime - currentTotalMinutes) / 60)}h ${(closeTime - currentTotalMinutes) % 60}m restantes)`;
    } else if (currentTotalMinutes < openTime) {
      isOpen = false;
      nextOpeningMessage = 'Abrimos hoy a las 8:00 AM';
    } else {
      isOpen = false;
      if (day === 5) {
        nextOpeningMessage = 'Abrimos mañana sábado a las 9:00 AM';
      } else {
        nextOpeningMessage = 'Abrimos mañana a las 8:00 AM';
      }
    }
  } 
  // Case 3: Sábados (6) y Domingos (0) -> 9:00 AM a 6:00 PM (09:00 to 18:00)
  else {
    const openTime = 9 * 60; // 09:00 -> 540 mins
    const closeTime = 18 * 60; // 18:00 -> 1080 mins
    todaySchedule = 'Hoy: 9:00 AM a 6:00 PM';

    if (currentTotalMinutes >= openTime && currentTotalMinutes < closeTime) {
      isOpen = true;
      nextOpeningMessage = `Cierre hoy a las 6:00 PM (${Math.floor((closeTime - currentTotalMinutes) / 60)}h ${(closeTime - currentTotalMinutes) % 60}m restantes)`;
    } else if (currentTotalMinutes < openTime) {
      isOpen = false;
      nextOpeningMessage = 'Abrimos hoy a las 9:00 AM';
    } else {
      isOpen = false;
      if (day === 6) {
        nextOpeningMessage = 'Abrimos mañana domingo a las 9:00 AM';
      } else {
        nextOpeningMessage = 'Lunes cerrado. Reabrimos martes a las 8:00 AM';
      }
    }
  }

  return {
    isOpen,
    statusText: isOpen ? 'ABIERTO AHORA' : 'CERRADO AHORA',
    shortText: isOpen ? 'Abierto' : 'Cerrado',
    badgeColor: isOpen ? 'green' : 'red',
    todaySchedule,
    nextOpeningMessage,
    dayOfWeekName: currentDayName,
    currentTimeFormatted
  };
}
