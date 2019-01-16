import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

/**Load map coordinates and name */
import {data_2} from '../data/data_2';
import {data_3} from '../data/data_3';

/**Load map icons */
const destinationIcon = require('../assets/img/placemarker.png');
const placeMarkerIcon =  require('../assets/img/destination.png');

/**Format data  */
data_2.map((data) => {
    data.coordinates = data.coordinates.replace(/point|[()]/gi,'').split(' ');
    return data;
});

data_3.map((data) => {
    data.coordinates = data.coordinates.replace(/point|[()]/gi,'').split(' ');
    return data;
});

/**Set map dimensions */
const mapStyles = {
    width: '100%',
    height: '100%'
  };

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };
/**Display marker location name on marker click */
    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

/**Hide marker location name on map click */
    onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
        this.setState({
        showingInfoWindow: false,
        activeMarker: null
        })
    }
    };

    render() { 
        return (
        <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={5}
            style={mapStyles}
            initialCenter={{
            lat: -1.2884,
            lng: 36.8233
            }}
        >
            {data_2.map((coords, index) => {
                return <Marker key={index}
                    onClick={this.onMarkerClick}
                    name={coords.name}
                    position={{lat: coords.coordinates[1], lng: coords.coordinates[0]}}
                    icon={destinationIcon}>
                </Marker>;
            })}

            {data_3.map((coords, index) => {
            return <Marker key={index}
                onClick={this.onMarkerClick}
                name={coords.name}
                position={{lat: coords.coordinates[1], lng: coords.coordinates[0]}}
                icon={placeMarkerIcon}>
            </Marker>;
            })}


            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
                <div>
                <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
        </Map>
        );
    }   
}
  

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAde-YQT7KFVdYxJXD4Tmw2Xfate35EUNs',
  })(MapContainer);
