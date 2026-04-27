import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const PLAYLIST = [
  { id: '1', title: 'NEURAL_DRIFT', artist: 'AJ_FLOW', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'SYNTH_PULSE', artist: 'VOLTAGE_CORE', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'CYBER_STIM', artist: 'NEO_GLITCH', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

interface AudioEngineProps {
  autoPlay?: boolean;
}

export const AudioEngine = ({ autoPlay = false }: AudioEngineProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser until user interaction
        console.log('Autoplay blocked');
      });
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, volume]);

  return (
    <div className="glass-panel p-4 border-zinc-800 bg-black/40 backdrop-blur-xl flex items-center justify-between gap-6 pointer-events-auto">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand relative overflow-hidden group">
          <div className={cn(
            "absolute inset-0 bg-brand/5 animate-pulse",
            !isPlaying && "hidden"
          )} />
          <Music size={18} className={cn("relative z-10", isPlaying && "animate-bounce")} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-zinc-100 uppercase tracking-tighter truncate w-32">
            {currentTrack.title}
          </span>
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest italic">
            {currentTrack.artist}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={prevTrack} 
          className="p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <SkipBack size={16} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(79,70,229,0.4)]"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        <button 
          onClick={nextTrack} 
          className="p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <SkipForward size={16} />
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <Volume2 size={14} className="text-zinc-600" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 accent-brand bg-zinc-800 rounded-full h-1 appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col items-end">
         <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={cn(
                  "w-1 bg-brand rounded-t-sm transition-all duration-300",
                  isPlaying ? "animate-audio-bar" : "h-1"
                )}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  height: isPlaying ? 'auto' : '4px'
                }} 
              />
            ))}
         </div>
         <span className="text-[7px] font-mono text-zinc-600 uppercase">Hifi_Sync</span>
      </div>
    </div>
  );
};
