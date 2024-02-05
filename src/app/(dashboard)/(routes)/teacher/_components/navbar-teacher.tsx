import HumburgerMenu from '@/components/layouts/HumburgerMenu';
import MainLogo from '@/components/layouts/MainLogo';
import UserAvatar from '@/components/layouts/UserAvatar';
import UserMenuNav from '@/components/layouts/UserMenuNav';
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
