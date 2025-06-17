// Image Loading Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading states for all card images
    initializeImageLoading();
});

function initializeImageLoading() {
    const cardImgWrappers = document.querySelectorAll('.card-img-wrapper');
    
    cardImgWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (img) {
            // Add loading class to wrapper
            wrapper.classList.add('loading');
            
            // Handle image load event
            img.addEventListener('load', function() {
                // Add loaded class to image
                this.classList.add('loaded');
                
                // Add loaded class to wrapper after a short delay for smooth transition
                setTimeout(() => {
                    wrapper.classList.remove('loading');
                    wrapper.classList.add('loaded');
                }, 100);
            });
            
            // Handle image error event
            img.addEventListener('error', function() {
                // Remove loading state and show error placeholder
                wrapper.classList.remove('loading');
                wrapper.classList.add('error');
                
                // Create error placeholder
                const errorPlaceholder = document.createElement('div');
                errorPlaceholder.className = 'error-placeholder';
                errorPlaceholder.innerHTML = `
                    <div class="error-icon">
                        <i class="fas fa-image"></i>
                    </div>
                    <p>Image failed to load</p>
                `;
                
                // Replace the image with error placeholder
                this.style.display = 'none';
                wrapper.appendChild(errorPlaceholder);
            });
            
            // If image is already loaded (cached), trigger load event
            if (img.complete && img.naturalHeight !== 0) {
                img.dispatchEvent(new Event('load'));
            }
        }
    });
}

// Function to reload images (useful for dynamic content)
function reloadImages() {
    const cardImgWrappers = document.querySelectorAll('.card-img-wrapper');
    
    cardImgWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (img && img.dataset.src) {
            // Reset loading state
            wrapper.classList.remove('loaded', 'error');
            wrapper.classList.add('loading');
            
            // Remove any error placeholders
            const errorPlaceholder = wrapper.querySelector('.error-placeholder');
            if (errorPlaceholder) {
                errorPlaceholder.remove();
            }
            
            // Show image again
            img.style.display = '';
            img.classList.remove('loaded');
            
            // Reload image
            img.src = img.dataset.src;
        }
    });
}

// Lazy loading enhancement
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
}); 