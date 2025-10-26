import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Home, User, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
<nav className="bg-gradient-to-r from-[#2b004f] via-[#1a002e] to-black shadow-[0_0_25px_rgba(128,0,255,0.25)] border-b border-purple-800/40 text-white fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-blue-400 transition"
          >
            <Film size={28} />
            <span>MovieApp</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/movies"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Movies</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <User size={20} />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {currentUser ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                }}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hover:text-blue-400 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
