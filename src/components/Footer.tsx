import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC<{ onOpenDocs: () => void }> = ({ onOpenDocs }) => {
  const { setActiveTab } = useApp();

  return (
    <footer className="mt-16 bg-[#0B0F17] border-t border-[#1F2C3F] text-slate-400 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col with Logo */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)] bg-black p-0.5">
                <img
                  src="/logo.jpg"
                  alt="Logo JHOICARWASH"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white block">
                  JHOI<span className="text-[#00E5FF]">CARWASH</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00E5FF] block">
                  ¡EL SPA DE TU VEHICULO!
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                  PREMIUM AUTOLAVADO & DETALLADO • MOTOCRAFT & AUTO CARE
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Centro especializado en estética vehicular de alto rendimiento: corrección de pintura, 
              cerámica 9H, lavado técnico a vapor para motocicletas (MotoCraft) y descontaminado profundo para autos (Auto Care).
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#003399] border border-white/20" title="Azul Cobalto #003399" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#3A3D40] border border-white/20" title="Gris Titanio #3A3D40" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#E5E8EC] border border-white/20" title="Plata Claro #E5E8EC" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#00E5FF] border border-white/20 shadow-[0_0_8px_#00E5FF]" title="Cian Neón #00E5FF" />
              <span className="text-[10px] text-slate-500 font-mono ml-2">Paleta Oficial JHOICARWASH</span>
            </div>
          </div>

          {/* Direct Modules */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">
              Módulos del Sistema
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('pos_catalog')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  Tablero 2: Punto de Venta (POS) & Espera
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('crm_admin')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  Tablero 1: Módulo CRM & Catálogo Admin
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  Tablero 3: Analítica de Ventas & Reportes
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Technical Docs */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">
              Soporte & Guía Técnica
            </h4>
            <p className="text-slate-400 text-xs mb-3">
              Diseñado para atención táctil en mostrador y gestión gerencial de Jhoiner Hernández.
            </p>
            <button
              onClick={onOpenDocs}
              className="px-3 py-1.5 rounded-xl bg-[#141E2E] hover:bg-[#1D2B40] text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Ver Documentación Técnica</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C2738] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 JHOICARWASH MotoCraft & Auto Care. Propietario: Jhoiner Hernández.</p>
          <p className="flex items-center gap-1">
            Sistema POS & CRM de Alto Rendimiento en Colombia (COP).
          </p>
        </div>
      </div>
    </footer>
  );
};
