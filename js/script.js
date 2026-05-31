// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.querySelector('nav');

    mobileMenuIcon.addEventListener('click', function() {
        nav.classList.toggle('active');
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                showMessage(getLocalized('formError') || 'Please fill in all fields', 'error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage(getLocalized('formEmailError') || 'Please enter a valid email address', 'error');
                return;
            }

            setTimeout(() => {
                showMessage(getLocalized('formSuccess') || 'Thank you for your message!', 'success');
                contactForm.reset();
            }, 1000);
        });
    }

    function showMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Newsletter form handling
    function setupNewsletter(formId, messageId, emailId) {
        const form = document.getElementById(formId);
        const msg = document.getElementById(messageId);
        const emailInput = document.getElementById(emailId);

        if (!form || !msg || !emailInput) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!email) return;

            const success = getLocalized('newsletterSuccess') || 'Thanks for subscribing!';
            msg.textContent = success;
            msg.className = 'newsletter-message success';
            msg.style.display = 'block';
            emailInput.value = '';
        });
    }

    setupNewsletter('newsletterForm', 'newsletterMessage', 'newsletterEmail');
    setupNewsletter('footerNewsletterForm', 'newsletterMessage', 'footerNewsletterEmail');

    // Helper: get localized text from lang.js cache
    window.getLocalized = function(key) {
        if (window._translations && window._translations[key]) {
            return window._translations[key];
        }
        return null;
    };
});

// Product share function
function shareProduct(event, productName) {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out ' + productName + ' from 茶井奶蓋專門店 Tea Well!');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'width=600,height=400');
}

// ===== GRAND UPGRADE: Scroll Reveal Intersection Observer =====
(function() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (!revealElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
})();
