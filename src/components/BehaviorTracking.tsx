import React from 'react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Award, Calendar, Activity, History, Zap, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';
import { MuscleHeatmap, MuscleGroup } from './MuscleHeatmap';
import { motion } from 'motion/react';

const volumeData = [
  { day: 'MON', volume: 12000, color: '#4F46E5' },
  { day: 'TUE', volume: 15400, color: '#4F46E5' },
  { day: 'WED', volume: 8000, color: '#18181B' },
  { day: 'THU', volume: 18000, color: '#4F46E5' },
  { day: 'FRI', volume: 14000, color: '#4F46E5' },
  { day: 'SAT', volume: 22000, color: '#4F46E5' },
  { day: 'SUN', volume: 5000, color: '#18181B' },
];

const trendData = [
  { week: 'W1', performance: 65, intensity: 40 },
  { week: 'W2', performance: 68, intensity: 45 },
  { week: 'W3', performance: 72, intensity: 55 },
  { week: 'W4', performance: 70, intensity: 60 },
  { week: 'W5', performance: 78, intensity: 70 },
  { week: 'W6', performance: 85, intensity: 75 },
  { week: 'W7', performance: 92, intensity: 80 },
  { week: 'W8', performance: 94, intensity: 85 },
];

const personalRecords = [
  { exercise: 'Back Squat', value: 180, unit: 'KG', date: '2024-05-01', status: 'improved', diff: '+5kg' },
  { exercise: 'Deadlift', value: 220, unit: 'KG', date: '2024-04-15', status: 'stable', diff: '0kg' },
  { exercise: 'Bench Press', value: 125, unit: 'KG', date: '2024-05-10', status: 'improved', diff: '+2.5kg' },
  { exercise: 'Overhead Press', value: 85, unit: 'KG', date: '2024-03-22', status: 'stable', diff: '0kg' },
];

interface BehaviorTrackingProps {
  muscleIntensity?: Record<MuscleGroup, number>;
}

export const BehaviorTracking = ({ muscleIntensity }: BehaviorTrackingProps) => {
  return (
    <div className="space-y-6">
      {/* Top Level Summary & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Heatmap Section */}
        <div className="lg:col-span-1 glass-panel p-6 border-zinc-800">
           <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
             <Activity className="text-brand" size={16} />
             Live Load Map
           </h3>
           <MuscleHeatmap 
             intensity={muscleIntensity || {
                quads: 0.8, glutes: 0.6, hamstrings: 0.4, calves: 0.2,
                abs: 0.5, chest: 0.1, delts: 0.2, biceps: 0, triceps: 0,
                lats: 0, traps: 0, lowerBack: 0.3, forearms: 0
             }} 
             showLabels={true} 
           />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Weekly Volume', value: '94.8k', unit: 'KG', trend: '+12%', icon: TrendingUp, status: 'positive' },
              { label: 'Workload Intensity', value: '8.4', unit: 'RPE', trend: '+0.5', icon: Zap, status: 'warning' },
              { label: 'Neural Recovery', value: '92', unit: '%', trend: 'OPTIMAL', icon: Target, status: 'positive' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-5 relative overflow-hidden">
                <stat.icon size={40} className="absolute -right-2 -bottom-2 text-white/5 opacity-20" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</span>
                  <span className={cn(
                    "text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase",
                    stat.status === 'positive' ? "text-brand border-brand/20 bg-brand/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                  )}>
                    {stat.trend}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-bold tracking-tighter">{stat.value}</span>
                  <span className="text-xs font-mono text-white/30 font-bold">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Historical Trend Chart */}
          <div className="glass-panel p-6 border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <History className="text-brand" size={16} />
                Biometric Performance Trend [8W]
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Intensity</span>
                </div>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    hide
                  />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                    contentStyle={{ background: '#18181B', border: '1px solid #27272A', fontSize: '10px', fontFamily: 'monospace', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="performance" stroke="#4F46E5" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={2} />
                  <Line type="monotone" dataKey="intensity" stroke="rgba(255,255,255,0.1)" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Volume matrix and Personal Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
            <div className="w-1 h-3 bg-brand" />
            Load Distribution [Current Cycle]
          </h3>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ background: '#18181B', border: '1px solid #27272A', fontSize: '10px', fontFamily: 'monospace', borderRadius: '12px' }}
                />
                <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
                  {volumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.day === 'SAT' ? 1 : 0.4} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Award className="text-brand" size={16} />
              Hall of Power_ Records
            </h3>
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest">Archive_Verified</span>
          </div>
          
          <div className="space-y-4">
            {personalRecords.map((record, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-0.5">{record.exercise}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-mono font-bold">{record.value}</span>
                    <span className="text-[10px] font-mono text-white/40 font-bold uppercase">{record.unit}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    {record.status === 'improved' ? (
                      <div className="flex items-center gap-1 text-brand">
                        <ArrowUpRight size={12} />
                        <span className="text-[10px] font-mono font-bold">{record.diff}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-white/20">
                        <span className="text-[10px] font-mono font-bold">STABLE</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[9px] font-mono text-white/30 lowercase mt-1">{record.date}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 border border-brand/20 rounded-md text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand/80 hover:bg-brand/5 transition-colors">
            Access Full Archive
          </button>
        </div>
      </div>
    </div>
  );
};

