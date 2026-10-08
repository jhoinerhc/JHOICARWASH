import React, { useState } from 'react';
import { useApp, REQUIRED_ADMIN_EMAIL } from '../context/AppContext';
import { CatalogItem, ItemCategory } from '../types';
import { formatCOP, formatDuration } from '../utils/formatters';
import { ItemEditModal } from './ItemEditModal';
import { StoreStatusBadge } from './StoreStatusBadge';
import { BusinessScheduleFooter } from './BusinessScheduleFooter';
import { 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  Clock, 
  Lock, 
  Sparkles, 
  Bike, 
  Car, 
  Package, 
  Layers, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCircle2,
  Zap,
  KeyRound,
  LogOut,
  Mail,
  AlertCircle
} from 'lucide-react';

export const Board1AdminCRM: React.FC<{ onOpenRoleModal: () => void }> = ({ onOpenRoleModal }) => {
  const { 
    currentUser, 
    isAdmin, 
    loginAsAdmin,
    logoutAdmin,
    catalogItems, 
    addCatalogItem, 
    updateCatalogItem, 
    deleteCatalogItem, 
    resetDefaultCatalog,
    setActiveTab
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CatalogItem | null>(null);

  // In-page admin login state if locked
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleInPageLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginAsAdmin(loginEmail, loginPass);
    if (!res.success) {
      setLoginError(res.message || 'Error de credenciales');
    } else {
      setLoginEmail('');
      setLoginPass('');
    }
  };

  // Filter items
  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CatalogItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Omit<CatalogItem, 'id'>) => {
    if (editingItem) {
      updateCatalogItem(editingItem.id, itemData);
    } else {
      addCatalogItem(itemData);
    }
  };

  const motoCount = catalogItems.filter(i => i.category === 'motos').length;
  const autoCount = catalogItems.filter(i => i.category === 'autos').length;
  const comboCount = catalogItems.filter(i => i.category === 'combos').length;
  const extraCount = catalogItems.filter(i => i.category === 'extras').length;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Banner: Identity & Roles */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#101E36] to-[#15233D] border border-[#24354D] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#003399]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 max-w-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] bg-black/40 shrink-0 p-0.5">
              <img
                src="/logo.jpg"
                alt="Logo JHOICARWASH"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[11px] font-bold uppercase tracking-wider border border-[#00E5FF]/30">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                ¡EL SPA DE TU VEHICULO! • Administración CRM
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                Gestión de Catálogo, Precios & Combos
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Control exclusivo de tarifas en Pesos Colombianos (COP), fotografías por categoría, duraciones técnicas y paquetes promocionales de <strong className="text-white">JHOICARWASH</strong>.
              </p>
            </div>
          </div>

          {/* Quick Active Role Card */}
          <div className="bg-[#141C2B]/95 backdrop-blur-md p-5 rounded-2xl border border-[#2A3B54] flex flex-col gap-3 min-w-[280px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Estado de Sesión
            </span>
            <div className="flex items-center gap-3">
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isAdmin 
                    ? 'bg-[#003399] text-[#00E5FF] ring-2 ring-[#00E5FF]/40' 
                    : 'bg-emerald-900/60 text-emerald-400 ring-2 ring-emerald-500/40'
                }`}
              >
                {isAdmin ? <ShieldCheck className="w-7 h-7" /> : <UserCheck className="w-7 h-7" />}
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                  {isAdmin ? 'Jhoiner Hincapie' : 'Recepción / Ventas'}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 uppercase tracking-wider ${
                  isAdmin ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {isAdmin ? 'PROPIETARIO ADMIN' : 'MODO RECEPCIÓN'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#223044] flex items-center gap-2">
              {isAdmin ? (
                <button
                  onClick={logoutAdmin}
                  className="w-full text-xs font-bold py-2 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Cerrar Sesión Admin
                </button>
              ) : (
                <button
                  onClick={onOpenRoleModal}
                  className="w-full text-xs font-bold py-2 px-3 rounded-xl bg-[#003399] hover:bg-[#0044cc] text-[#00E5FF] border border-[#00E5FF]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Ingresar como Administrador
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lock Banner if not logged in as Admin */}
        {!isAdmin && (
          <div className="mt-6 p-5 rounded-2xl bg-[#0D1524] border border-[#2B3B52] space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-sm text-white">
                  Módulo de Gestión Bloqueado: Autenticación Requerida
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Para modificar precios en COP, agregar servicios, eliminar combos o cambiar fotos, inicia sesión con las credenciales oficiales de <strong>{REQUIRED_ADMIN_EMAIL}</strong>.
                </p>
              </div>
            </div>

            <form onSubmit={handleInPageLogin} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="jhoiner.hc230101@gmail.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141C2B] border border-[#2B3D54] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                />
              </div>
              <div className="w-full sm:flex-1">
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  placeholder="Contraseña (1193416952)"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141C2B] border border-[#2B3D54] focus:border-[#00E5FF] text-white text-xs focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-md"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Desbloquear</span>
              </button>
            </form>

            {loginError && (
              <div className="text-[11px] text-rose-300 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Catalog Management Navigation Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills including Combos */}
        <div className="flex flex-wrap items-center gap-2 bg-[#121926] p-1.5 rounded-2xl border border-[#222E42]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#003399] text-white shadow-md shadow-[#003399]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Todos ({catalogItems.length})
          </button>
          
          <button
            onClick={() => setSelectedCategory('motos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'motos'
                ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-[#00E5FF]" />
            MotoCraft ({motoCount})
          </button>

          <button
            onClick={() => setSelectedCategory('autos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'autos'
                ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-[#00E5FF]" />
            Auto Care ({autoCount})
          </button>

          <button
            onClick={() => setSelectedCategory('combos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'combos'
                ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
            Combos Pro ({comboCount})
          </button>

          <button
            onClick={() => setSelectedCategory('extras')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'extras'
                ? 'bg-[#003399] text-[#00E5FF] border border-[#00E5FF]/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#00E5FF]" />
            Extras ({extraCount})
          </button>
        </div>

        {/* Search, Store Status Badge & Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Small Status Badge / Bubble (Green if Open, Red if Closed) */}
          <StoreStatusBadge />

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar servicio o combo..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121926] border border-[#222E42] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isAdmin ? (
              <button
                onClick={handleOpenCreate}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#20e9ff] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#00E5FF]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Nuevo Registro
              </button>
            ) : (
              <button
                onClick={onOpenRoleModal}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#162132] border border-[#2B3C54] hover:border-[#00E5FF] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                title="Inicia sesión como Administrador para editar"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Desbloquear Edición
              </button>
            )}

            <button
              onClick={resetDefaultCatalog}
              className="p-2 rounded-xl bg-[#121926] border border-[#222E42] text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
              title="Restablecer catálogo a configuración de fábrica"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isMoto = item.category === 'motos';
          const isAuto = item.category === 'autos';
          const isCombo = item.category === 'combos';

          return (
            <div
              key={item.id}
              className="group relative bg-[#131B28] rounded-2xl border border-[#233145] hover:border-[#00E5FF]/50 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131B28] via-transparent to-black/50" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isMoto
                          ? 'bg-[#003399]/90 text-[#00E5FF] border border-[#00E5FF]/40'
                          : isAuto
                          ? 'bg-indigo-900/90 text-indigo-200 border border-indigo-400/30'
                          : isCombo
                          ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-400/30'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-600/30'
                      }`}
                    >
                      {isMoto ? 'MotoCraft' : isAuto ? 'Auto Care' : isCombo ? 'Combo Especial' : 'Producto Extra'}
                    </span>

                    {item.savingsCOP && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#00E5FF] text-black shadow">
                        Ahorro {formatCOP(item.savingsCOP)}
                      </span>
                    )}
                  </div>

                  {/* Duration or Stock Badge */}
                  <div className="absolute top-3 right-3">
                    {item.durationMin ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold bg-black/80 text-white px-2.5 py-1 rounded-md border border-white/20">
                        <Clock className="w-3 h-3 text-[#00E5FF]" />
                        {item.durationMin} min
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold bg-black/80 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/30">
                        <Package className="w-3 h-3" />
                        Stock: {item.stock ?? 10} u.
                      </span>
                    )}
                  </div>

                  {/* Admin Quick Photo Trigger */}
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-[#003399] text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 text-xs flex items-center gap-1.5 cursor-pointer"
                      title="Cambiar fotografía"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Cambiar Foto</span>
                    </button>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Guarantee & Specs Badges */}
                  <div className="space-y-1.5 pt-1">
                    {item.guarantee && (
                      <div className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate"><strong>Garantía:</strong> {item.guarantee}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      {item.includes && item.includes.length > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 font-bold">
                          ✓ {item.includes.length} pasos incluidos
                        </span>
                      )}
                      {item.benefits && item.benefits.length > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-bold">
                          ★ {item.benefits.length} beneficios clave
                        </span>
                      )}
                      {item.recommendedFrequency && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                          ⏱ {item.recommendedFrequency}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions Bottom Box */}
              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-[#202C3F] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                      Tarifa Oficial (COP)
                    </span>
                    <span className="font-mono font-black text-xl text-[#00E5FF]">
                      {formatCOP(item.priceCOP)}
                    </span>
                  </div>

                  {item.durationMin && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        Tiempo Técnico
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {formatDuration(item.durationMin)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#1A2536] hover:bg-[#25354D] text-slate-200 hover:text-white border border-[#2E415B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#00E5FF]" />
                        Modificar Precio/Datos
                      </button>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="p-2 rounded-xl bg-[#1A2536] hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-[#2E415B] hover:border-rose-800 transition-colors cursor-pointer"
                        title="Eliminar registro del catálogo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setActiveTab('pos_catalog')}
                      className="w-full py-2 px-3 rounded-xl bg-[#003399]/40 hover:bg-[#003399] text-[#00E5FF] hover:text-white border border-[#00E5FF]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Ordenar en POS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Modal (Create or Edit) */}
      <ItemEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        onDelete={deleteCatalogItem}
        initialItem={editingItem}
      />

      {/* Custom In-App Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-md bg-[#121926] rounded-3xl border border-rose-500/50 shadow-2xl overflow-hidden p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-600/60 flex items-center justify-center text-rose-400 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                  Confirmación de Eliminación
                </span>
                <h3 className="font-heading font-black text-lg text-white">
                  ¿Eliminar este registro?
                </h3>
              </div>
            </div>

            <div className="p-3.5 bg-[#0C121D] rounded-2xl border border-[#243347] flex items-center gap-3.5">
              <img
                src={itemToDelete.imageUrl}
                alt={itemToDelete.name}
                className="w-14 h-14 object-cover rounded-xl border border-white/10 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-white truncate">{itemToDelete.name}</h4>
                <p className="font-mono text-xs text-[#00E5FF] font-bold mt-0.5">
                  {formatCOP(itemToDelete.priceCOP)}
                </p>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Categoría: {itemToDelete.category}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Al confirmar, este servicio o producto se eliminará de forma permanente del catálogo de JHOICARWASH y no estará disponible para turnos de venta en el POS.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1E2B3E]">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCatalogItem(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-900/40 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sí, Eliminar Registro</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Business Hours & Services Schedule Footer */}
      <BusinessScheduleFooter boardName="Tablero 1: Módulo CRM & Gestión de Catálogo" />
    </div>
  );
};
