import React, { useState, useEffect } from 'react';
import { LogoConfig, ImageSize, AspectRatio, AuthUser } from '../types';

interface LogoFormProps {
  onGenerate: (config: LogoConfig) => void;
  isLoading: boolean;
  user: AuthUser | null;
  initialBrandName?: string;
}

const LogoForm: React.FC<LogoFormProps> = ({ onGenerate, isLoading, user, initialBrandName }) => {
  const [brandName, setBrandName] = useState(initialBrandName || '');
  const [brandDescription, setBrandDescription] = useState('');
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [style, setStyle] = useState('Flat & Minimal');
  const [primaryColor, setPrimaryColor] = useState('#FF5F00');
  const [secondaryColor, setSecondaryColor] = useState('#000000');

  useEffect(() => {
    if (initialBrandName) {
      setBrandName(initialBrandName);
    }
  }, [initialBrandName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      brandName,
      brandDescription: brandDescription.trim() || undefined,
      imageSize,
      aspectRatio,
      style,
      layout: 'side-by-side',
      primaryColor,
      secondaryColor
    });
  };

  const styles = ['Flat & Minimal', 'Corporate', 'Tech & Shapes', 'Line Art', 'Abstract'];
  const needsVerification = imageSize === '2K' && user && !user.emailVerified;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[9px] font-mono text-orange-500 uppercase tracking-[0.3em] ml-1">Brand Name</label>
        <input
          required
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter name"
          className="w-full bg-black border border-white/5 rounded-xl px-5 py-4 text-white placeholder:text-slate-800 focus:outline-none focus:border-orange-500/40 transition-all font-mono text-sm uppercase tracking-widest"
        />
      </div>

      {/* NEW COLOR PREFERENCES SECTION */}
      <div className="space-y-4 pt-2">
        <label className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Color Preferences</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-1">Primary Color</label>
            <div className="flex items-center bg-black border border-white/5 rounded-xl overflow-hidden focus-within:border-orange-500/40 transition-all">
              <div className="p-2 border-r border-white/5">
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer p-0 block [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-lg" 
                />
              </div>
              <input 
                type="text" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value.toUpperCase())}
                className="flex-1 bg-transparent px-4 py-3 text-white font-mono text-xs uppercase focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-1">Secondary Color</label>
            <div className="flex items-center bg-black border border-white/5 rounded-xl overflow-hidden focus-within:border-orange-500/40 transition-all">
              <div className="p-2 border-r border-white/5">
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer p-0 block [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-lg" 
                />
              </div>
              <input 
                type="text" 
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value.toUpperCase())}
                className="flex-1 bg-transparent px-4 py-3 text-white font-mono text-xs uppercase focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] ml-1">Design Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-black border border-white/5 rounded-xl px-4 py-3.5 text-slate-300 focus:outline-none focus:border-orange-500/40 transition-all text-xs font-mono uppercase"
          >
            {styles.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] ml-1">Size</label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as ImageSize)}
            className="w-full bg-black border border-white/5 rounded-xl px-3 py-3 text-slate-300 focus:outline-none focus:border-orange-500/40 transition-all text-[10px] font-mono uppercase"
          >
            <option value="1K">Standard</option>
            <option value="2K">High Definition</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] ml-1">Shape</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full bg-black border border-white/5 rounded-xl px-3 py-3 text-slate-300 focus:outline-none focus:border-orange-500/40 transition-all text-[10px] font-mono uppercase"
          >
            <option value="1:1">Square</option>
            <option value="16:9">Wide</option>
            <option value="4:3">Classic</option>
            <option value="9:16">Portrait</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] ml-1">Describe your brand</label>
        <textarea
          rows={3}
          value={brandDescription}
          onChange={(e) => setBrandDescription(e.target.value)}
          placeholder="What does your company do?"
          className="w-full bg-black border border-white/5 rounded-xl px-5 py-4 text-slate-300 placeholder:text-slate-800 focus:outline-none focus:border-orange-500/40 transition-all resize-none font-mono text-xs tracking-wider uppercase"
        />
      </div>

      <div className="pt-4">
        <button
          disabled={isLoading || !!needsVerification}
          type="submit"
          className={`w-full py-5 cyber-button font-black text-xs uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-4 transition-all ${
            isLoading || needsVerification
              ? 'bg-slate-900 text-slate-600 border border-white/5 opacity-50' 
              : 'bg-gradient-to-tr from-orange-700 to-orange-500 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              {user ? 'Process Identity' : 'Secure Access'}
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default LogoForm;