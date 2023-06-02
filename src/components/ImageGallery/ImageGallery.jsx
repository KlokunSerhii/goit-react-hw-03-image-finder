import { Component } from 'react';
import { ApiService } from '../services/api';
import ImageGalleryItem from '../ImageGalleryItem';
import '../styles.css';
import Button from '../Button';
import Modal from '../Modal';

export class ImageGallery extends Component {
  state = {
    hits: [],
    api: null,
    totalHits: '',
    showModal: false,
    selectedPicture: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const Api = new ApiService(this.props.searchQuery);
      await this.setState({ api: Api });
      Api.fetch().then(({ hits, totalHits }) =>
        this.setState({ hits: hits, totalHits: totalHits })
      );
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
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectPicture = link => {
    this.setState({ selectedPicture: link });
    this.toggleModal();
  };

  render() {
    const { hits, totalHits, showModal, selectedPicture } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                clickHandler={this.selectPicture}
              />
            </li>
          ))}
        </ul>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedPicture} alt={'pic preview'} />
          </Modal>
        )}

        {hits.length > 0 && hits.length - 1 < totalHits && (
          <Button onClick={this.onClick} />
        )}
      </>
    );
  }
}

export default ImageGallery;
