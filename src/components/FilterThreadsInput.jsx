function FilterThreadsInput({ filterThreadsFunction }) {

  function filterOnChange(event) {
    filterThreadsFunction(event.target.value);
  }

  return (
    <input
      type="text"
      onChange={(event) => filterOnChange(event)}
      placeholder="Find Thread"
      className="block  h-12 bg-gray-200 rounded-md focus:outline-none focus:ring-0 indent-3"
    />
  );
}

export default FilterThreadsInput;
