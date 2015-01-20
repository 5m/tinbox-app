class Message {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }

    static fromString(string) {
        if ('string' !== typeof string) {
            var msg = 'SockMessage.fromString must get a string as argument';

            if (console.warn) {
                console.warn(msg);
            } else {
                throw new Error(msg);
            }
        }

        var values = string.split('|');
        var name = values[0];
        var data = JSON.parse(values[1]);

        return new Message(name, data);
    }

    toString() {
        return this.name + '|' + JSON.stringify(this.data);
    }
}

class Socker {
    constructor(uri, reconnect) {
        // Option flag to reconnect automatically
        this.reconnect = (typeof reconnect == 'undefined') ? true : reconnect;

        // Print logging
        this.debug = true;

        this.wsURI = uri;

        this.listeners = {};
        this.queue = [];

        this._closed = false;

        this._reconnectTimeoutID = null;
        this.reconnectTimeout = 15000;

        this._connect();
    }

    _connect(_reconnecting) {
        var self = this;

        this.log('socker connecting to', this.wsURI);

        this.ws = new WebSocket(this.wsURI);

        this.ws.addEventListener('open', function(e) {
            self.log('Connected');

            if (_reconnecting) {
                self._subscribeAll();
            }

            self._sendAll();
        });

        this.ws.addEventListener('close', function (e) {
            self.log('Connection closed');
            self._closed = true;

            if (self.reconnect) {
                self.log('Reconnecting in ' + self.reconnectTimeouth / 1000
                          + ' seconds.');
                self._reconnectTimeoutID = setTimeout(
                    self._reconnect.bind(self),
                self.reconnectTimeout);
            }
        });

        this.ws.addEventListener('message', function (e) {
            self.log('sock << ' + e.data);
            var message = Message.fromString(e.data);
            var handlers = self.listeners[message.name] || [];

            handlers.forEach(function (handler) {
                handler(message.data, message, e);
            });
        });
    }

    _reconnect() {
        this.log('reconnecting...');
        this._connect(true);  // Indicate to _connect that we are reconnecting.
    }

    isConnected() {
        return this.ws.readyState == WebSocket.OPEN;
    }

    _sendAll() {
        var self = this;

        this.queue.forEach(function (message) {
            self._send(message.toString());
        });
    }

    _send(string) {
        this.log('sock >> ' + string);

        this.ws.send(string)
    }

    send(message) {
        if (!this.isConnected()) {
            this.log('Not connected. Putting message in queue.');
            this.queue.push(message);
            return;
        }

        this._send(message.toString());
    }

    _subscribe(channels) {
        this.emit('subscribe', channels);
    }

    _subscribeAll() {
        var channels = Object.keys(this.listeners);
        if (channels.length) {
            this._subscribe(channels);
        }
    }

    on(name, cb) {
        if (!this.listeners.hasOwnProperty(name)) {
            this.listeners[name] = [];
            this._subscribeAll();
        }

        this.listeners[name].push(cb);
    }

    off(name, func) {
        var self = this;

        if (!this.listeners.hasOwnProperty(name)) {
            self.log('Could not off event handlers, no subscribers to', name);
        }

        this.listeners[name].forEach(function(callback, i) {
            if (callback == func) {
                delete self.listeners[name][i];
            }
        });

        // Remove channel key if empty
        if (!self.listeners[name].length) {
            delete self.listeners[name];
        }
    }

    emit(name, data) {
        this.send(new Message(name, data).toString());
    }

    log() {
        var args = [this.toString()].concat(Array.prototype.slice.call(arguments));

        if (this.debug) {
            console.log.apply(console, args);
        }
    }

    toString() {
        var status = 'UNKNOWN';
        var stateMap = {
            0: 'CONNECTING',
            1: 'OPEN',
            2: 'CLOSING',
            3: 'CLOSED'
        };

        if (this.ws) {
            status = stateMap[this.ws.readyState];
        }

        return '<Socker uri=' + this.wsURI + ' status=' + status + '>';
    }
}

try {
    window.Socker = Socker;
} catch (e) {}

module.exports = {
    Socker: Socker,
    Message: Message
};
