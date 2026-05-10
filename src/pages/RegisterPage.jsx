import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';
import { FaRegRegistered } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ email, name, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return alert("Password dosen't match");
    }
    dispatch(asyncRegisterUser({ email, name, password }));
    navigate('/');
  };

  return (
    <section className="flex md:flex-row sm:flex-col flex-col">
      <div
        className="bg-red-500 flex-auto md:h-screen
      sm:h-100 h-100 text-white place-content-center justify-items-center text-[200px] font-extrabold"
      >
        <FaRegRegistered />
      </div>
      <div className="bg-white flex-auto md:h-screen sm:h-100  h-100 justify-items-center place-content-center mt-5">
        <h2 className="text-black font-bold mb-5 text-2xl text-center">
          Register Forum Kita Bersama
        </h2>
        <RegisterInput register={onRegister} />
        <p className="mt-2">
         Already have an account? {' '}
          <Link to="/">
            <label className="text-red-500 cursor-pointer">Login</label>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
