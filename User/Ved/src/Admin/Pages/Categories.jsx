import React, { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";

import Headers from "../component/Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UpdateCategory from "./UpdateCategory";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/SideBar";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); // Track which menu is open
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  console.log(categoryCounts, "cat");
  console.log(selectedCategory, "catselecte");
  console.log(products, "products");
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product/allProduct");
      setProducts(response.data.products);
      groupProductsByCategory(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to group products by category and count
  const groupProductsByCategory = (products) => {
    const counts = products.reduce((acc, product) => {
      const categoryName = product.category.categoryName; // Assuming categoryName is in category object
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName]++;
      return acc;
    }, {});

    setCategoryCounts(counts);
  };
  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/allCategory"); // Replace with actual API URL
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Handle menu toggle
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  // Handle delete
  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/api/category/categories/${categoryId}`); // Replace with actual API URL
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
        alert("Category deleted successfully.");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <>
      <div className="flex bg-[#f8f8f8]">
        <Sidebar />
        <div className="flex-1">
          <Headers />

          <div className="p-4 overflow-y-auto flex-1 h-[calc(100vh-4rem)]">
            <div className="flex flex-row justify-between px-2">
              <h1 className="text-sm md:text-xl font-semibold">
                Product Categories
              </h1>
              <Link
                to="/admin/addCategories"
                className="bg-[#E8AF0F] text-white text-sm md:text-lg p-2 md:px-8 rounded-lg hover:bg-[#EA3805]"
              >
                Add Categories
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-12">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-2xl shadow-lg p-2 flex flex-row items-center gap-4 relative"
                >
                  {/* Image */}
                  <div className="bg-white rounded-2xl items-center">
                    <img
                      src={category.image?.url}
                      alt={category.categoryName}
                      className="w-32 h-32 md:w-32 md:h-32 lg:w-72 lg:h-44 object-cover rounded-lg"
                    />
                    {/* <p className="text-center border border-primary rounded-md text-sm font-medium p-2">
                      Change Banner
                    </p> */}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">
                      {category?.categoryName}
                    </h2>
                    <p className=" text-[10px] md:text-sm text-gray-500">
                      Total Products -{" "}
                      {categoryCounts[category?.categoryName] || 0}{" "}
                    </p>
                    <div className="mt-4 w-full">
                      <button
                        onClick={() =>
                          navigate(`/admin/byCategory/${category._id}`)
                        }
                        className="bg-[#E8AF0F] text-[10px] md:text-lg w-full text-white p-2 rounded-lg hover:bg-[#EA3805]"
                      >
                        View Products
                      </button>
                    </div>
                  </div>

                  {/* Three-Dot Menu */}
                  <div className="relative h-full">
                    <button
                      onClick={() => toggleMenu(category._id)}
                      className="text-black text-xl p-2"
                    >
                      &#x22EE; {/* Vertical three dots */}
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen === category._id && (
                      <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-2 w-32">
                        <button
                          onClick={() => handleUpdateClick(category)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {showUpdateModal && selectedCategory && (
              <UpdateCategory
                category={selectedCategory}
                onClose={() => setShowUpdateModal(false)}
                onCategoryUpdated={fetchCategories}
              />
            )}
            {/* If no categories found */}
            {categories.length === 0 && (
              <p className="text-center text-gray-500">No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
