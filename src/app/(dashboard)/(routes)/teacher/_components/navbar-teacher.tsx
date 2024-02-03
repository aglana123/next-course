import HumburgerMenu from '@/components/layouts/HumburgerMenu';
import MainLogo from '@/components/layouts/MainLogo';
import UserMenuNav from '@/components/layouts/UserMenuNav';
import { User } from 'next-auth';

const NavbarTeacher = ({ user }: { user: User }) => {
	return (
		<div className="py-6 flex justify-between items-center">
			<HumburgerMenu />
			<MainLogo />
			<UserMenuNav currentUser={user} />
		</div>
	);
};

export default NavbarTeacher;
