import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toastInfo, toastInputQuery, success } from './Toast/Toast';
import { ColorRing } from 'react-loader-spinner';
import { getImages } from '../service/image-api';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') return;
    const loadImage = async () => {
      try {
        setLoading(true);
        const img = await getImages(query, page);
        if (img.length) {
          setImages(prevState => (page > 1 ? [...prevState, ...img] : img));
          success(query);
          setLoading(false);
        } else {
          toastInfo();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [page, query]);

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === '') {
      toastInputQuery();
      return;
    }

    changeQuery(event.target.elements.query.value);

    event.target.reset();
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div
      style={{
        width: '1240px',
        padding: '0 20px',
        margin: '0 auto',
      }}
    >
      <SearchBar onSubmit={handleSubmit} />
      {loading && (
        <div className="spinner-container">
          <ColorRing
            visible={true}
            height="180"
            width="180"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
      {images.length > 0 && <ImageGallery data={images} />}
      {images.length > 0 && (
        <BtnLoadMore onClick={handleLoadMore}>Load More</BtnLoadMore>
      )}
      <Toaster position="top-right" reverseOrder={true} />
      <div id="content"></div>
    </div>
  );
};
