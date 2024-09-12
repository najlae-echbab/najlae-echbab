import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Image {
  original: string;
  thumbnail: string;
  description?: string;
}

type Props = {
  images?: Image[];
};

const CustomImageGallery: React.FC<Props> = ({ images }) => {
  return images && images.length > 0 ? (
    <ImageGallery showNav={false} items={images} />
  ) : null;
};
export default CustomImageGallery;
