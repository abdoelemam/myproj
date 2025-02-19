import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  let [Categories, setCategories] = useState([]);
  let [sliderSettings, setSliderSettings] = useState({}); // To store settings dynamically

  async function getCategories() {
    let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
  }

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  var XSMsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  var SMsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  var mdsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // Function to update settings based on screen width
  const updateSliderSettings = () => {
    if (window.innerWidth < 400) {
      setSliderSettings(XSMsettings); // Extra small settings
    } 
    else if (window.innerWidth < 640) { // Use else if correctly
      setSliderSettings(SMsettings); // Small settings
    } 
    else if (window.innerWidth < 768) { // Use else if correctly
      setSliderSettings(mdsettings); // Small settings
    } 
    else {
      setSliderSettings(settings); // Default settings for larger screens
    }
  };
  

  useEffect(() => {
    getCategories();
    updateSliderSettings(); // Set initial settings based on window size

    window.addEventListener("resize", updateSliderSettings); // Listen for screen resize
    return () => window.removeEventListener("resize", updateSliderSettings); // Cleanup
  }, []);

  return (
    <>
      <div className="container slider-container py-10">
        <Slider {...sliderSettings}>
          {Categories.map((category) => (
            <img src={category.image} className="h-[250px]" alt={category.name} key={category._id} />
          ))}
        </Slider>
      </div>
    </>
  );
}
