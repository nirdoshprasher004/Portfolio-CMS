import express from 'express';
import About from '../models/About.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if about section already exists
    const existingAbout = await About.findOne();
    
    if (existingAbout) {
      // Update existing record
      await About.update(req.body, { where: { id: existingAbout.id } });
      const updatedAbout = await About.findByPk(existingAbout.id);
      res.json(updatedAbout);
    } else {
      // Create new record
      const about = await About.create(req.body);
      res.status(201).json(about);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    await About.update(req.body, { where: { id: req.params.id } });
    const about = await About.findByPk(req.params.id);
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
