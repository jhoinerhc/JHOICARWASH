import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CatalogItem, ItemCategory, OrderStatus } from '../types';
import { formatCOP, formatDuration, formatPlate } from '../utils/formatters';
import { HISTORICAL_QUEUE_DAYS } from '../data/historicalQueueData';
import { 
  Bike, 
  Car, 
  Package, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  Timer, 
  Play, 
  Check, 
  User, 
  FileCheck2,
  ShieldCheck,
  Zap,
  Info,
  X,
  Flame,
  Award,
  History,
  Calendar,
  RotateCcw,
  Sliders,
  Layers,
  Radio,
  TrendingUp,
  BarChart2,
  CalendarClock
} from 'lucide-react';

export const Board2POSQueue: React.FC = () => {
  const {
    catalogItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCOP,
    cartTotalDurationMin,
    orders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    setReceiptOrder,
    showToast
  } = useApp();

  // Active category in POS catalog
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('motos');

  // Customer & Turn registration form
  const [clientName, setClientName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [vehicleType, setVehicleType] = useState<'Moto' | 'Auto' | 'Especial'>('Moto');
  const [technicianName, setTechnicianName] = useState('Mateo (MotoCraft Lead)');
  const [notes, setNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'Todos'>('Todos');

  // Workshop audit mode: 'live' (real time) vs 'historical' (discriminated by past day and hours)
  const [auditMode, setAuditMode] = useState<'live' | 'historical'>('live');
  const [selectedDayId, setSelectedDayId] = useState<string>('ayer');
  const [selectedHourIndex, setSelectedHourIndex] = useState<number>(3); // 10:00 AM by default
  const [showVehiclesAtHour, setShowVehiclesAtHour] = useState<boolean>(true);
  const [showTimelineGraph, setShowTimelineGraph] = useState<boolean>(false);

  // Modal to inspect full service details, guarantee, and inclusions
  const [selectedDetailItem, setSelectedDetailItem] = useState<CatalogItem | null>(null);

  // Switch default vehicle type when changing category
  const handleCategorySwitch = (cat: ItemCategory) => {
    setActiveCategory(cat);
    if (cat === 'motos') setVehicleType('Moto');
    if (cat === 'autos') setVehicleType('Auto');
  };

  const handlePlateChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setVehiclePlate(clean);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      showToast('Por favor ingresa el nombre del cliente.', 'error');
      return;
    }
    if (!vehiclePlate.trim()) {
      showToast('Por favor ingresa la placa del vehículo (ej. XYZ-123).', 'error');
      return;
    }
    if (cart.length === 0) {
      showToast('El carrito está vacío. Agrega al menos un servicio o producto.', 'error');
      return;
    }

    const order = createOrder({
      clientName,
      vehiclePlate: formatPlate(vehiclePlate),
      clientPhone,
      vehicleType,
      technicianName,
      notes
    });

    if (order) {
      setClientName('');
      setVehiclePlate('');
      setClientPhone('');
      setNotes('');
    }
  };

  const filteredCatalog = catalogItems.filter(item => item.category === activeCategory);

  const filteredOrders = orders.filter(ord => {
    if (statusFilter === 'Todos') return true;
    return ord.status === statusFilter;
  });

  const waitingCount = orders.filter(o => o.status === 'En Espera').length;
  const inProgressCount = orders.filter(o => o.status === 'En Proceso').length;
  const completedCount = orders.filter(o => o.status === 'Finalizado').length;

  // Historical data lookup for selected past day and hour
  const currentDayData = HISTORICAL_QUEUE_DAYS.find(d => d.id === selectedDayId) || HISTORICAL_QUEUE_DAYS[0];
  const activeSnapshot = currentDayData.snapshots[selectedHourIndex] || currentDayData.snapshots[0];

  // Dynamic counts: live right now OR historical at specific past day and hour
  const displayedWaitingCount = auditMode === 'live' ? waitingCount : activeSnapshot.enEspera;
  const displayedInProgressCount = auditMode === 'live' ? inProgressCount : activeSnapshot.enProceso;
  const displayedCompletedCount = auditMode === 'live' ? completedCount : activeSnapshot.completados;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner with Official Logo & Workshop Live / Historical Counters */}
      <div className="bg-gradient-to-r from-[#003399] via-[#091f4b] to-[#0E1522] p-5 sm:p-6 rounded-3xl border border-[#00E5FF]/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] bg-[#070D18] shrink-0 p-0.5">
              <img
                src="/logo.jpg"
                alt="Logo JHOICARWASH"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00E5FF]/40">
                <Sparkles className="w-3.5 h-3.5" />
                ¡EL SPA DE TU VEHICULO! • Catálogo & Turnos
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Servicios & Combos de Detallado Técnico
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-0.5">
                Punto de venta oficial (POS), recepción de clientes y monitor de bahías en tiempo real con auditoría histórica por horas y días.
              </p>
            </div>
          </div>

          {/* Real-time vs Historical Mode Selector Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#0B1019]/90 p-1.5 rounded-2xl border border-[#27384E]">
            <button
              onClick={() => setAuditMode('live')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                auditMode === 'live'
                  ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/50 shadow-lg shadow-[#003399]/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]"></span>
              </span>
              <span>En Tiempo Real (Hoy)</span>
            </button>

            <button
              onClick={() => setAuditMode('historical')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                auditMode === 'historical'
                  ? 'bg-gradient-to-r from-purple-900 to-[#003399] text-white border border-purple-400/50 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5 text-purple-300" />
              <span>Discriminar Días & Horas</span>
            </button>
          </div>
        </div>

        {/* 3 Core Counter Cards (En Espera, En Proceso, Completados) */}
        <div className="pt-2 border-t border-[#1C2C40] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Estado de Bahías:</span>
            {auditMode === 'live' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40 text-[11px]">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Taller en Vivo Ahora Mismo
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 text-purple-200 font-bold border border-purple-400/40 text-[11px]">
                <Clock className="w-3 h-3 text-[#00E5FF]" />
                Auditoría Histórica: {currentDayData.label} • {activeSnapshot.hourLabel}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            {/* Card 1: En Espera */}
            <div className={`px-4 py-3 rounded-2xl border text-center transition-all ${
              auditMode === 'historical' 
                ? 'bg-[#121926] border-amber-500/50 ring-1 ring-amber-500/20' 
                : 'bg-[#121926]/90 border-amber-500/30'
            }`}>
              <div className="flex items-center justify-center gap-1 text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                <Clock className="w-3 h-3" />
                <span>En Espera</span>
              </div>
              <span className="font-mono font-black text-2xl sm:text-3xl text-amber-400">
                {displayedWaitingCount}
              </span>
              <span className="block text-[9px] text-slate-400 mt-0.5">
                {auditMode === 'live' ? 'En cola de bahía' : `A las ${activeSnapshot.hourLabel}`}
              </span>
            </div>

            {/* Card 2: En Proceso */}
            <div className={`px-4 py-3 rounded-2xl border text-center transition-all ${
              auditMode === 'historical' 
                ? 'bg-[#121926] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]' 
                : 'bg-[#121926]/90 border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
            }`}>
              <div className="flex items-center justify-center gap-1 text-[10px] text-[#00E5FF] font-bold uppercase tracking-wider mb-0.5">
                <Timer className="w-3 h-3 animate-spin" />
                <span>En Proceso</span>
              </div>
              <span className="font-mono font-black text-2xl sm:text-3xl text-[#00E5FF]">
                {displayedInProgressCount}
              </span>
              <span className="block text-[9px] text-slate-400 mt-0.5">
                {auditMode === 'live' ? 'Lavado / Detallado' : `En bahías activas`}
              </span>
            </div>

            {/* Card 3: Completados */}
            <div className={`px-4 py-3 rounded-2xl border text-center transition-all ${
              auditMode === 'historical' 
                ? 'bg-[#121926] border-emerald-500/50 ring-1 ring-emerald-500/20' 
                : 'bg-[#121926]/90 border-emerald-500/30'
            }`}>
              <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>Completados</span>
              </div>
              <span className="font-mono font-black text-2xl sm:text-3xl text-emerald-400">
                {displayedCompletedCount}
              </span>
              <span className="block text-[9px] text-slate-400 mt-0.5">
                {auditMode === 'live' ? 'Listos para entrega' : `Acumulado hasta hora`}
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* INTERACTIVE HISTORICAL AUDIT PANEL (DAYS & HOURS TIMELINE)           */}
        {/* ==================================================================== */}
        {auditMode === 'historical' && (
          <div className="pt-4 border-t border-[#203248] space-y-5 animate-fade-in">
            {/* Step 1: Day Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                1. Selecciona el Día Anterior a Discriminar:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HISTORICAL_QUEUE_DAYS.map(day => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedDayId === day.id
                        ? 'bg-[#003399] border-[#00E5FF] shadow-lg shadow-[#003399]/50'
                        : 'bg-[#111824] border-[#223145] hover:border-slate-400 text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">{day.label}</span>
                    <span className="text-[10px] text-[#00E5FF] block font-medium mt-0.5">{day.fechaTexto}</span>
                    <span className="text-[9px] text-slate-300 block opacity-80 mt-1">
                      Total: {day.totalFinalizadoDia} vehículos | {day.clima}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Hourly Selector & Slider */}
            <div className="space-y-3 bg-[#0B1019]/95 p-4 sm:p-5 rounded-2xl border border-[#27384E]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    2. Selecciona la Hora Específica ({activeSnapshot.hourLabel}):
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#00E5FF] font-bold bg-[#00E5FF]/10 px-3 py-0.5 rounded-full border border-[#00E5FF]/30">
                  {currentDayData.fechaTexto} a las {activeSnapshot.hourLabel}
                </span>
              </div>

              {/* Hourly Quick Jump Buttons (07:00 AM to 06:00 PM) */}
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
                {currentDayData.snapshots.map((snap, idx) => {
                  const isActive = selectedHourIndex === idx;
                  const totalVehiclesAtHour = snap.enEspera + snap.enProceso;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedHourIndex(idx)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#00E5FF] text-black font-black border-[#00E5FF] shadow-md shadow-[#00E5FF]/30 scale-105'
                          : 'bg-[#141C2B] text-slate-300 border-[#233347] hover:border-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] block font-mono font-bold leading-tight">
                        {snap.hourLabel}
                      </span>
                      <span className={`text-[9px] block font-semibold mt-0.5 ${isActive ? 'text-black' : 'text-slate-400'}`}>
                        {totalVehiclesAtHour} en taller
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slider Controller */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>07:00 AM (Apertura)</span>
                  <span className="text-[#00E5FF] font-bold">Desliza para viajar en el tiempo</span>
                  <span>06:00 PM (Cierre)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={selectedHourIndex}
                  onChange={e => setSelectedHourIndex(Number(e.target.value))}
                  className="w-full accent-[#00E5FF] cursor-pointer h-2 bg-[#1A2637] rounded-lg"
                />
              </div>
            </div>

            {/* Step 3: Exact Hourly Diagnostic Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C1524] via-[#101D31] to-[#14233A] border-2 border-[#00E5FF]/40 shadow-xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00E5FF] block mb-1">
                    Auditoría de Ocupación Vehicular
                  </span>
                  <h4 className="font-heading font-black text-base sm:text-lg text-white leading-snug">
                    El día <span className="text-[#00E5FF]">{currentDayData.fechaTexto}</span> a las <span className="text-[#00E5FF]">{activeSnapshot.hourLabel}</span> teníamos:
                  </h4>
                  <p className="text-xs text-slate-200 mt-1">
                    <strong className="text-amber-400">{activeSnapshot.enEspera} vehículos en espera</strong>, <strong className="text-[#00E5FF]">{activeSnapshot.enProceso} vehículos en proceso</strong> y <strong className="text-emerald-400">{activeSnapshot.completados} vehículos terminados</strong> acumulados en esa hora.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAuditMode('live')}
                    className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#00E5FF]/30 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Volver a Tiempo Real</span>
                  </button>
                </div>
              </div>

              {/* Detailed Metrics Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#23354C]">
                <div className="p-2.5 bg-[#0A1019] rounded-xl border border-[#202E42]">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Desglose Vehicular</span>
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1 mt-0.5">
                    <Bike className="w-3.5 h-3.5 text-[#00E5FF]" /> {activeSnapshot.motosEnTaller} Motos • <Car className="w-3.5 h-3.5 text-indigo-400" /> {activeSnapshot.autosEnTaller} Autos
                  </span>
                </div>

                <div className="p-2.5 bg-[#0A1019] rounded-xl border border-[#202E42]">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Ocupación de Bahías</span>
                  <span className="text-xs font-mono font-bold text-[#00E5FF] mt-0.5 block">
                    {activeSnapshot.ocupacionPct}% de capacidad
                  </span>
                </div>

                <div className="p-2.5 bg-[#0A1019] rounded-xl border border-[#202E42]">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Tiempo Promedio Espera</span>
                  <span className="text-xs font-mono font-bold text-amber-400 mt-0.5 block">
                    ~{activeSnapshot.tiempoPromedioEsperaMin} minutos
                  </span>
                </div>

                <div className="p-2.5 bg-[#0A1019] rounded-xl border border-[#202E42]">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Pico Máximo del Día</span>
                  <span className="text-xs font-mono font-bold text-purple-300 mt-0.5 block">
                    {currentDayData.picoHora}
                  </span>
                </div>
              </div>

              {/* Operational Field Note */}
              {activeSnapshot.notaOperativa && (
                <div className="p-2.5 bg-[#09111D] rounded-xl border border-[#1E2E44] text-[11px] text-slate-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Bitácora de Bahía a las {activeSnapshot.hourLabel}:</strong> {activeSnapshot.notaOperativa}
                  </div>
                </div>
              )}

              {/* View Vehicles at that Moment Toggle */}
              {activeSnapshot.vehiculosEnEseMomento && activeSnapshot.vehiculosEnEseMomento.length > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowVehiclesAtHour(!showVehiclesAtHour)}
                    className="text-xs font-bold text-[#00E5FF] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{showVehiclesAtHour ? 'Ocultar' : 'Ver'} Vehículos que estaban en el taller a las {activeSnapshot.hourLabel} ({activeSnapshot.vehiculosEnEseMomento.length})</span>
                  </button>

                  {showVehiclesAtHour && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-3 animate-fade-in">
                      {activeSnapshot.vehiculosEnEseMomento.map((vh, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#0B1019] border border-[#223145] text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-black text-xs text-[#00E5FF] bg-black/60 px-2 py-0.5 rounded border border-[#00E5FF]/40">
                              {vh.placa}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              vh.estado === 'En Proceso' ? 'bg-[#003399] text-[#00E5FF]' : 'bg-amber-950 text-amber-300'
                            }`}>
                              {vh.estado}
                            </span>
                          </div>
                          <p className="font-bold text-white text-xs truncate mt-1">{vh.cliente}</p>
                          <p className="text-[11px] text-slate-300 truncate">{vh.servicio}</p>
                          <span className="text-[10px] text-slate-400 block font-semibold">Técnico: {vh.tecnico}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left Catalog, Right POS Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Category Tabs & Catalog Cards (7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Enhanced Category Tabs with Combos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#121926] p-2 rounded-2xl border border-[#233145]">
            {/* Motos */}
            <button
              onClick={() => handleCategorySwitch('motos')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeCategory === 'motos'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white shadow-lg shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bike className={`w-4 h-4 mb-1 ${activeCategory === 'motos' ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
              <span className="leading-tight block">Motocicletas</span>
              <span className="text-[9px] opacity-75 block font-normal">MotoCraft</span>
            </button>

            {/* Autos */}
            <button
              onClick={() => handleCategorySwitch('autos')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeCategory === 'autos'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white shadow-lg shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Car className={`w-4 h-4 mb-1 ${activeCategory === 'autos' ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
              <span className="leading-tight block">Automóviles</span>
              <span className="text-[9px] opacity-75 block font-normal">Auto Care</span>
            </button>

            {/* Combos */}
            <button
              onClick={() => handleCategorySwitch('combos')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeCategory === 'combos'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white shadow-lg shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className={`w-4 h-4 mb-1 ${activeCategory === 'combos' ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
              <span className="leading-tight block">Combos Pro</span>
              <span className="text-[9px] text-[#00E5FF] block font-semibold">Mayor Ahorro</span>
            </button>

            {/* Extras */}
            <button
              onClick={() => handleCategorySwitch('extras')}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeCategory === 'extras'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white shadow-lg shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className={`w-4 h-4 mb-1 ${activeCategory === 'extras' ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
              <span className="leading-tight block">Productos Extras</span>
              <span className="text-[9px] opacity-75 block font-normal">Cuidado en Casa</span>
            </button>
          </div>

          {/* Cards List in Selected Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCatalog.map(item => {
              const inCart = cart.find(c => c.item.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#131B28] rounded-2xl border border-[#243347] hover:border-[#00E5FF]/50 p-4 transition-all duration-200 flex flex-col justify-between shadow-md relative group"
                >
                  <div>
                    {/* Image with Clear Category Vehicle Stamp */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black/50">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        {item.category === 'motos' && (
                          <span className="bg-[#003399]/90 text-[#00E5FF] text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#00E5FF]/40 flex items-center gap-1">
                            <Bike className="w-2.5 h-2.5" /> MotoCraft
                          </span>
                        )}
                        {item.category === 'autos' && (
                          <span className="bg-indigo-950/90 text-indigo-200 text-[9px] font-bold px-2 py-0.5 rounded-md border border-indigo-400/40 flex items-center gap-1">
                            <Car className="w-2.5 h-2.5" /> Auto Care
                          </span>
                        )}
                        {item.category === 'combos' && (
                          <span className="bg-emerald-950/90 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/40 flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> Combo Especial
                          </span>
                        )}
                        {item.savingsCOP && (
                          <span className="bg-[#00E5FF] text-black text-[9px] font-black px-2 py-0.5 rounded-md shadow">
                            Ahorras {formatCOP(item.savingsCOP)}
                          </span>
                        )}
                      </div>

                      {item.durationMin ? (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-white bg-black/85 px-2 py-0.5 rounded-md border border-white/20">
                          <Clock className="w-3 h-3 text-[#00E5FF]" />
                          <span>{item.durationMin} min</span>
                        </div>
                      ) : (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-black/85 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          <Package className="w-3 h-3" />
                          <span>Stock: {item.stock ?? 15} u.</span>
                        </div>
                      )}

                      {/* Detail Inspection Trigger */}
                      <button
                        type="button"
                        onClick={() => setSelectedDetailItem(item)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-[#003399] text-white border border-white/20 text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Ver qué incluye este servicio"
                      >
                        <Info className="w-3 h-3 text-[#00E5FF]" />
                        <span>Ver Detalle</span>
                      </button>
                    </div>

                    <h4 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                      {item.name}
                    </h4>
                    
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Quick Inclusions preview for clarity */}
                    {item.includes && item.includes.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[#1F2C3F] text-[10px] text-slate-300 space-y-1">
                        <span className="text-[#00E5FF] font-semibold block uppercase tracking-wider text-[9px]">
                          ✓ Incluye directamente:
                        </span>
                        <ul className="space-y-0.5 text-slate-400">
                          {item.includes.slice(0, 2).map((inc, i) => (
                            <li key={i} className="truncate">• {inc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="mt-3 pt-3 border-t border-[#202C3F] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">
                        Precio Neto (COP)
                      </span>
                      <span className="font-mono font-bold text-base text-[#00E5FF]">
                        {formatCOP(item.priceCOP)}
                      </span>
                    </div>

                    {inCart ? (
                      <div className="flex items-center gap-1.5 bg-[#1B273A] p-1 rounded-xl border border-[#00E5FF]/40">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#27364D] hover:bg-rose-900 text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs text-[#00E5FF] px-1.5">
                          {inCart.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#003399] hover:bg-[#0044cc] text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#003399] hover:bg-[#0044cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#003399]/30 transition-all hover:scale-102 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>Añadir</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Turn Registration & Dynamic Cart (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <form 
            onSubmit={handleConfirmOrder}
            className="bg-[#121926] rounded-3xl border border-[#2A3B52] shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-[#003399] to-[#0D224E] p-4.5 border-b border-[#00E5FF]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white">
                <ShoppingCart className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="font-heading font-black text-sm uppercase tracking-wider">
                  Orden de Servicio & Turno
                </h3>
              </div>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-slate-300 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Vaciar
                </button>
              )}
            </div>

            <div className="p-5 space-y-5">
              {/* Formulario de Registro de Turno */}
              <div className="space-y-3.5 p-4 bg-[#162030] rounded-2xl border border-[#26374D]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    1. Datos de Turno & Vehículo
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Recepción Express</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Nombre del Cliente *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="Ej. Andrés Restrepo"
                      className="w-full px-3 py-2 rounded-xl bg-[#0F1622] border border-[#2C3E56] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Placa del Vehículo *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      value={vehiclePlate}
                      onChange={e => handlePlateChange(e.target.value)}
                      placeholder="XYZ-123"
                      className="w-full px-3 py-2 rounded-xl bg-[#0F1622] border border-[#2C3E56] focus:border-[#00E5FF] text-yellow-300 font-mono font-bold tracking-widest text-xs uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Tipo de Vehículo
                    </label>
                    <select
                      value={vehicleType}
                      onChange={e => setVehicleType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0F1622] border border-[#2C3E56] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                    >
                      <option value="Moto">Motocicleta (MotoCraft)</option>
                      <option value="Auto">Automóvil (Auto Care)</option>
                      <option value="Especial">Camioneta / SUV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Teléfono WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="310 000 0000"
                      className="w-full px-3 py-2 rounded-xl bg-[#0F1622] border border-[#2C3E56] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Técnico Encargado
                  </label>
                  <select
                    value={technicianName}
                    onChange={e => setTechnicianName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1622] border border-[#2C3E56] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                  >
                    <option value="Mateo (MotoCraft Lead)">Mateo (MotoCraft Lead)</option>
                    <option value="David (Auto Care Master)">David (Auto Care Master)</option>
                    <option value="Sebastián (Ceramic Pro)">Sebastián (Ceramic Pro)</option>
                    <option value="Equipo General de Bahía">Equipo General de Bahía</option>
                  </select>
                </div>
              </div>

              {/* 2. Carrito de Compras Dinámico */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    2. Servicios y Productos Seleccionados
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {cart.reduce((a, b) => a + b.quantity, 0)} ítems
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-6 px-4 border border-dashed border-[#243347] rounded-2xl bg-[#0F1622]/60">
                    <ShoppingCart className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">
                      No has añadido servicios ni productos al carrito todavía.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Haz clic en "Añadir" en el catálogo de la izquierda.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {cart.map(ci => (
                      <div
                        key={ci.item.id}
                        className="flex items-center justify-between p-2.5 bg-[#162030] rounded-xl border border-[#27384E] text-xs"
                      >
                        <div className="flex-1 pr-2">
                          <span className="font-semibold text-white block truncate">
                            {ci.item.name}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                            <span className="text-[#00E5FF] font-mono font-bold">
                              {formatCOP(ci.item.priceCOP)} c/u
                            </span>
                            {ci.item.durationMin && (
                              <span>• {ci.item.durationMin * ci.quantity} min</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center bg-[#0F1622] rounded-lg border border-[#2D3E56]">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(ci.item.id, -1)}
                              className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-mono font-bold text-white text-xs">
                              {ci.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(ci.item.id, 1)}
                              className="p-1 hover:text-[#00E5FF] text-slate-400 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(ci.item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Metrics: Total COP & Tiempo Total Estimado de Espera */}
              <div className="p-4 bg-gradient-to-r from-[#0C1A30] to-[#12223D] rounded-2xl border border-[#00E5FF]/40 space-y-3">
                {/* Tiempo Total de Espera / Ejecución */}
                <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[#213550]">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#00E5FF]" />
                    Tiempo Estimado de Espera / Ejecución:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#00E5FF] bg-black/40 px-2.5 py-0.5 rounded-lg border border-[#00E5FF]/30">
                    {formatDuration(cartTotalDurationMin)}
                  </span>
                </div>

                {/* Total en COP */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Total a Liquidar (COP)
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Tarifa Neta Garantizada JHOICARWASH
                    </span>
                  </div>
                  <span className="font-mono font-black text-2xl sm:text-3xl text-white">
                    {formatCOP(cartTotalCOP)}
                  </span>
                </div>
              </div>

              {/* Botón Confirmar Orden de Servicio */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className={`w-full py-3.5 px-4 rounded-xl font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  cart.length > 0
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#00b0ff] text-black shadow-lg shadow-[#00E5FF]/25 hover:brightness-110 active:scale-98'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <FileCheck2 className="w-5 h-5 text-black" />
                <span>Confirmar Orden & Asignar Turno</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL DE DETALLE Y QUÉ INCLUYE EL SERVICIO (MÁXIMA CONFIANZA) */}
      {/* ============================================================== */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-xl bg-[#0F1522] rounded-3xl border border-[#283B52] shadow-2xl overflow-hidden my-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedDetailItem.imageUrl}
                alt={selectedDetailItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1522] via-[#0F1522]/30 to-black/60" />
              
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider block mb-1">
                  {selectedDetailItem.category === 'motos' ? 'Especialización MotoCraft' : selectedDetailItem.category === 'autos' ? 'Especialización Auto Care' : 'Combo Especial JHOICARWASH'}
                </span>
                <h3 className="font-heading font-black text-xl text-white">
                  {selectedDetailItem.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-slate-300">
              <p className="text-slate-300 leading-relaxed text-sm">
                {selectedDetailItem.description}
              </p>

              {/* Quality & Guarantee Stamp */}
              {selectedDetailItem.guarantee && (
                <div className="p-3.5 bg-[#122238] rounded-2xl border border-[#00E5FF]/40 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading text-xs">Garantía de Calidad:</strong>
                    <span className="text-slate-300">{selectedDetailItem.guarantee}</span>
                  </div>
                </div>
              )}

              {/* What is Included (¿Qué incluye?) */}
              {selectedDetailItem.includes && selectedDetailItem.includes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-[#00E5FF]">
                    ¿Qué incluye paso a paso?
                  </h4>
                  <ul className="space-y-2 bg-[#141C2B] p-4 rounded-2xl border border-[#223348]">
                    {selectedDetailItem.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Benefits */}
              {selectedDetailItem.benefits && selectedDetailItem.benefits.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-[#00E5FF]">
                    Beneficios para tu vehículo:
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedDetailItem.benefits.map((ben, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing & Duration footer in modal */}
              <div className="pt-4 border-t border-[#1F2C3F] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Tarifa Oficial COP
                  </span>
                  <span className="font-mono font-black text-xl text-[#00E5FF]">
                    {formatCOP(selectedDetailItem.priceCOP)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDetailItem(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedDetailItem);
                      setSelectedDetailItem(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-lg shadow-[#00E5FF]/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir a la Orden</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LISTA DE ESPERA ACTIVA (SERVICE ORDERS & PRODUCTION LINE) */}
      {/* ============================================================== */}
      <div className="mt-12 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-[#00E5FF]" />
              <h3 className="font-heading font-black text-xl text-white">
                Lista de Espera Activa en Taller
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Control de flujo de trabajo en vivo. Cambia estados y visualiza el comprobante de entrega.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#121926] p-1.5 rounded-2xl border border-[#233145] text-xs">
            {(['Todos', 'En Espera', 'En Proceso', 'Finalizado'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-[#003399] text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-[#111723] rounded-3xl border border-dashed border-[#243347]">
              <CheckCircle2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-400 text-sm font-semibold">
                No hay órdenes registradas con este filtro.
              </p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const isWaiting = order.status === 'En Espera';
              const isInProgress = order.status === 'En Proceso';
              const isDone = order.status === 'Finalizado';

              return (
                <div
                  key={order.id}
                  className={`bg-[#121824] rounded-2xl border p-5 transition-all shadow-lg flex flex-col justify-between ${
                    isInProgress
                      ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)] bg-gradient-to-b from-[#131E2E] to-[#111723]'
                      : isWaiting
                      ? 'border-amber-500/40 hover:border-amber-500'
                      : 'border-[#26354A] opacity-90'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Order #, Plate, Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400 block">
                          {order.orderNumber}
                        </span>
                        <h4 className="font-heading font-bold text-base text-white">
                          {order.clientName}
                        </h4>
                      </div>

                      {/* Plate Badge (Colombian Style) */}
                      <div className="flex items-center gap-1 bg-yellow-400 text-black px-2.5 py-1 rounded-md font-mono font-black text-xs tracking-wider shadow-sm border border-yellow-500">
                        {order.vehicleType === 'Moto' ? (
                          <Bike className="w-3.5 h-3.5" />
                        ) : (
                          <Car className="w-3.5 h-3.5" />
                        )}
                        <span>{order.vehiclePlate}</span>
                      </div>
                    </div>

                    {/* Status Badge & Remaining / Total Time */}
                    <div className="flex items-center justify-between p-2.5 bg-[#0C121D] rounded-xl border border-[#212E40]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isInProgress
                              ? 'bg-[#00E5FF] animate-ping'
                              : isWaiting
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <span
                          className={`text-xs font-bold ${
                            isInProgress
                              ? 'text-[#00E5FF]'
                              : isWaiting
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span className="font-mono font-semibold">
                          {formatDuration(order.totalDurationMin)}
                        </span>
                      </div>
                    </div>

                    {/* Services contracted list */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                        Servicios y Combos Contratados:
                      </span>
                      <ul className="text-xs space-y-1 text-slate-300">
                        {order.items.map((ci, idx) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span className="truncate pr-2">
                              • {ci.quantity}x {ci.item.name}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400 shrink-0">
                              {formatCOP(ci.item.priceCOP * ci.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technician info */}
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-[#1F2C3E] flex items-center justify-between">
                      <span>Técnico: <strong className="text-slate-300">{order.technicianName}</strong></span>
                      <span className="font-mono font-bold text-white text-xs">
                        {formatCOP(order.totalCOP)}
                      </span>
                    </div>
                  </div>

                  {/* Order Status Transition Buttons */}
                  <div className="mt-5 pt-3 border-t border-[#1F2C3F] flex items-center gap-2">
                    {isWaiting && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'En Proceso')}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#003399] hover:bg-[#0044cc] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>Iniciar en Bahía</span>
                      </button>
                    )}

                    {isInProgress && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Finalizado')}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Finalizar Servicio</span>
                      </button>
                    )}

                    {isDone && (
                      <div className="flex-1 py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Listo para Entrega</span>
                      </div>
                    )}

                    {/* View Ticket / Receipt Button */}
                    <button
                      onClick={() => setReceiptOrder(order)}
                      className="p-2 rounded-xl bg-[#1B2638] hover:bg-[#253650] text-[#00E5FF] border border-[#2D3F59] transition-colors cursor-pointer"
                      title="Ver Ticket / Imprimir Recibo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas retirar la orden ${order.orderNumber} del sistema?`)) {
                          deleteOrder(order.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-[#1B2638] hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-[#2D3F59] transition-colors cursor-pointer"
                      title="Eliminar orden"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
