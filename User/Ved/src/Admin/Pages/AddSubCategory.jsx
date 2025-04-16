/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/SideBar";
import Headers from "../component/Header";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/allCategory"); // adjust endpoint accordingly
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!categoryId || !title || !image) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await axios.post("/api/category/addSubCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Subcategory added successfully");
      navigate("/admin/subcategories");
    } catch (error) {
      alert("Error: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#f8f8f8]">
      <Sidebar />
      <div className="flex-1">
        <Headers />
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Add SubCategory</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">SubCategory Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <button
            onClick={handleSave}
            className="bg-[#E8AF0F] hover:bg-[#EA3805] text-white py-2 px-4 rounded-lg"
          >
            {loading ? "Saving..." : "Save SubCategory"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
