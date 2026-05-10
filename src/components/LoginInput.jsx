import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onChange] = useInput('');

  return (
    <form className="flex flex-col gap-4 sm:w-sm lg:w-3xl w-full px-6">
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
      />
      <input
        type="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        className="block h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
      />
      <button
        type="button"
        className="bg-red-500 text-white p-2 rounded-md font-bold cursor-pointer"
        onClick={() => login({ email, password })}
      >
        Login
      </button>
    </form>
  );
}

export default LoginInput;
