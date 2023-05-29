import { Component } from 'react';
import { ApiService } from '../services/api';
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
        {this.state.hits.map(({ id, webformatURL, tags }) => (
          <li key={id} className="ImageGalleryItem">
            <img
              className="ImageGalleryItem-image"
              src={webformatURL}
              alt={tags}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
