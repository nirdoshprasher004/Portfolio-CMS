import express from 'express';
import Skill from '../models/Skill.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Skill.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Skill.destroy({ where: {} });
    res.json({ message: 'All skills deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
