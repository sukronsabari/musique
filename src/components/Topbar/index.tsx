import { ChangeEvent, FormEvent } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import PageNavigation from './PageNavigation';
import Searchbar from './Searchbar';

type TopbarProps = {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleOpenMobileMenu: () => void;
};

export default function Topbar({
  searchTerm,
  onSearchChange,
  onSubmit,
  handleOpenMobileMenu,
}: TopbarProps) {
  return (
    <div className="flex-1 flex items-center px-4 gap-4 sm:gap-0 sm:space-x-4 sm:px-8">
      <PageNavigation />
      <Searchbar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onSubmit={onSubmit}
      />
      <button
        type="button"
        onClick={handleOpenMobileMenu}
        className="lg:hidden flex items-center justify-center"
      >
        <IconMenu2 size={30} />
      </button>
    </div>
  );
}
