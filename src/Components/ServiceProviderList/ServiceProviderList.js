import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

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
                <div className='search-list ' key={provider.id}>


                    <Link to={`/detailedProvider/${provider.id}`} className="dead-link">
                        <div className='profileImage'>


                            <img src={provider.picture} alt={provider.name} style={{ 'width': '10vw', height: '10vw', borderRadius: '50%' }} />

                        </div>
                        <div className=''>

                            <p className='list-name'>{provider.name}</p>
                            <p><small>Experience:</small>{provider.experience}</p>
                            <p><small>About:</small>{provider.short_desc}</p>

                        </div>
                    </Link>
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

const mapStateToProps = reduxState => {
    return reduxState;
};
const mapDispatchToProps = {
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviderList);


