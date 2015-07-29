'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var _ = require('underscore');
var compose = require('composable-middleware');
var System = require('../system/system.model');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },  
  password: String,
  image: String,
  provider: String,
  systems: [{type: Schema.Types.ObjectId, ref: 'UserSystem'}]
});

/**
 * Virtuals
 */
UserSchema
  .virtual('data')
  .get(function() {
    return {
      'provider': this.provider,
      'name': this.name,
      'email': this.email,
      'role': this.role,
      'image': this.image
    }
  });


/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */

 // http://mongoosejs.com/docs/populate.html
UserSchema.methods = {
};

UserSchema.plugin(deepPopulate);
module.exports = mongoose.model('User', UserSchema);
