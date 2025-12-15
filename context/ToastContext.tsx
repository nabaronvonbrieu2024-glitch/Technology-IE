import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg shadow-black/5 backdrop-blur-md animate-[slideIn_0.3s_ease-out] border ${
              toast.type === 'success' 
                ? 'bg-white/95 text-stone-800 border-green-100' 
                : 'bg-stone-800/95 text-white border-stone-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <Info size={20} className="text-stone-400" />
            )}
            <p className="flex-1 text-sm font-medium leading-tight">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};