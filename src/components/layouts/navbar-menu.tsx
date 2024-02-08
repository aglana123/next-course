'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { Button } from '../ui/button';
import UserMenuNav from './user-menu-nav';
import UserAvatar from './user-avatar';
import WishlistMenu from './wishlist-menu';
import AlertNavbar from './alert-navbar';

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
          <WishlistMenu />
          <AlertNavbar userId={user.id} />
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
