import {default as React, Component} from 'react';
import axios from 'axios';


class ClimateZoneLookup extends Component {
   static style = {
    'color': `red`
  }
  componentDidUpdate() {
    this.geocode();
  }
  geocode() {
    console.log('geocode');
    const queryAddress = this.props.address
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=AIzaSyB8eYNd6em4gm8uLs8updwtSMnwR5X-EQQ`)
      .then((response) => {
        console.log(response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const postion = [lat, lng];
        this.round(postion);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  round(postion) {
      postion.forEach((coord) => {
        console.log(coord);
        let decimal = (coord % 1);
          if (decimal >= 0 && decimal <= 0.5) {
              coord += (0.25 - decimal);
          }
           if (decimal > 0.5 && decimal < 1) {
              coord += (0.75 - decimal);
          }
          if (decimal >= -0.5 && decimal  < 0) {
               coord += (-0.25 - decimal);
           }
          if (decimal > -1.00 && decimal < -0.5) {
              coord += (-0.75 - decimal);
         }
         postion.push(coord);
      });
      console.log(postion);
        
  }

  lookup(coord) {
    const query = "SELECT 'Cls' FROM " +
                 "1GQfBT-PXojUbIZP7_tkILYKNjHaQjYqop9gkosho" +
                 " WHERE 'Lat' = '" + lat + "' AND Lon = '" + lng + "'";

  }

  render() {
    return (
      <div className="climate-zone">
        <h2>{this.props.name}</h2>
        <p> Climate Zone: {this.props.zone}</p>
      </div>
    );
  }
}

export default ClimateZoneLookup