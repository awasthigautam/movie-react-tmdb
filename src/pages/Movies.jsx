import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { discoverMovies, setPage } from "../redux/features/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const { discover, loading, error, page, total_pages } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(discoverMovies(page));
  }, [dispatch, page]);

  if (loading)
    return (
      <p className="text-white m-5 text-lg text-center">Loading movies...</p>
    );
  if (error)
    return <p className="text-red-500 m-5 text-center">Error: {error}</p>;

  return (
    <div className="p-5 bg-gradient-to-br from-purple-950 to-black min-h-screen">
     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {discover.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            vote_average={movie.vote_average}
            poster={movie.poster_path}
            release_date={movie.release_date}
            key={movie.id}
          />
        ))}
      </div>

      <div className="flex gap-6 justify-center items-center mt-10">
        <button
          disabled={page === 1}
          onClick={() => dispatch(setPage(page - 1))}
          className={`text-lg border border-gray-500 px-4 py-1 rounded-lg transition ${
            page === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-gray-700"
          }`}
        >
          ← Previous
        </button>

        <span className="text-white text-lg font-semibold">
          Page {page} / {total_pages}
        </span>

        <button
          disabled={page === total_pages}
          onClick={() => dispatch(setPage(page + 1))}
          className={`text-lg border border-gray-500 px-4 py-1 rounded-lg transition ${
            page === total_pages
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-gray-700"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Movies;
