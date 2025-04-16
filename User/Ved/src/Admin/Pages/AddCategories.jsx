import React, { useState } from 'react';
import axios from 'axios';
// import Sidebar from '../component/Sidebar';
import Headers from '../component/Header';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/SideBar';

const AddCategories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
//   const [bannercategoryimage, setBannerCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };
//   const handleBannerFileUpload = (e) => {
//     setBannerCategoryImage(e.target.files[0]);
//   };

  const handleSave = async () => {
    if (!categoryName || !image) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("image", image);
    // formData.append("bannercategoryimage", bannercategoryimage);

    try {
      const response = await axios.post("/api/category/addCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      if(response?.data){
        alert("Category added successfully!");
        navigate('/admin/categories')
        setCategoryName("");
        setImage(null);
      }
      
    } catch (error) {
      alert("Error adding category: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex bg-[#f8f8f8]'> 
      <Sidebar />
      <div className='flex-1'>
        <Headers />
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 h-[calc(100vh-4rem)]">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add New Category</h2>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium mb-2">
                  Category Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="uploadImage" className="block text-sm font-medium mb-2">
                  Upload Image<span className="text-red-500">*</span>
                </label>
                <div className="border border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center">
                  <input type="file" id="uploadImage" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  <label htmlFor="uploadImage" className="flex flex-col items-center cursor-pointer text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 10l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    {image ? image.name : 'Drag & drop files here or attach file'}
                  </label>
                </div>
              </div>
              {/* <div className="mb-4">
                <label htmlFor="uploadImage" className="block text-sm font-medium mb-2">
                Add Banners in Categories<span className="text-red-500">*</span>
                </label>
                <div className="border border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center">
                  <input type="file" id="uploadbannerImage" accept="image/*" className="hidden" onChange={handleBannerFileUpload} />
                  <label htmlFor="uploadbannerImage" className="flex flex-col items-center cursor-pointer text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 10l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    {bannercategoryimage ? bannercategoryimage.name : 'Drag & drop files here or attach file'}
                  </label>
                </div>
              </div> */}
              <button onClick={handleSave} className="w-full bg-[#E8AF0F] hover:bg-[#EA3805] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
