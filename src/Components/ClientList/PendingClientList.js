import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PendingClientList = (props) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    const getClients = () => {
        axios.get(`/api/getClientRequests/${props.id}`).then(res => {
            setClients(res.data)
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
                <button>Accept</button>
                <button>Decline</button>

            </div>
        )
    })
    console.log(clients, props.id)
    return (
        <div>
            <div>
                <h4>Client List</h4>
                <Link to='/clientlist'>
                    <button>View Client</button>
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

export default connect(mapStateToProps)(PendingClientList)