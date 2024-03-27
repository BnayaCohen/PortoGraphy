"use client";
import { useState } from 'react';

type PhotoGalleryProps = {
  images: string[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseFullScreen = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-wrap -mx-4">
      {images.map((image, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
          <div className="relative w-full aspect-w-1 aspect-h-1">
            <img
              src={image}
              alt={`Photo ${index}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              onClick={() => handleImageClick(image)}
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-sm px-2 py-1 shadow-md"
              onClick={() => handleImageClick(image)}
            >
              View
            </button>
          </div>
        </div>
      ))}
      {selectedImage && (
        <FullScreenImage image={selectedImage} onClose={handleCloseFullScreen} />
      )}
    </div>
  );
};

type FullScreenImageProps = {
  image: string;
  onClose: () => void;
};

const FullScreenImage: React.FC<FullScreenImageProps> = ({ image, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="max-w-screen-lg w-full">
        <img
          src={image}
          alt="Full Screen"
          className="w-full h-full object-contain"
        />
        <button
          className="absolute top-4 left-4 bg-white rounded-sm px-3 py-2 shadow-md"
          onClick={onClose}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default PhotoGallery;
