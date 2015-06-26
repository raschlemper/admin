'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SystemSchema = new Schema({
  name: String,
  description: String,
  image: { type: String, default: 'system.jpg' },
  icon: { image: String, color: String }
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
