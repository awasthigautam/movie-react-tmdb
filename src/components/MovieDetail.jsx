import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../redux/features/movieSlice";
import { Heart, Clock } from "lucide-react";
import { addToFavorite } from "../redux/features/authSlice";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, loading, error } = useSelector((state) => state.movies);

  const { currentUser } = useSelector((state) => state.auth);
const isFavorite = currentUser?.favorites?.some(
  (fav) => fav.id === movieDetail.id
);


  console.log(isFavorite);

  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id));
  }, [dispatch, id]);

const addToFav = () => {
  if (!movieDetail) return;

  const movieData = {
    id: movieDetail.id,
    title: movieDetail.title,
    poster_path: movieDetail.poster_path,
    vote_average: movieDetail.vote_average,
    release_date: movieDetail.release_date,
  };

  dispatch(addToFavorite(movieData));
  alert("Added to favorites");
};


  if (loading)
    return <p className="text-black text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!movieDetail) return null;

  return (
    <div className=" mt-15 min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center mt-10">
        <img
          className="w-full md:w-1/3 rounded-2xl shadow-2xl border border-purple-700/40 hover:scale-105 transition-transform duration-300"
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={movieDetail.title}
        />

        <div className="flex-1 space-y-5">
          <h1 className="text-4xl font-bold text-purple-300">
            {movieDetail.title}
          </h1>
          <p className="text-gray-300 italic">
            {movieDetail.tagline ? `"${movieDetail.tagline}"` : ""}
          </p>

          <p className="text-gray-400 leading-relaxed">
            {movieDetail.overview || "No overview available for this movie."}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="bg-purple-800/30 text-purple-300 px-4 py-1 rounded-full text-sm border border-purple-600/50">
              ⭐ Rating: {movieDetail.vote_average?.toFixed(1)}
            </span>
            <span className="bg-purple-800/30 text-purple-300 px-4 py-1 rounded-full text-sm border border-purple-600/50">
              🎬 Genre: {movieDetail.genres?.map((g) => g.name).join(", ")}
            </span>
            <span className="bg-purple-800/30 text-purple-300 px-4 py-1 rounded-full text-sm border border-purple-600/50">
              ⏳ Runtime: {movieDetail.runtime} min
            </span>
            <span className="bg-purple-800/30 text-purple-300 px-4 py-1 rounded-full text-sm border border-purple-600/50">
              📅 Release: {movieDetail.release_date}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={addToFav}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold ${
                isFavorite
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              <Heart size={20} /> {isFavorite ? "Added" : "Add to favorites"}
            </button>

            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Clock size={20} /> Watch Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
