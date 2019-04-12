import React, { Component } from 'react'
import { connect } from 'react-redux'

class ClientList extends Component {

    render() {
        return(
            <div>
                <div>
                    <h4>Client List</h4>
                </div>
                <div>
                    <div>
                    <i className="far fa-comment-dots"></i>
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