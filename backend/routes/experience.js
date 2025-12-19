import express from 'express';
import Experience from '../models/Experience.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.findAll({ order: [['startDate', 'DESC']] });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Experience.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Experience.destroy({ where: {} });
    res.json({ message: 'All experiences deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
