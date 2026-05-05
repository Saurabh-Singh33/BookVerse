import React from "react";
import banner from "../../public/Banner.jpg";

function Banner() {
  return (
    <div className="relative overflow-hidden pt-20 md:pt-32 pb-20">
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-0">
          <div className="space-y-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-500 font-semibold text-sm border border-pink-500/20">
              New Books Arrived!
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Hello, welcomes here to learn something{" "}
              <span className="text-gradient">new everyday!!!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Discover a vast collection of books spanning every genre and
              interest. From timeless literary classics to cutting-edge
              non-fiction, BookVerse brings the world's best reads right to your
              fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 input input-bordered flex items-center gap-2 rounded-full focus-within:ring-2 focus-within:ring-pink-500/50 transition-all dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-50">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow border-none focus:ring-0 text-sm" placeholder="your@email.com" />
              </label>
              <button className="btn btn-secondary rounded-full px-8 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/30">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-fuchsia-600 rounded-2xl rotate-6 blur-2xl opacity-20 -z-10 scale-110 animate-pulse"></div>
            <img 
              src={banner} 
              className="w-64 md:w-full max-w-md rounded-2xl shadow-2xl hover:rotate-2 transition-transform duration-500" 
              alt="BookVerse Banner" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
