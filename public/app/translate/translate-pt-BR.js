app.config(['$translateProvider', function($translateProvider) {

    $translateProvider.translations('pt_BR', {
    	'MENU.USERS': 'Usuários',
    	'MENU.LIST': 'Lista',
    	'MENU.CREATE': 'Criar',
    	'TITLE.USER.CREATE': 'Usuários - Cadastro',
    	'NAV.CREATE': 'Cadastro',
    	'NAV.SYSTEMS': 'Sistemas',
    	'LABEL.PROVIDER': 'Provider',
    	'LABEL.NAME': 'Nome',
    	'LABEL.EMAIL': 'Email',
    	'LABEL.PASSWORD': 'Senha',
        'LABEL.ROLE': 'Role',
        'LABEL.PERIOD': 'Período',
        'LABEL.DE': 'De',
        'LABEL.ATE': 'Até',
        'BUTTON.ADD.SYSTEM': 'Adicionar Sistema',
        'BUTTON.SAVE': 'Salvar',
        'BUTTON.CANCEL': 'Cancelar',
    	'MSG.ITEM.CHOOSE.ONE': 'Escolha um item da lista.',
        'MSG.ITEM.CHOOSE.SYSTEM': 'Escolha um sistema para cadastrar!',
    	'MSG.USER.NAME': 'Digite o nome do usuário.',
    	'MSG.USER.EMAIL': 'Digite o email do usuário.',
    	'MSG.USER.PASSWORD': 'Digite a senha do usuário.',
    	'MSG.VALID.EMAIL': 'Digite um email válido.',
        'MSG.USER.CREATE.SUCCESS': 'Usuário cadastrado com sucesso!',
        'MSG.USER.CREATE.ERROR': 'Problemas ao cadastrar o usuário!',
        'MSG.DRAG_DROP.NOT_SUPORTTED': 'Arquivo Drag/Drop não é suportado neste navegador!'
    });

	$translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('pt_BR');
}]);
