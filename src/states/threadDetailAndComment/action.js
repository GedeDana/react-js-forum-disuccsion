import api from '../../utils/api';
import { showLoadingSpiner } from '../loading/action';

const ActionType = {
  GET_DETAIL_THREAD: 'GET_DETAIL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  NEUTRALIZE_VOTE_DETAIL_THREAD: 'NEUTRALIZE_VOTE_DETAIL_THREAD',
  UP_VOTE_COMMENT_THREAD: 'UP_VOTE_COMMENT_THREAD',
  DOWN_VOTE_COMMENT_THREAD: 'DOWN_VOTE_COMMENT_THREAD',
  NEUTRALIZE_VOTE_COMMENT_THREAD: 'NEUTRALIZE_VOTE_COMMENT_THREAD'
};

function getDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.GET_DETAIL_THREAD,
    payload: {
      detailThread
    }
  };
}



function createCommentActionCreator({ comment }) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment
    }
  };
}

function upVoteDetailThreadActionCreator({ threadId, userid }){
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload:{
      threadId,
      userid
    }
  };
}

function downVoteDetailThreadThreadActionCreator({ threadId, userid }){
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload:{
      threadId,
      userid,
    }
  };
}

function neutralizeVoteDetailThreadActionCreator({ threadId, userid, statusVoteLast }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
    payload:{
      threadId,
      userid,
      statusVoteLast
    }
  };
}

function upVoteCommentThreadActionCreator({ threadId, commentId, userid }) {
  return {
    type: ActionType.UP_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      threadId,
      userid
    }
  };
}

function downVoteCommentThreadActionCreator({ threadId, commentId, userid }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      threadId,
      userid
    }
  };
}

function neutralizeVoteCommentThreadActionCreator({ threadId, commentId, userid, statusVoteLast }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      threadId,
      userid,
      statusVoteLast
    }
  };
}

function asycGetDetailThread({ threadId }) {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      const detailThread = await api.getDetailThread({ id: threadId });
      dispatch(getDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingSpiner(true));
    try {
      const comment = await api.createComment({ id:threadId, content });
      dispatch(createCommentActionCreator({ comment }));
    } catch (error) {
      console.log(error, 'error tai');
      alert(error.message);
    }
    dispatch(showLoadingSpiner(false));
  };
}

function asyncUpVoteDetailThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteDetailThreadActionCreator({ threadId, userid: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteDetailThreadActionCreator({ threadId, userid: authUser.id }));
    }

  };
}

function asyncDownVoteDetailThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteDetailThreadThreadActionCreator({ threadId, userid: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteDetailThreadThreadActionCreator({ threadId, userid: authUser.id }));
    }
  };
}

function asyncNeutralizeVoteDetailThread({ threadId, statusVoteLast }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralizeVoteDetailThreadActionCreator({ threadId, userid: authUser.id, statusVoteLast }));

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteDetailThreadActionCreator({ threadId, userid: authUser.id, statusVoteLast }));
    }

  };
}

function asyncUpVoteThreadDetailComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    console.log({ threadId, commentId }, 'up pak eko');
    dispatch(upVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id }));
    try {
      await api.upVoteComment(threadId, commentId);
    } catch  {
      dispatch(upVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id }));
    }
  };
}

function asyncDownVoteThreadDetailComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id }));
    try {
      await api.downVoteComment(threadId, commentId);
    } catch  {
      dispatch(downVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id }));
    }
  };
}

function asyncNeutralizeVoteThreadDetailComment({ threadId, commentId, statusVoteLast }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    console.log(authUser, 'id auth neutralize comment');
    dispatch(neutralizeVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id, statusVoteLast }));
    try {
      await api.newutralizeVoteComment(threadId, commentId);
    } catch (error) {
      alert(error);
      dispatch(neutralizeVoteCommentThreadActionCreator({ threadId, commentId, userid: authUser.id, statusVoteLast }));
    }
  };
}

export {
  ActionType,
  getDetailThreadActionCreator,
  createCommentActionCreator,
  upVoteCommentThreadActionCreator,
  downVoteCommentThreadActionCreator,
  neutralizeVoteCommentThreadActionCreator,
  asycGetDetailThread,
  asyncCreateComment,
  asyncUpVoteThreadDetailComment,
  asyncDownVoteThreadDetailComment,
  asyncNeutralizeVoteThreadDetailComment,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadThreadActionCreator,
  neutralizeVoteDetailThreadActionCreator,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralizeVoteDetailThread
};