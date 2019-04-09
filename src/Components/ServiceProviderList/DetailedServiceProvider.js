import React, { Component } from 'react';
import axios from 'axios'


class DetailedServiceProvider extends Component {
  constructor() {
    super()
    this.state = {
      provider: []
    }
  }

  componentDidMount(){
    this.getProvider()
  }
//Hard Coded Provider
  getProvider = () => {
    axios.get(`/api/provider/3`).then(res => {

      this.setState({
        provider: res.data
      })
    })
  }

  render() {
    const mappedProvider = this.state.provider.map(provider => {
      return (
        <div key={provider.id}>
          <i className="far fa-comment-dots"></i>
          image: {provider.image}
          <p>name: {provider.name}</p>
          <p>{provider.short_desc}</p>
          <p>experience {provider.experience}</p>
          <p>{provider.short_desc}</p>
          <p>{provider.bio}</p>
          <p>Boarder? {provider.provider_boarder ? "yes" : 'no' }</p>
          <p>Sitter? {provider.provider_sitter ? "yes" : 'no' }</p>
          <p>walker? {provider.provider_walker ? "yes" : 'no' }</p>
          <i className="far fa-comment-dots"></i>
          <button>Hire</button>
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


export default DetailedServiceProvider;