import express from 'express';
import Blog from '../models/Blog.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({ where: { published: true }, order: [['createdAt', 'DESC']] });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    await Blog.update(req.body, { where: { id: req.params.id } });
    const blog = await Blog.findByPk(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Blog.destroy({ where: {} });
    res.json({ message: 'All blogs deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
