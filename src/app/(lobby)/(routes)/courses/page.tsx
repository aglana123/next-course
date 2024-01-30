import { Button } from '@/components/ui/button';
import ContainerProducts from './_components/ContainerProducts';

import CoursesSection from '@/components/CoursesSection';
import db from '@/lib/db';
import { FC } from 'react';
import { CoursePageParams } from '@/types/course-page';

const CoursesPage: FC<CoursePageParams> = async ({ searchParams }) => {
	const { q: slug } = searchParams;
	const categories = await db.category.findMany();

	if (!categories) {
		throw Error(
			'Failed to fetching data. Please reload page and try again'
		);
	}

	return (
		<ContainerProducts categories={categories}>
			<div className="flex justify-between items-center mb-4">
				<p className="font-medium">
					<strong>50 Courses</strong> Found for {`"${slug}"`}
				</p>
				<Button variant={'outline'}>Short By</Button>
			</div>
			<CoursesSection />
		</ContainerProducts>
	);
};

export default CoursesPage;
