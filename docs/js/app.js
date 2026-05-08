/**
 * PDP logic. Uses Ring shared state module.
 */
(function () {
    'use strict';

    const SIZE_PRICE = Ring.CONST.device.sizePrice;
    const INSTALL_SIZE_PRICE = Ring.CONST.install.sizePrice;
    const SIZE_LABEL = Ring.CONST.device.sizeLabels || { '1': '1 Camera', '2': '2 Cameras', '3': '3 Cameras' };
    const INSTALL_LABEL = { '1': '1 Device', '2': '2 Devices', '3': '3 Devices' };

    // Always start fresh on PDP (1 camera, no install selected)
    Ring.clearState();
    const state = Ring.defaultState();

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

    // ---------- render ----------
    function renderPrice(amount) {
        const s = Ring.fmtSplit(amount);
        priceDisplay.innerHTML =
            '<span class="dollar">$</span>' +
            '<span class="whole">' + s.whole + '</span>' +
            '<span class="frac">' + s.frac + '</span>';
    }

    function syncInstallUI() {
        installCheck.checked = state.install.selected;
        popoverCta.textContent = 'Add to Order';
    }

    function updateInstallPrice(size, animate) {
        var newPrice = INSTALL_SIZE_PRICE[size];
        state.install.price = newPrice;
        var priceStr = Ring.fmt(newPrice);
        var sizeStr = INSTALL_LABEL[size] || SIZE_LABEL[size];
        var wrap = document.querySelector('.add-items-wrap');
        if (!wrap) return;

        function applyValues() {
            var rowPrice = document.querySelector('.add-items-row .row-price');
            if (rowPrice) rowPrice.textContent = priceStr;
            var popPrice = document.querySelector('.pop-price');
            if (popPrice) popPrice.textContent = priceStr;
            var rowTitle = document.getElementById('install-row-title');
            if (rowTitle) rowTitle.textContent = 'Professional Installation by HelloTech (' + sizeStr + ')';
            var popTitle = document.getElementById('pop-title');
            if (popTitle) popTitle.textContent = 'Professional Installation by HelloTech (' + sizeStr + ')';
            wrap.classList.remove('loading');
        }

        if (animate) {
            wrap.classList.add('loading');
            setTimeout(applyValues, 600);
        } else {
            applyValues();
        }
    }

    // ---------- variant selection ----------
    if (colorGroup) {
        // restore color
        colorGroup.querySelectorAll('.color-swatch').forEach(b => {
            b.classList.toggle('selected', b.dataset.color === state.device.color);
        });
        if (colorLabel) colorLabel.textContent = state.device.color;

        colorGroup.addEventListener('click', function (e) {
            const btn = e.target.closest('.color-swatch');
            if (!btn) return;
            colorGroup.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            state.device.color = btn.dataset.color;
            if (colorLabel) colorLabel.textContent = state.device.color;
        });
    }

    if (sizeGroup) {
        sizeGroup.querySelectorAll('.size-tile').forEach(t => {
            t.classList.toggle('selected', t.dataset.size === state.device.size);
        });
        if (sizeLabel) sizeLabel.textContent = SIZE_LABEL[state.device.size];
        renderPrice(state.device.unitPrice);

        sizeGroup.addEventListener('click', function (e) {
            const tile = e.target.closest('.size-tile');
            if (!tile) return;
            sizeGroup.querySelectorAll('.size-tile').forEach(t => t.classList.remove('selected'));
            tile.classList.add('selected');
            state.device.size = tile.dataset.size;
            state.device.unitPrice = SIZE_PRICE[state.device.size];
            state.device.quantity = 1;
            if (qtySelect) qtySelect.selectedIndex = 0;
            if (sizeLabel) sizeLabel.textContent = SIZE_LABEL[state.device.size];
            renderPrice(state.device.unitPrice);
            // Default install cameras to match device size (user can override in popover)
            state.install.cameras = state.device.size;
            updateInstallPrice(state.device.size, true);
        });
    }

    if (qtySelect) {
        qtySelect.selectedIndex = Math.max(0, state.device.quantity - 1);
        qtySelect.addEventListener('change', function () {
            state.device.quantity = qtySelect.selectedIndex + 1;
            state.install.quantity = state.device.quantity;
        });
    }

    // ---------- install row ----------
    if (installCheck) {
        installCheck.addEventListener('change', function () {
            state.install.selected = installCheck.checked;
        });
    }
    // ---------- popover ----------
    function syncPopoverTiles() {
        var currentInstallSize = state.install.cameras || state.device.size;
        var tiles = popover.querySelectorAll('.popover-tile');
        tiles.forEach(function(t) {
            var isSelected = t.dataset.size === currentInstallSize;
            t.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });
    }

    function openPopover() {
        popover.classList.add('open');
        popover.setAttribute('aria-hidden', 'false');
        document.body.classList.add('popover-open');
        syncInstallUI();
        syncPopoverTiles();
    }
    function closePopover() {
        popover.classList.remove('open');
        popover.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('popover-open');
    }
    // Tapping the text area or chevron opens the popover (not the checkbox area)
    if (installText) {
        installText.addEventListener('click', function () {
            openPopover();
        });
    }
    if (installChev) installChev.addEventListener('click', function (e) { e.stopPropagation(); openPopover(); });
    if (popoverCancel) popoverCancel.addEventListener('click', closePopover);
    if (popoverCta) popoverCta.addEventListener('click', function () {
        state.install.selected = true;
        syncInstallUI();
        closePopover();
    });

    // Tile selection within popover — only changes install camera count, NOT device size
    var tileGroup = popover ? popover.querySelector('.popover-tile-group') : null;
    if (tileGroup) {
        tileGroup.addEventListener('click', function (e) {
            var tile = e.target.closest('.popover-tile');
            if (!tile) return;
            var newInstallSize = tile.dataset.size;
            if (newInstallSize === (state.install.cameras || state.device.size)) return;

            state.install.cameras = newInstallSize;
            updateInstallPrice(newInstallSize, false);
            syncPopoverTiles();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popover && popover.classList.contains('open')) closePopover();
    });

    // ---------- add to cart / buy now ----------
    function persistAndGo(url) {
        Ring.writeState(state);
        sessionStorage.setItem('ring.pdp.scrollY', window.scrollY);
        window.location.href = url;
    }
    if (addToCartBtn) addToCartBtn.addEventListener('click', function () {
        // If install already selected → skip upsell, go to cart
        // If not selected → show cart-upsell for a chance to add it
        persistAndGo(state.install.selected ? Ring.CONST.urls.cart : Ring.CONST.urls.cartUpsell);
    });
    if (buyNowBtn) buyNowBtn.addEventListener('click', function () {
        persistAndGo(Ring.CONST.urls.checkout);
    });

    // initial sync
    if (!state.install.cameras) state.install.cameras = state.device.size;
    syncInstallUI();
    updateInstallPrice(state.install.cameras);
})();
