var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name: { type: "string" },
    email: { type: "string" },
    address: {type: "string"}

},{collection: "contact"});

module.exports.contactModel = mongoose.model('contactModel',contactSchema);