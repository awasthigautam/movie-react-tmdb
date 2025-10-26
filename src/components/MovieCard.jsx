import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const navigate = useNavigate()  
  const imageBase = "https://image.tmdb.org/t/p/original/";
  const {id , title , vote_average , poster , release_date } = props
  const handleClick = ()=>{
       navigate(`/movies/${id}`)
  }
  return (
    <div onClick={handleClick} className="relative rounded-2xl overflow-hidden shadow-lg group bg-gray-900 mb-6">
      <div
        className="pt-[150%] bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageBase}${poster})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 rounded-2xl"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-sm font-semibold rounded-full px-3 py-1 flex items-center gap-1 z-10">
        ⭐ {vote_average?.toFixed(1)}
      </div>

      <button className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/90 text-red-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition duration-500 z-10 shadow-lg">
        <i className="fa-solid fa-play text-2xl"></i>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        <h3 className="text-base font-semibold leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-300">{release_date.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
