'use client';

import CoursesSection from '@/components/CoursesSection';
import { Course } from '@prisma/client';
import { FC } from 'react';

type FeaturedCoursesSectionProps = {
	courses: (Course & { author: { name: string } })[];
};

const FeaturedCoursesSection: FC<FeaturedCoursesSectionProps> = ({
	courses,
}) => {
	return (
		<div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto h-full">
			<div className="mb-8 max-w-sm text-center">
				<h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
					Courses Section
				</h2>
				<p>Browse through the course categories that catch your eye.</p>
			</div>

			<CoursesSection courses={courses} />
		</div>
	);
};

export default FeaturedCoursesSection;
