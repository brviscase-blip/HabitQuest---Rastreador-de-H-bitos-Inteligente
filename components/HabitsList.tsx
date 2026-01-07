
import React from 'react';
import { Habit } from '../types';

interface HabitsListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
}

const HabitsList: React.FC<HabitsListProps> = ({ habits, onToggle }) => {
  const completedCount = habits.filter(h => h.completed).length;
  const progress = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="flex flex-col w-full min-h-screen px-5 pt-10 pb-10 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-10">
        <div className="flex flex-col">
          <span className="text-muted text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Gerenciamento</span>
          <h1 className="text-2xl font-semibold tracking-tight">Atividades Ativas</h1>
        </div>
        <button className="flex items-center justify-center size-9 rounded-lg border border-border bg-surface/40 hover:bg-surface-hover transition-colors">
          <span className="material-symbols-outlined text-[20px] text-secondary">tune</span>
        </button>
      </header>

      {/* Modern Status Card */}
      <section className="mb-10">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Objetivo Semanal</h2>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Alta Performance</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono font-medium text-white">{progress}%</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-[10px] text-muted font-medium uppercase tracking-tight">{completedCount} concluídos hoje</span>
            <div className="flex items-center gap-1.5 text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full">
               <span className="material-symbols-outlined text-[14px] filled">local_fire_department</span>
               <span className="text-[10px] font-bold">Streak recorde: 15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main List */}
      <section className="flex flex-col gap-3">
        {habits.map((habit) => (
          <div 
            key={habit.id}
            onClick={() => onToggle(habit.id)}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
              habit.completed ? 'bg-transparent border-border/40 opacity-40 grayscale' : 'bg-surface border-border hover:border-accent'
            }`}
          >
            <div className={`size-11 rounded-lg flex items-center justify-center transition-all bg-background border border-border/50 group-hover:border-primary/40`}>
              <span className={`material-symbols-outlined text-[24px] ${habit.completed ? 'text-muted' : 'text-primary opacity-80'}`}>{habit.icon}</span>
            </div>
            
            <div className="flex-1">
              <h4 className={`text-sm font-medium tracking-tight ${habit.completed ? 'line-through text-muted' : 'text-white'}`}>
                {habit.name}
              </h4>
              <div className="flex items-center gap-2.5 mt-1.5">
                <span className="text-[10px] font-mono text-muted">{habit.time}</span>
                <span className="size-1 rounded-full bg-muted/40"></span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary">{habit.category}</span>
              </div>
            </div>

            <button className={`flex size-6 items-center justify-center rounded-md border transition-all ${
              habit.completed 
              ? 'bg-primary border-primary text-black shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
              : 'border-accent bg-transparent text-transparent group-hover:border-primary'
            }`}>
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </button>
          </div>
        ))}

        {habits.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center opacity-30">
            <span className="material-symbols-outlined text-[48px] mb-4">inventory_2</span>
            <p className="text-sm font-medium uppercase tracking-widest">Lista Vazia</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HabitsList;
