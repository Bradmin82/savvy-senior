// Footer Component
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
            <p style="font-size: 0.9rem;">
            Serving Orange County, California | 
            <a href="tel:9494563310" style="color: #fff; text-decoration: none;">(949) 456-3310</a> | 
            <a href="mailto:bweldy82@gmail.com" style="color: #fff; text-decoration: none;">bweldy82@gmail.com</a>
            </p>
            <p class="footer-tagline" style="margin-top: 1.5rem;">Experience. Guidance. Solutions.</p>
            <p style="font-size: 0.9rem; margin-top: 1.5rem;"><a href="/admin/login.html" target="_blank" style="cursor: default; text-decoration: none; color: #fff;">©</a> 2025 Savvy Senior Consulting. All rights reserved.</p>
            </footer>
        `;
    }
}

// Register the custom element
customElements.define('app-footer', Footer);
