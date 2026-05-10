import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUeser/reducer';
import usersReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadReducer from './thread/reducer';
import leaderboardReducer from './leaderboard/reducer';
import threadAndCommentReducer from './threadDetailAndComment/reducer';
import loadingSpinerReducer from './loading/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    threads: threadReducer,
    leaderboard: leaderboardReducer,
    threadDetail: threadAndCommentReducer,
    loading: loadingSpinerReducer
  },
});


export default store;