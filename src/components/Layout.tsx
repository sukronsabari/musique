import { ReactNode, useState, ChangeEvent } from 'react';
import { useAppSelector } from '@/redux/app/hooks';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MusicPlayer from './MusicPlayer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { activeSong } = useAppSelector((state) => state.musicPlayer);

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu((state) => !state);
  };

  return (
    <main className="flex p-0 m-0">
      <Sidebar openMobileMenu={openMobileMenu} />
      <div className="flex-1 relative h-screen overflow-y-scroll hide-scrollbar bg-body">
        <div className="sticky top-0 left-0 w-full h-[72px] z-10 border-b border-b-slate-200 bg-body flex items-center">
          <Topbar
            searchTerm={searchTerm}
            onSearchChange={onSearchChangeHandler}
            handleOpenMobileMenu={handleOpenMobileMenu}
          />
        </div>
        <div className="pb-56">{children}</div>
      </div>
      {activeSong?.title && (
        <div className="fixed bottom-0 left-0 z-[20] w-full overflow-hidden border-t border-t-primary/20">
          <MusicPlayer />
        </div>
      )}
    </main>
  );
}
