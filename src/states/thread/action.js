import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';

const ActionType = {
  CREATE_THREAD: 'CREATE_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
  GET_ALL_THRREAD: 'GET_ALL_THREAD',
};

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread
    }
  };
};


function getAllThreadActionCreator(threads) {
  return {
    type: ActionType.GET_ALL_THRREAD,
    payload: {
      threads,
    }
  };
};

function upVoteThreadActionCreator({ threadId, userid }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userid
    }
  };
}

function downVoteThreadActionCreator({ threadId, userid }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userid
    }
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userid, statusVoteLast }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userid,
      statusVoteLast
    }
  };
}


function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      const addThread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(addThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));
  };
};

function asyncGetAllThreadWithFilter(categoryFilter) {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      let getAllThread = await api.getAllThread();
      if (categoryFilter != '') {
        getAllThread = getAllThread.filter((item) => item.category.includes(categoryFilter));
      }
      dispatch(getAllThreadActionCreator(getAllThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));

  };
};

function asyncUpVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userid: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userid: authUser.id }));
    }

  };
}

function asyncDownVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();


    dispatch(downVoteThreadActionCreator({ threadId, userid: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userid: authUser.id }));
    }
  };
}

function asyncNeutralizeVoteThread({ threadId, statusVoteLast }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralizeVoteThreadActionCreator({ threadId, userid: authUser.id, statusVoteLast }));

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userid: authUser.id, statusVoteLast }));
    }

  };
}


export {
  createThreadActionCreator,
  getAllThreadActionCreator,
  asyncCreateThread,
  asyncGetAllThreadWithFilter,
  asyncNeutralizeVoteThread,
  asyncDownVoteThread,
  asyncUpVoteThread,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  ActionType
};