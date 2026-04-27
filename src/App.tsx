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
  Search
} from 'lucide-react';
import { cn } from './lib/utils';
import { SmartStats } from './components/SmartStats';
import { VisionModule } from './components/VisionModule';
import { DietEngine } from './components/DietEngine';
import { BehaviorTracking } from './components/BehaviorTracking';
import { AIChatSidebar } from './components/AIChatSidebar';

type NavTab = 'dashboard' | 'vision' | 'diet' | 'tracking';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Command Central', icon: LayoutDashboard },
    { id: 'vision', label: 'VisionAI Link', icon: ScanLine },
    { id: 'diet', label: 'Diet Engine', icon: Utensils },
    { id: 'tracking', label: 'Performance Matrix', icon: BarChart3 },
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

            {activeTab === 'dashboard' && <SmartStats />}
            {activeTab === 'vision' && <VisionModule />}
            {activeTab === 'diet' && <DietEngine />}
            {activeTab === 'tracking' && <BehaviorTracking />}
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

