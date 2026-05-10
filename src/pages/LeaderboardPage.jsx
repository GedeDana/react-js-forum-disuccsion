import { useDispatch, useSelector } from 'react-redux';
import { asyncListLeaderBoard } from '../states/leaderboard/action';
import LeaderboardItem from '../components/LeaderboardItem';
import { useContext, useEffect } from 'react';
import SideBarContext from '../utils/SideBarContext';

function LeaderboardPage() {
  const { leaderboard = null } = useSelector((state) => state);
  const sidebar = useContext(SideBarContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncListLeaderBoard());
  }, [dispatch]);

  if (leaderboard == null) {
    return null;
  }

  return (
    <div className={`flex flex-col justify-items-end ${sidebar ?'sm:ml-80 mr-10': 'sm:px-15 px-5'} my-6 bg-white shadow-sm border-slate-200 rounded-lg px-8 py-10`}>
      <h1 className="font-bold text-center text-2xl">Leaderboard</h1>
      <div className="flex my-3">
        <label className="font-medium flex-3">User</label>
        <label className="font-medium">Score</label>
      </div>
      {leaderboard.map((leaderboard) => (
        <LeaderboardItem
          image={leaderboard.user.avatar}
          name={leaderboard.user.name}
          skor={leaderboard.score}
          key={leaderboard.user.id}
        />
      ))}
    </div>
  );
}

export default LeaderboardPage;
