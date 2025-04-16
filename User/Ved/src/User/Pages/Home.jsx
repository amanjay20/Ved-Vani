import React from 'react'
import Layout from '../Main/Layout/Layout'
import BannerSection from '../Section/BannerSection'
import PoojaBookingSection from '../Section/PoojaBookingSection'
import SpecialPoojanSection from '../Section/SpecialPoojanSection'
import AstroAndPuja from '../Section/AstroAndPuja'
import Blogs from '../Section/Blogs'
import Testimonials from '../Section/Testimonials'
import Gallery from '../Section/Gallery'

const Home = () => {
  return (
    <Layout>
        <BannerSection/>
        <PoojaBookingSection/>
        <SpecialPoojanSection/>
        <AstroAndPuja/>
        <Blogs/>
        <Testimonials/>
        <Gallery/>

    </Layout>
  )
}

export default Home