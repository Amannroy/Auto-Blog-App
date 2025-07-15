import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">

        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
            <p>Let AI elevate your storytelling</p>
            <img src={assets.star_icon} className='w-2.5' alt="" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">Your personal <span className="text-primary">blogging</span> <br/> and writing platform.</h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">A space to explore your thoughts, share what inspires you, and express freely—no limits, no filters. From a quick note to a deep dive, your voice belongs here.</p>
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
