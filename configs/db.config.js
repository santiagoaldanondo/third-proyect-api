const mongoose = require('mongoose');
const dbUri = process.env.DB_MONGO_URI

mongoose.connect(dbUri, { useMongoClient: true });
mongoose.Promise = Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbUri} database`);
});

module.exports = db