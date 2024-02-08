import { BarChart3Icon, BookMarkedIcon } from 'lucide-react';
import SidebarItem from './sidebar-item';

const teacherRoutes = [
  {
    icon: BookMarkedIcon,
    label: 'Courses',
    href: '/teacher/courses'
  },
  {
    icon: BarChart3Icon,
    label: 'Analytics',
    href: '/teacher/analytics'
  }
];

const SidebarRoutes = () => {
  return (
    <div className="w-full relative">
      {teacherRoutes.map((route) => (
        <SidebarItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
