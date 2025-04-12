/**
 * Queens Garden Hotel - Main JavaScript
 * This file contains general functionality for the Queens Garden Hotel website.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Trigger the scroll event on page load to set initial state
        window.dispatchEvent(new Event('scroll'));
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                const animationClass = element.dataset.animation || 'fadeIn';
                element.classList.add('animate__' + animationClass);
                element.classList.remove('animate-on-scroll');
            }
        });
    };
    
    // Run animation check on load and scroll
    if (document.querySelectorAll('.animate-on-scroll').length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Close the mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navLinks && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            });
        });
    }
    
    // Add current year to footer copyright if needed
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    // Create a simple image slideshow for the hero section if available
    // This is a placeholder for potentially adding real images later
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Add garden-themed background color gradient
        const gradients = [
            'linear-gradient(rgba(26, 46, 34, 0.5), rgba(26, 46, 34, 0.7)), var(--bs-dark)',
            'linear-gradient(rgba(26, 46, 34, 0.6), rgba(26, 46, 34, 0.8)), var(--bs-dark)',
            'linear-gradient(rgba(42, 76, 56, 0.5), rgba(42, 76, 56, 0.7)), var(--bs-dark)'
        ];
        
        let currentGradient = 0;
        
        // Change gradient every 5 seconds
        setInterval(() => {
            currentGradient = (currentGradient + 1) % gradients.length;
            heroSection.style.background = gradients[currentGradient];
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        }, 5000);
    }
    
    // Add a subtle parallax effect to the hero section
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = 50 + (scrollPosition * 0.05) + '%';
        });
    }
    
    // Handle any special links or interactive elements
    document.querySelectorAll('[data-special-action]').forEach(element => {
        element.addEventListener('click', function(e) {
            const action = this.dataset.specialAction;
            
            if (action === 'back-to-top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});
