$(document).ready(() => {

    //criar usuário
    $('#novo-usuario').on('click', e => {
        e.preventDefault();

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/usuario/novo/`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Novo Usuário');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        });  
    });

    //editar usuário
    $('a.editar-usuario').on('click', e => {
        e.preventDefault();

        let id = e.target.id;

    //faça a requisição AJAX para obter o conteúdo da página
    $.ajax({
            url: `/usuario/editar/${id}`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Editar Usuário');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        });
    });

    //excluir usuário
    $('a.excluir-usuario').on('click', e => {
        e.preventDefault();

        let id = e.target.id;

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/usuario/excluir/${id}`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Excluir Usuário');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        }); 
    });
})