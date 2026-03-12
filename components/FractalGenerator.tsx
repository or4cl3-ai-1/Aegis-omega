
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Settings, 
  Save, 
  Trash2, 
  RefreshCw, 
  Download, 
  Maximize2, 
  ChevronRight,
  Sparkles,
  Zap,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FractalPreset } from '../types';

const DEFAULT_PRESETS: FractalPreset[] = [
  {
    id: 'default-mandelbrot',
    name: 'Standard Mandelbrot',
    type: 'mandelbrot',
    maxIterations: 100,
    colorScheme: 'neon',
    zoom: 1,
    offsetX: -0.5,
    offsetY: 0
  },
  {
    id: 'default-julia',
    name: 'Classic Julia',
    type: 'julia',
    maxIterations: 120,
    colorScheme: 'plasma',
    juliaC: { re: -0.7, im: 0.27015 },
    zoom: 1,
    offsetX: 0,
    offsetY: 0
  }
];

const FractalGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [presets, setPresets] = useState<FractalPreset[]>([]);
  const [currentPreset, setCurrentPreset] = useState<FractalPreset>(DEFAULT_PRESETS[0]);
  const [isRendering, setIsRendering] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Load presets from local storage
  useEffect(() => {
    const saved = localStorage.getItem('aegis-fractal-presets');
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        setPresets(DEFAULT_PRESETS);
      }
    } else {
      setPresets(DEFAULT_PRESETS);
    }
  }, []);

  const savePresets = (newPresets: FractalPreset[]) => {
    setPresets(newPresets);
    localStorage.setItem('aegis-fractal-presets', JSON.stringify(newPresets));
  };

  const handleSaveCurrent = () => {
    const name = prompt('Enter preset name:', currentPreset.name);
    if (!name) return;
    
    const newPreset = { ...currentPreset, id: Date.now().toString(), name };
    const updated = [...presets, newPreset];
    savePresets(updated);
    setCurrentPreset(newPreset);
  };

  const handleDeletePreset = (id: string) => {
    if (presets.length <= 1) return;
    const updated = presets.filter(p => p.id !== id);
    savePresets(updated);
    if (currentPreset.id === id) {
      setCurrentPreset(updated[0]);
    }
  };

  const getColor = (iteration: number, maxIterations: number, scheme: string) => {
    if (iteration === maxIterations) return [5, 5, 5];
    
    const t = iteration / maxIterations;
    
    switch (scheme) {
      case 'neon':
        return [
          Math.floor(168 * Math.pow(t, 0.5)),
          Math.floor(85 * Math.pow(t, 0.2)),
          Math.floor(247 * Math.pow(t, 0.2))
        ];
      case 'plasma':
        return [
          Math.floor(255 * (0.5 + 0.5 * Math.cos(6.28 * (t + 0.0)))),
          Math.floor(255 * (0.5 + 0.5 * Math.cos(6.28 * (t + 0.33)))),
          Math.floor(255 * (0.5 + 0.5 * Math.cos(6.28 * (t + 0.67))))
        ];
      case 'obsidian':
        const val = Math.floor(255 * t);
        return [val * 0.1, val * 0.05, val * 0.2];
      case 'electric':
        return [
          Math.floor(236 * Math.sin(t * 3)),
          Math.floor(72 * Math.sin(t * 5)),
          Math.floor(153 * Math.sin(t * 2))
        ];
      default:
        return [255, 255, 255];
    }
  };

  const renderFractal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);
    
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const { type, maxIterations, colorScheme, zoom, offsetX, offsetY, juliaC } = currentPreset;
    
    const scale = 2 / (zoom * Math.min(width, height));

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let zx = (x - width / 2) * scale + offsetX;
        let zy = (y - height / 2) * scale + offsetY;
        
        let cx = zx;
        let cy = zy;
        
        if (type === 'julia' && juliaC) {
          cx = juliaC.re;
          cy = juliaC.im;
        }

        let iteration = 0;
        while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
          const xtemp = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = xtemp;
          iteration++;
        }

        const [r, g, b] = getColor(iteration, maxIterations, colorScheme);
        const pix = (x + y * width) * 4;
        data[pix] = r;
        data[pix + 1] = g;
        data[pix + 2] = b;
        data[pix + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setIsRendering(false);
  }, [currentPreset]);

  useEffect(() => {
    const timer = setTimeout(renderFractal, 100);
    return () => clearTimeout(timer);
  }, [renderFractal]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-1">Substrate Visualization</h2>
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            Fractal Generator <Sparkles className="text-purple-400" size={24} />
          </h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-xl border transition-all ${showControls ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 text-gray-400'}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 min-h-0">
        {/* Canvas Area */}
        <div className="flex-1 glass-panel rounded-3xl overflow-hidden relative border-purple-500/10 group min-h-[300px]">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            className="w-full h-full object-cover cursor-crosshair"
          />
          
          <AnimatePresence>
            {isRendering && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw className="text-purple-400 animate-spin" size={48} />
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Synthesizing Manifold...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[9px] text-purple-400 font-black uppercase tracking-widest">
              {currentPreset.type.toUpperCase()} // ITER: {currentPreset.maxIterations} // ZOOM: {currentPreset.zoom.toFixed(2)}x
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <AnimatePresence>
          {showControls && (
            <motion.div 
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: window.innerWidth < 768 ? '100%' : 320 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="glass-panel rounded-3xl flex flex-col border-purple-500/10 overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Parameters</span>
                <div className="flex gap-2">
                  <button onClick={handleSaveCurrent} className="p-2 hover:bg-white/10 rounded-xl text-purple-400 transition-colors" title="Save Preset">
                    <Save size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Preset Selector */}
                <div className="space-y-3">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Stored Presets</label>
                  <div className="grid grid-cols-1 gap-2">
                    {presets.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => setCurrentPreset(p)}
                        className={`group flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${currentPreset.id === p.id ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                      >
                        <span className={`text-[11px] font-black ${currentPreset.id === p.id ? 'text-purple-400' : 'text-gray-400'}`}>{p.name}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeletePreset(p.id); }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Settings */}
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Fractal Type</label>
                    <div className="flex gap-2">
                      {['mandelbrot', 'julia'].map(t => (
                        <button
                          key={t}
                          onClick={() => setCurrentPreset({ ...currentPreset, type: t as any })}
                          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${currentPreset.type === t ? 'bg-purple-500 text-white border-purple-500 shadow-lg' : 'bg-white/5 border-white/10 text-gray-500'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Iteration Depth</label>
                      <span className="text-[10px] text-purple-400 font-black">{currentPreset.maxIterations}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      value={currentPreset.maxIterations}
                      onChange={(e) => setCurrentPreset({ ...currentPreset, maxIterations: parseInt(e.target.value) })}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Color Mapping</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['neon', 'plasma', 'obsidian', 'electric'].map(s => (
                        <button
                          key={s}
                          onClick={() => setCurrentPreset({ ...currentPreset, colorScheme: s as any })}
                          className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${currentPreset.colorScheme === s ? 'bg-white/10 border-purple-500/50 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentPreset.type === 'julia' && (
                    <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={12} className="text-pink-400" />
                        <span className="text-[9px] text-pink-400 font-black uppercase tracking-widest">Julia Constant (C)</span>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                            <span className="text-gray-600">Real</span>
                            <span className="text-white">{currentPreset.juliaC?.re.toFixed(4)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="-2" 
                            max="2" 
                            step="0.01"
                            value={currentPreset.juliaC?.re}
                            onChange={(e) => setCurrentPreset({ ...currentPreset, juliaC: { ...currentPreset.juliaC!, re: parseFloat(e.target.value) } })}
                            className="w-full accent-pink-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                            <span className="text-gray-600">Imaginary</span>
                            <span className="text-white">{currentPreset.juliaC?.im.toFixed(4)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="-2" 
                            max="2" 
                            step="0.01"
                            value={currentPreset.juliaC?.im}
                            onChange={(e) => setCurrentPreset({ ...currentPreset, juliaC: { ...currentPreset.juliaC!, im: parseFloat(e.target.value) } })}
                            className="w-full accent-pink-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Zoom Factor</label>
                      <span className="text-[10px] text-purple-400 font-black">{currentPreset.zoom.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="100" 
                      step="0.1"
                      value={currentPreset.zoom}
                      onChange={(e) => setCurrentPreset({ ...currentPreset, zoom: parseFloat(e.target.value) })}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 border-t border-white/5">
                <button 
                  onClick={renderFractal}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <RefreshCw size={16} />
                  Re-Synthesize
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FractalGenerator;
