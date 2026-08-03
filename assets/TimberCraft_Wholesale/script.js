document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Drawer Navigation
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 3. Timber Volume & Board Feet Calculator Engine
    const lengthInput = document.getElementById('calc-length');
    const widthInput = document.getElementById('calc-width');
    const thicknessInput = document.getElementById('calc-thickness');
    const quantityInput = document.getElementById('calc-quantity');
    const volumeResultDisplay = document.getElementById('volume-result');
    const boardfeetResultDisplay = document.getElementById('boardfeet-result');

    function calculateTimberVolume() {
        const l = parseFloat(lengthInput.value) || 0;
        const w = parseFloat(widthInput.value) || 0;
        const t = parseFloat(thicknessInput.value) || 0;
        const q = parseFloat(quantityInput.value) || 1;

        // Cubic Meters calculation: (L * W * T * Q) / 1,000,000,000
        const totalCubicMeters = (l * w * t * q) / 1000000000;
        
        // Board Feet conversion: 1 cubic meter = 423.7760007 Board Feet
        const totalBoardFeet = totalCubicMeters * 423.776;

        if (volumeResultDisplay) volumeResultDisplay.textContent = totalCubicMeters.toFixed(4);
        if (boardfeetResultDisplay) boardfeetResultDisplay.textContent = totalBoardFeet.toFixed(2);
    }

    [lengthInput, widthInput, thicknessInput, quantityInput].forEach(input => {
        if (input) {
            input.addEventListener('input', calculateTimberVolume);
        }
    });

    // Initial calculation on page load
    calculateTimberVolume();

    // 4. Species Accordion Interaction
    const speciesItems = document.querySelectorAll('.species-item');

    speciesItems.forEach(item => {
        const itemHeader = item.querySelector('.species-header');
        if (itemHeader) {
            itemHeader.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items
                speciesItems.forEach(s => {
                    s.classList.remove('active');
                    const icon = s.querySelector('.accordion-icon i');
                    if (icon) icon.className = 'fas fa-plus';
                });

                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.accordion-icon i');
                    if (icon) icon.className = 'fas fa-minus';
                }
            });
        }
    });

    // 5. Trade Quote Form Submit
    const tradeQuoteForm = document.getElementById('trade-quote-form');
    const quoteFeedback = document.getElementById('quote-feedback');

    if (tradeQuoteForm) {
        tradeQuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = tradeQuoteForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }

            setTimeout(() => {
                tradeQuoteForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Quote Request';
                }

                if (quoteFeedback) {
                    quoteFeedback.style.display = 'block';
                    quoteFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your wholesale trade quote request has been submitted. A lumber representative will respond within 24 hours.';
                    setTimeout(() => {
                        quoteFeedback.style.display = 'none';
                    }, 6000);
                }
            }, 1000);
        });
    }
});
