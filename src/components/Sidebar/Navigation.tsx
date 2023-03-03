import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconSmartHome, IconHash } from '@tabler/icons-react';
import React from 'react';

type NavLinkProps = {
  href: string;
  text: string;
  children: React.ReactNode;
};

function NavLink({ href, text, children }: NavLinkProps) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-all ${
        isActive ? 'bg-white text-primary' : 'bg-transparent text-slate-800'
      }`}
    >
      {children}
      <span>{text}</span>
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="w-full">
      <p className="pl-5 text-xs text-left mb-4 text-slate-400 tracking-widest">
        Menu
      </p>
      <ul className="flex flex-col space-y-4 w-full">
        <li>
          <NavLink href="/" text="Home">
            <IconSmartHome />
          </NavLink>
        </li>
        {/* <li>
          <NavLink href="/topartist" text="Top Artists">
            <IconUsers />
          </NavLink>
        </li> */}
        <li>
          <NavLink href="/topchart" text="Top Chart">
            <IconHash />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
