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
    
    this.state = {
      center: Mapping.mapCenter,
      markers: [],
      zone: null
    };
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
    console.log('handleWindowResize', this._googleMapComponent);
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
    console.log(address);
     this.setState({
      center: mapCenter,
      markers,
      address
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
          ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
          defaultZoom={7}
          center={this.state.center}
          onClick={this.handleMapClick}>
        
          {this.state.markers.map((marker, index) => {
            return (
              <Marker
              {...marker}
              onRightclick={this.handleMarkerRightclick.bind(this, index)} />
              );
          })}

          <SearchBox
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            placeholder="Customized your placeholder"
            style={SearchBoxModule.inputStyle}
            ref="searchBox"
            onPlacesChanged={this.handlePlacesChanged.bind(this)}
          />

        </GoogleMap>
      } // googleMapElement
    /> 
    <ClimateZoneLookup
      name="Climate Zone"
      zone={this.state.zone}
      style={ClimateZoneLookup.style}
      address={this.state.address}
    />
  </div>
    ); // return
  } // render
} //

export default Mapping;