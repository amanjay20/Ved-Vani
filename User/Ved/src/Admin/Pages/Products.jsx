/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Sidebar from "../component/Sidebar";
import Sidebar from "../component/SideBar";
import Headers from "../component/Header";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/allProduct`);
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  console.log(products, "products");

  const handleUpdate = (productId) => {
    console.log("Update product:", productId);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this products?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/api/product/delete/${productId}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="flex bg-[#F8F8F8]">
      <Sidebar />
      <div className="flex-1">
        <Headers />
        <div className="container mx-auto p-4 overflow-y-auto flex-1 h-[calc(100vh-4rem)]">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <Link to='/admin/addproducts'>
              <button className="bg-green-500 text-base/5 text-white lg:px-3 py-1 rounded-lg hover:bg-green-600 ">
                Add Product
              </button>
            </Link>
          </div>
          <div className="p-4 rounded-lg">
            <div className="hidden md:block overflow-x-auto">
              {loading ? (
                <p className="text-center mt-4">Loading products...</p>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-5 lg:py-12">
                  {products.map((product, index) => (
                    <div key={product._id} className="bg-white rounded-2xl shadow-lg">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.productName}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="flex justify-between">
                        <div className="px-4 py-2 space-y-1">
                          <h2 className="text-lg font-semibold">{product.productName}</h2>
                          {/* <p className="text-sm text-gray-600">Price: ₹{product.productmrpunit[0]?.productmrp}</p> */}
                          <p className="text-sm text-gray-600">Category: {product?.category?.categoryName || "N/A"}</p>
                          <p className="text-sm text-gray-600">Subcategory: {product?.subcategoryId?.title || "N/A"}</p>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition duration-200"
                          >
                            ⋮
                          </button>
                          {dropdownIndex === index && (
                            <div className="absolute bottom-10 right-1 ml-2 transform -translate-y-1/2 bg-white border shadow-lg rounded-md w-36 z-50">
                              <Link to={`/admin/AddFaqToProduct/${product._id}`} className="block w-full text-left px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                                Add Faq
                              </Link>
                              <Link to={`/admin/addBenefitToProduct/${product._id}`} className="block w-full text-left px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                                Add Benefit
                              </Link>
                              <Link to={`/admin/updateproducts/${product._id}`} className="block w-full text-left px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                                Update
                              </Link>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white transition duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-4">No products found.</p>
              )}
            </div>

            <div className="md:hidden space-y-4">
              {products.map((product, index) => (
                <div key={product._id} className="p-4 border rounded-lg shadow">
                  <p className="font-semibold">Product Name: <span className="font-normal">{product.productName}</span></p>
                  {/* <p className="font-semibold">Price: <span className="font-normal">₹{product.productmrpunit[0]?.productmrp}</span></p> */}
                  <p className="font-semibold">Category: <span className="font-normal">{product?.category?.categoryName || "N/A"}</span></p>
                  <p className="font-semibold">Subcategory: <span className="font-normal">{product?.subcategoryId?.title || "N/A"}</span></p>
                  <div className="flex items-center space-x-4 mt-2">
                    <img src={product.images?.[0]?.url} alt="Product" className="w-16 h-16 object-cover rounded" />
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)}
                      className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded text-center"
                    >
                      Actions
                    </button>
                    {dropdownIndex === index && (
                      <div className="mt-2 bg-white border shadow-lg rounded-md">
                        <Link to={`/admin/AddFaqToProduct/${product._id}`} className="block px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                          Add Faq
                        </Link>
                        <Link to={`/admin/addBenefitToProduct/${product._id}`} className="block px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                          Add Benefit
                        </Link>
                        <Link to={`/admin/updateproducts/${product._id}`} className="block px-4 py-2 text-black-600 hover:bg-blue-500 hover:text-white transition duration-200">
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
