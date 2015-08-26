'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var _ = require('underscore');
var compose = require('composable-middleware');
var System = require('../system/system.model');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  email: { type: String, lowercase: true },  
  password: String,
  gender: String,
  image: String,
  systems: [{
    system: { type: Schema.Types.ObjectId, ref: 'System' },
    role: { type: String, default: 'user' },
    dateInitial: Date,
    dateFinal: Date
  }]
});

/**
 * Virtuals
 */
UserSchema
  .virtual('data')
  .get(function() {
    return {
      'name': this.name,
      'lastname': this.lastname,
      'username': this.username,
      'gender': this.gender,
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
