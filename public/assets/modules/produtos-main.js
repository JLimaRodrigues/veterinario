$(document).ready(() => {

    //criar usuário
    $('button#novo-produto').on('click', e => {
        e.preventDefault();

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/produtos/novo/`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Novo Produto');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        });  
    });
})