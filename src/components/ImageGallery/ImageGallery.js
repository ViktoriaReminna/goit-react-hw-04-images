import { GalleryImage } from '../ImageGalleryItem/ImageGalleryItem';

import { ImgGallery, ImageGalleryItem } from './ImageGallery.styled';

export const ImageGallery = ({ data }) => {
  return (
    <div>
      <ImgGallery>
        {data.map(item => (
          <ImageGalleryItem key={item.id}>
            <GalleryImage item={item} />
          </ImageGalleryItem>
        ))}
      </ImgGallery>
    </div>
  );
};
