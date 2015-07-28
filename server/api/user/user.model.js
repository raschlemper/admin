'use strict';

var mongoose = require('mongoose');
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
      'provider': this.provider,
      'name': this.name,
      'email': this.email,
      'role': this.role,
      'image': this.image,
      'systems': this.getSystem(this.systems)
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

    getSystem: function(userSystems) {
      _.map(userSystems, function(userSystem) {
        return compose() 
          .use(function(next) {
            System.findById(userSystem.id, function(err, system) {
              if (err) return err;  
              next(system);
            }); 
          })
          .use(function(system, next) {
              userSystem.name = system.name;
              return userSystem;
          })
      });  
      return userSystems;
    }    

};

module.exports = mongoose.model('User', UserSchema);
