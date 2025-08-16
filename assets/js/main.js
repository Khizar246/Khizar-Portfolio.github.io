// ===== MODERN PORTFOLIO JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initLightbox();
    initSmoothScrolling();
    initScrollSpy();
});

// ===== THEME TOGGLE FUNCTIONALITY =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
        
        // Add smooth transition effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Open navigation menu
    navToggle.addEventListener('click', openNav);
    
    // Close navigation menu
    navClose.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeNav();
        }
    });
    
    function openNav() {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        navClose.focus();
    }
    
    function closeNav() {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        navToggle.focus();
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-tag, .project-card, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
        
        // Initially hide animated elements
        const animatedElements = section.querySelectorAll('.skill-tag, .project-card, .stat-item');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
}

// ===== IMPROVED LIGHTBOX FUNCTIONALITY =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        console.error('Lightbox element not found');
        return;
    }
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    if (!lightboxImg || !lightboxClose) {
        console.error('Lightbox components not found');
        return;
    }
    
    // Function to open lightbox with improved image handling
    function openLightbox(src, alt) {
        // Show lightbox immediately
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset image state
        lightboxImg.classList.remove('loaded');
        lightboxImg.style.opacity = '0';
        
        // Create a new image to preload and get dimensions
        const img = new Image();
        img.onload = function() {
            // Set the source
            lightboxImg.src = src;
            lightboxImg.alt = alt || '';
            
            // Calculate if image needs special handling
            const imageAspectRatio = this.naturalWidth / this.naturalHeight;
            const viewportAspectRatio = window.innerWidth / window.innerHeight;
            
            // Apply loaded class for fade in effect
            setTimeout(() => {
                lightboxImg.classList.add('loaded');
                lightboxImg.style.opacity = '1';
            }, 50);
            
            // Scroll to top of lightbox to ensure image is visible
            lightbox.scrollTop = 0;
        };
        
        img.onerror = function() {
            console.error('Failed to load image:', src);
            closeLightbox();
        };
        
        // Start loading the image
        img.src = src;
        
        // Focus management
        lightboxClose.focus();
        
        // Prevent background scrolling
        document.addEventListener('touchmove', preventScroll, { passive: false });
        
        console.log('Lightbox opened for:', alt || src);
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove scroll prevention
        document.removeEventListener('touchmove', preventScroll);
        
        // Clear image source and reset state after transition
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                lightboxImg.src = '';
                lightboxImg.alt = '';
                lightboxImg.classList.remove('loaded');
                lightboxImg.style.opacity = '0';
            }
        }, 300);
        
        console.log('Lightbox closed');
    }
    
    function preventScroll(e) {
        e.preventDefault();
    }
    
    // Close lightbox handlers
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on background click (but not on image)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Enhanced keyboard handlers
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'PageUp':
                case 'PageDown':
                    // Allow scrolling within lightbox
                    e.stopPropagation();
                    break;
            }
        }
    });
    
    // Add click handlers to all clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');
    console.log(`Found ${clickableImages.length} clickable images`);
    
    clickableImages.forEach((img, index) => {
        console.log(`Setting up image ${index}: ${img.alt || img.src}`);
        
        // Make sure image is clickable
        img.style.cursor = 'pointer';
        img.setAttribute('tabindex', '0');
        
        // Click handler
        const clickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Image clicked: ${this.alt || this.src}`);
            openLightbox(this.src, this.alt);
        };
        
        img.addEventListener('click', clickHandler);
        
        // Keyboard support
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    // Additional fix: Make project containers clickable as backup
    const projectContainers = document.querySelectorAll('.project-image-container');
    projectContainers.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', function(e) {
            // Only trigger if we didn't click directly on the image
            const img = this.querySelector('.clickable-image');
            if (img && (e.target === this || e.target.classList.contains('project-overlay'))) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Container clicked for: ${img.alt || img.src}`);
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    // Handle window resize to adjust lightbox
    window.addEventListener('resize', debounce(() => {
        if (lightbox.classList.contains('active')) {
            lightbox.scrollTop = 0;
        }
    }, 250));
    
    console.log('Lightbox initialization complete');
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const heroButton = document.querySelector('.hero-cta a[href^="#"]');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Handle hero button
    if (heroButton) {
        heroButton.addEventListener('click', handleSmoothScroll);
    }
    
    function handleSmoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Offset for fixed elements
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            history.pushState(null, null, targetId);
        }
    }
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle function for performance
function throttle(func, wait) {
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

// Lazy loading for images (if needed)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== ENHANCED INTERACTIONS =====

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== INITIALIZE ENHANCED FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced interactions
    addRippleEffect();
    addSkipLink();
    
    // Initialize lazy loading if needed
    initLazyLoading();
    
    // Add loading states
    document.body.classList.add('loaded');
});

// ===== UTILITY FUNCTIONS =====

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // You can add error reporting here if needed
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Log performance metrics
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeToggle,
        initNavigation,
        initScrollAnimations,
        initLightbox,
        initSmoothScrolling,
        initScrollSpy,
        throttle,
        debounce,
        isInViewport
    };
}
