import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ClientList = (props) => {
    const [clients, setClients] = useState([])
    const [requests, setRequests] = useState(0)

    useEffect(() => {
        getClients()
        getRequests()
    }, [])

    const getClients = () => {
        axios.get(`/api/getClients/${props.id}`).then(res => {
            setClients(res.data)
        })
    }

    const getRequests = () => {
        axios.get(`/api/getRequestCount/${props.id}`).then(res => {
            setRequests(res.data)
        })
    }

    const mappedClients = clients.map((client, i) => {
        const mappedDogs = client.clients.dogs.map((dog, i) => {
            return (
                <div key={i}>
                    <p>{dog.dog_name}</p>

                </div>
            )
        })
        return (
            <div key={i}>
                <h4>{client.clients.name}</h4>
                <i className="far fa-comment-dots"></i>
                {mappedDogs}
                <button>Pickup</button>
                <button>Dropoff</button>

            </div>
        )
    })
    console.log(clients, props.id)
    console.log(requests)
    return (
        <div>
            <div>
                <h4>Client List</h4>
                {requests > 0 ? <p>Pending Requests = {requests}</p> : <p></p>}

                <Link to='/pendingclients'>
                    {/* <button>View Pending Client Requests</button> */}
                </Link>
                {mappedClients}
            </div>
        </div>

    )
}


const mapStateToProps = reduxState => {
    return {
        name: reduxState.name,
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(ClientList)