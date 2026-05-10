import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswrodChange] = useInput('');
  const [confirmPassword, onConfirmPassword] = useInput('');

  return (
    <form
      className="flex flex-col gap-4 sm:w-sm lg:w-3xl w-full px-6"
      onSubmit={() => register({ name, email, password, confirmPassword })}
    >
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
        className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <input
        type="password"
        value={password}
        onChange={onPasswrodChange}
        placeholder="Password"
        className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={onConfirmPassword}
        placeholder="Confirm Password"
        className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <button
        type="submit"
        className="bg-red-500 text-white p-2 rounded-md font-bold cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterInput;
