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
                    <div class="nav-links">
                        <a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
                        <a href="/services" class="${currentPath.startsWith('/services') ? 'active' : ''}">Services</a>
                        <a href="/blog" class="${currentPath.startsWith('/blog') ? 'active' : ''}">Blog</a>
                        <a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About</a>
                        <a href="/contact" class="${currentPath === '/contact' ? 'active' : ''}">Contact</a>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Register the custom element
customElements.define('app-header', Header);
