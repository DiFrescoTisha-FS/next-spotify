// import MagnifyingIcon from "./MagnifyingIcon";

export default function Search({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
}) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <form className="flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          className="rounded-l border-r pl-1 text-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="h-8 rounded-r bg-slate-100 p-2">
          <MagnifyingIcon />
        </button>
        <button
          className={`ml-4 text-white ${
            searchTerm.length > 2 ? "block" : "invisible"
          }`}
          onClick={handleClear}
          type="button"
        >
          reset
        </button>
      </form>
    </div>
  );
}