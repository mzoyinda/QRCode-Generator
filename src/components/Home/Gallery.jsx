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
        <div className="md:mx-14">
          <PhotosHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {album.slice(0, 10).map((photo, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <img src={photo.thumbnailUrl} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full h-20 p-4 bg-black bg-opacity-50 flex items-center justify-between">
                  <p className="w-[78%] text-white">{photo.title}</p>
                  <div className="w-[20%] h-full flex items-center justify-center">
                    <img src={photo.thumbnailUrl}  alt={`thumbnail ${index + 1}`} className="w-[30px] h-[30px] object-cover rounded-full" />
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
