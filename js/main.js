// ===========================
// AURORA STAYS - MAIN JAVASCRIPT
// ===========================

// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// ===========================
// SLIDER FUNCTIONALITY
// ===========================

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active', 'fade'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (slides[n]) {
        slides[n].classList.add('active', 'fade');
        dots[n].classList.add('active');
    }
}

function changeSlide(n) {
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

function currentSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Auto-play slider
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initialize slider
showSlide(0);

// ===========================
// MOBILE MENU TOGGLE
// ===========================

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===========================
// QUICK BOOKING FORM
// ===========================

const quickBookingForm = document.getElementById('quickBookingForm');
if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = document.getElementById('guests').value;
        const roomType = document.getElementById('roomType').value;

        // Validation
        if (!checkIn || !checkOut || !guests || !roomType) {
            alert('Please fill in all fields');
            return;
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Show success message
        alert(`Booking Search:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nRoom Type: ${roomType}\n\nSearching for available rooms...`);
        
        // Redirect to bookings page
        setTimeout(() => {
            window.location.href = 'pages/bookings.html';
        }, 500);
    });
}

// ===========================
// NEWSLETTER FORM
// ===========================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
            alert(`Thank you for subscribing! Confirmation sent to ${email}`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// ===========================
// ROOM DETAILS MODAL
// ===========================

const roomModal = document.getElementById('roomModal');
const roomDetailsContent = document.getElementById('roomDetailsContent');

const roomDetails = {
    'Luxury Suite': {
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
        price: '$599',
        beds: '1 King Bed',
        guests: '2-4 Guests',
        size: '450 sqft',
        amenities: ['Free Wi-Fi', 'Air Conditioning', 'Ocean View', 'Private Balcony', 'Marble Bathroom', 'Mini Bar', 'Smart TV', 'Work Desk']
    },
    'Deluxe Room': {
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        price: '$399',
        beds: '1 Queen Bed',
        guests: '2 Guests',
        size: '350 sqft',
        amenities: ['Free Wi-Fi', 'Air Conditioning', 'City View', 'Balcony', 'Modern Bathroom', 'Smart TV', 'Work Desk', 'Safe']
    },
    'Standard Room': {
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=400&fit=crop',
        price: '$249',
        beds: '1 Twin Bed or 1 Queen Bed',
        guests: '1-2 Guests',
        size: '250 sqft',
        amenities: ['Free Wi-Fi', 'Air Conditioning', 'City View', 'Private Bathroom', 'Flat Screen TV', 'Desk', 'Telephone']
    },
    'Penthouse Suite': {
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        price: '$899',
        beds: '2 Bedrooms (2 King Beds)',
        guests: '4-6 Guests',
        size: '600 sqft',
        amenities: ['Private Pool', 'Free Wi-Fi', 'Air Conditioning', 'Panoramic Ocean View', 'Terrace', 'Luxury Bathroom', 'Jacuzzi', 'Smart TV', 'Full Kitchen', 'Work Area']
    }
};

function openRoomDetails(roomName) {
    const room = roomDetails[roomName];
    if (room) {
        roomDetailsContent.innerHTML = `
            <div style="text-align: center;">
                <img src="${room.image}" alt="${roomName}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: var(--primary-color); margin-bottom: 15px;">${roomName}</h2>
                <div style="text-align: left; margin-bottom: 20px;">
                    <p><strong>Price:</strong> ${room.price} per night</p>
                    <p><strong>Beds:</strong> ${room.beds}</p>
                    <p><strong>Guests:</strong> ${room.guests}</p>
                    <p><strong>Size:</strong> ${room.size}</p>
                    <h3 style="color: var(--primary-color); margin-top: 20px; margin-bottom: 10px;">Amenities</h3>
                    <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; list-style: none;">
                        ${room.amenities.map(amenity => `<li style="color: var(--light-text);"><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 8px;"></i>${amenity}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn btn-primary" onclick="bookRoom('${roomName}')">Book Now</button>
            </div>
        `;
        roomModal.style.display = 'block';
    }
}

function closeRoomDetails() {
    roomModal.style.display = 'none';
}

function bookRoom(roomName) {
    alert(`You selected ${roomName}. Redirecting to booking page...`);
    window.location.href = 'pages/bookings.html?room=' + encodeURIComponent(roomName);
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === roomModal) {
        closeRoomDetails();
    }
});

// ===========================
// FORM VALIDATION
// ===========================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        // Remove previous error message
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }

        // Validate required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
        // Validate email
        else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
        // Validate phone
        else if (input.name && input.name.includes('phone') && input.value && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

// ===========================
// CONTACT FORM SUBMISSION
// ===========================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm('contactForm')) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            console.log('Contact Form Data:', { name, email, phone, message });
            alert(`Thank you, ${name}! We have received your message. We will contact you shortly at ${email}`);
            contactForm.reset();
        }
    });
}

// ===========================
// BOOKING FORM SUBMISSION
// ===========================

const bookingFormPage = document.getElementById('bookingForm');
if (bookingFormPage) {
    bookingFormPage.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm('bookingForm')) {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const checkIn = document.getElementById('checkInDate').value;
            const checkOut = document.getElementById('checkOutDate').value;
            const roomType = document.getElementById('roomTypeSelect').value;
            const guests = document.getElementById('numberOfGuests').value;

            console.log('Booking Data:', { fullName, email, checkIn, checkOut, roomType, guests });
            alert(`Booking Confirmed!\nName: ${fullName}\nRoom: ${roomType}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\n\nConfirmation email sent to ${email}`);
            bookingFormPage.reset();
        }
    });
}

// ===========================
// SPA RESERVATION FORM
// ===========================

const spaForm = document.getElementById('spaForm');
if (spaForm) {
    spaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm('spaForm')) {
            const clientName = document.getElementById('clientName').value;
            const treatment = document.getElementById('treatment').value;
            const date = document.getElementById('spaDate').value;
            const time = document.getElementById('spaTime').value;

            console.log('Spa Reservation:', { clientName, treatment, date, time });
            alert(`Spa Reservation Confirmed!\nTreatment: ${treatment}\nDate: ${date}\nTime: ${time}\n\nConfirmation sent to your email`);
            spaForm.reset();
        }
    });
}

// ===========================
// RESTAURANT RESERVATION FORM
// ===========================

const restaurantForm = document.getElementById('restaurantForm');
if (restaurantForm) {
    restaurantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm('restaurantForm')) {
            const guestName = document.getElementById('guestName').value;
            const reservationDate = document.getElementById('reservationDate').value;
            const reservationTime = document.getElementById('reservationTime').value;
            const tableGuests = document.getElementById('tableGuests').value;

            console.log('Restaurant Reservation:', { guestName, reservationDate, reservationTime, tableGuests });
            alert(`Restaurant Reservation Confirmed!\nName: ${guestName}\nDate: ${reservationDate}\nTime: ${reservationTime}\nGuests: ${tableGuests}\n\nWe look forward to your visit!`);
            restaurantForm.reset();
        }
    });
}

// ===========================
// ADMIN LOGIN
// ===========================

const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        // Demo credentials
        if (username === 'admin' && password === 'admin123') {
            alert('Login successful! Welcome to Admin Dashboard');
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    });
}

// ===========================
// ACTIVE NAV LINK
// ===========================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ===========================
// SMOOTH SCROLLING
// ===========================

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

// ===========================
// KEYBOARD EVENTS
// ===========================

document.addEventListener('keydown', (e) => {
    // Keyboard navigation for slider
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
    // Close modal with Escape
    else if (e.key === 'Escape' && roomModal.style.display === 'block') {
        closeRoomDetails();
    }
});

// ===========================
// MOUSE EVENTS - HOVER EFFECTS
// ===========================

const roomCards = document.querySelectorAll('.room-card');
roomCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.room-card, .service-card, .review-card').forEach(el => {
    observer.observe(el);
});

console.log('Aurora Stays - JavaScript Loaded Successfully');