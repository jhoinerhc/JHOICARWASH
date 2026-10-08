import React, { useState } from 'react';
import { useApp, REQUIRED_ADMIN_EMAIL } from '../context/AppContext';
import { 
  ShieldCheck, 
  UserCheck, 
  X, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  LogOut,
  Mail
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, loginAsAdmin, logoutAdmin, isAdmin, showToast } = useApp();
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = loginAsAdmin(email, password);
    setIsSubmitting(false);

    if (result.success) {
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setErrorMessage(result.message || 'Credenciales inválidas');
    }
  };

  const handleSelectReception = () => {
    if (isAdmin) {
      logoutAdmin();
    }
    onClose();
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0F1522] rounded-3xl border border-[#2B394E] shadow-2xl overflow-hidden my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Official Logo */}
        <div className="bg-gradient-to-r from-[#003399] via-[#0A204C] to-[#141E2E] p-6 border-b border-[#00E5FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] bg-black/40 p-0.5 shrink-0">
              <img
                src="/logo.jpg"
                alt="JHOICARWASH Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider mb-1 border border-[#00E5FF]/30">
                <KeyRound className="w-3 h-3" />
                Seguridad & Control de Acceso
              </div>
              <h2 className="font-heading font-black text-xl text-white">
                Autenticación de Perfil
              </h2>
              <p className="text-slate-300 text-xs">
                JHOICARWASH MotoCraft & Auto Care • ¡EL SPA DE TU VEHICULO!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Active Status Ribbon */}
          <div className="flex items-center justify-between p-3.5 bg-[#141C2B] rounded-2xl border border-[#25364C] text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Sesión en Pantalla:</span>
              <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                isAdmin 
                  ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
              }`}>
                {isAdmin ? 'ADMINISTRADOR PRO (JHOINER)' : 'CLIENTE / RECEPCIÓN'}
              </span>
            </div>

            {isAdmin && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Cerrar Sesión
              </button>
            )}
          </div>

          {/* Dual Columns: Admin Login vs Reception Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Formulario de Inicio de Sesión Administrador */}
            <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
              isAdmin 
                ? 'bg-[#142033] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'bg-[#131A27] border-[#2B3B52]'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003399] to-[#0A1A3B] flex items-center justify-center border border-[#00E5FF]/40 text-[#00E5FF]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-sm text-white">
                        Perfil Administrador
                      </h3>
                      <span className="text-[10px] text-[#00E5FF] font-medium block">
                        Exclusivo Propietario
                      </span>
                    </div>
                  </div>
                  {isAdmin && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded-full border border-[#00E5FF]/30">
                      <CheckCircle2 className="w-3 h-3" /> ACTIVO
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 mb-4 leading-relaxed">
                  Permite editar precios en COP, crear o eliminar servicios, gestionar combos y ajustar duraciones técnicas.
                </p>

                {isAdmin ? (
                  <div className="p-3.5 bg-[#0D1522] rounded-xl border border-[#24374E] text-xs text-slate-300 space-y-2 mb-4">
                    <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Has iniciado sesión como Administrador
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Correo: <strong className="text-white">{REQUIRED_ADMIN_EMAIL}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Tienes control total sobre el catálogo de JHOICARWASH.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAdminLoginSubmit} className="space-y-3.5">
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-200 text-[11px] flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Email Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#00E5FF]" />
                        Correo Electrónico Autorizado *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jhoiner.hc230101@gmail.com"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1019] border border-[#28374C] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                      />
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#00E5FF]" />
                        Contraseña de Administrador *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••••"
                          className="w-full px-3 py-2 pr-9 rounded-xl bg-[#0B1019] border border-[#28374C] focus:border-[#00E5FF] text-white font-mono text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Quick Demo Helper Hint */}
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Propietario: Jhoiner Hernández</span>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail('jhoiner.hc230101@gmail.com');
                          setPassword('1193416952');
                        }}
                        className="text-[#00E5FF] hover:underline"
                      >
                        Auto-completar mis datos
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#003399] to-[#00E5FF] hover:from-[#0040be] hover:to-[#22ecff] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#003399]/30 transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-black" />
                      <span className="text-black font-extrabold">Ingresar como Administrador</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* 2. Perfil Cliente / Recepción (Acceso Inmediato) */}
            <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
              !isAdmin 
                ? 'bg-[#142033] border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                : 'bg-[#131A27] border-[#2B3B52]'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center border border-emerald-400/40 text-emerald-300">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-sm text-white">
                        Perfil Cliente / Recepción
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-medium block">
                        Mostrador & Toma de Pedidos
                      </span>
                    </div>
                  </div>
                  {!isAdmin && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
                      <CheckCircle2 className="w-3 h-3" /> ACTIVO
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 mb-4 leading-relaxed">
                  Modo optimizado para atención al público, registro de placas, selección de servicios y emisión de tickets sin riesgo de alterar tarifas base.
                </p>

                <ul className="text-xs space-y-2 text-slate-300 mb-6 bg-[#0B1019] p-3.5 rounded-xl border border-[#212E40]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Registro ágil de turnos con Nombre y Placa colombiana.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Cálculo automático de tiempo total de espera en minutos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Emisión de comprobante oficial con código QR y WhatsApp.</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleSelectReception}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  !isAdmin
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-[#1C283B] hover:bg-[#25354F] text-white border border-[#2B3F5D]'
                }`}
              >
                {!isAdmin ? 'Modo Recepción en Pantalla' : 'Cambiar a Modo Recepción'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3.5 bg-[#0B0F17] border-t border-[#1F2C3F] flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">
            Seguridad reforzada: únicamente <strong>{REQUIRED_ADMIN_EMAIL}</strong> tiene acceso gerencial.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
