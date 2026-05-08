/**
 * Shared constants and state helpers for the Ring Installation prototype.
 * Every page uses the same numbers, labels, and storage format.
 */
(function () {
    'use strict';

    const CONST = {
        device: {
            id: 'ring-floodlight-cam-pro-wired',
            name: 'Ring Floodlight Cam Pro, Wired (newest model)',
            shortName: 'Ring Floodlight Cam Pro',
            defaults: { color: 'White', size: '1', quantity: 1 },
            sizePrice: { '1': 279.99, '2': 499.99, '3': 779.98 },
            image: '/ring-installation-a.com/images/ring-product-hero.jpg',
            listPrice: 319.99, // for the strikethrough + -12% deal
            discountPct: 12
        },
        install: {
            name: 'Professional Installation',
            longName: 'Professional Installation by HelloTech',
            provider: 'HelloTech',
            price: 129.00,
            sizePrice: { '1': 129.00, '2': 248.00, '3': 349.00 },
            logo: '/ring-installation-a.com/assets/hellotech-logo.png'
        },
        user: {
            firstName: 'Harry',
            fullName: 'Harry Potter',
            address: '11 Diagon Alley, #11, Hogwarts 00000',
            addressShort: 'Hogwarts 00000',
            phone: '+1 (800) 555-0100'
        },
        payment: { last4: '0000', brand: 'Visa' },
        order: {
            number: '112-9644586-3876244',
            installNumber: '112-9644586-3876245',
            datePlaced: 'May 4, 2026'
        },
        taxRate: 0.08,
        urls: {
            pdp: '/ring-installation-a.com/dp/B0F67KWWQH',
            cart: '/ring-installation-a.com/gp/cart/view.html',
            cartUpsell: '/ring-installation-a.com/gp/cart/upsell',
            checkout: '/ring-installation-a.com/gp/buy/spc/handlers/display.html',
            thankyou: '/ring-installation-a.com/gp/buy/thankyou',
            orders: '/ring-installation-a.com/gp/your-account/order-history',
            orderDetails: '/ring-installation-a.com/gp/your-account/order-details',
            invoice: '/ring-installation-a.com/gp/your-account/order-details/invoice',
            cancel: '/ring-installation-a.com/gp/help/customer/cancel-items',
            installPdp: '/ring-installation-a.com/dp/B09INSTALL1'
        }
    };

    const STATE_KEY = 'ring.journey.state';

    function defaultState() {
        return {
            device: {
                id: CONST.device.id,
                name: CONST.device.name,
                color: CONST.device.defaults.color,
                size: CONST.device.defaults.size,
                unitPrice: CONST.device.sizePrice[CONST.device.defaults.size],
                quantity: CONST.device.defaults.quantity
            },
            install: {
                selected: false,
                price: CONST.install.price,
                provider: CONST.install.provider,
                quantity: 1
            }
        };
    }

    function readState() {
        try {
            const raw = localStorage.getItem(STATE_KEY);
            if (!raw) return defaultState();
            const s = JSON.parse(raw);
            // migrate-safe: fill missing fields
            const base = defaultState();
            return {
                device: Object.assign({}, base.device, s.device || {}),
                install: Object.assign({}, base.install, s.install || {})
            };
        } catch (e) {
            return defaultState();
        }
    }

    function writeState(s) {
        try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
    }

    function clearState() {
        try { localStorage.removeItem(STATE_KEY); } catch (e) { /* ignore */ }
    }

    // ---------- money ----------
    function fmt(n) {
        return '$' + Number(n).toFixed(2);
    }
    function fmtSplit(n) {
        const whole = Math.floor(n);
        const frac = Math.round((n - whole) * 100).toString().padStart(2, '0');
        return { whole, frac };
    }

    // ---------- totals ----------
    function computeTotals(state) {
        const deviceSubtotal = state.device.unitPrice * state.device.quantity;
        const installSubtotal = state.install.selected ? state.install.price * state.install.quantity : 0;
        const itemsSubtotal = deviceSubtotal + installSubtotal;
        const tax = itemsSubtotal * CONST.taxRate;
        const grand = itemsSubtotal + tax;
        const itemCount = state.device.quantity + (state.install.selected ? state.install.quantity : 0);
        return { deviceSubtotal, installSubtotal, itemsSubtotal, tax, grand, itemCount };
    }

    // ---------- shared amazon header (renders into a selector) ----------
    function renderHeader(selector, opts) {
        const el = document.querySelector(selector);
        if (!el) return;
        const cartCount = (opts && opts.cartCount != null) ? opts.cartCount : 0;
        el.innerHTML = [
            '<header class="amz-header">',
            '  <div class="amz-header-top">',
            '    <div class="amz-hamburger" aria-label="Menu">',
            '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
            '    </div>',
            '    <div class="amz-logo-prime">',
            '      <svg width="80" height="24" viewBox="0 0 602 182" xmlns="http://www.w3.org/2000/svg" aria-label="amazon"><path fill="#fff" d="M373.642 141.938c-34.999 25.797-85.729 39.561-129.406 39.561-61.243 0-116.377-22.651-158.088-60.325-3.277-2.963-.341-7.005 3.592-4.699 45.014 26.191 100.673 41.947 158.166 41.947 38.775 0 81.429-8.022 120.698-24.674 5.926-2.516 10.882 3.879 5.038 8.19"/><path fill="#FF9900" d="M386.998 126.79c-4.464-5.72-29.572-2.705-40.846-1.363-3.434.419-3.959-2.569-.865-4.719 20.003-14.078 52.827-10.015 56.655-5.296 3.828 4.745-.996 37.648-19.794 53.352-2.884 2.412-5.638 1.127-4.359-2.074 4.228-10.565 13.673-34.18 9.209-39.9"/><path fill="#fff" d="M347.077 20.895V6.787c0-2.145 1.624-3.579 3.579-3.579h63.327c2.033 0 3.658 1.467 3.658 3.579v12.089c-.024 2.057-1.757 4.745-4.825 9.005l-32.8 46.833c12.186-.298 25.065 1.519 36.13 7.762 2.495 1.41 3.171 3.482 3.362 5.527v15.046c0 2.074-2.289 4.494-4.699 3.242-19.634-10.293-45.721-11.418-67.419.109-2.214 1.188-4.527-1.191-4.527-3.266v-14.294c0-2.316.024-6.268 3.194-9.785l38.003-54.528h-33.078c-2.033 0-3.658-1.443-3.658-3.555l-.447.028zM124.679 105.669h-19.254c-1.84-.133-3.306-1.519-3.434-3.29V6.97c0-1.982 1.649-3.555 3.688-3.555h17.94c1.865.085 3.355 1.519 3.482 3.326v13.517h.35c4.669-12.961 13.44-18.993 25.239-18.993 12.001 0 19.502 6.032 24.888 18.993 4.645-12.961 15.2-18.993 26.499-18.993 8.044 0 16.833 3.326 22.198 10.791 6.064 8.298 4.825 20.363 4.825 30.928l-.024 59.248c0 1.982-1.649 3.579-3.688 3.579h-19.23c-1.916-.133-3.458-1.673-3.458-3.579V52.484c0-4.159.35-14.545-.541-18.488-1.443-6.632-5.77-8.503-11.367-8.503-4.669 0-9.56 3.133-11.554 8.131-1.994 4.997-1.808 13.332-1.808 18.86v49.748c0 1.982-1.649 3.579-3.688 3.579h-19.23c-1.94-.133-3.458-1.673-3.458-3.579l-.024-49.748c0-11.012 1.808-27.207-11.908-27.207-13.877 0-13.341 15.807-13.341 27.207v49.748c0 1.982-1.649 3.579-3.688 3.579l.127-.133zM469.15 1.265c28.607 0 44.089 24.562 44.089 55.788 0 30.159-17.104 54.105-44.089 54.105-28.044 0-43.29-24.562-43.29-55.172 0-30.777 15.414-54.721 43.29-54.721zm.159 20.183c-14.193 0-15.08 19.347-15.08 31.397 0 12.074-.175 37.853 14.921 37.853 14.921 0 15.632-20.794 15.632-33.46 0-8.346-.35-18.315-2.845-26.231-2.145-6.868-6.411-9.559-12.628-9.559zM547.076 105.669h-19.182c-1.916-.133-3.458-1.673-3.458-3.579l-.024-92.098c.163-1.84 1.757-3.278 3.688-3.278h17.855c1.68.085 3.068 1.263 3.411 2.844v14.082h.35c5.345-12.769 12.846-18.801 26.032-18.801 8.62 0 17.021 3.133 22.41 11.583 5.014 7.856 5.014 21.079 5.014 30.56v55.447c-.211 1.757-1.757 3.145-3.688 3.145h-19.326c-1.808-.133-3.29-1.443-3.458-3.145V51.125c0-10.755 1.252-26.503-12.099-26.503-4.699 0-9.024 3.157-11.162 7.952-2.712 6.064-3.068 12.074-3.068 18.552v51.082c-.024 1.982-1.697 3.579-3.737 3.579l.442-.118zM298.327 59.788c0 7.489.19 13.738-3.594 20.399-3.068 5.418-7.952 8.751-13.341 8.751-7.401 0-11.746-5.637-11.746-13.957 0-16.404 14.697-19.395 28.681-19.395v4.202zm19.443 47.014c-1.275 1.133-3.117 1.215-4.551.46-6.4-5.317-7.544-7.783-11.047-12.846-10.562 10.779-18.065 14.003-31.756 14.003-16.219 0-28.824-10.015-28.824-30.054 0-15.66 8.477-26.32 20.561-31.527 10.466-4.602 25.089-5.418 36.268-6.7v-2.495c0-4.578.35-10.015-2.344-13.98-2.344-3.555-6.837-5.014-10.806-5.014-7.342 0-13.877 3.764-15.48 11.565-.328 1.735-1.601 3.439-3.347 3.527l-18.695-2.016c-1.577-.35-3.326-1.624-2.878-4.03C247.309 8.434 270.42 1.265 291.24 1.265c10.649 0 24.562 2.833 32.951 10.907 10.649 9.966 9.634 23.269 9.634 37.741v34.181c0 10.28 4.265 14.78 8.28 20.339 1.41 1.982 1.721 4.367-.109 5.845-4.578 3.828-12.722 10.942-17.196 14.941l-.03-.417zM55.285 59.788c0 7.489.19 13.738-3.594 20.399-3.068 5.418-7.929 8.751-13.341 8.751-7.401 0-11.722-5.637-11.722-13.957 0-16.404 14.697-19.395 28.657-19.395v4.202zm19.443 47.014c-1.275 1.133-3.117 1.215-4.551.46-6.4-5.317-7.544-7.783-11.047-12.846-10.562 10.779-18.041 14.003-31.756 14.003C11.155 108.419-1.45 98.404-1.45 78.365c0-15.66 8.501-26.32 20.585-31.527 10.466-4.602 25.065-5.418 36.244-6.7v-2.495c0-4.578.35-10.015-2.344-13.98-2.32-3.555-6.813-5.014-10.782-5.014-7.342 0-13.901 3.764-15.504 11.565-.328 1.735-1.601 3.439-3.347 3.527L4.707 31.725c-1.577-.35-3.326-1.624-2.878-4.03C7.767 8.434 30.878 1.265 51.698 1.265c10.649 0 24.562 2.833 32.951 10.907 10.649 9.966 9.634 23.269 9.634 37.741v34.181c0 10.28 4.265 14.78 8.28 20.339 1.41 1.982 1.721 4.367-.109 5.845-4.578 3.828-12.722 10.942-17.196 14.941l-.03-.417-.5.986z"/></svg>',
            '      <span class="amz-prime-sub">prime</span>',
            '    </div>',
            '    <div class="amz-header-right">',
            '      <span class="amz-account"><b>' + CONST.user.firstName + '</b> &rsaquo;</span>',
            '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-label="Account"><circle cx="12" cy="8.5" r="4" stroke="#fff" stroke-width="1.6"/><path d="M4 20.5c0-4.2 4-6.5 8-6.5s8 2.3 8 6.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
            '      <div class="amz-cart-wrapper" aria-label="Cart">',
            '        <svg width="30" height="28" viewBox="0 0 36 32" fill="none"><path d="M2 2l4 4h24v14H10" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20l-2-8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="13" cy="26" r="2.2" fill="#fff"/><circle cx="26" cy="26" r="2.2" fill="#fff"/></svg>',
            '        <span class="amz-cart-badge">' + cartCount + '</span>',
            '      </div>',
            '    </div>',
            '  </div>',
            '  <div class="amz-search">',
            '    <div class="amz-search-pill">',
            '      <input type="text" placeholder="Search Amazon" aria-label="Search">',
            '      <button class="magnifier" aria-label="Search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#232f3e" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="#232f3e" stroke-width="2" stroke-linecap="round"/></svg></button>',
            '    </div>',
            '  </div>',
            '  <div class="amz-deliver">',
            '    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
            '    Delivering to ' + CONST.user.addressShort,
            '    <span style="margin-left:auto">&#9662;</span>',
            '  </div>',
            '</header>'
        ].join('');
    }

    // ---------- restart button (outside mobile viewport) ----------
    function renderRestartBtn() {
        if (window.innerWidth <= 414) return;
        var btn = document.createElement('div');
        btn.innerHTML = '<button id="proto-restart" style="position:fixed;top:20px;left:calc(50% + 230px);z-index:9999;background:#cc0c39;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(0,0,0,0.2);">Restart Demo</button>';
        document.body.appendChild(btn);
        document.getElementById('proto-restart').addEventListener('click', function() {
            clearState();
            window.location.href = CONST.urls.pdp;
        });
    }
    document.addEventListener('DOMContentLoaded', renderRestartBtn);

    // expose
    window.Ring = {
        CONST: CONST,
        readState: readState,
        writeState: writeState,
        clearState: clearState,
        defaultState: defaultState,
        fmt: fmt,
        fmtSplit: fmtSplit,
        computeTotals: computeTotals,
        renderHeader: renderHeader
    };
})();
