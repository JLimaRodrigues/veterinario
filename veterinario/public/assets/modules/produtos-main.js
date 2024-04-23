$(document).ready(() => {

    // Evitar o envio automático do formulário
    $('#image-form').on('submit', function(event) {
        event.preventDefault();
        // Adicione aqui a lógica para enviar as imagens, se necessário
    });

    //criar produto
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
        
        $("#cadastrar-produto").submit(function (e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            // Recupera o valor do Token CSRF do campo Hidden
            var csrfToken = $("[name='_csrf']").val();

            // Cria um objeto FormData para o formulário
            var formData = new FormData(this);

            // Adiciona o Token CSRF ao cabeçalho da requisição
            $.ajax({
                url: "/produtos/registrar",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    "X-CSRF-Token": csrfToken,
                },
                success: function (data) {
                    console.log("Upload bem-sucedido:", data);
                    // Faça o que precisar aqui após o upload
                },
                error: function (error) {
                    console.error("Erro no upload:", error);
                },
            });
        });
    });

     //excluir produto
     $('a.editar-produto').on('click', e => {
        e.preventDefault();

        let id = e.target.id;

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/produtos/editar/${id}`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Editar Produto');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        }); 
    });

    //excluir produto
    $('a.excluir-produto').on('click', e => {
        e.preventDefault();

        let id = e.target.id;

        //faça a requisição AJAX para obter o conteúdo da página
        $.ajax({
            url: `/produtos/excluir/${id}`,
            method: 'GET',
            success: function (data) {
                $('#tituloModal').html('Excluir Produto');
                $('.modal-body').html(data);

                $('#modal').modal('show');
            },
            error: function (error) {
                console.error('Erro ao carregar o conteúdo do modal', error);
            }
        }); 
    });
});

// Event delegation para lidar com cliques em um elemento pai estático
$(document).on('click', '#insert-images', function() {
    // Encontrar o elemento #image-upload dentro do modal atual
    var imageUpload = $(this).closest('.modal').find('#image-upload');
    imageUpload.click();
});

$(document).on('change', '#image-upload', function() {
    // Encontrar o elemento #image-container dentro do modal atual
    var imageContainer = $(this).closest('.modal').find('#image-container');

    // Limpar o conteúdo anterior
    imageContainer.empty();

    // Exibir miniaturas das imagens selecionadas
    for (const file of this.files) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const thumbnailContainer = $('<div>').addClass('thumbnail-container');
            const thumbnail = $('<img>').addClass('thumbnail');
            thumbnail.attr('src', e.target.result);
            thumbnailContainer.append(thumbnail);

            const actionsContainer = $('<div>').addClass('thumbnail-actions');
            const editButton = $('<button>').addClass('btn btn-sm btn-primary').text('Editar');
            const deleteButton = $('<button>').addClass('btn btn-sm btn-danger').text('Excluir');

            editButton.on('click', function() {
                // Lógica para editar a imagem (pode ser adicionada aqui)
                // Exemplo: editarImagem(file);
            });

            deleteButton.on('click', function() {
                thumbnailContainer.remove();
            });

            actionsContainer.append(editButton, deleteButton);
            thumbnailContainer.append(actionsContainer);

            thumbnailContainer.on('click', function() {
                $('.thumbnail-container').removeClass('selected-thumbnail');
                thumbnailContainer.addClass('selected-thumbnail');
                // Lógica para selecionar a imagem principal (pode ser adicionada aqui)
                // Exemplo: selecionarImagemPrincipal(file);
                selecionarImagemPrincipal(file);
            });

            imageContainer.append(thumbnailContainer);
        };

        reader.readAsDataURL(file);
    }
});
