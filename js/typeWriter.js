var app = document.getElementById('text-animation');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter
    .typeString('ما به هر قیمتی دوره تولید نمی کنیم !')
    .pauseFor(2500)
    .deleteAll()
    .start();