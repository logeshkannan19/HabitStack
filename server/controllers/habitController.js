const Habit = require('../models/Habit');
const CheckIn = require('../models/CheckIn');
const User = require('../models/User');

// @desc    Get all habits
// @route   GET /api/habits
// @access  Private
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.status(200).json({ success: true, count: habits.length, data: habits });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
exports.createHabit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const habit = await Habit.create(req.body);
    res.status(201).json({ success: true, data: habit });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
exports.updateHabit = async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    // Make sure user owns habit
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: habit });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    // Make sure user owns habit
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await habit.deleteOne();
    await CheckIn.deleteMany({ habit: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Check-in habit
// @route   POST /api/habits/:id/checkin
// @access  Private
exports.checkInHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    // Check if already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const checkInExists = await CheckIn.findOne({
      habit: req.params.id,
      date: { $gte: startOfDay },
    });

    if (checkInExists) {
      return res.status(400).json({ success: false, message: 'Already checked in today' });
    }

    // Create check-in
    await CheckIn.create({
      user: req.user.id,
      habit: req.params.id,
      date: new Date(),
    });

    // Update streak logic
    let currentStreak = habit.currentStreak + 1;
    let longestStreak = habit.longestStreak;
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    habit.currentStreak = currentStreak;
    habit.longestStreak = longestStreak;
    habit.lastCompleted = new Date();
    await habit.save();

    // Reward user with points
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: 10 },
    });

    res.status(200).json({ success: true, data: habit });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
