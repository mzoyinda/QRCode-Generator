import React from 'react';

const PhotoHeader = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center pt-24 pb-6 px-6">
      <h1 className="text-2xl font-medium text-gray-800 mb-4 md:mb-0">Photo Album</h1>
      <div className="relative w-full md:w-[380px]">
        <input 
          type="text" 
          placeholder="Search photos..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
    </header>
  );
};

export default PhotoHeader;
