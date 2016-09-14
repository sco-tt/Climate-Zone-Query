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
        const postion = {
          raw: [lat, lng],
          rounded: []
        };
        this.round(postion);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  round(postion) {
      postion.raw.forEach((coord) => {
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
         postion.rounded.push(coord);
      });
      this.lookup(postion);
        
  }

  lookup(postion) {
    const query = `SELECT 'Cls' FROM 1GQfBT-PXojUbIZP7_tkILYKNjHaQjYqop9gkosho 
                   WHERE 'Lat' = ${postion.rounded[0]} 
                   AND 'Lon' = ${postion.rounded[1]}`;
    const encodedQuery = encodeURIComponent(query);

    const url = ["https://www.googleapis.com/fusiontables/v1/query"];
    url.push("?sql=" + encodedQuery);
    url.push("&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ");

    axios.get(url.join(''))
      .then((response) => {
        const tempZone = response.data.rows[0].toString();
        this.props.setZone(tempZone);
      })
      .catch((error) => {
        console.log(error);
      });
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