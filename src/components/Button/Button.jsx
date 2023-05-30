import { Component } from 'react';
import '../styles.css';

class Button extends Component {
  state = {};

  onClick = () => {
    this.props.onClick();
  };
  render() {
    return (
      <div className="ContainerButton">
        <button type="button" className="Button" onClick={this.onClick}>
          Load more
        </button>
      </div>
    );
  }
}
export default Button;
