import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'



class DetailedServiceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: {user:{}, relation:{client_request: "no", provider_approve: 'no'}}
    }
  }

  async componentDidMount(){
    await this.getProvider()
  }

  getProvider = async () => {
    console.log(this.props.id)
    await axios.post(`/api/provider/${this.props.match.params.provider_id}`, {ownerId:this.props.id}).then(res => {
console.log(res.data)
      this.setState({
        provider: res.data
      })
    })
  }

  addProvider = () => {
    console.log(this.props.id)
    console.log(this.props.match.params.provider_id)
    axios.post(`/api/addProvider/${this.props.id}`, {providerId:this.props.match.params.provider_id}).then(res => {
      this.getProvider()
        
        // provider: res.data
      })
    }

  removeProvider = (id) => {
    console.log(id)
    axios.post(`/api/removeProvider/${id}`, {owner_id: this.props.id}).then(res => {
      this.getProvider()
      })
    }

  render() {
    // const {user} = this.state.provider
    let {user, relation} = this.state.provider
    if (relation === null){
    relation = {client_request: "no", provider_approve: 'no'}}
    // console.log(relation.client_request)

    return (
      <div className="DetailedServiceProvider">
        <Link to={`/chatsearch/${this.props.id}/${user.id}`} className="dead-link">
        <i className="far fa-comment-dots" ></i></Link>
          <h1>name: {user.name}</h1>
          <p>{user.short_desc}</p>
          <p>experience {user.experience}</p>
          <p>{user.bio}</p>
          <p>Services Offered:</p>
          <p>{user.provider_boarder ? "Boarding" : '' }</p>
          <p>{user.provider_sitter ? "Sitting" : '' }</p>
          <p>{user.provider_walker ? "Walker" : '' }</p>

          {relation.provider_approve === 'approved' ? <i className="fas fa-user-slash" onClick={() => this.removeProvider(user.id)}></i> : relation.client_request === 'approved' ? 'request sent' : <button type='button' onClick={this.addProvider}>Hire</button>}
          

                <Link to={`/videocall/${this.props.id}/${user.id}`} className=""><button>
                <i className="fas fa-video videoButton"></i>Video Call</button></Link>

          {/* <h6>Past Ratings</h6> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
}

export default connect(mapStateToProps, {})(DetailedServiceProvider);