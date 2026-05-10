import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';

const ActionType = {
  GET_LIST_LEADERBOARD: 'GET_LIST_LEADERBOARD'
};

function getAllListLeaderboard(leaderboards) {
  return {
    type: ActionType.GET_LIST_LEADERBOARD,
    payload: {
      leaderboards
    }
  };
}


function asyncListLeaderBoard() {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      const listLeaderboard = await api.getLeaderboards();
      dispatch(getAllListLeaderboard(listLeaderboard));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));
  };

}

export {
  ActionType,
  getAllListLeaderboard,
  asyncListLeaderBoard
};