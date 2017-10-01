// Configuration options: https://www.npmjs.com/package/cors#configuration-options

const originsAllowed = 'https://third-proyect-web.herokuapp.com'

module.exports = {
    origin: function (origin, cb) {
        const allowed = originsAllowed.indexOf(origin) !== -1;
        console.log(allowed)
        cb(null, allowed);
    },
    credentials: true,
}