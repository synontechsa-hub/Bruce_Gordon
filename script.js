document.addEventListener('DOMContentLoaded', () => {

  // --- REVEAL ON SCROLL ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- NAV SCROLL EFFECT (throttled via rAF) ---
  const nav = document.querySelector('nav');
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.style.padding = '0.8rem 2rem';
        } else {
          nav.style.padding = '1rem 2rem';
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });


  // --- DYNAMIC YEAR ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // --- ENGINEERING SLIDESHOW ---
  const slides = document.querySelectorAll('.eng-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };
    setInterval(nextSlide, 5000); // Change image every 5 seconds
  }


  // --- CNC SLIDESHOW & DYNAMIC INFO SYNC ---
  const cncProjects = [
    {
      name: 'Sandton City Tower',
      location: 'Johannesburg, Gauteng',
      description: 'External facade cladding installed to look like "lightning bolts" cut from 2mm solid aluminium powdercoated to match 4 colours'
    },
    {
      name: 'Telesure Head Office',
      location: 'Steyn City, Johannesburg',
      description: 'High-precision CNC routed composite panels, custom architectural cladding, and illuminated corporate branding.'
    },
    {
      name: '15 Alice Lane',
      location: 'Sandton, Johannesburg',
      description: 'Architectural exterior facade panels, precision CNC cut aluminium cladding, and custom building accents.'
    },
    {
      name: 'BCX Headquarters',
      location: 'Midrand, Gauteng',
      description: 'Bespoke 3D metal signage, CNC routed wall features, and powdercoated exterior architectural cladding.'
    },
    {
      name: 'Gateway West & PwC',
      location: 'Waterfall City, Midrand',
      description: 'Large-format exterior building cladding, CNC precision sheet metal fabrication, and premium architectural finishes.'
    }
  ];

  function setupCncShowcase() {
    const desktopSlideshow = document.getElementById('cnc-slideshow');
    const mobileSlideshow  = document.getElementById('m-cnc-slideshow');
    if (!desktopSlideshow && !mobileSlideshow) return;

    const desktopSlides = desktopSlideshow ? desktopSlideshow.querySelectorAll('img') : [];
    const mobileSlides  = mobileSlideshow ? mobileSlideshow.querySelectorAll('img') : [];
    const dots          = document.querySelectorAll('.cnc-dot');
    
    // Text Targets Desktop
    const nameTextEl = document.getElementById('cnc-name-text');
    const locTextEl  = document.getElementById('cnc-location-text');
    const descTextEl = document.getElementById('cnc-desc-text');

    // Text Targets Mobile
    const mNameEl = document.getElementById('m-cnc-name');
    const mLocEl  = document.getElementById('m-cnc-location');
    const mDescEl = document.getElementById('m-cnc-desc');

    let currentIndex = 0;
    const total = cncProjects.length;

    function goToSlide(index) {
      currentIndex = (index + total) % total;

      // Update Desktop Slides
      desktopSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      // Update Mobile Slides
      mobileSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      // Update Dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      // Update Text Content
      const data = cncProjects[currentIndex];
      if (nameTextEl) nameTextEl.textContent = data.name;
      if (locTextEl)  locTextEl.textContent  = data.location;
      if (descTextEl) descTextEl.textContent = data.description;

      if (mNameEl) mNameEl.textContent = data.name;
      if (mLocEl)  mLocEl.textContent  = data.location;
      if (mDescEl) mDescEl.textContent = data.description;
    }

    // Controls
    const prevBtn = document.getElementById('cnc-prev-btn');
    const nextBtn = document.getElementById('cnc-next-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        goToSlide(idx);
      });
    });

    // Auto Rotation
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  setupCncShowcase();


  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for fixed nav
          behavior: 'smooth'
        });
      }
    });
  });


  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.textContent = isOpen ? '✕' : '☰';
    });

    // Close when a link inside the mobile nav is tapped
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamburger.textContent = '☰';
      });
    });

    // Close on outside tap
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamburger.textContent = '☰';
      }
    });
  }

});
