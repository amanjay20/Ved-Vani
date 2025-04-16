/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Headers from "../component/Header";
import Sidebar from "../component/SideBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import UpdateSubCategory from "./UpdateSubCategory"; // create this component like UpdateCategory

const SubCategories = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category/allCategory");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("/api/category/allsubCategory");
      setSubCategories(res.data);
      setFilteredSubCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleUpdateClick = (subcategory) => {
    setSelectedSubCategory(subcategory);
    setShowUpdateModal(true);
  };

  const handleDelete = async (subCatId) => {
    const confirmDelete = window.confirm("Delete this subcategory?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/subcategory/${subCatId}`);
        const updated = subcategories.filter((sub) => sub._id !== subCatId);
        setSubCategories(updated);
        applyFilter(selectedCategory, updated);
        alert("Subcategory deleted");
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    applyFilter(selected, subcategories);
  };

  const applyFilter = (categoryId, allSubcategories) => {
    if (categoryId === "All") {
      setFilteredSubCategories(allSubcategories);
    } else {
      const filtered = allSubcategories.filter(
        (sub) => sub.categoryId?._id === categoryId
      );
      setFilteredSubCategories(filtered);
    }
  };

  return (
    <div className="flex bg-[#f8f8f8]">
      <Sidebar />
      <div className="flex-1">
        <Headers />
        <div className="p-4 overflow-y-auto flex-1 h-[calc(100vh-4rem)]">
          {/* Top Header and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
            <h1 className="text-sm md:text-xl font-semibold">Sub Categories</h1>
            <div className="flex gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={handleFilterChange}
                className="border rounded-md p-2 text-sm"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              {/* Add Button */}
              <Link
                to="/admin/addSubCategory"
                className="bg-[#E8AF0F] text-white text-sm md:text-lg p-2 md:px-8 rounded-lg hover:bg-[#EA3805]"
              >
                Add SubCategory
              </Link>
            </div>
          </div>

          {/* SubCategory Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-12">
            {filteredSubCategories.map((sub) => (
              <div
                key={sub._id}
                className="bg-white rounded-2xl shadow-lg p-2 flex flex-row items-center gap-4 relative"
              >
                {/* Image */}
                <div className="bg-white rounded-2xl items-center">
                  <img
                    src={sub.image?.url}
                    alt={sub.title}
                    className="w-32 h-32 md:w-32 md:h-32 lg:w-72 lg:h-44 object-cover rounded-lg"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{sub.title}</h2>
                  <p className="text-sm text-gray-500">
                    Category: {sub.categoryId?.categoryName || "N/A"}
                  </p>
                </div>

                {/* Three Dot Menu */}
                <div className="relative h-full">
                  <button
                    onClick={() => toggleMenu(sub._id)}
                    className="text-black text-xl p-2"
                  >
                    &#x22EE;
                  </button>

                  {menuOpen === sub._id && (
                    <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-2 w-32">
                      <button
                        onClick={() => handleUpdateClick(sub)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id)}
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

          {/* Update Modal */}
          {showUpdateModal && selectedSubCategory && (
            <UpdateSubCategory
              subcategory={selectedSubCategory}
              onClose={() => setShowUpdateModal(false)}
              onSubCategoryUpdated={fetchSubCategories}
            />
          )}

          {/* Empty State */}
          {filteredSubCategories.length === 0 && (
            <p className="text-center text-gray-500">No subcategories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
