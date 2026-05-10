import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { IoMdLogOut } from 'react-icons/io';
function TopNavigation({ authUser, logout, sideBarToogleShow }) {
  const { name } = authUser;
  function onClickSideBarIconMenu() {
    sideBarToogleShow();
  }
  return (
    <nav className="bg-red-500 w-screen sm:h-20 flex justify-between sticky z-10 top-0">
      <div className="flex px-5 py-5 gap-x-4">
        <button
          className="text-4xl text-white pr-10 cursor-pointer"
          onClick={onClickSideBarIconMenu}
        >
          <AiOutlineMenuUnfold />
        </button>
        <div className="text-4xl text-white">
          <HiOutlineSpeakerphone />
        </div>
        <label className="sm:text-2xl text-lg text-white font-medium">
          FORUM KITA BERSAMA
        </label>
      </div>
      <div className="hidden sm:flex px-5 py-5">
        <button onClick={() => logout()} className="flex text-4xl text-white cursor-pointer">
          <IoMdLogOut />
          <label className="text-2xl text-white">{name}</label>
        </button>
      </div>
    </nav>
  );
}

export default TopNavigation;
