import MainLogo from '@/components/layouts/main-logo';
import { BarChart3Icon, BookMarkedIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed w-[300px] min-h-dvh h-full bg-white shadow shadow-black/30 max-lg:hidden">
      <div className="flex w-full flex-col absolute top-0 left-0 pl-4 py-8 gap-6">
        <MainLogo />
        <div className="w-full relative">
          <div className="w-full relative pl-4 py-4 flex gap-2 rounded bg-gradient-to-r from-primary to-violet-600 hover:from-violet-600 hover:to-primary text-primary-foreground select-none cursor-pointer transition-all ease-in-out duration-300">
            <BookMarkedIcon />
            <h3>Kursus</h3>
          </div>
          <div className="w-full pl-4 py-4 flex gap-2 rounded select-none cursor-pointer">
            <BarChart3Icon />
            <h3>Analisis</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
