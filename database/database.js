const mongoose = require("mongoose");


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@wditech.jq6moad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const conn = async () => {
    mongoose.connect(uri,{})
        .then(() => console.log('Base de datos conectada'))
        .catch(e => console.log('error db:', e))
  };

module.exports = conn();
