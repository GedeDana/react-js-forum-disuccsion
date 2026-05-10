import useInput from '../hooks/useInput';

function CreateCommentInput({ createComment }) {
  const [content, onChangeContent, setContent] = useInput('');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        createComment({ content });
        setContent('');
      }}
      className="flex flex-col gap-3"
    >
      <textarea
        type="text"
        value={content}
        onChange={onChangeContent}
        placeholder="Comment"
        className="w-full min-h-[120px] px-4 py-3 bg-gray-200 rounded-md leading-relaxed    text-sm   resize-none focus:outline-none focus:ring-0"
        required
      />
      <button
        type="submit"
        className="bg-red-500 text-white p-2 rounded-md font-bold cursor-pointer"
      >
        Create Comment
      </button>
    </form>
  );
}

export default CreateCommentInput;
