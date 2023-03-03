import { ChangeEvent } from 'react';
import { IconSearch } from '@tabler/icons-react';

type SearchbarProps = {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Searchbar({
  searchTerm,
  onSearchChange,
}: SearchbarProps) {
  return (
    <div className="flex-1">
      <div className="w-full flex items-center space-x-4 bg-white rounded-full px-5 py-2">
        <IconSearch size={24} className="text-paragraph" />
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search"
          className="py-1 flex-1 w-full bg-transparent focus:outline-none placeholder:text-paragraph placeholder:tracking-wider"
        />
      </div>
    </div>
  );
}
