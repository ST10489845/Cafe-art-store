
// ===============================
// CONFIGURATION & CONSTANTS
// ===============================
const CONFIG = {
    contactEmail: 'hello@brewandsculpt.com',
    locations: [
        {
            name: 'Downtown Café',
            address: '123 Artisan Street, City Center, Cape Town, 8001',
            coords: '-33.9285,18.4231',
            phone: '+27 (0)21 123 4567',
            hours: 'Mon-Fri: 7:00 AM - 6:00 PM'
        },
        {
            name: 'Riverside Gallery',
            address: '456 Creative Lane, Riverside, Cape Town, 8001',
            coords: '-33.9185,18.4331',
            phone: '+27 (0)21 234 5678',
            hours: 'Tue-Sun: 9:00 AM - 5:00 PM'
        }
    ],
    products: {
        coffee: ['Signature Latte', 'Artisan Pour Over', 'Cold Brew Tonic'],
        beans: ['Ethiopian Yirgacheffe', 'Colombian Supremo', 'House Signature Blend'],
        sculptures: ['Reclaimed Wood Form', 'Geometric Ceramic', 'Steel Abstract'],
        merchandise: ['Artisan Ceramic Mug', 'Canvas Tote Bag', 'Gift Card']
    }
};

// ===============================
// DOM CONTENT LOADED
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BREW & SCULPT Website Initializing...');
    initializeWebsite();
});

// ===============================
// MAIN INITIALIZATION FUNCTION
// ===============================
function initializeWebsite() {
    try {
        initNavigation();
        initSmoothScrolling();
        initAnimations();
        initForms();
        initGallery();
        initAccordions();
        initSearchFilter();
        initMaps();
        initScrollAnimations();
        initPerformanceOptimizations();
        
        console.log('✅ BREW & SCULPT website initialized successfully');
        
        // Track page load performance
        const loadTime = performance.now();
        console.log(`📊 Page loaded in ${loadTime.toFixed(2)}ms`);
        
    } catch (error) {
        console.error('❌ Website initialization failed:', error);
        showNotification('Website features temporarily unavailable', 'error');
    }
}

// ===============================
// RESPONSIVE NAVIGATION
// ===============================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = mainNav.classList.contains('active');
            
            mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.innerHTML = isExpanded ? '☰' : '✕';
            
            // Add animation class
            if (!isExpanded) {
                mainNav.classList.add('slide-in-left');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.header') && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle navigation link clicks
        mainNav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
    }
}

// ===============================
// SMOOTH SCROLLING
// ===============================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===============================
// ANIMATIONS ON SCROLL
// ===============================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .form-card, .location-card, .accordion-item'
    );
    
    animatedElements.forEach(el => {
        if (!el.classList.contains('fade-in')) {
            observer.observe(el);
        }
    });
}

// ===============================
// FORM HANDLING & VALIDATION
// ===============================
function initForms() {
    // Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleEnquirySubmit);
        setupRealTimeValidation(enquiryForm);
        prefillFormFromURL(enquiryForm);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        setupRealTimeValidation(contactForm);
    }
}

function setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Real-time validation on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error on focus
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
        
        // Real-time email validation
        if (input.type === 'email') {
            input.addEventListener('input', debounce(function() {
                if (this.value.length > 3) {
                    validateEmail(this);
                }
            }, 300));
        }
        
        // Real-time phone validation
        if (input.type === 'tel' || input.name === 'phone') {
            input.addEventListener('input', debounce(function() {
                if (this.value.length > 5) {
                    validatePhone(this);
                }
            }, 300));
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        if (!validateEmail(field)) {
            isValid = false;
        }
    }
    
    // Phone validation
    if ((field.type === 'tel' || field.name === 'phone') && value) {
        if (!validatePhone(field)) {
            isValid = false;
        }
    }
    
    // Text area minimum length
    if (field.type === 'textarea' && value.length < 10) {
        isValid = false;
        errorMessage = 'Please provide more details (minimum 10 characters)';
    }
    
    // Update field state
    if (!isValid && errorMessage) {
        showFieldError(field, errorMessage);
    } else if (isValid) {
        clearFieldError(field);
    }
    
    return isValid;
}

