const TOKEN_SERVER_TIME = 1741947731.711;
const { JSDOM } = require('jsdom');

// 初始化虚拟DOM环境
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
const window = dom.window;
const document = window.document;
const navigator = window.navigator;

// 核心加解密模块
const CryptoHandler = (() => {
    // 字符串异或解密
    const decryptString = (str) => {
        if (!str) return '';
        let result = '';
        let key = 9527;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            const decrypted = charCode ^ key;
            key = charCode;
            result += String.fromCharCode(decrypted);
        }
        return result;
    };

    // Base64编码
    const base64Encode = (bytes) => {
        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = [];
        for (let i = 0; i < bytes.length; i += 3) {
            const triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            result.push(
                base64Chars[(triplet >> 18) & 0x3F],
                base64Chars[(triplet >> 12) & 0x3F],
                base64Chars[(triplet >> 6) & 0x3F],
                base64Chars[triplet & 0x3F]
            );
        }
        return result.join('');
    };

    return { decryptString, base64Encode };
})();

// 浏览器指纹生成模块
const BrowserFingerprint = (() => {
    let mouseMoves = 0;
    let clicks = 0;
    let keyPresses = 0;

    const collectEvents = () => {
        document.addEventListener('mousemove', () => mouseMoves++);
        document.addEventListener('click', () => clicks++);
        document.addEventListener('keydown', () => keyPresses++);
    };

    const getFeatures = () => ({
        plugins: navigator.plugins.length,
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: new Date().getTimezoneOffset(),
        canvasFingerprint: generateCanvasFingerprint()
    });

    const generateCanvasFingerprint = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 100, 30);
        ctx.strokeText('BrowserFingerprint', 2, 15);
        return CryptoHandler.base64Encode(new Uint8Array(canvas.toDataURL().split('').map(c => c.charCodeAt(0))));
    };

    return { collectEvents, getFeatures };
})();

// 令牌生成器
const TokenGenerator = (() => {
    let tokenBuffer = new Uint8Array(32);
    
    const init = () => {
        tokenBuffer.fill(0);
        tokenBuffer[0] = 233;
        BrowserFingerprint.collectEvents();
    };

    const updateToken = () => {
        tokenBuffer[1] = Math.floor(Date.now() / 1000) >>> 0;
        tokenBuffer[2] = mouseMoves % 255;
        tokenBuffer[3] = clicks % 255;
        tokenBuffer[4] = keyPresses % 255;
        return CryptoHandler.base64Encode(tokenBuffer);
    };

    return { init, updateToken };
})();

// 初始化系统
TokenGenerator.init();
setInterval(() => {
    console.log('Current Token:', TokenGenerator.updateToken());
}, 5000);

// 浏览器环境检测
console.log('Browser Features:', BrowserFingerprint.getFeatures());