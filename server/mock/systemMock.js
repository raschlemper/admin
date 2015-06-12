/**
 * Populate DB with sample data on Systems
 */

'use strict';

var System = require('../api/system/system.model');

System.find({}).remove(function() {
    System.create({
        name: 'MinhaConsulta',
        descricao: 'Sistema para gereciamento de consultas, e para o controle financeiro e emissão de boletos.',
        image: "minhaconsulta.png"
    },{
        name: 'ReportManager',
        descricao: 'Sistema para gereciamento de json, e para o emissão de Relatórios.',
        image: "reportmanager.png"
    }, function() {
        console.log('finished populating Systems');
    });
});
