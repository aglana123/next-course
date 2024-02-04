import ContainerCourses from './_components/ContainerCourses';

import CoursesSection from '@/components/CoursesSection';
import db from '@/lib/db';
import { FC } from 'react';
import { CoursePageParams } from '@/types/course-page';
import { CoursesLevel, PublicAccess } from '@prisma/client';
import { firstLetterToUpper } from '@/helpers/firstLetterToUpper';
import SortPopUp from './_components/SortPopUp';

type queryProps = {
	title?: { contains: string; mode: 'insensitive' };
	is_published: boolean;
	category_id?: string;
	level?: CoursesLevel;
	public_access?: PublicAccess;
};

const CoursesPage: FC<CoursePageParams> = async ({ searchParams }) => {
	const { q: slug, category, level, access, sort } = searchParams;

	let query: queryProps = { is_published: true };
	let sorting: { createdAt?: 'desc' | 'asc' } = {};
	if (slug) {
		query.title = {
			contains: slug,
			mode: 'insensitive',
		};
	}
	if (category) {
		query.category_id = category;
	}

	if (level) {
		const level1 = firstLetterToUpper(level) as CoursesLevel;
		query.level = level1;
	}

	if (access) {
		const acces1 = firstLetterToUpper(access) as PublicAccess;
		query.public_access = acces1;
	}

	if (sort && sort !== 'relevance') {
		sorting.createdAt = 'desc';
	}
	const categories = await db.category.findMany();
	const courses = await db.course.findMany({
		where: query,
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
		orderBy: sorting,
	});

	if (!categories || !courses) {
		throw Error(
			'Failed to fetching data. Please reload page and try again'
		);
	}

	return (
		<ContainerCourses categories={categories}>
			<div className="flex justify-between items-center mb-4">
				<p className="font-medium">
					<strong>{courses.length || 0} Courses</strong> Found for{' '}
					{`"${slug || ''}"`}
				</p>
				<SortPopUp />
			</div>
			<CoursesSection courses={courses} />
		</ContainerCourses>
	);
};

export default CoursesPage;
