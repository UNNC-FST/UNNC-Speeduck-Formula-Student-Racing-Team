// script.js

// Function to handle smooth scrolling
function scrollToSpecs() {
    // 1. Find the section with id="specs"
    const specsSection = document.getElementById('specs');
    
    // 2. Use the built-in 'scrollIntoView' method with 'smooth' behavior
    specsSection.scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Optional: Add a scroll listener to change navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    // If we scroll down more than 50px, make navbar solid black
    if (window.scrollY > 50) {
        navbar.style.background = '#000000';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.8)';
    }
});
