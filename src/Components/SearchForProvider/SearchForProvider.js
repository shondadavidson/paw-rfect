import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { zipResults } from '../../ducks/reducer'
import MapContainer from '../Map/MapContainer';


const SearchForProvider = props => {
  const [zip, setZip] = useState('');
  // const [room, setRoom] = useState(null)

  const getProviders = async () => {
    await axios.get(`/api/searchProviders/${zip}`).then(res => {
      console.log(res);
      props.zipResults(res.data)
    });
  };


  const mappedProviders = props.searchedResults
    .filter(obj => obj.id !== props.id)
    .map((provider, i) => {
      console.log(provider);
      return (
        // <div className='container'>
        <div className="search-list col-12" key={i}>
        
            <Link to={`/detailedProvider/${provider.id}`} className="dead-link">
              <div className="profileImage">
                <img
                  src={provider.picture}
                  alt={provider.name}
                  style={{ width: '10vw', height: '10vw', borderRadius: '50%' }}
                />
              </div>
              <div className="">
                <p className="list-name">{provider.name}</p>
                <p><small>Experience:</small></p>
                 <p>{provider.experience}
                </p>
                <p><small>About:</small></p>
                 <p>{provider.short_desc}</p>
              </div>
            </Link>
          </div>
    
        // </div>
      );
    });

  console.log(555, zip);
  return (
    <div className="SearchForProvider">
      <h1>Search For Provider</h1>
      <p>Search by zip code:</p>
      <input type="integer" placeholder="zip" maxLength={5} onChange={e => setZip(e.target.value)} value={zip} />
      <button onClick={() => getProviders()}>Search</button>
      <Link to={`/map/${zip}`}>
        <button>Search in Map</button>
      </Link>
      {/* <Link to='/map'><button >Search in Map</button></Link> */}
      <div className='mappedProviders'>
      {mappedProviders}
      </div>
      <div>{/* <MapContainer zip={zip}/> */}</div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return {
    searchedResults: reduxState.searchedResults
  }
}
const mapDispatchToProps = {
  zipResults
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForProvider)
