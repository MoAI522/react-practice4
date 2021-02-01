import { combineReducers } from "redux";

import tweetsReducer from "./tweetReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  tweet: tweetsReducer,
  user: userReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
