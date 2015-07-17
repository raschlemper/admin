app.config(['$translateProvider', function($translateProvider) {

    $translateProvider.translations('pt_BR', {
    	'MENU.USERS': 'Usu�rios',
    	'MENU.LIST': 'Lista',
    	'MENU.CREATE': 'Criar',
    	'TITLE.USER.CREATE': 'Usu�rios - Cadastro',
    	'NAV.CREATE': 'Cadastro',
    	'NAV.SYSTEMS': 'Sistemas',
    	'LABEL.PROVIDER': 'Provider',
    	'LABEL.NAME': 'Nome',
    	'LABEL.EMAIL': 'Email',
    	'LABEL.PASSWORD': 'Senha',
        'LABEL.ROLE': 'Role',
        'LABEL.PERIOD': 'Per�odo',
        'LABEL.DE': 'De',
        'LABEL.ATE': 'At�',
        'BUTTON.ADD.SYSTEM': 'Adicionar Sistema',
        'BUTTON.SAVE': 'Salvar',
        'BUTTON.CANCEL': 'Cancelar',
    	'MSG.ITEM.CHOOSE.ONE': 'Escolha um item da lista.',
        'MSG.ITEM.CHOOSE.SYSTEM': 'Escolha um sistema para cadastrar!',
    	'MSG.USER.NAME': 'Digite o nome do usu�rio.',
    	'MSG.USER.EMAIL': 'Digite o email do usu�rio.',
    	'MSG.USER.PASSWORD': 'Digite a senha do usu�rio.',
    	'MSG.VALID.EMAIL': 'Digite um email v�lido.',
        'MSG.USER.CREATE.SUCCESS': 'Usu�rio cadastrado com sucesso!',
        'MSG.USER.CREATE.ERROR': 'Problemas ao cadastrar o usu�rio!',
        'MSG.DRAG_DROP.NOT_SUPORTTED': 'Arquivo Drag/Drop n�o � suportado neste navegador!'
    });

	$translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('pt_BR');
}]);
