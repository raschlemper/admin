/**
 * Populate DB with sample data on Systems
 */

'use strict';

var System = require('../api/system/system.model');

System.find({}).remove(function() {
    System.create({
        name: 'MinhaConsulta',
        description: 'Sistema para gereciamento de consultas, e para o controle financeiro e emissão de boletos.',
        image: "minhaconsulta.png",
        icon: { image: 'leaf', color: 'green' }
    },{
        name: 'ReportManager',
        description: 'Sistema para gereciamento de json, e para o emissão de Relatórios.',
        image: "reportmanager.png",
        icon: { image: 'file-code-o', color: 'blue' }
    },{
        name: 'SalesManager',
        description: 'Sistema para gereciamento de vendas, integrado com sistemas ppc.',
        image: "salesmanager.png",
        icon: { image: 'money', color: 'red' }
    },{
        name: 'Casamento.com',
        description: 'Sistema para gereciamento e divulgação de cerimonias de casamento.',
        image: "casamento.png",
        icon: { image: 'camera', color: 'yellow' }
    },{
        name: 'Boleto.com',
        description: 'Sistema para gereciamento de boletos.',
        image: "boleto.png",
        icon: { image: 'barcode', color: 'silver' }
    }, function() {
        console.log('finished populating Systems');
    });
});
