import { HistoricalDayQueue, HourlyQueueSnapshot } from '../types';

export const HISTORICAL_QUEUE_DAYS: HistoricalDayQueue[] = [
  // =========================================================================
  // AYER (Martes 06 de Octubre) - Día Laboral Intenso
  // =========================================================================
  {
    id: 'ayer',
    label: 'Ayer (Día Anterior)',
    fechaTexto: 'Martes 06 de Octubre',
    clima: 'Soleado con alta rotación en bahías',
    totalFinalizadoDia: 25,
    picoHora: '04:00 PM',
    snapshots: [
      {
        hourIndex: 0,
        hourLabel: '07:00 AM',
        enEspera: 1,
        enProceso: 1,
        completados: 0,
        motosEnTaller: 1,
        autosEnTaller: 1,
        ocupacionPct: 20,
        tiempoPromedioEsperaMin: 25,
        notaOperativa: 'Apertura de taller y revisión de compresores e hidrolavadoras.',
        vehiculosEnEseMomento: [
          { placa: 'MTO-45E', cliente: 'Carlos Restrepo', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'KLE-890', cliente: 'Andrés Gil', tipo: 'Auto', servicio: 'Lavado Premium & Descontaminado', estado: 'En Espera', tecnico: 'Fabián' }
        ]
      },
      {
        hourIndex: 1,
        hourLabel: '08:00 AM',
        enEspera: 2,
        enProceso: 3,
        completados: 1,
        motosEnTaller: 3,
        autosEnTaller: 2,
        ocupacionPct: 45,
        tiempoPromedioEsperaMin: 35,
        notaOperativa: 'Ingreso de 2 motocicletas para desengrase de cadena matutino.',
        vehiculosEnEseMomento: [
          { placa: 'WQP-12C', cliente: 'Juan Pablo Vélez', tipo: 'Moto', servicio: 'Desengrasado y Cadena 360°', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'ABC-789', cliente: 'Carolina Gómez', tipo: 'Auto', servicio: 'Aspirado y Detallado Interior', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'BTR-90A', cliente: 'Diego Arango', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Sebastián' },
          { placa: 'MXZ-332', cliente: 'Esteban Loaiza', tipo: 'Auto', servicio: 'Lavado Premium', estado: 'En Espera', tecnico: 'Fabián' },
          { placa: 'PLK-55D', cliente: 'Daniela Soto', tipo: 'Moto', servicio: 'Protección de Pintura', estado: 'En Espera', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 2,
        hourLabel: '09:00 AM',
        enEspera: 4,
        enProceso: 4,
        completados: 3,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 75,
        tiempoPromedioEsperaMin: 45,
        notaOperativa: 'Inicio del pico matutino. Bahías 1 y 2 al 100% de capacidad.',
        vehiculosEnEseMomento: [
          { placa: 'KLE-890', cliente: 'Andrés Gil', tipo: 'Auto', servicio: 'Lavado Premium', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'PLK-55D', cliente: 'Daniela Soto', tipo: 'Moto', servicio: 'Protección de Pintura', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'XYZ-123', cliente: 'Santiago Cárdenas', tipo: 'Auto', servicio: 'Combo Auto Care Élite', estado: 'En Proceso', tecnico: 'Nicolás' },
          { placa: 'NHK-99F', cliente: 'Felipe Marín', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Sebastián' }
        ]
      },
      {
        hourIndex: 3,
        hourLabel: '10:00 AM',
        enEspera: 6,
        enProceso: 5,
        completados: 6,
        motosEnTaller: 6,
        autosEnTaller: 5,
        ocupacionPct: 95,
        tiempoPromedioEsperaMin: 55,
        notaOperativa: 'Pico Máximo Matutino: 6 vehículos en espera de bahía de secado.',
        vehiculosEnEseMomento: [
          { placa: 'XYZ-123', cliente: 'Santiago Cárdenas', tipo: 'Auto', servicio: 'Combo Auto Care Élite', estado: 'En Proceso', tecnico: 'Nicolás' },
          { placa: 'HJK-65E', cliente: 'Julio Cadavid', tipo: 'Moto', servicio: 'Detallado Cerámico 9H', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'TRP-401', cliente: 'Gloria Muñoz', tipo: 'Auto', servicio: 'Limpieza de Chasis', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'QWE-77A', cliente: 'Óscar Pineda', tipo: 'Moto', servicio: 'Desengrase y Cadena', estado: 'En Proceso', tecnico: 'Sebastián' },
          { placa: 'LKM-902', cliente: 'Camila Montoya', tipo: 'Auto', servicio: 'Lavado Premium', estado: 'En Espera', tecnico: 'Fabián' },
          { placa: 'KLR-89G', cliente: 'Andrés Restrepo', tipo: 'Moto', servicio: 'Combo MotoCraft Total', estado: 'En Espera', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 4,
        hourLabel: '11:00 AM',
        enEspera: 5,
        enProceso: 5,
        completados: 10,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 90,
        tiempoPromedioEsperaMin: 50,
        notaOperativa: 'Rotación rápida de 4 lavados rápidos de moto completados.',
        vehiculosEnEseMomento: [
          { placa: 'HJK-65E', cliente: 'Julio Cadavid', tipo: 'Moto', servicio: 'Detallado Cerámico 9H', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'LKM-902', cliente: 'Camila Montoya', tipo: 'Auto', servicio: 'Lavado Premium', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'KLR-89G', cliente: 'Andrés Restrepo', tipo: 'Moto', servicio: 'Combo MotoCraft Total', estado: 'En Proceso', tecnico: 'Sebastián' }
        ]
      },
      {
        hourIndex: 5,
        hourLabel: '12:00 PM',
        enEspera: 3,
        enProceso: 3,
        completados: 13,
        motosEnTaller: 3,
        autosEnTaller: 3,
        ocupacionPct: 55,
        tiempoPromedioEsperaMin: 30,
        notaOperativa: 'Hora de almuerzo y relevo de técnicos. Disminución de flujo de entrada.',
        vehiculosEnEseMomento: [
          { placa: 'HJK-65E', cliente: 'Julio Cadavid', tipo: 'Moto', servicio: 'Detallado Cerámico 9H', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'BVN-210', cliente: 'Rodrigo Casas', tipo: 'Auto', servicio: 'Aspirado Interior', estado: 'En Proceso', tecnico: 'Nicolás' }
        ]
      },
      {
        hourIndex: 6,
        hourLabel: '01:00 PM',
        enEspera: 2,
        enProceso: 3,
        completados: 15,
        motosEnTaller: 2,
        autosEnTaller: 3,
        ocupacionPct: 50,
        tiempoPromedioEsperaMin: 25,
        notaOperativa: 'Reanudación de turno completo de bahías.',
        vehiculosEnEseMomento: [
          { placa: 'FGH-452', cliente: 'Valentina Morales', tipo: 'Auto', servicio: 'Aspirado Interior Profundo', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'NMT-23F', cliente: 'Mateo Osorio', tipo: 'Moto', servicio: 'Protección de Plásticos', estado: 'En Proceso', tecnico: 'Sebastián' }
        ]
      },
      {
        hourIndex: 7,
        hourLabel: '02:00 PM',
        enEspera: 4,
        enProceso: 4,
        completados: 17,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 70,
        tiempoPromedioEsperaMin: 40,
        notaOperativa: 'Reactivación de la tarde con 3 vehículos corporativos.',
        vehiculosEnEseMomento: [
          { placa: 'FGH-452', cliente: 'Valentina Morales', tipo: 'Auto', servicio: 'Aspirado Interior Profundo', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'PQX-54E', cliente: 'David Gaviria', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 8,
        hourLabel: '03:00 PM',
        enEspera: 5,
        enProceso: 5,
        completados: 19,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 88,
        tiempoPromedioEsperaMin: 48,
        notaOperativa: 'Entrada de 2 motocicletas de alto cilindraje para desengrase y cera.',
        vehiculosEnEseMomento: [
          { placa: 'BMW-12G', cliente: 'Camilo Sierra', tipo: 'Moto', servicio: 'Combo MotoCraft Total', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'TXR-880', cliente: 'Mariana Duarte', tipo: 'Auto', servicio: 'Lavado Premium & Descontaminado', estado: 'En Proceso', tecnico: 'Fabián' }
        ]
      },
      {
        hourIndex: 9,
        hourLabel: '04:00 PM',
        enEspera: 6,
        enProceso: 5,
        completados: 21,
        motosEnTaller: 6,
        autosEnTaller: 5,
        ocupacionPct: 98,
        tiempoPromedioEsperaMin: 55,
        notaOperativa: 'Pico Máximo de Tarde: Clientes saliendo de oficina para recoger vehículos.',
        vehiculosEnEseMomento: [
          { placa: 'BMW-12G', cliente: 'Camilo Sierra', tipo: 'Moto', servicio: 'Combo MotoCraft Total', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'TXR-880', cliente: 'Mariana Duarte', tipo: 'Auto', servicio: 'Lavado Premium & Descontaminado', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'ZXC-701', cliente: 'Hernán Peláez', tipo: 'Auto', servicio: 'Limpieza de Chasis', estado: 'En Proceso', tecnico: 'Nicolás' },
          { placa: 'KTX-45A', cliente: 'Luisa Fernanda Ríos', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Sebastián' }
        ]
      },
      {
        hourIndex: 10,
        hourLabel: '05:00 PM',
        enEspera: 3,
        enProceso: 4,
        completados: 23,
        motosEnTaller: 4,
        autosEnTaller: 3,
        ocupacionPct: 75,
        tiempoPromedioEsperaMin: 35,
        notaOperativa: 'Finalización de servicios complejos y entrega de llaves.',
        vehiculosEnEseMomento: [
          { placa: 'ZXC-701', cliente: 'Hernán Peláez', tipo: 'Auto', servicio: 'Limpieza de Chasis', estado: 'En Proceso', tecnico: 'Nicolás' },
          { placa: 'KTX-45A', cliente: 'Luisa Fernanda Ríos', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Sebastián' }
        ]
      },
      {
        hourIndex: 11,
        hourLabel: '06:00 PM',
        enEspera: 0,
        enProceso: 2,
        completados: 25,
        motosEnTaller: 1,
        autosEnTaller: 1,
        ocupacionPct: 30,
        tiempoPromedioEsperaMin: 15,
        notaOperativa: 'Cierre de bahías principales, 25 vehículos completados en el día.',
        vehiculosEnEseMomento: [
          { placa: 'AUD-900', cliente: 'Alejandro Tobón', tipo: 'Auto', servicio: 'Secado Final', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'KLR-89G', cliente: 'Andrés Restrepo', tipo: 'Moto', servicio: 'Entrega en Paddock', estado: 'En Proceso', tecnico: 'Mateo' }
        ]
      }
    ]
  },

  // =========================================================================
  // HACE 2 DÍAS (Lunes 05 de Octubre) - Lluvia Ligera Matutina
  // =========================================================================
  {
    id: 'hace-2-dias',
    label: 'Hace 2 Días (Lunes)',
    fechaTexto: 'Lunes 05 de Octubre',
    clima: 'Llovizna matutina con aumento de servicios interiores',
    totalFinalizadoDia: 20,
    picoHora: '03:00 PM',
    snapshots: [
      {
        hourIndex: 0,
        hourLabel: '07:00 AM',
        enEspera: 0,
        enProceso: 1,
        completados: 0,
        motosEnTaller: 0,
        autosEnTaller: 1,
        ocupacionPct: 15,
        tiempoPromedioEsperaMin: 20,
        notaOperativa: 'Inicio con lluvia leve. Preparación de bahías interiores con aspiradoras y vapor.',
        vehiculosEnEseMomento: [
          { placa: 'QAZ-881', cliente: 'Esteban Cárdenas', tipo: 'Auto', servicio: 'Lavado Premium', estado: 'En Proceso', tecnico: 'Fabián' }
        ]
      },
      {
        hourIndex: 1,
        hourLabel: '08:00 AM',
        enEspera: 1,
        enProceso: 2,
        completados: 1,
        motosEnTaller: 1,
        autosEnTaller: 2,
        ocupacionPct: 35,
        tiempoPromedioEsperaMin: 25,
        notaOperativa: 'Bajo flujo exterior por lluvia, se activó promoción de cera hidrofóbica.',
        vehiculosEnEseMomento: [
          { placa: 'WER-33F', cliente: 'Mauricio Paz', tipo: 'Moto', servicio: 'Desengrase y Cera Hydro', estado: 'En Proceso', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 2,
        hourLabel: '09:00 AM',
        enEspera: 2,
        enProceso: 3,
        completados: 2,
        motosEnTaller: 2,
        autosEnTaller: 3,
        ocupacionPct: 55,
        tiempoPromedioEsperaMin: 35,
        notaOperativa: '3 autos solicitaron interior profundo para secar tapicerías mojadas.',
        vehiculosEnEseMomento: [
          { placa: 'WER-33F', cliente: 'Mauricio Paz', tipo: 'Moto', servicio: 'Desengrase y Cera Hydro', estado: 'En Proceso', tecnico: 'Mateo' },
          { placa: 'KIO-904', cliente: 'Sandra Mejía', tipo: 'Auto', servicio: 'Aspirado y Detallado Interior', estado: 'En Proceso', tecnico: 'Fabián' }
        ]
      },
      {
        hourIndex: 3,
        hourLabel: '10:00 AM',
        enEspera: 3,
        enProceso: 4,
        completados: 4,
        motosEnTaller: 3,
        autosEnTaller: 4,
        ocupacionPct: 70,
        tiempoPromedioEsperaMin: 40,
        notaOperativa: 'El clima despejó a las 10:15 AM y comenzaron a llegar motocicletas.',
        vehiculosEnEseMomento: [
          { placa: 'KIO-904', cliente: 'Sandra Mejía', tipo: 'Auto', servicio: 'Aspirado Interior', estado: 'En Proceso', tecnico: 'Fabián' },
          { placa: 'VFR-12B', cliente: 'Sebastián Ochoa', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 4,
        hourLabel: '11:00 AM',
        enEspera: 4,
        enProceso: 4,
        completados: 7,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 80,
        tiempoPromedioEsperaMin: 45,
        notaOperativa: 'Entrada acelerada tras cesar la lluvia.',
        vehiculosEnEseMomento: [
          { placa: 'VFR-12B', cliente: 'Sebastián Ochoa', tipo: 'Moto', servicio: 'Lavado Técnico Detallado', estado: 'En Proceso', tecnico: 'Mateo' }
        ]
      },
      {
        hourIndex: 5,
        hourLabel: '12:00 PM',
        enEspera: 3,
        enProceso: 3,
        completados: 10,
        motosEnTaller: 3,
        autosEnTaller: 3,
        ocupacionPct: 50,
        tiempoPromedioEsperaMin: 30,
        notaOperativa: 'Almuerzo regular de cuadrilla técnica.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 6,
        hourLabel: '01:00 PM',
        enEspera: 2,
        enProceso: 3,
        completados: 11,
        motosEnTaller: 2,
        autosEnTaller: 3,
        ocupacionPct: 50,
        tiempoPromedioEsperaMin: 25,
        notaOperativa: 'Reapertura normal de estaciones de secado.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 7,
        hourLabel: '02:00 PM',
        enEspera: 4,
        enProceso: 4,
        completados: 13,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 75,
        tiempoPromedioEsperaMin: 40,
        notaOperativa: 'Fuerte demanda de desengrase de cadena post-lluvia.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 8,
        hourLabel: '03:00 PM',
        enEspera: 5,
        enProceso: 5,
        completados: 15,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 92,
        tiempoPromedioEsperaMin: 50,
        notaOperativa: 'Pico del lunes: 5 bahías activas simultáneamente.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 9,
        hourLabel: '04:00 PM',
        enEspera: 4,
        enProceso: 4,
        completados: 17,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 80,
        tiempoPromedioEsperaMin: 42,
        notaOperativa: 'Entregas de combos élite de inicio de semana.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 10,
        hourLabel: '05:00 PM',
        enEspera: 2,
        enProceso: 3,
        completados: 19,
        motosEnTaller: 3,
        autosEnTaller: 2,
        ocupacionPct: 55,
        tiempoPromedioEsperaMin: 28,
        notaOperativa: 'Últimos 2 vehículos en proceso de secado.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 11,
        hourLabel: '06:00 PM',
        enEspera: 0,
        enProceso: 1,
        completados: 20,
        motosEnTaller: 1,
        autosEnTaller: 0,
        ocupacionPct: 20,
        tiempoPromedioEsperaMin: 15,
        notaOperativa: 'Cierre con 20 vehículos atendidos y facturados.',
        vehiculosEnEseMomento: []
      }
    ]
  },

  // =========================================================================
  // HACE 4 DÍAS (Sábado 03 de Octubre) - Sábado de Pico Máximo
  // =========================================================================
  {
    id: 'hace-4-dias',
    label: 'Hace 4 Días (Sábado Pico)',
    fechaTexto: 'Sábado 03 de Octubre',
    clima: 'Día soleado / Pico Máximo de Fin de Semana',
    totalFinalizadoDia: 39,
    picoHora: '10:00 AM & 03:00 PM',
    snapshots: [
      {
        hourIndex: 0,
        hourLabel: '07:00 AM',
        enEspera: 3,
        enProceso: 3,
        completados: 0,
        motosEnTaller: 3,
        autosEnTaller: 3,
        ocupacionPct: 60,
        tiempoPromedioEsperaMin: 35,
        notaOperativa: 'Apertura con cola de espera desde las 6:45 AM.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 1,
        hourLabel: '08:00 AM',
        enEspera: 6,
        enProceso: 5,
        completados: 2,
        motosEnTaller: 6,
        autosEnTaller: 5,
        ocupacionPct: 95,
        tiempoPromedioEsperaMin: 55,
        notaOperativa: 'Sábado de viajes: familias y motociclistas preparan vehículos.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 2,
        hourLabel: '09:00 AM',
        enEspera: 8,
        enProceso: 6,
        completados: 6,
        motosEnTaller: 8,
        autosEnTaller: 6,
        ocupacionPct: 100,
        tiempoPromedioEsperaMin: 70,
        notaOperativa: 'Capacidad máxima de bahías. Se asigna técnico de apoyo.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 3,
        hourLabel: '10:00 AM',
        enEspera: 9,
        enProceso: 6,
        completados: 11,
        motosEnTaller: 9,
        autosEnTaller: 6,
        ocupacionPct: 100,
        tiempoPromedioEsperaMin: 80,
        notaOperativa: 'Pico Absoluto Matutino: 9 vehículos en espera.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 4,
        hourLabel: '11:00 AM',
        enEspera: 8,
        enProceso: 6,
        completados: 16,
        motosEnTaller: 8,
        autosEnTaller: 6,
        ocupacionPct: 100,
        tiempoPromedioEsperaMin: 75,
        notaOperativa: 'Rotación acelerada de lavados rápidos para despejar bahía 1.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 5,
        hourLabel: '12:00 PM',
        enEspera: 6,
        enProceso: 5,
        completados: 20,
        motosEnTaller: 6,
        autosEnTaller: 5,
        ocupacionPct: 90,
        tiempoPromedioEsperaMin: 60,
        notaOperativa: 'Jornada continua sin parar bahías.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 6,
        hourLabel: '01:00 PM',
        enEspera: 5,
        enProceso: 5,
        completados: 24,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 88,
        tiempoPromedioEsperaMin: 55,
        notaOperativa: '24 vehículos ya completados al mediodía.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 7,
        hourLabel: '02:00 PM',
        enEspera: 6,
        enProceso: 6,
        completados: 28,
        motosEnTaller: 6,
        autosEnTaller: 6,
        ocupacionPct: 96,
        tiempoPromedioEsperaMin: 65,
        notaOperativa: 'Llegada de caravana de 4 motocicletas MotoCraft.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 8,
        hourLabel: '03:00 PM',
        enEspera: 7,
        enProceso: 6,
        completados: 31,
        motosEnTaller: 7,
        autosEnTaller: 6,
        ocupacionPct: 100,
        tiempoPromedioEsperaMin: 70,
        notaOperativa: 'Segundo pico del sábado.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 9,
        hourLabel: '04:00 PM',
        enEspera: 5,
        enProceso: 5,
        completados: 35,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 85,
        tiempoPromedioEsperaMin: 50,
        notaOperativa: 'Secado y acabados de ceras Hydro.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 10,
        hourLabel: '05:00 PM',
        enEspera: 3,
        enProceso: 4,
        completados: 38,
        motosEnTaller: 4,
        autosEnTaller: 3,
        ocupacionPct: 65,
        tiempoPromedioEsperaMin: 35,
        notaOperativa: 'Cierre de admisiones de nuevos turnos largos.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 11,
        hourLabel: '06:00 PM',
        enEspera: 0,
        enProceso: 2,
        completados: 39,
        motosEnTaller: 1,
        autosEnTaller: 1,
        ocupacionPct: 30,
        tiempoPromedioEsperaMin: 20,
        notaOperativa: 'Récord del fin de semana: 39 vehículos completados.',
        vehiculosEnEseMomento: []
      }
    ]
  },

  // =========================================================================
  // HACE 7 DÍAS (Miércoles 30 de Septiembre) - Cierre de Mes
  // =========================================================================
  {
    id: 'hace-7-dias',
    label: 'Hace 7 Días (Cierre de Mes)',
    fechaTexto: 'Miércoles 30 de Septiembre',
    clima: 'Día templado con alto volumen corporativo',
    totalFinalizadoDia: 27,
    picoHora: '11:00 AM',
    snapshots: [
      {
        hourIndex: 0,
        hourLabel: '07:00 AM',
        enEspera: 1,
        enProceso: 1,
        completados: 0,
        motosEnTaller: 1,
        autosEnTaller: 1,
        ocupacionPct: 20,
        tiempoPromedioEsperaMin: 20,
        notaOperativa: 'Apertura puntual de la jornada.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 1,
        hourLabel: '08:00 AM',
        enEspera: 3,
        enProceso: 2,
        completados: 1,
        motosEnTaller: 3,
        autosEnTaller: 2,
        ocupacionPct: 40,
        tiempoPromedioEsperaMin: 30,
        notaOperativa: 'Ingreso regular matutino.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 2,
        hourLabel: '09:00 AM',
        enEspera: 4,
        enProceso: 4,
        completados: 3,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 75,
        tiempoPromedioEsperaMin: 45,
        notaOperativa: 'Vehículos comerciales para lavado y aspirado.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 3,
        hourLabel: '10:00 AM',
        enEspera: 5,
        enProceso: 5,
        completados: 6,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 90,
        tiempoPromedioEsperaMin: 50,
        notaOperativa: 'Pico de mañana.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 4,
        hourLabel: '11:00 AM',
        enEspera: 6,
        enProceso: 5,
        completados: 9,
        motosEnTaller: 6,
        autosEnTaller: 5,
        ocupacionPct: 95,
        tiempoPromedioEsperaMin: 55,
        notaOperativa: 'Pico máximo de cierre de mes.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 5,
        hourLabel: '12:00 PM',
        enEspera: 3,
        enProceso: 3,
        completados: 14,
        motosEnTaller: 3,
        autosEnTaller: 3,
        ocupacionPct: 55,
        tiempoPromedioEsperaMin: 30,
        notaOperativa: 'Almuerzo de equipo técnico.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 6,
        hourLabel: '01:00 PM',
        enEspera: 2,
        enProceso: 3,
        completados: 16,
        motosEnTaller: 2,
        autosEnTaller: 3,
        ocupacionPct: 50,
        tiempoPromedioEsperaMin: 25,
        notaOperativa: 'Reactivación de la tarde.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 7,
        hourLabel: '02:00 PM',
        enEspera: 4,
        enProceso: 4,
        completados: 18,
        motosEnTaller: 4,
        autosEnTaller: 4,
        ocupacionPct: 70,
        tiempoPromedioEsperaMin: 38,
        notaOperativa: 'Detallado cerámico de moto en cabina cerrada.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 8,
        hourLabel: '03:00 PM',
        enEspera: 5,
        enProceso: 4,
        completados: 20,
        motosEnTaller: 5,
        autosEnTaller: 4,
        ocupacionPct: 85,
        tiempoPromedioEsperaMin: 45,
        notaOperativa: 'Flujo vespertino regular.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 9,
        hourLabel: '04:00 PM',
        enEspera: 5,
        enProceso: 5,
        completados: 23,
        motosEnTaller: 5,
        autosEnTaller: 5,
        ocupacionPct: 90,
        tiempoPromedioEsperaMin: 50,
        notaOperativa: 'Secado y acabados de final del día.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 10,
        hourLabel: '05:00 PM',
        enEspera: 2,
        enProceso: 3,
        completados: 25,
        motosEnTaller: 3,
        autosEnTaller: 2,
        ocupacionPct: 60,
        tiempoPromedioEsperaMin: 30,
        notaOperativa: 'Entregas a clientes corporativos.',
        vehiculosEnEseMomento: []
      },
      {
        hourIndex: 11,
        hourLabel: '06:00 PM',
        enEspera: 0,
        enProceso: 2,
        completados: 27,
        motosEnTaller: 1,
        autosEnTaller: 1,
        ocupacionPct: 25,
        tiempoPromedioEsperaMin: 15,
        notaOperativa: 'Cierre del mes con balance financiero positivo.',
        vehiculosEnEseMomento: []
      }
    ]
  }
];
