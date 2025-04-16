import React from 'react';
import img1 from "../Assests/Kalsharp.jpeg";
import img2 from "../Assests/Ganeshpujan.jpeg";
import img3 from "../Assests/Ganeshpujan.jpeg";
import img4 from "../Assests/mataji.jpeg";

import img5 from "../Assests/Kalsharp.jpeg";
import img6 from "../Assests/mataji.jpeg";

const Gallery = () => {
  return (
    <>
      <div className="items-center px-4 pt-16 md:px-20">
        <div className="bg-cover bg-center">
          <h1 className="text-4xl font-semibold text-center lg:text-start ">
            Gallery
          </h1>
        </div>
        <p className="mb-8 mt-2 text-center lg:text-start text-gray-500">
          Hear what our clients have to say about their experiences with us.
        </p>

        {/* Grid layout for images */}




        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="grid gap-4">
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img1} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img2} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img3} alt="" />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img4} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img5} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img6} alt="" />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img1} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img1} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img1} alt="" />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img1} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img5} alt="" />
            </div>
            <div>
              <img class="h-auto max-w-full rounded-lg" src={img6} alt="" />
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default Gallery;


