import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUeser/action';
import { IoIosLogIn } from 'react-icons/io';
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="flex md:flex-row sm:flex-col flex-col">
      <div
        className="bg-red-500 flex-auto md:h-screen
      sm:h-100 h-100 text-white place-content-center justify-items-center text-[200px] font-extrabold"
      >
        <IoIosLogIn />
      </div>
      <div className="bg-white flex-auto md:h-screen sm:h-100  h-100 justify-items-center place-content-center">
        <h2 className="text-black font-bold mb-5 text-2xl">
          Forum Kita Bersama
        </h2>
        <LoginInput login={onLogin} />
        <p className="mt-2">
          Don&apos;t have an account?{' '}
          <Link to="/register">
            <label className="text-red-500 cursor-pointer">Register</label>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
