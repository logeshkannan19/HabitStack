const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./utils/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Dashboard stats endpoint
const Habit = require('./models/Habit');
const CheckIn = require('./models/CheckIn');
const { protect } = require('./middleware/auth');

app.get('/api/stats', protect, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    const checkIns = await CheckIn.find({ user: req.user.id });

    // Calculate completion rate
    const totalHabits = habits.length;
    const completedToday = await CheckIn.countDocuments({
      user: req.user.id,
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

    // Get weekly completion data for chart
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      return d;
    }).reverse();

    const chartData = await Promise.all(
      last7Days.map(async (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        const count = await CheckIn.countDocuments({
          user: req.user.id,
          date: { $gte: date, $lt: nextDay },
        });

        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          completions: count,
        };
      })
    );

    // Total points (XP) from user model
    const points = req.user.points || 0;

    // Calculate overall longest streak across all habits
    const longestStreak = habits.length > 0 
      ? Math.max(...habits.map(h => h.longestStreak || 0)) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalHabits,
        completedToday,
        completionRate,
        points,
        longestStreak,
        chartData,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
