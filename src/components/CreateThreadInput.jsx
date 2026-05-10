import useInput from '../hooks/useInput';

function CreateThreadInput({ createThread }) {
  const [title, onChangeTitle] = useInput('');
  const [body, onChangeBody] = useInput('');
  const [category, onChangeCategory] = useInput('');

  return (
    <form
      className="rounded-xl grow-4 mt-5 flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        createThread({ title, body, category });
      }}
    >
      <input
        type="text"
        value={title}
        onChange={onChangeTitle}
        placeholder="Title"
        className="block h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <textarea
        value={body}
        onChange={onChangeBody}
        placeholder="Body"
        className="w-full min-h-30 px-4 py-3 bg-gray-200 rounded-md leading-relaxed    text-sm   resize-none focus:outline-none focus:ring-0"
        required
      ></textarea>
      <input
        type="text"
        value={category}
        onChange={onChangeCategory}
        placeholder="Category"
        className="block h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
        required
      />
      <button
        type="submit"
        className="bg-red-500 text-white p-2 rounded-md font-bold"
      >
        Create
      </button>
    </form>
  );
}

export default CreateThreadInput;
