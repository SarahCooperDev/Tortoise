const mongo = require('mongoose');

var ProjectSchema = new mongo.Schema({
    name: { type: String },
    dateCreated: { type: Date }
}, {versionKey: false});

module.exports = mongo.model('Project', ProjectSchema);