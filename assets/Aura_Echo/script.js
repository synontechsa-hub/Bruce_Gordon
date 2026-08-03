document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Scroll Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Simple hamburger to X animation could be added here
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

    // 3. Cart Drawer Toggle
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartDrawer = document.getElementById('cart-drawer');

    cartToggle.addEventListener('click', () => {
        cartDrawer.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
    });

    // Close drawer when clicking overlay
    cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) {
            cartDrawer.classList.remove('active');
        }
    });

    // 4. "Add to Cart" Simulation
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    const cartCount = document.getElementById('cart-count');
    const toast = document.getElementById('toast');
    const cartItemsList = document.getElementById('cart-items-list');

    let count = 0;

    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent product click

            // Update counter
            count++;
            cartCount.textContent = count;

            // Update cart drawer UI (simple simulation)
            if (count === 1) {
                cartItemsList.innerHTML = '';
            }

            const productName = btn.closest('.product-item').querySelector('h4').textContent;
            const productPrice = btn.closest('.product-item').querySelector('.price').textContent;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item-added';
            cartItem.style.padding = '10px 0';
            cartItem.style.borderBottom = '1px solid #eee';
            cartItem.innerHTML = `<strong>${productName}</strong> - ${productPrice}`;
            cartItemsList.appendChild(cartItem);

            // Show Toast
            showToast(`Added ${productName} to cart`);
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. Product Item Click (Simple redirect simulation)
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('h4').textContent;
            console.log(`Navigating to product: ${name}`);
            // In a real app: window.location.href = `/product/${name.toLowerCase().replace(' ', '-')}`;
        });
    });
});
