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
  Cell
} from 'recharts';
import { TrendingUp, Award, Calendar } from 'lucide-react';

const data = [
  { day: 'MON', volume: 12000, color: '#4F46E5' },
  { day: 'TUE', volume: 15400, color: '#4F46E5' },
  { day: 'WED', volume: 8000, color: '#18181B' },
  { day: 'THU', volume: 18000, color: '#4F46E5' },
  { day: 'FRI', volume: 14000, color: '#4F46E5' },
  { day: 'SAT', volume: 22000, color: '#4F46E5' },
  { day: 'SUN', volume: 5000, color: '#18181B' },
];

export const BehaviorTracking = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Weekly Volume', value: '94.8k', unit: 'KG', trend: '+12%', icon: TrendingUp },
          { label: 'Personal Record', value: '245', unit: 'LBS', trend: 'STABLE', icon: Award },
          { label: 'Consistency', value: '94', unit: '%', trend: '+2%', icon: Calendar },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 relative overflow-hidden">
            <stat.icon size={40} className="absolute -right-2 -bottom-2 text-white/5 opacity-20" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</span>
              <span className={cn(
                "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                stat.trend.startsWith('+') ? "text-brand border-brand/20" : "text-white/30 border-white/10"
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

      <div className="glass-panel p-6">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
          <div className="w-1 h-3 bg-brand" />
          Volume Distribution matrix
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
              <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.day === 'SAT' ? 1 : 0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

