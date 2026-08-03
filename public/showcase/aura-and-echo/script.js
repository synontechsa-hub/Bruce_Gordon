document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Scroll Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Drawer Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            mobileNav.setAttribute('aria-hidden', 'false');
        });
    }

    if (mobileClose && mobileNav) {
        mobileClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileNav.setAttribute('aria-hidden', 'true');
        });
    }

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileNav.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // 3. Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            productItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                if (category === 'all' || itemCat === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Cart State Management
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCount = document.getElementById('cart-count');
    const drawerCount = document.getElementById('drawer-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const toast = document.getElementById('toast');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cartState = [];

    if (cartToggle && cartDrawer) {
        cartToggle.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartDrawer.setAttribute('aria-hidden', 'false');
        });
    }

    if (closeCart && cartDrawer) {
        closeCart.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
            cartDrawer.setAttribute('aria-hidden', 'true');
        });
    }

    if (cartDrawer) {
        cartDrawer.addEventListener('click', (e) => {
            if (e.target === cartDrawer) {
                cartDrawer.classList.remove('active');
                cartDrawer.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function updateCartUI() {
        const totalCount = cartState.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) cartCount.textContent = totalCount;
        if (drawerCount) drawerCount.textContent = totalCount;
        if (cartTotalPrice) cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

        if (cartItemsList) {
            if (cartState.length === 0) {
                cartItemsList.innerHTML = '<p class="empty-msg">Your shopping bag is currently empty.</p>';
            } else {
                cartItemsList.innerHTML = '';
                cartState.forEach((item, index) => {
                    const row = document.createElement('div');
                    row.className = 'cart-item-row';
                    row.innerHTML = `
                        <div class="cart-item-info">
                            <h5>${item.name}</h5>
                            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                        </div>
                        <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                    `;
                    cartItemsList.appendChild(row);
                });

                document.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(btn.getAttribute('data-index'), 10);
                        cartState.splice(idx, 1);
                        updateCartUI();
                        showToast('Item removed from cart');
                    });
                });
            }
        }
    }

    // Quick Add Buttons
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const itemElem = btn.closest('.product-item');
            const name = itemElem.getAttribute('data-name') || itemElem.querySelector('h4').textContent;
            const price = parseFloat(itemElem.getAttribute('data-price') || '299');

            const existingItem = cartState.find(i => i.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartState.push({ name, price, quantity: 1 });
            }

            updateCartUI();
            showToast(`Added ${name} to cart`);
        });
    });

    function showToast(message) {
        if (!toast) return;
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartState.length === 0) {
                showToast('Your cart is empty');
            } else {
                showToast('Proceeding to checkout...');
                setTimeout(() => {
                    cartState = [];
                    updateCartUI();
                    if (cartDrawer) cartDrawer.classList.remove('active');
                }, 1500);
            }
        });
    }

    // Newsletter submit
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed to Aura & Echo newsletter!');
            newsletterForm.reset();
        });
    }
});
