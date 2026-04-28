import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import About from "./components/About";
import ReadBook from "./components/ReadBook";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      element.setAttribute("data-theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      element.setAttribute("data-theme", "light");
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white bg-white text-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/read/:id" element={<ReadBook />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;