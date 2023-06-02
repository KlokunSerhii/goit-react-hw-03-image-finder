import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import '../styles.css';

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
    return createPortal(
      <div className="Overlay" onClick={this.handlerBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRood
    );
  }
}

export default Modal;
