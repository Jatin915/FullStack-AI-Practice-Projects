const mongoose = require('mongoose');

function mongodbConnect() {
    mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
    .then(()=> {
        console.log('Mongodb connected')
    })
    .catch(err => {
        console.log('Mongodb error: ',err);
    })
}

module.exports = mongodbConnect;