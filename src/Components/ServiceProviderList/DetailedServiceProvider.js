import React, { Component } from 'react';


class DetailedServiceProvider extends Component {
    constructor(){
        super()
        this.state = {
            provider: []
        }
    }

    getProvider = () => {
        axios.get(`/api/getMyProvider/1`).then(res => {
            console.log(res.data)
            this.setState({
                provider: res.data
            })
        })
    }

  render() {
    return (
      <div className="DetailedServiceProvider">
      <h1>Welcome to detailed service provider</h1>
      </div>
    );
  }
}

export default DetailedServiceProvider;