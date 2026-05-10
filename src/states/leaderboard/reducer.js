import { ActionType } from './action';

function leaderboardReducer(leaderboards = null, action = {}) {
  switch (action.type) {
  case ActionType.GET_LIST_LEADERBOARD:
    return action.payload.leaderboards;
  default:
    return leaderboards;
  }
}

export default leaderboardReducer;