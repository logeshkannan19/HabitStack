const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    habit: {
      type: mongoose.Schema.ObjectId,
      ref: 'Habit',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate check-ins for the same habit on the same day
checkInSchema.index({ habit: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', checkInSchema);
