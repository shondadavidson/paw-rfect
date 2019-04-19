import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import './ChatCenter.css'
import {Link} from 'react-router-dom'

const ChatCenter = (props) => {
    const [inbox, setInbox] = useState([])

    useEffect(() => {
        getInbox()
    }, [])

    const getInbox = () => {
        axios.get(`/api/getInbox/${props.id}`).then(res => {
            setInbox(res.data)
        })
    }
    
    const read = (room) => {
        // console.log(room)
        axios.put(`/api/read/${props.id}`, {room:room}).then(res => {
            setInbox(res.data)
        })
    }

    const mappedInbox = inbox.map(chat => {
        console.log(chat)
 
        return (
            
            <div key={chat.room} >
                <Link className='dead-link' to={`/chat/${chat.room}/${chat.receiver_id}`}>
                <div className='chatRow' onClick={ () => read(chat.room)}>
                <img className='chatPicture' src={chat.picture} alt="chat.name"  />
                    <span className='inboxName'>{chat.receiver_name}</span>
                    {chat.read === null ?  <span className='inboxMessageNew'>{chat.message}</span> : <span className='inboxMessage'>{chat.message}</span>} 
                    {/* <span className='inboxMessage'>{chat.message}</span> */}
                </div>
                </Link>
            </div>
        )
    })

    return (
        <>
            <h1>Inbox</h1>
            <div className='col-12 ChatCenter'>
                
            {mappedInbox}
            </div>
                
        </>
            )
        
        }
        
const mapStateToProps = reduxState => {
    return {
                name: reduxState.name,
            id: reduxState.id
        }
    }
    
export default connect(mapStateToProps)(ChatCenter)