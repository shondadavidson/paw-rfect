import React, { Component } from 'react';
import io from 'socket.io-client'
import { connect } from 'react-redux'
import axios from 'axios';


class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            message: '',
            messages: [],
            room: null
        }
    }

    componentDidMount() {
        this.setSocketListeners()
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    setSocketListeners = () => {
        this.socket = io()

        this.socket.on('sendMsg', (messages) => {
            console.log('hit on', messages)
            this.setState({ messages: messages, message: '' })
        })
        // this.joinChatRoom()
        this.socket.emit('joinRoom', '1')
    }

    // joinChatRoom = (myId, friendId) => {
    //     myId = parseInt(myId)
    //     friendId = parseInt(friendId)
    //     let highUser
    //     let lowUser
    //     if(myId > friendId){
    //         highUser = myId
    //         lowUser = friendId
    //     } else {
    //         highUser = friendId
    //         lowUser = myId
    //     }
    //     const roomId = highUser + ':' + lowUser
    //     console.log(roomId)
    //     this.setState({room:roomId})
    //     this.socket.emit('joinRoom', roomId)
    // }

    // getChat = () => {
    //     axios.get(`/api/getChat/${this.state.room}`).then(res => {
    //         this.setState({
    //             messages: res.data
    //         })
    //     })
    // }

    sendMessage = () => {
        console.log('sending message', this.state.message)
        this.socket.emit('sendMsg', { room: '1', msg: this.state.message, user: this.props.name })
        this.setState({ message: '' })
    }
    render() {
        console.log(this.props.name)
        console.log('message', this.state.message)
        console.log('messages', this.state.messages)

          const mappedMessages = this.state.messages.map((message, i) => {
              return (
                  <div key={i}>
                  <p>{message.user_name}</p>
                  <p>{message.message}</p>
                  </div>
              )
          })

        return (
            <div className="Chat">
                this is a chat box
        
        <input type='text' placeholder='chat' value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
                <button onClick={() => this.sendMessage()}>Send Message</button>
                {mappedMessages}
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Chat);
