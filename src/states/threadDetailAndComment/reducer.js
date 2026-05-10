import { ActionType } from './action';

function threadAndCommentReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.GET_DETAIL_THREAD:
    return action.payload.detailThread;
  case ActionType.CREATE_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UP_VOTE_DETAIL_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.concat([action.payload.userid]),
        downVotesBy: threadDetail.downVotesBy.filter((item) => {
          return item !== action.payload.userid;
        }),
      };
    }
    return threadDetail;
  case ActionType.DOWN_VOTE_DETAIL_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.concat([action.payload.userid]),
        upVotesBy: threadDetail.upVotesBy.filter((item) => {
          return item !== action.payload.userid;
        }),
      };
    }
    return threadDetail;
  case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        upVotesBy:
            action.payload.statusVoteLast === 'upvote'
              ? threadDetail.upVotesBy.filter((item) => {
                return item !== action.payload.userid;
              })
              : threadDetail.upVotesBy,
        downVotesBy:
            action.payload.statusVoteLast === 'downvote'
              ? threadDetail.downVotesBy.filter((item) => {
                return item !== action.payload.userid;
              })
              : threadDetail.downVotesBy,
      };
    }
    return threadDetail;
  case ActionType.UP_VOTE_COMMENT_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (action.payload.commentId === comment.id) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.concat([action.payload.userid]),
              downVotesBy: comment.downVotesBy.filter((item) => {
                return item !== action.payload.userid;
              }),
            };
          }
          return comment;
        }),
      };
    }
    return threadDetail;
  case ActionType.DOWN_VOTE_COMMENT_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (action.payload.commentId === comment.id) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.concat([
                action.payload.userid,
              ]),
              upVotesBy: comment.upVotesBy.filter((item) => {
                return item !== action.payload.userid;
              }),
            };
          }
          return comment;
        }),
      };
    }
    return threadDetail;
  case ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD:
    if (action.payload.threadId === threadDetail.id) {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (action.payload.commentId === comment.id) {
            console.log(action, 'neutralize masuk');
            return {
              ...comment,
              upVotesBy:
                  action.payload.statusVoteLast === 'upvote'
                    ? comment.upVotesBy.filter((item) => {
                      return item !== action.payload.userid;
                    })
                    : comment.upVotesBy,
              downVotesBy:
                  action.payload.statusVoteLast === 'downvote'
                    ? comment.downVotesBy.filter((item) => {
                      return item !== action.payload.userid;
                    })
                    : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    }
    return threadDetail;
  default:
    return threadDetail;
  }
}

export default threadAndCommentReducer;
