
import React from 'react';
import { LogoBatch } from '../types';

interface HistoryGalleryProps {
  history: LogoBatch[];
  onSelect: (batch: LogoBatch) => void;
  currentId?: string;
}

const HistoryGallery: React.FC<HistoryGalleryProps> = ({ history, onSelect, currentId }) => {
  return (
    <section className="mt-20 border-t border-white/5 pt-20 pb-10">
      <div className="flex items-center justify-between mb-12 px-8">
        <div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-6">
            <span className="w-10 h-10 hud-border rounded-xl flex items-center justify-center text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
            </span>
            Saved Logos
          </h3>
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] mt-3">Total Projects: {history.length}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 px-6">
        {history.map((batch) => (
          <button
            key={batch.id}
            onClick={() => onSelect(batch)}
            className={`flex flex-col gap-5 p-5 rounded-[40px] border-2 transition-all duration-700 group relative ${
              currentId === batch.id 
                ? 'border-orange-500/60 bg-orange-600/5 shadow-[0_0_50px_rgba(255,102,0,0.2)]' 
                : 'border-white/5 bg-black hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <div className="aspect-square bg-white rounded-3xl overflow-hidden p-5 flex items-center justify-center relative transition-all duration-700 group-hover:scale-[1.03]">
               <img 
                src={batch.pairs[0].full} 
                alt={batch.config.brandName} 
                className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/90 border border-white/10 rounded-lg text-[9px] font-black text-orange-500 uppercase">
                {batch.pairs.length}
              </div>
            </div>
            <div className="px-2 text-left">
              <p className="text-[11px] font-black text-white truncate uppercase tracking-widest">{batch.config.brandName}</p>
              <p className="text-[9px] text-slate-600 font-mono uppercase mt-2 tracking-tighter">{new Date(batch.timestamp).toLocaleDateString()}</p>
            </div>
            {currentId === batch.id && (
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_15px_#ff6600]"></div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HistoryGallery;
