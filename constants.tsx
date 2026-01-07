
import { Habit } from './types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Reunião de Equipe',
    description: 'Alinhamento semanal de metas e resultados.',
    time: '14:00 - 15:00',
    category: 'Trabalho',
    icon: 'groups',
    completed: false,
    streak: 5,
    frequency: 'Diária'
  },
  {
    id: '2',
    name: 'Revisar contrato cliente X',
    description: 'Verificar cláusulas de rescisão e prazos.',
    time: '16:30',
    category: 'Trabalho',
    icon: 'description',
    completed: false,
    streak: 2,
    frequency: 'Diária'
  },
  {
    id: '3',
    name: 'Beber 2L de Água',
    description: 'Hidratação essencial para manter o foco.',
    time: 'Todo o dia',
    category: 'Saúde',
    icon: 'water_drop',
    completed: false,
    streak: 12,
    frequency: 'Diária',
  },
  {
    id: '4',
    name: 'Comprar ração do gato',
    description: 'Passar no pet shop do shopping.',
    time: '18:00',
    category: 'Pessoal',
    icon: 'home',
    completed: false,
    streak: 0,
    frequency: 'Diária'
  },
  {
    id: '5',
    name: 'Enviar relatório mensal',
    description: 'Consolidação de KPIs e resultados financeiros.',
    time: '09:00',
    category: 'Trabalho',
    icon: 'analytics',
    completed: true,
    streak: 1,
    frequency: 'Mensal'
  },
  {
    id: '6',
    name: 'Meditação Guiada',
    description: '10 minutos de foco pleno.',
    time: '07:30',
    category: 'Saúde',
    icon: 'self_improvement',
    completed: true,
    streak: 15,
    frequency: 'Diária'
  }
];

export const CATEGORIES = [
  { id: 'saude', name: 'Saúde', color: 'text-sky-500' },
  { id: 'trabalho', name: 'Trabalho', color: 'text-purple-500' },
  { id: 'mente', name: 'Mente', color: 'text-pink-500' },
  { id: 'pessoal', name: 'Pessoal', color: 'text-emerald-500' },
];

export const WEEK_DAYS = [
  { label: 'DOM', value: 10 },
  { label: 'SEG', value: 11 },
  { label: 'TER', value: 12, active: true },
  { label: 'QUA', value: 13 },
  { label: 'QUI', value: 14 },
  { label: 'SEX', value: 15 },
  { label: 'SAB', value: 16 },
];
