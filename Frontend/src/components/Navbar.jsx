import React, { useEffect, useState } from "react";
import Login from "./Login";

function Navbar() {

  // ✅ Check login from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ✅ Theme Logic (Your same code)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // ✅ Sticky Navbar
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a>Contact</a></li>
      <li><a>About</a></li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 
        dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 
        ${sticky ? "shadow-md bg-base-200 dark:bg-slate-700 duration-300 transition-all" : ""}`}
      >
        <div className="navbar">

          {/* Left */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                ☰
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>

            <a className="text-2xl font-bold cursor-pointer">bookStore</a>
          </div>

          {/* Right */}
          <div className="navbar-end space-x-3">

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <svg
                className="w-7 h-7 cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <circle cx="12" cy="12" r="5" />
              </svg>
            </label>

            {/* ✅ Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div>
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;