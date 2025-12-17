
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it';

interface Translations {
  [key: string]: string;
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.assistant': 'Assistant',
    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'home.hero.title': 'Nature, delivered.',
    'home.hero.subtitle': 'Premium herbal remedies, curated and delivered within minutes.',
    'home.search.placeholder': 'Search herbs, teas, remedies...',
    'home.how.title': 'How it works',
    'home.how.step1.title': 'Select',
    'home.how.step1.desc': 'Choose your specific wellness need.',
    'home.how.step2.title': 'Curated',
    'home.how.step2.desc': 'Expertly vetted natural remedies.',
    'home.how.step3.title': 'Delivered',
    'home.how.step3.desc': 'At your door in 30-40 minutes.',
    'home.ai.title': 'Unsure what you need?',
    'home.ai.desc': 'Describe your symptoms to Herbéra AI. Our assistant will guide you.',
    'home.ai.button': 'Consult Assistant',
    'home.catalog.title': 'Explore Catalog',
    'home.promise.title': 'Our Promise',
    'cat.all': 'All',
    'cat.tea': 'Herbal Teas',
    'cat.supplements': 'Supplements',
    'cat.cosmetics': 'Cosmetics',
    'cat.food': 'Super Foods',
    'profile.wishlist': 'Wishlist',
    'profile.orders': 'Orders',
    'profile.account': 'Account',
    'profile.addresses': 'Saved Addresses',
    'profile.payments': 'Payment Methods',
    'profile.settings': 'Settings',
    'profile.logout': 'Log Out',
    'cart.title': 'Shopping Bag',
    'cart.empty': 'Your Bag is Empty',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'product.add': 'Add to Bag',
    'product.details': 'Details',
    'product.botanicals': 'Botanicals',
    'product.organic': 'Certified Organic'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.search': 'Buscar',
    'nav.assistant': 'Asistente',
    'nav.wishlist': 'Favoritos',
    'nav.cart': 'Cesta',
    'nav.account': 'Cuenta',
    'home.hero.title': 'Naturaleza, entregada.',
    'home.hero.subtitle': 'Remedios herbales premium, curados y entregados en minutos.',
    'home.search.placeholder': 'Buscar hierbas, tés, remedios...',
    'home.how.title': 'Cómo funciona',
    'home.how.step1.title': 'Seleccionar',
    'home.how.step1.desc': 'Elige tu necesidad específica de bienestar.',
    'home.how.step2.title': 'Curado',
    'home.how.step2.desc': 'Remedios naturales examinados por expertos.',
    'home.how.step3.title': 'Entregado',
    'home.how.step3.desc': 'En tu puerta en 30-40 minutos.',
    'home.ai.title': '¿No estás seguro?',
    'home.ai.desc': 'Describe tus síntomas a Herbéra AI. Nuestro asistente te guiará.',
    'home.ai.button': 'Consultar Asistente',
    'home.catalog.title': 'Explorar Catálogo',
    'home.promise.title': 'Nuestra Promesa',
    'cat.all': 'Todo',
    'cat.tea': 'Tés Herbales',
    'cat.supplements': 'Suplementos',
    'cat.cosmetics': 'Cosmética',
    'cat.food': 'Superalimentos',
    'profile.wishlist': 'Favoritos',
    'profile.orders': 'Pedidos',
    'profile.account': 'Cuenta',
    'profile.addresses': 'Direcciones Guardadas',
    'profile.payments': 'Métodos de Pago',
    'profile.settings': 'Ajustes',
    'profile.logout': 'Cerrar Sesión',
    'cart.title': 'Bolsa de la Compra',
    'cart.empty': 'Tu bolsa está vacía',
    'cart.summary': 'Resumen del Pedido',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Envío',
    'cart.total': 'Total',
    'cart.checkout': 'Tramitar Pedido',
    'product.add': 'Añadir a la Bolsa',
    'product.details': 'Detalles',
    'product.botanicals': 'Botánicos',
    'product.organic': 'Orgánico Certificado'
  },
  fr: { 'nav.home': 'Accueil', 'nav.search': 'Recherche', 'nav.assistant': 'Assistant' },
  de: { 'nav.home': 'Startseite', 'nav.search': 'Suche', 'nav.assistant': 'Assistent' },
  it: { 'nav.home': 'Home', 'nav.search': 'Cerca', 'nav.assistant': 'Assistente' }
};

interface I18nContextType {
  language: LanguageCode;
  changeLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('herbera_lang') as LanguageCode) || 'en';
  });

  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code);
    localStorage.setItem('herbera_lang', code);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
};
