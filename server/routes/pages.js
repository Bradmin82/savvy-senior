const express = require('express');
const router = express.Router();
const path = require('path');

// Service details data
const serviceDetails = {
  'companionship': {
    name: 'Companionship & Care',
    icon: '👥',
    description: 'Caring support to combat loneliness and isolation',
    details: 'Our companionship services are designed to combat isolation and loneliness, which are common challenges for seniors. Our caring caregivers provide regular visits, engaging conversations, and companionship activities. Whether it\'s playing games, sharing meals, or simply listening, we\'re here to bring joy and connection to your loved one\'s life.',
    benefits: [
      'Regular social interaction and meaningful conversations',
      'Assistance with hobbies and activities',
      'Accompaniment to social events and outings',
      'Emotional support and friendship',
      'Reduced feelings of isolation and loneliness'
    ]
  },
  'personal-care': {
    name: 'Personal Care Assistance',
    icon: '🏠',
    description: 'Help with daily living activities',
    details: 'We understand that personal care is a sensitive matter. Our trained caregivers provide respectful assistance with bathing, dressing, grooming, toileting, and medication reminders. We focus on maintaining your loved one\'s dignity and independence while ensuring their safety and health.',
    benefits: [
      'Bathing and showering assistance',
      'Dressing and grooming support',
      'Medication reminders and management',
      'Toileting and incontinence care',
      'Mobility assistance'
    ]
  },
  'meals': {
    name: 'Meal Preparation',
    icon: '🍲',
    description: 'Nutritious meals tailored to dietary needs',
    details: 'Proper nutrition is essential for senior health. Our caregivers will prepare nutritious, delicious meals tailored to your loved one\'s dietary needs and preferences. From meal planning to shopping and cooking, we ensure every meal is both healthy and enjoyable.',
    benefits: [
      'Custom meal planning based on dietary restrictions',
      'Grocery shopping assistance',
      'Meal preparation and cooking',
      'Special diet accommodations (diabetic, low-sodium, etc.)',
      'Kitchen cleanup'
    ]
  },
  'household': {
    name: 'Household Management',
    icon: '🧹',
    description: 'Light housekeeping and maintenance support',
    details: 'A clean, organized home is important for safety and well-being. Our services include light housekeeping, laundry, organizing, and light tidying. We help maintain a safe, comfortable living environment without being overwhelming or intrusive.',
    benefits: [
      'Light housekeeping and cleaning',
      'Laundry and linen changes',
      'Organizing and decluttering',
      'Trash removal',
      'Creating a safe, clean environment'
    ]
  },
  'transportation': {
    name: 'Transportation & Errands',
    icon: '🚗',
    description: 'Safe transportation to appointments and activities',
    details: 'Getting around can be challenging for seniors. We provide safe, reliable transportation to medical appointments, shopping trips, social outings, and other errands. Our caregivers ensure your loved one gets where they need to go with comfort and peace of mind.',
    benefits: [
      'Medical appointment transportation',
      'Grocery and pharmacy runs',
      'Social event accompaniment',
      'Errands and shopping assistance',
      'Safe, reliable door-to-door service'
    ]
  },
  'pet-care': {
    name: 'Pet Care Support',
    icon: '🐕',
    description: 'Help caring for beloved pets',
    details: 'Pets are an important part of many seniors\' lives. We provide pet care support including walking, feeding, grooming assistance, and playtime. This helps ensure both your loved one and their furry friends stay healthy and happy together.',
    benefits: [
      'Dog walking and exercise',
      'Feeding and water management',
      'Litter box cleaning',
      'Pet grooming assistance',
      'Playtime and companionship for pets'
    ]
  }
};

// Home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Services page
router.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/pages/services.html'));
});

// Individual service detail pages
router.get('/services/:slug', (req, res) => {
  const service = serviceDetails[req.params.slug];
  if (!service) {
    return res.status(404).send('Service not found');
  }
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} - Savvy Senior Consulting</title>
    <link rel="shortcut icon" type="image/ico/jpg" href="/assets/SavvySeniorConsultingLogo.png"/>
    <link rel="stylesheet" href="/css/style.css">
    <script src="/components/header.js"></script>
    <script src="/components/footer.js"></script>
</head>
<body>
    <app-header></app-header>


    <section class="services-section">
        <div class="services-container">
            <a href="/services" style="color: var(--primary-gold); text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 2rem;">← Back to All Services</a>
            
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="font-size: 5rem; margin-bottom: 1rem;">${service.icon}</div>
                <h1 class="section-title">${service.name}</h1>
                <p style="font-size: 1.2rem; color: #666;">${service.description}</p>
            </div>

            <div style="max-width: 800px; margin: 0 auto; background: var(--light-blue); padding: 3rem; border-radius: 1rem; border: 2px solid var(--soft-blue);">
                <h2 style="color: var(--dark-text); margin-bottom: 1.5rem; font-size: 1.8rem;">About This Service</h2>
                <p style="color: #555; line-height: 1.8; font-size: 1.1rem; margin-bottom: 2rem;">${service.details}</p>
                
                <h3 style="color: var(--dark-text); margin-bottom: 1rem; font-size: 1.5rem;">What We Offer:</h3>
                <ul style="list-style: none; padding: 0;">
                    ${service.benefits.map(benefit => `
                        <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--soft-blue); color: #555; font-size: 1.05rem;">
                            <span style="color: var(--primary-gold); margin-right: 0.5rem;">✓</span> ${benefit}
                        </li>
                    `).join('')}
                </ul>

                <div style="text-align: center; margin-top: 3rem;">
                    <a href="/contact" class="cta-button">Get Started - Contact Us Today</a>
                </div>
            </div>
        </div>
    </section>

    <app-footer></app-footer>
</body>
</html>
  `;
  
  res.send(html);
});

// Contact page
router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/pages/contact.html'));
});

// About page
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/pages/about.html'));
});

module.exports = router;

// Blog listing page
router.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/pages/blog.html'));
});

// Individual blog post page (dynamic)
router.get('/blog/:slug', async (req, res) => {
  try {
    const BlogPost = require('../models/BlogPost');
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    
    if (!post) {
      return res.status(404).send('Blog post not found');
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - Savvy Senior Consulting Blog</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="/components/header.js"></script>
    <script src="/components/footer.js"></script>
</head>
<body>
    <app-header></app-header>

    <article class="blog-post-detail">
        <div class="blog-post-container">
            <a href="/blog" style="color: var(--primary-gold); text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 2rem;">← Back to Blog</a>
            
            ${post.featuredImage ? `
                <img src="${post.featuredImage}" alt="${post.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 1rem; margin-bottom: 2rem;">
            ` : ''}
            
            <h1 class="blog-post-title">${post.title}</h1>
            
            <div class="blog-post-meta">
                <span>By ${post.author}</span>
                <span>•</span>
                <span>${new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <div class="blog-post-content">
                ${post.content}
            </div>
            
            <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--soft-blue);">
                <p style="margin-bottom: 1rem;">Interested in our services?</p>
                <a href="/contact" class="cta-button">Contact Us Today</a>
            </div>
        </div>
    </article>

    <app-footer></app-footer>
</body>
</html>
    `;
    
    res.send(html);
  } catch (err) {
    res.status(500).send('Error loading blog post');
  }
});
