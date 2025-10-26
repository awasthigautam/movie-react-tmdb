import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "bc17906574f644dfdbba58c366c22e10";
const BASE_URL = "https://api.themoviedb.org/3";

// fetch single movie 
export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail' ,
  async (id,{rejectWithValue}) =>{
       try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
        return response.data
       } catch (error) {
        return rejectWithValue(error.message)
       }
  }
)

// Fetch Upcoming Movies
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Popular Movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Top Rated Movies
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Discover Movies
export const discoverMovies = createAsyncThunk(
  "movies/discoverMovies",
  async (page=1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  upcoming: [],
  popular: [],
  top_rated: [],
  discover: [],
  movieDetail:[],
  loading: false,
  error: null,
  page:1,
  total_pages:1
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
   setPage:(state ,action)=>{
            state.page = action.payload
   }

  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Upcoming
      .addCase(fetchUpcomingMovies.pending, handlePending)
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload;
        localStorage.setItem("upcomingMovies", JSON.stringify(action.payload));
      })
      .addCase(fetchUpcomingMovies.rejected, handleRejected)

      // Popular
      .addCase(fetchPopularMovies.pending, handlePending)
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
        localStorage.setItem("popularMovies", JSON.stringify(action.payload));
      })
      .addCase(fetchPopularMovies.rejected, handleRejected)

      // Top Rated
      .addCase(fetchTopRatedMovies.pending, handlePending)
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.top_rated = action.payload;
        localStorage.setItem("topRatedMovies", JSON.stringify(action.payload));
      })
      .addCase(fetchTopRatedMovies.rejected, handleRejected)

      // Discover
      .addCase(discoverMovies.pending, handlePending)
      .addCase(discoverMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.discover = action.payload;
        state.total_pages = action.payload.total_pages
        localStorage.setItem("discoverMovies", JSON.stringify(action.payload));
      })
      .addCase(discoverMovies.rejected, handleRejected)

      //MovieDetail 
      .addCase(fetchMovieDetail.pending,handlePending)
      .addCase(fetchMovieDetail.fulfilled , (state ,action)=>{
        state.loading = false ; 
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected , handleRejected)
  },
});

export default moviesSlice.reducer;
export const {setPage} = moviesSlice.actions
