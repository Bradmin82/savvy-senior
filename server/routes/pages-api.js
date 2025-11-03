const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { authenticateAdmin } = require('../middleware/auth');

// Get all pages (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single page by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, published: true });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get page by ID (admin only)
router.get('/edit/:id', authenticateAdmin, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create page (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  const page = new Page({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    metaDescription: req.body.metaDescription,
    published: req.body.published
  });

  try {
    const newPage = await page.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update page (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    
    Object.assign(page, req.body);
    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete page (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    
    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
