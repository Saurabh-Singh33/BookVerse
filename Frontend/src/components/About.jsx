import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">About <span className="text-pink-500">BookVerse</span></h1>
            <p className="text-lg leading-relaxed mb-6">
                Welcome to BookVerse, your ultimate destination for exploring a world of knowledge and imagination. 
                Whether you're a curious student or a lifelong learner, we provide an extensive collection of books 
                ranging from free educational resources to premium specialized content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
                <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                    <p>To make quality reading materials accessible to everyone, everywhere, at any time.</p>
                </div>
                <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                    <p>Building a community of readers where learning has no boundaries and knowledge is shared.</p>
                </div>
                <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-3">Community</h3>
                    <p>Join thousands of users who are already exploring our digital library today.</p>
                </div>
            </div>
            <p className="text-lg italic text-gray-600 dark:text-gray-400">
                "A room without books is like a body without a soul." - Marcus Tullius Cicero
            </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
