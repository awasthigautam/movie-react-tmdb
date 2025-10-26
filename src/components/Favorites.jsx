import React from "react";
import MovieCard2 from "./MovieCard2";

const Favorites = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const fav = currentUser?.favorites || []; // handle case when no favorites

  return (
    <div className="p-5 min-h-screen bg-gradient-to-br from-purple-950 to-black">
      <h1 className=" mt-20 text-4xl font-bold text-amber-50 mb-6">Favorites</h1>

      {/* Grid of favorite movies */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {fav.length > 0 ? (
          fav.map((movie) => (
            <MovieCard2
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster={movie.poster_path}
              release_date={movie.release_date}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full mt-10">
            No favorite movies added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
