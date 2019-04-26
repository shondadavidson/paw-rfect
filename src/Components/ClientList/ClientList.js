import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const ClientList = (props) => {
    const [clients, setClients] = useState([])
    const [requests, setRequests] = useState(0)
    const [walking, setWalking] = useState([])
    const [walkId, setWalkId] = useState(null)
    const [clientId, setClientId] = useState('')
    const [clientName, setClientName] = useState('')

console.log(walking)
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
        axios.post(`/api/pickup/${props.id}`, { ownerId: id }).then(res => {
            setWalkId(res.data)
            setClientName(name)
            getWalking()
            setSocketListeners(id)

        })
    }

    const dropOff = (id, owner_id) => {
        axios.put(`/api/dropoff/${id}`, { provider_id: props.id }).then(res => {
            setWalking(res.data)
            setWalkId(null)
            setClientName('')
            setSocketListeners(owner_id)
        })
    }

    const getWalking = () => {
        axios.get(`/api/getWalking/${props.id}`).then(res => {
            setWalking(res.data)

        })
    }

    const setSocketListeners = (id) => {
        let socket = io()

        socket.emit('videoRoom', id)

        socket.emit('reloadHeader', id)
    }

    const mappedWalking = walking.map(walk => {
        return (
            <div key={walk.walk_id} className='onWalk'>
            <h1>{walk.owner_name}</h1>
            <Link to={`/videocall/${props.id}/${walk.owner_id}`} className=""><button>
                <i className="fas fa-video videoButton"></i>Video Call</button></Link>
                <button className='videButton' onClick={() => dropOff(walk.walk_id, walk.owner_id)}>Dropoff</button>
                
                


            </div>
        )
    })

    const mappedClients = clients.map((client) => {
        const mappedDogs = client.clients.dogs.map((dog) => {
            return (
                <div key={dog.dog_id}>
                <img src={dog.dog_picture} alt="none" style={{'width':'40px', height: '40px', 'object-fit': 'cover', borderRadius:'50%'}}/>
                    <p>{dog.dog_name}</p>

                </div>
            )
        })
        return (
            <>
            
            <div key={client.clients.id}>
            <img src={client.clients.picture} alt="none" style={{'width':'60px', height: '60px', 'object-fit': 'cover', borderRadius:'50%'}}/>
                <h1>{client.clients.name}</h1>
                <Link to={`/chatsearch/${props.id}/${client.clients.id}`} className="dead-link">
                    <i className="far fa-comment-dots" ></i></Link>
                {mappedDogs}
                <p>test</p>
                {client.clients.walk}
                <button onClick={() => pickup(client.clients.id, client.clients.name)}>Pickup</button>
                <hr />
  


            </div>
</>
        )
    })
    return (
        <div className='col-12'>
            <div className='col-12'>

                <Link to='/pendingclients'>
                {requests > 0 ? <p>Pending Requests = {requests}</p> : <p></p>}
                </Link>
                </div>
                <div className='col-12'>
                <h2>On Walk</h2>
                <div className='col-12'>
                {mappedWalking}
                </div>
                <hr />
                <div className='col-12'>
                <h2>Client List</h2>
                </div>
                <div className='col-12'>
                {mappedClients}
                <hr />
                </div>
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