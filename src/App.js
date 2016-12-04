import {default as React, Component} from 'react';
import {default as canUseDOM} from 'can-use-dom';
import {default as _} from 'lodash';  
import {GoogleMapLoader, GoogleMap, Marker, SearchBox, KmlLayer} from 'react-google-maps';
import {triggerEvent} from 'react-google-maps/lib/utils';
import SearchBoxModule from './SearchBoxModule.js';
import ClimateZoneLookup from './ClimateZoneLookup.js';
import ToggleOverlay from './ToggleOverlay.js';
import Header from './Header.js';
import BottomText from './BottomText.js';



class Mapping extends Component {

  static mapCenter = {
    lat: 47.6205588,
    lng: -2.3212725,
  }

  constructor (props, context) {
    super(props, context);
    this.handleWindowResize = _.throttle(this.handleWindowResize, 500);
 
    // Set the initial state because we need a map center initially
    this.state = {
      center: Mapping.mapCenter,
      markers: [],
      zone: {
        zoneCode: null,
        zoneDesc: null
      },
      overlay: null,
      zoom: 3
    };

    this.handleZoomChanged = this.handleZoomChanged.bind(this);
    this.handleSetZone = this.handleSetZone.bind(this);
    this.handleSetOverlay= this.handleSetOverlay.bind(this);
  }

  componentDidMount () {
   if (!canUseDOM) {
     return;
   }
   window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount () {
    if (!canUseDOM) {
      return;
    }
    window.removeEventListener('resize', this.handleWindowResize);
  }
  
  /* Map Events */
  handleWindowResize () {
    triggerEvent(this._googleMapComponent, 'resize');
  }

  handleZoomChanged() {
    console.log('handleZoomChanged');
    const nextZoom = this._googleMapComponent.getZoom();
    if (nextZoom !== this.state.zoom) {
      this.setState({
        zoom: nextZoom,
      });
    }
  }
  /* App Events */

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      markers.push({
        position: place.geometry.location,
      });
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    const address = places[0].formatted_address;
    this.setState({
      center: mapCenter,
      markers,
      address,
      zoom: 7
    });
  }

  handleSetZone(zone, desc) {
     this.setState({
      zone: {
        zoneCode: zone,
        zoneDesc: desc
      }
    });
  }

  handleSetOverlay() {
    const newOverlayState = (this.state.overlay) ? null : 
      'https://sco-tt.github.io/Climate-Zone-Query/Koeppen-Geiger-GE.kmz';
    this.setState({
      overlay: newOverlayState,
    });
  }

  render () {
    return (
    <div className="main">
    <Header /> 
    <div className="row">

     <GoogleMapLoader
       containerElement={
        <div
        {...this.props}
        className="map"
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => (this._googleMapComponent = map)}
          center={this.state.center}
          onClick={this.handleMapClick}
          mapTypeId={'terrain'}
          defaultOptions={{mapTypeControl: false}}
          zoom={this.state.zoom}
          onMapMounted={this.handleMapMounted}
          onZoomChanged={this.handleZoomChanged}
        >

        
        {this.state.markers.map((marker, index) => {
            return (
              <Marker
              {...marker}
              key={index} />
              );
          })}

          <SearchBox
            /**
             * Use global google object 'constants' (1) instead of google object 
             * (google.maps.ControlPosition.TOP_LEFT) becuase 'google' object 
             * returns undefined
             *
             * @link https://github.com/tomchentw/react-google-maps/issues/196
             * 
             */
            controlPosition={1}
            placeholder="Enter a location"
            style={SearchBoxModule.inputStyle}
            ref="searchBox"
            onPlacesChanged={this.handlePlacesChanged.bind(this)}
          />

          <KmlLayer
            options={{preserveViewport: true}}
            url={this.state.overlay}
          />



        </GoogleMap>

      } // googleMapElement
    /> 
    <div className="data-area">
      <ClimateZoneLookup
        name="Climate Zone"
        zoneCode={this.state.zone.zoneCode}
        zoneDesc={this.state.zone.zoneDesc}
        setZone={this.handleSetZone}
        style={ClimateZoneLookup.style}
        zoneList={ClimateZoneLookup.zoneList}
        address={this.state.address}
      />
      <ToggleOverlay
        setOverlay={this.handleSetOverlay}>
      </ToggleOverlay>
    </div>
  </div> 
  <BottomText />
  </div>
  
  ); // return
  } // render
} //

export default Mapping;