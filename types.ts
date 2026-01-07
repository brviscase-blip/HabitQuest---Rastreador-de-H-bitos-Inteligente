
export interface Habit {
  id: string;
  name: string;
  description?: string;
  time: string;
  category: string;
  icon: string;
  completed: boolean;
  streak: number;
  frequency: 'Diária' | 'Semanal' | 'Mensal';
  targetValue?: number;
  unit?: string;
}

export interface DailyLog {
  date: string;
  completedHabitIds: string[];
}

export type View = 'home' | 'stats' | 'add' | 'habits' | 'profile';
