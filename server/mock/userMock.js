/**
 * Populate DB with sample data on Users
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
    var dateIni = new Date();
    var dateFin = new Date();
    dateFin.setDate(dateIni.getDate() + 30);
    User.create({
        _id: '55b77647a8d5d3070db4e892',
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        image: "homer.png",
        password: 'test',
        systems: [{ 
            _id: "55a6fbbd7b39890d0eff2e42",
            role: 'user',
            dateInitial: dateIni,
            dateFinal: dateFin
        }]
    }, {
        _id: '55b77647a8d5d3070db4e893',
        provider: 'Local',
        name: 'Rafael Augusto Schlemper',
        email: 'raschlemper@gmail.com',
        image: "bart.png",
        password: 'admin',
        systems: []
    }, function() {
        console.log('finished populating users');
    });
});
