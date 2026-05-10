import { useDispatch, useSelector } from 'react-redux';
import {
  asyncDownVoteThread,
  asyncGetAllThreadWithFilter,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../states/thread/action';
import ThreadsItem from '../components/ThreadsItem';
import { useContext, useEffect } from 'react';
import { asyncListThreadAndLeaderboardUser } from '../states/shared/action';
import FilterThreadsInput from '../components/FilterThreadsInput';
import SideBarContext from '../utils/SideBarContext';
function ThreadListPage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const sidebar = useContext(SideBarContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncListThreadAndLeaderboardUser());
  }, [dispatch]);

  const upVote = (threadId) => {
    dispatch(asyncUpVoteThread({ threadId }));
  };

  const downVote = (threadId) => {
    dispatch(asyncDownVoteThread({ threadId }));
  };

  const neutralizeVote = (threadId, statusVoteLast) => {
    dispatch(asyncNeutralizeVoteThread({ threadId, statusVoteLast }));
  };

  const filterThread = (category) => {
    dispatch(asyncGetAllThreadWithFilter(category));
  };
  if (threads == null) {
    return null;
  }


  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div className={`flex flex-col justify-items-end  ${sidebar ? 'sm:ml-80 mr-10' :'sm:px-15 px-5'}`}>
      <h1 className="font-bold text-center text-2xl mt-10">List Threads</h1>
      <div className="flex flex-col mb-0 border-slate-200 pt-4 px-1">
        <FilterThreadsInput filterThreadsFunction={filterThread}/>
      </div>
      {threadList.length == 0 && <h1 className="font-bold text-center text-2xl mt-10">Threads Not Found</h1>}
      {threadList.map((thread) => (
        <ThreadsItem
          threads={thread}
          key={thread.id}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </div>
  );
}

export default ThreadListPage;
