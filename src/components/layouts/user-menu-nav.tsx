'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { signOut, useSession } from 'next-auth/react';
import {
  Book,
  BookMarked,
  LayoutDashboard,
  LogOutIcon,
  ShoppingBag
} from 'lucide-react';
import UserAvatar from './user-avatar';
import UserMenuList from './user-menu-list';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ReactNode } from 'react';

const userMenu = [
  { title: 'My Learning', icon: Book, href: '/my-courses' },
  { title: 'My Cart', icon: ShoppingBag, href: '/cart' }
];
const userMenuTeacher = [
  { title: 'My Learning', icon: Book, href: '/my-courses' },
  {
    title: 'My Cart',
    icon: ShoppingBag,
    href: '/cart'
  },
  {
    title: 'Dashboard Teacher',
    icon: LayoutDashboard,
    href: '/teacher/courses'
  }
];

const UserMenuNav = ({ children }: { children: ReactNode }) => {
  const { update, status, data: session } = useSession();
  const router = useRouter();

  const user = session?.user ?? null;

  const handleUpladeSession = async () => {
    try {
      const updateUser = await update({ role: 'TEACHER' });
      console.log(updateUser);
      toast.success('you become teacher now');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('error occure');
    }
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      {user ? (
        <PopoverContent
          align="end"
          avoidCollisions={true}
          sideOffset={15}
          className="w-fit px-0 text-foreground"
        >
          <div className="flex flex-col w-full">
            <Link href={''}>
              <div className="flex gap-4 px-4">
                <UserAvatar
                  className="h-16 w-16"
                  user={{
                    name: user?.name || null,
                    image: user?.image || null
                  }}
                  sizeImg={200}
                />

                <div className="w-full self-center">
                  <h3>{user?.name}</h3>
                  <small>{user?.email}</small>
                </div>
              </div>
            </Link>
            <Separator className="mt-4 mb-2" />
            {user?.role === 'STUDENT' ? (
              <>
                {userMenu.map((user) => (
                  <UserMenuList
                    key={user.title}
                    title={user.title}
                    icon={user.icon}
                    href={user.href}
                  />
                ))}

                <button
                  disabled={status === 'loading' ? true : false}
                  onClick={handleUpladeSession}
                  className="flex w-full items-center gap-2 py-2 px-4 hover:text-primary"
                >
                  <BookMarked className="h-4 w-4" />
                  {'Become Teacher'}
                </button>
              </>
            ) : (
              <>
                {userMenuTeacher.map((user) => (
                  <UserMenuList
                    key={user.title}
                    title={user.title}
                    icon={user.icon}
                    href={user.href}
                  />
                ))}
              </>
            )}
            <Separator className="my-2" />
            <div
              onClick={() => {
                signOut();
              }}
              className="flex gap-2 items-center px-4 py-2 text-destructive cursor-pointer"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </div>
          </div>
        </PopoverContent>
      ) : null}
    </Popover>
  );
};

export default UserMenuNav;
