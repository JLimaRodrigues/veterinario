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

   
})