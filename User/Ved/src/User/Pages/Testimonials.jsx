import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Layout from '../Main/Layout/Layout';

const testimonials = [
  {
    name: 'Ramesh Sharma',
    role: 'Delhi',
    feedback: 'Pandit ji performed the Pooja with full devotion. We felt immense peace at home.',
    image: '/testimonials/ramesh.jpg',
  },
  {
    name: 'Meena Joshi',
    role: 'Mumbai',
    feedback: 'Very professional and traditional. Highly recommend for Satyanarayan Katha.',
    image: '/testimonials/meena.jpg',
  },
  {
    name: 'Anil Verma',
    role: 'Bangalore',
    feedback: 'Pooja was done on time, all samagri was arranged by them. Hassle-free.',
    image: '/testimonials/anil.jpg',
  },
  {
    name: 'Sunita Rao',
    role: 'Hyderabad',
    feedback: 'Authentic rituals and proper chanting. Felt blessed.',
    image: '/testimonials/sunita.jpg',
  },
  {
    name: 'Vijay Patel',
    role: 'Ahmedabad',
    feedback: 'Excellent service and knowledgeable pandit ji.',
    image: '/testimonials/vijay.jpg',
  },
];

const Testimonials = () => {
  return (
    <Layout>
    <div className="w-full py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Devotees Say</h2>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center shadow-md flex flex-col items-center w-full h-80">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-20 rounded-full object-cover border-2 border-orange-400 mb-4"
                />
                <p className="text-sm text-gray-700 italic mb-4 line-clamp-4">
                  "{t.feedback}"
                </p>
                <div className="mt-auto text-orange-800 font-semibold">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </Layout>
  );
};

export default Testimonials;
