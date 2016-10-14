import {default as React, Component} from 'react';

class ToggleOverlay extends Component {

  componentWillReceiveProps() {
    this.setState({
      preserveViewport: true
    })
  }
  
  _handleClick(event) {
    event.preventDefault()
    this.props.setOverlay(); 
  }

  render() {
    return (
      <button onClick={this._handleClick.bind(this)}>Toggle Overlay</button>
    );    
  }
}

export default ToggleOverlay;