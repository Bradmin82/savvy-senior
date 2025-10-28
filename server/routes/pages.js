const express = require('express');
const router = express.Router();
const services = require('../data/services');

// Home page
router.get('/', (req, res) => {
  res.render('pages/home', { services });
});

// Services page
router.get('/services', (req, res) => {
  res.render('pages/services', { services });
});

// Individual service detail pages
router.get('/services/:slug', (req, res) => {
  const service = services.find(s => s.slug === req.params.slug);
  if (!service) {
    return res.status(404).send('Service not found');
  }
  res.render('pages/service-detail', { service });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('pages/contact', { services });
});

// About page
router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;
