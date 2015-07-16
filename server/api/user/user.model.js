'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },  
  password: String,
  image: String,
  provider: String,
  systems: [{
    _id: {type: Schema.Types.ObjectId, ref: 'System'},
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
      'name': name,
      'email': email,
      'role': role,
      'image': image
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
UserSchema.methods = {
};

module.exports = mongoose.model('User', UserSchema);
