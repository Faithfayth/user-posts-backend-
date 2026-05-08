const mongoose = require('mongoose');

const postschema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    creator: {type: String, required: true},
    createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Post', postschema);