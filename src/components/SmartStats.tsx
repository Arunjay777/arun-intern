import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  Timer, 
  Heart,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  hr: 70 + Math.random() * 40,
  effort: Math.random() * 100
}));

export const SmartStats = () => {
  const [liveHr, setLiveHr] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveHr(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(60, Math.min(180, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Telemetry Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'HEART RATE', value: liveHr, unit: 'BPM', icon: Heart, color: 'text-rose-500' },
          { label: 'ENERGY BURN', value: '1,240', unit: 'KCAL', icon: Flame, color: 'text-orange-500' },
          { label: 'REP COUNTER', value: '12', unit: 'REPS', icon: Dumbbell, color: 'text-brand' },
          { label: 'TIME ACTIVE', value: '42:15', unit: 'MINS', icon: Timer, color: 'text-sky-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 flex flex-col gap-2 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
               <stat.icon size={48} />
             </div>
             <span className="text-[10px] font-mono font-bold text-white/40 tracking-wider uppercase">
               {stat.label}
             </span>
             <div className="flex items-baseline gap-1">
               <span className="text-2xl font-mono font-bold tracking-tighter">{stat.value}</span>
               <span className="text-[10px] font-mono text-white/30">{stat.unit}</span>
             </div>
             <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 className={cn("h-full bg-current", stat.color)}
                 initial={{ width: 0 }}
                 animate={{ width: '70%' }}
                 transition={{ duration: 1, delay: i * 0.1 }}
               />
             </div>
          </div>
        ))}
      </div>

      {/* Effort Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Activity className="text-brand" size={18} />
              <span className="font-mono font-bold uppercase text-xs tracking-widest leading-none">Intensity Index</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-[10px] text-white/50 uppercase font-mono">Real-time</span>
              </div>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="gradientBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: '#18181B', border: '1px solid #27272A', fontSize: '10px', fontFamily: 'monospace', borderRadius: '12px' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="hr" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  fill="url(#gradientBrand)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-between">
           <div>
             <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-100 flex items-center gap-2 mb-6">
               <div className="w-1 h-3 bg-indigo-500" />
               Deployment Architecture
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                   <span className="text-zinc-500">Framework</span>
                   <span className="text-zinc-100 font-bold">Vite Core</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                   <span className="text-zinc-500">Node Engine</span>
                   <span className="text-zinc-100 font-bold">v20.x High-Perf</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                   <span className="text-zinc-500">Vercel Status</span>
                   <span className="text-brand font-bold">READY_FOR_PUSH</span>
                </div>
             </div>
           </div>

           <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="text-[10px] font-mono text-brand uppercase font-bold mb-2">Vercel Guide</div>
              <p className="text-[9px] text-zinc-500 font-mono leading-relaxed">
                Connect your GitHub repo to Vercel. Use "Other" framework or "Vite". Production build: <code className="text-zinc-300">npm run build</code>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
