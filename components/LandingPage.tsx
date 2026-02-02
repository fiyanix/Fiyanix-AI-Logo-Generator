import React, { useState } from 'react';

const FiyanixLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="35" width="25" height="5" fill="#FF6600" />
    <path d="M36 30H92L80 44H36V54H82L70 68H36V88L50 88V72H53L43 88H36V30Z" fill="#FF6600" />
  </svg>
);

interface LandingPageProps {
  onStart: (brandName: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, onSignUp }) => {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <FiyanixLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="font-black text-xl tracking-tighter leading-none uppercase">Fiyanix</div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">AI Logo Generator</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={onLogin} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</button>
            <button 
              onClick={onSignUp}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded font-black text-xs uppercase tracking-widest transition-all"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-52 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.85] mb-8">
            <span className="block mb-2">CREATE STUNNING</span>
            <span className="text-orange-600">AI LOGOS</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl font-normal mb-16 leading-relaxed">
            Generate professional, unique logos in seconds with the power of AI. No design experience needed. Perfect for startups, brands, and entrepreneurs.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-0 bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden focus-within:border-orange-500/50 transition-colors">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Brand Name..."
              className="flex-1 bg-transparent px-8 py-6 text-white font-bold text-lg focus:outline-none placeholder:text-slate-700"
              onKeyDown={(e) => e.key === 'Enter' && onStart(name)}
            />
            <button 
              onClick={() => onStart(name)}
              className="px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-widest transition-all"
            >
              Generate
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">
              Why Choose <span className="text-orange-600">Fiyanix</span>
            </h2>
            <p className="text-slate-500 text-lg">Professional logo design made simple and affordable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "AI-Powered Design", 
                desc: "Advanced AI creates unique, professional logos tailored to your brand",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/></svg>
              },
              { 
                title: "Instant Generation", 
                desc: "Get 2 logo variations in minutes, no design skills required",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              },
              { 
                title: "Full Customization", 
                desc: "Choose colors, styles, and typography to match your vision",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              },
              { 
                title: "Multiple Formats", 
                desc: "Download in PNG, JPEG, and SVG formats for any use case",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              },
              { 
                title: "Original Designs", 
                desc: "Every logo is unique and created specifically for your brand",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              },
              { 
                title: "Use Your Own API Key", 
                desc: "Have a Gemini API key? Generate unlimited logos for free without buying coins",
                icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
              }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-[#0A0A0A] border border-white/5 rounded hover:border-orange-500/20 transition-all group">
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black uppercase tracking-tighter">
              How It <span className="text-orange-600">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 hidden md:block"></div>
            {[
              { 
                num: "1", 
                title: "Describe Your Brand", 
                desc: "Enter your brand name, industry, style preferences, and color choices" 
              },
              { 
                num: "2", 
                title: "AI Generates Logos", 
                desc: "Our AI creates 2 unique logo variations tailored to your specifications" 
              },
              { 
                num: "3", 
                title: "Download & Use", 
                desc: "Download your logos in PNG, JPEG, or SVG format and start using immediately" 
              }
            ].map((s, i) => (
              <div key={i} className="text-center relative z-10">
                <div className="w-16 h-16 bg-orange-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-10 rounded">
                  {s.num}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{s.title}</h3>
                <p className="text-slate-500 text-base max-w-xs mx-auto leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
              <FiyanixLogo className="w-5 h-5" />
            </div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Fiyanix Labs</span>
          </div>
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">© 2024 AI Brand Lab — Optimized for Gemini 2.5 Flash</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;