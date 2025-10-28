const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ available: true });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create service (admin)
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    details: req.body.details
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    if (req.body.name) service.name = req.body.name;
    if (req.body.description) service.description = req.body.description;
    if (req.body.icon) service.icon = req.body.icon;
    if (req.body.details) service.details = req.body.details;
    if (req.body.available !== undefined) service.available = req.body.available;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
