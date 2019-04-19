import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import MapContainer from '../Map/MapContainer'

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


    const mappedProviders = providers.filter((obj) => obj.id !== props.id ).map((provider, i) => {
        console.log(provider)
        return (
            // <div className='container'>
                <div className='search-list col-12' key={i}>
                    <div className='row'>
                        <div className='col-12'>

                            <div className='col-12 col-md-4'>
                                <Link to={`/detailedProvider/${provider.id}`} className="dead-link">

                                    <img src={provider.picture} alt={provider.name} style={{ 'width': '10vw', height: '10vw', borderRadius: '50%' }} />
                                </Link>
                            </div>
                            <div className='col-12 col-md-7'>
                                <p className='list-name'>{provider.name}</p>
                                <p><small>Experience:</small>{provider.experience}</p>
                                <p><small>About:</small>{provider.short_desc}</p>

                            </div>
                        </div>
                    </div>
                </div>
            // </div>

        )
    })
    
    console.log(555, zip)
return (
    <div className="SearchForProvider">
        <h1>Search For Provider</h1>
        <p>Search by zip code:</p>
        <input type='integer' placeholder='zip' maxLength={5} onChange={(e) => setZip(e.target.value)} value={zip}
        />
        <button onClick={() => getProviders()}>Search</button>
        {/* <Link to='/map'><button >Search in Map</button></Link> */}
        {mappedProviders}
        <div  >
            <MapContainer zip={zip}/>
        </div>
    </div>
);
}

export default SearchForProvider





