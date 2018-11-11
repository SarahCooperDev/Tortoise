const mongo = require('mongoose');

var UsersSchema = new mongo.Schema({
    email: { type: String },
    password: { type: String }
}, { versionKey: false });

module.exports = mongo.model('User', UsersSchema);