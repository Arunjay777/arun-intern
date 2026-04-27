export interface TelemetryData {
  heartRate: number;
  calories: number;
  reps: number;
  totalSets: number;
  timeRemaining: string;
}

export interface WorkoutSession {
  id: string;
  name: string;
  category: "Strength" | "Cardio" | "Mobility";
  intensity: "Low" | "Medium" | "High";
  duration: number; // minutes
}

export interface Meal {
  time: string;
  name: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  calories: number;
}
