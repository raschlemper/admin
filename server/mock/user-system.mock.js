'use strict';

var UserSystem = require('../api/user/system/user-system.model');

UserSystem.find({}).remove(function() {
    var dateIni = new Date();
    var dateFin = new Date();
    dateFin.setDate(dateIni.getDate() + 30);
    UserSystem.create({
        _id: "55b8c22a1a6764da5d22f44f",
        user: '55b77647a8d5d3070db4e892',        
        system: "55a6fbbd7b39890d0eff2e42",
        role: 'user',
        dateInitial: dateIni,
        dateFinal: dateFin
    }, function() {
        console.log('finished populating users systems');
    });
});
