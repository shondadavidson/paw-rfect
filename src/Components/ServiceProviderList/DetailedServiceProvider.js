import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



class DetailedServiceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: { user: {}, relation: { client_request: "no", provider_approve: 'no' } }
    }
  }

  async componentDidMount() {
    await this.getProvider()
  }

  getProvider = async () => {
    await axios.post(`/api/provider/${this.props.match.params.provider_id}`, { ownerId: this.props.id }).then(res => {
      this.setState({
        provider: res.data
      })
    })
  }

  addProvider = () => {
    axios.post(`/api/addProvider/${this.props.id}`, { providerId: this.props.match.params.provider_id }).then(res => {
      this.getProvider()

      // provider: res.data
    })
  }

  removeProvider = (id) => {
    axios.post(`/api/removeProvider/${id}`, { owner_id: this.props.id }).then(res => {
      this.getProvider()
    })
  }

  render() {
    // const {user} = this.state.provider
    let { user, relation } = this.state.provider
    if (relation === null) {
      relation = { client_request: "no", provider_approve: 'no' }
    }
    // console.log(relation.client_request)

    return (
      <div className="DetailedServiceProvider">
        
          <img src={user.picture} alt={user.name} style={{ 'width': '10vw', height: '10vw', borderRadius: '50%' }} />
        <h1>{user.name}</h1>
        <Link to={`/chatsearch/${this.props.id}/${user.id}`} className="dead-link">
          <i className="far fa-comment-dots" ></i></Link>
        <p >{user.short_desc}</p>
        <p className='ProviderProfilePlaceholder'>Experience: </p>
        <p>{user.experience}</p>
        <p className='ProviderProfilePlaceholder'>Bio: </p>
        <p>{user.bio}</p>
        <p className='ProviderProfilePlaceholder'>Services Offered:</p>
        <p>{user.provider_boarder ? "Boarding" : ''}</p>
        <p>{user.provider_sitter ? "Sitting" : ''}</p>
        <p>{user.provider_walker ? "Walker" : ''}</p>

        {relation.provider_approve === 'approved' ? <i className="fas fa-user-slash" onClick={() => this.removeProvider(user.id)}></i> : relation.client_request === 'approved' ? 'request sent' : <button type='button' onClick={this.addProvider}>Hire</button>}


        {/* <h6>Past Ratings</h6> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
}

export default connect(mapStateToProps, {})(DetailedServiceProvider);