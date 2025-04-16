import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../Assests/logo/logo.png'
import img2 from '../Assests/Banner.webp'

const BannerSection = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
      };
      // You can use multiple images here. For now, we're repeating the same image
  const images = [img1, img2, img1, img1, img1];
  return (
    <div className="relative  w-full p-1 md:p-6 md:px-8 ">
         <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-40 md:h-96 overflow-hidden rounded-3xl">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default BannerSection