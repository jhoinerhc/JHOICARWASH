import React from 'react';
import { ServiceOrder, CatalogItem } from '../types';
import { formatCOP } from '../utils/formatters';
import { 
  X, 
  Printer, 
  Sparkles, 
  Calendar
} from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ServiceOrder[];
  catalogItems: CatalogItem[];
  kpiStats: {
    dayCOP: number;
    weekCOP: number;
    monthCOP: number;
    completedServices: number;
    extrasSold: number;
    totalClients: number;
  };
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  orders,
  catalogItems,
  kpiStats
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-4xl bg-[#0E1522] rounded-3xl border border-[#27384E] shadow-2xl overflow-hidden my-8 print-area"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-gradient-to-r from-[#003399] via-[#0b2253] to-[#141F30] p-4.5 border-b border-[#00E5FF]/20 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00E5FF]" />
            <h3 className="font-heading font-black text-white text-base uppercase tracking-wider">
              Informe Financiero & Operativo - JHOICARWASH
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-200 bg-[#0E1522] print:p-8 print:bg-white print:text-black">
          {/* Header with Official Logo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#233347] print:border-black">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00E5FF] print:border-black shadow-md p-0.5 bg-black">
                <img
                  src="/logo.jpg"
                  alt="Logo JHOICARWASH"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <h1 className="font-heading font-black text-2xl text-white print:text-black tracking-tight">
                  JHOI<span className="text-[#00E5FF] print:text-black">CARWASH</span>
                </h1>
                <p className="text-xs font-black uppercase tracking-wider text-[#00E5FF] print:text-black">
                  ¡EL SPA DE TU VEHICULO!
                </p>
                <p className="text-[11px] uppercase tracking-widest text-slate-300 print:text-gray-700 font-extrabold">
                  PREMIUM AUTOLAVADO & DETALLADO • MOTOCRAFT & AUTO CARE
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-400 print:text-gray-600 space-y-1">
              <div className="flex items-center sm:justify-end gap-1.5 font-medium text-slate-300 print:text-black">
                <Calendar className="w-3.5 h-3.5 text-[#00E5FF] print:text-black" />
                <span>Fecha: {todayStr}</span>
              </div>
              <p>Periodo de Reporte: Mes en Curso</p>
              <p className="text-[#00E5FF] print:text-black font-semibold">Generado por: Jhoiner Hincapie (Dirección General)</p>
            </div>
          </div>

          {/* Key Executive Financial Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-[#141E2E] print:bg-gray-100 border border-[#25364C] print:border-gray-300">
              <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                Ventas del Día
              </span>
              <span className="font-mono font-black text-lg text-[#00E5FF] print:text-black">
                {formatCOP(kpiStats.dayCOP)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141E2E] print:bg-gray-100 border border-[#25364C] print:border-gray-300">
              <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                Ventas de la Semana
              </span>
              <span className="font-mono font-black text-lg text-white print:text-black">
                {formatCOP(kpiStats.weekCOP)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141E2E] print:bg-gray-100 border border-[#25364C] print:border-gray-300">
              <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                Ventas del Mes
              </span>
              <span className="font-mono font-black text-lg text-emerald-400 print:text-black">
                {formatCOP(kpiStats.monthCOP)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141E2E] print:bg-gray-100 border border-[#25364C] print:border-gray-300">
              <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                Clientes Atendidos
              </span>
              <span className="font-mono font-black text-lg text-white print:text-black">
                {kpiStats.totalClients}
              </span>
            </div>
          </div>

          {/* Table of Orders Recorded */}
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-sm text-white print:text-black uppercase tracking-wider">
              1. Registro Detallado de Órdenes y Servicios
            </h3>
            <div className="border border-[#223145] print:border-black rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[#172335] print:bg-gray-200 text-slate-300 print:text-black text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 text-left">Orden</th>
                    <th className="py-2.5 px-3 text-left">Cliente</th>
                    <th className="py-2.5 px-2 text-center">Placa / Tipo</th>
                    <th className="py-2.5 px-3 text-left">Servicios / Combos</th>
                    <th className="py-2.5 px-2 text-center">Estado</th>
                    <th className="py-2.5 px-3 text-right">Total (COP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2C3E] print:divide-gray-300">
                  {orders.map(o => (
                    <tr key={o.id} className="text-slate-300 print:text-black">
                      <td className="py-2 px-3 font-mono font-bold text-[#00E5FF] print:text-black">
                        {o.orderNumber}
                      </td>
                      <td className="py-2 px-3 font-medium">
                        {o.clientName}
                      </td>
                      <td className="py-2 px-2 text-center font-mono">
                        {o.vehiclePlate} ({o.vehicleType})
                      </td>
                      <td className="py-2 px-3">
                        {o.items.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ')}
                      </td>
                      <td className="py-2 px-2 text-center font-semibold">
                        {o.status}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold">
                        {formatCOP(o.totalCOP)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table of Products and Current Inventory Stock */}
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-sm text-white print:text-black uppercase tracking-wider">
              2. Catálogo Oficial y Valoración de Inventario
            </h3>
            <div className="border border-[#223145] print:border-black rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[#172335] print:bg-gray-200 text-slate-300 print:text-black text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 text-left">Ítem</th>
                    <th className="py-2.5 px-3 text-left">Categoría</th>
                    <th className="py-2.5 px-2 text-center">Tipo</th>
                    <th className="py-2.5 px-2 text-center">Duración / Stock</th>
                    <th className="py-2.5 px-3 text-right">Tarifa Oficial (COP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2C3E] print:divide-gray-300">
                  {catalogItems.map(item => (
                    <tr key={item.id} className="text-slate-300 print:text-black">
                      <td className="py-2 px-3 font-medium text-white print:text-black">
                        {item.name}
                      </td>
                      <td className="py-2 px-3 capitalize">
                        {item.category === 'motos' ? 'MotoCraft' : item.category === 'autos' ? 'Auto Care' : item.category === 'combos' ? 'Combo Especial' : 'Extra'}
                      </td>
                      <td className="py-2 px-2 text-center">
                        {item.kind === 'service' ? 'Servicio' : item.kind === 'combo' ? 'Combo' : 'Producto'}
                      </td>
                      <td className="py-2 px-2 text-center font-mono">
                        {item.durationMin ? `${item.durationMin} min` : `${item.stock ?? 10} u.`}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold">
                        {formatCOP(item.priceCOP)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal / Signature Footer */}
          <div className="pt-6 border-t border-[#233347] print:border-black flex items-end justify-between text-xs text-slate-400 print:text-gray-700">
            <div>
              <p className="font-bold text-white print:text-black">JHOICARWASH MOTOCRAFT & AUTO CARE SAS</p>
              <p>Sistema Operativo POS & CRM Automatizado</p>
              <p className="text-[10px]">Documento oficial para balance contable y auditoría de taller.</p>
            </div>
            <div className="text-right">
              <div className="w-48 border-b border-slate-500 print:border-black mb-1" />
              <p className="font-semibold text-white print:text-black">Jhoiner Hincapie</p>
              <p className="text-[10px]">Director General & Propietario</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 bg-[#0B0F17] border-t border-[#1F2C3F] flex items-center justify-between no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cerrar Vista Previa
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#00E5FF]/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
