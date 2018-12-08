const mongo = require('mongoose');

var ProjectSchema = new mongo.Schema({
    name: { type: String },
    description: { type: String },
    dateCreated: { type: Date },
    lastUpdated: { type: Date },
    artefacts: [{}]
}, {versionKey: false});

module.exports = mongo.model('Project', ProjectSchema);