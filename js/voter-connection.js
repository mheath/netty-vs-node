var socket,
	server = 'http://127.0.0.1:3009';

var connect = function(callback) {
	console.log("Attempting to connect to " + server);
	socket = io.connect(server);
	
	socket.on('ack', function() {
		var userKey = localStorage.getItem('userKey');
		if (!userKey) {
			socket.emit('request registration', function(data) {
				console.log('Do something with this: ' + data);
				localStorage.setItem('userKey', data);
				register(data);
			})
		}
		else {
			register(userKey);
		}
	});

	socket.on('score', function(score) {
		setScore(score);
	});

	function register(userKey) {
		console.log("Register Voter");
		socket.emit('register voter', userKey, function(data) {
			console.log("Voter Registered");
			if (data && callback) callback(socket);
		});
	}
	
};

// Polyfill for older browsers
if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      var sExpDate = new Date();
      sExpDate.setDate(sExpDate.getDate() - 1);
      document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}