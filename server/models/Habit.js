const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a habit name'],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    category: {
      type: String,
      enum: ['Health', 'Fitness', 'Learning', 'Productivity', 'Mindfulness', 'Other'],
      default: 'Other',
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly'],
      default: 'Daily',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCompleted: {
      type: Date,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Habit', habitSchema);
