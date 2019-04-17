import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const SearchForProvider = () => {
    const [providers, setProviders] = useState([])
    const [zip, setZip] = useState('')

    const getProviders = () => {
        axios.get(`/api/searchProviders/${zip}`).then(res => {
            setProviders(res.data)
        })
    }



         const mappedProviders = providers.map(provider => {
            return (
                
                <div className='search-list'>
                    
                    <Link key={provider.id} to={`/detailedProvider/${provider.id}`} className="dead-link">
                    <p className='list-name'>{provider.name}</p>
                    <p><small>Experience:</small>{provider.experience}</p>
                    <p><small>About:</small>{provider.short_desc}</p>
                    </Link>
                    

                </div>
              
            )
        })

    return (
        <div className="SearchForProvider">
            <h1>Search For Provider</h1>
            <p>Search by zip code:</p>
            <input type='integer' placeholder='zip' maxLength={5} onChange={(e) => setZip(e.target.value)}value={zip}
            />
            <button onClick={() => getProviders()}>Search</button>
            {mappedProviders}
        </div>
    );
}

export default SearchForProvider



    
   
