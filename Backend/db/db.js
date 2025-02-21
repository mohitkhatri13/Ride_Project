const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => console.log('Connected to Database Successfully'))
        .catch(err => console.log('Database Connection Error:', err));
}

module.exports = connectToDb;
