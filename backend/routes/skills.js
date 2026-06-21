const express = require('express');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all skills
router.get('/', auth, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new skill
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, progress } = req.body;

    const skill = new Skill({
      userId: req.userId,
      name,
      category,
      progress,
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update skill progress
router.put('/:id', auth, async (req, res) => {
  try {
    const { progress } = req.body;

    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { progress },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete skill
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;