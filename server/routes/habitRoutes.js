const express = require('express');
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
} = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getHabits).post(createHabit);
router.route('/:id').put(updateHabit).delete(deleteHabit);
router.route('/:id/checkin').post(checkInHabit);

module.exports = router;
