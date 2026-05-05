import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Cards({ item }) {
  const [authUser] = useAuth();
  
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-full bg-white dark:bg-slate-800/50 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden group border border-slate-100 dark:border-slate-700/50 rounded-3xl">
        <figure className="relative h-64 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute top-4 right-4">
            <div className="badge glass-effect border-none shadow-lg text-xs font-bold px-3 py-2 uppercase tracking-wider">
              {item.category}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
             <span className="text-white text-xs font-medium">Click to explore details</span>
          </div>
        </figure>
        <div className="card-body p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl font-bold line-clamp-1 dark:text-white">
              {item.name}
            </h2>
          </div>
          {item.author && (
            <p className="text-sm font-semibold text-pink-500 mb-2">by {item.author}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed h-10 mb-4">
            {item.title}
          </p>
          <div className="card-actions justify-between items-center mt-auto">
            <div className="text-lg font-bold dark:text-white">
              {item.price === 0 ? (
                <span className="text-green-500">Free</span>
              ) : (
                <span>${item.price}</span>
              )}
            </div>
            <Link 
              to={item.category === "paid" && !authUser ? "/signup" : `/read/${item._id || item.id}`}
              state={{ from: window.location.pathname }}
              className="btn btn-sm btn-outline border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full px-6 transition-all duration-300"
            >
              {item.category === "paid" && !authUser ? "Buy Now" : "Read Now"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;