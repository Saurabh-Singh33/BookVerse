import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const data = res.data.filter((data) => data.category.toLowerCase() === "free");
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-20">
      <div className="space-y-4 mb-10">
        <div className="inline-block px-3 py-1 rounded-lg bg-green-500/10 text-green-600 font-bold text-xs uppercase tracking-widest">
          Free Resources
        </div>
        <h1 className="font-bold text-3xl md:text-4xl dark:text-white">
          Free Offered <span className="text-gradient">Courses</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          Explore our curated collection of free books — from timeless classics
          to modern masterpieces. Start reading today and unlock a world of
          knowledge without spending a dime.
        </p>
      </div>

      <div className="relative">
        <Slider {...settings} className="pb-10">
          {book.map((item) => (
            <Cards item={item} key={item._id || item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default Freebook;