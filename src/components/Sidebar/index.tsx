import Link from 'next/link';
import React from 'react';
import Navigation from './Navigation';

type SidebarProps = {
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  openMobileMenu,
  setOpenMobileMenu,
}: SidebarProps) {
  return (
    <div
      className={`absolute top-0 z-[15] h-screen w-[240px] bg-sidebar lg:static ${
        openMobileMenu ? 'left-0' : '-left-full'
      }`}
    >
      <div className="px-4 py-6">
        <div className="mt-4 mb-10 flex flex-col items-center">
          <Link href="/" className="text-3xl font-bold block">
            Musi<span className="text-primary">Que.</span>
          </Link>
        </div>
        <Navigation setOpenMobileMenu={setOpenMobileMenu} />
      </div>
    </div>
  );
}
