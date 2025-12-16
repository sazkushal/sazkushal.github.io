document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Change icon from hamburger to X
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const matchElements = document.querySelectorAll('.service-card, .project-card, .about-grid, .tech-card, .section-title, .timeline-item');

    matchElements.forEach((el, index) => {
        // Add base style class for animation
        el.classList.add('hidden-el');
        // Add staggering delay based on index (resetting per section roughly)
        // This is a simple stagger; for more complex layouts, CSS nth-child delays often work better but this is dynamic
        if (el.classList.contains('tech-card')) {
            el.style.transitionDelay = `${(index % 7) * 100}ms`;
        }
        observer.observe(el);
    });

    // Sticky Navbar transparency effect
    const navbar = document.querySelector('.navbar');
    const heroAccent = document.querySelector('.hero-bg-accent');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Parallax Effect for Hero
        if (heroAccent && window.scrollY < 800) {
            const speed = 0.5;
            heroAccent.style.transform = `translateY(${window.scrollY * speed}px)`;
        }
    });
});
