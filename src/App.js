import {default as React, Component} from 'react';
import {default as update} from 'react-addons-update';
import {default as canUseDOM} from 'can-use-dom';
import {default as _} from 'lodash';  
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from 'react-google-maps';
import {triggerEvent} from 'react-google-maps/lib/utils';
import SearchBoxModule from './SearchBoxModule.js';
import ClimateZoneLookup from './ClimateZoneLookup.js';



class Mapping extends Component {

  static mapCenter = {
    lat: 47.6205588,
    lng: -122.3212725,
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
      }
    };

    this.handleSetZone = this.handleSetZone.bind(this);

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

  handleWindowResize () {
    triggerEvent(this._googleMapComponent, 'resize');
  }

  /**
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick (event) {
    var {markers} = this.state;
    markers = update(markers, {
      $push: [
      {
        position: event.latLng,
        defaultAnimation: 2,
                  key: Date.now() // Add a key property for: http://fb.me/react-warning-keys
                },
                ],
              });
    this.setState({ markers });

    if (3 === markers.length) {
      this.props.toast(
        'Right click on the marker to remove it',
        'Also check the code!'
        );
    }
  }

  handleMarkerRightclick (index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
     var {markers} = this.state;
     markers = update(markers, {
      $splice: [
      [index, 1]
      ],
    });
     this.setState({ markers });
   }

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
      address
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

  render () {
    return (
      <div>
     <GoogleMapLoader
       containerElement={
        <div
        {...this.props}
        style={{
          height: '400px',
          width: '100%'
        }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => (this._googleMapComponent = map)}
          defaultZoom={7}
          center={this.state.center}
          onClick={this.handleMapClick}
          mapTypeId={'terrain'}>

        
          {this.state.markers.map((marker, index) => {
            return (
              <Marker
              {...marker}
              onRightclick={this.handleMarkerRightclick.bind(this, index)} />
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

        </GoogleMap>
      } // googleMapElement
    /> 
    <ClimateZoneLookup
      name="Climate Zone"
      zoneCode={this.state.zone.zoneCode}
      zoneDesc={this.state.zone.zoneDesc}
      setZone={this.handleSetZone} 
      style={ClimateZoneLookup.style}
      zoneList={ClimateZoneLookup.zoneList}
      address={this.state.address}
    />
  </div>
    ); // return
  } // render
} //

export default Mapping;