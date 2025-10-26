import React from "react";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-purple-950 to-black" >
  <Provider store={store}>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="movies/:id" element={<MovieDetail/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <Footer/>
    </Provider>
    </div>
  
  );
};

export default App;
