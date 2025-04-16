/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react"; // Added Trash Icon
import Sidebar from "../../component/SideBar";
import Headers from "../../component/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch Banners
  const fetchBanners = async () => {
    try {
      const response = await axios.get("/api/banner/allBanner");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  // Delete Banner Function
  const handleDeleteBanner = async (bannerId) => {
    console.log("Attempting to delete banner with ID:", bannerId); // Debugging

    if (!bannerId) {
      console.error("Error: bannerId is undefined!");
      return;
    }

    try {
      const response = await axios.delete(`/api/banner/${bannerId}`);
      console.log("Delete response:", response.data);

      setBanners((prevBanners) =>
        prevBanners.filter((banner) => banner._id !== bannerId)
      );
    } catch (error) {
      console.error(
        "Error deleting banner:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Headers />

          <div className="p-6 space-y-8">
            {/* Home Screen Banners Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="lg:text-xl font-semibold mb-4">
                  Home Screen Banners
                </h2>
                <Link to="/admin/banner/addbanner">
                  <button className="bg-[#E8AF0F] text-base/5 text-white lg:px-3 py-1 rounded-lg hover:bg-[#EA3805]">
                    Add More Banner
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {banners.map((banner) => (
                  <div
                    key={banner._id}
                    className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={banner.bannerImage?.url}
                      alt="Banner"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-lg shadow py-1 flex flex-col items-center text-sm">
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          console.log("Deleting banner with ID:", banner._id); // Debugging
                          handleDeleteBanner(banner._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;