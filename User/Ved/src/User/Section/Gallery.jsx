import React from 'react';
import img1 from "../Assests/Kalsharp.jpeg";
import img2 from "../Assests/Ganeshpujan.jpeg";
import img3 from "../Assests/Ganeshpujan.jpeg";
import img4 from "../Assests/mataji.jpeg";
import img5 from "../Assests/Kalsharp.jpeg";
import img6 from "../Assests/mataji.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img1, img1, img1, img1, img5, img6];

const Gallery = () => {
  return (
    <div className="items-center px-4 pt-16 md:px-20">
      <div className="bg-cover bg-center">
        <h1 className="text-4xl font-semibold text-center lg:text-start">
          Gallery
        </h1>
      </div>
      <p className="mb-8 mt-2 text-center lg:text-start text-gray-500">
        Hear what our clients have to say about their experiences with us.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-60 object-cover"
            />
            {/* Optional caption or label */}
            {/* <div className="p-4 text-center text-sm text-gray-700 font-medium">Caption</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
