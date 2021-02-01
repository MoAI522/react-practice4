import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

const initialState: {
  tweets: {
    id: number;
    text: string;
  }[];
  fetching: boolean;
  fetched: boolean;
  error: any;
} = {
  tweets: [],
  fetching: false,
  fetched: false,
  error: null,
};

const slice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    fetchTweetsStart: (state) => {
      return { ...state, fetching: true };
    },
    fetchTweetsFulfilled: (state, action) => {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tweets: action.payload,
      };
    },
    fetchTweetsRejected: (state, action) => {
      return { ...state, fetching: false, err: action.payload };
    },
    addTweet: (state, action) => {
      return { ...state, tweets: [...state.tweets, action.payload] };
    },
    updateTweet: (state, action) => {
      const tweets = [...state.tweets];
      tweets.filter((value) => value.id === action.payload.text)[0].text =
        action.payload.text;
      return { ...state, tweets: tweets };
    },
    deleteTweet: (state, action) => {
      const tweets = [...state.tweets].filter(
        (value) => value.id !== action.payload
      );
      return { ...state, tweets: tweets };
    },
  },
});

export const {
  fetchTweetsStart,
  fetchTweetsFulfilled,
  fetchTweetsRejected,
  addTweet,
  updateTweet,
  deleteTweet,
} = slice.actions;

export const fetchTweets = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTweetsStart());
  axios
    .get("http://localhost:18080")
    .then((response) => {
      dispatch(fetchTweetsFulfilled(response.data));
    })
    .catch((err) => {
      dispatch(fetchTweetsRejected(err));
    });
};

export default slice.reducer;
