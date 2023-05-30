import { Component } from 'react';
import { ApiService } from '../services/api';
import ImageGalleryItem from './ImageGallery';
import '../styles.css';

export class ImageGallery extends Component {
  state = {
    hits: [],
    api: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const Api = new ApiService(this.props.searchQuery);
      this.setState({ api: Api });
      Api.fetch().then(({ hits }) => this.setState({ hits: hits }));
    }
  }

  render() {
    return (
      <ul className="ImageGallery">
        <ImageGalleryItem hits={this.state.hits} />
      </ul>
    );
  }
}

export default ImageGallery;
