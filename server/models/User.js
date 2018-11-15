const mongo = require('mongoose');

var UsersSchema = new mongo.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    projects: []
}, { versionKey: false });

module.exports = mongo.model('User', UsersSchema);