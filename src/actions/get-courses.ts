import { Category, Course } from '@prisma/client';

import { getProgress } from '@/actions/get-progress';
import db from '@/lib/db';

type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	progress: number | null;
};

type GetCourses = {
	userId: string;
};

export const getCourses = async ({
	userId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const courses = await db.course.findMany({
			where: {
				is_published: true,
				enrolled_courses: {
					some: {
						userId,
					},
				},
			},
			include: {
				category: true,
				chapters: {
					where: {
						is_published: true,
					},
					select: {
						id: true,
					},
				},
				enrolled_courses: {
					where: {
						userId,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const coursesWithProgress: CourseWithProgressWithCategory[] =
			await Promise.all(
				courses.map(async (course) => {
					if (course.enrolled_courses.length === 0) {
						return {
							...course,
							progress: null,
						};
					}

					const progressPercentage = await getProgress(
						userId,
						course.id
					);

					return {
						...course,
						progress: progressPercentage,
					};
				})
			);

		return coursesWithProgress;
	} catch (error) {
		console.log('[GET_COURSES]', error);
		return [];
	}
};
