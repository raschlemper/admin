'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SystemSchema = new Schema({
  name: String,
  descricao: { type: String },
  image: { type: String, default: 'system.jpg' }
});


/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */
SystemSchema.methods = {
};

module.exports = mongoose.model('System', SystemSchema);
