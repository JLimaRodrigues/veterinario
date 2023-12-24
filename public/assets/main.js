$(document).ready(() => {

    // Obtém a URL atual
    let currentUrl = window.location.pathname;

    // Itera sobre os links e verifica se a URL atual corresponde à URL do link
    $('.nav-link').each(function() {
        let linkUrl = $(this).attr('href');

        // Condição especial para tratar a URL "/"
        if (currentUrl === '/' && linkUrl === '/') {
            $(this).addClass('active');
        } else if (currentUrl.startsWith(linkUrl) && linkUrl !== '/') {
            // Se a URL atual começa com a URL do link (exceto "/"), adiciona a classe "active"
            $(this).addClass('active');
        }
    });

    //criar usuário
    $('#novo-usuario').on('click', e => {
        e.preventDefault();

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/usuario/novo/`,
            method: 'GET',
            success: function (data) {
                //Insira o conteúdo retornado no corpo do modal
                $('#tituloModalUsuario').html('Novo Usuário');
                $('.modal-body').html(data);

                $('#modalUsuario').modal('show');
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
                //Insira o conteúdo retornado no corpo do modal
                $('#tituloModalUsuario').html('Editar Usuário');
                $('.modal-body').html(data);

                $('#modalUsuario').modal('show');
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
                //Insira o conteúdo retornado no corpo do modal
                $('#tituloModalUsuario').html('Excluir Usuário');
                $('.modal-body').html(data);

                $('#modalUsuario').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        }); 
    });
})