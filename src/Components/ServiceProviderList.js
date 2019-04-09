import React, { Component } from 'react';
import axios from 'axios';

class ServiceProviderList extends Component {
    constructor(){
        super()
        this.state={
            myProviders: []
        }
    }

    componentDidMount(){
        this.getMyProviders
    }

    getMyProviders = () => {
        axios.get('/api/getMyProviders').then(res => {
            this.setState({
                myProviders: res.data
            })
        })
    }


  render() {

    return (
      <div className="ServiceProviderList">
      <h1>Welcome Owner</h1>
    
      </div>
    );
  }
}

export default ServiceProviderList;
