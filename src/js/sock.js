/**
 * NOT TO BE CONFUSED WITH "sockjs".
 *
 * Created by joar on 2014-12-17.
 */
class SockMessage {
    constructor(name, data) {
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

        return new SockMessage(name, data);
    }
    toString() {
        return this.name + '|' + this.data;
    }
}

class Sock {
    constructor(uri) {
        var self = this;

        this.ws = new WebSocket(uri);
        this.listeners = {};
        this._queue = [];

        this.ws.addEventListener('connect', function(e) {
            self.log('Connected', e);
            self._sendAll();
        });

        this.ws.addEventListener('close', function (e) {
            self.log('Connection closed', e);
        })
    }

    isConnected() {
        return this.ws.readyState == WebSocket.OPEN;
    }

    _sendAll() {
        var self = this;
        this._queue.forEach(function (message) {
            self._send(message.toString());
        });
    }

    log() {
        console.log.apply(
            console,
            [arguments.caller].concat(
                Array.prototype.slice.call(arguments)
            )
        );
    }

    _send(string) {
        if ('string' !== typeof string) {
            throw new Error('Function _send(string) should get a string');
        }

        this.ws.send(string)
    }

    send(message) {
        if (!this.isConnected()) {
            this.log('Not connected. Putting message in queue.');
            this._queue.push(message);
            return;
        }

        this._send(message.toString);
    }

    on(name, cb) {
        if (!this.listeners.hasOwnProperty('name')) {
            this.listeners[name] = [];
        }

        this.listeners[name].push(cb);
    }

    emit(name, data) {
        this.ws.send(new SockMessage(name, data).toString());
    }
}

module.exports = {
    'Sock': Sock,
    'SockMessage': SockMessage
};