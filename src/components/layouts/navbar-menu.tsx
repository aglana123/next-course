'use client';

import { Heart, SearchIcon } from 'lucide-react';

import NavMessages from './navbar-messages';
import Link from 'next/link';
import { Button } from '../ui/button';
import { User } from 'next-auth';
import UserMenuNav from './user-menu-nav';
import UserAvatar from './user-avatar';

const NavMenu = ({ user }: { user?: User }) => {
  return (
    <>
      {user ? (
        <>
          <Link className="max-lg:hidden" href={'/courses'}>
            <span className="whitespace-nowrap text-primary font-medium">
              My Courses
            </span>
          </Link>
          <Heart className="fill-slate-500 stroke-none max-lg:hidden" />
          <NavMessages />
          <UserMenuNav>
            <UserAvatar
              user={{
                name: user.name || null,
                image: user.image || null
              }}
              sizeImg={100}
            />
          </UserMenuNav>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link aria-label="Masuk" href={'/sign-in'}>
            <Button>Masuk</Button>
          </Link>
          <Link aria-label="Daftar" href={'/sign-up'}>
            <Button variant={'outline'}>Daftar</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavMenu;
