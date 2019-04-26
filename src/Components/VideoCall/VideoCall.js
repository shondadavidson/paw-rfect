import React, { Component } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import Webcam from 'react-webcam'

class VideoCall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      room: '',
      whatIVideoCallening: '',
      otherUser: {}
    }
    this.initiator = false
    this.myIpData = {}
  }

  componentDidMount(){
    this.setSocketListeners()
    this.joinChatRoom(this.props.match.params.userId, this.props.match.params.providerId)
    // this.getOtherUser()
  }

  // getOtherUser = () => {
  //   axios.get('/api/user/${this.props.match.params.provider_id')
  // }

  joinChatRoom = async (myId, providerId) => {
    // console.log(myId, providerId)
    myId = parseInt(myId)
    providerId = parseInt(providerId)
    let highUser
    let lowUser
    if(myId > providerId){
        highUser = myId
        lowUser = providerId
    } else {
        highUser = providerId
        lowUser = myId
    }
    const roomId = highUser + ':' + lowUser
    // console.log(roomId)
    await this.setState({room:roomId})
    this.socket.emit('videoRoom', roomId)
   
}


  setSocketListeners = () => {
    this.socket = io()

    this.socket.on('callPeer', (data) => {
      if(!this.initiator){
        this.setState({whatIsHappening: "someone is calling you!"})
        this.gettingCall(data.ipData)
      }
    })

    this.socket.on('answerPeer', (data) => {
      if(this.initiator){
        this.setState({whatIsHappening: "other party answered you!"})
        this.gettingAnswer(data.ipData)
      }
    })
  }

  setRtcListeners = () => {
    this.rtc.on('error', function (err) { console.log('error', err) })

    this.rtc.on('connect', () => {
      this.rtc.send('whatever' + Math.random())
    })

    this.rtc.on('data', (data) => {
      this.setState({whatIsHappening: ""+data.message})
    })

    this.rtc.on('stream', function (stream) {
      let video = document.querySelector('video')
      video.srcObject = stream
      video.play()
    })

    this.rtc.on('close', () => {
      this.initiator = false;
      this.myIpData = {}
      this.rtc.destroy((err) => {
      })
    })
  }

  joinRoom = () => {
    this.socket.emit('videoRoom', this.state.room)
  }

  call = () => {
    this.initiator = true
    navigator.getUserMedia({video:true, audio:true}, this.gotMedia, function(){})
  }

  gettingCall = (ipData) => {
    navigator.getUserMedia({video:true, audio:true}, (stream) => this.gotMediaAfterBeingCalled(stream, ipData), function(){})
  }

  answer = () => {
    this.socket.emit('answerPeer', {room:this.state.room, initiator:this.initiator, ipData: JSON.stringify(this.myIpData)})
  }

  gettingAnswer = (ipData) => {
    this.rtc.signal(ipData)
  }

  gotMedia = (stream) => {
    this.rtc = new Peer({initiator: this.initiator, trickle:false, stream:stream})

    this.rtc.on('signal', (ipData) => {
      this.myIpData = ipData
      this.socket.emit('callPeer', {room:this.state.room, initiator:this.initiator, ipData:JSON.stringify(ipData)})
    })

    this.setRtcListeners()
  }

  gotMediaAfterBeingCalled = (stream, ipData) => {
    this.rtc = new Peer({initiator: this.initiator, trickle:false, stream:stream})

    this.rtc.on('signal', (data) => {
      if(data.renegotiate){return}
      this.myIpData = data
    })

    this.rtc.signal(JSON.parse(ipData))

    this.setRtcListeners()
  }

  endCall = () => {
    this.rtc.destroy((err) => {
    })
  }

  sendMessage = () => {
    this.rtc.send({type: 'MSG', message: this.state.message})
  }

  render() {
    return (
      <div className="VideoCall col-12">
        <p>{this.state.whatIsHappening}</p>
        <button id='call' onClick={this.call}><i className="fas fa-phone-volume"></i> Call</button>
        <button id='answer' onClick={this.answer}><i className="fas fa-phone-volume"></i> Answer</button>
        <button id='endCall' onClick={this.endCall}><i className="fas fa-phone-slash"></i> End Call</button>
        <div className="col-12 videoScreen">
          <video style={{width: "100%", minWidth:"320px", background:"#345"}}>
          </video>
          <div className='selfCam'>
          {/* <Webcam audio={false} style={{width: "80", maxWidth:"200px"}}/> */}
          </div>
        </div>
        <div className='col-12'>
        {/* <input onChange={(e) => this.setState({message: e.target.value})}/>
        <button onClick={this.sendMessage}>Send Message</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(VideoCall);