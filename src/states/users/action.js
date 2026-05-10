import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
};

function receiveUserActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    }
  };
};

function asyncRegisterUser({ email, name, password }) {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      await api.register({ email, name, password });
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));
  };
};



export {
  ActionType,
  receiveUserActionCreator,
  asyncRegisterUser
};


