import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItem = ({
  icon: Icon,
  label,
  href
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link href={href}>
      <div
        className={cn(
          'w-full pl-4 py-2 flex gap-2 rounded select-none cursor-pointer',
          isActive &&
            'bg-gradient-to-r from-primary to-violet-600 text-primary-foreground'
        )}
      >
        <Icon />
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default SidebarItem;
