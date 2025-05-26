/**
 * Avian OS Website JavaScript
 * Handles interactive elements and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        const nav = header.querySelector('nav');
        if (!nav) return;
        
        // Create mobile nav toggle button if it doesn't exist
        if (!document.querySelector('.mobile-nav-toggle')) {
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('mobile-nav-toggle');
            toggleButton.innerHTML = '<span></span><span></span><span></span>';
            toggleButton.setAttribute('aria-label', 'Toggle navigation');
            
            header.querySelector('.container').insertBefore(toggleButton, nav);
            
            toggleButton.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggleButton.classList.toggle('active');
            });
        }
    };
    
    // Call on load and resize
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Form submission handling
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            // Simulate API call
            setTimeout(() => {
                emailInput.value = '';
                submitButton.textContent = 'Subscribed!';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                }, 2000);
            }, 1500);
        });
    }
    
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .download-card, .doc-card, .community-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
    
    // Add current year to copyright
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2025', year);
    }
});