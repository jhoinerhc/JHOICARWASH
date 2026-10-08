import React from 'react';
import { StoreStatusBadge } from './StoreStatusBadge';
import { Calendar, Clock, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { OWNER_FULL_NAME } from '../utils/businessHours';

export const BusinessScheduleFooter: React.FC<{ boardName?: string }> = ({ boardName }) => {
  return (
    <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0C1422] via-[#101C2E] to-[#14233A] border border-[#23354C] shadow-xl text-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2E42]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#00E5FF] p-0.5 bg-black/60 shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#00E5FF]">
              <Sparkles className="w-3 h-3 text-[#00E5FF]" />
              JHOICARWASH • ¡EL SPA DE TU VEHICULO!
            </div>
            <h4 className="font-heading font-black text-sm sm:text-base text-white">
              Horarios Oficiales de Atención & Prestación de Servicios
            </h4>
          </div>
        </div>

        {/* Real-time Open/Closed Badge with Glowing Colors */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <StoreStatusBadge showDetails={true} />
        </div>
      </div>

      {/* Schedules Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Slot 1: Martes a Viernes */}
        <div className="p-3.5 rounded-2xl bg-[#09101A] border border-[#1E2D40] space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Martes a Viernes</span>
          </div>
          <p className="font-mono font-black text-white text-sm">
            8:00 AM – 5:00 PM
          </p>
          <span className="text-[10px] text-slate-400 block font-medium">
            Jornada continua de lavados, detallado y corrección de pintura.
          </span>
        </div>

        {/* Slot 2: Sábados y Domingos */}
        <div className="p-3.5 rounded-2xl bg-[#09101A] border border-[#00E5FF]/30 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00E5FF] font-bold text-[11px] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Sábados y Domingos</span>
          </div>
          <p className="font-mono font-black text-[#00E5FF] text-sm">
            9:00 AM – 6:00 PM
          </p>
          <span className="text-[10px] text-slate-300 block font-medium">
            Fin de semana: bahías completas activas para motos y automóviles.
          </span>
        </div>

        {/* Slot 3: Lunes & Owner */}
        <div className="p-3.5 rounded-2xl bg-[#09101A] border border-[#1E2D40] space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Lunes / Administración</span>
          </div>
          <p className="font-mono font-bold text-amber-400 text-sm">
            Cerrado (Mantenimiento Técnico)
          </p>
          <span className="text-[10px] text-slate-400 block font-medium">
            Dirección General & Titularidad: <strong className="text-white">{OWNER_FULL_NAME}</strong>
          </span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 border-t border-[#1C2B3D]">
        <span>
          {boardName ? `Módulo Activo: ${boardName}` : 'Centro de Estética Automotriz y Motociclismo de Alto Rendimiento'}
        </span>
        <span className="font-medium text-slate-300">
          Propietario Registrado: <strong className="text-white">{OWNER_FULL_NAME}</strong>
        </span>
      </div>
    </div>
  );
};
