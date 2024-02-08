'use client';

import MainLogo from '@/components/layouts/main-logo';
import SidebarRoutes from './sidebar-routes';

const Sidebar = () => {
  return (
    <div className="fixed w-[300px] min-h-dvh h-full bg-white shadow shadow-black/30 max-lg:hidden">
      <div className="flex w-full flex-col absolute top-0 left-0 pl-4 py-8 gap-6">
        <MainLogo />
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
