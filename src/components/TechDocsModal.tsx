import React from 'react';
import { X, BookOpen, Code2, Server, Smartphone, CheckCircle2, Shield, Layers, KeyRound, Zap } from 'lucide-react';

interface TechDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechDocsModal: React.FC<TechDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto no-print">
      <div 
        className="relative w-full max-w-3xl bg-[#0F1522] rounded-3xl border border-[#27384E] shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#003399] to-[#0D1F38] p-5 border-b border-[#00E5FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#00E5FF] p-0.5 bg-black">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-white">
                Documentación Técnica & Manual Operativo
              </h3>
              <p className="text-[11px] text-[#00E5FF] font-bold">
                JHOICARWASH MotoCraft & Auto Care • ¡EL SPA DE TU VEHICULO!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-slate-300 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Credenciales Oficiales de Seguridad */}
          <div className="space-y-2 bg-[#141C2B] p-4 rounded-2xl border border-[#00E5FF]/30">
            <h4 className="font-heading font-bold text-sm text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#00E5FF]" />
              1. Credenciales Oficiales del Propietario (Admin)
            </h4>
            <p className="leading-relaxed">
              El perfil de Administrador cuenta con autenticación estricta para garantizar que únicamente el propietario pueda modificar precios y catálogos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#0B1019] rounded-xl border border-[#24374E]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Correo Autorizado:</span>
                <span className="font-mono font-bold text-white text-xs">jhoiner.hc230101@gmail.com</span>
              </div>
              <div className="p-3 bg-[#0B1019] rounded-xl border border-[#24374E]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Contraseña de Acceso:</span>
                <span className="font-mono font-bold text-[#00E5FF] text-xs">1193416952</span>
              </div>
            </div>
          </div>

          {/* Section 2: Especialización de Servicios & Combos */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00E5FF]" />
              2. Especialización por Tipo de Vehículo y Combos
            </h4>
            <p className="leading-relaxed text-slate-400">
              Cada ficha técnica incluye ahora detalles paso a paso, garantías (cero rayones, técnica de 2 cubos, compatibilidad con retenes de cadena) y combos con ahorro calculado:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong className="text-white">MotoCraft (Motos):</strong> Imágenes 100% de motocicletas en lavado técnico, cadena y cerámico 9H.</li>
              <li><strong className="text-white">Auto Care (Autos):</strong> Imágenes 100% de automóviles en pre-lavado snow foam, interiores con vapor y chasis.</li>
              <li><strong className="text-white">Combos Promocionales:</strong> Descuentos claros de $15.000 a $45.000 COP para incentivar el ticket promedio.</li>
            </ul>
          </div>

          {/* Section 3: Cola de Turnos y Exportaciones */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#00E5FF]" />
              3. Flujo POS, Tiempos de Espera y Exportación
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-white">Tiempo Acumulado:</strong> El carrito computa dinámicamente la suma en minutos de todos los servicios agregados.</li>
              <li><strong className="text-white">Exportación a Excel:</strong> Archivo `.csv` con cabecera BOM UTF-8 y valores numéricos en COP.</li>
              <li><strong className="text-white">Comprobante y PDF:</strong> Estilos de impresión `@media print` oficiales con el logotipo de la empresa y desglose formal.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#0B0F17] border-t border-[#1C2738] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
