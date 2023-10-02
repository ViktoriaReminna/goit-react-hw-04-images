import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import { Ul } from './ImageGallery.styled.js';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <Ul>
      {data.map(img => {
        return (
          <ImageGalleryItem
            img={img.webformatURL}
            alt={img.tags}
            largeImageURL={img.largeImageURL}
            key={nanoid(4)}
            onClick={onClick}
          />
        );
      })}{' '}
    </Ul>
  );
};
