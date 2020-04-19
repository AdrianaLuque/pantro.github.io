import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import LocateControl from './LocateControl';

class MyMap extends Component {
  
  render() {
    const locateOptions = {
      position: 'topright',
      strings: {
          title: 'Mostrar mi ubicación'
      },
      onActivate: () => {} // callback before engine starts retrieving locations
    }

    return (
      <Map center={this.props.center} zoom={this.props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocateControl options={locateOptions} startDirectly/>
      </Map>
    );
  }
}

export default MyMap;
