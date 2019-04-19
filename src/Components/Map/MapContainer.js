import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Geocode from "react-geocode";

const mapStyles = {
  width: "100vw",
  height: "100vh"
};
Geocode.setApiKey("AIzaSyDP-UIUktAsE3rMCtlAKuwgMWm9Vjqi6mo");
// var address = Geocode.fromAddress("Eiffel Tower").then(
//   response => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   error => {
//     console.error(error);
//   }
// );

export class MapContainer extends Component {
  constructor(props) {
    super(props)
  this.state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {},
    address: {}
  }//Shows the infoWindow to the selected place upon a marker
}

  componentDidMount() {
    this.doGeoStuff()
  }
  componentDidUpdate() {
    this.doGeoStuff()
  }
  
  doGeoStuff = () => {
    Geocode.fromAddress('this.props.zip').then(response => {
      console.log(11111, this.props.zip)
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      this.setState({address:{lat, lng}})
    }).catch(err => {
      console.log(err)
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log("7777", this.props.zip)
    return (
      <div style={{ height: "100vh" }}>
        {this.state.address.lat &&
          <Map
            google={this.props.google}
            zoom={14}
            // style={style}
            // initialCenter={{ lat: 30.391617, lng: -81.850769 }}
            initialCenter={this.state.address}
          >
            <Marker
              onClick={this.onMarkerClick}
              // name={'Kenyatta International Convention Centre'}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAWvegVRqKcSGz1TahuiXsF9yzdVwlfzSQ"
})(MapContainer);
