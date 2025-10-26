import SearchIcon from "@/assets/icons/search-icon.svg";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ placeholder = "Search", value, onChange }: SearchInputProps) => {
  return (
    <div className="search-input">
      <label className="sr-only" htmlFor="game-search">
        Search games
      </label>
      <input
        id="game-search"
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img src={SearchIcon} alt="" aria-hidden="true" className="search-input__icon" />
    </div>
  );
};

export default SearchInput;
