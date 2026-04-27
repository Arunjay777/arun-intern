import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCcw, Maximize, ShieldAlert, CheckCircle2, Power, Eye, EyeOff, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export const VisionModule = () => {
  const [isActive, setIsActive] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [isTraining, setIsTraining] = useState(false);
  const [history, setHistory] = useState([
    { id: '1', type: 'Squat Protocol', date: '2024-04-26', duration: '12:45', reps: 45, status: 'Completed' },
    { id: '2', type: 'Deadlift Link', date: '2024-04-25', duration: '08:20', reps: 24, status: 'Completed' }
  ]);
  const [poseData, setPoseData] = useState({
    squatDepth: 0,
    repCount: 0,
    status: 'IDLE'
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user" 
        } 
      });
      streamRef.current = stream;
      setIsActive(true);
      setIsTraining(false);
    } catch (err) {
      console.error("Camera failed", err);
      alert("Camera access denied. Please check protocol permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Save to history if reps were detected
    if (poseData.repCount > 0) {
      const newSession = {
        id: Date.now().toString(),
        type: 'Squat Session',
        date: new Date().toISOString().split('T')[0],
        duration: '05:22', 
        reps: poseData.repCount,
        status: 'Completed'
      };
      setHistory(prev => [newSession, ...prev]);
    }

    setIsActive(false);
    setIsTraining(false);
    setPoseData({ squatDepth: 0, repCount: 0, status: 'IDLE' });
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const addRepManually = () => {
    if (!isActive) return;
    setPoseData(prev => ({
      ...prev,
      repCount: prev.repCount + 1,
      squatDepth: 85 + Math.random() * 10,
      status: 'OPTIMAL'
    }));
    
    // Reset depth after a moment
    setTimeout(() => {
      setPoseData(prev => ({ ...prev, squatDepth: 0 }));
    }, 1000);
  };

  useEffect(() => {
    if (isActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isActive]);

  useEffect(() => {
    let interval: any;
    if (isActive && autoDetect && isTraining) {
      interval = setInterval(() => {
        setPoseData(prev => ({
          ...prev,
          squatDepth: 70 + Math.random() * 20,
          repCount: prev.repCount + (Math.random() > 0.7 ? 1 : 0),
          status: Math.random() > 0.8 ? 'INCOMPLETE' : 'OPTIMAL'
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive, autoDetect, isTraining]);

  return (
    <div className="glass-panel overflow-hidden border-zinc-800 bg-zinc-900/40">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/60 transition-colors">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-2.5 h-2.5 rounded-full ring-4 ring-black", 
            isActive ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" : "bg-zinc-700"
          )} />
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 block leading-none">VisionAI Neural Link</span>
            {isActive && <span className="text-[8px] font-mono text-emerald-500/80 uppercase tracking-tighter">Biometric Stream: 720p@30fps</span>}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-tighter text-zinc-500">Auto-Detect</span>
            <button 
              onClick={() => setAutoDetect(!autoDetect)}
              className={cn(
                "w-8 h-4 rounded-full p-0.5 transition-colors relative",
                autoDetect ? "bg-brand" : "bg-zinc-800"
              )}
            >
              <div className={cn(
                "w-3 h-3 bg-white rounded-full transition-transform",
                autoDetect ? "translate-x-4" : "translate-x-0"
              )} />
            </button>
          </div>
          <div className="w-px h-4 bg-zinc-800" />
          {isActive && (
            <button 
              onClick={() => setShowOverlay(!showOverlay)}
              className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase font-mono"
            >
              {showOverlay ? <EyeOff size={14} /> : <Eye size={14} />}
              {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
            </button>
          )}
          <div className="w-px h-4 bg-zinc-800" />
          <div className="flex gap-2">
            <button className="text-zinc-500 hover:text-white transition-colors"><RefreshCcw size={14} /></button>
            <button className="text-zinc-500 hover:text-white transition-colors"><Maximize size={14} /></button>
          </div>
        </div>
      </div>

      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        {/* Static Background Grid when inactive */}
        {!isActive && <div className="absolute inset-0 tech-grid opacity-10" />}

        {!isActive ? (
          <div className="flex flex-col items-center gap-6 z-10">
            <div className="w-20 h-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center animate-pulse">
              <Camera size={40} className="text-brand" strokeWidth={1.5} />
            </div>
            <button 
              onClick={startCamera}
              className="bg-brand text-white px-8 py-3 rounded-2xl font-mono font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand/20 hover:scale-[1.02] transition-all hover:bg-brand-light"
            >
              Establish Vision Link
            </button>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Awaiting Neural Interface Command</p>
            
            <div className="glass-panel p-4 bg-rose-500/5 border-rose-500/20 max-w-xs">
              <div className="flex items-center gap-2 mb-2 text-rose-500">
                <ShieldAlert size={14} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Protocol Help</span>
              </div>
              <p className="text-[9px] text-zinc-500 font-mono leading-relaxed">
                If the camera fails to initialize: 1. Ensure browser permissions are "Allowed". 2. Verify hardware switch is ON. 3. Refresh protocol.
              </p>
            </div>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
            
            {/* Real-time Overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 p-8 pointer-events-none"
                >
                  <div className="h-full w-full border border-brand/40 relative rounded-2xl">
                    {/* Scanning Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/10 to-transparent h-1/2 w-full animate-scan" style={{ animation: 'scan 4s linear infinite' }} />

                    {/* Adaptive Tracking Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-64 h-64 border-2 border-dashed border-brand/30 rounded-full animate-spin-slow" />
                    </div>

                    <div className="absolute top-6 left-6 space-y-4">
                      <div className="glass-panel px-4 py-2 bg-black/60 border-zinc-800">
                        <div className="text-[8px] text-zinc-500 uppercase font-mono mb-1">Target Identified</div>
                        <div className="text-sm font-bold font-mono text-zinc-100">HUMAN_PROTOCOL_X</div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-lg border border-zinc-800 w-fit">
                          <span className="font-mono text-[9px] text-zinc-400 uppercase">Stability</span>
                          <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 w-[85%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4 pointer-events-auto">
                       <div className="text-right">
                          <div className="text-[10px] font-mono text-brand mb-1 uppercase tracking-widest">Active Tracking</div>
                          <div className="text-4xl font-mono font-black text-white tracking-widest leading-none">SQUAT_REPS: {poseData.repCount}</div>
                       </div>
                       
                       <div className="flex gap-3">
                         {!isTraining ? (
                           <button 
                             onClick={() => setIsTraining(true)}
                             className="px-6 py-3 bg-brand rounded-xl text-white font-mono font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 "
                           >
                             <Zap size={16} fill="currentColor" />
                             Start Training
                           </button>
                         ) : (
                           <button 
                             onClick={() => setIsTraining(false)}
                             className="px-6 py-3 bg-rose-500 rounded-xl text-white font-mono font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
                           >
                             Pause Session
                           </button>
                         )}
                         
                         <button 
                           onClick={addRepManually}
                           className="px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
                         >
                           Add Rep
                         </button>
                       </div>
                       
                       <button 
                         onClick={stopCamera}
                         className="px-6 py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl text-zinc-400 font-mono font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
                       >
                         Terminate Link
                       </button>
                    </div>
                    
                    {/* Skeleton Visualization Mockup */}
                    <motion.div 
                      className="absolute left-1/3 top-1/2 w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500/20 shadow-[0_0_15px_#10b981]"
                      animate={{ y: [0, 80, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-emerald-500 bg-black/50 px-1">JOINT_CORE</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Workout History Section */}
      <div className="p-6 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-100 flex items-center gap-2">
            <div className="w-1 h-3 bg-brand" />
            Detection Logs
          </h3>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Synchronized with Neural Cloud</span>
        </div>
        
        <div className="space-y-2">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-zinc-800 rounded-xl hover:border-brand/20 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-200 uppercase font-mono">{item.type}</div>
                  <div className="text-[9px] text-zinc-500 font-mono">{item.date} • {item.duration} Duration</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-brand font-mono">{item.reps} REPS</div>
                <div className="text-[8px] text-zinc-500 uppercase font-mono">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

