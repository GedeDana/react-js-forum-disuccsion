import { changeFormatDateStatusThread } from '../helper/changeFormatDate';
import {
  HiArrowCircleUp,
  HiOutlineArrowCircleUp,
  HiArrowCircleDown,
  HiOutlineArrowCircleDown,
} from 'react-icons/hi';
function CommentItem({ comment, authUser, upVoteComment, downVoteComment, neutralizeVoteComment }){
  const statusCreateComment = changeFormatDateStatusThread(comment.createdAt);
  const isUpVoteComment = comment.upVotesBy.includes(authUser);
  const isDownVoteComment = comment.downVotesBy.includes(authUser);
  const countUpVoteComment = comment.upVotesBy.length;
  const countDownVoteComment = comment.downVotesBy.length;


  const onClickUpVoteComment = (event) => {
    event.stopPropagation();
    upVoteComment({ commentId: comment.id });
  };

  const onClikDownVoteComment = (event) => {
    event.stopPropagation();
    downVoteComment({ commentId: comment.id });
  };

  const onClickNeutralizeVoteComment = (event, statusVoteLast) => {
    event.stopPropagation();
    neutralizeVoteComment({ commentId: comment.id, statusVoteLast });
  };

  return (
    <div className="flex gap-2 flex-col border-b border-slate-20">
      <div className="flex pt-5">
        <img src={comment.owner.avatar} className="py-2 pr-3 size-15" />
        <label className="flex-3 my-auto font-medium text-1xl">{comment.owner.name}</label>
      </div>
      <div className="flex">
        <p className="text-slate-600 font-light text-lg pl-1">{comment.content}</p>
      </div>
      <div className="flex flex-row gap-5 pb-5">
        <button
          className="flex cursor-pointer"
          onClick={
            !isUpVoteComment
              ? onClickUpVoteComment
              : (event) => onClickNeutralizeVoteComment(event, 'upvote')
          }
        >
          {!isUpVoteComment ? (
            <HiOutlineArrowCircleUp className="text-4xl" />
          ) : (
            <HiArrowCircleUp className="text-4xl" />
          )}
          <label className="pt-1 pl-2"> {countUpVoteComment}</label>
        </button>
        <button
          className="flex cursor-pointer"
          onClick={
            !isDownVoteComment
              ? onClikDownVoteComment
              : (event) => onClickNeutralizeVoteComment(event, 'downvote')
          }
        >
          {!isDownVoteComment ? (
            <HiOutlineArrowCircleDown className="text-4xl" />
          ) : (
            <HiArrowCircleDown className="text-4xl" />
          )}
          <label className="pt-1 pl-2"> {countDownVoteComment}</label>
        </button>
        <lable className="pt-1">{statusCreateComment}</lable>
        <label className="pt-1">
          {' '}
                Dibuat oleh <b>{comment.owner.name}</b>
        </label>
      </div>
    </div>
  );
}

export default CommentItem;