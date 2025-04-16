import React, { useState } from "react";
import axios from "axios";
import Header from "../../component/Header";
// import Sidebar from "../../component/Sidebar";
import Sidebar from "../../component/SideBar";
import { useNavigate } from "react-router-dom";



const AddBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("bannerImage", selectedFile);

    try {
      setUploading(true);
      const response = await axios.post("/api/banner/addbanner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response?.data){
        alert("Banner added successfully!");
        navigate('/admin/banners')
        setSuccessMessage(response.data.message);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Home Banner</h2>

            <div className="flex flex-col md:flex-row items-start gap-4 p-4">
              <div className="w-full md:w-auto">
                <p className="text-sm font-medium">Upload Banner <span className='text-red-500'>*</span></p>
              </div>

              <div className="w-full md:flex-1 border-dashed border-2 border-green-300 rounded-md p-4">
                <label htmlFor="banner-upload" className="flex flex-col items-center cursor-pointer">
                  <input type="file" id="banner-upload" className="hidden" onChange={handleFileChange} />
                  <span className="text-sm text-gray-500">{selectedFile ? selectedFile.name : "Attach file"}</span>
                </label>
              </div>
            </div>

            <button
              className={`mt-4 bg-[#E8AF0F] hover:bg-[#EA3805] text-white py-2 px-4 rounded-lg transition w-40 ${uploading && "opacity-50"}`}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save"}
            </button>

            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
