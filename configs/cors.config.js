// Configuration options: https://www.npmjs.com/package/cors#configuration-options

const originsAllowed = process.env.CORS_ORIGIN;

module.exports = {
    origin: function (origin, cb) {
        const allowed = originsAllowed.indexOf(origin) !== -1;
        cb(null, allowed);
    },
    credentials: true,
}