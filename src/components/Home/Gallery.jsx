import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceholders } from "../../reducer/slice/placeholder.slice";
import PhotosHeader from "./PhotosHeader";

const Gallery = () => {
  const { album } = useSelector((state) => state.placeholders);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchPlaceholders());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="md:mx-14 md:mr-20">
          <PhotosHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {album.slice(0, 10).map((photo, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                <img src={photo.thumbnailUrl} alt={`title ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-65 transition-opacity duration-300 flex items-center justify-center flex-col-reverse">
                  <p className="text-white text-center px-4">{photo.title}</p>
                  <div className="mb-4 mx-auto w-8 h-8 bg-white rounded-full overflow-hidden">
                    <img src={photo.thumbnailUrl} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
