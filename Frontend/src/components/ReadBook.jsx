import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import list from "../data/list.json";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function ReadBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // First check local list
        const localBook = list.find((item) => String(item.id) === String(id) || String(item._id) === String(id));
        if (localBook) {
          setBook(localBook);
          setLoading(false);
          return;
        }

        // If not found locally, fetch from backend
        const res = await axios.get("http://localhost:4001/book");
        const foundBook = res.data.find((item) => String(item._id) === String(id) || String(item.id) === String(id));
        setBook(foundBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <Link to="/" className="text-pink-500 underline">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-12">
        <div className="bg-white/80 backdrop-blur-md dark:bg-slate-800/80 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="w-full md:w-1/3 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-pink-500/30">
                <img 
                  src={book.image} 
                  alt={book.name} 
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{book.name}</h1>
              <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium">{book.title}</h2>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="badge bg-pink-500 text-white border-none shadow-md px-4 py-3 uppercase font-semibold tracking-wide">{book.category}</span>
                <span className="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
                  <span className="text-pink-500 mr-1">$</span>{book.price}
                </span>
              </div>
              <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-l-4 border-pink-500">
                {book.description || "Welcome to the reading section. Explore the depths of knowledge and imagination as you dive into this book's unique journey."}
              </p>
              
              <div className="divider my-8"></div>
              
              <h3 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm">✦</span>
                Reading Content
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                <p className="leading-relaxed">
                  This is the premium content of <strong className="text-pink-500">{book.name}</strong>. Here you would find the full text, chapters, and immersive reading experience designed for our BookVerse community.
                </p>
                <p className="leading-relaxed">
                  Step into a world where words come alive. Every page of this book has been curated to provide you with the best insights and storytelling. Whether you're here for educational purposes or just to relax, we hope you find exactly what you're looking for.
                </p>
                <p className="leading-relaxed">
                  The architecture of this world is built on the shared knowledge of millions. As you read through these lines, remember that every great idea started with a single word.
                </p>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-pink-100 dark:border-pink-800/30 mt-8 shadow-inner">
                  <p className="font-semibold text-lg text-pink-800 dark:text-pink-300 text-center">
                    📖 You are currently in the Reader Mode. Enjoy your quiet time with BookVerse!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link 
              to="/course" 
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg px-10 py-4 rounded-full hover:shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
            >
              ← Explore More Books
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadBook;
