/**
 * Populate DB with sample data on Systems
 */

'use strict';

var System = require('../api/system/system.model');

System.find({}).remove(function() {
    System.create({
        name: 'MinhaConsulta',
        desciption: 'Sistema para gereciamento de consultas, e para o controle financeiro e emissão de boletos.',
        image: "minhaconsulta.png",
        icon: { image: 'leaf', color: 'green' }
    },{
        name: 'ReportManager',
        desciption: 'Sistema para gereciamento de json, e para o emissão de Relatórios.',
        image: "reportmanager.png",
        icon: { image: 'file-code-o', color: 'blue' }
    }, function() {
        console.log('finished populating Systems');
    });
});
