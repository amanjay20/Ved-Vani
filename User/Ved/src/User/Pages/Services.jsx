import React from 'react'
import Button from "../Component/ui/Button";
import { Link } from 'react-router-dom';
import ServicesCard from "../Section/ServicesCard";
import img1 from '../Assests/Kalsharp.jpeg'
import img2 from '../Assests/Ganeshpujan.jpeg'
import img3 from '../Assests/mataji.jpeg'
import img4 from '../Assests/mataji.jpeg'
import Layout from '../Main/Layout/Layout';

const Services = () => {
    const services = [
        { icon: img1, title: "KalSharp Dosh Puja", date: "01-02-2025" , description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        { icon: img2, title: "Ganesh Pujan", date: "05-02-2025" , description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        { icon: img3, title: "Mangal Pujan", date: "10-02-2025", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { icon: img4, title: "Mata ji Pujan", date: "15-02-2025", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      ];
    
  return (
    <Layout>
    <div className="w-full bg-white flex flex-col items-center justify-center ">
    <div className="max-w-7xl flex flex-col justify-center p-4 lg:p-0 mt-20">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <div className="bg-cover bg-center">
            <h1 className="text-4xl font-semibold text-center lg:text-start">Special  <span className="text-orange-400">Pujan</span></h1>
          </div>
          <p className="mt-2 text-center lg:text-start">
            Your puja to get blessings & Prasad delivered to your home
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link to="/services">
            <Button title="View All" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-14 mb-20">
        {services.map((service, index) => (
          <ServicesCard
            key={index}
            icon={<img src={service.icon} alt={service.title} className="rounded-xl h-64 w-full"/>}
            title={service.title}
            date={service.date}
            description={service.description}
            />
        ))}
      </div>
    </div>
   
  </div>
  </Layout>
  )
}

export default Services