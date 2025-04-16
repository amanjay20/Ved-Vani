import React, { useState, useEffect } from 'react';
import Layout from '../Main/Layout/Layout';


const AstroConsult = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [slide, setSlide] = useState(0);

  const images = [
    "https://www.youngisthan.in/wp-content/uploads/2018/11/Vedic-Astrology.jpg",
    "https://www.adityashastri.com/wp-content/uploads/2023/07/Benefits-of-Consulting-a-Professional-and-Famous-Astrologer-in-India.jpg",
    "https://png.pngtree.com/background/20230522/original/pngtree-round-image-of-animals-and-their-astrological-signs-picture-image_2697132.jpg",
  ];

  const faqs = [
    {
      question: 'What information do I need to provide for consultation?',
      answer: 'You need to provide your full name, date of birth, time of birth, and place of birth for accurate astrological readings.',
    },
    {
      question: 'Is Kundli matching available during consultation?',
      answer: 'Yes, Kundli Milan, Gun Milan, and Dosha analysis are part of the consultation if requested.',
    },
    {
      question: 'Can I get a custom pooja recommendation?',
      answer: 'Absolutely! Pandit Ji will guide you on the most suitable pooja or path according to your planetary positions.',
    },
    {
      question: 'How soon will I get the consultation after booking?',
      answer: 'Your consultation will be scheduled after payment. Current bookings are full till April 2025.',
    },
    {
      question: 'Will I get remedies for my problems?',
      answer: 'Yes, practical and spiritual remedies will be provided based on your Kundli and the issues discussed.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Layout>
      {/* Carousel Section */}
      <div className="w-full h-84 overflow-hidden relative">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="bg-orange-50 text-gray-800 font-sans">
        <section className="bg-gradient-to-r from-orange-100 to-orange-200 py-12 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-red-800">Talk To Vedbadi Arun Pandit For Call Consultation on Bah Vedbadi!</h1>
            <p className="text-lg font-semibold">
              30 minutes, Ask anything, Get solutions to all your life problems in just <span className="text-black font-bold">₹1,48,000/-</span>
            </p>
            <p className="font-semibold text-gray-700">
              Your consultation call will be scheduled after payment. All Slots are booked till <span className="text-red-600">April 2025</span>.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">😊</span>
                <div>
                  <p className="font-bold">1.2 lakh+</p>
                  <p className="text-sm">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">✅</span>
                <div>
                  <p className="font-bold">100%</p>
                  <p className="text-sm">Accurate Predictions</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row mt-4">
              <button className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md hover:bg-red-600 hover:text-white transition">
                Book Your Audio Consultation Call Now →
              </button>
              <button className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md hover:bg-red-600 hover:text-white transition">
                Book Your Video Consultation Call Now →
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src="https://media.istockphoto.com/id/1440474855/photo/indian-way-of-worship-incense-stick-with-flower.jpg?s=612x612&w=0&k=20&c=GkNiH998yMA1TVfUv9-fBQHwh-EiZDexmlZJn3FedMw="
              alt="Vedbadi"
              className="rounded-xl w-80 shadow-xl"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 px-4 md:px-12 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-red-800 mb-6">
            Advantages Of Taking Our Consultation Call on Bah Vedbadi!
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img src="https://cdn.pixabay.com/photo/2019/09/13/08/56/wedding-4473473_1280.jpg" alt="Benefits" className="w-full max-w-md rounded-lg shadow-lg" />
            <ul className="text-lg space-y-3">
              <li>🔸 Talk one-to-one with Pandit Ji</li>
              <li>🔸 Solutions to marriage, love, career, education & more</li>
              <li>🔸 Guidance on spiritual journey & suitable poojas</li>
              <li>🔸 Astrological analysis of problems</li>
              <li>🔸 Know your mistakes and how to fix them</li>
            </ul>
          </div>
          <div className="text-center mt-6">
            <button className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-orange-600 transition">
              BOOK YOUR CALL NOW
            </button>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="bg-orange-50 py-12 px-4 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-red-800 mb-6">
            Best Life Changing Solutions In Just One Call on Bah Vedbadi
          </h2>
          <p className="text-center mb-8 text-gray-700 max-w-3xl mx-auto">
            Out of all the calls you make in your life, only a few can really help solve your problems. Pandit ji can give you solutions to all these problems in just one call on Bah Vedbadi.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Career", icon: "🎓", desc: "Know what to do after exams, jobs or the future with birth chart insights." },
              { title: "Love & Relationship", icon: "❤️", desc: "Compatibility checks, predictions & insights into relationships." },
              { title: "Health", icon: "🩺", desc: "Forecast health issues using Vedic astrology before they appear." },
              { title: "Business", icon: "💼", desc: "Balance between success and failure with business insights." },
              { title: "Marriage", icon: "🤝", desc: "Get Kundli Milan, Gun Milan & Dosha analysis for compatibility." },
              { title: "Child", icon: "🧒", desc: "Know about childbirth, names & issues with your child’s future." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-xl text-red-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-orange-600 transition">
              BOOK YOUR CALL NOW
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-12 px-4 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-red-800 mb-8">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-orange-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 bg-orange-100 hover:bg-orange-200 transition flex justify-between items-center"
                >
                  <span className="font-semibold text-red-800">{faq.question}</span>
                  <span className="text-xl text-red-700">{activeIndex === idx ? '−' : '+'}</span>
                </button>
                {activeIndex === idx && (
                  <div className="p-4 text-gray-700 bg-white border-t border-orange-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AstroConsult;
