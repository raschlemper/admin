'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSystemSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    system: {type: Schema.Types.ObjectId, ref: 'System'},
    role: { type: String, default: 'user' },
    dateInitial: Date,
    dateFinal: Date
});

module.exports = mongoose.model('UserSystem', UserSystemSchema);