/**
 * Ring Installation Prototype — PDP logic
 *
 * State shape (persisted to localStorage under key "ring.pdp.state"
 * on Add to cart / Buy Now):
 *
 * {
 *   device: { id, name, color, size, unitPrice, quantity },
 *   install: { selected, price, provider }
 * }
 */

(function () {
    'use strict';

    const SIZE_PRICE = { '1': 279.99, '2': 499.99, '3': 779.98 };
    const SIZE_LABEL = { '1': '1 Camera', '2': '2 Cameras', '3': '3 Cameras' };

    const state = {
        device: {
            id: 'ring-floodlight-cam-pro-wired',
            name: 'Ring Floodlight Cam Pro, Wired (newest model)',
            color: 'White',
            size: '1',
            unitPrice: 279.99,
            quantity: 1
        },
        install: {
            selected: false,
            price: 129.99,
            provider: 'Amazon Pro'
        }
    };

    // ---------- DOM refs ----------
    const priceDisplay = document.getElementById('price-display');
    const colorGroup = document.getElementById('color-group');
    const colorLabel = document.getElementById('color-label');
    const sizeGroup = document.getElementById('size-group');
    const sizeLabel = document.getElementById('size-label');
    const qtySelect = document.getElementById('qty');
    const installCheck = document.getElementById('install-check');
    const installText = document.getElementById('install-text');
    const installChev = document.getElementById('install-chev');
    const popover = document.getElementById('install-popover');
    const popoverCancel = document.getElementById('popover-cancel');
    const popoverCta = document.getElementById('popover-cta');
    const addToCartBtn = document.getElementById('btn-add-to-cart');
    const buyNowBtn = document.getElementById('btn-buy-now');

    // ---------- Render helpers ----------
    function renderPrice(amount) {
        const whole = Math.floor(amount);
        const frac = Math.round((amount - whole) * 100).toString().padStart(2, '0');
        priceDisplay.innerHTML =
            '<span class="dollar">$</span>' +
            '<span class="whole">' + whole + '</span>' +
            '<span class="frac">' + frac + '</span>';
    }

    // ---------- Color swatches ----------
    colorGroup.addEventListener('click', function (e) {
        const btn = e.target.closest('.color-swatch');
        if (!btn) return;
        colorGroup.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.device.color = btn.dataset.color;
        colorLabel.textContent = state.device.color;
    });

    // ---------- Size tiles ----------
    sizeGroup.addEventListener('click', function (e) {
        const tile = e.target.closest('.size-tile');
        if (!tile) return;
        sizeGroup.querySelectorAll('.size-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        state.device.size = tile.dataset.size;
        state.device.unitPrice = SIZE_PRICE[state.device.size];
        sizeLabel.textContent = SIZE_LABEL[state.device.size];
        renderPrice(state.device.unitPrice);
    });

    // ---------- Quantity ----------
    qtySelect.addEventListener('change', function () {
        state.device.quantity = qtySelect.selectedIndex + 1;
    });

    // ---------- Install row checkbox + text tap ----------
    function syncInstallUI() {
        installCheck.checked = state.install.selected;
        updatePopoverCtaLabel();
    }
    installCheck.addEventListener('change', function () {
        state.install.selected = installCheck.checked;
    });
    installText.addEventListener('click', function () {
        state.install.selected = !state.install.selected;
        syncInstallUI();
    });

    // ---------- Popover open/close ----------
    function openPopover() {
        popover.classList.add('open');
        popover.setAttribute('aria-hidden', 'false');
        document.body.classList.add('popover-open');
        updatePopoverCtaLabel();
    }
    function closePopover() {
        popover.classList.remove('open');
        popover.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('popover-open');
    }
    function updatePopoverCtaLabel() {
        popoverCta.textContent = state.install.selected ? 'Update' : 'Add to Order';
    }

    installChev.addEventListener('click', function (e) {
        e.stopPropagation();
        openPopover();
    });
    popoverCancel.addEventListener('click', closePopover);
    popoverCta.addEventListener('click', function () {
        state.install.selected = true;
        syncInstallUI();
        closePopover();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popover.classList.contains('open')) {
            closePopover();
        }
    });

    // ---------- Add to cart / Buy Now ----------
    function persistAndGo(nextUrl) {
        try {
            localStorage.setItem('ring.pdp.state', JSON.stringify(state));
        } catch (err) {
            // localStorage unavailable — continue anyway in prototype
        }
        window.location.href = nextUrl;
    }
    addToCartBtn.addEventListener('click', function () {
        persistAndGo('cart-upsell.html');
    });
    buyNowBtn.addEventListener('click', function () {
        persistAndGo('cart.html');
    });

    // ---------- Initial render ----------
    renderPrice(state.device.unitPrice);
    syncInstallUI();
})();
