'use client';

import GetAccessModal from '@/components/modals/GetAccessModal';
import { Button } from '@/components/ui/button';
import useWishlist from '@/hooks/use-wishlist';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CourseDataType } from './desktop-course-section';

const AuthActionSection = ({
  isPublicAccess,
  course,
  hasAccessToCourse,
  isEnrolledInCourse
}: {
  isPublicAccess: boolean;
  course: CourseDataType;
  hasAccessToCourse: boolean;
  isEnrolledInCourse: boolean;
}) => {
  const { addItem } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { id: courseId } = course;

  const handleEnrollCourse = async () => {
    if (isEnrolledInCourse) {
      return router.push(
        `/course/${course.slug}/chapters/${course.chapters?.[0]?.id}`
      );
    }
    try {
      setIsLoading(true);
      const enrollCourse = await axios.post(`/api/courses/${courseId}/enroll`);
      toast.success('Enroll Success');
      console.log(enrollCourse);
      router.push('/user/learning');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAccess = async () => {
    try {
      setIsLoading(true);
      const privateAccessResponse = await axios.post(
        `/api/courses/${courseId}/enroll/access/user`
      );
      toast.success(
        'Success. Please await permission from the owner to access this course.'
      );
      console.log(privateAccessResponse);
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
        {isPublicAccess || hasAccessToCourse || isEnrolledInCourse ? (
          <Button
            isLoading={isLoading}
            onClick={handleEnrollCourse}
            variant={'ghost'}
            className="h-fit font-medium py-4 text-lg rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
          >
            {isEnrolledInCourse ? 'Go to Course' : 'Enroll Now'}
          </Button>
        ) : (
          <GetAccessModal onConfirm={handleGetAccess}>
            <Button
              isLoading={isLoading}
              variant={'ghost'}
              className="h-fit font-medium py-4 text-lg rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
            >
              Get Access
            </Button>
          </GetAccessModal>
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
    </div>
  );
};

export default AuthActionSection;
