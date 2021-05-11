$(window).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
        $("img.logotipo").attr("src", './assets/img/Logo_paul_negro.png');
    } else {
        $("img.logotipo").attr("src", './assets/img/Logo_paul_blanco.png');
    }
})