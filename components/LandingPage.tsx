import React, { useState } from 'react';

const FiyanixLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="35" width="25" height="5" fill="#FF6600" />
    <path d="M36 30H92L80 44H36V54H82L70 68H36V88L50 88V72H53L43 88H36V30Z" fill="#FF6600" />
  </svg>
);

interface LandingPageProps {
  onStart: (brandName: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Next-Gen Brand Identity
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Your Brand, <br />
            <span className="text-orange-500">Accelerated.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-lg font-mono uppercase tracking-[0.2em] mb-16 opacity-70 animate-in fade-in duration-1000 delay-300">
            Generate professional minimalist logos in seconds using the world's most advanced AI vision models.
          </p>

          <div className="max-w-xl mx-auto relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-black border border-white/10 rounded-3xl">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Brand Name..."
                className="flex-1 bg-transparent px-8 py-5 text-white font-black text-lg focus:outline-none placeholder:text-slate-800 uppercase tracking-widest"
                onKeyDown={(e) => e.key === 'Enter' && onStart(name)}
              />
              <button 
                onClick={() => onStart(name)}
                className="px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl transition-all active:scale-[0.98]"
              >
                Start Designing
              </button>
            </div>
          </div>
        </div>

        {/* Floating Visual Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full border border-orange-500/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border border-orange-500/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 border-t border-white/5 relative bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pro Vision 3.0", desc: "Utilizes advanced geometric reasoning to ensure perfect symmetry and minimalist balance.", icon: "01" },
              { title: "Multi-Format", desc: "Generate wide, square, or vertical layouts tailored for web, social, and print.", icon: "02" },
              { title: "Cost Optimized", desc: "Leverage Flash-Image processing for lightning fast results with minimal API footprint.", icon: "03" }
            ].map((f, i) => (
              <div key={i} className="hud-border p-10 rounded-[40px] group hover:border-orange-500/30 transition-all duration-500">
                <span className="block text-[10px] font-mono text-orange-500 mb-6 tracking-[0.5em]">{f.icon}</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{f.title}</h3>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest leading-loose">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Crafted by Intelligence</h2>
          <p className="text-slate-600 mt-4 font-mono text-xs uppercase tracking-[0.3em]">Sample outputs generated in under 10 seconds</p>
        </div>

        <div className="flex gap-8 animate-[scroll_50s_linear_infinite] w-max hover:[animation-play-state:paused]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="w-64 h-64 bg-white rounded-[40px] flex items-center justify-center p-8 group transition-transform duration-500 hover:scale-105">
               <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                   <FiyanixLogo className="w-32 h-32" />
                 </div>
                 <div className="text-slate-800 font-black text-2xl uppercase tracking-tighter opacity-40">Concept {i}</div>
               </div>
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i + 'dup'} className="w-64 h-64 bg-white rounded-[40px] flex items-center justify-center p-8 group transition-transform duration-500 hover:scale-105">
               <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                   <FiyanixLogo className="w-32 h-32" />
                 </div>
                 <div className="text-slate-800 font-black text-2xl uppercase tracking-tighter opacity-40">Concept {i}</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <FiyanixLogo className="w-8 h-8" />
            <span className="text-white font-black uppercase tracking-widest text-sm">Fiyanix Labs</span>
          </div>
          <p className="text-slate-600 text-[9px] font-mono uppercase tracking-[0.4em]">© 2024 AI Brand Lab — Optimized for Gemini 2.5 Flash</p>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;