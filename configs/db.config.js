const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI

mongoose.connect(dbUri, { useMongoClient: true });
mongoose.Promise = Promise;

let index = 0;
mongoose.set('debug', function (coll, method, query, doc) {
    console.log(`
    number ${index}
    coll: ${coll}
    method: ${method}
    query: ${query}
    doc: ${doc}
    `)
    index++
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbUri} database`);
});

module.exports = db