import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../data/list.json";
import Cards from "./Cards";

function Freebook() {

  // ✅ Filter Free category (case-safe)
  const filterdata = list.filter(
    (item) => item.category.toLowerCase() === "free"
  );

  // ✅ Limit to 6 items
  const book = filterdata.slice(0, 6);

  // ✅ Slider Settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: book.length > 3,   // scroll only if more than 3
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      
      <div className="mb-6">
        <h1 className="font-semibold text-xl pb-2">
          Free Offered Courses
        </h1>
        <p>
          Explore our free courses available for everyone.
        </p>
      </div>

      <Slider {...settings}>
        {book.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </Slider>

    </div>
  );
}

export default Freebook;