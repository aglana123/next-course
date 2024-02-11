import { Circle } from 'lucide-react';
import Link from 'next/link';

const CategoryList = ({
  slug,
  name,
  withCircle = false
}: {
  slug: string;
  name: string;
  withCircle?: boolean;
}) => {
  return (
    <Link href={`/courses?category=${slug}`}>
      <div className="group flex items-center gap-2 hover:text-primary h-full py-2">
        {withCircle && (
          <Circle className="group-hover:fill-primary stroke-none w-3 h-3" />
        )}
        {name}
      </div>
    </Link>
  );
};

export default CategoryList;
