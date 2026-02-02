import React, { useState } from 'react';
import { LogoBatch, LogoConfig } from '../types';

interface LogoDisplayProps {
  batch: LogoBatch | null;
  isLoading: boolean;
  onGenerateMore?: (config: LogoConfig) => void;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ batch, isLoading, onGenerateMore }) => {
  const [selectedImage, setSelectedImage] = useState<{ url: string, label: string } | null>(null);

  if (isLoading) {
    return (
      <div className="w-full space-y-10 animate-in fade-in duration-500">
        <div className="flex items-center justify-between px-6 border-l-2 border-orange-600 pl-8">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Designing Logos</h3>
            <p className="text-[10px] font-mono text-orange-500 animate-pulse uppercase mt-2 tracking-widest">Status: Creating optimized brand variations...</p>
          </div>
          <div className="hidden sm:flex gap-1.5">
            {[1, 2].map(i => <div key={i} className="w-1.5 h-12 bg-slate-900 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="hud-border rounded-[40px] p-10 h-[500px] relative overflow-hidden flex flex-col justify-center items-center">
              <div className="scanline"></div>
              <div className="w-32 h-32 border-2 border-dashed border-white/5 rounded-full animate-spin [animation-duration:15s] flex items-center justify-center opacity-30">
                <div className="w-20 h-20 border-2 border-orange-500/20 rounded-full"></div>
              </div>
              <div className="mt-16 w-full max-w-[240px] h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 animate-[pulse_2s_infinite]"></div>
              </div>
              <p className="mt-6 font-mono text-[9px] text-slate-700 tracking-[0.4em] uppercase">Option 0{i+1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="w-full min-h-[650px] hud-border rounded-[60px] flex flex-col items-center justify-center p-16 text-center group transition-all duration-700">
        <div className="relative mb-14">
          <div className="absolute -inset-10 bg-orange-600/5 blur-[80px] rounded-full group-hover:bg-orange-500/15 transition-all duration-1000"></div>
          <div className="w-36 h-36 hud-border rounded-[48px] flex items-center justify-center text-slate-800 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-700">
             <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
        </div>
        <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Ready to Start</h3>
        <p className="max-w-md mt-6 text-slate-600 font-mono text-xs leading-loose tracking-[0.1em] uppercase opacity-80">
          Enter your brand details on the left to start designing your new logo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-4 text-orange-500 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-6">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_#ff6600]"></span>
            Logo Options
          </div>
          <h2 className="text-6xl font-black text-white font-heading tracking-tighter uppercase leading-none">{batch.config.brandName}</h2>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-slate-500 uppercase tracking-widest">Style: {batch.config.style}</div>
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-slate-500 uppercase tracking-widest">Res: {batch.config.imageSize}</div>
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-slate-500 uppercase tracking-widest">Shape: {batch.config.aspectRatio}</div>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="hud-border px-8 py-4 rounded-2xl text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 bg-orange-600/5 hover:bg-orange-600/15 transition-all active:scale-95 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform"><path d="M12 2v20"/><path d="m19 15-7 7-7-7"/></svg>
            Download All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {batch.pairs.map((pair, idx) => (
          <div key={idx} className="flex flex-col gap-8 group">
            <div className="relative hud-border rounded-[48px] overflow-hidden group-hover:border-orange-500/40 transition-all duration-700">
              <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                 <span className="bg-black/80 backdrop-blur-2xl px-4 py-1.5 rounded-xl border border-white/10 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Option 0{idx + 1}</span>
              </div>
              
              <div className="grid grid-rows-[1fr_auto] h-full">
                <div className={`w-full aspect-square bg-white flex items-center justify-center cursor-zoom-in group/main relative overflow-hidden`}
                     onClick={() => setSelectedImage({ url: pair.full, label: `Option 0${idx+1} - Full Logo` })}>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover/main:opacity-[0.03] transition-opacity duration-500 pointer-events-none"></div>
                  <img src={pair.full} alt={`Concept ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2s] group-hover/main:scale-110" />
                  
                  <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-slate-300 opacity-0 group-hover/main:opacity-40 transition-all"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-slate-300 opacity-0 group-hover/main:opacity-40 transition-all"></div>
                </div>

                <div className="p-8 bg-black/60 border-t border-white/5 flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                    <div>
                      <p className="text-white font-black text-xs uppercase tracking-widest leading-none">Ready for Use</p>
                      <p className="text-slate-600 font-mono text-[9px] mt-2 uppercase">Brand Identity Concept</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button className="px-6 py-3 bg-white/5 hover:bg-orange-600/20 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/5 flex items-center gap-3 active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Get Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {onGenerateMore && (
        <div className="flex justify-center pt-16 pb-20">
          <button 
            onClick={() => onGenerateMore(batch.config)}
            className="group relative flex items-center gap-8 px-16 py-8 hud-border rounded-full text-white font-black text-xs uppercase tracking-[0.5em] transition-all hover:bg-white/5 hover:border-orange-500/50 hover:shadow-[0_0_60px_rgba(255,102,0,0.25)] active:scale-95"
          >
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
            Try More Ideas
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500" 
             onClick={() => setSelectedImage(null)}>
          <div className="absolute top-10 right-10 cursor-pointer text-slate-500 hover:text-white transition-all hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </div>
          <div className="max-w-4xl w-full aspect-square bg-white rounded-[70px] shadow-[0_0_120px_rgba(255,102,0,0.15)] p-20 sm:p-28 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} className="w-full h-full object-contain mix-blend-multiply" alt="Preview" />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-10 bg-black/90 backdrop-blur-2xl px-12 py-6 rounded-[32px] border border-white/10 shadow-3xl">
              <div className="text-left border-r border-white/10 pr-10">
                <p className="text-white font-black tracking-tighter text-3xl uppercase">{batch.config.brandName}</p>
                <p className="text-orange-500 text-[10px] font-mono uppercase tracking-[0.4em] mt-2">{selectedImage.label}</p>
              </div>
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95">Download PNG</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoDisplay;