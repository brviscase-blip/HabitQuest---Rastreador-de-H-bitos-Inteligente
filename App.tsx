
import React, { useState } from 'react';
import { Habit, View } from './types';
import { INITIAL_HABITS } from './constants';
import Home from './components/Home';
import Stats from './components/Stats';
import NewHabit from './components/NewHabit';
import HabitsList from './components/HabitsList';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const addHabit = (newHabit: Omit<Habit, 'id' | 'completed' | 'streak'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      completed: false,
      streak: 0,
    };
    setHabits(prev => [...prev, habit]);
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home habits={habits} onToggle={toggleHabit} />;
      case 'stats':
        return <Stats habits={habits} />;
      case 'add':
        return <NewHabit onAdd={addHabit} onCancel={() => setView('home')} />;
      case 'habits':
        return <HabitsList habits={habits} onToggle={toggleHabit} />;
      default:
        return <Home habits={habits} onToggle={toggleHabit} />;
    }
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] max-w-md mx-auto relative bg-background shadow-[0_0_100px_rgba(0,0,0,0.8)] text-[#c9d1d9] border-x border-border/50 overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderView()}
        {/* Adiciona espaçamento extra no final para não sumir atrás da nav */}
        {view !== 'add' && <div className="h-40" aria-hidden="true"></div>}
      </main>
      
      {view !== 'add' && (
        <>
          <BottomNav currentView={view} setView={setView} />
          <button 
            onClick={() => setView('add')}
            className="fixed bottom-24 right-8 size-14 bg-primary rounded-full shadow-[0_8px_30px_rgba(59,130,246,0.5)] flex items-center justify-center text-white hover:scale-[1.1] transition-all z-50 group"
            aria-label="Adicionar Hábito"
          >
            <span className="material-symbols-outlined text-[32px] font-light group-hover:rotate-90 transition-transform duration-500">add</span>
          </button>
        </>
      )}
    </div>
  );
};

export default App;
