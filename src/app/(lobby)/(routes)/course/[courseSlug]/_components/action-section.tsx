'use client';
import { Button } from '@/components/ui/button';
import useWishlist from '@/hooks/use-wishlist';
import { CourseWishlistType } from '@/types/course-wishlist-type';

import Link from 'next/link';

const ActionSection = ({ course }: { course: CourseWishlistType }) => {
  const { addItem } = useWishlist();

  const AddToWishlist = () => {
    addItem(course);
  };
  return (
    <div className=" py-4 w-full flex flex-col gap-4 justify-center ">
      <div className="flex flex-col gap-4 justify-center">
        <Link href={'/sign-in'}>
          <Button
            variant={'ghost'}
            className="h-fit w-full font-medium py-4 text-lg rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
          >
            Enroll Now
          </Button>
        </Link>
        <Button
          onClick={AddToWishlist}
          variant={'secondary'}
          className="h-fit py-4 text-lg px-6 font-medium rounded-md"
        >
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
};

export default ActionSection;
