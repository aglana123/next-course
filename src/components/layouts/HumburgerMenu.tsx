'use client';

import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';

const HumburgerMenu = () => {
  return (
    <Button variant="ghost" className="lg:hidden h-fit w-fit p-2">
      <MenuIcon />
    </Button>
  );
};

export default HumburgerMenu;
