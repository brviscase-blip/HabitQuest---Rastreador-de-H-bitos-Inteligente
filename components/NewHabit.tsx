
import React, { useState } from 'react';
import { Habit } from '../types';

interface NewHabitProps {
  onAdd: (habit: Omit<Habit, 'id' | 'completed' | 'streak'>) => void;
  onCancel: () => void;
}

const ICONS = [
  'water_drop', 'fitness_center', 'menu_book', 
  'self_improvement', 'code', 'meditation', 
  'directions_run', 'payments', 'work'
];

const NewHabit: React.FC<NewHabitProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Trabalho');
  const [freq, setFreq] = useState<Habit['frequency']>('Diária');
  const [time, setTime] = useState('09:00');
  const [icon, setIcon] = useState('work');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      description: '',
      frequency: freq,
      time,
      icon,
      category,
    });
  };

  return (
    <div className="flex flex-col w-full h-screen h-[100dvh] bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Header Fixo para evitar saltos de layout */}
      <header className="flex items-center justify-between px-6 pt-10 pb-6 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-border/10">
        <button 
          onClick={onCancel} 
          className="text-secondary hover:text-white transition-all flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Voltar</span>
        </button>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">Nova Atividade</h2>
        <div className="w-16"></div>
      </header>

      {/* Conteúdo com scroll suave e sem barras visíveis */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8 pb-40 space-y-12">
        
        {/* Campo de Nome: Foco na clareza e tipografia */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between px-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Identificação</label>
            <span className={`text-[9px] font-mono ${name.length > 35 ? 'text-red-500' : 'text-muted'}`}>
              {name.length}/40
            </span>
          </div>
          <div className="relative">
            <input 
              value={name}
              autoFocus
              maxLength={40}
              onChange={e => setName(e.target.value)}
              className="w-full bg-surface/30 border border-border rounded-2xl px-5 py-4 text-xl font-light text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/30 tracking-tight"
              placeholder="Ex: Revisão de Fluxo" 
            />
          </div>
        </section>

        {/* Grade de Configuração: Horário e Frequência */}
        <section className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted px-1">Horário</label>
            <div className="bg-surface/40 border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3 group focus-within:border-primary/40 transition-all">
               <span className="material-symbols-outlined text-muted text-[18px] group-focus-within:text-primary transition-colors">schedule</span>
               <input 
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="bg-transparent border-none text-sm font-mono text-white font-medium focus:ring-0 p-0 w-full"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted px-1">Repetição</label>
            <div className="bg-surface/40 flex p-1 rounded-2xl border border-border h-[54px]">
              {['Diária', 'Semanal'].map(f => (
                <button
                  key={f}
                  onClick={() => setFreq(f as any)}
                  className={`flex-1 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                    freq === f 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-secondary hover:text-white'
                  }`}
                >
                  {f === 'Diária' ? 'Dia' : 'Sem.'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Seletor de Categoria: Pílulas elegantes */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted px-1">Segmento</label>
          <div className="flex flex-wrap gap-2">
             {['Trabalho', 'Saúde', 'Foco', 'Mente'].map(c => (
               <button 
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.15em] transition-all ${
                  category === c 
                  ? 'bg-white text-black border-white shadow-xl shadow-white/5' 
                  : 'border-border text-secondary hover:border-muted hover:text-white bg-surface/20'
                }`}
               >
                 {c}
               </button>
             ))}
          </div>
        </section>

        {/* Grade de Ícones: Organizada e harmônica */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted px-1">Ícone Representativo</label>
          <div className="grid grid-cols-5 gap-3">
            {ICONS.map(i => (
              <button 
                key={i}
                onClick={() => setIcon(i)}
                className={`aspect-square flex items-center justify-center rounded-2xl border transition-all ${
                  icon === i 
                  ? 'bg-primary/5 text-primary border-primary/40 ring-1 ring-primary/10' 
                  : 'bg-surface/20 text-secondary border-border hover:border-muted'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{i}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Botão de Ação: Flutuante e centralizado sem obstruções */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-12 z-30 pointer-events-none">
        <button 
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full h-14 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-[0.97] disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl pointer-events-auto"
        >
          Confirmar Atividade
        </button>
      </div>
    </div>
  );
};

export default NewHabit;
