React = require 'react'

HelloWorld = React.createClass
    getInitialState: ->
            result: null
    componentDidMount: ->
        @ws = new WebSocket('ws://localhost:8765/ws');
        @sendQ = [];

        @ws.addEventListener 'close', (e) =>
            console.log "Closed #{@ws}", e

        @ws.addEventListener 'message', (e) =>
            @setState({result: e.data})
            console.log e

        @ws.addEventListener 'open', (e) =>
            console.log 'Open', e
            @ws.send msg for msg in @sendQ

    onClick: ->
        msg = 'Hello via sock!'

        if @ws.readyState == WebSocket.OPEN
            @ws.send(msg)
        else
            @sendQ.push(msg)
    render: ->
        React.createElement('div', null, 'Hello World!',
            React.createElement('button', {onClick: @onClick}, 'Sock')
            React.createElement(Result, {result: @state.result})
        )

Result = React.createClass
    render: ->
        React.createElement 'div', null, this.props.result

module.exports = HelloWorld