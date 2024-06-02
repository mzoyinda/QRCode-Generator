import React from 'react';

const HeaderBanner = () => {
  return (
    <header className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-8">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-6xl mx-auto capitalize">
          Welcome to Modern Photos, experience seamless loading and filtering of photos.
        </h1>
      </div>
    </header>
  );
};

export default HeaderBanner;
