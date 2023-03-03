import Link from 'next/link';
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
          <Link href="/" className="text-3xl font-bold block">
            <span className="text-primary">Music</span>App.
          </Link>
        </div>
        <Navigation />
      </div>
    </div>
  );
}
