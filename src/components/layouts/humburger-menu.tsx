'use client';

import { Book, LayoutDashboard, MenuIcon, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '../ui/sheet';
import Logo from '@/asset/logo';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AuthenticationButton from './authentication-button';
import { categoriesAsset } from '@/asset/categories';
import { Separator } from '../ui/separator';
import CategoryList from './category-list';

const userMenu = [
  { title: 'My Learning', icon: Book, href: '/user/learning' },
  { title: 'My Wishlist', icon: ShoppingBag, href: '/user/wishlist' }
];
const userMenuTeacher = [
  { title: 'My Learning', icon: Book, href: '/user/learning' },
  { title: 'My Wishlist', icon: ShoppingBag, href: '/user/wishlist' },
  {
    title: 'Dashboard Teacher',
    icon: LayoutDashboard,
    href: '/teacher/courses'
  }
];

const HumburgerMenu = () => {
  const { data: session } = useSession();

  const user = session?.user ?? null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden h-fit w-fit p-2">
          <span className="sr-only">humburger menu button</span>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden px-0">
        <SheetHeader>
          <Link href={'/'}>
            <SheetClose>
              <Logo />
            </SheetClose>
          </Link>
        </SheetHeader>

        <div className="w-full flex flex-col ">
          <div className="pt-4">
            <h3 className="mb-1 bg-slate-50 rounded-md px-4 py-2 border border-input">
              Categories
            </h3>
            <div className="px-4">
              {categoriesAsset.map((category) => (
                <CategoryList
                  key={category.slug}
                  name={category.name}
                  slug={category.slug}
                />
              ))}
            </div>
          </div>
          <div className="py-4">
            {user ? (
              <>
                <h3 className="mb-1 bg-slate-50 rounded-md px-4 py-2 border border-input">
                  User Menu
                </h3>
                <div className="px-4">
                  {user.role === 'TEACHER' ? (
                    <>
                      {userMenu.map((menu) => (
                        <Link key={menu.title} href={menu.href}>
                          <div className="py-2 hover:text-primary">
                            {menu.title}
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {userMenuTeacher.map((menu) => (
                        <Link key={menu.title} href={menu.href}>
                          <div className="py-2 hover:text-primary">
                            {menu.title}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center p-4">
                <AuthenticationButton />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HumburgerMenu;
