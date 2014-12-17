React = require 'react'
sock = require('app').sock
div = React.createFactory 'div'
button = React.createFactory 'button'

HelloWorld = React.createClass
    getInitialState: ->
        result: null

    componentDidMount: ->
        sock.on('hello', (data) =>
            console.log data
            @setState result: data
        )

    onClick: ->
        msg = 'Hello via sock!'
        sock.emit(msg)

    render: ->
        div(null, 'Hello World!',
            button({onClick: @onClick}, 'Sock'),
            React.createElement(Result, {result: @state.result})
        )

ConnectionStatus = React.createClass
    render: ->
        React.createElement(
            'div',
            {className: 'connection-status'},
            @props.status
        )

Result = React.createClass
    render: ->
        React.createElement 'pre', null, this.props.result

module.exports = HelloWorld