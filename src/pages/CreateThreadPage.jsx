import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../states/thread/action';
import { useNavigate } from 'react-router-dom';
import CreateThreadInput from '../components/CreateThreadInput';
import { useContext } from 'react';
import SideBarContext from '../utils/SideBarContext';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebar = useContext(SideBarContext);

  function createThread({ title, body, category }) {
    dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  }

  return (
    <div className={`flex flex-col justify-items-end ${sidebar ?'sm:ml-80 mr-10': 'sm:px-15 px-5'} my-6 bg-white shadow-sm border-slate-200 rounded-lg px-8 py-10`}>
      <h1 className="font-bold text-center text-2xl">Create Thread</h1>
      <CreateThreadInput
        createThread={createThread}
      />
    </div>
  );
}

export default CreateThreadPage;
