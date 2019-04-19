import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ClientList = (props) => {
    const [clients, setClients] = useState([])
    const [requests, setRequests] = useState(0)
    const [walking, setWalking] = useState([])
    const [walkId, setWalkId] = useState(null)
    const [clientId, setClientId] = useState('')
    const [clientName, setClientName] = useState('')


    useEffect(() => {
        getClients()
        getRequests()
        getWalking()
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

    const pickup = (id, name) => {
        console.log(id, name)
        axios.post(`/api/pickup/${props.id}`, { ownerId: id }).then(res => {
            setWalkId(res.data)
            setClientName(name)
            getWalking()
        })
    }

    const dropOff = (id) => {
        console.log(props.id)
        console.log(id)
        axios.put(`/api/dropoff/${id}`, { provider_id: props.id }).then(res => {
            setWalking(res.data)
            setWalkId(null)
            setClientName('')
        })
    }

    const getWalking = () => {
        axios.get(`/api/getWalking/${props.id}`).then(res => {
            setWalking(res.data)
            console.log(res.data)

        })
    }

    const mappedWalking = walking.map(walk => {
        return (
            <div key={walk.walk_id}>
                <button onClick={() => dropOff(walk.walk_id)}>Dog drop off for:  {walk.owner_name}</button>

            </div>
        )
    })

    const mappedClients = clients.map((client) => {
        const mappedDogs = client.clients.dogs.map((dog) => {
            return (
                <div key={dog.dog_id}>
                    <p>{dog.dog_name}</p>

                </div>
            )
        })
        return (
            <div key={client.clients.id}>
                <h4>{client.clients.name}</h4>
                <Link to={`/chatsearch/${props.id}/${client.clients.id}`} className="dead-link">
                    <i className="far fa-comment-dots" ></i></Link>
                {mappedDogs}
                <p>test</p>
                {client.clients.walk}
                <button onClick={() => pickup(client.clients.id, client.clients.name)}>Pickup</button>


            </div>

        )
    })
    console.log(clients, props.id)
    console.log(requests)
    console.log(clientName)
    console.log('walking is', walking)
    return (
        <div>
            <div>

                {requests > 0 ? <p>Pending Requests = {requests}</p> : <p></p>}

                <Link to='/pendingclients'>
                    {/* <button>View Pending Client Requests</button> */}
                </Link>
                {mappedWalking}
                <h4>Client List</h4>
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