import { CoursesLevel, PublicAccess } from '@prisma/client';

export type CoursePageParams = {
	searchParams: {
		limit?: string;
		page?: string;
		q?: string;
		level?: CoursesLevel;
		category?: string;
		access?: PublicAccess;
		sort?: string;
	};
};
