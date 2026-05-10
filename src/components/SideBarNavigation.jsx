import { IoHomeOutline } from 'react-icons/io5';
import { IoCreate } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
function SideBarNavigation({ logout, authUser }) {
  const { name } = authUser;
  return (
    <div className="bg-red-500 flex-auto  h-60 sm:h-screen pt-5 fixed w-screen sm:w-70">
      <nav className="">
        <div className="flex flex-col pl-6">
          <ul className=" text-white text-xl flex flex-col gap-y-6">
            <Link to="/">
              <li className="flex items-center gap-x-6">
                <IoHomeOutline />
                Home
              </li>
            </Link>
            <Link to="/createThread">
              <li className="flex items-center gap-x-6">
                <IoCreate />
                Create Thread
              </li>
            </Link>
            <Link to="/leaderboard">
              <li className="flex items-center gap-x-6">
                <MdOutlineLeaderboard />
                Leaderboard
              </li>
            </Link>
            <div className="flex items-center gap-x-6 sm:hidden">
              <button onClick={() => logout()} className="flex text-2xl text-white justify-center cursor-pointer">
                <IoMdLogOut  className="mt-2"/>
                <label className="text-2xl text-white pl-5">{name}</label>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SideBarNavigation;
