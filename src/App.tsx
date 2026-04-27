import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ScanLine, 
  Utensils, 
  BarChart3, 
  MessageSquare,
  Shield,
  Zap,
  Menu,
  X,
  Bell,
  Settings,
  Search,
  BookOpen
} from 'lucide-react';
import { cn } from './lib/utils';
import { SmartStats } from './components/SmartStats';
import { VisionModule } from './components/VisionModule';
import { DietEngine } from './components/DietEngine';
import { BehaviorTracking } from './components/BehaviorTracking';
import { AIChatSidebar } from './components/AIChatSidebar';
import { ProtocolLibrary } from './components/ProtocolLibrary';

type NavTab = 'dashboard' | 'vision' | 'diet' | 'tracking' | 'protocols';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Command Central', icon: LayoutDashboard },
    { id: 'vision', label: 'VisionAI Link', icon: ScanLine },
    { id: 'diet', label: 'Diet Engine', icon: Utensils },
    { id: 'tracking', label: 'Performance Matrix', icon: BarChart3 },
    { id: 'protocols', label: 'Training Library', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-obsidian flex flex-col tech-grid selection:bg-brand selection:text-black">
      {/* Top Protocol Bar */}
      <header className="h-14 border-b border-white/5 bg-obsidian/80 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-brand text-white p-2 rounded-lg group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-brand/20">
              <Zap size={16} fill="currentColor" />
            </div>
            <div>
              <span className="font-sans font-black text-xl tracking-tighter uppercase leading-none block">AJ FITNESS</span>
              <div className="flex gap-1.5 items-center mt-0.5">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest leading-none">Status: Linked</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as NavTab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                  activeTab === item.id 
                    ? "bg-brand text-white shadow-lg shadow-brand/20" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
             <Search size={14} className="text-white/30" />
             <input placeholder="Search metrics..." className="bg-transparent border-none text-[10px] font-mono focus:outline-none w-24 lg:w-40" />
          </div>
          <button className="text-white/40 hover:text-brand relative">
             <Bell size={18} />
             <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand rounded-full ring-2 ring-obsidian" />
          </button>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand/20 to-brand border border-brand/50" />
          <button 
            className="md:hidden text-white/40"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Tactical Display */}
      <main className="flex-1 container mx-auto px-4 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 text-brand/30 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">
                <span className="flex items-center gap-1"><Shield size={10} /> Secure Link Established</span>
                <span className="w-px h-2 bg-white/10" />
                <span>Sector_07A</span>
              </div>
              <h1 className="text-4xl font-mono font-bold tracking-tighter uppercase mb-2">
                {navItems.find(n => n.id === activeTab)?.label}
              </h1>
              <div className="h-1 w-20 bg-brand" />
            </div>

            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SmartStats />
                
                {/* Secondary Tactical Level */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Neural Feed - Scrollable Section */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-sans font-black tracking-tighter uppercase flex items-center gap-2">
                        <ScanLine className="text-brand" size={20} />
                        Intelligence Feed
                      </h2>
                      <div className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-[8px] font-mono font-bold text-brand uppercase tracking-widest animate-pulse">
                        Live Uplink
                      </div>
                    </div>
                    
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                      {[
                        { time: '09:42', event: 'Biometric Analysis Complete', detail: 'Optimal recovery window detected. Protein synthesis peaked 12m ago.', status: 'SUCCESS' },
                        { time: '08:15', event: 'Neural Calibration', detail: 'Squat pattern accuracy improved by 4.2% across last 3 sessions.', status: 'OPTIMAL' },
                        { time: '07:30', event: 'Hardware Sync', detail: 'External sensor array (AJ-Pod v2) successfully linked to core.', status: 'SYNCED' },
                        { time: '06:00', event: 'Sleep Protocol', detail: 'Deep REM density: 24%. Recommended training intensity: 100%.', status: 'COMPLETED' },
                        { time: '04:15', event: 'System Diagnostic', detail: 'All AJ FITNESS subsystems operating within peak voltage parameters.', status: 'STABLE' },
                      ].map((log, i) => (
                        <div key={i} className="glass-panel p-5 border-zinc-800 hover:border-brand/20 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-zinc-500">{log.time}</span>
                              <span className="text-xs font-bold font-mono tracking-tight text-zinc-200 uppercase">{log.event}</span>
                            </div>
                            <span className={cn(
                              "text-[8px] font-mono px-2 py-0.5 rounded border",
                              log.status === 'OPTIMAL' || log.status === 'SUCCESS' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-brand border-brand/20 bg-brand/5"
                            )}>{log.status}</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">{log.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar stats & Community */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-sans font-black tracking-tighter uppercase">Hardware Infrastructure</h2>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: 'AJ-Pod v4', status: 'Online', battery: '92%' },
                        { name: 'Biometric Strap', status: 'Linked', battery: '85%' },
                        { name: 'Neural Link', status: 'Active', battery: 'N/A' },
                      ].map((hw, i) => (
                        <div key={i} className="glass-panel p-4 border-zinc-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                             <span className="text-[10px] font-mono font-bold text-zinc-300">{hw.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-[8px] font-mono text-zinc-500">{hw.battery}</span>
                             <span className="text-[9px] font-mono font-bold text-brand uppercase">{hw.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-xl font-sans font-black tracking-tighter uppercase">Elite Rankings</h2>
                    <div className="glass-panel border-zinc-800 divide-y divide-zinc-800">
                      {[
                        { rank: '#1', user: 'AXEL_PRIME', power: '984', trend: 'up' },
                        { rank: '#2', user: 'SARAH_SQUAT', power: '962', trend: 'down' },
                        { rank: '#3', user: 'AJ_FOUNDER', power: '958', trend: 'up' },
                        { rank: '#4', user: 'NEURAL_MAX', power: '921', trend: 'stable' },
                      ].map((user, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs font-bold text-brand">{user.rank}</span>
                            <span className="font-mono text-xs font-bold text-zinc-300">{user.user}</span>
                          </div>
                          <div className="text-right">
                             <div className="font-mono text-xs font-bold text-white">{user.power}</div>
                             <div className="text-[8px] font-mono text-zinc-600 uppercase">Power Index</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-brand/10 border-brand/20">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-brand/10 rounded-lg text-brand">
                            <Zap size={16} />
                         </div>
                         <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand">Next Evolution</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed font-mono font-bold">
                        Reach 1000 Power Index to unlock AJ Hyperloop training protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'vision' && <VisionModule />}
            {activeTab === 'diet' && <DietEngine />}
            {activeTab === 'tracking' && <BehaviorTracking />}
            {activeTab === 'protocols' && <ProtocolLibrary />}
          </motion.div>
        </AnimatePresence>

        {/* Global Floating AI Trigger */}
        <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-40">
           <AnimatePresence>
             {!isChatOpen && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.8, y: 20 }}
                 className="glass-panel p-3 text-[10px] font-mono text-brand uppercase tracking-widest flex items-center gap-2 pointer-events-none"
               >
                 <Zap size={10} className="animate-pulse" />
                 Liaison AI Online
               </motion.div>
             )}
           </AnimatePresence>
           
           <button 
             onClick={() => setIsChatOpen(!isChatOpen)}
             className={cn(
               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 border",
               isChatOpen 
                ? "bg-zinc-900 border-zinc-800 text-white rotate-90" 
                : "bg-brand border-indigo-500 shadow-xl shadow-brand/40 text-white hover:scale-110"
             )}
           >
             {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
           </button>
        </div>

        <AIChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>

      {/* Protocol Footer */}
      <footer className="py-6 border-t border-white/5 px-4 bg-obsidian">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <span>Protocol v4.2.0-Alpha</span>
            <span className="w-px h-3 bg-white/10" />
            <span>AJ FITNESS ECOSYSTEM INTEGRATED</span>
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <a href="#" className="hover:text-brand transition-colors">Neural Security</a>
            <a href="#" className="hover:text-brand transition-colors">Hardware Sync</a>
            <a href="#" className="hover:text-brand transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

