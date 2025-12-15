import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import WellnessAI from './pages/WellnessAI';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="wellness-ai" element={<WellnessAI />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;