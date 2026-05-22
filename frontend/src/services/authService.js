// import { create } from "zustand";
// import axios from "axios";

// export const userAuth = create((set) => ({
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   currentUser: null,

//   login: async (cred) => {
//     try {
//       set({ loading: true });

//       const res = await axios.post(
//         "http://localhost:4000/common-api/login",
//         cred,
//         { withCredentials: true }
//       );

//       set({
//         loading: false,
//         isAuthenticated: true,
//         currentUser: res.data.payload,
//       });

//       return res.data;
//     } catch (err) {
//       set({
//         loading: false,
//         error: err.response?.data?.message,
//       });

//       throw err;
//     }
//   },

//   logout: async () => {
//     await axios.get(
//       "http://localhost:4000/common-api/logout",
//       { withCredentials: true }
//     );

//     set({
//       isAuthenticated: false,
//       currentUser: null,
//     });
//   },
// }));

// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  loading: false,
  error: null,
  isAuthenticated: false,
  currentUser: null,

  login: async (cred) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "http://localhost:4000/common-api/login",
        cred,
        { withCredentials: true }
      );
      localStorage.setItem("author", JSON.stringify(res.data.payload));
      set({ loading: false, isAuthenticated: true, currentUser: res.data.payload });
      return res.data.payload;
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("author");
    set({ isAuthenticated: false, currentUser: null });
    axios.get("http://localhost:4000/common-api/logout", { withCredentials: true });

  },
  refresh:async()=>{
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        "http://localhost:4000/common-api/check-auth",
        { withCredentials: true }
      );
      localStorage.setItem("author", JSON.stringify(res.data.payload));
      set({ loading: false, isAuthenticated: true, currentUser: res.data.payload });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "refresh failed",
      });
    }

  }
}));