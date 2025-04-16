import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

const Layout = ({ children, title, description, keywords, author }) => {


  useEffect(() => {
    // Function to create or update a meta tag
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update charset meta tag
    let metaCharset = document.querySelector('meta[charset]');
    if (!metaCharset) {
      metaCharset = document.createElement('meta');
      metaCharset.setAttribute('charset', 'utf-8');
      document.head.appendChild(metaCharset);
    }

    // Update other meta tags and title
    document.title = title;
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
  }, [title, description, keywords, author]);




  return (
    <div>
      <Navbar />
      <main id="text">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Vedvaani ",
  description: "Vedvaani",
  keywords: "Vedvaani, Vedvaani",
  author: "Vedvaani",
};

export default Layout;
