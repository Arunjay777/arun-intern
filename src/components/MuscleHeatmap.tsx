import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export type MuscleGroup = 
  | 'quads' | 'glutes' | 'hamstrings' | 'calves' 
  | 'abs' | 'chest' | 'delts' | 'biceps' | 'triceps' 
  | 'lats' | 'traps' | 'lowerBack' | 'forearms';

interface MuscleHeatmapProps {
  intensity: Record<MuscleGroup, number>; // 0 to 1
  className?: string;
  showLabels?: boolean;
}

export const MuscleHeatmap: React.FC<MuscleHeatmapProps> = ({ intensity, className, showLabels = true }) => {
  // SVG paths for a stylized human figure muscles
  // These are simplified polygonal representations for a "tech/cyber" look
  const muscles = useMemo(() => [
    // FRONT VIEW
    { id: 'delts', name: 'Deltoids', path: 'M 40,30 L 48,32 L 52,40 L 48,50 L 38,45 Z' }, // Right Delt
    { id: 'delts', name: 'Deltoids', path: 'M 160,30 L 152,32 L 148,40 L 152,50 L 162,45 Z' }, // Left Delt
    { id: 'chest', name: 'Pectorals', path: 'M 100,50 L 140,55 L 142,80 L 100,85 Z' }, // Left Chest
    { id: 'chest', name: 'Pectorals', path: 'M 100,50 L 60,55 L 58,80 L 100,85 Z' }, // Right Chest
    { id: 'abs', name: 'Abdominals', path: 'M 80,90 L 120,90 L 125,140 L 75,140 Z' },
    { id: 'quads', name: 'Quadriceps', path: 'M 75,155 L 98,155 L 95,230 L 70,220 Z' }, // Right Quad
    { id: 'quads', name: 'Quadriceps', path: 'M 125,155 L 102,155 L 105,230 L 130,220 Z' }, // Left Quad
    { id: 'biceps', name: 'Biceps', path: 'M 152,55 L 165,80 L 158,110 L 145,100 Z' }, // Left Bicep
    { id: 'biceps', name: 'Biceps', path: 'M 48,55 L 35,80 L 42,110 L 55,100 Z' }, // Right Bicep
    
    // BACK VIEW (Offset slightly)
    { id: 'lats', name: 'Lats', path: 'M 300,55 L 340,65 L 335,110 L 300,100 Z' },
    { id: 'lats', name: 'Lats', path: 'M 300,55 L 260,65 L 265,110 L 300,100 Z' },
    { id: 'glutes', name: 'Glutes', path: 'M 275,145 L 325,145 L 320,185 L 280,185 Z' },
    { id: 'hamstrings', name: 'Hamstrings', path: 'M 275,195 L 298,195 L 292,260 L 270,250 Z' },
    { id: 'hamstrings', name: 'Hamstrings', path: 'M 325,195 L 302,195 L 308,260 L 330,250 Z' },
  ], []);

  const getHeatColor = (val: number) => {
    if (val === 0) return 'rgba(255, 255, 255, 0.05)';
    // From Zinc-800 to Brand (Indigo-500) to Warm (Amber/Orange)
    if (val < 0.3) return 'rgba(99, 102, 241, 0.3)'; // Low intensity - Indigo
    if (val < 0.7) return 'rgba(99, 102, 241, 0.7)'; // Mid - Indigo
    return 'rgba(249, 115, 22, 0.9)'; // High - Orange/Heat
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-auto drop-shadow-[0_0_20px_rgba(79,70,229,0.15)]"
      >
        {/* Figure Outlines */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
          {/* Front Outline */}
          <path d="M 100,20 C 80,20 75,40 60,50 L 40,60 L 50,120 L 75,145 L 70,280 L 100,280 L 105,170 L 130,280 L 160,280 L 155,145 L 180,120 L 190,60 L 170,50 C 150,40 145,20 125,20 Z" />
          {/* Back Outline */}
          <path d="M 300,20 C 280,20 275,40 260,50 L 240,60 L 250,120 L 275,145 L 270,280 L 300,280 L 305,170 L 330,280 L 360,280 L 355,145 L 380,120 L 390,60 L 370,50 C 350,40 345,20 325,20 Z" />
        </g>

        {/* Muscles */}
        {muscles.map((muscle, idx) => {
          const val = intensity[muscle.id as MuscleGroup] || 0;
          return (
            <motion.path
              key={`${muscle.id}-${idx}`}
              d={muscle.path}
              initial={false}
              animate={{
                fill: getHeatColor(val),
                stroke: val > 0 ? getHeatColor(val) : 'rgba(255,255,255,0.1)',
                strokeWidth: val > 0 ? 1 : 0.5
              }}
              transition={{ duration: 1 }}
              className="cursor-help"
            />
          );
        })}

        {/* Head Visuals */}
        <circle cx="100" cy="35" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        <circle cx="300" cy="35" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
      </svg>

      {showLabels && (
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 w-full max-w-sm">
          {Object.entries(intensity).filter(([_, val]) => val > 0).map(([muscle, val]) => (
            <div key={muscle} className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{muscle}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand"
                    initial={{ width: 0 }}
                    animate={{ width: `${val * 100}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-zinc-300">{Math.round(val * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative Text */}
      <div className="absolute top-0 left-0 text-[8px] font-mono text-zinc-600 uppercase vertical-text tracking-[0.5em]">
        Anatomical_Mapping_v4.2
      </div>
    </div>
  );
};
