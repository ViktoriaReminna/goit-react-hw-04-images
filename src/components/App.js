import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toastInfo, toastInputQuery, success } from './Toast/Toast';
import { ColorRing } from 'react-loader-spinner';
import { getImages } from '../service/image-api';
import { SearchBar } from './Searchbar/Searchbar';
import { Wrapper } from './App.styled';
// import { LinkScroll } from './App.styled.js';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Pagination } from './Button/Button';

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
    <Wrapper>
      <SearchBar onSubmit={handleSubmit} />
      {loading && (
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
      {images.length > 0 && <ImageGallery data={images} />}
      {images.length > 0 && (
        <Pagination onClick={handleLoadMore}>Load More</Pagination>
      )}
      <Toaster position="top-right" reverseOrder={true} />
      <div id="content"></div>
    </Wrapper>
  );
};
//   return (
//     <div
//       style={{
//         width: '1240px',
//         padding: '0 20px',
//         margin: '0 auto',
//       }}
//     >
//       <SearchBar onSubmit={handleSubmit} />
//       {loading && (
//         <ColorRing
//           visible={true}
//           height="180"
//           width="180"
//           ariaLabel="blocks-loading"
//           wrapperStyle={{}}
//           wrapperClass="blocks-wrapper"
//           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//         />
//       )}
//       {images.length > 0 && <Gallery imgItems={images} />}
//       {images.length > 0 && (
//         <LinkScroll
//           activeClass="active"
//           to="content"
//           spy={true}
//           smooth={true}
//           offset={8000}
//           duration={7000}
//           delay={1250}
//           isDynamic={true}
//         >
//           <BtnLoadMore onClick={handleLoadMore}>Load More</BtnLoadMore>

//       )}
//       <Toaster position="top-right" reverseOrder={true} />
//       <div id="content"></div>
//     </div>
//   );
// };
