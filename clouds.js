// Animated clouds background
(function() {
    // Create clouds container
    const cloudsContainer = document.createElement('div');
    cloudsContainer.className = 'clouds-container';
    document.body.prepend(cloudsContainer);

    // Cloud configuration
    const cloudConfig = {
        count: 8,
        minWidth: 80,
        maxWidth: 160,
        minHeight: 40,
        maxHeight: 60,
        minDuration: 40,
        maxDuration: 80
    };

    // Random number helper
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Create a single cloud
    function createCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';

        // Random size
        const width = random(cloudConfig.minWidth, cloudConfig.maxWidth);
        const height = random(cloudConfig.minHeight, cloudConfig.maxHeight);

        // Random vertical position
        const top = random(5, 60);

        // Random animation duration
        const duration = random(cloudConfig.minDuration, cloudConfig.maxDuration);

        // Random start delay
        const delay = random(0, 20);

        // Apply styles
        cloud.style.width = `${width}px`;
        cloud.style.height = `${height}px`;
        cloud.style.top = `${top}%`;
        cloud.style.left = '-200px';
        cloud.style.animationDuration = `${duration}s`;
        cloud.style.animationDelay = `-${delay}s`;

        return cloud;
    }

    // Initialize clouds
    function initClouds() {
        for (let i = 0; i < cloudConfig.count; i++) {
            const cloud = createCloud();
            cloudsContainer.appendChild(cloud);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClouds);
    } else {
        initClouds();
    }

    // Add parallax effect on scroll
    let ticking = false;

    function updateClouds() {
        const scrollY = window.pageYOffset;
        const clouds = document.querySelectorAll('.cloud');

        clouds.forEach((cloud, index) => {
            const speed = 0.1 + (index * 0.02);
            const yOffset = scrollY * speed;
            cloud.style.transform = `translateY(${yOffset}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateClouds);
            ticking = true;
        }
    });
})();
