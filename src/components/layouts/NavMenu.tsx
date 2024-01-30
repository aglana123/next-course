import { BellIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import UserMenuNav from './UserMenuNav';
import NavMessages from './NavMessages';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';

const NavMenu = async () => {
	const currentUser = await getAuthSession();
	return (
		<>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					className="lg:hidden h-fit w-fit p-2">
					<SearchIcon />
				</Button>

				{currentUser?.user ? (
					<>
						<div className="hidden lg:flex gap-4">
							<Link href={'/courses'}>
								<span className="whitespace-nowrap text-primary font-medium">
									My Courses
								</span>
							</Link>
							<BellIcon className="fill-slate-500 stroke-none" />
							<NavMessages />
						</div>
						<UserMenuNav currentUser={currentUser?.user} />
					</>
				) : (
					<div className="flex gap-2">
						<Link
							aria-label="Masuk"
							href={'/sign-in'}>
							<Button>Masuk</Button>
						</Link>
						<Link
							aria-label="Daftar"
							href={'/sign-up'}>
							<Button variant={'outline'}>Daftar</Button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default NavMenu;
