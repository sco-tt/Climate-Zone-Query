import {default as React, Component} from 'react';

class ClimateZoneLookup extends Component {
   static style = {
    'color': `red`
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.geocode();
  }
  geocode() {
    console.log('geocode');
    console.log(this.props);
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