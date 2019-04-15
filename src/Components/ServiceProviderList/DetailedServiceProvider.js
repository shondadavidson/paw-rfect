import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'



class DetailedServiceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: {user:{}, relation:{}}
    }
  }

  async componentDidMount(){
    await this.getProvider()
  }

  getProvider = async () => {
    console.log(this.props.id)
    await axios.post(`/api/provider/${this.props.match.params.provider_id}`, {ownerId:this.props.id}).then(res => {

      this.setState({
        provider: res.data
      })
    })
  }

  addProvider = () => {
    console.log(this.props.id)
    console.log(this.props.match.params.provider_id)
    axios.post(`/api/addProvider/${this.props.id}`, {providerId:this.props.match.params.provider_id}).then(res => {
      console.log(res.data)
      this.setState({
        provider: res.data
      })
    })
  }

  startChat = (myId, friendId) => {
    // console.log(myId, friendId)

  }

  render() {
    // const {user} = this.state.provider
    const {user, relation} = this.state.provider

    return (
      <div className="DetailedServiceProvider">
        <h1>Welcome to detailed service provider</h1>
        <Link to={`/chat/${this.props.id}/${user.id}`} className="dead-link">
        <i className="far fa-comment-dots" onClick={() => this.startChat(this.props.id, user.id, user.name)}></i></Link>
          {/* image: {user.image} */}
          <p>name: {user.name}</p>
          <p>{user.short_desc}</p>
          <p>experience {user.experience}</p>
          <p>{user.short_desc}</p>
          <p>{user.bio}</p>
          <p>Boarder? {user.provider_boarder ? "yes" : 'no' }</p>
          <p>Sitter? {user.provider_sitter ? "yes" : 'no' }</p>
          <p>walker? {user.provider_walker ? "yes" : 'no' }</p>
          <p>request sent? {user.client_request = 'approved' ? 'request sent' : <button onClick={this.addProvider}>Hire</button>}</p>
          <p>provider approved? {user.provider_approve}</p>
        
          
          <i className="fas fa-user-slash"></i>

          <h6>Past Ratings</h6>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
}

export default connect(mapStateToProps, {})(DetailedServiceProvider);