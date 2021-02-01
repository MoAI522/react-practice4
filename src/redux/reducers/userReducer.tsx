import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    age: null,
  },
  fetching: false,
  fetched: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state) => {
      return { ...state, fetching: true };
    },
    setUserName: (state, action) => {
      return { ...state, user: { ...state.user, name: action.payload } };
    },
    setUserAge: (state, action) => {
      return { ...state, user: { ...state.user, age: action.payload } };
    },
  },
});

export default slice.reducer;
export const { fetchUser, setUserName, setUserAge } = slice.actions;
