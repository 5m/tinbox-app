var _ = require('lodash');
var React = require('react/addons');
var { socker } = require('app');


class SubscriberHandler {
    constructor() {

    }
}


var SubscriberMixin = {
    componentWillMount: function () {
        this.__sockerHandlers = {};
    },

    consolidated: function (key) {
        var fromStateMaybe = this.state ? this.state[key] || [] : [];
        return fromStateMaybe.concat(this.props[key]);
    },

    subscribe: function (channel, stateKey) {
        var self = this;
        if (channel && channel.constructor === Array) {
            channel = channel.join('.')
        }

        // XXX: Evil eval to avoid function identity check pass for handlers
        // with different contexts.
        var handlerFunc = eval(function (sockerMessage) {
            var _s = self.state,
                previousMaybe = _s ? (_s[stateKey] || []) : [],  // Sorry
                newState = {};

            newState[stateKey] = [sockerMessage].concat(previousMaybe);

            console.log('Updating', stateKey,
                        'for', self.constructor.displayName,
                        'to', newState);

            self.setState(newState);
        });

        console.log('Subscribing to ', channel, 'for', stateKey);

        socker.on(channel, handlerFunc);

        var sh = this.__sockerHandlers,
            handlers = sh[channel] = sh[channel] || [];  // Sorry

        handlers.push(handlerFunc);
    },

    componentWillUnmount: function () {
        var self = this;
        var channels = Object.keys(self.__sockerHandlers);

        channels.forEach(function (channel) {
            self.__sockerHandlers[channel].forEach(function (handler) {
                console.log('Offing', handler.name, 'from', channel);
                socker.off(channel, handler);
            });
        });
    }
};


module.exports.SubscriberMixin = SubscriberMixin;