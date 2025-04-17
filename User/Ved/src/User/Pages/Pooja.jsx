import React from 'react';
import PagesBanners from '../Component/PageBannerComponent';
import Layout from '../Main/Layout/Layout';

const poojaList = [
  {
    title: "Satyanarayan Pooja",
    description: "Shubh avsar par Satyanarayan katha aur pooja.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMVJodFaZLYWQXhvKczuwgIh79nTDo0dFmKA&s",
  },
  {
    title: "Griha Pravesh Pooja",
    description: "Naye ghar mein shubh pravesh ke liye pooja.",
    image: "https://www.organisemypuja.com.au/wp-content/uploads/Griha-Pravesh.jpg",
  },
  {
    title: "Kundli Pooja",
    description: "Bachpan ka pehla sanskar pooja ke saath.",
    image: "https://images.news18.com/webstories/2023/08/pooja-path-8.png",
  },
  {
    title: "Navgraha Shanti Pooja",
    description: "Grah dosh nivaran ke liye visesh pooja.",
    image: "https://images.news18.com/webstories/2023/08/pooja-path-10.png",
  },
  {
    title: "Rudrabhishek Pooja",
    description: "Lord Shiva ki kripa paane ke liye.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L_usE4nO3kw1_nk-k8bFbLaCafRFZSMA0GJU9OxF0fmZqxciR2qIe0yd8JkQ4SQA3Bk&usqp=CAU",
  },
  {
    title: "Satyanarayan Pooja",
    description: "Shubh avsar par Satyanarayan katha aur pooja.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9wKnc4nxr09TkOTwBfLpUpXIv8s6vF3yUZ6j8Z-DBF_uDgwRNDtA9h4vh6e1LgiJIIc&usqp=CAU",
  },
];

const Pooja = () => {
  return (
    <Layout>
      <PagesBanners title="POOJAN" />
    <div className="bg-orange-50 min-h-screen p-6 md:p-10 text-red-900">
      <h1 className="text-3xl font-bold text-center mb-10 text-red-800 italic">Book Your Online Pooja</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {poojaList.map((pooja, index) => (
          <div
            key={index}
            className="bg-white border border-red-200 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={pooja.image}
              alt={pooja.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-red-700 mb-2">{pooja.title}</h2>
              <p className="text-sm mb-4">{pooja.description}</p>
              <button className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded hover:opacity-90">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Pooja;
