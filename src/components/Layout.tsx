import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../redux/reducers/tweetReducer";

import { fetchUser, setUserName } from "../redux/reducers/userReducer";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(setUserName("ore"));
  }, []);

  const _fetchTweets = () => {
    dispatch(fetchTweets());
  };

  const user = useSelector((state) => state.user.user);
  const tweets = useSelector((state) => state.tweet.tweets);
  const tweetsFetching = useSelector((state) => state.tweet.fetching);

  if (tweetsFetching) {
    return <div>fetching...</div>;
  }
  if (!tweets.length) {
    return <button onClick={_fetchTweets}>load tweets</button>;
  }

  const mappedTweets = tweets.map((tweet) => (
    <li key={tweet.id}>{tweet.text}</li>
  ));
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  );
};

export default Layout;
