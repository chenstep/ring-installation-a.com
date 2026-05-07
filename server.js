// Simple local server for the prototype
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

const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(SRC_DIR, urlPath === '/' ? 'index.html' : urlPath);
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

// Keep server alive - handle errors gracefully
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`  ⚠️  Port ${PORT} already in use. Server may already be running.`);
    } else {
        console.error('Server error:', err);
    }
});

// Prevent process from exiting on uncaught errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception (server still running):', err.message);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection (server still running):', err);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  🚀 Prototype server running!\n`);
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Network: http://0.0.0.0:${PORT}\n`);
    console.log(`  Open on your phone (same WiFi): http://<your-ip>:${PORT}\n`);
    console.log(`  Press Ctrl+C to stop.\n`);
});
