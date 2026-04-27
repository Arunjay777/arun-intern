import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { ai, SYSTEM_INSTRUCTIONS } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const AIChatSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Neural link established. Peak performance mode active. How can I assist your biomechanical output?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!ai) throw new Error("AI not configured");

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'bot' ? 'model' : 'user', parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS,
        }
      });

      setMessages(prev => [...prev, { role: 'bot', content: response.text || "I'm processing that session data..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Connection disrupted. Stay focused on the set." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 bottom-0 w-80 glass-panel z-50 flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-obsidian">
            <div className="flex items-center gap-2 text-brand">
              <Bot size={20} />
              <span className="font-mono font-bold tracking-tighter uppercase text-sm">Motivator AI</span>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[90%] p-3 rounded-lg text-sm",
                  m.role === 'user' ? "bg-brand text-black rounded-tr-none" : "bg-white/10 text-white rounded-tl-none border border-white/5"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-brand/50 text-xs font-mono">
                <Sparkles size={14} className="animate-spin" />
                ANALYZING PHASES...
              </div>
            )}
          </div>

          <div className="p-4 bg-obsidian border-top border-white/10">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about form or diet..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-brand"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1.5 text-brand hover:text-white transition-colors"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
