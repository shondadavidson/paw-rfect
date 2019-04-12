import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ClientList = (props) => {
    const [clients, setClients] = useState([])
    const [requests, setRequests] = useState(0)
    const [walking, setWalking] = useState({})
  

    useEffect(() => {
        getClients()
        getRequests()
        // getWalking()
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

    const pickup = (val) => {
        console.log(val)
        axios.post(`/api/pickup/${props.id}`, {ownerId: val} ).then(res => {
            setClients(res.data)
            console.log(clients)
        })
    }

    // const getWalking = () => {
    //     axios.get(`/api/pickup/${props.id}`).then(res => {
    //         setWalking(res.data)
    //     })
    // }

    const mappedClients = clients.map((client) => {
        const mappedDogs = client.clients.dogs.map((dog) => {
            return (
                <div key={dog.god_id}>
                    <p>{dog.dog_name}</p>

                </div>
            )
        })
        return (
            <div key={client.clients.id}>
                <h4>{client.clients.name}</h4>
                <i className="far fa-comment-dots"></i>
                {mappedDogs}
                <p>test</p>
                {client.clients.walk}
                <button onClick={() => pickup(client.clients.id)}>Pickup</button>
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