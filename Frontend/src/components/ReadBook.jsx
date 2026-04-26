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
        const localBook = list.find((item) => item.id === id || item._id === id);
        if (localBook) {
          setBook(localBook);
          setLoading(false);
          return;
        }

        // If not found locally, fetch from backend
        const res = await axios.get("http://localhost:4001/book");
        const foundBook = res.data.find((item) => item._id === id || item.id === id);
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
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img 
                src={book.image} 
                alt={book.name} 
                className="w-full rounded-lg shadow-md border dark:border-slate-600"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold mb-4 dark:text-white">{book.name}</h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{book.title}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="badge badge-secondary uppercase">{book.category}</span>
                <span className="text-2xl font-semibold text-pink-500">${book.price}</span>
              </div>
              <p className="text-lg leading-relaxed mb-8 dark:text-gray-300">
                {book.description || "Welcome to the reading section. Explore the depths of knowledge and imagination as you dive into this book's unique journey."}
              </p>
              
              <div className="divider"></div>
              
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Reading Content</h3>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  This is the premium content of <strong>{book.name}</strong>. Here you would find the full text, chapters, and immersive reading experience designed for our BookVerse community.
                </p>
                <p className="mb-4">
                  Step into a world where words come alive. Every page of this book has been curated to provide you with the best insights and storytelling. Whether you're here for educational purposes or just to relax, we hope you find exactly what you're looking for.
                </p>
                <p className="mb-4">
                  The architecture of this world is built on the shared knowledge of millions. As you read through these lines, remember that every great idea started with a single word.
                </p>
                <div className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-md border border-pink-100 dark:border-pink-800/30 mt-6">
                  <p className="font-semibold text-pink-800 dark:text-pink-300 text-center">
                    You are currently in the Reader Mode. Enjoy your quiet time with BookVerse!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link 
              to="/course" 
              className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-300 shadow-md"
            >
              Explore More Books
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadBook;
