import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryUl, ImageGalleryItemLi } from './ImageGallery.styled';
import Modal from '../Modal';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    selectedPicture: null,
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
    const { hits } = this.props;
    const { showModal, selectedPicture } = this.state;
    return (
      <>
        <ImageGalleryUl>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItemLi key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                clickHandler={this.selectPicture}
              />
            </ImageGalleryItemLi>
          ))}
        </ImageGalleryUl>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedPicture} alt={'pic preview'} />
          </Modal>
        )}
      </>
    );
  }
}
ImageGallery.protoType = {
  searchQuery: PropTypes.string,
};
export default ImageGallery;
