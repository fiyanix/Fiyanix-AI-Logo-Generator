import React, { useState } from 'react';
import { authService } from '../services/authService';
import { AuthUser } from '../types';

interface AuthOverlayProps {
  onAuthSuccess: (user: AuthUser) => void;
  onClose: () => void;
  initialIsLogin?: boolean;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ onAuthSuccess, onClose, initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = isLogin 
        ? await authService.login(email, password)
        : await authService.register(email, password);
      onAuthSuccess(user);
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
      <div className="max-w-md w-full hud-border p-10 rounded-[40px] border border-orange-500/20 shadow-2xl relative overflow-hidden bg-black animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-400 text-sm mt-2 font-mono uppercase tracking-widest text-[10px]">Access your professional design suite.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all font-mono text-sm"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-mono uppercase tracking-widest animate-pulse">
              {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-orange-600/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (isLogin ? 'Sign In' : 'Join Now')}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-900 text-center space-y-6">
          <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">
            {isLogin ? "New to Fiyanix?" : "Already a member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-400 font-black hover:text-orange-300 transition-colors uppercase"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>

          <button 
            onClick={onClose}
            className="flex items-center gap-2 mx-auto text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.3em] transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;