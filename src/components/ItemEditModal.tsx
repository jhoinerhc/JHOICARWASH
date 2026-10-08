import React, { useState, useEffect, useRef } from 'react';
import { CatalogItem, ItemCategory, ItemKind } from '../types';
import { formatCOP } from '../utils/formatters';
import { 
  X, 
  Save, 
  Image as ImageIcon, 
  Clock, 
  Tag, 
  Layers, 
  FileText, 
  Check, 
  Sparkles,
  Package,
  Upload,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Percent,
  CalendarClock,
  ArrowRight
} from 'lucide-react';

interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Omit<CatalogItem, 'id'>) => void;
  onDelete?: (itemId: string) => void;
  initialItem?: CatalogItem | null;
}

const PRESET_IMAGES = [
  // Motos
  { label: 'Moto Detallado Pro', category: 'motos', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cadena & Transmisión', category: 'motos', url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80' },
  { label: 'Carenado & Tanque Brillo', category: 'motos', url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cerámico Coating 9H Moto', category: 'motos', url: 'https://images.unsplash.com/photo-1571188654249-7a9dc384918f?auto=format&fit=crop&w=800&q=80' },
  // Autos
  { label: 'Lavado Espuma Snow Foam', category: 'autos', url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Interiores & Vapor Profundo', category: 'autos', url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chasis & Rines Descontaminados', category: 'autos', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pulido & Corrección Brillo', category: 'autos', url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80' },
  // Productos & Extras
  { label: 'Cera Hydro en Spray', category: 'extras', url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Microfibras Alta Densidad', category: 'extras', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },
  { label: 'Acondicionador Cuero/Plástico', category: 'extras', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lubricante Sintético Cadena', category: 'extras', url: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&w=800&q=80' }
];

export const ItemEditModal: React.FC<ItemEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialItem
}) => {
  // Basic info
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('motos');
  const [kind, setKind] = useState<ItemKind>('service');
  const [priceCOP, setPriceCOP] = useState<number>(35000);
  const [savingsCOP, setSavingsCOP] = useState<number>(0);
  const [durationMin, setDurationMin] = useState<number>(45);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);

  // Specifications, Guarantees and Benefits
  const [includesList, setIncludesList] = useState<string[]>([]);
  const [newIncludeText, setNewIncludeText] = useState('');

  const [benefitsList, setBenefitsList] = useState<string[]>([]);
  const [newBenefitText, setNewBenefitText] = useState('');

  const [guarantee, setGuarantee] = useState('');
  const [recommendedFrequency, setRecommendedFrequency] = useState('');

  // Image upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadFeedback, setImageUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // In-modal delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setCategory(initialItem.category);
      setKind(initialItem.kind);
      setPriceCOP(initialItem.priceCOP);
      setSavingsCOP(initialItem.savingsCOP || 0);
      setDurationMin(initialItem.durationMin || 30);
      setStock(initialItem.stock || 10);
      setDescription(initialItem.description);
      setImageUrl(initialItem.imageUrl);
      setFeatured(!!initialItem.featured);
      setIncludesList(initialItem.includes ? [...initialItem.includes] : []);
      setBenefitsList(initialItem.benefits ? [...initialItem.benefits] : []);
      setGuarantee(initialItem.guarantee || '');
      setRecommendedFrequency(initialItem.recommendedFrequency || '');
    } else {
      setName('');
      setCategory('motos');
      setKind('service');
      setPriceCOP(35000);
      setSavingsCOP(0);
      setDurationMin(45);
      setStock(20);
      setDescription('');
      setImageUrl(PRESET_IMAGES[0].url);
      setFeatured(false);
      setIncludesList([
        'Pre-lavado con Snow Foam PH Neutro',
        'Desengrase y detallado de rines y suspensión',
        'Secado técnico con microfibra y aire a presión'
      ]);
      setBenefitsList([
        'Protege el barniz original sin micro-rayones',
        'Evita la corrosión y la sulfatación de componentes'
      ]);
      setGuarantee('Garantía Cero Rayones con productos certificados.');
      setRecommendedFrequency('Cada 15 a 20 días');
    }
    setNewIncludeText('');
    setNewBenefitText('');
    setShowDeleteConfirm(false);
    setImageUploadFeedback(null);
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload (converts to Base64)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageUploadFeedback('Por favor selecciona un archivo de imagen válido (.jpg, .png, .webp).');
      return;
    }

    // Limit size to 5MB to avoid browser localStorage overflow
    if (file.size > 5 * 1024 * 1024) {
      setImageUploadFeedback('La imagen supera los 5MB. Por favor sube una imagen más ligera o comprimida.');
      return;
    }

    setIsUploadingImage(true);
    setImageUploadFeedback('Cargando y procesando fotografía...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrl(result);
        setIsUploadingImage(false);
        setImageUploadFeedback('¡Foto cargada exitosamente desde tu dispositivo!');
        setTimeout(() => setImageUploadFeedback(null), 3000);
      }
    };
    reader.onerror = () => {
      setIsUploadingImage(false);
      setImageUploadFeedback('Hubo un error al leer el archivo. Intenta nuevamente.');
    };
    reader.readAsDataURL(file);
  };

  // Add specification/include
  const handleAddInclude = () => {
    if (!newIncludeText.trim()) return;
    setIncludesList(prev => [...prev, newIncludeText.trim()]);
    setNewIncludeText('');
  };

  // Remove specification/include
  const handleRemoveInclude = (index: number) => {
    setIncludesList(prev => prev.filter((_, i) => i !== index));
  };

  // Add benefit
  const handleAddBenefit = () => {
    if (!newBenefitText.trim()) return;
    setBenefitsList(prev => [...prev, newBenefitText.trim()]);
    setNewBenefitText('');
  };

  // Remove benefit
  const handleRemoveBenefit = (index: number) => {
    setBenefitsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      category,
      kind,
      priceCOP: Math.max(0, Number(priceCOP) || 0),
      savingsCOP: kind === 'combo' ? Math.max(0, Number(savingsCOP) || 0) : undefined,
      durationMin: kind !== 'product' ? Math.max(5, Number(durationMin) || 0) : undefined,
      stock: kind === 'product' ? Math.max(0, Number(stock) || 0) : undefined,
      description: description.trim(),
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      featured,
      includes: includesList.length > 0 ? includesList : undefined,
      benefits: benefitsList.length > 0 ? benefitsList : undefined,
      guarantee: guarantee.trim() || undefined,
      recommendedFrequency: recommendedFrequency.trim() || undefined
    });
    onClose();
  };

  const handleDeleteConfirmed = () => {
    if (initialItem && onDelete) {
      onDelete(initialItem.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#0F1522] rounded-3xl border border-[#2B394E] shadow-2xl overflow-hidden my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#003399] via-[#091f4b] to-[#121A2A] p-5 sm:p-6 border-b border-[#00E5FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.4)] bg-black/40 p-0.5 shrink-0">
              <img
                src="/logo.jpg"
                alt="JHOICARWASH"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider mb-0.5 border border-[#00E5FF]/30">
                <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                ¡EL SPA DE TU VEHICULO! • Editor Maestro
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                {initialItem ? `Editar: ${initialItem.name}` : 'Crear Nuevo Servicio o Producto'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* SECTION 1: GENERAL INFO */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2B3E]">
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                1. Información Principal & Categoría
              </span>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="rounded border-[#2A374A] text-[#00E5FF] focus:ring-[#00E5FF] w-4 h-4 cursor-pointer"
                />
                <span className="flex items-center gap-1 text-yellow-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Destacado en Vitrina
                </span>
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Nombre del Servicio o Producto *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej. Lavado Técnico Cerámico MotoCraft"
                className="w-full px-4 py-3 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
              />
            </div>

            {/* Category & Kind */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#00E5FF]" />
                  Categoría Vehicular *
                </label>
                <select
                  value={category}
                  onChange={e => {
                    const val = e.target.value as ItemCategory;
                    setCategory(val);
                    if (val === 'extras') {
                      setKind('product');
                    } else if (val === 'combos') {
                      setKind('combo');
                    } else {
                      setKind('service');
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-bold focus:outline-none"
                >
                  <option value="motos">Motocicletas (Especialización MotoCraft)</option>
                  <option value="autos">Automóviles (Especialización Auto Care)</option>
                  <option value="combos">Combos & Paquetes Élite Especiales</option>
                  <option value="extras">Productos Extras (Mantenimiento & Insumos)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
                  Naturaleza del Ítem *
                </label>
                <select
                  value={kind}
                  onChange={e => setKind(e.target.value as ItemKind)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-bold focus:outline-none"
                >
                  <option value="service">Servicio Técnico (Añade tiempo a la cola de espera)</option>
                  <option value="combo">Combo Promocional (Paquete con tiempo y ahorro)</option>
                  <option value="product">Producto Físico (Inventario en stock)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#00E5FF]" />
                Descripción Técnica / Procedimiento
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explica detalladamente la tecnología, químicos y resultado que experimentará el vehículo..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* SECTION 2: PRICING, TIME & STOCK */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#1E2B3E]">
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                2. Tarifas Oficiales en COP & Tiempos Operativos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Price COP */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Precio Oficial ($ COP) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-[#00E5FF]">
                    $ COP
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    value={priceCOP}
                    onChange={e => setPriceCOP(Number(e.target.value))}
                    className="w-full pl-20 pr-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white font-mono font-bold text-sm focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-[#00E5FF] font-mono mt-1 font-semibold">
                  {formatCOP(priceCOP)}
                </p>
              </div>

              {/* Duration or Stock */}
              {kind !== 'product' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    Duración Estimada (Min) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    required
                    value={durationMin}
                    onChange={e => setDurationMin(Number(e.target.value))}
                    placeholder="Ej. 45"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white font-mono font-bold text-sm focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tiempo para cola de espera
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                    Unidades en Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white font-mono font-bold text-sm focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Inventario en vitrina física
                  </p>
                </div>
              )}

              {/* Savings or Frequency */}
              {kind === 'combo' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    Ahorro para el Cliente ($ COP)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={savingsCOP}
                    onChange={e => setSavingsCOP(Number(e.target.value))}
                    placeholder="Ej. 25000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white font-mono font-bold text-sm focus:outline-none"
                  />
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                    Ahorro: {formatCOP(savingsCOP)}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    Frecuencia Recomendada
                  </label>
                  <input
                    type="text"
                    value={recommendedFrequency}
                    onChange={e => setRecommendedFrequency(e.target.value)}
                    placeholder="Ej. Cada 15 a 20 días"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-semibold focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Consejo para el usuario
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: IMAGE UPLOAD & ATTACHMENT */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#1E2B3E]">
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                3. Fotografía de Referencia (Sube tu Foto o Elige un Preset)
              </span>
            </div>

            {/* Custom File Upload Button */}
            <div className="p-4 bg-[#141C2B] rounded-2xl border border-[#27394E] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#00E5FF]" />
                    Subir Foto desde tu Computador o Celular
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Sube cualquier foto real tomada en tu taller o descargada (JPG, PNG, WebP).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="px-4 py-2 rounded-xl bg-[#003399] hover:bg-[#0044cc] text-[#00E5FF] hover:text-white border border-[#00E5FF]/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Seleccionar Archivo Local</span>
                  </button>
                </div>
              </div>

              {imageUploadFeedback && (
                <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs text-[#00E5FF] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{imageUploadFeedback}</span>
                </div>
              )}

              {/* URL input fallback */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  O pega una URL directa de imagen web:
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2 rounded-xl bg-[#182333] border border-[#2B3B52] focus:border-[#00E5FF] text-white text-xs font-mono focus:outline-none"
                />
              </div>

              {/* Preset Gallery */}
              <div>
                <span className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Galería de Presets de Fotografía Vehicular:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`group relative aspect-video rounded-xl overflow-hidden border transition-all ${
                        imageUrl === preset.url
                          ? 'border-[#00E5FF] ring-2 ring-[#00E5FF]/50 scale-102'
                          : 'border-[#26354A] opacity-60 hover:opacity-100 hover:border-slate-400'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate px-1 bg-black/70 rounded">
                        {preset.label}
                      </span>
                      {imageUrl === preset.url && (
                        <div className="absolute top-1 right-1 bg-[#00E5FF] text-black rounded-full p-0.5 shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Image Preview Box */}
              {imageUrl && (
                <div className="flex items-center gap-3 p-3 bg-[#0C121D] rounded-xl border border-[#223145]">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="w-20 h-16 object-cover rounded-lg border border-[#00E5FF]/40 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Fotografía Activa para este Servicio
                    </span>
                    <p className="text-slate-400 truncate text-[11px] mt-0.5">{imageUrl}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-600/30 text-[11px] font-bold transition-colors"
                  >
                    Quitar Foto
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: SPECIFICATIONS / INCLUDES */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#1E2B3E]">
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                4. Especificaciones del Servicio (Lo que Incluye el Procedimiento)
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIncludeText}
                  onChange={e => setNewIncludeText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInclude();
                    }
                  }}
                  placeholder="Ej. Desengrase minucioso de cadena con solvente dieléctrico"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-semibold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddInclude}
                  className="px-4 py-2.5 rounded-xl bg-[#003399] hover:bg-[#0044cc] text-[#00E5FF] hover:text-white border border-[#00E5FF]/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Ítem</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {includesList.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-2 bg-[#121926] rounded-xl border border-dashed border-[#233145]">
                    No has agregado especificaciones. Escribe arriba y pulsa "Añadir Ítem".
                  </p>
                ) : (
                  includesList.map((inc, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#141C2B] border border-[#243449] text-xs text-slate-200 group hover:border-[#00E5FF]/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className="w-5 h-5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="truncate">{inc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInclude(index)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Eliminar este ítem"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* SECTION 5: GUARANTEES & BENEFITS */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#1E2B3E]">
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                5. Garantías Certificadas & Beneficios Directos
              </span>
            </div>

            {/* Guarantee input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Garantía Oficial del Servicio / Calidad
              </label>
              <input
                type="text"
                value={guarantee}
                onChange={e => setGuarantee(e.target.value)}
                placeholder="Ej. Garantía Cero Rayones en pintura y protección UV por 60 días."
                className="w-full px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-semibold focus:outline-none"
              />
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Beneficios Directos para el Vehículo y el Cliente
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBenefitText}
                  onChange={e => setNewBenefitText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                  placeholder="Ej. Extiende en un 40% la vida útil del kit de arrastre"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#162030] border border-[#27384E] focus:border-[#00E5FF] text-white text-xs font-semibold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Beneficio</span>
                </button>
              </div>

              {/* Benefits list */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {benefitsList.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-2 bg-[#121926] rounded-xl border border-dashed border-[#233145]">
                    No has agregado beneficios directos. Escribe arriba y pulsa "Añadir Beneficio".
                  </p>
                ) : (
                  benefitsList.map((ben, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#141C2B] border border-[#243449] text-xs text-slate-200 group hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{ben}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Eliminar este beneficio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* DANGER ZONE / IN-MODAL DELETE (If editing existing item) */}
          {initialItem && onDelete && (
            <div className="pt-4 border-t border-rose-950/60">
              {!showDeleteConfirm ? (
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      ¿Deseas eliminar permanentemente este registro?
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Se retirará del catálogo de ventas y de la lista de turnos POS.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-600/50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar Registro</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-600 text-xs space-y-3 animate-fade-in">
                  <p className="font-bold text-rose-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Confirmación de Eliminación: ¿Confirmas eliminar "{initialItem.name}"?
                  </p>
                  <p className="text-slate-300 text-[11px]">
                    Esta acción eliminará el servicio del catálogo de JHOICARWASH inmediatamente.
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConfirmed}
                      className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Sí, Eliminar Definitivamente</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1E2B3E]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#162132] hover:bg-[#1f2f47] text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar sin Guardar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#003399] via-[#0055ff] to-[#00E5FF] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#003399]/50 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Guardar en Catálogo JHOICARWASH</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
