const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// IP Center Multikom sesuai arahan CS
const MULTIKOM_TARGET = 'http://139.180.208.128:6969';

// Meneruskan semua request ke Multikom
app.use('/', createProxyMiddleware({
    target: MULTIKOM_TARGET,
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', 
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] Meneruskan: ${req.url}`);
    }
}));

// Gunakan port dari server Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Jembatan Proxy Multikom aktif di port ${PORT}`);
});
