import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../User/Pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import PoojaBookingSection from '../User/Section/PoojaBookingSection';
import SpecialPoojanSection from '../User/Section/SpecialPoojanSection';
import Pooja from '../User/Pages/Pooja';
import Services from '../User/Pages/Services';
import Product from '../User/Pages/Product';
import AstroConsult from '../User/Pages/AstroConsult';
import Blogs from '../User/Pages/Blogs';
import Testimonials from '../User/Pages/Testimonials';
import ContactUs from '../User/Pages/ContactUs';


const Pubilc_Routes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/about'element={<Pooja />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Product' element={<Product />} />
        <Route path='/AstroConsult' element={<AstroConsult />} />
        <Route path='/Blogs' element={<Blogs />} />
        <Route path='Testimonials'element={<Testimonials />} />
        <Route path='/Contactus' element={<ContactUs />} />

         {/* Public Routes (Accessible only if NOT logged in) */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
    </Routes>
  )
}

export default Pubilc_Routes