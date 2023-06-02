import '../styles.css';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {};

  render() {
    return (
      <img
        className="ImageGalleryItem-image"
        onClick={() => this.props.clickHandler(this.props.largeImageURL)}
        src={this.props.webformatURL}
        alt="description-info"
      />
    );
  }
}
export default ImageGalleryItem;
