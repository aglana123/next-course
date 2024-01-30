'use client';

import { coursesAsset } from '@/asset/courses-asset';
import CourseCard from '@/components/cards/CourseCard';

const CoursesSection = () => {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch">
			{coursesAsset.map((course) => (
				<CourseCard
					key={course.id}
					title={course.title}
					desc={course.description}
					price={+course.price}
					src={course.image}
					teacher={course.teacher}
				/>
			))}
		</section>
	);
};

export default CoursesSection;
