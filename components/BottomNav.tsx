
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background/90 backdrop-blur-2xl border-t border-border/50 flex items-center justify-around pt-3.5 pb-10 px-6 z-40">
      <button 
        onClick={() => setView('home')}
        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'home' ? 'text-primary' : 'text-muted hover:text-secondary'}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${currentView === 'home' ? 'filled' : ''}`}>check_circle</span>
        <span className="text-[9px] font-bold tracking-tight">Tarefas</span>
      </button>
      
      <button 
        onClick={() => setView('habits')}
        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'habits' ? 'text-primary' : 'text-muted hover:text-secondary'}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${currentView === 'habits' ? 'filled' : ''}`}>calendar_today</span>
        <span className="text-[9px] font-bold tracking-tight">Agenda</span>
      </button>
      
      <div className="w-14"></div> {/* Center Spacer for FAB */}
      
      <button 
        onClick={() => setView('stats')}
        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'stats' ? 'text-primary' : 'text-muted hover:text-secondary'}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${currentView === 'stats' ? 'filled' : ''}`}>bar_chart</span>
        <span className="text-[9px] font-bold tracking-tight">Metas</span>
      </button>
      
      <button className="flex flex-col items-center gap-1.5 text-muted/40 cursor-not-allowed">
        <span className="material-symbols-outlined text-[24px]">settings</span>
        <span className="text-[9px] font-bold tracking-tight">Ajustes</span>
      </button>
    </nav>
  );
};

export default BottomNav;
