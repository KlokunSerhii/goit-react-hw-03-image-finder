import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalDiv } from './Modal.styled';

const modalRood = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerEscapeClickev);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerEscapeClickev);
  }
  handlerEscapeClickev = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handlerBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handlerBackdropClick}>
        <ModalDiv>{children}</ModalDiv>
      </Overlay>,
      modalRood
    );
  }
}
Modal.protoType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
