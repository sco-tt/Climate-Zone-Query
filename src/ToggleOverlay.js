import {default as React, Component} from 'react';

class ToggleOverlay extends Component {
  
  constructor(props) {
    super(props);
    this.state = {isChecked: false};
    this.onChange = this.onChange.bind(this);
  }
  
  onChange() {
    this.setState({isChecked: !this.state.isChecked});
    this.props.setOverlay();
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        Toggle Overlay
      </label>
    );
  }
  
}

export default ToggleOverlay;