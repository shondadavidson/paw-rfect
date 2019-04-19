import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SearchForProvider = (props) => {
    const [providers, setProviders] = useState([])
    const [zip, setZip] = useState('')
    // const [room, setRoom] = useState(null)

    const getProviders = async () => {
        await axios.get(`/api/searchProviders/${zip}`).then(res => {
            console.log(res)
            setProviders(res.data)
        })
    }


    console.log(providers)
    const mappedProviders = providers.filter((obj) => obj.id !== 6).map((provider, i) => {
        console.log(provider)
        return (
            // <div className='container'>
            <div className='search-list col-12' key={i}>
                <div className='row'>
                <div className='profileImage'>
                            <Link to={`/detailedProvider/${provider.id}`} className="dead-link">

                                <img src={provider.picture} alt={provider.name} style={{ 'width': '10vw', height: '10vw', borderRadius: '50%' }} />
                            </Link>
                        </div>
                        <div className=''>
                          
                            <p className='list-name'>{provider.name}</p>
                            <p><small>Experience:</small>{provider.experience}</p>
                            <p><small>About:</small>{provider.short_desc}</p>
                    
                        </div>
                </div>
            </div>
            // </div>

        )
    })

    return (
        <div className="SearchForProvider">
            <h1>Search For Provider</h1>
            <p>Search by zip code:</p>
            <input type='integer' placeholder='zip' maxLength={5} onChange={(e) => setZip(e.target.value)} value={zip}
            />
            <button onClick={() => getProviders()}>Search</button>
            {mappedProviders}
        </div>
    );
}

export default SearchForProvider





