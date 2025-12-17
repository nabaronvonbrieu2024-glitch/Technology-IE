
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import WellnessAI from './pages/WellnessAI';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <I18nProvider>
          <ProductProvider>
            <WishlistProvider>
              <CartProvider>
                <HashRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Home />} />
                      <Route path="catalog" element={<Catalog />} />
                      <Route path="product/:id" element={<ProductDetail />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="profile/addresses" element={<Addresses />} />
                      <Route path="profile/payments" element={<Payments />} />
                      <Route path="profile/settings" element={<Settings />} />
                      <Route path="wellness-ai" element={<WellnessAI />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                  </Routes>
                </HashRouter>
              </CartProvider>
            </WishlistProvider>
          </ProductProvider>
        </I18nProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
