import React from 'react';
import { Check, Flame, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const HabitCard = ({ habit, onCheckIn }) => {
  const isCompletedToday = habit.lastCompleted && 
    new Date(habit.lastCompleted).toDateString() === new Date().toDateString();

  const categoriesColors = {
    Health: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20',
    Fitness: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20',
    Learning: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20',
    Productivity: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20',
    Mindfulness: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20',
    Other: 'bg-slate-100 text-slate-600 dark:bg-slate-900/20',
  };

  return (
    <div className="glass p-6 rounded-2xl group transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block",
            categoriesColors[habit.category]
          )}>
            {habit.category}
          </span>
          <h3 className="text-xl font-bold mb-1">{habit.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{habit.description}</p>
        </div>
        <button
          onClick={() => !isCompletedToday && onCheckIn(habit._id)}
          disabled={isCompletedToday}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
            isCompletedToday
              ? "bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-primary-500 text-slate-300 hover:text-primary-500 dark:hover:border-primary-400"
          )}
        >
          <Check className={cn("w-6 h-6", isCompletedToday ? "stroke-[3px]" : "")} />
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-semibold">
          <Flame className="w-4 h-4 fill-orange-500" />
          <span>{habit.currentStreak} day streak</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
          <Trophy className="w-4 h-4 fill-blue-500" />
          <span>Best: {habit.longestStreak}</span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
