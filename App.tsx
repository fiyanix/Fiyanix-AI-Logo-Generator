import React, { useState, useEffect } from 'react';
import { AppState, LogoConfig, LogoBatch, LogoPair, AuthUser } from './types';
import LogoForm from './components/LogoForm';
import LogoDisplay from './components/LogoDisplay';
import HistoryGallery from './components/HistoryGallery';
import AuthOverlay from './components/AuthOverlay';
import UserMenu from './components/UserMenu';
import LandingPage from './components/LandingPage';
import { generateLogoImage } from './services/geminiService';
import { authService } from './services/authService';

const FiyanixLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="7" fill="none" />
    <g fill="#FF6600">
      {/* Speed blocks on the left */}
      <rect x="10" y="35" width="25" height="5" />
      <rect x="25" y="42" width="10" height="2" />
      <rect x="2" y="52" width="10" height="5" />
      <rect x="25" y="52" width="15" height="5" />
      <rect x="15" y="62" width="28" height="5" />
      {/* The main stylized 'F' */}
      <path d="M36 30H92L80 44H36V54H82L70 68H36V88L50 88V72H53L43 88H36V30Z" />
    </g>
  </svg>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    user: authService.getCurrentUser(),
    isLoading: false,
    history: [],
    error: null,
  });

  const [currentBatch, setCurrentBatch] = useState<LogoBatch | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authIsLogin, setAuthIsLogin] = useState(true);
  const [view, setView] = useState<'landing' | 'generator'>('landing');
  const [initialBrandName, setInitialBrandName] = useState('');

  const handleLogout = () => {
    authService.logout();
    setState(prev => ({ ...prev, user: null }));
    setCurrentBatch(null);
    setView('landing');
  };

  const handleVerify = async () => {
    if (state.user) {
      const updated = await authService.verifyEmail(state.user);
      setState(prev => ({ ...prev, user: updated }));
    }
  };

  const handleGenerate = async (config: LogoConfig) => {
    if (!state.user) {
      triggerAuth(true);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const variations = [1, 2];
      const pairPromises = variations.map(async (vIdx) => {
        const full = await generateLogoImage(config, vIdx, 'full');
        return { full } as LogoPair;
      });
      
      const pairs = await Promise.all(pairPromises);
      
      const newBatch: LogoBatch = {
        id: crypto.randomUUID(),
        pairs,
        config,
        timestamp: Date.now(),
      };

      setCurrentBatch(newBatch);
      setState(prev => ({
        ...prev,
        isLoading: false,
        history: [newBatch, ...prev.history],
      }));
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong. Please check your connection.";
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  };

  const resetView = () => {
    setCurrentBatch(null);
    setState(prev => ({ ...prev, error: null }));
    setView('landing');
  };

  const handleStart = (name: string) => {
    if (state.user) {
      setInitialBrandName(name);
      setView('generator');
    } else {
      setInitialBrandName(name);
      triggerAuth(true);
    }
  };

  const handleSignUpClick = () => {
    if (state.user) {
      setView('generator');
    } else {
      triggerAuth(false);
    }
  };

  const handleLoginClick = () => {
    if (state.user) {
      setView('generator');
    } else {
      triggerAuth(true);
    }
  };

  const triggerAuth = (isLogin: boolean) => {
    setAuthIsLogin(isLogin);
    setShowAuth(true);
  };

  const onAuthSuccess = (user: AuthUser) => {
    setState(prev => ({ ...prev, user }));
    setShowAuth(false);
    setView('generator');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500/30">
      {view === 'generator' && (
        <header className="fixed top-4 left-4 right-4 z-[60]">
          <div className="max-w-[1600px] mx-auto hud-border rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={resetView}>
              <div className="relative">
                <div className="absolute -inset-1 bg-orange-600 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-black w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 transition-all">
                  <FiyanixLogo className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter uppercase leading-none">Fiyanix <span className="text-orange-500">Logo Gen</span></h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System: Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                <button onClick={() => setView('landing')} className="transition-colors hover:text-orange-500">Home</button>
                <button onClick={() => setView('generator')} className="text-orange-500 transition-colors">Lab</button>
              </nav>

              <div className="flex items-center gap-4">
                {state.user ? (
                  <UserMenu user={state.user} onLogout={handleLogout} onVerify={handleVerify} />
                ) : (
                  <button 
                    onClick={() => triggerAuth(true)}
                    className="px-6 py-2 bg-orange-600/10 border border-orange-500/20 hover:border-orange-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-orange-500 transition-all"
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {view === 'landing' ? (
        <LandingPage 
          user={state.user}
          onStart={handleStart} 
          onLogin={handleLoginClick} 
          onSignUp={handleSignUpClick}
          onLogout={handleLogout}
        />
      ) : (
        <main className="flex-1 max-w-[1700px] mx-auto w-full px-4 pt-32 pb-12 grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="xl:col-span-3">
            <div className="sticky top-32 space-y-6">
              <button 
                onClick={resetView}
                className="group w-full flex items-center gap-4 px-6 py-4 hud-border border-white/5 rounded-2xl hover:border-orange-500/40 hover:bg-orange-500/5 transition-all mb-4"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
                </div>
                <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-[0.3em] transition-all">Exit Brand Lab</span>
              </button>

              <div className="hud-border rounded-3xl p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                  <FiyanixLogo className="w-24 h-24 rotate-[20deg]" />
                </div>
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#ff6600]"></span>
                  Lab Console
                </h2>
                <LogoForm 
                  onGenerate={handleGenerate} 
                  isLoading={state.isLoading} 
                  user={state.user}
                  initialBrandName={initialBrandName}
                />
              </div>
            </div>
          </div>

          <div className="xl:col-span-9 space-y-10">
            {state.error && (
              <div className="hud-border border-red-500/30 rounded-2xl p-4 bg-red-500/5 text-red-500 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-3 animate-pulse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Error: {state.error}
              </div>
            )}

            <LogoDisplay 
              batch={currentBatch} 
              isLoading={state.isLoading} 
              onGenerateMore={handleGenerate}
            />
            
            {state.history.length > 1 && (
              <HistoryGallery history={state.history} onSelect={setCurrentBatch} currentId={currentBatch?.id} />
            )}
          </div>
        </main>
      )}

      {showAuth && (
        <AuthOverlay 
          initialIsLogin={authIsLogin}
          onAuthSuccess={onAuthSuccess} 
          onClose={() => setShowAuth(false)} 
        />
      )}
    </div>
  );
};

export default App;