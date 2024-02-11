'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import UserMenuNav from './user-menu-nav';
import UserAvatar from './user-avatar';
import WishlistMenu from './wishlist-menu';
import AlertNavbar from './alert-navbar';
import AuthenticationButton from './authentication-button';

const NavMenu = ({ user }: { user?: User }) => {
  return (
    <>
      {user ? (
        <>
          <Link className="max-lg:hidden" href={'/user/learning'}>
            <span className="whitespace-nowrap text-primary font-medium">
              My Learning
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
        <AuthenticationButton />
      )}
    </>
  );
};

export default NavMenu;
