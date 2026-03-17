import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HabitCard from '../components/HabitCard';
import api from '../services/api';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import HabitModal from '../components/HabitModal';
import { Plus, Trophy, Zap, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, habitsRes] = await Promise.all([
        api.get('/stats'),
        api.get('/habits')
      ]);
      setStats(statsRes.data.data);
      setHabits(habitsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (habitId) => {
    try {
      await api.post(`/habits/${habitId}/checkin`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              You've completed {stats?.completedToday} / {stats?.totalHabits} habits today. Keep it up!
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Habit</span>
          </button>
        </header>

        <HabitModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onHabitCreated={fetchData} 
        />

        {/* Stats Grid - Key Performance Indicators */}
        <section 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          aria-label="Key Performance Indicators"
        >
          {[
            { label: 'Total XP', value: stats?.points || '1,250', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/10' },
            { label: 'Longest Streak', value: `${stats?.longestStreak || 0} Days`, icon: Trophy, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/10' },
            { label: 'Completion rate', value: `${Math.round(stats?.completionRate || 0)}%`, icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="glass p-6 rounded-2xl flex items-center gap-4 hover:shadow-2xl transition-shadow"
            >
              <div className={`p-3 rounded-xl ${stat.bg}`} aria-hidden="true">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section aria-labelledby="habits-heading">
              <div className="flex justify-between items-center mb-6">
                <h2 id="habits-heading" className="text-xl font-bold">Your Habits</h2>
                <button 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1 transition-colors"
                  aria-label="View all habits"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid gap-6">
                {habits.slice(0, 3).map((habit) => (
                  <HabitCard key={habit._id} habit={habit} onCheckIn={handleCheckIn} />
                ))}
              </div>
            </section>

            <section className="glass p-6 rounded-2xl" aria-labelledby="activity-heading">
              <h2 id="activity-heading" className="text-xl font-bold mb-6">Activity Overview</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}}
                    />
                    <YAxis 
                      hide 
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completions" 
                      stroke="#0ea5e9" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorCompletions)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <section className="glass p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-primary-600 text-white border-none">
              <h2 className="text-xl font-bold mb-2">AI Insights ✨</h2>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Based on your productivity peak at 9 AM, we recommend moving your "Deep Work" habit 30 minutes earlier.
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-semibold transition-all">
                Learn more
              </button>
            </section>

            <section className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">Recent Badges</h2>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-amber-400 opacity-50" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
