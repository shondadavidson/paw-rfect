import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'


class DetailedServiceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: []
    }
  }

  componentDidMount(){
    this.getProvider()
  }

  getProvider = () => {
    console.log(this.props.id)
    axios.post(`/api/provider/${this.props.match.params.provider_id}`, {ownerId:this.props.id}).then(res => {

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

  render() {
    console.log(this.state.provider)
    const mappedProvider = this.state.provider.map(provider => {
      return (
        <div key={provider.user.id}>
          <i className="far fa-comment-dots"></i>
          image: {provider.user.image}
          <p>name: {provider.user.name}</p>
          <p>{provider.user.short_desc}</p>
          <p>experience {provider.user.experience}</p>
          <p>{provider.user.short_desc}</p>
          <p>{provider.user.bio}</p>
          <p>Boarder? {provider.user.provider_boarder ? "yes" : 'no' }</p>
          <p>Sitter? {provider.user.provider_sitter ? "yes" : 'no' }</p>
          <p>walker? {provider.user.provider_walker ? "yes" : 'no' }</p>
          <p>request sent? {provider.user.client_request = 'approved' ? 'request sent' : 'send request'}</p>
          <p>provider approved? {provider.user.provider_approve}</p>
          <i className="far fa-comment-dots"></i>
          <button onClick={this.addProvider}>Hire</button>
          <i className="fas fa-user-slash"></i>

          <h6>Past Ratings</h6>
      
          

        </div>
      )
    })
    return (
      <div className="DetailedServiceProvider">
        <h1>Welcome to detailed service provider</h1>
        {mappedProvider}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
}

export default connect(mapStateToProps, {})(DetailedServiceProvider);