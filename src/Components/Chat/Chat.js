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
        this.joinChatRoom(this.props.match.params.room)
        
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    setSocketListeners = () => {
        this.socket = io()

        this.socket.on('sendMsg', (messages) => {
            this.setState({ messages: messages})
        })
        // this.joinChatRoom()
        // this.socket.emit('joinRoom', this.state.room)
    }

    joinChatRoom = async () => {
        await this.socket.emit('joinRoom', this.props.match.params.room)
        this.getChat()
    }

    getChat = () => {
        axios.get(`/api/getChat/${this.props.match.params.room}`).then(res => {
            this.setState({
                messages: res.data
            })
        })
    }

    sendMessage = () => {
        this.socket.emit('sendMsg', { 
            room: this.props.match.params.room, 
            msg: this.state.message, user: this.props.name, 
            author_id:this.props.id, user_id: this.props.id, 
            provider_id:this.props.match.params.providerId })
        this.setState({ message: '' })
    }

    
    render() {
        // console.log(this.props.match.params.room)
        // console.log(this.props.match.params)
        // console.log(this.props.name)
        // console.log('message', this.state.message)
        // console.log('messages', this.state.messages)

          const mappedMessages = this.state.messages.map((message, i) => {
              return (
                  <div key={i} className='chat'>
                  <span className='chatName'>{message.user_name}: </span>
                  <span className='chatMessage'> {message.message}</span>
                  
                  </div>
              )
          })

        return (
            <div className="Chat col-11">
            <div className='chatMessage'>
            
                <input 
                    type='text' 
                    placeholder='chat' 
                    value={this.state.message} 
                    onChange={(e) => this.setState({ message: e.target.value })} />
                <button className='sendMessageButton' onClick={() => this.sendMessage()}>Send Message</button>
                </div>
                <div className='chatDisplay'>
  
                {mappedMessages}
            </div>
                
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Chat);
