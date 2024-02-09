'use client';


import MainLogo from '@/components/layouts/main-logo';
import NavMenu from '@/components/layouts/navbar-menu';
import HumburgerMenu from '@/components/layouts/humburger-menu';
import CategoriesPopUp from './categories-popup';
import { User } from 'next-auth';
import SearchBarDesktop from '@/components/layouts/search-bar/search-bar-desktop';
import SearchBarMobile from './search-bar/search-bar-mobile';

const Navbar = ({ user }: { user?: User }) => {
  return (
    <>
      <header className="w-full h-[64px] lg:h-[80px] shadow-md shadow-black/5 bg-white z-[50] fixed top-0">
        <nav className="container px-4 md:px-8 xl:px-16 h-full flex gap-4 items-center justify-between lg:justify-start">
          {/* left */}
          <HumburgerMenu />
          <MainLogo />

          {/* center */}
          <div className="w-full hidden lg:flex gap-4 xl:mx-4">
            <CategoriesPopUp />
            <SearchBarDesktop />
          </div>
          {/* right */}
          <div className="flex items-center gap-4">
            <SearchBarMobile />
            <NavMenu user={user} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
