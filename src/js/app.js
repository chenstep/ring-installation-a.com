/**
 * Ring Installation Prototype - Interaction Logic
 * Handles: checkbox toggle, Add to Cart routing, page transitions
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // PDP PAGE: Installation checkbox interaction
    // ==========================================
    const installationCheckbox = document.getElementById('installation-checkbox');
    const installationCard = document.getElementById('installation-card');
    const buyBoxSummary = document.getElementById('buy-box-installation-summary');
    const addToCartBtn = document.getElementById('btn-add-to-cart');

    if (installationCheckbox && installationCard) {
        // Toggle checkbox when card is tapped
        installationCard.addEventListener('click', function(e) {
            // Don't double-toggle if they clicked the checkbox itself
            if (e.target !== installationCheckbox) {
                installationCheckbox.checked = !installationCheckbox.checked;
            }
            updateInstallationUI();
        });

        // Also handle direct checkbox change
        installationCheckbox.addEventListener('change', function() {
            updateInstallationUI();
        });

        function updateInstallationUI() {
            if (installationCheckbox.checked) {
                buyBoxSummary.classList.remove('hidden');
                installationCard.style.background = '#F0F9F4';
                installationCard.style.borderLeft = '3px solid #067D62';
            } else {
                buyBoxSummary.classList.add('hidden');
                installationCard.style.background = '';
                installationCard.style.borderLeft = '';
            }
        }
    }

    // ==========================================
    // PDP PAGE: Add to Cart button routing
    // ==========================================
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            if (installationCheckbox && installationCheckbox.checked) {
                // Installation selected → go directly to cart
                window.location.href = 'cart.html';
            } else {
                // No installation → show upsell page
                window.location.href = 'cart-upsell.html';
            }
        });
    }

});
