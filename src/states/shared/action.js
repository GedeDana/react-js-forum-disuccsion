import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';
import { getAllThreadActionCreator } from '../thread/action';
import { receiveUserActionCreator } from '../users/action';

function asyncListThreadAndLeaderboardUser() {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      const thread = await api.getAllThread();
      const users = await api.getAllUsers();
      const getCategory = [...new Set(thread.map((item) => item.category))];
      dispatch(getAllThreadActionCreator(thread, getCategory));
      dispatch(receiveUserActionCreator(users));

    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));

  };
};

export { asyncListThreadAndLeaderboardUser };