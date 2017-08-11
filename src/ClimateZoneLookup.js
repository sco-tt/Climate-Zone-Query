import {default as React, Component} from 'react';
import axios from 'axios';


class ClimateZoneLookup extends Component {

  static style = {
    'color': `red`
  }

  static zoneList = {
    'Af': `Tropical rainforest`,
    'Am': `Tropical monsoon`,
    'Aw': `Tropical wet and dry or savanna`,
    'As': `Tropical wet and dry or savanna ('summer' dry season)`,
    'BWh': `Subtropical desert`,
    'BSh': `Subtropical steppe`,
    'BWk': `Mid-latitude desert`,
    'BSk': `Mid-latitude steppe`,
    'Csa': `Mediterranean, hot summer`,
    'Csb': `Mediterranean, warm summer`,
    'Cfa': `Humid subtropical, no dry season`,
    'Cwa': `Humid subtropical, dry winter`,
    'Cwb': `Temperate highland tropical climate with dry winters`,
    'Cwc': `Temperate highland tropical climate with dry winters`,
    'Cfb': `Marine west coast, warm summer`,
    'Cfc': `Marine west coast, cool summer`,
    'Dfa': `Humid continental, no dry season, hot summer`,
    'Dfb': `Humid continental, no dry season, warm summer`,
    'Dwa': `Humid continental, severe dry winter, hot summer`,
    'Dwb': `Humid continental, severe dry winter, warm summer`,
    'Dsb': `Humid continental, dry warm summer`,
    'Dfc': `Subartic, severe winter, no dry season, cool summer`,
    'Dfd': `Subartic, severe very cold winter, no dry season, cool summer`,
    'Dwc': `Subartic, dry winter, cool summer`,
    'Dsc': `Subartic, subalpine`,
    'Dwd': `Subartic, very cold and dry winter, cool summer`,
    'ET': `Tundra`,
    'EF': `Ice Cap`
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.geocode(nextProps.address)
    }
  }

  geocode(address) {
    const queryAddress = address;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=AIzaSyB8eYNd6em4gm8uLs8updwtSMnwR5X-EQQ`)
      .then((response) => {
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
    const url = `http://climateapi.scottpinkelman.com/api/v1/location/${postion.rounded[0]}/${postion.rounded[1]}`

    axios.get(url)
      .then((response) => {
        const tempZone = response.data.rows[0].toString();
        const tempDesc = this.props.zoneList[tempZone]
        this.props.setZone(tempZone, tempDesc); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const zoneCodeResult = this.props.zoneCode === null ? 'Climate Zone Code' : this.props.zoneCode;
    const zoneDescResult = this.props.zoneDesc === null ? 'Climate Zone Description' : this.props.zoneDesc; 
    const zondeCodeResultClass = this.props.zoneCode === null ? 'hidden' : ''; 
    const zondeDescResultClass = this.props.zoneCode === null ? 'hidden' : ''; 
    return (
      <div className="climate-zone">
        <h2 className="climate-zone__title">{this.props.name}</h2>
        <div className="climate-zone__result">
          <div className="climate-zone__result-label">Climate Zone</div>
          <div className={zondeCodeResultClass}>{zoneCodeResult}</div>
        </div>
        <div className="climate-zone__result">
          <div className="climate-zone__result-label">Climate Zone Description</div>
          <div className={zondeDescResultClass}>{zoneDescResult}</div>
        </div>
      </div>
    );
  }

}

export default ClimateZoneLookup