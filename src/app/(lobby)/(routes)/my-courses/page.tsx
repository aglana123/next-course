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

	return (
		<div className="container px-0 md:px-4 xl:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
			<CoursesList items={userCourses} />
		</div>
	);
};

export default UserCoursesPage;
