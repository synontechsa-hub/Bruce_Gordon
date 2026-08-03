document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
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

    // 3. Live Shipment Tracking Timeline Engine
    const trackingDatabase = {
        'SP-88392': {
            route: 'Rotterdam, NL → Cape Town, ZA',
            status: 'In Transit',
            badgeClass: 'status-badge',
            steps: [
                { title: 'Cargo Received', time: 'Jun 28, 08:30 AM', state: 'completed' },
                { title: 'Customs Cleared', time: 'Jun 29, 02:15 PM', state: 'completed' },
                { title: 'Ocean Vessel Departure', time: 'Jul 01, 06:00 AM (In Transit)', state: 'active' },
                { title: 'Port Arrival & Final Delivery', time: 'Est. Jul 06, 04:00 PM', state: 'pending' }
            ]
        },
        'SP-94021': {
            route: 'Shanghai, CN → Los Angeles, US',
            status: 'Out for Delivery',
            badgeClass: 'status-badge',
            steps: [
                { title: 'Warehouse Departure', time: 'Jul 01, 10:00 AM', state: 'completed' },
                { title: 'Air Cargo Departure', time: 'Jul 02, 04:30 PM', state: 'completed' },
                { title: 'US Customs Cleared', time: 'Jul 03, 09:15 AM', state: 'completed' },
                { title: 'Out for Courier Delivery', time: 'Today by 5:00 PM', state: 'active' }
            ]
        },
        'SP-11048': {
            route: 'Frankfurt, DE → Singapore, SG',
            status: 'Customs Processing',
            badgeClass: 'status-badge',
            steps: [
                { title: 'Booking Confirmed', time: 'Jul 02, 11:00 AM', state: 'completed' },
                { title: 'Export Customs Inspection', time: 'Jul 03, 01:20 PM', state: 'active' },
                { title: 'Direct Flight Departure', time: 'Est. Jul 04, 08:00 AM', state: 'pending' },
                { title: 'Changi Airport Arrival', time: 'Est. Jul 05, 11:30 PM', state: 'pending' }
            ]
        }
    };

    const trackBtn = document.getElementById('track-btn');
    const trackingInput = document.getElementById('tracking-input');
    const trackingResult = document.getElementById('tracking-result');

    if (trackBtn && trackingInput) {
        trackBtn.addEventListener('click', () => {
            const rawVal = trackingInput.value.trim().toUpperCase();
            if (!rawVal) return;

            trackBtn.disabled = true;
            trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

            setTimeout(() => {
                trackBtn.disabled = false;
                trackBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Track Cargo';

                const record = trackingDatabase[rawVal] || {
                    route: 'Global Direct Transit',
                    status: 'Active Shipment',
                    steps: [
                        { title: 'Order Processed', time: 'Jul 02, 09:00 AM', state: 'completed' },
                        { title: 'Customs Verification', time: 'Jul 03, 11:45 AM', state: 'completed' },
                        { title: 'In Transit to Hub', time: 'In Transit', state: 'active' },
                        { title: 'Final Destination Delivery', time: 'Est. 2-3 Business Days', state: 'pending' }
                    ]
                };

                // Update DOM
                document.getElementById('res-tracking-id').textContent = rawVal;
                document.getElementById('res-route').textContent = record.route;
                document.getElementById('res-status-badge').textContent = record.status;

                // Render Timeline Steps
                record.steps.forEach((step, idx) => {
                    const stepElem = document.getElementById(`step-${idx + 1}`);
                    const timeElem = document.getElementById(`step-${idx + 1}-time`);
                    if (stepElem && timeElem) {
                        stepElem.className = `timeline-step ${step.state}`;
                        stepElem.querySelector('h5').textContent = step.title;
                        timeElem.textContent = step.time;
                    }
                });

                if (trackingResult) trackingResult.style.display = 'block';
            }, 600);
        });
    }

    // Auto-trigger default tracking code on page load
    if (trackBtn) {
        trackBtn.click();
    }

    // 4. Quote & Freight Estimator Logic
    const quoteForm = document.getElementById('quote-form');
    const quoteResult = document.getElementById('quote-result');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const origin = document.getElementById('origin').value.trim();
            const destination = document.getElementById('destination').value.trim();
            const serviceMultiplier = parseFloat(document.getElementById('service-type').value);
            const weight = parseFloat(document.getElementById('weight').value);

            if (!origin || !destination || isNaN(serviceMultiplier) || isNaN(weight)) return;

            const baseRate = 120;
            const weightCost = weight * serviceMultiplier * 2.8;
            const fuelSurcharge = weightCost * 0.08;
            const total = (baseRate + weightCost + fuelSurcharge).toFixed(2);

            let modeLabel = 'Air Freight';
            if (serviceMultiplier < 1) modeLabel = 'Ocean Container Cargo';
            else if (serviceMultiplier < 1.5) modeLabel = 'Express Road Transport';

            if (quoteResult) {
                quoteResult.style.display = 'block';
                quoteResult.className = 'result-message';
                quoteResult.style.backgroundColor = 'rgba(255, 107, 0, 0.08)';
                quoteResult.style.border = '1px solid rgba(255, 107, 0, 0.3)';
                quoteResult.style.color = '#002B5B';
                quoteResult.innerHTML = `
                    <div style="font-size: 0.85rem; font-weight: 700; color: #FF6B00; text-transform: uppercase;">Estimated Freight Quote</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #002B5B; margin: 0.3rem 0;">$${total} USD</div>
                    <div style="font-size: 0.9rem; color: #475569;">${modeLabel} &bull; ${weight} kg &bull; ${origin} → ${destination}</div>
                    <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.4rem;">*Includes fuel surcharge & compliance documentation. Official rate issued upon booking.</div>
                `;
            }
        });
    }

    // 5. Newsletter Subscription
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFeedback = document.getElementById('newsletter-feedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
            if (newsletterFeedback) {
                newsletterFeedback.style.display = 'block';
                newsletterFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! You have subscribed to SwiftPath Trade Intelligence.';
                setTimeout(() => {
                    newsletterFeedback.style.display = 'none';
                }, 5000);
            }
        });
    }
});
