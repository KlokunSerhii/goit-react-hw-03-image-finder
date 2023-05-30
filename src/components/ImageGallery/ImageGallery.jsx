import { Component } from 'react';
import { ApiService } from '../services/api';
import ImageGalleryItem from '../ImageGalleryItem';
import '../styles.css';
import Button from '../Button';

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
      Api.resetPage();
      Api.incrementPage();
    }
  }
  onClick = () => {
    const Api = this.state.api;
    Api.fetch().then(({ hits }) =>
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
      }))
    );
    Api.incrementPage();
    console.log(this.state.hits);
    console.log(this.state.api);
  };

  render() {
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem hits={this.state.hits} />
        </ul>
        {this.state.hits.length > 0 && <Button onClick={this.onClick} />}
      </>
    );
  }
}

export default ImageGallery;
