import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Cards({ item }) {
  const [authUser] = useAuth();
  
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 transition-all duration-300 dark:bg-slate-900 dark:text-white dark:border dark:border-slate-800 overflow-hidden">
          <figure className="relative h-64 overflow-hidden rounded-t-2xl">
            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">
              {item.name}
              <div className="badge bg-pink-500 text-white border-none shadow-md">{item.category}</div>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
            <div className="card-actions justify-between mt-4">
              <div className="px-3 py-1 font-semibold border rounded-full text-pink-500 dark:border-slate-700">${item.price}</div>
              <Link 
                to={item.category === "paid" && !authUser ? "/signup" : `/read/${item._id || item.id}`}
                state={{ from: window.location.pathname }}
                className="cursor-pointer px-4 py-1.5 font-medium rounded-full border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-fuchsia-600 hover:text-white hover:border-transparent hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-pink-500/40"
              >
                {item.category === "paid" && !authUser ? "Buy Now" : "Read"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;