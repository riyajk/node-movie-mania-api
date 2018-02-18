const mongoose = require('mongoose');
const config = require('config');


mongoose.connect(`mongodb://${config.database.server}/${config.database.name}`, {useMongoClient: true});

const database = mongoose.connection;

database.once('open', () => console.log("database is connected"));

database.on('error', (err) => console.log(err));