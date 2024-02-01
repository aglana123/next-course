import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const CourseIdPage = async ({ params }: { params: { courseSlug: string } }) => {
	const session = await getAuthSession();

	if (!session?.user) {
		return redirect('/');
	}

	const course = await db.course.findUnique({
		where: {
			slug: params.courseSlug,
			is_published: true,
			OR: [
				{
					public_access: 'Public',
				},
				{
					AND: [
						{ public_access: 'Private' },
						{
							OR: [
								{ author_id: session.user.id },
								{
									AccessPrivateCourses: {
										some: { userId: session.user.id },
									},
								},
							],
						},
					],
				},
			],
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

	return redirect(`/course/${course.slug}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
