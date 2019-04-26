import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const WalkStatus = (props) => {
    const [walkStatus, setWalkStatus] = useState({providerId: null})

    useEffect(() => {
        checkDogStatus()
    }, [])


const checkDogStatus = () => {
    axios.get(`/api/dogStatus/${props.id}`).then(res => {
      setWalkStatus(res.data )
    })
  }


    return (
        <>
        <Link to={`/videocall/${this.props.id}/${user.id}`} className=""><button>
                <i className="fas fa-video videoButton"></i>Video Call</button></Link>
<p>Video chat with your dogs</p>
        </>
    )
    
    } 

    const mapStateToProps = reduxState => {
        return {
                    name: reduxState.name,
                id: reduxState.id
            }
        }

export default withRouter(connect(mapStateToProps)(WalkStatus))