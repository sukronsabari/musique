import { ChangeEvent } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import PageNavigation from './PageNavigation';
import Searchbar from './Searchbar';

type TopbarProps = {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOpenMobileMenu: () => void;
};

export default function Topbar({
  searchTerm,
  onSearchChange,
  handleOpenMobileMenu,
}: TopbarProps) {
  return (
    <div className="flex-1 flex items-center py-2 px-4 gap-4 sm:gap-0 sm:space-x-4 sm:px-8">
      <PageNavigation />
      <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
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
