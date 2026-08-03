document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Tracking Simulation
    const trackBtn = document.getElementById('track-btn');
    const trackingInput = document.getElementById('tracking-input');
    const trackingResult = document.getElementById('tracking-result');

    trackBtn.addEventListener('click', () => {
        const val = trackingInput.value.trim();
        if (!val) return;

        trackingResult.style.display = 'block';
        trackingResult.style.backgroundColor = '#f0f0f0';
        trackingResult.style.color = '#333';
        trackingResult.textContent = 'Searching...';

        setTimeout(() => {
            trackingResult.style.backgroundColor = '#e8f5e9';
            trackingResult.style.color = '#2e7d32';
            trackingResult.innerHTML = `<strong>Status:</strong> In Transit <br> <strong>Expected Arrival:</strong> Tomorrow by 5:00 PM`;
        }, 1500);
    });

    // Quote Calculator
    const quoteForm = document.getElementById('quote-form');
    const quoteResult = document.getElementById('quote-result');

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const serviceMultiplier = parseFloat(document.getElementById('service-type').value);
        const weight = parseFloat(document.getElementById('weight').value);

        if (isNaN(serviceMultiplier) || isNaN(weight)) return;

        const baseRate = 50;
        const total = (baseRate + (weight * serviceMultiplier * 2)).toFixed(2);

        quoteResult.style.display = 'block';
        quoteResult.style.backgroundColor = '#fff3e0';
        quoteResult.style.color = '#e65100';
        quoteResult.innerHTML = `Estimated Shipping Cost: <strong>$${total}</strong> <br> <small>*Final price may vary based on specific requirements.</small>`;
    });

    // Mobile Menu Toggle (Simplified)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            alert('Mobile menu functionality would open here!');
        });
    }
});
