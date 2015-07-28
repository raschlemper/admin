/**
 * Populate DB with sample data on Systems
 */

'use strict';

var System = require('../api/system/system.model');

System.find({}).remove(function() {
    System.create({
        _id: '55a6fbbd7b39890d0eff2e42',
        name: 'MinhaConsulta',
        description: 'Sistema para gereciamento de consultas, e para o controle financeiro e emissão de boletos.',
        image: "minhaconsulta.png",
        icon: { image: 'leaf', color: 'green' }
    },{
        _id: '55a6fbbd7b39890d0eff2e43',
        name: 'ReportManager',
        description: 'Sistema para gereciamento de json, e para o emissão de Relatórios.',
        image: "reportmanager.png",
        icon: { image: 'file-code-o', color: 'blue' }
    },{
        _id: '55a6fbbd7b39890d0eff2e44',
        name: 'SalesManager',
        description: 'Sistema para gereciamento de vendas, integrado com sistemas ppc.',
        image: "salesmanager.png",
        icon: { image: 'money', color: 'red' }
    },{
        _id: '55a6fbbd7b39890d0eff2e45',
        name: 'Casamento.com',
        description: 'Sistema para gereciamento e divulgação de cerimonias de casamento.',
        image: "casamento.png",
        icon: { image: 'camera', color: 'yellow' }
    },{
        _id: '55a6fbbd7b39890d0eff2e46',
        name: 'Boleto.com',
        description: 'Sistema para gereciamento de boletos.',
        image: "boleto.png",
        icon: { image: 'barcode', color: 'silver' }
    }, function() {
        console.log('finished populating Systems');
    });
});
