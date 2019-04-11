import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import { updateUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom'

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

    getMyProviders = () => {
        // console.log(this.props.id)
        axios.get(`/api/getMyProviders/${this.props.id}`).then(res => {
            console.log(res.data)
            this.setState({
                myProviders: res.data
            })
        })
    }


    render() {
        console.log(this.state.myProviders)
        console.log(this.props)
        const mappedProviders = this.state.myProviders.map(provider => {
            console.log(provider.id)
            return (
                <Link key={provider.id} to={`/detailedProvider/${provider.id}`} className="dead-link">
                <div >
                    <i className="far fa-comment-dots"></i>
                    <p>{provider.name}</p>
                    <p>{provider.experience}</p>
                    <p>{provider.short_desc}</p>
                    <p>--------------</p>

                </div>
                </Link>
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

const mapStateToProps = reduxState => {
    return reduxState;
  };
  const mapDispatchToProps = {
    updateUser
  };

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviderList);


