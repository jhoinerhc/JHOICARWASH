import React from 'react';
import { ServiceOrder } from '../types';
import { formatCOP, formatDuration } from '../utils/formatters';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Bike, 
  Car, 
  Share2, 
  Sparkles,
  QrCode,
  ShieldCheck
} from 'lucide-react';

interface ReceiptModalProps {
  order: ServiceOrder | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const itemsList = order.items
      .map(ci => `• ${ci.item.name} (${ci.quantity}x) - ${formatCOP(ci.item.priceCOP * ci.quantity)}`)
      .join('\n');

    const message = 
`*JHOICARWASH PREMIUM AUTOLAVADO & DETALLADO*
*MOTOCRAFT & AUTO CARE*
*Orden de Servicio:* ${order.orderNumber}
*Cliente:* ${order.clientName}
*Placa:* ${order.vehiclePlate} (${order.vehicleType})
*Estado:* ${order.status}
*Tiempo Estimado:* ${formatDuration(order.totalDurationMin)}

*Servicios y Combos:*
${itemsList}

*TOTAL A PAGAR:* ${formatCOP(order.totalCOP)}
*Técnico Responsable:* ${order.technicianName || 'Equipo JHOICARWASH'}

_¡Gracias por confiar en la estética vehicular de alto rendimiento JHOICARWASH!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-lg bg-[#0F1520] rounded-3xl border border-[#2B394E] shadow-2xl overflow-hidden my-6 print-area"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-[#003399] via-[#0A2255] to-[#141C2B] p-5 border-b border-[#00E5FF]/30 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
            <span className="font-heading font-bold text-sm uppercase tracking-wider">
              Comprobante Oficial de Servicio
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Receipt Body with Official Logo */}
        <div className="p-6 bg-[#0F1520] text-slate-200 space-y-5 print:p-8 print:bg-white print:text-black">
          {/* Brand Header with Logo */}
          <div className="text-center pb-4 border-b border-[#232F42] print:border-black flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#00E5FF] print:border-black shadow-lg mb-2 p-0.5 bg-black">
              <img
                src="/logo.jpg"
                alt="Logo JHOICARWASH"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h2 className="font-heading font-black text-2xl text-white print:text-black tracking-tight">
              JHOI<span className="text-[#00E5FF] print:text-black">CARWASH</span>
            </h2>
            <p className="text-[11px] font-black tracking-wider text-[#00E5FF] print:text-black uppercase">
              ¡EL SPA DE TU VEHICULO!
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-300 print:text-black font-extrabold">
              PREMIUM AUTOLAVADO & DETALLADO • MOTOCRAFT & AUTO CARE
            </p>
            <p className="text-[10px] text-slate-400 print:text-gray-500 mt-1">
              NIT: 901.442.890-3 • Centro de Detallado Técnico Especializado
            </p>
          </div>

          {/* Ticket Key Info */}
          <div className="bg-[#151D2A] print:bg-gray-100 p-4 rounded-2xl border border-[#26354A] print:border-gray-300 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                N° de Orden
              </span>
              <span className="font-mono font-black text-base text-[#00E5FF] print:text-black">
                {order.orderNumber}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                Estado
              </span>
              <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#003399]/40 text-[#00E5FF] print:bg-gray-200 print:text-black border border-[#00E5FF]/30 print:border-black inline-block mt-0.5">
                {order.status}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                Cliente
              </span>
              <span className="font-semibold text-white print:text-black">
                {order.clientName}
              </span>
              {order.clientPhone && (
                <span className="text-[11px] text-slate-400 print:text-gray-600 block">
                  Tel: {order.clientPhone}
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                Vehículo & Placa
              </span>
              <div className="flex items-center gap-1.5 font-bold text-white print:text-black">
                {order.vehicleType === 'Moto' ? (
                  <Bike className="w-3.5 h-3.5 text-[#00E5FF] print:text-black" />
                ) : (
                  <Car className="w-3.5 h-3.5 text-[#00E5FF] print:text-black" />
                )}
                <span className="font-mono px-2 py-0.5 bg-yellow-400 text-black rounded font-black text-xs">
                  {order.vehiclePlate}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                Fecha de Emisión
              </span>
              <span className="text-slate-300 print:text-gray-800">
                {new Date(order.createdAt).toLocaleDateString('es-CO', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">
                Tiempo Estimado
              </span>
              <span className="font-mono font-bold text-[#00E5FF] print:text-black flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(order.totalDurationMin)}
              </span>
            </div>
          </div>

          {/* Items Breakdown Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 print:text-gray-700 uppercase tracking-wider">
              Detalle de Servicios & Combos
            </h4>
            <div className="border border-[#253245] print:border-gray-300 rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[#172233] print:bg-gray-200 text-slate-300 print:text-black text-[11px]">
                  <tr>
                    <th className="py-2 px-3 text-left">Ítem</th>
                    <th className="py-2 px-2 text-center">Cant.</th>
                    <th className="py-2 px-2 text-right">Unitario</th>
                    <th className="py-2 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232F42] print:divide-gray-300 text-slate-200 print:text-black">
                  {order.items.map((ci, index) => (
                    <tr key={index}>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-white print:text-black">
                          {ci.item.name}
                        </div>
                        {ci.item.durationMin && (
                          <div className="text-[10px] text-slate-400 print:text-gray-500">
                            Duración: {ci.item.durationMin} min
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold">
                        {ci.quantity}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono text-slate-300 print:text-gray-700">
                        {formatCOP(ci.item.priceCOP)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-white print:text-black">
                        {formatCOP(ci.item.priceCOP * ci.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Box */}
          <div className="bg-gradient-to-r from-[#003399]/40 to-[#14233D] print:bg-gray-100 p-4 rounded-2xl border border-[#00E5FF]/40 print:border-black flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-300 print:text-gray-700 uppercase tracking-widest font-bold">
                Total Liquidado (COP)
              </span>
              <p className="text-[11px] text-[#00E5FF] print:text-black">
                Garantía oficial y acabado sin rayones
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono font-black text-2xl text-[#00E5FF] print:text-black">
                {formatCOP(order.totalCOP)}
              </span>
            </div>
          </div>

          {/* Notes & Technician */}
          <div className="text-[11px] text-slate-400 print:text-gray-600 space-y-1">
            <p><strong>Técnico Encargado:</strong> {order.technicianName || 'Equipo JHOICARWASH'}</p>
            {order.notes && <p><strong>Observaciones:</strong> {order.notes}</p>}
          </div>

          {/* Barcode & Security stamp */}
          <div className="pt-3 border-t border-[#232F42] print:border-gray-300 flex items-center justify-between text-xs text-slate-400 print:text-gray-600">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-white print:text-black opacity-80" />
              <div className="text-[10px]">
                <p className="font-mono font-bold text-white print:text-black">COMPROBANTE AUTORIZADO</p>
                <p>JHOICARWASH MotoCraft & Auto Care</p>
                <p className="text-slate-400 print:text-gray-600">Propietario: <strong className="text-[#00E5FF] print:text-black font-bold">Jhoiner Hincapie</strong></p>
                <p className="text-[9px] text-slate-500 print:text-gray-500 mt-0.5">Horarios: Mar-Vie: 8:00am - 5:00pm | Sáb-Dom: 9:00am - 6:00pm</p>
              </div>
            </div>
            <div className="text-right text-[10px]">
              <p className="font-bold text-slate-300 print:text-black">Firma Autorizada</p>
              <div className="w-28 border-b border-slate-500 print:border-black mt-2 mb-0.5" />
              <span className="font-bold text-slate-200 print:text-black">Jhoiner Hincapie</span>
              <span className="block text-[9px] text-slate-400 print:text-gray-600">Dirección General</span>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-[#0B0F17] border-t border-[#202C3F] flex flex-wrap items-center justify-between gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Enviar a WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#00E5FF]/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
