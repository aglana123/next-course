'use client';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Book, BookMarked, LogOutIcon, ShoppingBag } from 'lucide-react';

const userMenu = [
	{ title: 'My Learning', icon: Book },
	{ title: 'My Teaching', icon: BookMarked },
	{ title: 'My Cart', icon: ShoppingBag },
];

const UserMenuNav = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<Avatar>
					<Image
						width={100}
						height={100}
						alt="user navbar avatar"
						src={'/profile_nana.jpg'}
					/>
				</Avatar>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				avoidCollisions={true}
				sideOffset={15}
				className="w-fit px-0 text-foreground">
				<div className="flex flex-col w-full">
					<Link href={''}>
						<div className="flex gap-4 px-4">
							<Avatar className="h-16 w-16">
								<Image
									width={200}
									height={200}
									alt="user navbar avatar"
									src={'/profile_nana.jpg'}
								/>
							</Avatar>

							<div className="w-full self-center">
								<h3>Bagas Kelana</h3>
								<small>bagaslana@gmail.com</small>
							</div>
						</div>
					</Link>
					<Separator className="my-2" />
					{userMenu.map((menu) => (
						<Link
							key={menu.title}
							href="">
							<div className="flex items-center gap-2 py-2 px-4 hover:text-primary ">
								{<menu.icon className="h-4 w-4" />}
								{menu.title}
							</div>
						</Link>
					))}
					<Separator className="my-2" />
					<Link href="">
						<div className="flex gap-2 items-center px-4 py-2 text-destructive">
							<LogOutIcon className="h-4 w-4" />
							Logout
						</div>
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default UserMenuNav;
