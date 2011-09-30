var socket = io.connect('http://10.109.38.188:3001');

if (window.location.href.indexOf("remote") > 0) {
    document.addEventListener("slideenter", function(evt) {
        socket.emit('slideto', {slideNumber: evt.slideNumber});
    });
}
else{
    socket.on('slideto', function(data){
        curSlide = data.slideNumber -1;
        updateSlides();
    });
}