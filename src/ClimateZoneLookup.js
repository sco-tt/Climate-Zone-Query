import {default as React, Component} from 'react';

class ClimateZoneLookup extends Component {
   static style = {
    'position': `absolute`,
    'bottom': `0`,
    'z-index': `9999999999999`
  }

  render() {
    return (
      <div class="climate-zone">
        <h2>{this.props.name}</h2>
        <p> Climate Zone: {this.props.zone}</p>
      </div>
    );
  }
}

export default ClimateZoneLookup