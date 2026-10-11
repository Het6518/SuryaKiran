function normalizeSecret(value) {
    if (!value) return '';
    return String(value).trim().replace(/^['\"]|['\"]$/g, '');
}

let warnedDefaultSecret = false;

function getJwtSecret() {
    const secret = normalizeSecret(process.env.JWT_SECRET);
    if (secret) return secret;
    if (!warnedDefaultSecret) {
        console.warn('[auth] JWT_SECRET is not set; using an insecure development default. Set it in .env.');
        warnedDefaultSecret = true;
    }
    return 'supersecretkey123';
}

module.exports = { getJwtSecret };
