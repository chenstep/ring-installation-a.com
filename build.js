// Build script: generates a static site in /public with Amazon-style directory routes
// Run: node build.js
// Deploy /public to GitHub Pages

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'public');

const ROUTES = {
    'dp/B0F67KWWQH': 'index.html',
    'gp/cart/view.html': 'cart.html',
    'gp/cart/upsell': 'cart-upsell.html',
    'gp/buy/spc/handlers/display.html': 'checkout.html',
    'gp/buy/thankyou': 'thankyou.html',
    'gp/your-account/order-history': 'orders.html',
    'gp/your-account/order-details': 'order-details.html',
    'gp/your-account/order-details/invoice': 'invoice.html',
    'gp/help/customer/cancel-items': 'cancellation.html'
};

function mkdirp(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
    mkdirp(dest);
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Clean output
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
mkdirp(OUT);

// Copy all src files to public root (css, js, fonts, images, assets)
copyDir(SRC, OUT);

// For each route, create a directory with an index.html
// that is a copy of the source HTML file
for (const [route, srcFile] of Object.entries(ROUTES)) {
    const routeDir = path.join(OUT, route);

    // If route ends with .html, place the file directly there
    if (route.endsWith('.html')) {
        mkdirp(path.dirname(routeDir));
        fs.copyFileSync(path.join(SRC, srcFile), routeDir);
    } else {
        // Create directory and place index.html inside
        mkdirp(routeDir);
        fs.copyFileSync(path.join(SRC, srcFile), path.join(routeDir, 'index.html'));
    }
}

// Also copy index.html to root
fs.copyFileSync(path.join(SRC, 'index.html'), path.join(OUT, 'index.html'));

// Fix relative paths in the routed HTML files
// CSS/JS/image paths need to be absolute from root
function fixPaths(filePath, depth) {
    let content = fs.readFileSync(filePath, 'utf8');
    const prefix = '/';

    // Replace relative href/src to css/, js/, fonts/, images/, assets/
    content = content.replace(/(href|src)="(css|js|fonts|images|assets)\//g, `$1="${prefix}$2/`);

    // Fix the iframe src for cart-upsell background
    content = content.replace(/src="index\.html"/, `src="${prefix}dp/B0F67KWWQH"`);

    fs.writeFileSync(filePath, content, 'utf8');
}

// Fix paths in all routed HTML files
for (const [route, srcFile] of Object.entries(ROUTES)) {
    const routeDir = path.join(OUT, route);
    if (route.endsWith('.html')) {
        const depth = route.split('/').length - 1;
        fixPaths(routeDir, depth);
    } else {
        const depth = route.split('/').length;
        fixPaths(path.join(routeDir, 'index.html'), depth);
    }
}

// Also fix the root index.html (depth 0 — already correct but run anyway)
fixPaths(path.join(OUT, 'index.html'), 0);

console.log('Build complete! Output in /public');
console.log('Routes created:');
for (const [route] of Object.entries(ROUTES)) {
    console.log(`  /${route}`);
}
