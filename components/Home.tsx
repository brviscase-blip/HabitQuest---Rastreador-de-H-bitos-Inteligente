
import React, { useState } from 'react';
import { Habit } from '../types';

interface HomeProps {
  habits: Habit[];
  onToggle: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ habits, onToggle }) => {
  const [activeFilter, setActiveFilter] = useState('Tudo');
  
  const completedHabits = habits.filter(h => h.completed);
  const pendingHabits = habits.filter(h => !h.completed);
  
  // Para simular a seção de "Prioridade" da imagem, vamos considerar os 2 primeiros como prioridade
  const priorityHabits = pendingHabits.slice(0, 2);
  const todayHabits = pendingHabits.slice(2);
  
  const progress = habits.length > 0 ? Math.round((completedHabits.length / habits.length) * 100) : 0;
  
  const filters = ['Tudo', 'Trabalho', 'Pessoal', 'Urgente'];

  return (
    <div className="flex flex-col w-full min-h-screen px-6 pt-8 pb-10 max-w-md mx-auto">
      {/* Header Estilo Referência */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-full bg-cover bg-center ring-2 ring-border" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop")' }}
          />
          <div className="flex flex-col">
            <span className="text-secondary text-[10px] font-bold uppercase tracking-wider">Bem-vinda de volta</span>
            <h1 className="text-lg font-bold text-white tracking-tight">Jéssica</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-secondary text-[11px] font-semibold">24 Out</span>
          <button className="relative flex items-center justify-center size-9 rounded-full bg-surface border border-border">
            <span className="material-symbols-outlined text-[20px] text-secondary">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-1.5 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Card de Produtividade Diária */}
      <section className="mb-8">
        <div className="p-6 rounded-2xl bg-[#1e2530] border border-border/50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-white text-base font-bold">Produtividade Diária</h2>
              <p className="text-secondary text-[11px] leading-relaxed max-w-[160px]">Mantenha o foco nos seus objetivos</p>
            </div>
            <div className="bg-surface/60 px-3 py-2 rounded-xl border border-border text-center">
              <span className="text-[10px] font-bold text-white block leading-none">{completedHabits.length}/{habits.length}</span>
              <span className="text-[9px] text-secondary uppercase font-bold tracking-tight">Concluídas</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <span className="text-4xl font-bold text-white tracking-tight">{progress}%</span>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.4)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtros em Pílulas */}
      <section className="mb-8 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
              activeFilter === filter 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-surface text-secondary border border-border'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Seção PRIORIDADE */}
      <section className="mb-8">
        <h3 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4">Prioridade</h3>
        <div className="space-y-3">
          {priorityHabits.map((habit) => (
            <TaskCard key={habit.id} habit={habit} onToggle={onToggle} />
          ))}
        </div>
      </section>

      {/* Seção HOJE */}
      <section className="mb-8">
        <h3 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4">Hoje</h3>
        <div className="space-y-3">
          {todayHabits.map((habit) => (
            <TaskCard key={habit.id} habit={habit} onToggle={onToggle} />
          ))}
        </div>
      </section>

      {/* Seção CONCLUÍDOS */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-secondary text-[11px] font-black uppercase tracking-[0.2em]">Concluídos ({completedHabits.length})</h3>
          <span className="material-symbols-outlined text-secondary text-[18px]">keyboard_arrow_down</span>
        </div>
        <div className="space-y-3 opacity-60">
          {completedHabits.map((habit) => (
            <TaskCard key={habit.id} habit={habit} onToggle={onToggle} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Componente Interno para o Card de Tarefa
// Explicitly typed as React.FC to allow 'key' prop when used in map functions
const TaskCard: React.FC<{ habit: Habit; onToggle: (id: string) => void }> = ({ habit, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(habit.id)}
      className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
        habit.completed ? 'bg-transparent border-border/30' : 'bg-surface border-border hover:border-accent'
      }`}
    >
      <input 
        type="checkbox" 
        checked={habit.completed}
        readOnly
        className="custom-checkbox mt-0.5"
      />
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`text-sm font-semibold tracking-tight transition-all ${habit.completed ? 'text-secondary line-through' : 'text-white'}`}>
            {habit.name}
          </h4>
          {!habit.completed && (
            <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded ${
              habit.category === 'Urgente' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {habit.category === 'Urgente' ? 'Alta' : 'Média'}
            </span>
          )}
        </div>
        <p className="text-[11px] text-secondary mb-3 leading-snug">
          {habit.description || 'Alinhamento de metas e resultados diários.'}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span className="text-[10px] font-medium tracking-tight">{habit.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[14px]">{habit.icon}</span>
            <span className="text-[10px] font-medium tracking-tight uppercase tracking-wider">{habit.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
