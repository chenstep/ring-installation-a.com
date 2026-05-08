// Build script: generates a static site in /public with Amazon-style directory routes
// Run: node build.js
// Deploy /public to GitHub Pages

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'docs');

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

// Base path for GitHub Pages (repo name)
// Set to '' for custom domain or local server, '/ring-installation-a.com' for GH Pages
const BASE = process.env.BASE_PATH || '/ring-installation-a.com';

// Fix relative paths in the routed HTML files
function fixPaths(filePath, depth) {
    let content = fs.readFileSync(filePath, 'utf8');
    const prefix = BASE + '/';

    // Replace absolute href/src to /css/, /js/, /fonts/, /images/, /assets/
    content = content.replace(/(href|src)="\/(css|js|fonts|images|assets)\//g, `$1="${prefix}$2/`);

    // Fix navigation links to include base path
    content = content.replace(/(href|action)="\/(dp|gp)\//g, `$1="${BASE}/$2/`);

    // Fix window.location.href JS references
    content = content.replace(/window\.location\.href\s*=\s*['"]\/(dp|gp)\//g, `window.location.href='${BASE}/$1/`);

    // Fix Ring.CONST.urls references (they start with /)
    content = content.replace(/urls:\s*\{[^}]+\}/s, (match) => {
        return match.replace(/': '\//g, `': '${BASE}/`);
    });

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

// Fix all routed copies of non-root HTML files too
const allHtmlInPublic = [];
function findHtml(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) findHtml(full);
        else if (entry.name.endsWith('.html')) allHtmlInPublic.push(full);
    }
}
findHtml(OUT);
for (const f of allHtmlInPublic) {
    fixPaths(f, 0);
}

// Fix CSS font paths
const cssPath = path.join(OUT, 'css', 'amazon.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/url\("\/fonts\//g, `url("${BASE}/fonts/`);
    fs.writeFileSync(cssPath, css, 'utf8');
}

// Fix URLs in shared.js (the CONST.urls object)
const sharedJsPath = path.join(OUT, 'js', 'shared.js');
if (fs.existsSync(sharedJsPath)) {
    let sharedContent = fs.readFileSync(sharedJsPath, 'utf8');
    // Replace '/dp/ and '/gp/ patterns with base path prefix
    sharedContent = sharedContent.replace(/: '\/dp\//g, `: '${BASE}/dp/`);
    sharedContent = sharedContent.replace(/: '\/gp\//g, `: '${BASE}/gp/`);
    // Fix relative image/asset paths (e.g. 'images/...' and 'assets/...') to absolute with base
    sharedContent = sharedContent.replace(/: '(images|assets)\//g, `: '${BASE}/$1/`);
    fs.writeFileSync(sharedJsPath, sharedContent, 'utf8');
}

// Create .nojekyll for GitHub Pages
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log('Build complete! Output in /public');
console.log('Routes created:');
for (const [route] of Object.entries(ROUTES)) {
    console.log(`  /${route}`);
}
