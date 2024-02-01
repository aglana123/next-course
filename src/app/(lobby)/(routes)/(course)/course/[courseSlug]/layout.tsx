import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { CourseSidebar } from './_components/course-sidebar';

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseSlug: string };
}) => {
	const session = await getAuthSession();

	if (!session?.user) {
		return redirect('/');
	}

	const course = await db.course.findUnique({
		where: {
			slug: params.courseSlug,
		},
		include: {
			chapters: {
				where: {
					is_published: true,
				},
				orderBy: {
					position: 'asc',
				},
			},
		},
	});

	if (!course) {
		return redirect('/');
	}

	return (
		<div className="h-full">
			<div className="hidden lg:flex h-full w-80  pt-[64px] lg:pt-[80px] flex-col fixed inset-y-0 right-0 bg-white shadow shadow-black/20">
				<CourseSidebar
					progressCount={80}
					course={course}
				/>
			</div>
			<main className="lg:pr-80 pt-[64px] lg:pt-[80px] h-full">
				{children}
			</main>
		</div>
	);
};

export default CourseLayout;
