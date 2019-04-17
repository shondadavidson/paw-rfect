import React, { Component } from 'react'
import Chat from '../Chat/Chat'
import { connect } from 'react-redux'


class JoinChat extends Component {
    constructor(props){
        super(props)
        this.state={
            room: null
        }
    }

    componentDidMount(){
        this.createRoom(this.props.id, this.props.match.params.providerId)
    }

   
    createRoom = async (myId, providerId) => {

        myId = parseInt(myId)
        providerId = parseInt(providerId)
        let highUser
        let lowUser
        if (myId > providerId) {
            highUser = myId
            lowUser = providerId
        } else {
            highUser = providerId
            lowUser = myId
        }
        const roomId = highUser + ':' + lowUser
        console.log(roomId)
        this.setState({room:roomId})
        // await setRoom(roomId)
        // console.log(room)
        // this.socket.emit('joinRoom', roomId)
        // this.getChat()
    }
   
    render(){

    return (
        <Chat
            room={this.state.room}
            providerId = {this.props.match.params.providerId}
        />
    )


}
}

const mapStateToProps = (reduxState) => {
    return reduxState
}



export default connect(mapStateToProps)(JoinChat)