import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundVariants = cva('flex items-center gap-2 py-1 px-2 rounded-md', {
  variants: {
    variant: {
      default: 'bg-indigo-100',
      violet: 'bg-violet-100',
      fuchsia: 'bg-fuchsia-100'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-indigo-700',
      violet: 'text-violet-700',
      fuchsia: 'text-fuchsia-700'
    },
    size: {
      default: 'h-5 w-5',
      sm: 'h-4 w-4',
      md: 'h-6 w-6'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

const textVariants = cva('text-base font-normal', {
  variants: {
    variant: {
      default: 'text-indigo-700',
      violet: 'text-violet-700',
      fuchsia: 'text-fuchsia-700'
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      md: 'text-lg'
    },
    font: {
      default: 'font-normal',
      sm: 'font-light',
      md: 'font-medium'
    }
  },
  defaultVariants: {
    variant: 'default',
    font: 'default',
    size: 'default'
  }
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;
type TextVariantProps = VariantProps<typeof textVariants>;

interface IconTextProps
  extends BackgroundVariantsProps,
    TextVariantProps,
    IconVariantsProps {
  icon: LucideIcon;
  text: string;
}

export const IconText = ({
  icon: Icon,
  variant,
  size,
  text
}: IconTextProps) => {
  return (
    <div className={cn(backgroundVariants({ variant }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
      <span className={cn(textVariants({ variant, size }))}>{text}</span>
    </div>
  );
};
