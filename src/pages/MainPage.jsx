import { Routes, Route } from 'react-router-dom';
import CreateThreadPage from './CreateThreadPage';
import ThreadListPage from './ThreadListPage';
import ThreadDetailPage from './ThreadDetailPage';
import LeaderboardPage from './LeaderboardPage';

function MainPage() {
  return (
    <div className="">
      <Routes>
        <Route path="/createThread" element={<CreateThreadPage />} />
        <Route path="/" element={<ThreadListPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/thread/detail/:id" element={<ThreadDetailPage />} />
      </Routes>
    </div>
  );
}

export default MainPage;
