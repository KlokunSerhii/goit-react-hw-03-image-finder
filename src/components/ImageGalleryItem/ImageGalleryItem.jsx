import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItemImg } from './ImageGalleryItem.styled';
class ImageGalleryItem extends Component {
  state = {};

  render() {
    const { largeImageURL, webformatURL, clickHandler } = this.props;
    return (
      <ImageGalleryItemImg
        onClick={() => clickHandler(largeImageURL)}
        src={webformatURL}
        alt="description-info"
      />
    );
  }
}
ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  clickHandler: PropTypes.func,
};
export default ImageGalleryItem;
