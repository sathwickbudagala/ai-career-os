const express = require('express');
const Interview = require('../models/Interview');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all interviews
router.get('/', auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId })
      .sort({ date: 1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new interview
router.post('/', auth, async (req, res) => {
  try {
    const { company, role, date, type } = req.body;

    const interview = new Interview({
      userId: req.userId,
      company,
      role,
      date,
      type,
    });

    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete interview
router.delete('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;