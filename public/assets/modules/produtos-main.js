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
})