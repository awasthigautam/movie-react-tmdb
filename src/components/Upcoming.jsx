import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies, fetchUpcomingMovies } from "../redux/features/movieSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";

const Upcoming = () => {
  const dispatch = useDispatch();
  const { upcoming, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading)
    return <p className="text-white m-5 text-lg text-center">Loading movies...</p>;
  if (error)
    return <p className="text-red-500 m-5 text-center">Error: {error}</p>;

  return (
    <div className="px-10 my-10 p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-white font-bold">Upcoming Movies</h1>
        <button className="text-lg text-white border border-gray-500 px-4 py-1 rounded-lg hover:bg-gray-700 transition">
          View More
        </button>
      </div>

      {/* Movie Slider */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={15}
        slidesPerView={6}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="pb-5"
      >
        {upcoming?.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster={movie.poster_path}
              release_date={movie.release_date}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Upcoming;
