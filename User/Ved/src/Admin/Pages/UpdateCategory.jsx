
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCategory = ({ category, onClose, onCategoryUpdated }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(category?.image?.url);
//   const [bannerpreviewImage, setBannerPreviewImage] = useState(category?.image?.url);
console.log(category)
//   const [bannercategoryimage, setBannerCategoryImage] = useState(null);
  useEffect(() => {
    setCategoryName(category.categoryName);
    setPreviewImage(category.image?.url);
    // setBannerPreviewImage(category.bannercategoryimage?.url);
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

//   const handlebannerImageChange = (e) => {
//     const file = e.target.files[0];
//     setBannerCategoryImage(file);
//     // setBannerPreviewImage(URL.createObjectURL(file));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (image) {
      formData.append("image", image);
    }
    // if (bannercategoryimage) {
    //     formData.append("bannercategoryimage", bannercategoryimage);
    //   }

    try {
      await axios.put(`/api/category/categories/${category._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onCategoryUpdated(); // Refresh category list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Update Category</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
          
          <label className="block mb-2">Image:</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-lg mb-4" />
          
          {previewImage && (
            <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-lg mb-4" />
          )}

            {/* <label className="block mb-2">Banner Category Image:</label>
          <input type="file" onChange={handlebannerImageChange} className="w-full p-2 border rounded-lg mb-4" />
          
          {bannerpreviewImage && (
            <img src={bannerpreviewImage} alt="bannerpreviewImage" className="w-32 h-32 rounded-lg mb-4" />
          )} */}
          
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Update
          </button>
          <button type="button" onClick={onClose} className="ml-2 text-gray-500">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
