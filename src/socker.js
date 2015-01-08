class SockerMessage {
    constructor(name, data) {
        console.log('Create message: ', name, data);
        this.name = name;
        this.data = data;
    }

    static fromString(string) {
        if ('string' !== typeof string) {
            throw new Error('SockMessage.fromString must' +
                            ' get a string as argument');
        }

        var values = string.split('|');
        var name = values[0];
        var data = JSON.parse(values[1]);

        return new SockerMessage(name, data);
    }

    toString() {
        return this.name + '|' + JSON.stringify(this.data);
    }
}

class Socker {
    constructor(uri, reconnect) {
        var self = this;

        // Option flag to reconnect automatically
        this.reconnect = (typeof reconnect == 'undefined') ? true : reconnect;

        this.log('socker connecting to', uri);

        this.subscriptions = [];

        this.ws = new WebSocket(uri);
        this.listeners = {};
        this.queue = [];

        this._closed = false;

        this._reconnectTimeoutID = null;

        this.ws.addEventListener('open', function(e) {
            self.log('Connected', e);

            self._sendAll();
        });

        this.ws.addEventListener('close', function (e) {
            // TODO: Implement reconnect and do self._subscribeAll();
            self.log('Connection closed', e);
            self._closed = true;

        });

        this.ws.addEventListener('message', function (e) {
            self.log('sock << ' + e.data);
            var message = SockerMessage.fromString(e.data);
            var handlers = self.listeners[message.name] || [];

            handlers.forEach(function (handler) {
                handler(message.data, message, e);
            });
        });
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

    log() {
        console.log.apply(console, Array.prototype.slice.call(arguments));
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
        if (func) {
            delete this.listeners[name];
        } else if (this.listeners.hasOwnProperty(name)) {
            this.listeners[name].forEach(function(callback, i) {
                if (callback == func) {
                    delete this.listeners[name][i];
                }
            });
        }
    }

    emit(name, data) {
        this.send(new SockerMessage(name, data).toString());
    }
}

try {
    window.Socker = Socker;
} catch (e) {}

module.exports = {
    Socker: Socker,
    SockerMessage: SockerMessage
};
