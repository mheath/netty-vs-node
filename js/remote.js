var Remote = function(socket) {
    this.socket = socket;
};

Remote.prototype.receiver = function(receiver) {
    this.socket.on('prev', function() {
        receiver.prev();
    });

    this.socket.on('next', function() {
        receiver.next();
    });
};

Remote.prototype.prev = function() {
    this.socket.emit('prev');
};

Remote.prototype.next = function() {
    this.socket.emit('next');
};