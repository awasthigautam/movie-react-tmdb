import { createSlice } from "@reduxjs/toolkit";

const admin = {
  id: "admin-001",
  name: "Admin",
  email: "admin@123.com",
  password: "1234",
  favorites: [],
  watchNext: [],
  recentlyViewed: [],
};

const storedUsers = localStorage.getItem("users");
const storedCurrentUser = localStorage.getItem("currentUser");

const initialUsers = storedUsers ? JSON.parse(storedUsers) : [admin];
const initialCurrentUser = storedCurrentUser
  ? JSON.parse(storedCurrentUser)
  : null;

if (!storedUsers) {
  localStorage.setItem("users", JSON.stringify([admin]));
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers,
    currentUser: initialCurrentUser,
    isAuthenticated: !!initialCurrentUser,
    error: null,
  },

  reducers: {
    signup: (state, action) => {
      const { email, password, name } = action.payload;

      const userExists = state.users.find((user) => user.email === email);
      if (userExists) {
        state.error = "User already exists";
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        favorites: [],
        watchNext: [],
        recentlyViewed: [],
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        state.error = "Invalid credentials";
      }
    },

    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("currentUser");
    },

    clearError: (state) => {
      state.error = null;
    },
 addToFavorite: (state, action) => {
  const movie = action.payload;

  if (!state.currentUser) return;

  if (!state.currentUser.favorites) {
    state.currentUser.favorites = [];
  }
  

  if (!state.currentUser.favorites.some((fav) => fav.id === movie.id)) {
    state.currentUser.favorites.push(movie);
  }

  const index = state.users.findIndex(
    (user) => user.id === state.currentUser.id
  );

  if (index !== -1) {
    state.users[index] = state.currentUser;
  }

  localStorage.setItem("users", JSON.stringify(state.users));
  localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
},


  },
});

export const { signup, login, logout, clearError, addToFavorite } =
  authSlice.actions;
export default authSlice.reducer;
