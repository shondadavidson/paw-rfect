import React, { Component } from 'react';
import axios from 'axios';

class ServiceProviderList extends Component {
    constructor() {
        super()
        this.state = {
            myProviders: []
        }
    }

    componentDidMount() {
        this.getMyProviders()
    }


    //Hard coded a user

    getMyProviders = () => {
        axios.get(`/api/getMyProviders/1`).then(res => {
            console.log(res.data)
            this.setState({
                myProviders: res.data
            })
        })
    }


    render() {
        const mappedProviders = this.state.myProviders.map(provider => {
            return (
                <div key={provider.id}>
                    <i className="far fa-comment-dots"></i>
                    <p>{provider.name}</p>
                    <p>{provider.experience}</p>
                    <p>{provider.short_desc}</p>
                    <i class="fas fa-user-slash"></i>
                    <p>--------------</p>

                </div>
            )
        })

        return (
            <div className="ServiceProviderList">
                <h1>Welcome Owner</h1>
                {mappedProviders}

            </div>
        );

    }
}

export default ServiceProviderList;
