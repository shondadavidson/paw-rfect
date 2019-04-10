import React, { Component } from 'react';
import axios from 'axios';
// import {connect} from 'react-redux'

class ServiceProviderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myProviders: []
        }
    }

    componentDidMount() {
        this.getMyProviders()
    }


    //Hard coded a user

    getMyProviders = () => {
        axios.get(`/api/getMyProviders/{this.props.id}`).then(res => {
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
                    <i className="fas fa-user-slash"></i>
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

function mapStateToProps({id}){
    return {
        id
    }
}

// export default connect(mapStateToProps, {})(ServiceProviderList);

export default ServiceProviderList 
