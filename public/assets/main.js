$(document).ready(() => {

    //excluir usuário
    $('a.excluir-usuario').on('click', e => {
        e.preventDefault();

        let id = e.target.id;

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/usuario/excluir/${id}`,
            method: 'GET',
            success: function (data) {
                //Insira o conteúdo retornado no corpo do modal
                $('.modal-body').html(data);

                $('#excluirUsuario').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        })
       
        
    })
})