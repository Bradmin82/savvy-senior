// Header Component
class Header extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        
        this.innerHTML = `
            <nav>
                <div class="nav-container">
                    <a href="/" class="nav-brand">
                        <div class="logo-circle">
                            <img src="/assets/SavvySeniorConsultingLogo.png" alt="Savvy Senior Consulting">
                        </div>
                        <span>Savvy Senior Consulting</span>
                    </a>
                    
                    <button class="hamburger" id="hamburger" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div class="nav-links" id="navLinks">
                        <a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
                        <a href="/services" class="${currentPath.startsWith('/services') ? 'active' : ''}">Services</a>
                        <a href="/blog" class="${currentPath.startsWith('/blog') ? 'active' : ''}">Blog</a>
                        <a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About</a>
                        <a href="/contact" class="${currentPath === '/contact' ? 'active' : ''}">Contact</a>
                    </div>
                </div>
            </nav>
        `;
        
        // Add hamburger menu functionality
        const hamburger = this.querySelector('#hamburger');
        const navLinks = this.querySelector('#navLinks');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            console.log('clicked hamburger', hamburger.classList);
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Register the custom element
customElements.define('app-header', Header);
