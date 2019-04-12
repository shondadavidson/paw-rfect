import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ClientList extends Component {

    render() {
        return(
            <div>
                <div>
                    <h4>Client List</h4>
                </div>
                <div>
                    <div>
                    <Link to='/chat'><i className="far fa-comment-dots"></i></Link>
                    </div>
                    <div>
                        <h5>Owner Name</h5>
                        <h5>Dog Name</h5>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        name: reduxState.name
    }
}

export default connect(mapStateToProps)(ClientList)