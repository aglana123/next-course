'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserNavbarRouteList = ({
  label,
  href
}: {
  label: string;
  href: string;
}) => {
  const pathName = usePathname();

  const isActive = pathName === href ? true : false;

  return (
    <Link href={href}>
      <div
        className={cn(
          'flex flex-col py-4 after:transition-all after:ease-in-out after:duration-200 after:bg-transparent after:w-full after:h-2 cursor-pointer',
          isActive && 'after:bg-primary text-primary'
        )}
      >
        <h3 className="px-6 py-3">{label}</h3>
      </div>
    </Link>
  );
};

export default UserNavbarRouteList;
