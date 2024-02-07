import HumburgerMenu from '@/components/layouts/humburger-menu';
import MainLogo from '@/components/layouts/main-logo';
import UserAvatar from '@/components/layouts/user-avatar';
import UserMenuNav from '@/components/layouts/user-menu-nav';
import { User } from 'next-auth';

const NavbarTeacher = ({ user }: { user: User }) => {
  return (
    <div className="py-6 flex justify-between items-center">
      <HumburgerMenu />
      <MainLogo />
      <UserMenuNav>
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.image || null
          }}
          sizeImg={100}
        />
      </UserMenuNav>
    </div>
  );
};

export default NavbarTeacher;
