var Graffiti = (function() {
    //dependencies

    //private properties
    var canvasElement;
    var canvasId = 'graffiti-canvas';
    var ctx;
    var socket;
    var canvasWidth;
    var canvasHeight;

//    var connect = function() {
//        socket = io.connect('http://10.109.38.188:3001');
//    };

    var attachListeners = function() {
        canvasElement.addEventListener('touchstart', drawAndSend, false);
        canvasElement.addEventListener('touchmove', drawAndSend, false);
        canvasElement.addEventListener('touchend', drawAndSend, false);

        document.body.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, false);
    };

    var makeReceiver = function() {
        socket.on('draw', function(data) {
            draw(data.x, data.y, data.type);
        });
    };

    var makeSender = function() {
        attachListeners();
    };

    var drawAndSend = function(event) {
        var x = event.targetTouches[0].pageX;
        var y = event.targetTouches[0].pageY;
        var type = event.type;

        draw(x, y, type);
        socket.emit('draw', {type: type, x: x, y: y});
        event.preventDefault();
        event.stopPropagation();
    };

    var draw = function(x, y, type) {
//        console.log(x);
//        console.log(y);
//        console.log(type, x, y);
        canvasDrawer[type](x, y);
    };

    var canvasDrawer = {
        isDrawing: false,
        touchstart: function(x, y) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            this.isDrawing = true;
        },
        touchmove: function(x, y) {
            if (this.isDrawing) {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        },
        touchend: function(x, y) {
            if (this.isDrawing) {
                this.touchmove(x, y);
                this.isDrawing = false;
            }
        }
    };


    var setColor = function(color) {
        ctx.strokeStyle = color;
    };

    var setLineWidth = function(width) {
        ctx.lineWidth = width;
    };

    //init
    var createCanvas = function(w, h) {
        canvasWidth = w;
        canvasHeight = h;
        canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('id', canvasId);
        canvasElement.width = w;
        canvasElement.height = h;
        document.body.appendChild(canvasElement);

        //Get 2d context
        ctx = canvasElement.getContext('2d');

        // Setup default styles
        ctx.fillStyle = "solid";
        ctx.strokeStyle = "#bada55";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
    };


    //public api
    return {
        init: function(s, width, height) {
            socket = s;
            createCanvas(width, height);
        },

        sender: function() {
            makeSender();
        },

        receiver: function() {
            makeReceiver();
        },
        setEnabled : function(enable) {
            if (enable) {
                canvasElement.css('z-index', '9999');
            }
            else {
                canvasElement.css('z-index', '-9999');
            }

        },
        clear: function() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
    }
}());

