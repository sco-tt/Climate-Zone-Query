import {default as React, Component} from 'react';

class ToggleOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = {checked: false};
    this._handleCheckboxChange = this._handleCheckboxChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      preserveViewport: true
    })
  }
  
  _handleCheckboxChange(event) {
    event.preventDefault()
    this.props.setOverlay(); 
    
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    return (
      // <button onClick={this._handleClick.bind(this)} className={"toggle-button"}>Toggle Overlay</button>
      <div>
        <input 
        type="checkbox" 
        label="Toggle Climate Zone Overlay" 
        id="toggle-checkbox"
        checked={this.state.checked}
        onChange={this._handleCheckboxChange}
        />
        <div>Toggle Climate Zone overlay</div>
      </div>
    );    
  }
}

export default ToggleOverlay;