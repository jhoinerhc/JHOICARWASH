import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HISTORICAL_DAILY_DATA } from '../data/initialData';
import { 
  BOTTLENECK_METRICS, 
  HOURLY_TRAFFIC_DATA, 
  SEASONAL_FORECAST_DATA, 
  VEHICLE_COMPARISON_TIMEFRAMES,
  AVAILABLE_REWARDS,
  DAILY_ASCENDING_GROWTH,
  MONTHLY_ASCENDING_GROWTH,
  DAILY_SERVICES_PIE_DATA,
  MONTHLY_SERVICES_PIE_DATA
} from '../data/loyaltyAndAnalyticsData';
import { formatCOP } from '../utils/formatters';
import { exportToCSV } from '../utils/formatters';
import { ExportReportModal } from './ExportReportModal';
import { LoyalCustomer } from '../types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Package,
  Users,
  FileSpreadsheet,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
  Bike,
  Car,
  Filter,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Clock,
  AlertTriangle,
  Gift,
  Award,
  Crown,
  Search,
  CloudRain,
  Sun,
  Flame,
  Zap,
  Activity,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';

const COLORS = ['#00E5FF', '#003399', '#38bdf8', '#818cf8', '#34d399', '#f59e0b'];

export const Board3Analytics: React.FC = () => {
  const { 
    orders, 
    catalogItems, 
    loyalCustomers, 
    assignRewardToCustomer, 
    redeemPoints, 
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'comparativa' | 'crecimiento' | 'temporadas' | 'horaspico' | 'cuellos' | 'fidelidad'
  >('comparativa');

  const [growthPeriod, setGrowthPeriod] = useState<'diario' | 'mensual'>('diario');
  const [timeFilter, setTimeFilter] = useState<'diario' | 'semanal' | 'mensual'>('diario');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Loyalty customer search & reward modal
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedRewardCustomer, setSelectedRewardCustomer] = useState<LoyalCustomer | null>(null);

  // Compute live metrics dynamically from both active orders and historical base
  const kpiStats = useMemo(() => {
    const currentOrdersTotalCOP = orders.reduce((sum, ord) => sum + ord.totalCOP, 0);
    const completedOrders = orders.filter(o => o.status === 'Finalizado');

    let extrasCount = 0;
    orders.forEach(o => {
      o.items.forEach(ci => {
        if (ci.item.category === 'extras') {
          extrasCount += ci.quantity;
        }
      });
    });

    const historicalWeekSum = HISTORICAL_DAILY_DATA.reduce((acc, d) => acc + d.totalCOP, 0);

    const dayCOP = 1700000 + currentOrdersTotalCOP;
    const weekCOP = historicalWeekSum + currentOrdersTotalCOP;
    const monthCOP = weekCOP + 18500000;

    return {
      dayCOP,
      weekCOP,
      monthCOP,
      completedServices: completedOrders.length + 18,
      extrasSold: extrasCount + 34,
      totalClients: orders.length + 22
    };
  }, [orders]);

  // Live vehicles count computed for the day
  const dailyVehicleCounts = useMemo(() => {
    let motosToday = 14;
    let autosToday = 11;

    orders.forEach(o => {
      if (o.vehicleType === 'Moto') motosToday++;
      else autosToday++;
    });

    return {
      motos: motosToday,
      autos: autosToday,
      total: motosToday + autosToday
    };
  }, [orders]);

  // Bar chart data for motos vs autos vs combos
  const barChartData = useMemo(() => {
    let motosRevenue = 0;
    let autosRevenue = 0;
    let combosRevenue = 0;
    let extrasRevenue = 0;

    orders.forEach(o => {
      o.items.forEach(ci => {
        const itemRev = ci.item.priceCOP * ci.quantity;
        if (ci.item.category === 'motos') motosRevenue += itemRev;
        else if (ci.item.category === 'autos') autosRevenue += itemRev;
        else if (ci.item.category === 'combos') combosRevenue += itemRev;
        else extrasRevenue += itemRev;
      });
    });

    return [
      {
        categoria: 'Motos (MotoCraft)',
        Ingresos: 4200000 + motosRevenue,
        VehiculosAtendidos: 38 + dailyVehicleCounts.motos
      },
      {
        categoria: 'Autos (Auto Care)',
        Ingresos: 6850000 + autosRevenue,
        VehiculosAtendidos: 29 + dailyVehicleCounts.autos
      },
      {
        categoria: 'Combos Especiales',
        Ingresos: 3100000 + combosRevenue,
        VehiculosAtendidos: 22
      },
      {
        categoria: 'Productos Extras',
        Ingresos: 1450000 + extrasRevenue,
        VehiculosAtendidos: 42
      }
    ];
  }, [orders, dailyVehicleCounts]);

  // Pie chart data
  const pieChartData = useMemo(() => {
    const frequencyMap: Record<string, number> = {
      'Lavado Técnico MotoCraft': 24,
      'Lavado Premium Auto Care': 20,
      'Aspirado & Detalle Interior': 16,
      'Combo MotoCraft Total': 14,
      'Combo Auto Care Élite': 12,
      'Detallado Cerámico 9H': 9,
      'Desengrase de Cadena': 18
    };

    orders.forEach(o => {
      o.items.forEach(ci => {
        const name = ci.item.name;
        frequencyMap[name] = (frequencyMap[name] || 0) + ci.quantity;
      });
    });

    return Object.entries(frequencyMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [orders]);

  // Unified dataset for ascending growth charts (day-by-day or month-by-month)
  const normalizedGrowthData = useMemo(() => {
    if (growthPeriod === 'diario') {
      return DAILY_ASCENDING_GROWTH.map(d => ({
        label: d.dia,
        ventasPeriodoCOP: d.ventasCOP,
        ventasAcumuladasCOP: d.acumuladoCOP,
        motos: d.motos,
        autos: d.autos,
        volumenTotal: d.volumenTotal
      }));
    }
    return MONTHLY_ASCENDING_GROWTH.map(m => ({
      label: m.mes,
      ventasPeriodoCOP: m.ventasMensualesCOP,
      ventasAcumuladasCOP: m.acumuladoAnualCOP,
      motos: m.motos,
      autos: m.autos,
      volumenTotal: m.volumenTotal
    }));
  }, [growthPeriod]);

  // Filter loyal customers
  const filteredLoyalCustomers = loyalCustomers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.plate.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.phone.includes(customerSearch)
  );

  // Handle Excel export
  const handleExportExcel = () => {
    const headers = [
      'N° Orden',
      'Fecha Creación',
      'Cliente',
      'Placa',
      'Tipo Vehículo',
      'Servicios Contratados',
      'Técnico',
      'Estado',
      'Total COP'
    ];

    const rows = orders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString('es-CO'),
      o.clientName,
      o.vehiclePlate,
      o.vehicleType,
      o.items.map(ci => `${ci.quantity}x ${ci.item.name}`).join(' | '),
      o.technicianName || 'No asignado',
      o.status,
      o.totalCOP
    ]);

    const summaryRows = [
      ['', '', '', '', '', '', '', '', ''],
      ['--- RESUMEN FINANCIERO JHOICARWASH "EL SPA DE TU VEHICULO" ---', '', '', '', '', '', '', '', ''],
      ['Total Ventas Día Estimado', '', '', '', '', '', '', '', kpiStats.dayCOP],
      ['Total Ventas Semana', '', '', '', '', '', '', '', kpiStats.weekCOP],
      ['Total Ventas Mes', '', '', '', '', '', '', '', kpiStats.monthCOP],
      ['Motos Atendidas Hoy', '', '', '', '', '', '', '', dailyVehicleCounts.motos],
      ['Autos Atendidos Hoy', '', '', '', '', '', '', '', dailyVehicleCounts.autos],
      ['Servicios Realizados', '', '', '', '', '', '', '', kpiStats.completedServices],
      ['Extras Vendidos', '', '', '', '', '', '', '', kpiStats.extrasSold]
    ];

    exportToCSV(`JHOICARWASH_Analitica_Oficial_${new Date().toISOString().slice(0, 10)}`, [
      headers,
      ...rows,
      ...summaryRows
    ]);

    showToast('Informe completo descargado en formato Excel (.CSV)', 'success');
  };

  const currentTF = VEHICLE_COMPARISON_TIMEFRAMES[timeFilter];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header Banner with Official Logo & Slogan */}
      <div className="bg-gradient-to-r from-[#003399] via-[#091f4b] to-[#0E1522] p-6 rounded-3xl border border-[#00E5FF]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.35)] bg-black/40 shrink-0 p-0.5">
            <img
              src="/logo.jpg"
              alt="Logo JHOICARWASH"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00E5FF]/40">
              <Sparkles className="w-3.5 h-3.5" />
              "EL SPA DE TU VEHICULO"
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Inteligencia Comercial, Capacidad & Fidelización
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5 max-w-2xl">
              Comparativa detallada de Motos vs Autos, predicciones climatológicas, mapa de horas pico, análisis de cuellos de botella y gestión de clientes fieles.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleExportExcel}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-[#132238] hover:bg-[#1C3252] text-white border border-[#2B4366] hover:border-[#00E5FF]/60 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Exportar Excel</span>
          </button>

          <button
            onClick={() => setReportModalOpen(true)}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b0ff] hover:brightness-110 text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00E5FF]/20"
          >
            <FileText className="w-4 h-4 text-black" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Navigation for Deep Analytics */}
      <div className="flex flex-wrap items-center gap-2 bg-[#121926] p-2 rounded-2xl border border-[#233145]">
        <button
          onClick={() => setActiveSubTab('comparativa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'comparativa'
              ? 'bg-[#003399] text-white border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#00E5FF]" />
          <span>Comparativa Motos vs Autos (Día/Sem/Mes)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crecimiento')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'crecimiento'
              ? 'bg-[#003399] text-white border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
          <span>Líneas Ascendentes & Tortas (Día a Día / Mes a Mes)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('temporadas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'temporadas'
              ? 'bg-[#003399] text-white border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sun className="w-4 h-4 text-yellow-400" />
          <span>Proyecciones & Climatología (Picos y Valles)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('horaspico')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'horaspico'
              ? 'bg-[#003399] text-white border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4 text-[#00E5FF]" />
          <span>Horas Pico vs Horas Calmadas</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cuellos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'cuellos'
              ? 'bg-[#003399] text-white border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Cuellos de Botella (Procesos Lentos)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fidelidad')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'fidelidad'
              ? 'bg-gradient-to-r from-emerald-800 to-[#003399] text-white border border-emerald-400/50 shadow-lg'
              : 'text-emerald-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Crown className="w-4 h-4 text-yellow-400" />
          <span>Club de Clientes Fieles & Premios</span>
          <span className="px-1.5 py-0.2 rounded-full bg-yellow-400 text-black text-[9px] font-black">
            {loyalCustomers.length}
          </span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* SECCIÓN 1: COMPARATIVA DE INGRESOS Y VEHÍCULOS (DIARIO, SEMANAL, MES) */}
      {/* ==================================================================== */}
      {activeSubTab === 'comparativa' && (
        <div className="space-y-6">
          {/* Timeframe Selector Pill Box */}
          <div className="p-4 bg-[#141C2B] rounded-2xl border border-[#25364C] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00E5FF]" />
                Comparativa de Vehículos Atendidos & Facturación
              </h3>
              <p className="text-xs text-slate-400">
                Selecciona la ventana de tiempo para comparar volumen de motocicletas vs automóviles:
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0B1019] p-1.5 rounded-xl border border-[#28384E]">
              {(['diario', 'semanal', 'mensual'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    timeFilter === tf
                      ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Metric Cards for Selected Timeframe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Motos */}
            <div className="p-5 rounded-2xl bg-[#121926] border border-[#233145] shadow-lg flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Segmento MotoCraft ({currentTF.periodo})
                  </span>
                  <h4 className="font-heading font-black text-xl text-white mt-1">
                    Motocicletas Atendidas
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#003399]/40 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Bike className="w-5 h-5" />
                </div>
              </div>

              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-3xl sm:text-4xl text-[#00E5FF]">
                    {timeFilter === 'diario' ? dailyVehicleCounts.motos : currentTF.motosAtendidas}
                  </span>
                  <span className="text-xs text-slate-400">motos finalizadas</span>
                </div>
                <div className="font-mono font-bold text-base text-white mt-1">
                  Facturación: {formatCOP(currentTF.motosIngresosCOP)}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#1F2C3F] flex items-center justify-between text-xs">
                <span className="text-slate-400">Ticket promedio:</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatCOP(Math.round(currentTF.motosIngresosCOP / currentTF.motosAtendidas))}
                </span>
              </div>
            </div>

            {/* Card 2: Autos */}
            <div className="p-5 rounded-2xl bg-[#121926] border border-[#233145] shadow-lg flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Segmento Auto Care ({currentTF.periodo})
                  </span>
                  <h4 className="font-heading font-black text-xl text-white mt-1">
                    Automóviles Atendidos
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Car className="w-5 h-5" />
                </div>
              </div>

              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-3xl sm:text-4xl text-indigo-300">
                    {timeFilter === 'diario' ? dailyVehicleCounts.autos : currentTF.autosAtendidos}
                  </span>
                  <span className="text-xs text-slate-400">autos finalizados</span>
                </div>
                <div className="font-mono font-bold text-base text-white mt-1">
                  Facturación: {formatCOP(currentTF.autosIngresosCOP)}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#1F2C3F] flex items-center justify-between text-xs">
                <span className="text-slate-400">Ticket promedio:</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatCOP(Math.round(currentTF.autosIngresosCOP / currentTF.autosAtendidos))}
                </span>
              </div>
            </div>

            {/* Card 3: Total & Proporción */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121926] to-[#0A172E] border border-[#00E5FF]/40 shadow-lg flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Total Combinado ({currentTF.periodo})
                  </span>
                  <h4 className="font-heading font-black text-xl text-white mt-1">
                    Flujo Total de Taller
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-3xl sm:text-4xl text-white">
                    {timeFilter === 'diario' ? dailyVehicleCounts.total : currentTF.motosAtendidas + currentTF.autosAtendidos}
                  </span>
                  <span className="text-xs text-slate-400">vehículos totales</span>
                </div>
                <div className="font-mono font-black text-lg text-emerald-400 mt-1">
                  Total Ingresos: {formatCOP(currentTF.totalCOP)}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#1F2C3F] flex items-center justify-between text-xs">
                <span className="text-slate-400">{currentTF.comparacionAyer}</span>
                <span className="text-[#00E5FF] font-bold">{currentTF.diaCriticoVsPico}</span>
              </div>
            </div>
          </div>

          {/* Gráfico Comparativo de Barras con Cantidad e Ingresos */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-[#243347] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading font-black text-base text-white">
                  Comparativa de Ingresos & Vehículos por Categoría
                </h4>
                <p className="text-xs text-slate-400">
                  Motos vs Automóviles vs Combos Promocionales en Pesos Colombianos (COP)
                </p>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223145" />
                  <XAxis dataKey="categoria" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickFormatter={val => `$${(val / 1000000).toFixed(1)}M`} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1520',
                      borderColor: '#00E5FF',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                    formatter={(val: any, name: any) => [
                      name === 'Ingresos' ? formatCOP(Number(val)) : `${val} vehículos`,
                      name
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Ingresos" fill="#00E5FF" radius={[6, 6, 0, 0]}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#003399' : index === 1 ? '#00E5FF' : index === 2 ? '#38bdf8' : '#818cf8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECCIÓN NUEVA: LÍNEAS ASCENDENTES & TORTAS (DÍA A DÍA / MES A MES)   */}
      {/* ==================================================================== */}
      {activeSubTab === 'crecimiento' && (
        <div className="space-y-6">
          {/* Header Controls for Growth Mode */}
          <div className="p-5 bg-gradient-to-r from-[#121E33] via-[#0D2447] to-[#141C2B] rounded-3xl border border-[#00E5FF]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-black uppercase tracking-wider mb-1 border border-[#00E5FF]/40">
                <TrendingUp className="w-3.5 h-3.5" />
                "EL SPA DE TU VEHICULO" • Curvas de Aceleración Comercial
              </div>
              <h3 className="font-heading font-black text-xl text-white">
                Gráficos de Líneas Ascendentes & Distribución de Servicios
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Seguimiento de la trayectoria ascendente de ventas en COP, incremento de volumen de vehículos y porcentaje de tipos de servicios contratados.
              </p>
            </div>

            {/* Toggle Día a Día vs Mes a Mes */}
            <div className="flex items-center gap-1.5 bg-[#0B1019] p-1.5 rounded-2xl border border-[#28384E] w-full md:w-auto">
              <button
                type="button"
                onClick={() => setGrowthPeriod('diario')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  growthPeriod === 'diario'
                    ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Día a Día (Progresión Diaria)</span>
              </button>

              <button
                type="button"
                onClick={() => setGrowthPeriod('mensual')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  growthPeriod === 'mensual'
                    ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-lg shadow-[#003399]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Mes a Mes (Año Completo)</span>
              </button>
            </div>
          </div>

          {/* 4 Acceleration KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#121824] border border-[#243347] shadow-lg">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {growthPeriod === 'diario' ? 'Facturación Acumulada del Ciclo' : 'Facturación Total Anual'}
              </span>
              <div className="font-mono font-black text-2xl text-white mt-1">
                {formatCOP(growthPeriod === 'diario' ? 16990000 : 390400000)}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2C3F] text-xs">
                <span className="text-slate-400">Curva de ingresos:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {growthPeriod === 'diario' ? '+24.2% ascendente' : '+12.6% mes a mes'}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-[#243347] shadow-lg">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {growthPeriod === 'diario' ? 'Aumento en Volumen Diario' : 'Crecimiento de Parque Vehicular'}
              </span>
              <div className="font-mono font-black text-2xl text-[#00E5FF] mt-1">
                {growthPeriod === 'diario' ? '42 vehículos / día pico' : '700 vehículos / mes actual'}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2C3F] text-xs">
                <span className="text-slate-400">Progreso de flota:</span>
                <span className="text-emerald-400 font-bold">
                  {growthPeriod === 'diario' ? '+200% vs día 1' : '+97.1% vs Enero'}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-[#243347] shadow-lg">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Servicio con Mayor Aceleración
              </span>
              <div className="font-heading font-black text-base text-white mt-1 truncate">
                {growthPeriod === 'diario' ? 'Combos Pro Especiales' : 'Detallado Cerámico 9H'}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2C3F] text-xs">
                <span className="text-slate-400">Demanda relativa:</span>
                <span className="text-[#00E5FF] font-bold">
                  {growthPeriod === 'diario' ? '+42% en ventas' : '+65% en facturación'}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-[#243347] shadow-lg">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Ticket Promedio por Vehículo
              </span>
              <div className="font-mono font-black text-2xl text-yellow-300 mt-1">
                {formatCOP(growthPeriod === 'diario' ? 67960 : 77420)}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2C3F] text-xs">
                <span className="text-slate-400">Rentabilidad media:</span>
                <span className="text-emerald-400 font-bold">+18.5% Cross-selling</span>
              </div>
            </div>
          </div>

          {/* Gráfico 1: Línea Ascendente de Ventas y Facturación (COP) */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-[#243347] shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                  <h4 className="font-heading font-black text-base text-white">
                    {growthPeriod === 'diario' 
                      ? 'Línea Ascendente: Facturación Día a Día y Acumulado (COP)' 
                      : 'Línea Ascendente: Crecimiento de Ventas Mes a Mes y Acumulado Anual (COP)'}
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  {growthPeriod === 'diario'
                    ? 'Evolución diaria de ventas en Pesos Colombianos con pendiente ascendente continua'
                    : 'Progresión mes a mes de ingresos y acumulación anual de flujo de caja en JHOICARWASH'}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-bold border border-[#00E5FF]/30">
                {growthPeriod === 'diario' ? '10 Días Evaluados' : '10 Meses Evaluados'}
              </span>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={(growthPeriod === 'diario' ? DAILY_ASCENDING_GROWTH : MONTHLY_ASCENDING_GROWTH) as any}
                  margin={{ top: 15, right: 25, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorAcumulado" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorPeriodo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003399" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#003399" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223145" />
                  <XAxis 
                    dataKey={growthPeriod === 'diario' ? 'dia' : 'mes'} 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickFormatter={val => `$${(val / 1000000).toFixed(1)}M`} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1520',
                      borderColor: '#00E5FF',
                      borderRadius: '1rem',
                      color: '#fff',
                      fontSize: '12px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                    }}
                    formatter={(val: any, name: any) => [formatCOP(Number(val)), name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey={growthPeriod === 'diario' ? 'acumuladoCOP' : 'acumuladoAnualCOP'}
                    stroke="#00E5FF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAcumulado)"
                    name={growthPeriod === 'diario' ? 'Facturación Acumulada (COP)' : 'Acumulado Anual (COP)'}
                  />
                  <Area
                    type="monotone"
                    dataKey={growthPeriod === 'diario' ? 'ventasCOP' : 'ventasMensualesCOP'}
                    stroke="#818cf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPeriodo)"
                    name={growthPeriod === 'diario' ? 'Venta del Día (COP)' : 'Venta del Mes (COP)'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico 2: Línea Ascendente de Volumen de Vehículos (Motos vs Autos vs Total) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#121824] p-6 rounded-3xl border border-[#243347] shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-black text-base text-white flex items-center gap-2">
                    <Bike className="w-4 h-4 text-[#00E5FF]" />
                    <Car className="w-4 h-4 text-indigo-400" />
                    Línea Ascendente: Volumen de Vehículos Atendidos
                  </h4>
                  <p className="text-xs text-slate-400">
                    {growthPeriod === 'diario'
                      ? 'Incremento diario de motocicletas y automóviles en bahía'
                      : 'Evolución mensual del parque vehicular atendido (Motos vs Autos)'}
                  </p>
                </div>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={(growthPeriod === 'diario' ? DAILY_ASCENDING_GROWTH : MONTHLY_ASCENDING_GROWTH) as any}
                    margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#223145" />
                    <XAxis 
                      dataKey={growthPeriod === 'diario' ? 'dia' : 'mes'} 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                    />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F1520',
                        borderColor: '#00E5FF',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                      formatter={(val: any, name: any) => [`${val} vehículos`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line
                      type="monotone"
                      dataKey="volumenTotal"
                      stroke="#00E5FF"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#00E5FF' }}
                      name="Volumen Total Vehículos"
                    />
                    <Line
                      type="monotone"
                      dataKey="motos"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4, fill: '#38bdf8' }}
                      name="Motos (MotoCraft)"
                    />
                    <Line
                      type="monotone"
                      dataKey="autos"
                      stroke="#818cf8"
                      strokeWidth={2}
                      strokeDasharray="2 2"
                      dot={{ r: 4, fill: '#818cf8' }}
                      name="Autos (Auto Care)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 3: Torta (Pie Chart) de Tipos de Servicios */}
            <div className="lg:col-span-5 bg-[#121824] p-6 rounded-3xl border border-[#243347] shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-[#00E5FF]" />
                    <h4 className="font-heading font-black text-base text-white">
                      Gráfico de Torta: Tipos de Servicios
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/30">
                    {growthPeriod === 'diario' ? 'Distribución Diaria' : 'Distribución Mes a Mes'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Participación porcentual de la demanda por categoría de estética
                </p>

                <div className="h-60 w-full my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={growthPeriod === 'diario' ? DAILY_SERVICES_PIE_DATA : MONTHLY_SERVICES_PIE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {(growthPeriod === 'diario' ? DAILY_SERVICES_PIE_DATA : MONTHLY_SERVICES_PIE_DATA).map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F1520',
                          borderColor: '#00E5FF',
                          borderRadius: '0.75rem',
                          color: '#fff',
                          fontSize: '12px'
                        }}
                        formatter={(val: any, name: any, item: any) => [
                          `${val} turnos (${item.payload.porcentaje})`,
                          item.payload.name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Legends list with percentages */}
              <div className="space-y-1.5 pt-3 border-t border-[#1F2C3F] text-[11px]">
                {(growthPeriod === 'diario' ? DAILY_SERVICES_PIE_DATA : MONTHLY_SERVICES_PIE_DATA).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                      <span className="text-slate-200 truncate">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-[#00E5FF] shrink-0">
                      {item.porcentaje} ({item.value} u.)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECCIÓN 2: PROYECCIONES ESTACIONALES & CLIMATOLOGÍA (PICOS VS VALLES) */}
      {/* ==================================================================== */}
      {activeSubTab === 'temporadas' && (
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-[#121E33] to-[#162947] rounded-3xl border border-[#00E5FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-black uppercase tracking-wider mb-1 border border-yellow-400/40">
                <Sun className="w-3.5 h-3.5" />
                Modelo Predictivo de Temporadas & Clima
              </div>
              <h3 className="font-heading font-black text-xl text-white">
                Días y Meses Críticos vs Días de Máximo Volumen
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                La estética vehicular depende directamente de la climatología: los días de sol post-lluvia saturan las bahías, mientras que las lluvias prolongadas deprimen la demanda exterior.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SEASONAL_FORECAST_DATA.map((fc, index) => {
              const isPeak = fc.demandTrend === 'Pico Extraordinario';

              return (
                <div
                  key={index}
                  className={`p-6 rounded-3xl border transition-all ${
                    isPeak 
                      ? 'bg-[#121B2A] border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                      : 'bg-[#111723] border-amber-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5 ${
                        isPeak ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {fc.demandTrend}
                      </span>
                      <h4 className="font-heading font-black text-lg text-white">
                        {fc.period}
                      </h4>
                      <p className="text-xs font-semibold text-slate-300">
                        {fc.label}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shrink-0">
                      {isPeak ? <Sun className="w-6 h-6 text-yellow-400" /> : <CloudRain className="w-6 h-6 text-sky-400" />}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#0C121D] rounded-2xl border border-[#212E40] my-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Motos Est.</span>
                      <span className="font-mono font-bold text-base text-[#00E5FF]">{fc.expectedMotos}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Autos Est.</span>
                      <span className="font-mono font-bold text-base text-indigo-300">{fc.expectedAutos}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Ingresos Est.</span>
                      <span className="font-mono font-bold text-base text-white">{formatCOP(fc.expectedRevenueCOP)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-wider block">
                      Estrategia de Operación & Mitigación:
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      {fc.recommendations.map((rec: string, rIdx: number) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECCIÓN 3: MAPA DE HORAS PICO VS HORAS CALMADAS DE PRODUCCIÓN */}
      {/* ==================================================================== */}
      {activeSubTab === 'horaspico' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: Horas de Mayor Volumen (Pico) */}
            <div className="p-6 rounded-3xl bg-[#121B2A] border border-[#00E5FF]/40 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003399] flex items-center justify-center text-[#00E5FF]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-base text-white">
                    Horas de Mayor Volumen & Movimiento (Pico)
                  </h4>
                  <span className="text-xs text-[#00E5FF] font-semibold">
                    Franjas de Saturación en Taller
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="p-3 bg-[#0B1019] rounded-xl border border-[#212E40] flex items-center justify-between">
                  <span className="font-bold text-white">1. Franja Matutina:</span>
                  <span className="font-mono text-[#00E5FF] font-bold">09:00 AM a 11:30 AM</span>
                </div>
                <div className="p-3 bg-[#0B1019] rounded-xl border border-[#212E40] flex items-center justify-between">
                  <span className="font-bold text-white">2. Franja Vespertina:</span>
                  <span className="font-mono text-[#00E5FF] font-bold">02:30 PM a 05:30 PM</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px] pt-1">
                  En estas horas ingresan el <strong>78% de los turnos diarios</strong>. Se recomienda mantener operativas todas las lanzas de espuma y no realizar mantenimientos de máquinas en estas ventanas.
                </p>
              </div>
            </div>

            {/* Box 2: Horas Más Calmadas (Valle) */}
            <div className="p-6 rounded-3xl bg-[#121B2A] border border-emerald-500/40 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-base text-white">
                    Horas Más Calmadas de Producción (Valle)
                  </h4>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Ventanas Óptimas para Servicios Largos
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="p-3 bg-[#0B1019] rounded-xl border border-[#212E40] flex items-center justify-between">
                  <span className="font-bold text-white">1. Apertura Temprana:</span>
                  <span className="font-mono text-emerald-400 font-bold">07:00 AM a 08:30 AM</span>
                </div>
                <div className="p-3 bg-[#0B1019] rounded-xl border border-[#212E40] flex items-center justify-between">
                  <span className="font-bold text-white">2. Franja de Almuerzo:</span>
                  <span className="font-mono text-emerald-400 font-bold">12:30 PM a 01:45 PM</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px] pt-1">
                  Ideales para ingresar vehículos que requieren <strong>Detallados Cerámicos 9H de 180 min</strong> o <strong>inyección-extracción de interiores</strong> sin retrasar la línea de lavado rápido.
                </p>
              </div>
            </div>
          </div>

          {/* Gráfico de Afluencia Horaria */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-[#243347] shadow-xl">
            <h4 className="font-heading font-black text-base text-white mb-1">
              Curva de Afluencia de Vehículos a lo Largo del Día
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Comparativa de vehículos ingresados por hora (Motos vs Automóviles)
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HOURLY_TRAFFIC_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223145" />
                  <XAxis dataKey="hora" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1520',
                      borderColor: '#00E5FF',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="motos" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.3} name="Motos por Hora" />
                  <Area type="monotone" dataKey="autos" stroke="#818cf8" fill="#818cf8" fillOpacity={0.3} name="Autos por Hora" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECCIÓN 4: ANÁLISIS DE CUELLOS DE BOTELLA OPERATIVOS */}
      {/* ==================================================================== */}
      {activeSubTab === 'cuellos' && (
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-rose-950/40 to-[#141C2B] rounded-3xl border border-rose-500/30 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Diagnóstico de Cuellos de Botella en la Línea de Producción
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Identificación de los servicios y etapas con mayor tiempo de ciclo en motocicletas y automóviles, junto con soluciones de infraestructura para maximizar la rotación de bahías en JHOICARWASH.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BOTTLENECK_METRICS.map(bm => (
              <div
                key={bm.serviceId}
                className="p-6 rounded-3xl bg-[#121824] border border-[#243347] shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      bm.impactLevel === 'Crítico' 
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      Impacto {bm.impactLevel}
                    </span>
                    <span className="font-mono font-bold text-xs text-[#00E5FF] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {bm.avgDurationMin} min promedio
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-base text-white">
                    {bm.serviceName}
                  </h4>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                    Bahía requerida: {bm.bayRequirement}
                  </span>

                  <div className="my-3 p-3 bg-[#0C121D] rounded-2xl border border-[#1F2C3F] text-xs">
                    <span className="text-[10px] text-rose-400 font-bold uppercase block">
                      Etapa Crítica / Freno de Flujo:
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {bm.criticalStep}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1F2C3F] text-xs space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                    ✓ Recomendación de Descongestión:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {bm.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECCIÓN 5: CLUB DE CLIENTES FIELES & PREMIOS POR FIDELIDAD */}
      {/* ==================================================================== */}
      {activeSubTab === 'fidelidad' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-[#10243E] to-[#0A1628] rounded-3xl border border-emerald-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-black uppercase tracking-wider mb-1.5 border border-yellow-400/40">
                <Crown className="w-3.5 h-3.5" />
                Programa de Recompensas JHOICARWASH
              </div>
              <h3 className="font-heading font-black text-2xl text-white">
                Club de Clientes Fieles & Premios por Fidelidad
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Lleva el control de visitas recurrentes, puntos acumulados y asigna obsequios exclusivos (cera Hydro, desengrase de cadena gratis, bonos VIP) a tus mejores clientes.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                placeholder="Buscar por cliente o placa..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B1019] border border-[#28384E] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Catalog of Available Rewards Banner */}
          <div className="p-5 bg-[#121926] rounded-3xl border border-[#223145] space-y-3">
            <h4 className="font-heading font-black text-sm text-white flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#00E5FF]" />
              Catálogo de Obsequios & Beneficios Disponibles para Canje
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_REWARDS.map(rew => (
                <div
                  key={rew.id}
                  className="p-3.5 bg-[#0C121D] rounded-2xl border border-[#212E40] text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded-full border border-[#00E5FF]/30">
                        {rew.badge}
                      </span>
                      <span className="font-mono font-bold text-yellow-300 text-xs">
                        {rew.pointsCost} pts
                      </span>
                    </div>
                    <strong className="text-white block text-xs">{rew.title}</strong>
                    <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">{rew.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* List of Loyal Customers Table */}
          <div className="bg-[#121824] rounded-3xl border border-[#243347] overflow-hidden shadow-xl">
            <div className="p-5 border-b border-[#212E40] flex items-center justify-between">
              <div>
                <h4 className="font-heading font-black text-base text-white">
                  Listado Oficial de Clientes Recurrentes
                </h4>
                <p className="text-xs text-slate-400">
                  {filteredLoyalCustomers.length} clientes encontrados en base de datos
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#162030] text-slate-300 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-3">Placa / Tipo</th>
                    <th className="py-3 px-3 text-center">Visitas</th>
                    <th className="py-3 px-3 text-center">Nivel Club</th>
                    <th className="py-3 px-4 text-right">Total Invertido</th>
                    <th className="py-3 px-3 text-center">Puntos</th>
                    <th className="py-3 px-4">Beneficios Asignados</th>
                    <th className="py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D2A3C] text-slate-200">
                  {filteredLoyalCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-xs">{customer.name}</div>
                        <div className="text-[10px] text-slate-400">Tel: {customer.phone}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          {customer.vehicleType === 'Moto' ? (
                            <Bike className="w-3.5 h-3.5 text-[#00E5FF]" />
                          ) : (
                            <Car className="w-3.5 h-3.5 text-[#00E5FF]" />
                          )}
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-yellow-400 text-black text-[11px]">
                            {customer.plate}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-sm text-white">
                        {customer.totalVisits}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          customer.tier === 'VIP Master'
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40'
                            : customer.tier === 'Oro'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {customer.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        {formatCOP(customer.totalSpentCOP)}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-black text-sm text-[#00E5FF]">
                        {customer.points}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {customer.assignedRewards.map((rew, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 truncate"
                            >
                              🎁 {rew}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedRewardCustomer(customer)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b0ff] hover:brightness-110 text-black font-extrabold text-[11px] uppercase tracking-wide flex items-center gap-1 shadow-md cursor-pointer mx-auto"
                        >
                          <Gift className="w-3 h-3" />
                          <span>Premiar</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL PARA PREMIAR CLIENTE FIEL CON BENEFICIO U OBSEQUIO */}
      {/* ==================================================================== */}
      {selectedRewardCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-lg bg-[#0F1522] rounded-3xl border border-[#283B52] shadow-2xl overflow-hidden my-6 p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#212E40] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-white">
                    Premiar a {selectedRewardCustomer.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Placa: {selectedRewardCustomer.plate} • Puntos: {selectedRewardCustomer.points} pts
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRewardCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider block">
                Selecciona el obsequio o beneficio a otorgar:
              </span>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {AVAILABLE_REWARDS.map(reward => {
                  const hasEnoughPoints = selectedRewardCustomer.points >= reward.pointsCost;

                  return (
                    <div
                      key={reward.id}
                      className="p-3 bg-[#141C2B] rounded-2xl border border-[#243347] flex items-center justify-between text-xs hover:border-[#00E5FF]/40 transition-colors"
                    >
                      <div>
                        <strong className="text-white block">{reward.title}</strong>
                        <span className="text-slate-400 text-[11px] block">{reward.description}</span>
                        <span className="font-mono text-yellow-300 font-bold text-[10px]">Costo: {reward.pointsCost} pts</span>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0 ml-3">
                        <button
                          type="button"
                          onClick={() => {
                            assignRewardToCustomer(selectedRewardCustomer.id, reward.title);
                            setSelectedRewardCustomer(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#003399] hover:bg-[#0044cc] text-white font-bold text-[10px] uppercase cursor-pointer"
                        >
                          Cortesía JHOI
                        </button>

                        {hasEnoughPoints && (
                          <button
                            type="button"
                            onClick={() => {
                              redeemPoints(selectedRewardCustomer.id, reward.pointsCost, reward.title);
                              setSelectedRewardCustomer(null);
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[10px] uppercase cursor-pointer"
                          >
                            Canjear Puntos
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#212E40] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRewardCustomer(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Printable Modal */}
      <ExportReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        orders={orders}
        catalogItems={catalogItems}
        kpiStats={kpiStats}
      />
    </div>
  );
};
