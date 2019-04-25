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
        console.log(walk)
        return (
            <div key={walk.walk_id} className='onWalk'>
            <h4>{walk.owner_name}</h4>
            <Link to={`/videocall/${props.id}/${walk.owner_id}`} className=""><button>
                <i className="fas fa-video videoButton"></i>Video Call</button></Link>
                <button className='videButton' onClick={() => dropOff(walk.walk_id)}>Dropoff</button>
                


            </div>
        )
    })

    const mappedClients = clients.map((client) => {
        const mappedDogs = client.clients.dogs.map((dog) => {
            return (
                <div key={dog.dog_id}>
                <img src={dog.dog_picture} alt="none" style={{'width':'3vw', height: '3vw', borderRadius:'50%'}}/>
                    <p>{dog.dog_name}</p>

                </div>
            )
        })
        return (
            <>
            
            <div key={client.clients.id}>
            <img src={client.clients.picture} alt="none" style={{'width':'5vw', height: '5vw', borderRadius:'50%'}}/>
                <h4>{client.clients.name}</h4>
                <Link to={`/chatsearch/${props.id}/${client.clients.id}`} className="dead-link">
                    <i className="far fa-comment-dots" ></i></Link>
                {mappedDogs}
                <p>test</p>
                {client.clients.walk}
                <button onClick={() => pickup(client.clients.id, client.clients.name)}>Pickup</button>
                {/* <Link to={`/videocall/${props.id}/${client.clients.id}`} className="dead-link">
                <i className="fas fa-video"></i></Link> */}


            </div>
</>
        )
    })
    console.log(clients, props.id)
    console.log(requests)
    console.log(clientName)
    console.log('walking is', walking)
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