import { getCourses } from '@/actions/get-courses';

import { getAuthSession } from '@/lib/auth';

import { redirect } from 'next/navigation';
import { CoursesList } from './_components/courses-list';

const UserCoursesPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }
  const userCourses = await getCourses({ userId: session.user.id });

  if (!userCourses) {
    throw new Error('Failed to Fetch Data');
  }

  return (
    <div className=" w-full">
      <CoursesList items={userCourses} />
    </div>
  );
};

export default UserCoursesPage;
