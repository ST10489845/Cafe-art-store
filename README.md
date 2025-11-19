# BREW & SCULPT Website
## Café & Art Gallery - Cape Town

**Student:** Mziukhona Dyasi (ST10489845)  
**Course:** WEDE5020 - Web Development (Introduction)  
**Submission:** Part 3 - Enhancing Functionality and SEO

---

## Table of Contents
- [Project Overview](#project-overview)
- [Changelog](#changelog)
- [SEO Implementation](#seo-implementation)
- [JavaScript Functionality](#javascript-functionality)
- [Form Validation](#form-validation)
- [Technical Specifications](#technical-specifications)
- [References](#references)

---

## Project Overview

BREW & SCULPT is a Renaissance-inspired café and art gallery located in Cape Town, South Africa. This website showcases our unique combination of specialty coffee and local sculpture art, providing an immersive online experience that reflects our physical spaces.

### Key Features:
- Responsive design optimized for all devices
- Interactive product galleries and enquiry forms
- SEO-optimized content structure
- Advanced JavaScript functionality
- Accessible design following WCAG 2.1 guidelines

---

## Changelog

### Part 3 Enhancements (19 November 2025)
- **Enhanced Form Validation**: Implemented real-time validation with specific error messages for all form fields
- **Improved Accessibility**: Added ARIA labels, keyboard navigation, and screen reader support
- **Advanced JavaScript**: Enhanced interactive elements with smooth animations and transitions
- **SEO Optimization**: Comprehensive meta tags, semantic HTML, and image optimization
- **Performance Improvements**: Optimized loading times and cross-browser compatibility
- **User Experience**: Added loading states, success modals, and improved feedback systems

### Part 2 Feedback Implementation (19 November 2025)
- **Fixed Responsive Issues**: Improved mobile layout and navigation
- **Enhanced Color Contrast**: Updated color scheme for better accessibility
- **Typography Optimization**: Improved font scaling across different screen sizes
- **CSS Optimization**: Refactored stylesheets for better performance
- **Navigation Improvements**: Fixed mobile menu behavior and closing functionality

### Part 1 Foundation (Previous)
- Complete HTML structure with 5 pages
- Semantic markup and proper document structure
- Organized file and folder system
- Basic styling foundation

---

## SEO Implementation

### On-Page SEO Features

#### Title Tags (Optimized for each page):
- **Home**: "BREW & SCULPT — Artisan Coffee & Local Art Gallery | Cape Town"
- **About**: "About Us — BREW & SCULPT Café & Art Gallery | Our Story"
- **Products**: "Products & Services — BREW & SCULPT Coffee & Art Collection"
- **Enquiry**: "Enquiry Form — Contact BREW & SCULPT for Products & Collaborations"
- **Contact**: "Contact Us — BREW & SCULPT Café & Art Gallery | Visit Our Locations"

#### Meta Descriptions:
- Compelling, keyword-rich descriptions under 160 characters
- Unique descriptions targeting specific user intents for each page
- Includes primary keywords: coffee, sculpture, art gallery, Cape Town

#### Header Structure:
- Single H1 per page focusing on primary keyword
- Logical H2-H6 hierarchy for content organization
- Semantic HTML5 elements for better search engine understanding

#### Image Optimization:
- Descriptive file names (e.g., `signature-latte-renaissance-art.jpg`)
- Comprehensive alt text describing images and context
- Optimized file sizes with appropriate compression
- Lazy loading implementation for performance

#### Technical SEO:
- Clean, semantic URL structure
- Fast loading times through optimized assets
- Mobile-first responsive design
- Cross-browser compatibility
- Accessible design following WCAG 2.1 guidelines

---

## JavaScript Functionality

### Interactive Elements Implemented:

1. **Responsive Navigation**
   - Mobile hamburger menu with smooth animations
   - Keyboard accessible navigation
   - Auto-close on link selection

2. **Smooth Scrolling**
   - Animated scroll to anchor links
   - Offset accounting for fixed header
   - Cross-browser compatible

3. **Accordion System**
   - About page timeline accordion
   - Keyboard accessible with Enter/Space support
   - Animated expand/collapse transitions

4. **Image Lightbox Gallery**
   - Full-screen image viewing
   - Keyboard navigation (arrow keys, Escape)
   - Touch-friendly for mobile devices

5. **Interactive Maps**
   - Google Maps integration for both locations
   - Custom markers and information windows
   - Get directions functionality

6. **Form Handling System**
   - Real-time validation with instant feedback
   - Dynamic field display based on user selection
   - Success modals with contextual responses

### Advanced Features:

- **Debounced search functionality** for product filtering
- **Intersection Observer API** for scroll animations
- **Form data persistence** during session
- **Loading states** and progress indicators
- **Error boundary handling** for robust user experience

---

## Form Validation

### Enquiry Form Features:
- **Dynamic Field Display**: Fields change based on enquiry type selection
- **Real-time Validation**: Instant feedback for email, phone, and required fields
- **Budget Selection**: Range-based budget options with appropriate pricing
- **Urgency Levels**: Response time expectations
- **Comprehensive Validation**:
  - Email format verification
  - South African phone number validation
  - Minimum character requirements for messages
  - Required field highlighting

### Contact Form Features:
- **Subject Categorization**: Organized message types
- **Message Composition**: Adequate space with character guidance
- **Basic Contact Information**: Name, email, phone validation
- **Success Handling**: Confirmation modals with appropriate messaging

### Validation Methods:
```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation (South African)
const phoneRegex = /^[\+]?27[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{4}$|^0[0-9]{9}$/;

// Real-time validation with debouncing
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
