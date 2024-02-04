import CoursesSection from '@/components/CoursesSection';
import CourseCard from '@/components/cards/CourseCard';
import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const UserCoursesPage = async () => {
	const session = await getAuthSession();

	if (!session?.user) {
		return redirect('/');
	}

	const userCourses = await db.user.findUnique({
		where: {
			id: session.user.id,
		},
		select: {
			EnrolledCourse: {
				select: {
					course: {
						include: {
							author: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});

	if (!userCourses) {
		throw Error(
			'Failed to fetching data. Please reload page and try again'
		);
	}

	const courses = userCourses.EnrolledCourse;

	return (
		<div className="container px-0 md:px-4 xl:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch">
				{courses.map((course) => (
					<CourseCard
						slug={course.course.slug}
						key={course.course.id}
						title={course.course.title}
						desc={course.course.description!}
						src={course.course.imageUrl!}
						teacher={course.course.author.name}
						course_access={course.course.public_access}
					/>
				))}
			</section>
		</div>
	);
};

export default UserCoursesPage;
