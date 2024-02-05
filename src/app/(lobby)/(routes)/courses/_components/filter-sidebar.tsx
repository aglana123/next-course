import { Button } from '@/components/ui/button';
import { useContainerFilter } from '@/hooks/use-container-filter';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

const FilterSidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onToggle } = useContainerFilter();
  return (
    <div
      className={cn(
        'fixed flex w-fit h-full top-0 bg-transparent left-0 z-[1]',
        isOpen && 'w-full'
      )}
    >
      <div
        className={cn(
          'apply-animation left-0 top-0 w-full lg:w-[300px] min-h-dvh mt-[64px] lg:mt-[80px] fixed bg-white -translate-x-full z-10',
          isOpen && 'translate-x-0'
        )}
      >
        {/* Main Open-close sheet filter */}
        <Button
          onClick={onToggle}
          className="rounded-s w-20 shadow shadow-black/40 font-semibold absolute -right-20 top-16"
        >
          FILTER
        </Button>
        {/* close sheet filter mobile */}
        <Button
          onClick={onToggle}
          variant="ghost"
          className={cn(
            'lg:hidden absolute w-fit h-fit rounded-full top-2 right-4 p-2',
            !isOpen && 'hidden'
          )}
        >
          <X />
        </Button>
        {children}
      </div>
      <div
        onClick={onToggle}
        className={cn(
          'w-full h-full bg-transparent top-0 z-[5] max-lg:hidden',
          !isOpen && 'hidden'
        )}
      />
    </div>
  );
};

export default FilterSidebar;
