import SearchBar from '@/components/layouts/SearchBar';
import MainLogo from '@/components/layouts/MainLogo';
import NavMenu from '@/components/layouts/NavMenu';
import HumburgerMenu from '@/components/layouts/HumburgerMenu';
import CategoriesPopUp from './CategoriesPopUp';
import { User } from 'next-auth';

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
						<SearchBar />
					</div>
					{/* right */}
					<NavMenu user={user} />
				</nav>
			</header>
		</>
	);
};

export default Navbar;
