// Simple local server for the prototype with Amazon-style route aliases
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SRC_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Amazon-style route aliases
const ROUTES = {
    '/': 'index.html',
    '/dp/B0F67KWWQH': 'index.html',
    '/gp/cart/view.html': 'cart.html',
    '/gp/cart/upsell': 'cart-upsell.html',
    '/gp/buy/spc/handlers/display.html': 'checkout.html',
    '/gp/buy/thankyou': 'thankyou.html',
    '/gp/your-account/order-history': 'orders.html',
    '/gp/your-account/order-details': 'order-details.html',
    '/gp/your-account/order-details/invoice': 'invoice.html',
    '/gp/help/customer/cancel-items': 'cancellation.html'
};

const server = http.createServer((req, res) => {
    const [urlPath, queryString] = req.url.split('?');

    // Check if this matches a route alias
    const routeFile = ROUTES[urlPath];
    let filePath;

    if (routeFile) {
        filePath = path.join(SRC_DIR, routeFile);
    } else {
        filePath = path.join(SRC_DIR, urlPath === '/' ? 'index.html' : urlPath);
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`  Port ${PORT} already in use. Server may already be running.`);
    } else {
        console.error('Server error:', err);
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception (server still running):', err.message);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection (server still running):', err);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  Prototype server running!\n`);
    console.log(`  PDP:        http://localhost:${PORT}/dp/B0F67KWWQH`);
    console.log(`  Cart:       http://localhost:${PORT}/gp/cart/view.html`);
    console.log(`  Checkout:   http://localhost:${PORT}/gp/buy/spc/handlers/display.html`);
    console.log(`  Orders:     http://localhost:${PORT}/gp/your-account/order-history`);
    console.log(`  Details:    http://localhost:${PORT}/gp/your-account/order-details`);
    console.log(`  Cancel:     http://localhost:${PORT}/gp/help/customer/cancel-items\n`);
    console.log(`  Press Ctrl+C to stop.\n`);
});
