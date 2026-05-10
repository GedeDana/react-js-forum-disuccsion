import { Link } from 'react-router-dom';
import { changeFormatDateStatusThread } from '../helper/changeFormatDate';
import {
  HiArrowCircleUp,
  HiOutlineArrowCircleUp,
  HiArrowCircleDown,
  HiOutlineArrowCircleDown,
} from 'react-icons/hi';

function ThreadsItem({ threads, upVote, downVote, neutralizeVote }) {
  const statusCreateThread = changeFormatDateStatusThread(threads.createdAt);
  const isUpVote = threads.upVotesBy.includes(threads.authUser);
  const isDownVote = threads.downVotesBy.includes(threads.authUser);
  const countUpVote = threads.upVotesBy.length;
  const countDownVote = threads.downVotesBy.length;

  const onClickUpVote = (event) => {
    event.stopPropagation();
    upVote(threads.id);
  };

  const onClikDownVote = (event) => {
    event.stopPropagation();
    downVote(threads.id);
  };

  const onClickNeutralizeVote = (event, statusVoteTarget) => {
    event.stopPropagation();
    neutralizeVote(threads.id, statusVoteTarget);
  };
  return (
    <div className="flex flex-col justify-item-center  my-6 bg-white shadow-sm border-slate-200 rounded-lg">
      <div className="flex mx-3 mb-0 border-slate-200 pt-4 px-1">
        <button className="px-5 py-2 rounded-md mb-6 bg-black text-white">
          {threads.category}
        </button>
      </div>
      <div className="flex flex-row mx-3 mb-0 border-b border-slate-200 pt-1 pb-6 px-1 gap-5">
        <div className="">
          <img src={threads.user.avatar} />
        </div>
        <div className="">
          <Link to={`/thread/detail/${threads.id}`}>
            <h5 className="font-bold"> {threads.title} </h5>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="text-slate-600 font-light">{threads.body}</p>
      </div>
      <div className="p-4">
        <div className="flex flex-row gap-5">
          <button
            className="flex cursor-pointer"
            onClick={
              !isUpVote
                ? onClickUpVote
                : (event) => onClickNeutralizeVote(event, 'upvote')
            }
          >
            {!isUpVote ? (
              <HiOutlineArrowCircleUp className="text-4xl" />
            ) : (
              <HiArrowCircleUp className="text-4xl" />
            )}
            <label className="pt-1 pl-2"> {countUpVote}</label>
          </button>
          <button
            className="flex cursor-pointer"
            onClick={
              !isDownVote
                ? onClikDownVote
                : (event) => onClickNeutralizeVote(event, 'downvote')
            }
          >
            {!isDownVote ? (
              <HiOutlineArrowCircleDown className="text-4xl" />
            ) : (
              <HiArrowCircleDown className="text-4xl" />
            )}
            <label className="pt-1 pl-2"> {countDownVote}</label>
          </button>
          <lable className="pt-1">{statusCreateThread}</lable>
          <label className="pt-1">
            {' '}
            Dibuat oleh <b>{threads.user.name}</b>
          </label>
          <label className="pt-1">
            {' '}
            Jumlah komentar <b>{threads.totalComments}</b>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ThreadsItem;
