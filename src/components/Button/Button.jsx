import { Component } from 'react';
import { LoadMore, ContainerButton } from './Button.styled';
import PropTypes from 'prop-types';
class Button extends Component {
  onClick = () => {
    this.props.onClick();
  };
  render() {
    return (
      <ContainerButton>
        <LoadMore type="button" onClick={this.onClick}>
          Load more
        </LoadMore>
      </ContainerButton>
    );
  }
}
export default Button;

Button.protoType = {
  onClick: PropTypes.func,
};
