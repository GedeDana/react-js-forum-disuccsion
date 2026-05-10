import { ActionType } from './action';

function threadReducer(thread = null, action = {}) {
  switch (action.type) {
  case ActionType.CREATE_THREAD:
    return thread;
  case ActionType.GET_ALL_THRREAD:
    return action.payload.threads;
  case ActionType.GET_DETAIL_THREAD:
    return action.payload.detailThread;
  case ActionType.UP_VOTE_THREAD:
    return thread.map((threadItem) => {
      if (threadItem.id === action.payload.threadId) {
        return {
          ...threadItem,
          upVotesBy: threadItem.upVotesBy.concat([action.payload.userid]),
          downVotesBy: threadItem.downVotesBy.filter((item) => {
            return item !== action.payload.userid;
          })

        };
      }
      return threadItem;
    });
  case ActionType.DOWN_VOTE_THREAD:
    return thread.map((threadItem) => {
      if (threadItem.id === action.payload.threadId) {
        return {
          ...threadItem,
          downVotesBy: threadItem.downVotesBy.concat([action.payload.userid]),
          upVotesBy: threadItem.upVotesBy.filter((item) => {
            return item !== action.payload.userid;
          })

        };
      }
      return threadItem;
    });
  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return thread.map((threadItem) => {
      if (threadItem.id === action.payload.threadId) {
        return {
          ...threadItem,
          upVotesBy: action.payload.statusVoteLast === 'upvote' ? threadItem.upVotesBy.filter((item) => {
            return item !== action.payload.userid;
          }) : threadItem.upVotesBy,
          downVotesBy: action.payload.statusVoteLast === 'downvote' ? threadItem.downVotesBy.filter((item) => {
            return item !== action.payload.userid;
          }) : threadItem.downVotesBy,
        };
      }
      return threadItem;
    });

  default:
    return thread;
  }
};

export default threadReducer;