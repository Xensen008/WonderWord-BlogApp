import React from "react";
import heroImg from "../assets/img/hero.png";
import "../assets/css/landingpage.css";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-center">
        <div className="flex flex-col  w-full lg:w-6/12 justify-center lg:pt-24 pt-5 items-start text-center lg:text-left mb-5 md:mb-0">
          <h1 className="my-4 text-5xl font-bold leading-tight text-primary dark:text-dark-primary">
            <span className="text-theme-color">Journey</span> through 
            stories and thoughts bringinig clarity to the chaos of ideas 
            
          </h1>
          <p className="leading-normal mb-8 text-center lg:text-left text-2.5xl text-primary dark:text-dark-primary font-sans">
            Write Post on various topics and start your journey as a impactful
            <span className="text-theme-color font-bold ml-3">
              Content Creator
            </span>
            , exploring your passions, sharing your knowledge and experiences
            with the world.
          </p>
          <div className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5">
            <Link to="/signup">
              <button className="lg:mx-0 bg-[#e10112] text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                Sign up
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:-mt-10 relative pt-16" id="hero">
          <img className="w-8/12 mx-auto 2xl:-mb-20 rounded-full object-cover h-auto" src={heroImg} />
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
