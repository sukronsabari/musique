/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FormEvent } from 'react';
import { IconSearch } from '@tabler/icons-react';

type SearchbarProps = {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Searchbar({
  searchTerm,
  onSearchChange,
  onSubmit,
}: SearchbarProps) {
  return (
    <div className="flex-1">
      <form
        className="w-full flex items-center space-x-4 bg-white rounded-full px-5 py-2"
        onSubmit={onSubmit}
      >
        <button type="submit">
          <IconSearch size={24} className="text-paragraph" />
        </button>

        <input
          type="search"
          id="search"
          name="search"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search"
          className="py-1 flex-1 w-full bg-transparent focus:outline-none placeholder:text-paragraph placeholder:tracking-wider"
        />
      </form>
    </div>
  );
}
