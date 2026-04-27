import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Battery, Coffee, Zap, Info, Settings2, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Meal } from '../types';
import { ai } from '../lib/gemini';

const goalOptions = [
  { id: 'muscle', label: 'Hypertrophy / Muscle Gain', icon: Battery },
  { id: 'fatloss', label: 'Lipid Oxidation / Fat Loss', icon: Zap },
  { id: 'perf', label: 'Athletic Performance', icon: Coffee },
];

const dietTypes = ['Balanced', 'High Protein', 'Keto', 'Vegan', 'Paleo'];

export const DietEngine = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({
    goal: 'muscle',
    dietType: 'Balanced',
    calories: 2800,
  });
  
  const [generatedMeals, setGeneratedMeals] = useState<Meal[]>([
    { time: '08:00', name: 'Pre-Workout Fuel', macros: { protein: 30, carbs: 45, fats: 10 }, calories: 390 },
    { time: '12:30', name: 'Hypertrophy Lunch', macros: { protein: 50, carbs: 60, fats: 15 }, calories: 575 },
    { time: '16:00', name: 'Metabolic Snack', macros: { protein: 20, carbs: 10, fats: 15 }, calories: 255 },
    { time: '19:30', name: 'Recovery Dinner', macros: { protein: 40, carbs: 30, fats: 12 }, calories: 388 },
  ]);

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      if (!ai) throw new Error("AI not configured");
      
      const prompt = `Generate a daily meal plan for a fitness enthusiast with the following profile:
      - Goal: ${preferences.goal}
      - Diet Type: ${preferences.dietType}
      - Calorie Target: ${preferences.calories} kcal
      
      Provide exactly 4 meals in a JSON array format where each object has:
      - time (HH:MM string)
      - name (string)
      - macros (object with protein, carbs, fats as numbers in grams)
      - calories (number)
      
      Response should ONLY be the JSON array.`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      const text = response.text || "[]";
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setGeneratedMeals(parsed);
        setShowConfig(false);
      }
    } catch (error) {
      console.error("Meal generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg">
            <Apple className="text-brand" size={20} />
          </div>
          <div>
            <h2 className="font-mono font-bold uppercase tracking-widest text-sm">Diet Engine 2.0</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">AI-Driven Nutritional Calibration</p>
          </div>
        </div>
        <button 
          onClick={() => setShowConfig(!showConfig)}
          className="glass-panel px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border-brand/20 hover:bg-brand/10 flex items-center gap-2"
        >
          <Settings2 size={14} className={cn("transition-transform", showConfig && "rotate-180")} />
          Configure Protocol
        </button>
      </div>

      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-panel p-6 mb-6 border-brand/10 bg-brand/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Goal Selection</label>
                  <div className="flex flex-col gap-2">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setPreferences({ ...preferences, goal: goal.id })}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border text-xs font-mono transition-all",
                          preferences.goal === goal.id 
                            ? "bg-brand text-white border-brand" 
                            : "bg-obsidian border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        <goal.icon size={16} />
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Diet Style</label>
                    <select 
                      value={preferences.dietType}
                      onChange={(e) => setPreferences({ ...preferences, dietType: e.target.value })}
                      className="w-full bg-obsidian border border-zinc-800 rounded-xl p-3 text-xs font-mono focus:border-brand outline-none text-white"
                    >
                      {dietTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold flex justify-between">
                      Daily Calories <span>{preferences.calories} kcal</span>
                    </label>
                    <input 
                      type="range" min="1500" max="4500" step="50"
                      value={preferences.calories}
                      onChange={(e) => setPreferences({ ...preferences, calories: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-4">
                  <button 
                    onClick={generatePlan}
                    disabled={isGenerating}
                    className="w-full bg-brand text-white py-4 rounded-2xl font-mono font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand/20 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate AI Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Prot (G)', value: Math.round(generatedMeals.reduce((acc, m) => acc + (m.macros?.protein || 0), 0)), color: 'text-brand' },
          { label: 'Carbs (G)', value: Math.round(generatedMeals.reduce((acc, m) => acc + (m.macros?.carbs || 0), 0)), color: 'text-indigo-400' },
          { label: 'Fats (G)', value: Math.round(generatedMeals.reduce((acc, m) => acc + (m.macros?.fats || 0), 0)), color: 'text-rose-400' },
          { label: 'Energy (KCAL)', value: Math.round(generatedMeals.reduce((acc, m) => acc + (m.calories || 0), 0)), color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 border-l-2 border-brand/30">
             <div className="flex justify-between items-center mb-1">
               <span className="text-[10px] font-mono text-zinc-500 uppercase">{stat.label}</span>
               <Info size={12} className="text-zinc-800" />
             </div>
             <span className={cn("text-xl font-mono font-bold tracking-tighter", stat.color)}>
               {stat.value}
             </span>
          </div>
        ))}
      </div>

      <div className="glass-panel overflow-hidden border-zinc-800">
        <table className="w-full text-left font-mono text-[11px]">
          <thead>
            <tr className="bg-zinc-900/50 uppercase tracking-widest border-b border-zinc-800">
              <th className="p-4 font-bold text-zinc-500">Time</th>
              <th className="p-4 font-bold text-zinc-500">Meal Name</th>
              <th className="p-4 font-bold text-zinc-500">Macros (P/C/F)</th>
              <th className="p-4 font-bold text-zinc-500">Kcal</th>
              <th className="p-4 font-bold text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {generatedMeals.map((meal, i) => (
              <tr key={i} className="border-b border-zinc-800 hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-brand font-bold">{meal.time}</td>
                <td className="p-4 font-bold uppercase text-zinc-200">{meal.name}</td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-brand/70 text-[9px] uppercase font-bold">P: {meal.macros?.protein}g</span>
                        <div className="w-12 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-brand" style={{ width: `${Math.min(100, (meal.macros?.protein || 0) * 1.5)}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-indigo-400/70 text-[9px] uppercase font-bold">C: {meal.macros?.carbs}g</span>
                        <div className="w-12 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (meal.macros?.carbs || 0) * 1.2)}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-rose-400/70 text-[9px] uppercase font-bold">F: {meal.macros?.fats}g</span>
                        <div className="w-12 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: `${Math.min(100, (meal.macros?.fats || 0) * 2.5)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-100 font-bold">{meal.calories}</span>
                    <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand to-indigo-500" 
                        style={{ width: `${Math.min(100, (meal.calories / 800) * 100)}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                   <div className="px-2 py-0.5 rounded border border-brand/20 bg-brand/5 text-[9px] text-brand uppercase font-bold w-fit">
                     Sync Ready
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

