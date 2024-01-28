import {
	BellIcon,
	MenuIcon,
	MessageCircle,
	MessageSquare,
	SearchIcon,
	ShoppingCart,
} from 'lucide-react';
import SearchBar from '@/components/layouts/SearchBar';
import UserAccountNav from '@/components/layouts/UserMenuNav';
import CategoriesPopUp from '@/components/layouts/CategoriesPopUp';
import MainLogo from '@/components/layouts/MainLogo';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import NavMenu from './NavMenu';

const Navbar = () => {
	return (
		<>
			<header className="w-full h-[64px] lg:h-[80px] shadow-md shadow-black/5 bg-white">
				<nav className="container px-4 md:px-8 xl:px-16 h-full flex gap-4 items-center justify-between lg:justify-start">
					{/* left */}
					<Button
						variant="ghost"
						className="lg:hidden h-fit w-fit p-2">
						<MenuIcon />
					</Button>
					<MainLogo />
					{/* center */}
					<SearchBar />
					{/* right */}

					<NavMenu />
				</nav>
			</header>
		</>
	);
};

export default Navbar;
