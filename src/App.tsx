import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Board1AdminCRM } from './components/Board1AdminCRM';
import { Board2POSQueue } from './components/Board2POSQueue';
import { Board3Analytics } from './components/Board3Analytics';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { ReceiptModal } from './components/ReceiptModal';
import { TechDocsModal } from './components/TechDocsModal';
import { Footer } from './components/Footer';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

function MainContent() {
  const { activeTab, receiptOrder, setReceiptOrder, toast } = useApp();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-[#E5E8EC]">
      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold border ${
              toast.type === 'success'
                ? 'bg-[#0E2A1E] text-emerald-200 border-emerald-500/50 shadow-emerald-950/50'
                : toast.type === 'error'
                ? 'bg-[#331114] text-rose-200 border-rose-500/50 shadow-rose-950/50'
                : 'bg-[#101F38] text-cyan-200 border-[#00E5FF]/40 shadow-[#003399]/40'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#00E5FF]" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Branded Header & Top Navigation */}
      <Header onOpenRoleModal={() => setRoleModalOpen(true)} />

      {/* Main View Area with Active Board */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'pos_catalog' && <Board2POSQueue />}
        {activeTab === 'crm_admin' && <Board1AdminCRM onOpenRoleModal={() => setRoleModalOpen(true)} />}
        {activeTab === 'analytics' && <Board3Analytics />}
      </main>

      {/* Interactive Modals */}
      <RoleSwitcherModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      <ReceiptModal
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />

      <TechDocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenDocs={() => setDocsModalOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
