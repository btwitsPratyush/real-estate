// Smooth scrolling for navigation links
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
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.startAutoSlide();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
        heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Initialize hero slider
new HeroSlider();

// Search functionality
document.querySelector('.property-search').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const searchData = {
        location: document.getElementById('location').value,
        propertyType: document.getElementById('property-type').value,
        budget: document.getElementById('budget').value
    };
    
    console.log('Search data:', searchData);
    // Here you would typically send the data to your backend
    alert('Search functionality would be implemented here!');
});

// Search tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update search form based on selected tab
        const tabType = this.dataset.tab;
        console.log('Selected tab:', tabType);
    });
});

// Property filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const properties = document.querySelectorAll('.property-card');
        
        properties.forEach(property => {
            if (filter === 'all' || property.dataset.category === filter) {
                property.style.display = 'block';
            } else {
                property.style.display = 'none';
            }
        });
    });
});

// Property sorting
document.getElementById('sort-properties').addEventListener('change', function() {
    const sortBy = this.value;
    const propertiesGrid = document.querySelector('.properties-grid');
    const properties = Array.from(document.querySelectorAll('.property-card'));
    
    properties.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseFloat(a.querySelector('.property-price').textContent.replace(/[^\d.]/g, '')) - 
                       parseFloat(b.querySelector('.property-price').textContent.replace(/[^\d.]/g, ''));
            case 'price-high':
                return parseFloat(b.querySelector('.property-price').textContent.replace(/[^\d.]/g, '')) - 
                       parseFloat(a.querySelector('.property-price').textContent.replace(/[^\d.]/g, ''));
            case 'newest':
                // Assuming newer properties have 'new' badge
                return b.querySelector('.property-badge.new') ? 1 : -1;
            default:
                return 0;
        }
    });
    
    // Re-append sorted properties
    properties.forEach(property => propertiesGrid.appendChild(property));
});

// Favorite functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('favorited');
        
        if (this.classList.contains('favorited')) {
            this.style.color = '#e74c3c';
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            `;
        } else {
            this.style.color = '';
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            `;
        }
    });
});

// Property card interactions
document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const propertyCard = this.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        
        // Here you would typically navigate to property details page
        alert(`Viewing details for: ${propertyName}`);
    });
});

document.querySelectorAll('.schedule-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const propertyCard = this.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        
        // Here you would typically open a scheduling modal
        alert(`Scheduling visit for: ${propertyName}`);
    });
});

document.querySelectorAll('.virtual-tour').forEach(btn => {
    btn.addEventListener('click', function() {
        const propertyCard = this.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        
        // Here you would typically open virtual tour
        alert(`Starting virtual tour for: ${propertyName}`);
    });
});

// Load more properties
document.querySelector('.load-more-btn').addEventListener('click', function() {
    // Here you would typically load more properties from your backend
    alert('Loading more properties...');
    
    // Simulate loading
    this.textContent = 'Loading...';
    this.disabled = true;
    
    setTimeout(() => {
        this.textContent = 'Load More Properties';
        this.disabled = false;
    }, 2000);
});

// Resources tabs
document.querySelectorAll('.resource-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.resource-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        this.classList.add('active');
        const targetTab = this.dataset.tab;
        document.getElementById(targetTab).classList.add('active');
    });
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    console.log('Contact form data:', contactData);
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }, 2000);
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    }
});

// List property button
document.querySelector('.list-property-btn').addEventListener('click', function() {
    // Here you would typically open a property listing form or navigate to listing page
    alert('Property listing form would open here!');
});

// Chat widget
document.querySelector('.chat-toggle').addEventListener('click', function() {
    // Here you would typically open a chat interface
    alert('Live chat would open here!');
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.onload = () => {
                img.classList.add('loaded');
                observer.unobserve(img);
            };
            img.onerror = () => {
                console.warn('Failed to load image:', img.src);
                observer.unobserve(img);
            };
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        indicator.style.transform = `scaleX(${scrollPercent / 100})`;
    });
};

// Initialize scroll indicator
createScrollIndicator();

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.property-card, .blog-card, .testimonial-card, .stat, .guide-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Initialize animations
animateOnScroll();

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization - debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PropertyLoka website loaded successfully!');
    
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Initialize tooltips for accessibility
    const tooltipElements = document.querySelectorAll('[aria-label]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add tooltip functionality here if needed
        });
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Advanced search filters (placeholder)
document.querySelector('.advanced-filters').addEventListener('click', function() {
    // Here you would typically show an advanced search modal
    alert('Advanced search filters would open here!');
});

// Property comparison functionality (placeholder)
function addToComparison(propertyId) {
    // Here you would add property to comparison list
    console.log('Added property to comparison:', propertyId);
}

// Save search functionality (placeholder)
function saveSearch(searchCriteria) {
    // Here you would save search criteria for user
    console.log('Saved search:', searchCriteria);
}

// Email alerts setup (placeholder)
function setupEmailAlerts(criteria) {
    // Here you would set up email alerts for new listings
    console.log('Email alerts set up for:', criteria);
}

// Social sharing functionality
function shareProperty(propertyId, platform) {
    const url = window.location.href;
    const title = 'Check out this amazing property on PropertyLoka';
    
    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
            break;
    }
}

// Print property details
function printProperty(propertyId) {
    window.print();
}

// Mortgage calculator (placeholder)
function openMortgageCalculator(propertyPrice) {
    // Here you would open mortgage calculator modal
    alert(`Mortgage calculator for property priced at ${propertyPrice} would open here!`);
}

// Schedule property viewing
function scheduleViewing(propertyId) {
    // Here you would open scheduling interface
    alert('Property viewing scheduler would open here!');
}

// User account functionality (placeholder)
function loginUser() {
    alert('User login would be implemented here!');
}

function registerUser() {
    alert('User registration would be implemented here!');
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Here you would send analytics data
    console.log('Analytics event:', eventName, eventData);
}

// Track property views
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', function() {
        const propertyName = this.querySelector('h3').textContent;
        trackEvent('property_view', { property: propertyName });
    });
});

// Track search usage
document.querySelector('.search-btn').addEventListener('click', function() {
    trackEvent('property_search', {
        location: document.getElementById('location').value,
        type: document.getElementById('property-type').value,
        budget: document.getElementById('budget').value
    });
});

// GDPR compliance (placeholder)
function showCookieConsent() {
    // Here you would show cookie consent banner
    console.log('Cookie consent would be shown here');
}

// Language selection (placeholder)
function changeLanguage(language) {
    // Here you would implement language switching
    console.log('Language changed to:', language);
}

// Initialize GDPR compliance
// showCookieConsent();