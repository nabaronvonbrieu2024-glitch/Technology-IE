import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      if (isLogin) {
        await login(email, password);
        // Strictly redirect to Home page as requested
        navigate('/', { replace: true });
      } else {
        await signUp(email, password, name);
        setIsLogin(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 relative flex flex-col font-sans overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615486511484-92e030802dac?q=80&w=2574&auto=format&fit=crop" 
          alt="Natural Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-stone-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-8 pt-24 pb-8 max-w-md mx-auto w-full justify-between">
        
        {/* Header Section */}
        <div>
           <div className="w-16 h-16 bg-[#0F2A1D] border border-green-900/50 rounded-2xl flex items-center justify-center text-green-100 mb-8 shadow-2xl shadow-green-900/20">
              {/* Herbéra Radiant Star Logo */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C14.5 7.5 16.5 9.5 22 12C16.5 14.5 14.5 16.5 12 22C9.5 16.5 7.5 14.5 2 12C7.5 9.5 9.5 7.5 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" className="opacity-90"/>
              </svg>
           </div>
           
           <h1 className="text-4xl font-serif font-bold text-stone-50 leading-tight mb-3">
             {isLogin ? 'Welcome back.' : 'Create account.'}
           </h1>
           <p className="text-stone-400 text-base leading-relaxed">
             {isLogin 
               ? 'Enter your credentials to access your Herbéra personal wellness space.' 
               : 'Join Herbéra to discover curated natural remedies.'}
           </p>
        </div>

        {/* Form Section */}
        <div className="mt-12 mb-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="group space-y-1.5">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required={!isLogin}
                    className="w-full bg-stone-900/50 border border-stone-800 text-stone-100 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-[#C6A75E] focus:bg-stone-900 transition-all placeholder:text-stone-700"
                  />
                  <UserIcon size={20} className="absolute left-4 top-4 text-stone-600 group-focus-within:text-[#C6A75E] transition-colors" />
                </div>
              </div>
            )}

            <div className="group space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-stone-900/50 border border-stone-800 text-stone-100 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-[#C6A75E] focus:bg-stone-900 transition-all placeholder:text-stone-700"
                />
                <Mail size={20} className="absolute left-4 top-4 text-stone-600 group-focus-within:text-[#C6A75E] transition-colors" />
              </div>
            </div>

            <div className="group space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-stone-900/50 border border-stone-800 text-stone-100 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-[#C6A75E] focus:bg-stone-900 transition-all placeholder:text-stone-700"
                />
                <Lock size={20} className="absolute left-4 top-4 text-stone-600 group-focus-within:text-[#C6A75E] transition-colors" />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-stone-100 text-stone-950 h-14 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-[0.98] mt-4 shadow-lg shadow-white/5"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin text-stone-900" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Toggle */}
        <div className="mt-8 text-center pb-6">
          <p className="text-stone-500 text-sm">
            {isLogin ? "New to Herbéra?" : "Already a member?"}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-stone-200 font-medium hover:text-white transition-colors mt-2 text-sm border-b border-stone-700 pb-0.5 hover:border-white"
          >
            {isLogin ? 'Create an account' : 'Sign in to your account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;