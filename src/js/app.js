/* Ring Installation Prototype - Interaction Logic */

document.addEventListener('DOMContentLoaded', function() {
    
    // Installation checkbox logic
    const installCheckbox = document.getElementById('installation-checkbox');
    const installationSummary = document.getElementById('buy-box-installation-summary');
    const addToCartBtn = document.getElementById('btn-add-to-cart');
    
    if (installCheckbox) {
        installCheckbox.addEventListener('change', function() {
            if (installationSummary) {
                if (this.checked) {
                    installationSummary.classList.remove('hidden');
                } else {
                    installationSummary.classList.add('hidden');
                }
            }
        });
    }

    // Clicking the installation card toggles the checkbox
    const installCard = document.getElementById('installation-card');
    if (installCard) {
        installCard.addEventListener('click', function(e) {
            // Don't toggle if clicking the checkbox directly or the "Service details" link
            if (e.target === installCheckbox || e.target.tagName === 'A') return;
            if (installCheckbox) {
                installCheckbox.checked = !installCheckbox.checked;
                installCheckbox.dispatchEvent(new Event('change'));
            }
        });
    }

    // Add to Cart button logic
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const installationSelected = installCheckbox && installCheckbox.checked;
            
            // Store selection in sessionStorage for next page
            sessionStorage.setItem('installationSelected', installationSelected);
            sessionStorage.setItem('deviceInCart', 'true');
            
            if (installationSelected) {
                // Skip upsell, go directly to cart
                window.location.href = 'cart.html';
            } else {
                // Show upsell page
                window.location.href = 'cart-upsell.html';
            }
        });
    }

    // Cart upsell page logic
    const addInstallBtn = document.getElementById('btn-add-installation');
    const noThanksBtn = document.getElementById('btn-no-thanks');
    
    if (addInstallBtn) {
        addInstallBtn.addEventListener('click', function() {
            sessionStorage.setItem('installationSelected', 'true');
            window.location.href = 'cart.html';
        });
    }
    
    if (noThanksBtn) {
        noThanksBtn.addEventListener('click', function() {
            sessionStorage.setItem('installationSelected', 'false');
            window.location.href = 'cart.html';
        });
    }

    // Cart page logic
    const proceedToCheckoutBtn = document.getElementById('btn-proceed-checkout');
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }

    const removeInstallationBtn = document.getElementById('btn-remove-installation');
    if (removeInstallationBtn) {
        removeInstallationBtn.addEventListener('click', function() {
            sessionStorage.setItem('installationSelected', 'false');
            // Reload cart to reflect changes
            window.location.reload();
        });
    }

    // Checkout page logic
    const placeOrderBtn = document.getElementById('btn-place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            window.location.href = 'thankyou.html';
        });
    }

    // Thank you page logic
    const viewOrderBtn = document.getElementById('btn-view-order');
    if (viewOrderBtn) {
        viewOrderBtn.addEventListener('click', function() {
            window.location.href = 'orders.html';
        });
    }

    // Orders page logic
    const cancelInstallBtn = document.getElementById('btn-cancel-installation');
    if (cancelInstallBtn) {
        cancelInstallBtn.addEventListener('click', function() {
            window.location.href = 'cancellation.html';
        });
    }

    // Cancellation page logic
    const confirmCancelBtn = document.getElementById('btn-confirm-cancel');
    const keepInstallBtn = document.getElementById('btn-keep-installation');
    const cancelSuccess = document.getElementById('cancel-success');
    const cancelForm = document.getElementById('cancel-form');
    
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', function() {
            if (cancelForm) cancelForm.style.display = 'none';
            if (cancelSuccess) cancelSuccess.style.display = 'block';
            sessionStorage.setItem('installationSelected', 'false');
            sessionStorage.setItem('installationCancelled', 'true');
        });
    }
    
    if (keepInstallBtn) {
        keepInstallBtn.addEventListener('click', function() {
            window.location.href = 'orders.html';
        });
    }

    // Update cart display based on session storage
    updateCartDisplay();
});

function updateCartDisplay() {
    const installationSelected = sessionStorage.getItem('installationSelected') === 'true';
    const installationItems = document.querySelectorAll('.cart-installation-item');
    const installationLineItems = document.querySelectorAll('.installation-line-item');
    
    installationItems.forEach(item => {
        item.style.display = installationSelected ? 'block' : 'none';
    });
    
    installationLineItems.forEach(item => {
        item.style.display = installationSelected ? 'flex' : 'none';
    });

    // Update totals if on cart/checkout page
    updateTotals(installationSelected);
}

function updateTotals(includeInstallation) {
    const devicePrice = 199.99;
    const installPrice = 129.99;
    const subtotal = includeInstallation ? devicePrice + installPrice : devicePrice;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    const itemCountEl = document.getElementById('cart-item-count');
    
    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
    if (itemCountEl) itemCountEl.textContent = includeInstallation ? '2 items' : '1 item';
}
