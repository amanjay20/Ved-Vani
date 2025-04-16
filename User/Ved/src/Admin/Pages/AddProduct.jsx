/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../component/Header";
import Sidebar from "../component/SideBar";
import { XCircle } from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    brand: "",
    category: "",
    subcategoryId: "",
    productmrp: "",
    availableQuantity: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("/api/category/allCategory");
        setCategories(catRes.data);

        const subCatRes = await axios.get("/api/category/allsubCategory");
        setSubcategories(subCatRes.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productData.category) {
      const filtered = subcategories.filter(
        (sub) => sub.categoryId?._id === productData.category
      );
      setFilteredSubcategories(filtered);
    }
  }, [productData.category, subcategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      images.forEach((img) => {
        formData.append("images", img);
      });

      await axios.post("/api/product/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");
      setProductData({
        productName: "",
        description: "",
        brand: "",
        category: "",
        subcategoryId: "",
        productmrp: "",
        availableQuantity: [],
      });
      setImages([]);
    } catch (err) {
      console.error("Product creation error", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex bg-[#F8F8F8]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6"
        >
          <div className="max-w-6xl bg-white mx-auto p-6 shadow-lg rounded-2xl">
            <h2 className="text-xl font-bold mb-6">Add New Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Title"
                  value={productData.productName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Category *</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Subcategory *</label>
                <select
                  name="subcategoryId"
                  value={productData.subcategoryId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Product MRP *</label>
                <input
                  type="number"
                  name="productmrp"
                  placeholder="Product MRP"
                  value={productData.productmrp}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={imageInputRef} // ⬅️ Reference to reset the input
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />

                {/* Show previews with remove buttons */}
                <div className="flex flex-wrap gap-4 mt-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`upload-${index}`}
                        className="w-24 h-24 object-cover rounded shadow"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                        onClick={() => {
                          const updatedImages = [...images];
                          updatedImages.splice(index, 1);
                          setImages(updatedImages);

                          // If no images left, reset file input
                          if (
                            updatedImages.length === 0 &&
                            imageInputRef.current
                          ) {
                            imageInputRef.current.value = "";
                          }
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
