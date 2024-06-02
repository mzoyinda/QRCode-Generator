import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PhotoHeader = ({setfilteredAlbum}) => {

  const[query, setQuery] = useState("")

  const { album } = useSelector((state) => state.placeholders);

  useEffect(() => {
    let imageData = album.filter(
      (image) =>
        image.title.toLowerCase().indexOf(query.toString().toLowerCase()) >=
        0
    );

    setfilteredAlbum(imageData)
  }, [query, album]);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center pt-24 pb-6 px-6">
      <h2 className="text-2xl font-medium text-gray-800 mb-4 md:mb-0">Photo Album</h2>
      <div className="relative w-full md:w-[380px]">
        <input 
          type="search" 
          name="search"
          placeholder="Search photos..." 
          onChange={(e)=> setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
    </header>
  );
};

export default PhotoHeader;
