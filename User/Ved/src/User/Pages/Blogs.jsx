import React from "react";
import { useNavigate } from "react-router-dom";
// import blogsData from "./BlogsData";
import Button from "../Component/ui/Button";
import Layout from "../Main/Layout/Layout";
// import headImage from "../../assets/headImage/lawyer_logo.png";

const Blogs = () => {
    const blogsData = [
        {
          id: 1,
          headline: "Homeopathy for Allergies",
          description:
            "Homeopathy offers a gentle and natural approach to treating allergies by focusing on the body's own healing response. Remedies like Allium Cepa and Natrum Muriaticum are commonly used...",
          img: "https://via.placeholder.com/400x200?text=Allergies",
        },
        {
          id: 2,
          headline: "Top 5 Remedies for Cold and Flu",
          description:
            "Cold and flu symptoms can be effectively managed using homeopathic remedies. From Aconite for sudden onset to Gelsemium for flu with drowsiness, explore how to ease your symptoms naturally.",
          img: "https://via.placeholder.com/400x200?text=Cold+and+Flu",
        },
        {
          id: 3,
          headline: "Homeopathy for Skin Disorders",
          description:
            "Whether you're dealing with eczema, psoriasis, or acne, homeopathy can provide individualized solutions. Learn about remedies like Sulphur, Graphites, and more.",
          img: "https://via.placeholder.com/400x200?text=Skin+Care",
        },
        {
          id: 4,
          headline: "Managing Anxiety with Homeopathy",
          description:
            "Natural homeopathic remedies like Argentum Nitricum and Gelsemium are known to help manage symptoms of anxiety and stress. Discover how to use these remedies safely.",
          img: "https://via.placeholder.com/400x200?text=Anxiety",
        },
        {
          id: 5,
          headline: "Benefits of Homeopathy in Children",
          description:
            "From teething troubles to colic, homeopathy is a safe and effective way to support your child's health. Explore some child-friendly remedies you can trust.",
          img: "https://via.placeholder.com/400x200?text=Children",
        },
        {
          id: 6,
          headline: "Boosting Immunity with Homeopathy",
          description:
            "Want to strengthen your immune system naturally? Homeopathic remedies like Thuja and Echinacea can support overall immunity and resilience.",
          img: "https://via.placeholder.com/400x200?text=Immunity",
        },
      ];
  const navigate = useNavigate();
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <Layout>

      <div className="px-2 md:px-20 ">
        <div className=" mt-10 flex flex-col items-center lg:flex-row justify-between">
          <div>
            <div
              className="bg-cover bg-center justify-between "
          
            >
              <h1 className="text-4xl font-semibold text-center lg:text-start ">
              Dharmik <span className="text-orange-500">Blogs</span>
              </h1>
            </div>
            <p className="mt-2 text-center lg:text-start">
              Here are some blog topics for homeopathic treatments:
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button title="View" />
          </div>
        </div>
        <div className="my-8 mb-20">
          <div className="gap-5 md:gap-10 width-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {blogsData.map((blog) => (
              <div key={blog.id} className="bg-white shadow-lg rounded-lg ">
                <img
                  src={blog.img}
                  alt={blog.headline}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="px-4 p-4">


                <h2 className="text-xl font-bold mt-4">{blog.headline}</h2>
                <p className="text-gray-600 mt-2">     {truncateText(blog.description, 16)}</p>
                <button
                  onClick={() => navigate(`/blogdetails/${blog.id}`)}
                  className="mt-4 py-2 px-3 bg-gradient-to-r from-brightColor to-backgroundColor text-white rounded text-sm "
                >
                  Read More
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
