'use strict';

app.constant('LISTS', {

    'gender': [{
        code: 'feminino',
        descricao: 'Feminino'
    }, {
        code: 'masculino',
        descricao: 'Masculino'
    }, {
        code: 'outro',
        descricao: 'Outros'
    }],

    'roles': [{
        code: 'user',
        descricao: 'Usuário'
    }, {
        code: 'admin',
        descricao: 'Administrador'
    }],
    
    'periodos': [{
        code: 'dia',
        descricao: '1 Dia',
        days: 1,
        checked: false
    }, {
        code: 'semana',
        descricao: '7 Dias',
        days: 7,
        checked: false
    }, {
        code: 'quinzena',
        descricao: '15 Dias',
        days: 15,
        checked: false
    }, {
        code: 'mes',
        descricao: '30 Dias',
        days: 30,
        checked: true
    }]

});
