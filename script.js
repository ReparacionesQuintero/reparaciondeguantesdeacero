// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            navLinks.classList.remove('active'); // Close mobile menu
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox Functionality
let currentImages = [];
let currentImageIndex = 0;

function openLightbox(images) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (lightbox && lightboxImg) {
        // Ensure images is always an array
        if (typeof images === 'string') {
            currentImages = [images];
        } else {
            currentImages = images;
        }

        currentImageIndex = 0;
        showImage(currentImageIndex);

        lightbox.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling

        // Show/Hide navigation buttons based on number of images
        if (currentImages.length > 1) {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    }
}

function closeLightbox(event) {
    // Only close if clicking the background or the close button
    if (event && event.target.id !== 'lightbox' && !event.target.classList.contains('close-lightbox')) {
        return;
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
}

function changeImage(n) {
    showImage(currentImageIndex += n);
}

function showImage(n) {
    const lightboxImg = document.getElementById('lightbox-img');

    if (n >= currentImages.length) { currentImageIndex = 0 }
    if (n < 0) { currentImageIndex = currentImages.length - 1 }

    lightboxImg.src = currentImages[currentImageIndex];
}

// Close lightbox on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === "block") {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    // Arrow keys navigation
    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
    if (event.key === "ArrowRight") {
        changeImage(1);
    }
});
