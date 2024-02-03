import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";
import axios from "axios";

const isAuthenticated = () => {
  const isAuthenticatedValue = localStorage.getItem("isAuthenticated");
  return isAuthenticatedValue !== null;
};

const initialState = {
  user_id: null,
  isAuthenticated: isAuthenticated(),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (credentials, ThunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}token/`, credentials, {
        withCredentials: true,
      });

      const data = response.data;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user_id", data.user_id);
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOut: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;

// export const login = createAsyncThunk(
//   "user/login",
//   async (credentials, ThunkApi) => {
//     try {
//       const response = await fetch(`${BASE_URL}token/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (response.ok && data.access && data.refresh) {
//         localStorage.setItem("access_token", data.access);
//         localStorage.setItem("refresh_token", data.refresh);
//         localStorage.setItem("isAuthenticated", "true");
//         const tokens = data.access.split(".");
//         const payload = tokens[1];
//         const parsedPayload = window.atob(payload);
//         const userData = JSON.parse(parsedPayload);
//         localStorage.setItem('user_id', userData.user_id)
//         return { access: data.access, refresh: data.refresh };
//       } else {
//         throw new Error("Failed to obtain tokens");
//       }
//     } catch (error) {
//       return ThunkApi.rejectWithValue(error.response.data);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     logOut: () => {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//       });
//   },
// });

// export const { logOut } = userSlice.actions;
// export default userSlice.reducer;