function validateEmail(field) {
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value && !emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

function validatePhone(field) {
    const value = field.value.trim();
    // South African phone number regex (simplified)
    const phoneRegex = /^[\+]?27[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{4}$|^0[0-9]{9}$/;
    const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
    
    if (value && !phoneRegex.test(cleanPhone)) {
        showFieldError(field, 'Please enter a valid South African phone number');
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add ARIA attributes for accessibility
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || generateId());
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function generateId() {
    return 'error-' + Math.random().toString(36).substr(2, 9);
}

// ===============================
// ENQUIRY FORM SUBMISSION
// ===============================
async function handleEnquirySubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors before submitting', 'error');
        submitBtn.focus();
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get form data
        const formData = new FormData(form);
        const enquiryData = {
            type: formData.get('enquiry-type'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            budget: formData.get('budget'),
            urgency: formData.get('urgency'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter') === 'on',
            timestamp: new Date().toISOString(),
            source: 'website-form'
        };
        
        // Log for demonstration (in real app, send to server)
        console.log('Enquiry Submission:', enquiryData);
        
        // Show success response based on enquiry type
        showEnquiryResponse(enquiryData);
        
        // Reset form
        form.reset();
        
        // Track conversion
        trackConversion('enquiry_submission');
        
    } catch (error) {
        console.error('Enquiry submission error:', error);
        showNotification('Sorry, there was an error submitting your enquiry. Please try again.', 'error');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showEnquiryResponse(data) {
    let responseMessage = '';
    let responseDetails = '';
    
    switch(data.type) {
        case 'coffee':
            responseMessage = '☕ Coffee Products Enquiry Received!';
            responseDetails = `Thank you ${data.name}! We'll send our coffee catalog and wholesale pricing to ${data.email} within 24 hours.`;
            break;
        case 'artwork':
            responseMessage = '🎨 Artwork Purchase Enquiry Received!';
            responseDetails = `Thank you ${data.name}! Our art curator will contact you at ${data.email} to discuss available sculptures and pricing.`;
            if (data.budget) {
                responseDetails += ` Your indicated budget: R${data.budget}.`;
            }
            break;
        case 'collaboration':
            responseMessage = '🤝 Collaboration Request Received!';
            responseDetails = `Excellent ${data.name}! We're excited about your collaboration idea. Our team will review your proposal and contact you at ${data.email} within 48 hours.`;
            break;
        case 'event':
            responseMessage = '📅 Event Space Enquiry Received!';
            responseDetails = `Thank you ${data.name}! We'll check our event calendar availability and get back to you at ${data.email} within 24 hours.`;
            break;
        case 'wholesale':
            responseMessage = '📦 Wholesale Enquiry Received!';
            responseDetails = `Thank you for your wholesale interest ${data.name}! Our sales team will contact you at ${data.email} with pricing and minimum order information.`;
            break;
        default:
            responseMessage = '📝 Enquiry Received!';
            responseDetails = `Thank you ${data.name}! We'll get back to you at ${data.email} within 24 hours.`;
    }
    
    // Add newsletter confirmation if subscribed
    if (data.newsletter) {
        responseDetails += ' You have been subscribed to our newsletter.';
    }
    
    showResponseModal(responseMessage, responseDetails);
}

function prefillFormFromURL(form) {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const type = urlParams.get('type');
    
    if (product) {
        const typeSelect = form.querySelector('#enquiry-type');
        if (typeSelect) {
            if (CONFIG.products.coffee.includes(product)) {
                typeSelect.value = 'coffee';
            } else if (CONFIG.products.sculptures.includes(product)) {
                typeSelect.value = 'artwork';
            }
        }
        
        const messageTextarea = form.querySelector('#message');
        if (messageTextarea) {
            messageTextarea.value = `I'm interested in the ${product}. Please send me more information.`;
        }
    }
    
    if (type) {
        const typeSelect = form.querySelector('#enquiry-type');
        if (typeSelect) {
            typeSelect.value = type;
        }
    }
}

// ===============================
// CONTACT FORM SUBMISSION
// ===============================
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors before submitting', 'error');
        submitBtn.focus();
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get form data
        const formData = new FormData(form);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        
        // Simulate email sending
        const emailSent = await simulateEmailSending(contactData);
        
        if (emailSent) {
            showNotification('✅ Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            trackConversion('contact_submission');
        } else {
            throw new Error('Email sending failed');
        }
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('❌ Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function simulateEmailSending(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real implementation, this would be an API call to your backend
            console.log('📧 Email would be sent:', {
                to: CONFIG.contactEmail,
                from: data.email,
                subject: `Website Contact: ${data.subject}`,
                message: `From: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`
            });
            resolve(true);
        }, 1000);
    });
}

// ===============================
// GALLERY & LIGHTBOX
// ===============================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = createLightbox();
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(lightbox, images[index].src, images[index].alt, index);
        });
        
        // Keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox(lightbox, images[index].src, images[index].alt, index);
            }
        });
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox(lightbox);
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        
        const image = images[currentImageIndex];
        openLightbox(lightbox, image.src, image.alt, currentImageIndex);
    }
}

function createLightbox() {
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) return existingLightbox;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-labelledby', 'lightbox-title');
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <img class="lightbox-img" src="" alt="" id="lightbox-image">
            <div class="lightbox-caption" id="lightbox-title"></div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox on button click
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        closeLightbox(lightbox);
    });
    
    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    return lightbox;
}

function openLightbox(lightbox, imgSrc, imgAlt, index) {
    const img = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    img.src = imgSrc;
    img.alt = imgAlt;
    caption.textContent = imgAlt;
    
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox(lightbox) {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Return focus to the element that opened the lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems[0].focus();
    }
}

