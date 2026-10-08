import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StoreStatusBadge } from './StoreStatusBadge';
import { 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  Sparkles, 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart3, 
  ArrowLeftRight,
  Menu,
  X,
  Gauge,
  LogOut,
  Lock
} from 'lucide-react';

export const Header: React.FC<{ onOpenRoleModal: () => void }> = ({ onOpenRoleModal }) => {
  const { 
    currentUser, 
    isAdmin, 
    logoutAdmin,
    activeTab, 
    setActiveTab, 
    orders, 
    cart 
  } = useApp();

  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeWaitingCount = orders.filter(o => o.status === 'En Espera' || o.status === 'En Proceso').length;
  const cartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#242E3E]">
      {/* Top Banner with Official Slogan */}
      <div className="bg-gradient-to-r from-[#003399] via-[#091f4a] to-[#0E1522] text-xs px-4 py-1.5 flex items-center justify-between text-[#E5E8EC] border-b border-[#00E5FF]/20">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1.5 font-bold text-[#00E5FF] tracking-wider uppercase text-[11px]">
            <Gauge className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
            ¡EL SPA DE TU VEHICULO!
          </span>
          <span className="hidden md:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-block text-slate-300 font-medium">
            PREMIUM AUTOLAVADO & DETALLADO • MOTOCRAFT & AUTO CARE
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {/* Store Open/Closed Real-Time Status Badge */}
          <StoreStatusBadge />

          <div className="flex items-center gap-1.5 text-slate-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
            <Clock className="w-3 h-3 text-[#00E5FF]" />
            <span className="font-mono text-[#00E5FF]">{time}</span>
            <span className="text-[10px] text-slate-400">COT</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-400">En Bahía:</span>
            <span className="bg-[#00E5FF]/10 text-[#00E5FF] font-bold px-2 py-0.5 rounded-full border border-[#00E5FF]/30">
              {activeWaitingCount} vehículos
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name with Official Image */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer select-none" 
            onClick={() => setActiveTab('pos_catalog')}
          >
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.35)] bg-[#070D18] flex items-center justify-center p-0.5 group">
              <img
                src="/logo.jpg"
                alt="Logo Oficial JHOICARWASH"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00E5FF] ring-2 ring-[#0B0F17]" />
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl tracking-tighter text-white">
                  JHOI<span className="text-[#00E5FF]">CARWASH</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/30 tracking-widest uppercase">
                  OFICIAL
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-black tracking-wider text-[#00E5FF] uppercase">
                ¡EL SPA DE TU VEHICULO!
              </p>
              <p className="text-[9px] font-medium tracking-wider text-slate-400 uppercase hidden sm:block">
                MotoCraft & Auto Care Pro
              </p>
            </div>
          </div>

          {/* Desktop Tab Switcher */}
          <nav className="hidden lg:flex items-center bg-[#141B26] p-1.5 rounded-2xl border border-[#2A374A] shadow-inner">
            <button
              onClick={() => setActiveTab('pos_catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'pos_catalog'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white font-bold shadow-md shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-[#00E5FF]" />
              <span>POS & Lista de Espera</span>
              {cartItemsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#00E5FF] text-black">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('crm_admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'crm_admin'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white font-bold shadow-md shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#00E5FF]" />
              <span>Módulo CRM & Catálogo</span>
              {isAdmin ? (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-[#00E5FF] border border-[#00E5FF]/40">
                  ADMIN
                </span>
              ) : (
                <Lock className="w-3 h-3 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-[#003399] to-[#0055ff] text-white font-bold shadow-md shadow-[#003399]/40 border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#00E5FF]" />
              <span>Analítica e Informes</span>
            </button>
          </nav>

          {/* User Profile & Role Switcher */}
          <div className="flex items-center gap-3">
            <div 
              onClick={onOpenRoleModal}
              className={`group flex items-center gap-3 p-1.5 pr-3.5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
                isAdmin 
                  ? 'bg-[#142136] border-[#00E5FF]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)]' 
                  : 'bg-[#141B26] border-[#2A374A] hover:border-[#00E5FF]/50'
              }`}
              title="Haz clic para iniciar sesión como Administrador o cambiar perfil"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-[#003399] group-hover:ring-[#00E5FF] transition-all bg-black/40">
                <img
                  src="/logo.jpg"
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className={`absolute -bottom-1 -right-1 p-0.5 rounded-full ${
                    isAdmin ? 'bg-cyan-500 text-black' : 'bg-emerald-500 text-white'
                  }`}
                >
                  {isAdmin ? <ShieldCheck className="w-2.5 h-2.5" /> : <UserCheck className="w-2.5 h-2.5" />}
                </div>
              </div>

              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors leading-tight">
                    {isAdmin ? 'Jhoiner Hincapie' : 'Recepción / Ventas'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full ${
                      isAdmin
                        ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isAdmin ? 'PROPIETARIO ADMIN' : 'MODO RECEPCIÓN'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="p-1.5 text-slate-400 group-hover:text-[#00E5FF] rounded-lg group-hover:bg-[#00E5FF]/10 transition-colors"
                aria-label="Alternar perfil"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Admin Logout button if logged in */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  logoutAdmin();
                }}
                className="hidden md:flex p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-300 hover:text-white transition-colors"
                title="Cerrar sesión de Administrador"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#141B26] border border-[#2A374A] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-[#242E3E] bg-[#101622] space-y-2">
            <button
              onClick={() => {
                setActiveTab('pos_catalog');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'pos_catalog'
                  ? 'bg-[#003399] text-white border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-4 h-4 text-[#00E5FF]" />
                <span>Tablero 2: POS & Lista de Espera</span>
              </div>
              {cartItemsCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#00E5FF] text-black">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('crm_admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'crm_admin'
                  ? 'bg-[#003399] text-white border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#00E5FF]" />
                <span>Tablero 1: CRM & Gestión de Catálogo</span>
              </div>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-900/60 text-[#00E5FF] border border-[#00E5FF]/40">
                  ADMIN
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('analytics');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'analytics'
                  ? 'bg-[#003399] text-white border border-[#00E5FF]/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-[#00E5FF]" />
                <span>Tablero 3: Analítica e Informes</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
