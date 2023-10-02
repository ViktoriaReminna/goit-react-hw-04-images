import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { getImages } from '../service/image-api';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { BtnLoadMore } from './Button/Button';

import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    error: false,
    page: 1,
    hits: null,
    totalHits: null,
    showModal: false,
    modalData: {
      bigImg: '',
      alt: '',
    },
  };

  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetch();
    }
  }

  fetch = async () => {
    const { query, page } = this.state;
    try {
      if (!query) {
        console.log(this.state.query);
        return;
      }

      this.setState({ isLoading: true });
      const result = await getImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...result.hits],
        isLoading: false,
        hits: result.total,
        totalHits: result.totalHits,
      }));
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = evt => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (evt.target.nodeName !== 'IMG') {
      console.log('Image clicked');
      return;
    }
    this.setState({
      modalData: {
        bigImg: evt.target.dataset.src,
        alt: evt.target.getAttribute('alt'),
      },
    });
  };
  resetModal = () => {
    this.setState({
      showModal: false,
      modalData: {
        bigImg: '',
        alt: '',
      },
    });
  };
  render() {
    const { images, isLoading, hits, totalHits, showModal, modalData } =
      this.state;
    const { bigImg, alt } = modalData;
    return (
      <div
        style={{
          width: '1240px',
          padding: '0 20px',
          margin: '0 auto',
        }}
      >
        <SearchBar onSubmit={this.changeQuery} />
        {images.length === 0 && !isLoading && (
          <p
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: '75px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#87a9c7',
            }}
          >
            There`re no images yet. Please enter the search category!
          </p>
        )}
        {images.length !== 0 && (
          <>
            <ImageGallery data={images} onClick={this.toggleModal} />{' '}
          </>
        )}
        {hits >= 12 && images.length !== totalHits && !isLoading && (
          <BtnLoadMore click={this.handleLoadMore} />
        )}

        {isLoading && (
          <ColorRing
            visible={true}
            height="180"
            width="180"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {showModal && (
          <Modal src={bigImg} alt={alt} onClose={this.resetModal} />
        )}
      </div>
    );
  }
}
