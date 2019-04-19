import React from 'react';
import ReactDOM from 'react-dom';


const mapStyles = {
  map: {
    position: 'absolute',
    width: '100vh',
    height: '100vh'
  }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        };
      }

}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 40.391617,
    lng: -111.850769
  },
  centerAroundCurrentLocation: false,
  visible: true
};


