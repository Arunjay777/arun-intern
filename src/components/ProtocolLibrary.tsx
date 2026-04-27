import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Crosshair, Target, Trophy, Clock, Flame, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const protocols = [
  {
    id: 'hp-1',
    title: 'Hypertrophy Protocol X',
    desc: 'Volume-focused stimulus for maximum sarcoplasmic expansion.',
    duration: '45-60m',
    intensity: 'High',
    difficulty: 'Advanced',
    tags: ['Muscle', 'Hypertrophy', 'AI Guarded']
  },
  {
    id: 'lo-2',
    title: 'Lipid Oxidation Alpha',
    desc: 'Metabolic conditioning optimized for fat cell mobilization.',
    duration: '30-40m',
    intensity: 'Medium',
    difficulty: 'Intermediate',
    tags: ['Fat Loss', 'Metabolic', 'HIIT']
  },
  {
    id: 'sp-3',
    title: 'Strength Primary Zero',
    desc: 'Compound movement focus targeting myofibrillar density.',
    duration: '60-90m',
    intensity: 'Extreme',
    difficulty: 'Elite',
    tags: ['Strength', 'Power', 'Recovery Heavy']
  },
  {
    id: 're-4',
    title: 'Active Recovery Flow',
    desc: 'Low-impact neural resets to facilitate faster substrate replenishment.',
    duration: '15-20m',
    intensity: 'Low',
    difficulty: 'Beginner',
    tags: ['Recovery', 'Mobility', 'Neural']
  },
  {
    id: 'en-5',
    title: 'Endurance Core Beta',
    desc: 'Mitochondrial biogenesis through sustained aerobic threshold training.',
    duration: '45-120m',
    intensity: 'Medium',
    difficulty: 'Intermediate',
    tags: ['Endurance', 'Cardio', 'Vascular']
  }
];

export const ProtocolLibrary = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protocols.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-brand/5 rounded-3xl blur-2xl group-hover:bg-brand/10 transition-all" />
            <div className="relative glass-panel p-6 border-zinc-800 hover:border-brand/40 transition-all cursor-pointer h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-brand/10 rounded-2xl text-brand group-hover:scale-110 transition-transform">
                  <Zap size={20} />
                </div>
                <div className="flex gap-1">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[7px] font-mono border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-sans font-black tracking-tighter uppercase text-zinc-100 mb-2">{p.title}</h3>
              <p className="text-[11px] text-zinc-500 font-mono leading-relaxed mb-6 flex-1">
                {p.desc}
              </p>
              
              <div className="grid grid-cols-3 gap-2 border-t border-zinc-800 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase">Duration</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-zinc-300">
                    <Clock size={10} />
                    {p.duration}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase">Intensity</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-brand">
                    <Flame size={10} />
                    {p.intensity}
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase">Difficulty</span>
                  <div className="text-[10px] font-bold font-mono text-zinc-300 uppercase">
                    {p.difficulty}
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                Execute Protocol
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Featured Mastery Section */}
      <div className="glass-panel p-8 border-brand/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
           <Trophy size={120} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand font-mono text-xs font-bold uppercase tracking-widest">
                 <Crosshair size={14} />
                 Specialized Training Core
              </div>
              <h2 className="text-3xl font-sans font-black tracking-tighter uppercase leading-none">
                 The Neural Adaption Protocol
              </h2>
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                 Our most advanced protocol using real-time VisionAI feedback to adapt volume and intensity mid-set. Locked until AJ Power Index reaches 500.
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 flex-1">
                    <div className="text-[9px] text-zinc-600 uppercase font-mono mb-1">Status</div>
                    <div className="text-xs font-bold font-mono text-zinc-400">RESTRICTED_AUTH</div>
                 </div>
                 <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 flex-1">
                    <div className="text-[9px] text-zinc-600 uppercase font-mono mb-1">Requirement</div>
                    <div className="text-xs font-bold font-mono text-brand">500_AJ_INDEX</div>
                 </div>
              </div>
           </div>
           <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 border-2 border-brand/20 rounded-full flex items-center justify-center relative">
                 <div className="absolute inset-0 border-2 border-brand/10 rounded-full animate-spin-slow" />
                 <Target size={64} className="text-brand/40" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
