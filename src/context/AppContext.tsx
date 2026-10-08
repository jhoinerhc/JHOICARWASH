import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CatalogItem, CartItem, ServiceOrder, OrderStatus, UserRole, UserSession, LoyalCustomer } from '../types';
import { INITIAL_CATALOG_ITEMS, INITIAL_ORDERS } from '../data/initialData';
import { INITIAL_LOYAL_CUSTOMERS } from '../data/loyaltyAndAnalyticsData';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Authentication & Role
  currentUser: UserSession;
  loginAsAdmin: (email: string, password: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  setUserRole: (role: UserRole) => void;
  toggleRole: () => void;
  isAdmin: boolean;

  // Navigation
  activeTab: 'crm_admin' | 'pos_catalog' | 'analytics';
  setActiveTab: (tab: 'crm_admin' | 'pos_catalog' | 'analytics') => void;

  // Catalog Management (CRM / Admin)
  catalogItems: CatalogItem[];
  addCatalogItem: (item: Omit<CatalogItem, 'id'>) => void;
  updateCatalogItem: (id: string, item: Partial<CatalogItem>) => void;
  deleteCatalogItem: (id: string) => void;
  resetDefaultCatalog: () => void;

  // Cart (POS)
  cart: CartItem[];
  addToCart: (item: CatalogItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCOP: number;
  cartTotalDurationMin: number;

  // Orders & Waiting Queue
  orders: ServiceOrder[];
  createOrder: (payload: {
    clientName: string;
    vehiclePlate: string;
    clientPhone?: string;
    vehicleType: 'Moto' | 'Auto' | 'Especial';
    notes?: string;
    technicianName?: string;
  }) => ServiceOrder | null;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Loyalty Club
  loyalCustomers: LoyalCustomer[];
  assignRewardToCustomer: (customerId: string, rewardTitle: string) => void;
  redeemPoints: (customerId: string, points: number, rewardTitle: string) => void;

  // Modal / Receipt / Notification
  receiptOrder: ServiceOrder | null;
  setReceiptOrder: (order: ServiceOrder | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const REQUIRED_ADMIN_EMAIL = 'jhoiner.hc230101@gmail.com';
export const REQUIRED_ADMIN_PASSWORD = '1193416952';

const ADMIN_PROFILE: UserSession = {
  role: 'admin',
  name: 'Jhoiner Hincapie',
  title: 'Director General & Propietario Principal',
  email: 'jhoiner.hc230101@gmail.com',
  avatar: '/logo.jpg',
  isAuthenticatedAdmin: true
};

const RECEPTION_PROFILE: UserSession = {
  role: 'reception',
  name: 'Recepción & Ventas JHOICARWASH',
  title: 'Atención al Cliente & Asignación de Turnos',
  email: 'recepcion@jhoicarwash.com',
  avatar: '/logo.jpg',
  isAuthenticatedAdmin: false
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Current user role with strict authentication persistence
  const [currentUser, setCurrentUser] = useState<UserSession>(() => {
    try {
      const savedAuth = localStorage.getItem('jhoi_admin_auth');
      if (savedAuth === 'true') {
        return ADMIN_PROFILE;
      }
    } catch (e) {
      console.error(e);
    }
    return RECEPTION_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'crm_admin' | 'pos_catalog' | 'analytics'>('pos_catalog');

  // Catalog items - re-seed with richer combos and clear data if version changed
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(() => {
    try {
      const version = localStorage.getItem('jhoi_catalog_v2');
      const saved = localStorage.getItem('jhoi_catalog');
      if (saved && version === '2.1') {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CATALOG_ITEMS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jhoi_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<ServiceOrder[]>(() => {
    try {
      const saved = localStorage.getItem('jhoi_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Loyal Customers State
  const [loyalCustomers, setLoyalCustomers] = useState<LoyalCustomer[]>(() => {
    try {
      const saved = localStorage.getItem('jhoi_loyalty');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LOYAL_CUSTOMERS;
  });

  const [receiptOrder, setReceiptOrder] = useState<ServiceOrder | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('jhoi_catalog_v2', '2.1');
    localStorage.setItem('jhoi_catalog', JSON.stringify(catalogItems));
  }, [catalogItems]);

  useEffect(() => {
    localStorage.setItem('jhoi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jhoi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('jhoi_loyalty', JSON.stringify(loyalCustomers));
  }, [loyalCustomers]);

  const assignRewardToCustomer = (customerId: string, rewardTitle: string) => {
    setLoyalCustomers(prev =>
      prev.map(c => {
        if (c.id === customerId) {
          return {
            ...c,
            assignedRewards: [rewardTitle, ...c.assignedRewards]
          };
        }
        return c;
      })
    );
    showToast(`¡Beneficio "${rewardTitle}" asignado exitosamente al cliente!`, 'success');
  };

  const redeemPoints = (customerId: string, points: number, rewardTitle: string) => {
    setLoyalCustomers(prev =>
      prev.map(c => {
        if (c.id === customerId) {
          const newPts = Math.max(0, c.points - points);
          return {
            ...c,
            points: newPts,
            assignedRewards: [rewardTitle, ...c.assignedRewards]
          };
        }
        return c;
      })
    );
    showToast(`Puntos canjeados. Recompensa "${rewardTitle}" activada.`, 'success');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  /**
   * Strict Login validation for Administrator
   * Only allows jhoiner.hc230101@gmail.com and password 1193416952
   */
  const loginAsAdmin = (email: string, pass: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === REQUIRED_ADMIN_EMAIL.toLowerCase() && cleanPass === REQUIRED_ADMIN_PASSWORD) {
      setCurrentUser(ADMIN_PROFILE);
      localStorage.setItem('jhoi_admin_auth', 'true');
      showToast('¡Bienvenido, Jhoiner! Sesión de Administrador iniciada correctamente.', 'success');
      return { success: true };
    }

    if (cleanEmail !== REQUIRED_ADMIN_EMAIL.toLowerCase()) {
      return { 
        success: false, 
        message: 'Correo no autorizado. Solo el propietario registrado (jhoiner.hc230101@gmail.com) puede ingresar al módulo administrativo.' 
      };
    }

    return { 
      success: false, 
      message: 'Contraseña incorrecta. Por favor verifica tu clave de acceso de 10 dígitos.' 
    };
  };

  const logoutAdmin = () => {
    setCurrentUser(RECEPTION_PROFILE);
    localStorage.removeItem('jhoi_admin_auth');
    showToast('Sesión de Administrador cerrada. Modo Recepción / Cliente activo.', 'info');
  };

  const setUserRole = (role: UserRole) => {
    if (role === 'admin') {
      // Must use loginAsAdmin with credentials, but keep method for compatibility
      if (currentUser.isAuthenticatedAdmin) {
        setCurrentUser(ADMIN_PROFILE);
      }
    } else {
      logoutAdmin();
    }
  };

  const toggleRole = () => {
    if (currentUser.role === 'admin') {
      logoutAdmin();
    }
  };

  // Catalog modifications
  const addCatalogItem = (newItem: Omit<CatalogItem, 'id'>) => {
    const id = `item-${Date.now()}`;
    const created: CatalogItem = { ...newItem, id };
    setCatalogItems(prev => [created, ...prev]);
    showToast(`"${newItem.name}" añadido exitosamente al catálogo`, 'success');
  };

  const updateCatalogItem = (id: string, updates: Partial<CatalogItem>) => {
    setCatalogItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
    setCart(prev =>
      prev.map(cartItem => {
        if (cartItem.item.id === id) {
          return {
            ...cartItem,
            item: { ...cartItem.item, ...updates }
          };
        }
        return cartItem;
      })
    );
    showToast('Elemento del catálogo actualizado', 'success');
  };

  const deleteCatalogItem = (id: string) => {
    const target = catalogItems.find(i => i.id === id);
    setCatalogItems(prev => prev.filter(item => item.id !== id));
    setCart(prev => prev.filter(c => c.item.id !== id));
    showToast(`"${target?.name || 'Elemento'}" eliminado del catálogo`, 'info');
  };

  const resetDefaultCatalog = () => {
    setCatalogItems(INITIAL_CATALOG_ITEMS);
    showToast('Catálogo restablecido con servicios, fotos y combos oficiales', 'info');
  };

  // Cart operations
  const addToCart = (item: CatalogItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`+1 "${item.name}" añadido a la orden`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.item.id !== itemId));
    showToast('Elemento removido de la orden', 'info');
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(ci => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCOP = cart.reduce(
    (sum, ci) => sum + ci.item.priceCOP * ci.quantity,
    0
  );

  const cartTotalDurationMin = cart.reduce((sum, ci) => {
    if (ci.item.durationMin) {
      return sum + ci.item.durationMin * ci.quantity;
    }
    return sum;
  }, 0);

  // Orders
  const createOrder = (payload: {
    clientName: string;
    vehiclePlate: string;
    clientPhone?: string;
    vehicleType: 'Moto' | 'Auto' | 'Especial';
    notes?: string;
    technicianName?: string;
  }): ServiceOrder | null => {
    if (cart.length === 0) {
      showToast('El carrito está vacío. Agrega al menos un servicio o producto.', 'error');
      return null;
    }

    const orderCount = orders.length + 101;
    const newOrder: ServiceOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `JHO-${orderCount}`,
      clientName: payload.clientName.trim(),
      clientPhone: payload.clientPhone?.trim() || 'No registrado',
      vehiclePlate: payload.vehiclePlate.trim().toUpperCase(),
      vehicleType: payload.vehicleType,
      items: [...cart],
      totalCOP: cartTotalCOP,
      totalDurationMin: cartTotalDurationMin,
      status: 'En Espera',
      createdAt: new Date().toISOString(),
      technicianName: payload.technicianName || 'Por Asignar',
      notes: payload.notes?.trim() || ''
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setReceiptOrder(newOrder);
    showToast(`¡Orden #${newOrder.orderNumber} creada con éxito! Turno asignado a lista de espera.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const now = new Date().toISOString();
          let startedAt = ord.startedAt;
          let completedAt = ord.completedAt;
          if (newStatus === 'En Proceso' && !startedAt) {
            startedAt = now;
          }
          if (newStatus === 'Finalizado' && !completedAt) {
            completedAt = now;
          }
          return {
            ...ord,
            status: newStatus,
            startedAt,
            completedAt
          };
        }
        return ord;
      })
    );
    showToast(`Estado de la orden actualizado a: "${newStatus}"`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
    showToast('Orden eliminada del sistema', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAsAdmin,
        logoutAdmin,
        setUserRole,
        toggleRole,
        isAdmin: currentUser.role === 'admin' && !!currentUser.isAuthenticatedAdmin,
        activeTab,
        setActiveTab,
        catalogItems,
        addCatalogItem,
        updateCatalogItem,
        deleteCatalogItem,
        resetDefaultCatalog,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCOP,
        cartTotalDurationMin,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        loyalCustomers,
        assignRewardToCustomer,
        redeemPoints,
        receiptOrder,
        setReceiptOrder,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
