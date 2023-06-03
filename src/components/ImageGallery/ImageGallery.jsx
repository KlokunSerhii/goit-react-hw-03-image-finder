import { Component } from 'react';
import PropTypes from 'prop-types';
import { Dna } from 'react-loader-spinner';
import { ApiService } from '../services/api';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import {
  ImageGalleryUl,
  ImageGalleryItemLi,
  Spiner,
} from './ImageGallery.styled';

const statusCode = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
};

export class ImageGallery extends Component {
  state = {
    hits: [],
    api: null,
    totalHits: '',
    showModal: false,
    selectedPicture: null,
    status: statusCode.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevProps.searchQuery !== this.props.searchQuery) {
        const Api = new ApiService(this.props.searchQuery);
        await this.setState({ api: Api, status: statusCode.PENDING });
        Api.fetch().then(({ hits, totalHits }) =>
          this.setState({
            hits: hits,
            totalHits: totalHits,
            status: statusCode.RESOLVED,
          })
        );
        Api.resetPage();
        Api.incrementPage();
      }
    } catch {
      this.setState({ status: statusCode.ERROR });
    }
  }

  onClick = () => {
    const Api = this.state.api;
    Api.fetch()
      .then(({ hits }) =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          status: statusCode.RESOLVED,
        }))
      )
      .catch(error => {});
    Api.incrementPage(this.setState({ status: statusCode.ERROR }));
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
    const { hits, totalHits, showModal, selectedPicture, status } = this.state;
    return (
      <>
        {status === statusCode.RESOLVED && (
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
        )}
        {status === statusCode.PENDING && (
          <Spiner>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </Spiner>
        )}

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
ImageGallery.protoType = {
  searchQuery: PropTypes.string,
};
export default ImageGallery;
