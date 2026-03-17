import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HabitCard from '../components/HabitCard';
import HabitModal from '../components/HabitModal';
import api from '../services/api';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';

const HabitsList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get('/habits');
      setHabits(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (habitId) => {
    try {
      await api.post(`/habits/${habitId}/checkin`);
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredHabits = habits.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Habits</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage and track all your active habits.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Habit</span>
          </button>
        </header>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search habits..." 
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 glass rounded-xl flex items-center gap-2 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHabits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} onCheckIn={handleCheckIn} />
          ))}
          {filteredHabits.length === 0 && (
            <div className="col-span-full py-20 text-center glass rounded-2xl">
              <p className="text-slate-500">No habits found. Start by creating one!</p>
            </div>
          )}
        </div>

        <HabitModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onHabitCreated={fetchHabits} 
        />
      </main>
    </div>
  );
};

export default HabitsList;
