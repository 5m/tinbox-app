React = require 'react'
sock = require('app').sock
div = React.createFactory 'div'
button = React.createFactory 'button'

HelloWorld = React.createClass
    displayName: 'HelloWorld'
    getInitialState: ->
        result: null

    componentDidMount: ->
        sock.on('hello', (data, message) =>
            console.log data
            @setState({result: message.toString()})
        )

    onClick: ->
        sock.emit('hello',
            message: 'Hello from track!'
        )

    render: ->
        console.log 'hello render'
        div(null, 'Hello World!',
            button({onClick: @onClick}, 'Sock'),
            React.createElement(Result, {result: @state.result})
        )

ConnectionStatus = React.createClass
    displayName: 'HelloWorld'
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