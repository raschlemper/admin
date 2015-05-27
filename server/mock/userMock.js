/**
 * Populate DB with sample data on Users
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    image: "homer.png",
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Rafael Augusto Schlemper',
    email: 'raschlemper@gmail.com',
    image: "bart.png",
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});