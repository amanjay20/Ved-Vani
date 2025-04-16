import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import AdminDashboard from "../Admin/Pages/Dashboard.jsx";
import Banner from "../Admin/Pages/Banner/Banner.jsx";
import AddBanner from "../Admin/Pages/Banner/AddBanner.jsx";
import Categories from "../Admin/Pages/Categories.jsx";
import AddCategories from "../Admin/Pages/AddCategories.jsx";
import AddSubCategory from "../Admin/Pages/AddSubCategory.jsx";
import SubCategories from "../Admin/Pages/SubCategories.jsx";
import AddProduct from "../Admin/Pages/AddProduct.jsx";
import Products from "../Admin/Pages/Products.jsx";

const Admin_Routes = () => {
  const { user } = useSelector((state) => state.auth);
  const Navigate = useNavigate();
  return (
    <Routes>
      {user?.role === "admin" ? (
        <>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/banners" element={<Banner />} />
          <Route path="/banner/addbanner" element={<AddBanner />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/addCategories" element={<AddCategories />} />
          <Route path="/subcategories" element={<SubCategories />} />
          <Route path="/addSubCategory" element={<AddSubCategory />} />
          <Route path="/createproducts" element={<Products />} />
          <Route path="/addproducts" element={<AddProduct />} />
        </>
      ) : null}
    </Routes>
  );
};

export default Admin_Routes;
