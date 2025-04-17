import React, { useState } from 'react';
import PagesBanners from '../Component/PageBannerComponent';
import Layout from '../Main/Layout/Layout';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Ruby Gemstone',
      category: 'gemstone',
      originalPrice: 55.55,
      image: 'https://cdn.dhanshreegems.com/wysiwyg/gemstones/23.png',
    },
    {
      id: 2,
      name: 'Emerald Gemstone',
      category: 'gemstone',
      originalPrice: 70,
      image: 'https://gemmines.in/wp-content/uploads/2022/10/brazillian-emerald.jpg',
    },
    {
      id: 3,
      name: 'Rudraksha Mala',
      category: 'rudraksha',
      originalPrice: 20,
      image: 'https://m.media-amazon.com/images/I/815Ynn0E9wL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 4,
      name: 'Rudraksha Bracelet',
      category: 'rudraksha',
      originalPrice: 15,
      image: 'https://www.siddhayogabookstore.org.in/wp-content/uploads/Rudraksha-Stretchable-Bracelet-01-600x600.jpg',
    },
    {
      id: 5,
      name: 'Gold Plated Ganesh Pendant',
      category: 'jewelry',
      originalPrice: 120,
      image: 'https://akshatsapphire.com/cdn/shop/products/PS7131-Gold-1.png?v=1743749192',
    },
    {
      id: 6,
      name: 'Silver Pooja Thali Set',
      category: 'jewelry',
      originalPrice: 80,
      image: 'https://www.goldgiftideas.com/wp-content/uploads/2021/01/silver-antiq-pooja-set-500x500-1.jpg',
    },
    {
      id: 7,
      name: 'Amethyst Gemstone',
      category: 'gemstone',
      originalPrice: 60,
      image: 'https://www.jewelsforme.com/images/articles/amethyst.webp',
    },
    {
      id: 8,
      name: 'Sphatik Rudraksha',
      category: 'rudraksha',
      originalPrice: 35,
      image: 'https://www.namoastro.com/blog/wp-content/uploads/2023/03/514d2dGIBdL.jpg',
    },
    {
      id: 9,
      name: 'Diamond Necklace',
      category: 'jewelry',
      originalPrice: 500,
      image: 'https://m.media-amazon.com/images/I/51Qje4NgLFL._AC_UY1100_.jpg',
    },
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (filter === 'all' || product.category === filter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Layout>
      <PagesBanners title="PRODUCT" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-orange-100 to-orange-200 max-w-screen-xl mx-auto overflow-x-hidden">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full max-w-md p-3 border rounded-lg bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {['all', 'gemstone', 'rudraksha', 'jewelry'].map((type) => (
            <button
              key={type}
              className={`py-2 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg ${
                filter === type ? 'bg-blue-700' : ''
              }`}
              onClick={() => setFilter(type)}
            >
              {type === 'all' ? 'All Products' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const discountedPrice = (product.originalPrice * 0.9).toFixed(2);
            return (
              <div
                key={product.id}
                className="bg-white border rounded-xl shadow-sm p-4 relative hover:shadow-md transition-all"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  10% OFF
                </div>

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4 rounded-md"
                />

                {/* Info */}
                <h3 className="text-md font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>

                {/* Pricing */}
                <div className="mt-2">
                  <p className="line-through text-gray-400 text-sm">
                    ₹ {product.originalPrice.toFixed(2)}
                  </p>
                  <p className="text-red-600 font-bold text-lg">₹ {discountedPrice}</p>
                  <p className="text-xs text-gray-500">(0) 0 Comments</p>
                </div>

                {/* Button */}
                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
