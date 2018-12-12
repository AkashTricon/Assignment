var mongodb = require('mongodb'),
 mongoose = require('mongoose'),
database;

function connect(connectionString,cb) { 
    database = mongoose.connect(connectionString,cb);
}


module.exports.connect = connect;