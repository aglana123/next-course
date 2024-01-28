import { BellIcon, MessageCircle, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import UserMenuNav from './UserMenuNav';
import NavMessages from './NavMessages';

const NavMenu = () => {
	return (
		<>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					className="lg:hidden h-fit w-fit p-2">
					<SearchIcon />
				</Button>
				<div className="hidden lg:flex gap-4">
					<span className="whitespace-nowrap text-primary font-medium">
						My Courses
					</span>
					<BellIcon className="fill-slate-500 stroke-none" />
					<NavMessages />
				</div>
				<UserMenuNav />
			</div>
		</>
	);
};

export default NavMenu;
