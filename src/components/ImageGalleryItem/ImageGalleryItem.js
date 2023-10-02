import { Li } from './ImageGaleryItem.styled';

export const ImageGalleryItem = ({ img, alt, onClick, largeImageURL }) => {
  return (
    <Li>
      <img src={img} alt={alt} data-src={largeImageURL} onClick={onClick} />
    </Li>
  );
};