// ===============================
// ACCORDION FUNCTIONALITY
// ===============================
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions in the same container
            const parentAccordion = this.closest('.accordion');
            if (parentAccordion) {
                parentAccordion.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                    item.previousElementSibling.setAttribute('aria-expanded', 'false');
                });
            }
            
            // Open current one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard accessibility
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===============================
// SEARCH & FILTER FUNCTIONALITY
// ===============================
function initSearchFilter() {
    const searchInput = document.querySelector('.search-box input');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (searchInput && serviceCards.length > 0) {
        const searchHandler = debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;
            
            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const price = card.querySelector('.price')?.textContent.toLowerCase() || '';
                
                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              price.includes(searchTerm);
                
                if (matches) {
                    card.style.display = 'block';
                    visibleCount++;
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no results
            const resultsContainer = document.querySelector('.services-grid');
            let noResultsMsg = resultsContainer.querySelector('.no-results');
            
            if (visibleCount === 0 && searchTerm) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results text-center';
                    noResultsMsg.innerHTML = `
                        <p>No products found matching "<strong>${searchTerm}</strong>"</p>
                        <p class="text-muted">Try different keywords or browse all categories</p>
                    `;
                    resultsContainer.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
            
        }, 300);
        
        searchInput.addEventListener('input', searchHandler);
    }
}

// ===============================
// INTERACTIVE MAPS
// ===============================
function initMaps() {
    // Enhanced existing iframe maps with interactivity
    enhanceExistingMaps();
    
    // Initialize location cards
    initLocationCards();
}

function enhanceExistingMaps() {
    const mapContainers = document.querySelectorAll('.map-container');
    
    mapContainers.forEach((container, index) => {
        // Add loading state
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', function() {
                container.classList.add('loaded');
            });
        }
        
        // Add interactive features
        container.style.cursor = 'grab';
        container.setAttribute('tabindex', '0');
        container.setAttribute('role', 'application');
        container.setAttribute('aria-label', `Interactive map of ${CONFIG.locations[index]?.name || 'our location'}`);
        
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;
        
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - container.offsetLeft;
            startY = e.pageY - container.offsetTop;
            scrollLeft = container.scrollLeft;
            scrollTop = container.scrollTop;
            container.style.cursor = 'grabbing';
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const y = e.pageY - container.offsetTop;
            const walkX = (x - startX) * 2;
            const walkY = (y - startY) * 2;
            container.scrollLeft = scrollLeft - walkX;
            container.scrollTop = scrollTop - walkY;
        });
        
        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    container.scrollTop -= 50;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    container.scrollTop += 50;
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    container.scrollLeft -= 50;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    container.scrollLeft += 50;
                    break;
            }
        });
    });
}

function initLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach((card, index) => {
        const location = CONFIG.locations[index];
        if (location) {
            // Add click handler to focus map
            card.addEventListener('click', function() {
                const mapContainer = document.querySelector(`.map-container:nth-of-type(${index + 1})`);
                if (mapContainer) {
                    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    mapContainer.focus();
                }
            });
            
            // Add keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
}

// ===============================
// NOTIFICATION SYSTEM
// ===============================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto-remove after 5 seconds
    const autoRemove = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Keep notification on hover
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            closeNotification(notification);
        }, 3000);
    });
}

function closeNotification(notification) {
    if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }
}

// ===============================
// RESPONSE MODAL
// ===============================
function showResponseModal(title, message) {
    // Remove existing modal
    const existingModal = document.querySelector('.response-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'response-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3 id="modal-title">${title}</h3>
            <p>${message}</p>
            <button class="btn modal-close">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus management
    const closeButton = modal.querySelector('.modal-close');
    closeButton.focus();
    
    // Close modal
    closeButton.addEventListener('click', () => {
        closeModal(modal);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on escape key
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
    
    // Trap focus inside modal
    trapFocus(modal);
}

function closeModal(modal) {
    modal.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 300);
}

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ===============================
// ANIMATION UTILITIES
// ===============================
function initAnimations() {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.service-card, .form-card, .location-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===============================
// PERFORMANCE OPTIMIZATIONS
// ===============================
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalResources = [
        '/css/style.css',
        '/js/script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// ===============================
// UTILITY FUNCTIONS
// ===============================
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function trackConversion(event) {
    // In a real implementation, this would send to Google Analytics
    console.log(`📊 Conversion tracked: ${event}`);
    
    // Example GA4 implementation
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'event_category': 'engagement',
            'event_label': window.location.pathname
        });
    }
}

// ===============================
// ERROR HANDLING
// ===============================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Report to error tracking service
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(e.error);
    }
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ===============================
// OFFLINE DETECTION
// ===============================
window.addEventListener('online', function() {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are currently offline. Some features may be unavailable.', 'warning');
});

// ===============================
// SERVICE WORKER (PWA FEATURES)
// ===============================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ===============================
// PROGRESSIVE ENHANCEMENT
// ===============================
// Check if JavaScript is enabled
document.documentElement.classList.add('js-enabled');

// ===============================
// EXPORT FOR TESTING
// ===============================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        debounce,
        throttle
    };
}