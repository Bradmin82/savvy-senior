const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Create inquiry
router.post('/', async (req, res) => {

console.log('Received inquiry data:', req.body);

  const inquiry = new Inquiry({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    serviceInterest: req.body.serviceInterest
  });

  try {
    const newInquiry = await inquiry.save();
    
    // Send email notification to you
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'bweldy82@gmail.com',
      subject: `New Inquiry from ${req.body.name} - ${req.body.serviceInterest || 'General'}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${req.body.serviceInterest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message || 'No message provided'}</p>
      `
    };

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Thank you for contacting Savvy Senior Consulting',
      html: `
        <h2>Thank You for Contacting Us!</h2>
        <p>Hello ${req.body.name},</p>
        <p>We received your inquiry regarding <strong>${req.body.serviceInterest || 'our services'}</strong>.</p>
        <p>Our team will contact you soon at <strong>${req.body.phone || req.body.email}</strong>.</p>
        <p>If you have any questions in the meantime, feel free to call us at <strong>(949) 456-3310</strong>.</p>
        <br>
        <p>Best regards,<br>
        <strong>Savvy Senior Consulting Team</strong><br>
        Orange County, California<br>
        (949) 456-3310</p>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);
    
    console.log('Emails sent successfully to:', req.body.email, 'and bweldy82@gmail.com');
    
    res.status(201).json(newInquiry);
  } catch (err) {
    console.error('Error in inquiry route:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update inquiry status
router.patch('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    
    if (req.body.status) inquiry.status = req.body.status;

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
