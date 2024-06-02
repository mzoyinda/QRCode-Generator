import React, { useEffect, useState } from "react";
import { fetchPlaceholders } from "../../reducer/slice/placeholder.slice";
import PhotosHeader from "./PhotosHeader";
import LazyLoad from 'react-lazyload';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

const Gallery = () => {
  const [filteredAlbum, setFilteredAlbum] = useState([]);
  const dispatch = useAppDispatch();

  const { album, isLoading, error } = useAppSelector((state) => state.placeholders);

  useEffect(() => {
    const cachedAlbum = localStorage.getItem("album");
    if (cachedAlbum) {
      dispatch(fetchPlaceholders.fulfilled(JSON.parse(cachedAlbum)));
    } else {
      dispatch(fetchPlaceholders());
    }
  }, [dispatch]);

  useEffect(() => {
    if (album) {
      setFilteredAlbum(album);
    }
  }, [album]);

  return (
    <section>
      <div className="md:mx-14">
        <PhotosHeader setFilteredAlbum={setFilteredAlbum} />
        {isLoading || error ? (
          <div className="flex justify-center items-start h-[40vh]">
            <h3 className="pt-20 text-[25px]">
              {error ? "Unable to fetch album at the moment!" : "Fetching Album..."}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {filteredAlbum.map((photo, index) => (
              <LazyLoad key={index} height={200} offset={100} once>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <img
                    src={photo.thumbnailUrl}
                    alt={`thumbnail ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 p-4 bg-black bg-opacity-50 flex items-center justify-between">
                    <p className="w-[78%] text-white">{photo.title}</p>
                    <div className="w-[20%] h-full flex items-center justify-center">
                      <img
                        src={photo.thumbnailUrl}
                        alt={`thumbnail ${index + 1}`}
                        className="w-[30px] h-[30px] object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </LazyLoad>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
