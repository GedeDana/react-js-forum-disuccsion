import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import TopNavigation from './components/TopNavigation';
import { asyncUnsetAuthUser } from './states/authUeser/action';
import SideBarNavigation from './components/SideBarNavigation';
import MainPage from './pages/MainPage';
import { SideBarProvider } from './utils/SideBarContext';
function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();
  const [sideBarShow, setSideBarShow] = useState(false);
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <SideBarProvider value={sideBarShow}>
        <TopNavigation
          authUser={authUser}
          logout={onLogout}
          sideBarToogleShow={() => setSideBarShow(!sideBarShow)}
        />
        {sideBarShow && <SideBarNavigation   logout={onLogout}    authUser={authUser}/>}
        <MainPage />
      </SideBarProvider>
    </>
  );
}

export default App;
