import React from 'react'
import { withRouter } from 'react-router-dom'

function BackButton (props) {
    if (props.location.pathname !== '/') {
    return (
        <div>
            <button onClick={() => props.history.goBack()}><i className="fas fa-chevron-circle-left"></i></button>
        </div>
    )
    } return null
}

export default withRouter(BackButton)