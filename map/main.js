function updatePage() {
    $.ajax({
        url: 'http://138.124.127.169:8123/',
        type: 'GET',
        success: function(response) {
            $('body').html(response);
        },
        timeout: 5000, // время ожидания ответа
    });
}

setInterval(updatePage, 10000); // обновляем страницу каждые 10 секунд
