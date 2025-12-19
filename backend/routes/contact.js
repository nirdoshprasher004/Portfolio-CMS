import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Here you would typically send an email or save to database
    console.log('Contact form submission:', { name, email, message });
    
    // For now, just return success
    res.json({ message: 'Message received! We will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
