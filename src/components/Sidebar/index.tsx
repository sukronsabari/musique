import Logo from '@/assets/logo.svg';
import Image from 'next/image';
import Navigation from './Navigation';

type SidebarProps = {
  openMobileMenu: boolean;
};

export default function Sidebar({ openMobileMenu }: SidebarProps) {
  return (
    <div
      className={`absolute top-0 z-[15] h-screen w-[240px] bg-sidebar lg:static ${
        openMobileMenu ? 'left-0' : '-left-full'
      }`}
    >
      <div className="px-4 py-6">
        <div className="mt-4 mb-10 flex flex-col items-center">
          <Image
            src={Logo}
            alt="logo"
            width={88}
            height={27}
            className="scale-150 mb-8"
          />
          <Navigation />
        </div>
      </div>
    </div>
  );
}
