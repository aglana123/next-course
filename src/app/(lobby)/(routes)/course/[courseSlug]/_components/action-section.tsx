'use client';

import { Button } from '@/components/ui/button';
import useWishlist from '@/hooks/use-wishlist';
import { Course, PublicAccess } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ActionSection = ({
  courseId,
  publicAccess,
  course
}: {
  courseId: string;
  publicAccess: PublicAccess;
  course: Course;
}) => {
  const { data: session } = useSession();
  const { addItem } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleEnrollCourse = async () => {
    try {
      if (!session?.user) {
        return router.push('/sign-in');
      }
      setIsLoading(true);
      const enrollCourse = await axios.post(`/api/courses/${courseId}/enroll`);
      toast.success('Enroll Success');
      console.log(enrollCourse);
      router.push('/my-courses');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const AddToWishlist = () => {
    addItem(course);
  };
  return (
    <div className=" py-4 w-full flex flex-col gap-4 justify-center ">
      <div className="flex flex-col gap-4 justify-center">
        {publicAccess === 'Public' ? (
          <Button
            isLoading={isLoading}
            onClick={handleEnrollCourse}
            variant={'ghost'}
            className="h-fit font-medium py-4 text-lg  rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
          >
            Enroll Now
          </Button>
        ) : (
          <>
            <Button
              isLoading={isLoading}
              onClick={handleEnrollCourse}
              variant={'ghost'}
              className="h-fit font-medium py-4 text-lg  rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
            >
              Get Access
            </Button>
          </>
        )}
        <Button
          isLoading={isLoading}
          onClick={AddToWishlist}
          variant={'secondary'}
          className="h-fit py-4 text-lg px-6 font-medium rounded-md"
        >
          Add to Wishlist
        </Button>
      </div>
      {publicAccess === 'Private' && (
        <span className="text-xs text-destructive">
          *Kursus ini memiliki akses privat. Klik{' '}
          <strong className="text-xs">{`"Get Access" `}</strong>
          untuk meminta izin pemilik kursus.
        </span>
      )}
    </div>
  );
};

export default ActionSection;
