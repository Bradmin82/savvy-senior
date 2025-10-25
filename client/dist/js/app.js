const API_BASE = '/api';

const services = [
    {
        name: 'Companionship & Care',
        description: 'Caring support to combat loneliness and isolation',
        icon: '👥',
        details: 'Regular visits, outings, and meaningful conversations with trained caregivers'
    },
    {
        name: 'Personal Care Assistance',
        description: 'Help with daily living activities',
        icon: '🏠',
        details: 'Bathing, dressing, grooming, and medication reminders'
    },
    {
        name: 'Meal Preparation',
        description: 'Nutritious meals tailored to dietary needs',
        icon: '🍲',
        details: 'Meal planning, preparation, and nutritional support'
    },
    {
        name: 'Household Management',
        description: 'Light housekeeping and maintenance support',
        icon: '🧹',
        details: 'Cleaning, laundry, and organization services'
    },
    {
        name: 'Transportation & Errands',
        description: 'Safe transportation to appointments and activities',
        icon: '🚗',
        details: 'Doctor visits, shopping, and social outings'
    },
    {
        name: 'Pet Care Support',
        description: 'Help caring for beloved pets',
        icon: '🐕',
        details: 'Walking, feeding, and companionship for pets'
    }
];

let expandedService = null;

function renderPage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <!-- Navigation -->
        <nav>
            <div class="nav-container">
                <div class="nav-brand">
                    <div class="logo-circle">SSC</div>
                    <span>Savvy Senior Consulting</span>
                </div>
                <div class="nav-links">
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-container">
                <h1>Compassionate Care for Your Loved Ones</h1>
                <p>Experience, Guidance, and Solutions for Senior Care</p>
                <a href="#contact" class="cta-button">Get Started Today</a>
            </div>
        </section>

        <!-- Services Section -->
        <section class="services-section" id="services">
            <div class="services-container">
                <h2 class="section-title">Our Services</h2>
                <div class="services-grid" id="servicesGrid"></div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section" id="about">
            <div class="about-container">
                <div class="about-text">
                    <h2>Why Choose Us?</h2>
                    <div class="about-item">
                        <div class="about-check">✓</div>
                        <div>
                            <h4>Experienced Caregivers</h4>
                            <p>Trained professionals dedicated to quality care</p>
                        </div>
                    </div>
                    <div class="about-item">
                        <div class="about-check">✓</div>
                        <div>
                            <h4>Personalized Solutions</h4>
                            <p>Care plans tailored to individual needs</p>
                        </div>
                    </div>
                    <div class="about-item">
                        <div class="about-check">✓</div>
                        <div>
                            <h4>24/7 Support</h4>
                            <p>Always available when you need us</p>
                        </div>
                    </div>
                    <div class="about-item">
                        <div class="about-check">✓</div>
                        <div>
                            <h4>Compassionate Approach</h4>
                            <p>We treat everyone like family</p>
                        </div>
                    </div>
                </div>
                <div class="about-card">
                    <div class="emoji">❤️</div>
                    <h3>Our Commitment</h3>
                    <p>At Savvy Senior Consulting, we believe every senior deserves quality care, dignity, and companionship. Our mission is to provide compassionate support that enriches lives and brings peace of mind to families.</p>
                    <p>With years of experience in senior care, we've built a reputation for excellence, reliability, and genuine care for our clients.</p>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section" id="contact">
            <div class="contact-container">
                <h2 class="contact-title">Get in Touch</h2>
                <p class="contact-subtitle">Ready to learn more? Contact us today for a free consultation</p>

                <div class="contact-info-grid">
                    <div class="contact-info-item">
                        <div class="icon">📞</div>
                        <h4>Phone</h4>
                        <p>(555) 123-4567</p>
                    </div>
                    <div class="contact-info-item">
                        <div class="icon">✉️</div>
                        <h4>Email</h4>
                        <p>info@savvyseniorconsulting.com</p>
                    </div>
                    <div class="contact-info-item">
                        <div class="icon">📍</div>
                        <h4>Service Area</h4>
                        <p>Serving the local community</p>
                    </div>
                </div>

                <div class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="name" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" placeholder="Your Email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="tel" id="phone" placeholder="Phone Number">
                        </div>
                        <div class="form-group">
                            <select id="service">
                                <option value="">Select Service of Interest</option>
                                ${services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="form-row" style="grid-column: 1 / -1;">
                        <div class="form-group full">
                            <textarea id="message" placeholder="Tell us about your needs..."></textarea>
                        </div>
                    </div>
                    <button class="submit-btn" onclick="submitForm()">Send Inquiry</button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer>
            <p>© 2025 Savvy Senior Consulting. All rights reserved.</p>
            <p class="footer-tagline">Experience. Guidance. Solutions.</p>
        </footer>
    `;

    renderServices();
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map((service, idx) => `
        <div class="service-card" onclick="toggleService(${idx})">
            <div class="service-icon">${service.icon}</div>
            <div class="service-name">${service.name}</div>
            <div class="service-description">${service.description}</div>
            ${expandedService === idx ? `
                <div class="service-details">${service.details}</div>
            ` : ''}
            <div class="chevron ${expandedService === idx ? 'expanded' : ''}">▼</div>
        </div>
    `).join('');
}

function toggleService(idx) {
    expandedService = expandedService === idx ? null : idx;
    renderServices();
}

async function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    if (!name || !email) {
        alert('Please fill in all required fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/inquiries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                serviceInterest: service,
                message
            })
        });

        if (response.ok) {
            alert('Thank you for your inquiry! We will contact you soon.');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('service').value = '';
            document.getElementById('message').value = '';
        } else {
            alert('Error sending inquiry. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending inquiry. Please try again.');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', renderPage);
