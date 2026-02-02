import React, { useState } from 'react';
import { AuthUser } from '../types';

interface UserMenuProps {
  user: AuthUser;
  onLogout: () => void;
  onVerify: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onVerify }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 bg-black border border-white/5 rounded-2xl hover:bg-slate-950 transition-all group"
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-orange-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform uppercase">
          {user.email[0]}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-black text-white tracking-tight uppercase truncate max-w-[120px]">{user.displayName || 'Designer'}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${user.emailVerified ? 'bg-orange-500' : 'bg-slate-700'}`}></span>
            <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{user.role}</p>
          </div>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-4 w-64 hud-border border border-white/10 rounded-3xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 bg-black">
            <div className="px-3 py-2 border-b border-white/5 mb-3">
              <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Profile</p>
              <p className="text-xs font-bold text-white truncate font-mono">{user.email}</p>
            </div>
            
            <div className="space-y-1">
              {!user.emailVerified && (
                <button 
                  onClick={() => { onVerify(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-500/10 text-orange-400 text-xs font-black uppercase tracking-widest transition-colors text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Verify Now
                </button>
              )}
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors text-left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;