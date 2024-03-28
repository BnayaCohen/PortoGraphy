"use client";
import { useState, useEffect } from 'react';
import ImgContainer from "./ImgContainer";
import { ArrowLeft } from "lucide-react";
// import { addBlurredDataUrls } from "@/lib/getBase64";

type PhotoGalleryProps = {
  images: string[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryReady, setGalleryReady] = useState<boolean>(true);

  useEffect(() => {
    const imagesToLoad = images.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    let loadedCount = 0;

    const checkLoadedCount = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setGalleryReady(true);
      }
    };

    imagesToLoad.forEach((img) => {
      img.onload = checkLoadedCount;
    });

    return () => {
      imagesToLoad.forEach((img) => {
        img.onload = null;
      });
    };
  }, [images]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseFullScreen = () => {
    setSelectedImage(null);
  };
// `w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 ${galleryReady ? '' : 'hidden'}`     px-1 my-3 gap-1 grid grid-cols-gallery auto-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  return (
    <>
      {!galleryReady && (
        <div className="text-center">Loading...</div>
      )}
      <div className={'w-fit mx-auto columns-1 gap-x-[3px] sm:columns-2 md:columns-3 lg:columns-4'} >
        {images.map((image, index) => (
          <div  onClick={() => handleImageClick(image)}>
            <ImgContainer key={index} photo={{ src: { large: image }, height: 300, width: 250, url: image, blurDataURL: "" }} />
          </div>
          // <div key={index} className="relative cursor-pointer aspect-w-1 aspect-h-1">
          //   <img
          //     src={image}
          //     alt={`Photo ${index}`}
          //     className="absolute inset-0 w-full h-full object-cover rounded-lg"
          //     onClick={() => handleImageClick(image)}
          //   />
          //   <button
          //     className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md"
          //     onClick={() => handleImageClick(image)}
          //   >
          //     View
          //   </button>
          // </div>
        
        ))}
        {selectedImage && (
          <FullScreenImage image={selectedImage} onClose={handleCloseFullScreen} />
        )}
      </div>
    </>
  );
};

type FullScreenImageProps = {
  image: string;
  onClose: () => void;
};

const FullScreenImage: React.FC<FullScreenImageProps> = ({ image, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="max-w-screen-lg w-full">
        <img
          src={image}
          alt="Full Screen"
          className="w-full h-full object-contain"
          
        />
        {/* <button
          className="absolute top-8 left-10 bg-white rounded-full px-3 py-2 shadow-md"
          onClick={onClose}
        >
						<ArrowLeft className="w-6 h-6 " />
        </button> */}
      </div>
    </div>
  );
};

export default PhotoGallery;
