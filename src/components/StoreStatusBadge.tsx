import React, { useState, useEffect } from 'react';
import { checkStoreStatus, StoreStatusResult } from '../utils/businessHours';
import { Clock, Info } from 'lucide-react';

interface StoreStatusBadgeProps {
  className?: string;
  showDetails?: boolean;
}

export const StoreStatusBadge: React.FC<StoreStatusBadgeProps> = ({ 
  className = '',
  showDetails = false
}) => {
  const [status, setStatus] = useState<StoreStatusResult>(() => checkStoreStatus());
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    // Check every 30 seconds for real-time accuracy
    const timer = setInterval(() => {
      setStatus(checkStoreStatus());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const isOpen = status.isOpen;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setTooltipOpen(!tooltipOpen)}
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none ${
          isOpen
            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.45)] hover:bg-emerald-900/90'
            : 'bg-rose-950/90 text-rose-300 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.45)] hover:bg-rose-900/90'
        }`}
        title="Haz clic para ver el horario oficial de atención"
      >
        {/* Pulsing Dot (Green if open, Red if closed) */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span 
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          />
          <span 
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            }`} 
          />
        </span>

        {/* Status Text (Ilumina en Verde o Rojo) */}
        <span className="tracking-widest font-extrabold text-[11px]">
          {isOpen ? 'ABIERTO AHORA' : 'CERRADO AHORA'}
        </span>

        {showDetails && (
          <span className="hidden sm:inline-block text-[10px] text-slate-300 border-l border-white/20 pl-2 font-medium">
            {status.todaySchedule}
          </span>
        )}

        <Info className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Popover Tooltip with Complete Schedule */}
      {tooltipOpen && (
        <div 
          className="absolute z-50 top-full right-0 sm:left-0 sm:right-auto mt-2 w-72 p-4 bg-[#0F1522] rounded-2xl border border-[#27384E] shadow-2xl text-xs space-y-2.5 animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#202E42]">
            <span className="font-heading font-black text-white text-xs">
              Horario Oficial de Atención
            </span>
            <button
              onClick={() => setTooltipOpen(false)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40">
              <span className="text-slate-400">Martes a Viernes:</span>
              <strong className="text-white">8:00 AM – 5:00 PM</strong>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40">
              <span className="text-slate-400">Sábados y Domingos:</span>
              <strong className="text-[#00E5FF]">9:00 AM – 6:00 PM</strong>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-rose-950/30 text-rose-300">
              <span>Lunes:</span>
              <strong className="text-rose-400">Cerrado (Mantenimiento)</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-[#202E42] text-[10px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3 h-3 text-[#00E5FF]" />
              <span>Hora del sistema: <strong>{status.currentTimeFormatted}</strong> ({status.dayOfWeekName})</span>
            </div>
            <p className={isOpen ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
              {status.nextOpeningMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
