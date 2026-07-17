/* ===================================
   PREMIUM PORTFOLIO - JAVASCRIPT
   =================================== */

// ===================================
// DOM ELEMENTS
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.querySelector('.scroll-to-top a');
const contactForm = document.querySelector('.contact-form');
const skillBars = document.querySelectorAll('.skill-progress');

// ===================================
// NAVIGATION MENU TOGGLE
// ===================================

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ===================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.parentElement.style.opacity = '1';
        scrollToTopBtn.parentElement.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.parentElement.style.opacity = '0';
        scrollToTopBtn.parentElement.style.pointerEvents = 'none';
    }
});

// ===================================
// SKILL PROGRESS ANIMATION
// ===================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.style.width;
            skillBar.style.width = '0';
            setTimeout(() => {
                skillBar.style.width = width;
            }, 100);
            skillObserver.unobserve(skillBar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInNotification 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// PROJECT CARD INTERACTIONS
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================

const stats = document.querySelectorAll('.stat h3');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateCounters() {
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const increment = Math.ceil(finalValue / 50);
        let currentValue = 0;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (finalValue === 100 ? '%' : '+');
                clearInterval(counter);
            } else {
                stat.textContent = currentValue + (finalValue === 100 ? '%' : '+');
            }
        }, 30);
    });
}

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// INTERSECTION OBSERVER FOR FADE-IN
// ===================================

const fadeInElements = document.querySelectorAll(
    '.about-text, .project-card, .timeline-content, .testimonial-card, .skill-category'
);

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================

const footerText = document.querySelector('.footer-content p');
const currentYear = new Date().getFullYear();
footerText.textContent = `© ${currentYear} Devikarani DH. All rights reserved.`;

// ===================================
// PROJECT FILTER (BONUS FEATURE)
// ===================================

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all') {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            const tags = project.querySelectorAll('.tag');
            const hasTag = Array.from(tags).some(tag => 
                tag.textContent.toLowerCase().includes(category.toLowerCase())
            );

            if (hasTag) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 10);
            } else {
                project.style.opacity = '0.3';
                project.style.transform = 'scale(0.95)';
            }
        }
    });
}

// ===================================
// THEME TOGGLE (BONUS FEATURE)
// ===================================

function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme on page load
initThemeToggle();

// ===================================
// KEYBOARD SHORTCUTS
// ===================================

document.addEventListener('keydown', (e) => {
    // Press '/' to focus search or navigate
    if (e.key === '/') {
        e.preventDefault();
        // Custom action here
    }

    // Press 'Esc' to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===================================
// LAZY LOADING FOR IMAGES (FUTURE)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// TYPEWRITER EFFECT FOR HERO SUBTITLE
// ===================================

function typewriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typewriter effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    typewriterEffect(subtitle, originalText, 50);
});

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        element.style.transform = `translateY(${distance * 0.5}px)`;
    });
});

// ===================================
// SMOOTH PAGE TRANSITIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

const revealElements = document.querySelectorAll(
    '.section-title, .about-text p, .stat, .skill-category, .project-card, .timeline-content'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===================================
// FORM INPUT ANIMATION
// ===================================

const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
        input.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = 'transparent';
        input.style.boxShadow = 'none';
    });
});

// ===================================
// COPY EMAIL TO CLIPBOARD
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default email client to open
        // But you can customize this behavior
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    hero.style.animation = 'fadeIn 0.8s ease-in';
});

// ===================================
// RESPONSIVE BEHAVIOR
// ===================================

function handleResize() {
    const width = window.innerWidth;

    if (width > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', throttle(handleResize, 250));

// ===================================
// LOCAL STORAGE FOR USER PREFERENCES
// ===================================

function saveUserPreferences() {
    const preferences = {
        theme: document.documentElement.getAttribute('data-theme'),
        visitedSections: [],
        scrollPosition: window.scrollY
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

window.addEventListener('beforeunload', saveUserPreferences);

// ===================================
// ANALYTICS TRACKING (BONUS)
// ===================================

function trackEvent(eventName, eventData = {}) {
    // You can integrate with Google Analytics or other tracking services
    console.log(`Event: ${eventName}`, eventData);
}

// Track page view
trackEvent('pageView', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// Track link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('linkClick', {
            href: link.href,
            text: link.textContent
        });
    });
});

// ===================================
// CUSTOM STYLES INJECTION
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideInNotification {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutNotification {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .scroll-to-top {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(style);

// ===================================
// INITIALIZATION
// ===================================

console.log('Portfolio JavaScript loaded successfully!');
console.log('Premium Portfolio by Devikarani DH');

// Ready event
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - All features initialized');
});
