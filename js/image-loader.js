// Image Loading Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading states for all card images
    initializeImageLoading();

    // Enhanced skeleton loading for slow connections
    document.querySelectorAll('.card-img-top').forEach(function(img) {
        // Remove skeleton immediately, will add if slow
        img.classList.remove('skeleton-loading');
        let skeletonTimeout = setTimeout(function() {
            if (!img.complete) {
                img.classList.add('skeleton-loading');
            }
        }, 300); // 300ms threshold for 'slow' loading

        img.addEventListener('load', function() {
            clearTimeout(skeletonTimeout);
            img.classList.remove('skeleton-loading');
            img.classList.remove('grey-placeholder');
        });
        img.addEventListener('error', function() {
            clearTimeout(skeletonTimeout);
            img.classList.remove('skeleton-loading');
            img.classList.add('grey-placeholder');
        });
    });
});

function initializeImageLoading() {
    // No loading state logic needed
}

// Function to reload images (useful for dynamic content)
function reloadImages() {
    // No loading state logic needed
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