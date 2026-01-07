
import React, { useState } from 'react';
import { Habit } from '../types';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

interface StatsProps {
  habits: Habit[];
}

const mockChartData = [
  { name: '01/03', v: 4 }, { name: '02/03', v: 7 }, { name: '03/03', v: 5 },
  { name: '04/03', v: 8 }, { name: '05/03', v: 6 }, { name: '06/03', v: 9 }, { name: '07/03', v: 10 }
];

const Stats: React.FC<StatsProps> = ({ habits }) => {
  const [timeframe, setTimeframe] = useState('Semana');

  return (
    <div className="flex flex-col w-full min-h-screen px-5 pt-8 pb-10 max-w-md mx-auto">
      <header className="flex items-center justify-between mb-10">
        <div>
          <span className="text-muted text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">Analytics</span>
          <h2 className="text-2xl font-semibold tracking-tight">Performance</h2>
        </div>
        <div className="flex bg-surface p-1 rounded-lg border border-border">
          {['Semana', 'Mês'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-md transition-all ${
                timeframe === t ? 'bg-primary text-black' : 'text-secondary hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-2 mb-3">
             <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
             <span className="text-muted text-[9px] font-bold uppercase tracking-[0.2em]">Foco atual</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-white">12</span>
            <span className="text-secondary text-[11px] font-medium">dias</span>
          </div>
          <p className="mt-2 text-[10px] text-primary/70 font-semibold">+14% vs semana anterior</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-2 mb-3">
             <span className="material-symbols-outlined text-primary text-[18px]">ads_click</span>
             <span className="text-muted text-[9px] font-bold uppercase tracking-[0.2em]">Taxa Êxito</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-white">92%</span>
          </div>
          <p className="mt-2 text-[10px] text-primary/70 font-semibold">Consistência estável</p>
        </div>
      </div>

      {/* Professional Data Visualization */}
      <div className="mb-10 p-6 rounded-2xl bg-surface border border-border">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-white">Histórico de Conclusão</h3>
            <span className="text-[10px] text-muted font-medium mt-0.5 tracking-tight">Métrica de volume diário</span>
          </div>
          <button className="size-8 flex items-center justify-center rounded-lg border border-border hover:bg-surface-hover transition-colors">
            <span className="material-symbols-outlined text-[18px] text-secondary">download</span>
          </button>
        </div>
        
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.15}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 500 }}
                dy={15}
              />
              <YAxis 
                hide
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '11px', color: '#fafafa' }}
                cursor={{ stroke: '#52525b', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey="v" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#chartGradient)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Performance */}
      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Eficiência por Setor</h3>
        </div>
        <div className="space-y-3.5">
          {[
            { name: 'Desenvolvimento Profissional', val: 95 },
            { name: 'Saúde e Vitalidade', val: 78 },
            { name: 'Gestão de Foco', val: 62 },
          ].map((cat) => (
            <div key={cat.name} className="p-4 rounded-xl bg-surface/40 border border-border hover:border-accent transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-white">{cat.name}</span>
                <span className="text-[10px] font-mono font-bold text-primary">{cat.val}%</span>
              </div>
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-in-out" 
                  style={{ width: `${cat.val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stats;
