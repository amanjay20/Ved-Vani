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
      price: '$50',
      image: 'https://cdn.dhanshreegems.com/wysiwyg/gemstones/23.png',
    },
    {
      id: 2,
      name: 'Emerald Gemstone',
      category: 'gemstone',
      price: '$70',
      image: 'https://gemmines.in/wp-content/uploads/2022/10/brazillian-emerald.jpg',
    },
    {
      id: 3,
      name: 'Rudraksha Mala',
      category: 'rudraksha',
      price: '$20',
      image: 'https://m.media-amazon.com/images/I/815Ynn0E9wL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 4,
      name: 'Rudraksha Bracelet',
      category: 'rudraksha',
      price: '$15',
      image: 'https://www.siddhayogabookstore.org.in/wp-content/uploads/Rudraksha-Stretchable-Bracelet-01-600x600.jpg',
    },
    {
      id: 5,
      name: 'Gold Plated Ganesh Pendant',
      category: 'jewelry',
      price: '$120',
      image: 'https://akshatsapphire.com/cdn/shop/products/PS7131-Gold-1.png?v=1743749192',
    },
    {
      id: 6,
      name: 'Silver Pooja Thali Set',
      category: 'jewelry',
      price: '$80',
      image: 'https://www.goldgiftideas.com/wp-content/uploads/2021/01/silver-antiq-pooja-set-500x500-1.jpg',
    },
    {
      id: 7,
      name: 'Amethyst Gemstone',
      category: 'gemstone',
      price: '$60',
      image: 'https://www.jewelsforme.com/images/articles/amethyst.webp',
    },
    {
      id: 8,
      name: 'Sphatik Rudraksha',
      category: 'rudraksha',
      price: '$35',
      image: 'https://www.namoastro.com/blog/wp-content/uploads/2023/03/514d2dGIBdL.jpg',
    },
    {
      id: 9,
      name: 'Diamond Necklace',
      category: 'jewelry',
      price: '$500',
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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 max-w-screen-xl mx-auto overflow-x-hidden">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full max-w-md p-3 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className={`py-2 px-6 bg-blue-500 text-white rounded-lg ${filter === 'all' ? 'bg-blue-700' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Products
          </button>
          <button
            className={`py-2 px-6 bg-green-500 text-white rounded-lg ${filter === 'gemstone' ? 'bg-green-700' : ''}`}
            onClick={() => setFilter('gemstone')}
          >
            Gemstone
          </button>
          <button
            className={`py-2 px-6 bg-yellow-500 text-white rounded-lg ${filter === 'rudraksha' ? 'bg-yellow-700' : ''}`}
            onClick={() => setFilter('rudraksha')}
          >
            Rudraksha
          </button>
          <button
            className={`py-2 px-6 bg-purple-500 text-white rounded-lg ${filter === 'jewelry' ? 'bg-purple-700' : ''}`}
            onClick={() => setFilter('jewelry')}
          >
            Jewelry
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl max-w-full"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{product.category}</p>
              <p className="mt-2 text-xl font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
