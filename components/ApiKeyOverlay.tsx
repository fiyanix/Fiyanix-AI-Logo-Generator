
import React from 'react';

interface ApiKeyOverlayProps {
  onSelectKey: () => void;
}

const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onSelectKey }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
      <div className="max-w-md w-full hud-border p-12 rounded-[50px] text-center shadow-[0_0_80px_rgba(255,102,0,0.15)] relative overflow-hidden">
        <div className="scanline"></div>
        <div className="w-24 h-24 bg-gradient-to-br from-orange-700 to-orange-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Setup Required</h2>
        <p className="text-slate-500 mb-10 leading-relaxed font-mono text-[11px] uppercase tracking-widest">
          Please connect a <span className="text-orange-500 font-bold">Paid API Key</span> to start designing logos.
        </p>
        
        <div className="space-y-6">
          <button 
            onClick={onSelectKey}
            className="w-full py-5 cyber-button bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.4em] shadow-3xl transition-all"
          >
            Select API Key
          </button>
          
          <div className="bg-white/5 rounded-2xl p-5 text-[9px] text-slate-500 text-left border border-white/5 space-y-3 font-mono uppercase tracking-widest">
            <p className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>You need a paid Google Cloud project key.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>Free keys don't work for high-end logos.</span>
            </p>
          </div>

          <div className="pt-4">
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              className="text-orange-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-all"
            >
              Learn about billing
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyOverlay;
