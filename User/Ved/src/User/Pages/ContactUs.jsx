import React from 'react';
import PagesBanners from '../Component/PageBannerComponent';
import Layout from '../Main/Layout/Layout';

const ContactUs = () => {
  return (
    <Layout>
      <PagesBanners title="Contact Us" />
      <div className="p-6 md:p-10 bg-orange-50 text-red-900">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl text-red-600 font-semibold mb-2">Have a question?</h2>
          <h1 className="text-3xl font-bold italic text-red-800 mb-4">Let's get in touch</h1>
          <p className="mb-2">
            Want to get in touch? Let's chat. Our team would love to hear from you. Just call or mail us using the info below.
          </p>
          <p className="mb-4">We’re also available for business queries of bulk orders or stockists.</p>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-red-700">Email</h3>
              <p>anant@poojapaath.com</p>
            </div>
            <div>
              <h3 className="font-bold text-red-700">Telephone</h3>
              <p>+91 755 2733815, 2534196</p>
            </div>
            <div>
              <h3 className="font-bold text-red-700">Customer Care</h3>
              <p>+91 78800 95402</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
            <h3 className="text-xl font-semibold text-red-800 mb-4">Write to us</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="border border-red-300 rounded p-2 w-full focus:ring-red-300 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="E-mail *"
                  className="border border-red-300 rounded p-2 w-full focus:ring-red-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Mobile Number *"
                  className="border border-red-300 rounded p-2 w-full focus:ring-red-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Subject *"
                  className="border border-red-300 rounded p-2 w-full focus:ring-red-300 focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Your message here *"
                className="border border-red-300 rounded p-2 w-full h-28 focus:ring-red-300 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-600" />
                <label className="text-sm">Send a copy to me</label>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded hover:opacity-90 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* Address and Map */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-lg font-bold text-red-800">Corporate Address</h3>
              <p className="mt-2">Pooja Paath Agarbatti</p>
              <p>96, Malviya Nagar, Opp. Governor House, Behind Airtel Office, Bhopal (M.P) India 462003</p>
            </div>
            <div>
              <iframe
                title="location"
                className="w-full h-64 rounded-md shadow"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.2249016266885!2d77.40248641498302!3d23.453671284734213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43d3efae04c7%3A0x16849149085ec594!2sAnant%20Products%20Pooja%20Paath%20Agarbatti!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
