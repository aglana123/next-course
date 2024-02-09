'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const HomePageAction = () => {
  const { update, data: session } = useSession();

  const user = session?.user ?? null;
  const route = useRouter();

  const handleUpladeSession = async () => {
    try {
      if (!user) {
        return route.push('/sign-in');
      }
      if (user.role === 'TEACHER') {
        return route.push('/teacher/courses');
      }
      await update({ role: 'TEACHER' });
      toast.success('you become teacher now');
      return route.push('/teacher/courses');
    } catch (error) {
      console.log(error);
      toast.error('error occure');
    }
  };

  return (
    <div className="flex gap-4 max-lg:justify-center">
      <Link href="/courses">
        <Button
          variant="secondary"
          className="rounded-md px-5 py-3 text-base font-medium h-fit bg-white"
        >
          Enroll Courses
        </Button>
      </Link>
      <Button
        onClick={handleUpladeSession}
        className="rounded-md px-5 py-3 text-base font-medium h-fit"
      >
        Become Teacher
      </Button>
    </div>
  );
};

export default HomePageAction;
